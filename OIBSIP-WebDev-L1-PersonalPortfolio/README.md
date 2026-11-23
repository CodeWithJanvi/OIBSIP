# Developer Portfolio

Open `index.html` in a browser. No build step needed (Google Fonts need internet).

## Customize
- Search `Your Name`, `you@example.com`, `yourusername` in index.html and replace.
- Your photo is `assets/janvi.jpg`. Skill bar levels are `data-level` values in index.html.
- Theme toggle (dark/light) is saved in the browser.
- Edit colours in `css/style.css` under `:root`.
- Edit typing words and code editor text at the top of `js/main.js`.
- Replace `#` in project GitHub links with your repo URLs.
- Deploy free on GitHub Pages, Netlify or Vercel.

## v4 features
Boot screen, cursor glow, tech marquee, animated avatar ring, skill % counters, scroll progress ring (right side), terminal-style footer with live clock.

## Make the contact form send real emails (free)
1. Go to https://web3forms.com, enter lumbhanijanvi59@gmail.com and get your Access Key by email.
2. Open js/main.js and paste it: `const WEB3FORMS_KEY = 'your-key';`
3. Upload the site online (GitHub Pages / Netlify) and test. Without a key the form opens Gmail compose instead.

## Branding
Logo and favicon are in assets/ (logo.svg, favicon.svg, favicon-32.png, apple-touch-icon.png, og-image.png).
After you deploy, change the og:image content in index.html to the full URL (https://your-site/assets/og-image.png) so link previews show the image.
