import type { Localized } from './types';

export interface Certificate {
  /**
   * Also the image file name: the certificate image is read from
   * src/assets/certificates/<id>.png (or .jpg / .jpeg / .webp / .avif).
   * Its size is detected automatically, so any aspect ratio works.
   */
  id: string;
  title: Localized;
  issuer: string;
  /** 'YYYY' or 'YYYY-MM'. Leave undefined to hide the date. */
  date?: string;
  /** "Verify / View" link. */
  url: string;
}

export const certificates: Certificate[] = [
  {
    // TODO: replace src/assets/certificates/exadel.png with the real certificate image.
    id: 'exadel',
    title: { en: 'Exadel .NET Bootcamp', ka: 'Exadel .NET Bootcamp' },
    issuer: 'Exadel',
    date: '2025',
    url: 'https://www.linkedin.com/feed/update/urn:li:activity:7333489964350963716/',
  },
  {
    // TODO: replace src/assets/certificates/claude-code.png with the real certificate image,
    // and set the exact course title and `date` from your LinkedIn Learning certificate.
    id: 'claude-code',
    title: { en: 'Claude Code', ka: 'Claude Code' },
    issuer: 'LinkedIn Learning',
    url: 'https://www.linkedin.com/learning/certificates/7bcc16858a7c791ea99b139d31f4d0c410ce854cb8bdc2fbee73b04ed4c1fb11',
  },
];
