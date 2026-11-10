import type { Lang, Localized, Period } from './types';

/* ----------------------------------------------------------------------------
 * Routing helpers
 * ------------------------------------------------------------------------- */

/** Home page path for a language (English at the root, Georgian under /ka/). */
export const localePath = (lang: Lang): string => (lang === 'en' ? '/' : '/ka/');

export const otherLang = (lang: Lang): Lang => (lang === 'en' ? 'ka' : 'en');

/** Picks the variant for `lang` from a localized value. */
export const pick = <T>(value: Localized<T>, lang: Lang): T => value[lang];

/* ----------------------------------------------------------------------------
 * Dates
 * ------------------------------------------------------------------------- */

const MONTHS: Localized<readonly string[]> = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  ka: ['იან', 'თებ', 'მარ', 'აპრ', 'მაი', 'ივნ', 'ივლ', 'აგვ', 'სექ', 'ოქტ', 'ნოე', 'დეკ'],
};

export const PRESENT: Localized = { en: 'Present', ka: 'დღემდე' };

/** 'YYYY-MM' -> 'May 2026' / 'მაი 2026'; 'YYYY' stays as is. */
export function formatYearMonth(value: string, lang: Lang): string {
  const [year, month] = value.split('-');
  if (!month) return year ?? value;
  const name = MONTHS[lang][Number(month) - 1];
  return name ? `${name} ${year}` : value;
}

export function formatPeriod(period: Period, lang: Lang): string {
  const end = period.end ? formatYearMonth(period.end, lang) : PRESENT[lang];
  return `${formatYearMonth(period.start, lang)} – ${end}`;
}

/* ----------------------------------------------------------------------------
 * Text helpers
 * ------------------------------------------------------------------------- */

export interface TextSegment {
  text: string;
  mark: boolean;
}

/** Splits 'I build ==.NET platforms== that…' into plain and highlighted runs. */
export function highlight(text: string): TextSegment[] {
  return text
    .split(/==(.+?)==/g)
    .map((part, index) => ({ text: part, mark: index % 2 === 1 }))
    .filter((segment) => segment.text.length > 0);
}

/* ----------------------------------------------------------------------------
 * UI strings
 * ------------------------------------------------------------------------- */

