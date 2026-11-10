export const LANGS = ['en', 'ka'] as const;

export type Lang = (typeof LANGS)[number];

/** A value with an English and a Georgian variant. */
export type Localized<T = string> = { readonly en: T; readonly ka: T };

/** Index of an accent token: --accent-1 / --accent-2 / --accent-3. */
export type Accent = 1 | 2 | 3;

/** A date range. Dates are 'YYYY' or 'YYYY-MM'; `end: null` means "present". */
export interface Period {
  readonly start: string;
  readonly end: string | null;
}
