# Dimitri Mumladze — Portfolio

A one-page, bilingual portfolio in a neo-brutalist style: English at `/`, Georgian at `/ka/`, light "Classic Pop" and dark "Neon Orange" themes.

Live site (after deploying): **https://dimitrimumladze.github.io**

## Stack

- **[Astro 7](https://astro.build)** with TypeScript. The output is static HTML, CSS is inlined, and no client framework is used.
- **Plain scoped CSS** built on design tokens in `src/styles/tokens.css`.
- **Self-hosted fonts** through the Astro Fonts API:
  - Space Grotesk, JetBrains Mono, Anonymous Pro and Noto Sans Georgian, from `@fontsource` packages
  - GL Erekles Stamba, for the Georgian hero name
- **Small inline scripts**, only where needed: theme, language, mobile menu, active-section highlight, reveal-on-scroll, marquee pause, certificate lightbox and contact form. Without JavaScript, every part of the page still works.
- **Extras:** `@astrojs/sitemap` (with hreflang alternates), JSON-LD `Person`, Open Graph and Twitter cards.

## Requirements

Node.js **22.23 or newer**, as Astro 7 requires (CI uses Node 24), plus npm.

## Commands

| Command           | What it does                                                        |
| ----------------- | ------------------------------------------------------------------- |
| `npm install`     | Install dependencies                                                |
| `npm run dev`     | Dev server at http://localhost:4321                                 |
| `npm run build`   | Type-check (`astro check`), then build the static site into `dist/` |
| `npm run preview` | Serve the built `dist/` locally                                     |
| `npm run assets`  | Regenerate the OG images, favicons and touch icon (see below)       |

## Project structure

```
.github/workflows/deploy.yml   GitHub Pages deployment
public/                        files served as-is: CV, OG images, favicons, robots.txt
scripts/generate-assets.mjs    OG images, favicons and placeholders (npm run assets)
src/assets/                    photo, certificate images, GL Erekles Stamba font
src/components/                page sections; components/ui/ holds Button, Card, Sticker, TagList
src/data/                      ALL content (EN + KA)
src/layouts/BaseLayout.astro   <head>: SEO, fonts, theme script
src/pages/                     index.astro (EN), ka/index.astro (KA), 404.astro
src/styles/                    tokens.css (themes, type, spacing), global.css
```

## Editing content

All text lives in `src/data/`, and every visible string is written as `{ en: '…', ka: '…' }`.

| File              | Contents                                                               |
| ----------------- | ---------------------------------------------------------------------- |
| `site.ts`         | Name, role, contacts, links, headline, stats, marquee, education, languages, Formspree ID |
| `experience.ts`   | Work history                                                           |
| `projects.ts`     | Project cards                                                          |
| `skills.ts`       | Skill groups                                                           |
| `certificates.ts` | Certificates                                                           |
| `i18n.ts`         | Interface labels (navigation, buttons, form messages…)                 |

In the headline, `==words==` become highlighted marks.

### Images and files

- **Photo:** `src/assets/images/dimitri.jpg`, a square crop. Astro generates responsive AVIF and WebP versions at build time.
- **Certificates:** put the image at `src/assets/certificates/<id>.png`, where `<id>` matches the entry in `certificates.ts`. `.jpg`, `.webp` and `.avif` also work. The image size is detected automatically. Keep only one file per id, because the build stops with a clear message if there are two.
- **CV:** `public/cv/Dimitri_Mumladze_CV.pdf`. The "Download CV" button links here.
- **Social previews and icons:**
  - `npm run assets` redraws these files: `public/og-image.png`, `public/og-image-ka.png`, `favicon.svg`, `favicon.ico` and `apple-touch-icon.png`.
  - The text on the OG images is set at the top of `scripts/generate-assets.mjs`. If you change your name or role in `site.ts`, update it there too and rerun the command.
  - The script only creates the certificate and CV placeholders when those files are missing, so it never overwrites your real files.

### Contact form

The form posts to [Formspree](https://formspree.io). Set `FORMSPREE_FORM_ID` in `src/data/site.ts` to the last part of your form's endpoint (for `https://formspree.io/f/abcdwxyz` that is `abcdwxyz`).

Until it is set, the form shows an error message with your e-mail address and sends nothing. With JavaScript, the form sends in the background and shows inline errors and a status message. Without JavaScript, it falls back to a normal POST. A hidden `_gotcha` honeypot filters bots.

## Deploy to GitHub Pages

The repository already has its first commit on `main`. It has not been pushed.

1. On GitHub, create a **public** repository named exactly **`DimitriMumladze.github.io`**. Leave it empty: no README, `.gitignore` or license.
2. In this folder, run:
   ```sh
   git remote add origin https://github.com/DimitriMumladze/DimitriMumladze.github.io.git
   git push -u origin main
   ```
3. In the repository, open **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions**.
4. Open the **Actions** tab. The **Deploy to GitHub Pages** workflow starts on every push to `main`.
   - If the first run failed because Pages was not enabled yet, rerun it there, or use **Run workflow**.
   - Once it is green, the site is live at https://dimitrimumladze.github.io.

The workflow (`.github/workflows/deploy.yml`) uses `withastro/action`. That action installs from `package-lock.json`, runs `npm run build` and uploads `dist/`; `actions/deploy-pages` then publishes it. `astro.config.mjs` sets `site` to `https://dimitrimumladze.github.io`, with no `base`, because this is a user site.

## TODO

- [ ] **Formspree.** Create the form and set `FORMSPREE_FORM_ID` in `src/data/site.ts`. If submissions fail with a reCAPTCHA error, turn reCAPTCHA off in the form's settings; the honeypot already handles spam.
- [ ] **CV.** Replace the placeholder `public/cv/Dimitri_Mumladze_CV.pdf` with the PDF exported from your CV. Keep the file name.
- [ ] **Certificates.** Replace the placeholders `src/assets/certificates/exadel.png` and `claude-code.png` with the real images. Also add the Claude Code course title and date in `src/data/certificates.ts`.
- [ ] **GL Erekles Stamba licence.** The font file carries no licence text, so confirm the licence allows use on the web and redistribution.
  - The public repository contains the font files `scripts/assets/GLEreklesStamba-Regular.ttf` and `src/assets/fonts/GLEreklesStamba-Regular.woff2`.
  - The font is used for the Georgian hero name and for `og-image-ka.png`.
  - To drop it, remove the `--font-display-ka` entry in `astro.config.mjs`, the matching `<Font>` line in `src/layouts/BaseLayout.astro` and `var(--font-display-ka),` in `src/styles/tokens.css`. The name then uses Noto Sans Georgian.
- [ ] **Deploy.** Follow the steps above.

## Notes

- **Fonts.** In Astro 7.4.8, `fontProviders.npm()` fails to read installed font files with `CannotFetchFontFile` on `file://` URLs. As a workaround, `astro.config.mjs` uses `fontProviders.local()` and points it at the `.woff2` files inside `node_modules/@fontsource*`. Once a newer Astro fixes this, the npm provider can be used again.
- **HTML compression.** `compressHTML` is set to `true`. Astro 7's default, `'jsx'`, removes spaces between inline elements written on separate lines.
- **Saved preferences.** The visitor's choices are stored in `localStorage` under `theme` and `lang`. A visitor who chose Georgian and later opens `/` is redirected to `/ka/`. The theme is applied before the page paints, so it never flashes.
- **Checks run before the first commit:**
  - `astro check` reported 0 errors, warnings or hints.
  - Lighthouse (mobile, local preview) gave 98–100 / 100 / 100 / 100 for EN and 96–98 / 100 / 100 / 100 for KA.
  - No page scrolls horizontally from 320 to 1440 px, in either language or theme.
  - Keyboard navigation, the mobile menu, the lightbox, the contact form and reduced motion were tested in headless Chrome.
