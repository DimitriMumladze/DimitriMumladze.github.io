// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/*
 * Fonts are self-hosted: Astro's Fonts API copies the files from the installed @fontsource
 * packages into the build (no CDN, no Google request, no network needed to build).
 * The `local` provider is used because the `npm` provider's offline mode hands Astro 7.4
 * `file://` URLs it cannot read yet. Unicode ranges mirror the @fontsource subsets.
 */
const localFonts = fontProviders.local();
const pkg = (/** @type {string} */ file) => `./node_modules/${file}`;

const LATIN = /** @type {[string, ...string[]]} */ ([
  'U+0000-00FF',
  'U+0131',
  'U+0152-0153',
  'U+02BB-02BC',
  'U+02C6',
  'U+02DA',
  'U+02DC',
  'U+0304',
  'U+0308',
  'U+0329',
  'U+2000-206F',
  'U+20AC',
  'U+2122',
  'U+2191',
  'U+2193',
  'U+2212',
  'U+2215',
  'U+FEFF',
  'U+FFFD',
]);
const GEORGIAN = /** @type {[string, ...string[]]} */ ([
  'U+0589',
  'U+10A0-10FF',
  'U+1C90-1CBA',
  'U+1CBD-1CBF',
  'U+205A',
  'U+2D00-2D2F',
  'U+2E31',
]);

export default defineConfig({
  // User site (DimitriMumladze.github.io) is served from the domain root, so no `base`.
  site: 'https://dimitrimumladze.github.io',

  // Astro 7 defaults to JSX whitespace rules ('jsx'), which drop spaces between inline
  // elements written on separate lines (e.g. <mark> inside sentences). Keep lossless mode.
  compressHTML: true,

  // Lets a parent's scoped styles reach a child component's root via the `class` prop
  // (e.g. layout tweaks on <Button class="…">). Not supported by the 'attribute' strategy.
  scopedStyleStrategy: 'class',

  build: {
    // One-page site: inline all CSS so first paint never waits on a stylesheet request.
    inlineStylesheets: 'always',
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ka'],
    routing: { prefixDefaultLocale: false },
  },

  integrations: [
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', ka: 'ka' } },
      filter: (page) => !page.includes('/404'),
    }),
  ],

  fonts: [
    {
      // Body + UI text (EN, and Latin runs such as "C#" or ".NET" on KA pages).
      provider: localFonts,
      name: 'Space Grotesk',
      cssVariable: '--font-sans',
      fallbacks: ['sans-serif'],
      options: {
        variants: [
          {
            src: [pkg('@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2')],
            weight: '300 700',
            style: 'normal',
            unicodeRange: LATIN,
          },
        ],
      },
    },
    {
      // Tags, dates, code-ish labels.
      provider: localFonts,
      name: 'JetBrains Mono',
      cssVariable: '--font-mono',
      fallbacks: ['monospace'],
      options: {
        variants: [
          {
            src: [pkg('@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2')],
            weight: '100 800',
            style: 'normal',
            unicodeRange: LATIN,
          },
        ],
      },
    },
    {
      // Hero name (EN) and the "DM" logo.
      provider: localFonts,
      name: 'Anonymous Pro',
      cssVariable: '--font-display',
      fallbacks: ['monospace'],
      options: {
        variants: [
          {
            src: [pkg('@fontsource/anonymous-pro/files/anonymous-pro-latin-700-normal.woff2')],
            weight: 700,
            style: 'normal',
            unicodeRange: LATIN,
          },
        ],
      },
    },
    {
      // Georgian text. No fallbacks so KA stacks can be composed as
      // `var(--font-georgian), var(--font-sans)` without a generic family in between.
      provider: localFonts,
      name: 'Noto Sans Georgian',
      cssVariable: '--font-georgian',
      fallbacks: [],
      options: {
        variants: [
          {
            src: [pkg('@fontsource-variable/noto-sans-georgian/files/noto-sans-georgian-georgian-wght-normal.woff2')],
            weight: '100 900',
            style: 'normal',
            unicodeRange: GEORGIAN,
          },
        ],
      },
    },
    {
      // Hero name on the Georgian page (GeoLab's GL Erekles Stamba, regular only).
      provider: localFonts,
      name: 'GL Erekles Stamba',
      cssVariable: '--font-display-ka',
      fallbacks: [],
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/GLEreklesStamba-Regular.woff2'],
            weight: 400,
            style: 'normal',
          },
        ],
      },
    },
  ],
});
