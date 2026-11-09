import { SITE } from '../config';

const formatter = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 });

export const hasPrice = (value) => typeof value === 'number' && !Number.isNaN(value);

export const formatPrice = (value) =>
  hasPrice(value) ? `${SITE.currency}${formatter.format(value)}` : 'Price on request';

export const discountPercent = (price, mrp) =>
  hasPrice(price) && mrp && mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;

// Resolves a product image: full URLs are used as-is, local paths are
// resolved against the site base so the build works from any folder.
export const resolveImage = (src) => {
  if (!src) return '';
  if (/^(https?:|data:)/.test(src)) return src;
  return `${import.meta.env.BASE_URL}${src.replace(/^\.?\//, '')}`;
};
