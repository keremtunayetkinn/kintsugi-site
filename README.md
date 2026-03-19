# Kintsugi — Free Multilingual Informational Website

A fully static, multi-page website about the Japanese art of Kintsugi.
Built with pure HTML5 / CSS3 / Vanilla JavaScript. Zero dependencies.

## Quick Start

Open `index.html` in any browser — no build step required.

For language switching and i18n to work, serve from a local server:

```bash
# Python 3
python -m http.server 8080

# Node (npx)
npx serve .
```

Then open: `http://localhost:8080`

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

Without the font files, the site falls back to Georgia/serif — fully functional, slightly less refined.

## Images

Add your images to:
- `assets/images/hero/` — Full-bleed hero images (one per page)
- `assets/images/gallery/` — Gallery images (12 items, `gallery-01.webp` through `gallery-12.webp`)
- `assets/images/artists/` — Artist portraits

Use `.webp` format with `.jpg` fallback.

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

## Languages

Supported: English (`en`), Turkish (`tr`), Japanese (`ja`)
Strings: `assets/i18n/en.json`, `assets/i18n/tr.json`, `assets/i18n/ja.json`

## Deployment

Upload the folder to any static host:
- GitHub Pages
- Netlify (drag & drop)
- Vercel
- Any web server via FTP/SFTP
