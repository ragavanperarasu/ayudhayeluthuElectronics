// Build-time SEO for the static site:
//  • injects title / description / Open Graph / Twitter / JSON-LD tags into index.html (from src/config.js)
//  • writes robots.txt and sitemap.xml (sitemap only when SITE.siteUrl is set)
//  • copies index.html → 404.html so direct links work on GitHub Pages
import fs from 'node:fs';
import path from 'node:path';
import { SITE } from './src/config.js';
import categories from './src/data/categories.js';
import products from './src/data/products.js';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const base = () => SITE.siteUrl.replace(/\/+$/, '');
const abs = (p) => (SITE.siteUrl ? `${base()}/${p.replace(/^\/+/, '')}` : `/${p.replace(/^\/+/, '')}`);

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

function sitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = [
    ['/', '1.0'],
    ['/about', '0.6'],
    ...categories.flatMap((c) => [
      [`/category/${c.id}`, '0.9'],
      ...c.subcategories.map((s) => [`/category/${c.id}/${s.id}`, '0.8']),
    ]),
    ...products.map((p) => [`/product/${encodeURIComponent(p.id)}`, '0.7']),
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(([u, pr]) => `  <url><loc>${base()}${u}</loc><lastmod>${today}</lastmod><priority>${pr}</priority></url>`).join('\n')}
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
      if (fs.existsSync(index)) fs.copyFileSync(index, path.join(outDir, '404.html'));
    },
  };
}