const en = {
  meta: {
    title: 'Dimitri Mumladze • .NET Developer',
    description:
      'Dimitri Mumladze is a .NET developer in Tbilisi, Georgia. He builds ASP.NET Core platforms at 63BITS and single-handedly built a live olympiad platform used by 250+ students.',
    ogImageAlt: 'Dimitri Mumladze • Software Developer (.NET), Tbilisi, Georgia',
    ogLocale: 'en_US',
  },
  a11y: {
    skipLink: 'Skip to content',
    mainNav: 'Main',
    menu: 'Menu',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    darkTheme: 'Dark theme',
    language: 'Language',
    newTab: '(opens in a new tab)',
    logo: 'Dimitri Mumladze • back to top',
  },
  langNames: { en: 'English', ka: 'ქართული' },
  nav: {
    about: 'About',
    experience: 'Experience',
    projects: 'Projects',
    skills: 'Skills',
    certificates: 'Certificates',
    contact: 'Contact',
    github: 'GitHub',
  },
  hero: {
    sub: 'Writing C# since 2023. Now at 63BITS modernizing large ASP.NET Core platforms, and single-handedly building an olympiad platform used by 250+ students.',
    downloadCv: 'Download CV',
    contactMe: 'Contact me',
    github: 'GitHub profile',
    linkedin: 'LinkedIn profile',
    photoAlt: 'Portrait of Dimitri Mumladze',
  },
  marquee: {
    label: 'Tech stack',
    pause: 'Pause the tech stack animation',
  },
  sections: {
    about: 'About',
    experience: 'Experience',
    projects: 'Projects',
    skills: 'Skills',
    certificates: 'Certificates',
    education: 'Education & Languages',
    contact: 'Contact',
  },
  about: {
    paragraphs: [
      "I've been building .NET applications since 2023, and professionally at 63BITS since May 2026, where I modernize large enterprise ASP.NET Core MVC / C# platforms in an Agile/Scrum team with code review.",
      'On my own, I built and run a live ASP.NET Core platform used by 250+ registered students. I use AI-assisted tools (Claude Code, ChatGPT) daily for coding, debugging, testing and refactoring, and I validate every result before it ships.',
    ],
    statsLabel: 'In numbers',
  },
  experience: {
    certificate: 'Certificate',
  },
  projects: {
    intro: 'Live products, built and shipped. Click through.',
    visit: 'Visit site',
    client: 'Client project at 63BITS, my contributions:',
    moreOnGitHub: 'More code on GitHub',
  },
  certificates: {
    intro: 'Click a certificate to see it full size.',
    issuer: 'Issuer',
    date: 'Date',
    verify: 'Verify / View',
    viewFull: 'View full size:',
    close: 'Close',
    openOriginal: 'Open original',
  },
  education: {
    degreeTitle: 'Education',
    languagesTitle: 'Languages',
  },
  contact: {
    heading: "Let's talk.",
    lead: "Hiring for a .NET role, or have a project or a question? Send me a message and I'll get back to you soon.",
    direct: 'Or reach me directly',
    emailLabel: 'Email',
    phoneLabel: 'Phone',
    form: {
      title: 'Send a message',
      required: 'All fields are required.',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      honeypot: 'Leave this field empty',
      submit: 'Send message',
      sending: 'Sending…',
      subject: 'New message from your portfolio',
      errors: {
        name: 'Please enter your name.',
        email: 'Please enter a valid email address.',
        message: 'Please write a message of at least 10 characters.',
      },
      success: "Thanks! Your message is on its way. I'll get back to you soon.",
      failure: "Sorry, the message couldn't be sent. Please email me directly at",
    },
  },
  footer: {
    builtWith: { before: 'Built with ', after: '' },
    backToTop: 'Back to top',
  },
  notFound: {
    title: 'Page not found',
    text: "This page doesn't exist. It may have moved.",
    home: 'Back to home',
  },
};

export type UiStrings = typeof en;

