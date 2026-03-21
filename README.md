# Kintsugi — Free Multilingual Informational Website

A fully static, multi-page website about the Japanese art of Kintsugi.
Built with pure HTML5 / CSS3 / Vanilla JavaScript. Zero dependencies, no build step.

Created by **Kerem Tuna Yetkin**. Deployed on [Vercel](https://vercel.com).

---

## Quick Start

Open `index.html` in any browser — no build step required.

For language switching and i18n to work, serve from a local server:

```bash
# Python 3
python -m http.server 8080

# Node (npx)
npx serve .
```

Then open `http://localhost:8080`.

---

## Pages

| File | Page |
|---|---|
| `index.html` | Homepage |
| `history.html` | History & Origins |
| `philosophy.html` | Philosophy |
| `technique.html` | Technique & Materials |
| `artists.html` | Artists |
| `kintsugi-today.html` | Kintsugi Today |
| `gallery.html` | Gallery |
| `faq.html` | FAQ |

---

## Project Structure

```
kintsugi-site/
├── assets/
│   ├── css/
│   │   ├── reset.css          # Base reset + .sr-only utility
│   │   ├── variables.css      # Design tokens (colours, spacing, type)
│   │   ├── typography.css     # Font-face declarations
│   │   ├── main.css           # Global styles
│   │   ├── layout.css         # Page layout, footer credit
│   │   ├── components.css     # All reusable + page-specific components
│   │   ├── lang-switcher.css  # Language switcher UI
│   │   └── tooltip.css        # Tooltip component
│   ├── js/
│   │   ├── main.js            # Entry point
│   │   ├── nav.js             # Navigation behaviour
│   │   ├── lang.js            # i18n language switching
│   │   ├── tooltip.js         # Tooltip component
│   │   ├── accordion.js       # FAQ accordion (smooth max-height animation)
│   │   ├── gallery-init.js    # Gallery filter, masonry, lightbox, keyboard nav
│   │   └── reveal.js          # Philosophy page answer reveal
│   ├── i18n/
│   │   ├── en.json            # English strings
│   │   ├── tr.json            # Turkish strings
│   │   └── ja.json            # Japanese strings
│   ├── fonts/
│   │   ├── shippori-mincho/   # Japanese serif font (.woff2)
│   │   └── cormorant-garamond/# Display serif font (.woff2)
│   └── images/
│       ├── hero/              # Full-bleed hero images (one per page)
│       ├── gallery/           # Gallery images (gallery-01 … gallery-12)
│       ├── artists/           # Artist portraits (.webp)
│       ├── icons/             # UI icons
│       └── world-map.webp     # World map for Kintsugi Today page
├── index.html
├── history.html
├── philosophy.html
├── technique.html
├── artists.html
├── kintsugi-today.html
├── gallery.html
└── faq.html
```

---

## Languages

Supported: English (`en`), Turkish (`tr`), Japanese (`ja`)

Translation strings live in `assets/i18n/`. All user-visible text is fully translated
across all three languages, including tooltips, ARIA labels, and navigation.

---

## Fonts (Required for full visual fidelity)

Download and place `.woff2` files in:
- `assets/fonts/shippori-mincho/` — [Shippori Mincho on Google Fonts](https://fonts.google.com/specimen/Shippori+Mincho)
- `assets/fonts/cormorant-garamond/` — [Cormorant Garamond on Google Fonts](https://fonts.google.com/specimen/Cormorant+Garamond)

Required files:
```
shippori-mincho/
  ShipporiMincho-Medium.woff2
  ShipporiMincho-Bold.woff2

cormorant-garamond/
  CormorantGaramond-Light.woff2
  CormorantGaramond-Regular.woff2
  CormorantGaramond-Medium.woff2
  CormorantGaramond-SemiBold.woff2
  CormorantGaramond-LightItalic.woff2
```

Without the font files the site falls back to Georgia/serif — fully functional, slightly less refined.

---

## Images

- **Hero images** — one per page in `assets/images/hero/`
- **Gallery** — 12 items: `gallery-01.webp` through `gallery-12.webp` in `assets/images/gallery/`
- **Artists** — portraits in `assets/images/artists/` (all compressed to `.webp`)
- **World map** — `assets/images/world-map.webp` (compressed from 4.4 MB PNG → 21 KB WebP)

Use `.webp` format for all new images. Total image footprint: ~448 KB.

---

## Performance

- No inline `<style>` or `<script>` blocks — all CSS and JS are external and browser-cached
- All `<script>` tags use `defer` — zero render-blocking JavaScript
- Dead CSS removed; `.sr-only` centralised in `reset.css`
- All images compressed to WebP (99%+ size reduction on the world map)
- `theme-color` and `color-scheme` meta tags on every page

---

## Deployment

The site is deployed on **Vercel** from this GitHub repository.
Any push to `main` triggers an automatic redeploy.

It can also be hosted on:
- GitHub Pages
- Netlify (drag & drop)
- Any static web server via FTP/SFTP
