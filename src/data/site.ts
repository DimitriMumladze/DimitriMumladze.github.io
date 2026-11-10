import type { Accent, Localized } from './types';

export const SITE_URL = 'https://dimitrimumladze.github.io';

/* -------------------------------------------------------------------------- */
/*  TODO (contact form): put your Formspree form ID here.                      */
/*  1. Create a free form at https://formspree.io                              */
/*  2. Its endpoint looks like https://formspree.io/f/abcdwxyz                 */
/*  3. Replace 'FORM_ID' below with the last part (e.g. 'abcdwxyz').           */
/*  Until then the form shows an error with a direct-email fallback.           */
/* -------------------------------------------------------------------------- */
export const FORMSPREE_FORM_ID = 'FORM_ID';
export const FORMSPREE_ENDPOINT = `https://formspree.io/f/${FORMSPREE_FORM_ID}`;
export const FORMSPREE_CONFIGURED = FORMSPREE_FORM_ID !== 'FORM_ID';

export const person = {
  name: { en: 'Dimitri Mumladze', ka: 'დიმიტრი მუმლაძე' } satisfies Localized,
  /** The hero name, one entry per line. */
  nameLines: { en: ['Dimitri', 'Mumladze'], ka: ['დიმიტრი', 'მუმლაძე'] } satisfies Localized<string[]>,
  initials: 'DM',
  role: {
    en: 'Software Developer (.NET)',
    ka: 'პროგრამული უზრუნველყოფის დეველოპერი (.NET)',
  } satisfies Localized,
  location: { en: 'Tbilisi, Georgia', ka: 'თბილისი, საქართველო' } satisfies Localized,
  city: { en: 'Tbilisi', ka: 'თბილისი' } satisfies Localized,
  email: 'mumladzedimm@gmail.com',
  phone: { display: '+995 599 99 26 24', href: 'tel:+995599992624' },
  /** Keywords from the CV header, shown as tags in the hero. */
  headlineTags: ['C#', 'ASP.NET Core', 'RESTful APIs', 'SQL Server', 'Agile/Scrum'],
} as const;

export const links = {
  github: 'https://github.com/DimitriMumladze',
  githubHandle: 'DimitriMumladze',
  linkedin: 'https://www.linkedin.com/in/dimitri-mumladze-747504295/',
  linkedinHandle: 'dimitri-mumladze-747504295',
  /** TODO: replace public/cv/Dimitri_Mumladze_CV.pdf with the PDF exported from your CV. */
  cv: '/cv/Dimitri_Mumladze_CV.pdf',
  astro: 'https://astro.build',
} as const;

/**
 * Hero headline. Wrap words in ==double equals== to highlight them.
 */
export const headline: Localized = {
  en: 'I build ==.NET platforms== that ==real people== use.',
  ka: 'ვქმნი ==.NET პლატფორმებს==, რომლებსაც ==რეალური ადამიანები== იყენებენ.',
};

export const stats: ReadonlyArray<{
  value: string;
  prefix?: Localized;
  label: Localized;
  accent: Accent;
}> = [
  {
    value: '250+',
    label: { en: 'students on my platform', ka: 'მოსწავლე ჩემს პლატფორმაზე' },
    accent: 1,
  },
  {
    value: '50+',
    label: { en: 'automated tests', ka: 'ავტომატური ტესტი' },
    accent: 2,
  },
  {
    value: '2023',
    prefix: { en: 'since', ka: '' },
    label: { en: 'building with .NET', ka: 'წლიდან ვქმნი .NET-ზე' },
    accent: 3,
  },
];

/** The tech marquee under the hero. */
export const marquee: readonly string[] = [
  'C#',
  'ASP.NET Core',
  '.NET 10',
  'EF Core',
  'SQL Server',
  'PostgreSQL',
  'React',
  'TypeScript',
  'Docker',
  'GitHub Actions',
  'OAuth 2.0',
  'Clean Architecture',
];

export const education = {
  degree: {
    en: 'B.Sc. Computer Science',
    ka: 'კომპიუტერული მეცნიერების ბაკალავრიატი',
  } satisfies Localized,
  school: {
    en: 'International Black Sea University (IBSU)',
    ka: 'შავი ზღვის საერთაშორისო უნივერსიტეტი (IBSU)',
  } satisfies Localized,
  city: { en: 'Tbilisi', ka: 'თბილისი' } satisfies Localized,
  period: { start: '2022', end: '2027' },
  expected: { en: 'expected', ka: 'სავარაუდოდ' } satisfies Localized,
} as const;

export const languages: ReadonlyArray<{
  name: Localized;
  level: Localized;
  /** CEFR position 1–6 (A1…C2); 6 = native. */
  cefr: 1 | 2 | 3 | 4 | 5 | 6;
  native?: boolean;
}> = [
  {
    name: { en: 'Georgian', ka: 'ქართული' },
    level: { en: 'Native', ka: 'მშობლიური' },
    cefr: 6,
    native: true,
  },
  {
    name: { en: 'English', ka: 'ინგლისური' },
    level: { en: 'B2 · professional working proficiency', ka: 'B2 · პროფესიული სამუშაო დონე' },
    cefr: 4,
  },
];