const ka: UiStrings = {
  meta: {
    title: 'დიმიტრი მუმლაძე • .NET დეველოპერი',
    description:
      'დიმიტრი მუმლაძე, .NET დეველოპერი თბილისიდან. 63BITS-ში ქმნის ASP.NET Core პლატფორმებს, დამოუკიდებლად კი შექმნა საოლიმპიადო პლატფორმა, რომელსაც 250+ მოსწავლე იყენებს.',
    ogImageAlt: 'დიმიტრი მუმლაძე • პროგრამული უზრუნველყოფის დეველოპერი (.NET), თბილისი',
    ogLocale: 'ka_GE',
  },
  a11y: {
    skipLink: 'მთავარ შინაარსზე გადასვლა',
    mainNav: 'მთავარი ნავიგაცია',
    menu: 'მენიუ',
    openMenu: 'მენიუს გახსნა',
    closeMenu: 'მენიუს დახურვა',
    darkTheme: 'მუქი თემა',
    language: 'ენა',
    newTab: '(იხსნება ახალ ჩანართში)',
    logo: 'დიმიტრი მუმლაძე • გვერდის თავში დაბრუნება',
  },
  langNames: { en: 'English', ka: 'ქართული' },
  nav: {
    about: 'ჩემ შესახებ',
    experience: 'გამოცდილება',
    projects: 'პროექტები',
    skills: 'უნარები',
    certificates: 'სერტიფიკატები',
    contact: 'კონტაქტი',
    github: 'GitHub',
  },
  hero: {
    sub: 'C#-ზე 2023 წლიდან ვწერ. ახლა 63BITS-ში დიდ ASP.NET Core პლატფორმებს ვაახლებ, ამავდროულად კი მარტო ვავითარებ საოლიმპიადო პლატფორმას, რომელსაც 250+ მოსწავლე იყენებს.',
    downloadCv: 'CV-ის ჩამოტვირთვა',
    contactMe: 'დამიკავშირდით',
    github: 'GitHub პროფილი',
    linkedin: 'LinkedIn პროფილი',
    photoAlt: 'დიმიტრი მუმლაძის პორტრეტი',
  },
  marquee: {
    label: 'ტექნოლოგიები',
    pause: 'ტექნოლოგიების ანიმაციის შეჩერება',
  },
  sections: {
    about: 'ჩემ შესახებ',
    experience: 'გამოცდილება',
    projects: 'პროექტები',
    skills: 'უნარები',
    certificates: 'სერტიფიკატები',
    education: 'განათლება და ენები',
    contact: 'კონტაქტი',
  },
  about: {
    paragraphs: [
      '.NET აპლიკაციებს 2023 წლიდან ვქმნი, პროფესიულად კი 63BITS-ში, 2026 წლის მაისიდან. აქ Agile/Scrum გუნდში ვაახლებ დიდ კორპორაციულ ASP.NET Core MVC / C# პლატფორმებს, სადაც ყოველი ცვლილება code review-ს გადის.',
      'მარტომ შევქმენი და გავუშვი ASP.NET Core პლატფორმა, რომელსაც 250-ზე მეტი რეგისტრირებული მოსწავლე იყენებს. ყოველდღიურად ვიყენებ AI ინსტრუმენტებს (Claude Code, ChatGPT) კოდის წერის, დებაგინგის, ტესტირებისა და რეფაქტორინგისთვის და ყოველ შედეგს ვამოწმებ, სანამ პროდაქშენში მოხვდება.',
    ],
    statsLabel: 'ციფრებში',
  },
  experience: {
    certificate: 'სერტიფიკატი',
  },
  projects: {
    intro: 'მოქმედი პროდუქტები: შექმნილი და გაშვებული. გადახედეთ.',
    visit: 'საიტის ნახვა',
    client: '63BITS-ის კლიენტის პროექტი, ჩემი წვლილი:',
    moreOnGitHub: 'მეტი კოდი GitHub-ზე',
  },
  certificates: {
    intro: 'სრული ზომით სანახავად დააჭირეთ სერტიფიკატს.',
    issuer: 'გამცემი',
    date: 'თარიღი',
    verify: 'შემოწმება / ნახვა',
    viewFull: 'სრული ზომით ნახვა:',
    close: 'დახურვა',
    openOriginal: 'ორიგინალის გახსნა',
  },
  education: {
    degreeTitle: 'განათლება',
    languagesTitle: 'ენები',
  },
  contact: {
    heading: 'მოდით, ვისაუბროთ.',
    lead: 'ეძებთ .NET დეველოპერს, გაქვთ პროექტი ან კითხვა? მომწერეთ და მალე გიპასუხებთ.',
    direct: 'ან დამიკავშირდით პირდაპირ',
    emailLabel: 'ელფოსტა',
    phoneLabel: 'ტელეფონი',
    form: {
      title: 'მომწერეთ',
      required: 'ყველა ველი სავალდებულოა.',
      name: 'სახელი',
      email: 'ელფოსტა',
      message: 'შეტყობინება',
      honeypot: 'ეს ველი დატოვეთ ცარიელი',
      submit: 'გაგზავნა',
      sending: 'იგზავნება…',
      subject: 'ახალი შეტყობინება პორტფოლიოდან',
      errors: {
        name: 'გთხოვთ, მიუთითოთ სახელი.',
        email: 'გთხოვთ, მიუთითოთ სწორი ელფოსტა.',
        message: 'შეტყობინება უნდა შეიცავდეს მინიმუმ 10 სიმბოლოს.',
      },
      success: 'მადლობა! შეტყობინება გაიგზავნა. მალე გიპასუხებთ.',
      failure: 'სამწუხაროდ, შეტყობინება ვერ გაიგზავნა. მომწერეთ პირდაპირ:',
    },
  },
  footer: {
    builtWith: { before: 'აწყობილია ', after: '-ზე' },
    backToTop: 'თავში დაბრუნება',
  },
  notFound: {
    title: 'გვერდი ვერ მოიძებნა',
    text: 'ეს გვერდი არ არსებობს. შესაძლოა, სხვაგან გადავიდა.',
    home: 'მთავარ გვერდზე დაბრუნება',
  },
};

export const ui: Record<Lang, UiStrings> = { en, ka };

export const t = (lang: Lang): UiStrings => ui[lang];
