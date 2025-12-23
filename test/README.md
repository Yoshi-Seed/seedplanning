# Seed Planning — Static Website Demo (HTML/CSS/JS)

This is a clean, responsive, animated one-page website template inspired by the provided mockups.

## Files
- `index.html`
- `css/styles.css`
- `js/main.js`
- `assets/` (images + favicon)
- `downloads/` (placeholder PDFs used by "Download PDF" buttons)

## Run locally
Just open `index.html` in your browser.

If you prefer a local server (recommended for some browsers):
- Python:
  - `python -m http.server 8000`
  - then open `http://localhost:8000`

## GitHub Pages
1. Create a repo and push these files to the root (or `/docs`).
2. In GitHub: Settings → Pages → Deploy from a branch → select your branch and root folder.
3. Your site will be available at the GitHub Pages URL.

## "Send URL to my PC" button
This uses a `mailto:` link (opens the default mail client) with:
- Subject: `Check Seed Planning Website`
- Body: the current page URL

To change the recipient address, edit this line in `js/main.js`:
```js
const EMAIL_TO = "eddyhonda@gmail.com";
```

Enjoy shipping 🚀



## Splash intro (logo-only)
- On first open (per browser tab/session), the site shows a logo-only splash screen.
- Click/Tap the “living” logo:
  - logo shrinks + page fades into the beige earth-tone background
  - a small loading animation plays
  - after ~2 seconds it redirects into the full site

To see the splash again, open the site in a new tab or clear the session storage key `sp_intro_done_v1`.
