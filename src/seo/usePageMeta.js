import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE } from '../config';
import { canonicalPath, clip, fullTitle } from './pageMeta';

// Absolute URL (needed by Google / share previews) when SITE.siteUrl is set, otherwise a root path.
export const absUrl = (path = '') => {
  const clean = `/${String(path).replace(/^\.?\/+/, '')}`;
  return SITE.siteUrl ? `${SITE.siteUrl.replace(/\/+$/, '')}${clean}` : clean;
};

const setMeta = (attr, key, content) => {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const setCanonical = (href) => {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!href) return el?.remove();
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
};

const setJsonLd = (data) => {
  let el = document.getElementById('page-jsonld');
  if (!data) return el?.remove();
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = 'page-jsonld';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
};

/**
 * Sets the page title, description, share-preview tags, canonical link and
 * structured data for the current page.
 */
export default function usePageMeta({ title, description, image, noindex = false, jsonLd } = {}) {
  const { pathname } = useLocation();
  const jsonKey = jsonLd ? JSON.stringify(jsonLd) : '';

  useEffect(() => {
    const pageTitle = fullTitle(title);
    const desc = clip(description || SITE.seo.description);
    const img = /^https?:/.test(image || '') ? image : absUrl(image || SITE.seo.image);
    const url = SITE.siteUrl ? absUrl(canonicalPath(pathname)) : '';

    document.title = pageTitle;
    setMeta('name', 'description', desc);
    setMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow');
    setMeta('property', 'og:title', pageTitle);
    setMeta('property', 'og:description', desc);
    setMeta('property', 'og:image', img);
    if (url) setMeta('property', 'og:url', url);
    setMeta('name', 'twitter:title', pageTitle);
    setMeta('name', 'twitter:description', desc);
    setMeta('name', 'twitter:image', img);
    setCanonical(url);
    setJsonLd(jsonKey ? JSON.parse(jsonKey) : null);
  }, [title, description, image, noindex, jsonKey, pathname]);
}

// Structured data helper: breadcrumb trail → schema.org BreadcrumbList
export const breadcrumbLd = (crumbs) => ({
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.label,
    ...(c.to ? { item: absUrl(canonicalPath(c.to)) } : {}),
  })),
});
