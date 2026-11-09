import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import seoPlugin from './seo-plugin.js';

// The site uses clean page addresses (/category/ethical-hacking) so Google can
// index every page. Host it at the root of a domain; hosting rules for
// Netlify (public/_redirects), Apache/cPanel/Hostinger (public/.htaccess),
// Vercel (vercel.json) and GitHub Pages (404.html) are included.
export default defineConfig({
  plugins: [react(), seoPlugin()],
  base: '/',
});
