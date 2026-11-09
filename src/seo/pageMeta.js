// Page titles and descriptions for every page.
// Used in the browser (usePageMeta) AND at build time (seo-plugin.js writes a real
// HTML file per page, so Google and WhatsApp/Facebook previews see the right text).
// Keep imports with ".js" extensions: this file also runs in Node during the build.
import { SITE } from '../config.js';

export const clip = (text, max = 160) => {
  const t = String(text || '').replace(/\s+/g, ' ').trim();
  return t.length > max ? `${t.slice(0, max - 1).replace(/\s+\S*$/, '')}…` : t;
};

export const fullTitle = (title) => (title ? `${title} | ${SITE.name}` : SITE.seo.title);

export const homeMeta = () => ({ title: '', description: SITE.seo.description, image: SITE.seo.image });

export const aboutMeta = () => ({
  title: `About ${SITE.owner.name} – Founder`,
  description: `Meet ${SITE.owner.name}, founder of ${SITE.name}: ethical hacking products, device service, custom projects, PCB design, websites and mobile apps.`,
  image: SITE.owner.photo,
});

export const categoryMeta = (category) => ({
  title: category.name,
  description: `${category.tagline} ${category.subcategories.map((s) => s.name).join(', ')}.`,
  image: category.image,
});

export const subcategoryMeta = (category, sub) => ({
  title: `${sub.name} – ${category.shortName}`,
  description: `${sub.description} ${category.name} from ${SITE.name}. Order easily on WhatsApp.`,
  image: sub.image,
});

export const productMeta = (product, sub) => ({
  title: product.name,
  description: product.shortDescription || product.description || `${product.name} from ${sub?.name || SITE.name}.`,
  image: product.image,
});

// Page address with a trailing slash (GitHub Pages serves every page as folder/index.html)
export const canonicalPath = (pathname = '/') => {
  const p = `/${String(pathname).replace(/^\/+|\/+$/g, '')}`;
  return p === '/' ? '/' : `${p}/`;
};
