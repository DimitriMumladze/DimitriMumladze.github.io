/**
 * Inline SVG icon set. Stroke icons use square caps / miter joins for a brutal look.
 * GitHub mark: GitHub Octicons (MIT). LinkedIn glyph: Bootstrap Icons (MIT).
 */
const stroke = (d: string, width = 2.5) =>
  `<path d="${d}" fill="none" stroke="currentColor" stroke-width="${width}" stroke-linecap="square" stroke-linejoin="miter"/>`;

const smallCross = (cx: number, cy: number) =>
  `<rect x="${cx - 2.5}" y="${cy - 0.75}" width="5" height="1.5"/><rect x="${cx - 0.75}" y="${cy - 2.5}" width="1.5" height="5"/>`;

export const icons = {
  github: {
    viewBox: '0 0 16 16',
    body: '<path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>',
  },
  linkedin: {
    viewBox: '0 0 16 16',
    body: '<path fill="currentColor" d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>',
  },
  mail: { viewBox: '0 0 24 24', body: stroke('M3 5h18v14H3z') + stroke('M3.5 6l8.5 7 8.5-7') },
  phone: { viewBox: '0 0 24 24', body: stroke('M7 2.5h10v19H7z') + stroke('M11 18h2') },
  download: { viewBox: '0 0 24 24', body: stroke('M12 3v12') + stroke('M7 10l5 5 5-5') + stroke('M4 20h16') },
  'arrow-right': { viewBox: '0 0 24 24', body: stroke('M4 12h15') + stroke('M13 5l7 7-7 7') },
  'arrow-up': { viewBox: '0 0 24 24', body: stroke('M12 20V5') + stroke('M5 11l7-7 7 7') },
  'arrow-up-right': { viewBox: '0 0 24 24', body: stroke('M7 17L17 7') + stroke('M8 7h9v9') },
  sun: {
    viewBox: '0 0 24 24',
    body:
      '<rect x="8" y="8" width="8" height="8" fill="currentColor"/>' +
      stroke('M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M4.6 19.4l2.1-2.1M17.3 6.7l2.1-2.1', 2.25),
  },
  moon: { viewBox: '0 0 24 24', body: '<path fill="currentColor" d="M20.5 14.6A8.5 8.5 0 0 1 9.4 3.5a8.5 8.5 0 1 0 11.1 11.1z"/>' },
  menu: { viewBox: '0 0 24 24', body: stroke('M3 6h18M3 12h18M3 18h18', 3) },
  close: { viewBox: '0 0 24 24', body: stroke('M5 5l14 14M19 5L5 19', 3) },
  pause: { viewBox: '0 0 24 24', body: '<path fill="currentColor" d="M6 4h4.5v16H6zM13.5 4H18v16h-4.5z"/>' },
  play: { viewBox: '0 0 24 24', body: '<path fill="currentColor" d="M6 4l14 8-14 8z"/>' },
  check: { viewBox: '0 0 24 24', body: stroke('M4 12.5l5 5L20 6.5', 3) },
  alert: { viewBox: '0 0 24 24', body: stroke('M12 5v9', 3) + '<rect x="10.5" y="17" width="3" height="3" fill="currentColor"/>' },
  'flag-ge': {
    viewBox: '0 0 30 20',
    body:
      '<rect width="30" height="20" fill="#fff"/>' +
      '<g fill="#f00"><rect x="13" width="4" height="20"/><rect y="8" width="30" height="4"/>' +
      smallCross(6.5, 4) +
      smallCross(23.5, 4) +
      smallCross(6.5, 16) +
      smallCross(23.5, 16) +
      '</g><rect x=".75" y=".75" width="28.5" height="18.5" fill="none" stroke="#000" stroke-width="1.5"/>',
  },
} as const;

export type IconName = keyof typeof icons;
