// Build-time SEO for the static site (runs during `npm run build`):
//  • injects title / description / Open Graph / Twitter / JSON-LD tags into index.html (from src/config.js)
//  • writes a real HTML file for EVERY page (e.g. dist/category/ethical-hacking/index.html) with that
//    page's own title, description, share-preview tags and canonical link — so Google indexes each
//    page (HTTP 200, not a 404 fallback) and WhatsApp/Facebook link previews show the right text
//  • writes robots.txt and sitemap.xml (sitemap only when SITE.siteUrl is set)
//  • copies index.html → 404.html for unknown addresses on GitHub Pages
import fs from 'node:fs';
import path from 'node:path';
import { SITE } from './src/config.js';
import categories from './src/data/categories.js';
import products from './src/data/products.js';
import {
  aboutMeta, canonicalPath, categoryMeta, clip, fullTitle, homeMeta, productMeta, subcategoryMeta,
} from './src/seo/pageMeta.js';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const base = () => SITE.siteUrl.replace(/\/+$/, '');
const abs = (p) => {
  if (/^https?:/.test(p)) return p;
  const clean = String(p).replace(/^\.?\/+/, '');
  return SITE.siteUrl ? `${base()}/${clean}` : `/${clean}`;
};

// Every page of the site with its SEO text
function pages() {
  const list = [
    { path: '/', ...homeMeta(), priority: '1.0' },
    { path: '/about', ...aboutMeta(), priority: '0.6' },
  ];
  for (const c of categories) {
    list.push({ path: `/category/${c.id}`, ...categoryMeta(c), priority: '0.9' });
    for (const s of c.subcategories) list.push({ path: `/category/${c.id}/${s.id}`, ...subcategoryMeta(c, s), priority: '0.8' });
  }
  for (const p of products) {
    const sub = categories.find((c) => c.id === p.category)?.subcategories.find((s) => s.id === p.subcategory);
    list.push({ path: `/product/${encodeURIComponent(p.id)}`, ...productMeta(p, sub), priority: '0.7' });
  }
  return list;
}

function headTags() {
  const { seo, owner } = SITE;
  const org = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: SITE.name,
    description: seo.description,
    logo: abs('logo-color.png'),
    image: abs(seo.image),
    ...(SITE.siteUrl ? { url: `${base()}/` } : {}),
    founder: { '@type': 'Person', name: owner.name, ...(owner.linkedin ? { sameAs: [owner.linkedin] } : {}) },
    ...(owner.linkedin ? { sameAs: [owner.linkedin] } : {}),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Products and services',
      itemListElement: categories.map((c) => ({ '@type': 'OfferCatalog', name: c.name, description: c.tagline })),
    },
  };
  return [
    `<title>${esc(seo.title)}</title>`,
    `<meta name="description" content="${esc(seo.description)}" />`,
    `<meta name="keywords" content="${esc(seo.keywords.join(', '))}" />`,
    `<meta name="author" content="${esc(owner.name)}" />`,
    `<meta name="robots" content="index, follow" />`,
    ...(SITE.siteUrl ? [`<link rel="canonical" href="${esc(base())}/" />`] : []),
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(SITE.name)}" />`,
    `<meta property="og:locale" content="${esc(seo.locale)}" />`,
    `<meta property="og:title" content="${esc(seo.title)}" />`,
    `<meta property="og:description" content="${esc(seo.description)}" />`,
    `<meta property="og:image" content="${esc(abs(seo.image))}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    ...(SITE.siteUrl ? [`<meta property="og:url" content="${esc(base())}/" />`] : []),
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(seo.title)}" />`,
    `<meta name="twitter:description" content="${esc(seo.description)}" />`,
    `<meta name="twitter:image" content="${esc(abs(seo.image))}" />`,
    `<script type="application/ld+json">${JSON.stringify(org)}</script>`,
  ].join('\n    ');
}

// Rewrite the head of the built index.html for one page
function htmlFor(template, page) {
  const title = esc(fullTitle(page.title));
  const desc = esc(clip(page.description));
  const img = esc(abs(page.image || SITE.seo.image));
  const url = esc(`${base()}${canonicalPath(page.path)}`);
  const set = (html, attr, key, value) =>
    html.replace(new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`), `$1${value}$2`);
  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
  html = set(html, 'name', 'description', desc);
  html = set(html, 'property', 'og:title', title);
  html = set(html, 'property', 'og:description', desc);
  html = set(html, 'property', 'og:image', img);
  html = set(html, 'property', 'og:url', url);
  html = set(html, 'name', 'twitter:title', title);
  html = set(html, 'name', 'twitter:description', desc);
  html = set(html, 'name', 'twitter:image', img);
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
  // the page-type of inner pages
  if (page.path !== '/') html = set(html, 'property', 'og:type', page.path.startsWith('/product/') ? 'product' : 'website');
  return html;
}

function sitemap() {
  const today = new Date().toISOString().slice(0, 10);
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages()
  .map((p) => `  <url><loc>${base()}${canonicalPath(p.path)}</loc><lastmod>${today}</lastmod><priority>${p.priority}</priority></url>`)
  .join('\n')}
</urlset>
`;
}

export default function seoPlugin() {
  let outDir = 'dist';
  return {
    name: 'site-seo',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    transformIndexHtml(html) {
      return html.replace('<!-- SEO_TAGS -->', headTags());
    },
    generateBundle() {
      const robots = ['User-agent: *', 'Allow: /', ...(SITE.siteUrl ? [`Sitemap: ${base()}/sitemap.xml`] : [])].join('\n') + '\n';
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots });
      if (SITE.siteUrl) this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap() });
    },
    closeBundle() {
      const index = path.join(outDir, 'index.html');
      if (!fs.existsSync(index)) return;
      const template = fs.readFileSync(index, 'utf8');
      // one real HTML file per page
      for (const page of pages()) {
        if (page.path === '/') continue;
        const dir = path.join(outDir, decodeURIComponent(page.path));
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, 'index.html'), htmlFor(template, page));
      }
      // unknown addresses → app shows its "Page not found" screen
      fs.writeFileSync(path.join(outDir, '404.html'), template.replace('content="index, follow"', 'content="noindex, follow"'));
    },
  };
}
