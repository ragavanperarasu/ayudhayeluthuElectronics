import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import seoPlugin from './seo-plugin.js';
import { SITE } from './src/config.js';

// The folder the site is served from comes from SITE.siteUrl in src/config.js:
//   https://ragavanperarasu.github.io/ayudhayeluthuElectronics  →  /ayudhayeluthuElectronics/
//   https://www.yourdomain.com                                  →  /
const base = SITE.siteUrl ? new URL(SITE.siteUrl).pathname.replace(/\/*$/, '/') : '/';

export default defineConfig({
  plugins: [react(), seoPlugin()],
  base,
});
