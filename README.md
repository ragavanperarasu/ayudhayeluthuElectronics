# Ayudhayeluthu Electronics

Static website built with **React + Material UI (Vite)** and **React Router**.

- **Ethical Hacking Products**: Wi-Fi & network testing, USB & HID tools, RFID & NFC tools, learning kits
- **Electronic Device Service**: laptop, mobile and tech gadget service
- **Custom Product Creation**: school projects, college projects, prototype building
- **Website Development**: business websites, e-commerce websites, portfolio & personal websites
- **Mobile App Development**: Android apps, iOS apps, cross-platform apps

Customers order on **WhatsApp**. WhatsApp opens only from the order buttons, with the order details already filled in.

## Pages

| Address | Page |
| --- | --- |
| `/` | Home: the 5 main categories |
| `/category/ethical-hacking` | A main category: its sub-categories |
| `/category/ethical-hacking/wifi-network` | A sub-category: its products (shows "Items coming soon" while empty) |
| `/product/AYE-001` | A single product's details |
| `/about` | About page |

## Run locally

```bash
npm install
npm run dev        # opens http://localhost:5173
```

## Build for hosting

```bash
npm run build      # creates the static site in the dist/ folder
```

Upload the contents of `dist/` to the **root of your domain**. Because pages have clean addresses (`/category/...`), the host must send every address to `index.html`. The rules for this are already included:

| Host | File (already in the build) |
| --- | --- |
| Netlify | `_redirects` |
| Hostinger / cPanel / Apache | `.htaccess` (a hidden file; make sure it is uploaded) |
| Vercel | `vercel.json` |
| GitHub Pages | `404.html` |

## SEO

- **Set your domain** in `src/config.js` → `siteUrl: 'https://www.yourdomain.com'`, then run `npm run build` again. This turns on `sitemap.xml`, canonical links and full share-preview image links.
- After the site is live, add it to [Google Search Console](https://search.google.com/search-console) and submit `https://www.yourdomain.com/sitemap.xml`.
- Home page title, description and keywords: `src/config.js` → `seo`.
- Every page sets its own title, description, share preview and structured data (breadcrumbs, products with price) automatically from the category and product data.
- Share preview picture (WhatsApp, Facebook, LinkedIn): `public/og-image.jpg` (1200×630).
- Image file names: use descriptive words, e.g. `laptop-screen-replacement.jpg`, not `image.png`, and fill in `imageAlt` for category photos.

## Add products

Open **`src/data/products.js`**. It starts empty and has a ready-to-copy example at the top. Each product needs:

- `category`: the main category id (`ethical-hacking`, `device-service`, `custom-projects`, `website-development`, `mobile-app-development`)
- `subcategory`: the sub-category id (listed at the top of the file)

`price` is optional. Leave it out and the site shows **"Price on request"** (useful for repair services and custom projects).

Put product photos in `public/images/products/` and set `image: 'images/products/your-photo.jpg'`, or use a full `https://` image link.

## Change categories

Edit **`src/data/categories.js`** to rename categories, change descriptions or photos, or add sub-categories. The menu, home page and footer update automatically.

## Change shop details

Edit **`src/config.js`**: shop name, tagline, WhatsApp number, About text and photo, LinkedIn link.

## Photos

Category photos are in `public/images/categories/`. They are CC0 / public-domain photos from Openverse; see `IMAGE-CREDITS.md`.
