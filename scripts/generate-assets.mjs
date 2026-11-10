#!/usr/bin/env node
/**
 * Generates the site's images from code:
 *   public/og-image.png, public/og-image-ka.png  social previews, 1200×630
 *   public/favicon.svg, public/favicon.ico       "DM" block
 *   public/apple-touch-icon.png                  180×180
 * and placeholders, written ONLY when the file is missing (your real files are never touched):
 *   src/assets/certificates/<id>.png             certificate images
 *   public/cv/Dimitri_Mumladze_CV.pdf            CV download
 *
 * Run with `npm run assets`. Satori turns text into SVG paths, sharp rasterizes the result.
 * Texts below mirror src/data/site.ts; update both if your role or headline changes.
 */
import { access, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import satori from 'satori';
import sharp from 'sharp';

const root = fileURLToPath(new URL('..', import.meta.url));
const at = (...parts) => path.join(root, ...parts);

/* ---- Design tokens (light "Classic Pop" theme) ---------------------------- */
const C = {
  bg: '#FFFDF5',
  fg: '#000000',
  card: '#FFFFFF',
  yellow: '#FFD93D',
  pink: '#FF6B9D',
  blue: '#4D96FF',
};

const SITE_HOST = 'dimitrimumladze.github.io';
const TAGS = ['C#', 'ASP.NET Core', 'SQL Server', 'REST APIs'];
const CONTENT = {
  en: {
    name: ['DIMITRI', 'MUMLADZE'],
    nameFont: 'Anonymous Pro',
    nameSize: 116,
    nameWeight: 700,
    role: 'SOFTWARE DEVELOPER (.NET)',
    roleFont: 'Anonymous Pro',
    roleSize: 30,
    city: 'TBILISI',
  },
  ka: {
    name: ['დიმიტრი', 'მუმლაძე'],
    nameFont: 'GL Erekles Stamba',
    nameSize: 96,
    nameWeight: 400,
    role: 'პროგრამული უზრუნველყოფის დეველოპერი (.NET)',
    roleFont: 'GL Erekles Stamba',
    roleSize: 25,
    city: 'თბილისი',
  },
};

/** Placeholder certificates (ids match src/data/certificates.ts). */
const CERTIFICATES = [
  { id: 'exadel', title: 'Exadel .NET Bootcamp', issuer: 'Exadel' },
  { id: 'claude-code', title: 'Claude Code', issuer: 'LinkedIn Learning' },
];

/* ---- Helpers --------------------------------------------------------------- */
const exists = async (file) => {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
};

/** Tiny hyperscript for satori: h('div', style, ...children). Every div is a border-box flex box. */
const h = (type, style = {}, ...children) => ({
  type,
  props: {
    style: type === 'div' ? { display: 'flex', boxSizing: 'border-box', ...style } : style,
    children: children.flat().filter((child) => child !== null && child !== undefined && child !== false),
  },
});
const img = (src, width, height, style = {}) => ({ type: 'img', props: { src, width, height, style } });
const dataUri = (mime, buffer) => `data:${mime};base64,${Buffer.from(buffer).toString('base64')}`;
const DOTS = dataUri(
  'image/svg+xml',
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><circle cx="12" cy="12" r="1.7" fill="#000" fill-opacity="0.17"/></svg>',
);

const smallCross = (cx, cy) =>
  `<rect x="${cx - 2.5}" y="${cy - 0.75}" width="5" height="1.5"/><rect x="${cx - 0.75}" y="${cy - 2.5}" width="1.5" height="5"/>`;
const FLAG_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 20"><rect width="30" height="20" fill="#fff"/>' +
  '<g fill="#f00"><rect x="13" width="4" height="20"/><rect y="8" width="30" height="4"/>' +
  smallCross(6.5, 4) +
  smallCross(23.5, 4) +
  smallCross(6.5, 16) +
  smallCross(23.5, 16) +
  '</g><rect x=".75" y=".75" width="28.5" height="18.5" fill="none" stroke="#000" stroke-width="1.5"/></svg>';

async function loadFonts() {
  const fontsource = (file) => readFile(at('node_modules/@fontsource/anonymous-pro/files', file));
  return [
    { name: 'Anonymous Pro', data: await fontsource('anonymous-pro-latin-400-normal.woff'), weight: 400, style: 'normal' },
    { name: 'Anonymous Pro', data: await fontsource('anonymous-pro-latin-700-normal.woff'), weight: 700, style: 'normal' },
    {
      name: 'GL Erekles Stamba',
      data: await readFile(at('scripts/assets/GLEreklesStamba-Regular.ttf')),
      weight: 400,
      style: 'normal',
    },
  ];
}

async function render(element, width, height, fonts) {
  return satori(element, { width, height, fonts });
}

async function writePng(svg, file, { width, height } = {}) {
  let pipeline = sharp(Buffer.from(svg));
  if (width && height) pipeline = pipeline.resize(width, height);
  await pipeline.png({ compressionLevel: 9 }).toFile(file);
  console.log(`  wrote ${path.relative(root, file)}`);
}

/* ---- Pieces ---------------------------------------------------------------- */
const logo = (size, fontSize, border) =>
  h(
    'div',
    {
      width: size,
      height: size,
      alignItems: 'center',
      justifyContent: 'center',
      background: C.yellow,
      border: `${border}px solid ${C.fg}`,
      color: C.fg,
      fontFamily: 'Anonymous Pro',
      fontWeight: 700,
      fontSize,
      letterSpacing: -fontSize * 0.04,
    },
    'DM',
  );

function ogImage(lang, photoUri) {
  const c = CONTENT[lang];
  return h(
    'div',
    {
      width: 1200,
      height: 630,
      padding: '48px 60px',
      background: C.bg,
      backgroundImage: `url(${DOTS})`,
      backgroundSize: '24px 24px',
      backgroundRepeat: 'repeat',
      border: `10px solid ${C.fg}`,
      color: C.fg,
      fontFamily: 'Anonymous Pro',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    // Left: identity
    h(
      'div',
      { flexDirection: 'column', width: 640 },
      h(
        'div',
        { alignItems: 'center', gap: 20 },
        h('div', { boxShadow: `5px 5px 0 ${C.fg}` }, logo(64, 30, 4)),
        h('div', { fontSize: 24, fontWeight: 700 }, SITE_HOST),
      ),
      h(
        'div',
        {
          flexDirection: 'column',
          marginTop: 34,
          fontFamily: c.nameFont,
          fontWeight: c.nameWeight,
          fontSize: c.nameSize,
          lineHeight: lang === 'ka' ? 1.12 : 0.95,
          letterSpacing: lang === 'ka' ? 0 : -2,
        },
        h('div', {}, c.name[0]),
        h('div', { paddingLeft: c.nameSize * 0.5 }, c.name[1]),
      ),
      h(
        'div',
        { marginTop: 30 },
        h(
          'div',
          {
            padding: '8px 16px',
            background: C.fg,
            color: C.bg,
            fontFamily: c.roleFont,
            fontWeight: lang === 'ka' ? 400 : 700,
            fontSize: c.roleSize,
          },
          c.role,
        ),
      ),
      h(
        'div',
        { flexWrap: 'wrap', gap: 12, marginTop: 30 },
        TAGS.map((tag, index) =>
          h(
            'div',
            {
              padding: '6px 12px',
              background: index === 0 ? C.yellow : C.card,
              border: `3px solid ${C.fg}`,
              fontSize: 22,
              fontWeight: 700,
            },
            tag,
          ),
        ),
      ),
    ),
    // Right: portrait + sticker
    h(
      'div',
      { position: 'relative', width: 356, height: 356, marginRight: 22 },
      h(
        'div',
        {
          width: 356,
          height: 356,
          padding: 14,
          background: C.yellow,
          border: `5px solid ${C.fg}`,
          boxShadow: `14px 14px 0 ${C.fg}`,
          transform: 'rotate(-3deg)',
        },
        img(photoUri, 318, 318, { border: `5px solid ${C.fg}` }),
      ),
      h(
        'div',
        {
          position: 'absolute',
          left: -34,
          bottom: -26,
          alignItems: 'center',
          gap: 12,
          padding: '10px 16px',
          background: C.pink,
          border: `3px solid ${C.fg}`,
          boxShadow: `4px 4px 0 ${C.fg}`,
          transform: 'rotate(6deg)',
          fontFamily: lang === 'ka' ? 'GL Erekles Stamba' : 'Anonymous Pro',
          fontWeight: lang === 'ka' ? 400 : 700,
          fontSize: 28,
        },
        img(dataUri('image/svg+xml', FLAG_SVG), 39, 26),
        c.city,
      ),
    ),
  );
}

function certificatePlaceholder({ id, title, issuer }) {
  return h(
    'div',
    {
      width: 1400,
      height: 990,
      padding: 48,
      background: C.yellow,
      fontFamily: 'Anonymous Pro',
      color: C.fg,
    },
    h(
      'div',
      {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: C.card,
        border: `8px solid ${C.fg}`,
        boxShadow: `16px 16px 0 ${C.fg}`,
        padding: 64,
      },
      h('div', { fontSize: 40, fontWeight: 700, letterSpacing: 10 }, 'CERTIFICATE'),
      h('div', { width: 180, height: 8, background: C.pink, marginTop: 28, marginBottom: 44 }),
      h('div', { fontSize: 76, fontWeight: 700, textAlign: 'center' }, title),
      h('div', { fontSize: 38, marginTop: 24 }, `Issued by ${issuer}`),
      h(
        'div',
        {
          marginTop: 80,
          padding: '14px 26px',
          background: C.fg,
          color: C.bg,
          fontSize: 28,
          fontWeight: 700,
        },
        `PLACEHOLDER: replace src/assets/certificates/${id}.png`,
      ),
    ),
  );
}

/** A minimal one-page PDF (Helvetica, ASCII only) with correct xref offsets. */
function placeholderPdf(lines) {
  const escape = (text) => text.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
  const [first = '', ...rest] = lines;
  const stream = [
    'BT',
    '/F1 24 Tf',
    '72 760 Td',
    `(${escape(first)}) Tj`,
    '/F1 12 Tf',
    ...rest.flatMap((line) => ['0 -26 Td', `(${escape(line)}) Tj`]),
    'ET',
  ].join('\n');
  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>',
    `<< /Length ${Buffer.byteLength(stream, 'latin1')} >>\nstream\n${stream}\nendstream`,
  ];
  let pdf = '%PDF-1.4\n';
  const offsets = objects.map((body, index) => {
    const offset = Buffer.byteLength(pdf, 'latin1');
    pdf += `${index + 1} 0 obj\n${body}\nendobj\n`;
    return offset;
  });
  const xref = Buffer.byteLength(pdf, 'latin1');
  pdf +=
    `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n` +
    offsets.map((offset) => `${String(offset).padStart(10, '0')} 00000 n \n`).join('') +
    `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  return Buffer.from(pdf, 'latin1');
}

/** Wraps a PNG in an .ico container (PNG-in-ICO is supported by every current browser). */
function pngToIco(png, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // image count
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size >= 256 ? 0 : size, 0); // width
  entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
  entry.writeUInt8(0, 2); // palette colors
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // color planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(png.length, 8); // image size
  entry.writeUInt32LE(header.length + entry.length, 12); // image offset
  return Buffer.concat([header, entry, png]);
}

/* ---- Main ------------------------------------------------------------------ */
const fonts = await loadFonts();
await mkdir(at('public/cv'), { recursive: true });
await mkdir(at('src/assets/certificates'), { recursive: true });

console.log('Social images');
const photo = await sharp(at('src/assets/images/dimitri.jpg')).resize(684, 684).jpeg({ quality: 88 }).toBuffer();
const photoUri = dataUri('image/jpeg', photo);
for (const lang of /** @type {const} */ (['en', 'ka'])) {
  const svg = await render(ogImage(lang, photoUri), 1200, 630, fonts);
  await writePng(svg, at('public', lang === 'en' ? 'og-image.png' : 'og-image-ka.png'));
}

console.log('Icons');
const faviconSvg = await render(logo(64, 31, 5), 64, 64, fonts);
await writeFile(at('public/favicon.svg'), faviconSvg);
console.log('  wrote public/favicon.svg');
const favicon32 = await sharp(Buffer.from(faviconSvg)).resize(32, 32).png({ compressionLevel: 9 }).toBuffer();
await writeFile(at('public/favicon.ico'), pngToIco(favicon32, 32));
console.log('  wrote public/favicon.ico');
const touchSvg = await render(
  h(
    'div',
    { width: 180, height: 180, alignItems: 'center', justifyContent: 'center', background: C.yellow },
    h('div', { boxShadow: `6px 6px 0 ${C.fg}` }, logo(116, 56, 6)),
  ),
  180,
  180,
  fonts,
);
await writePng(touchSvg, at('public/apple-touch-icon.png'));

console.log('Placeholders (only if missing)');
const certificateFiles = await readdir(at('src/assets/certificates'));
for (const certificate of CERTIFICATES) {
  const hasImage = certificateFiles.some((file) => file.replace(/\.[^.]+$/, '') === certificate.id);
  if (hasImage) {
    console.log(`  kept src/assets/certificates/${certificate.id}.* (already exists)`);
    continue;
  }
  const svg = await render(certificatePlaceholder(certificate), 1400, 990, fonts);
  await writePng(svg, at('src/assets/certificates', `${certificate.id}.png`));
}

const cvFile = at('public/cv/Dimitri_Mumladze_CV.pdf');
if (await exists(cvFile)) {
  console.log('  kept public/cv/Dimitri_Mumladze_CV.pdf (already exists)');
} else {
  await writeFile(
    cvFile,
    placeholderPdf([
      'Dimitri Mumladze - CV',
      'This is a placeholder file.',
      'Replace public/cv/Dimitri_Mumladze_CV.pdf with the PDF exported from your CV.',
      'LinkedIn: https://www.linkedin.com/in/dimitri-mumladze-747504295/',
      'GitHub: https://github.com/DimitriMumladze',
    ]),
  );
  console.log('  wrote public/cv/Dimitri_Mumladze_CV.pdf');
}

console.log('Done.');
