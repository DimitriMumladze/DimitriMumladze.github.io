import type { Localized, Period } from './types';

export interface ExperienceGroup {
  /** Client project name, e.g. "Tamarind Learning Platform". */
  title: string;
  url?: string;
  bullets: Localized<string[]>;
}

export interface ExperienceItem {
  id: string;
  role: Localized;
  company: string;
  companyUrl?: string;
  /** Extra context shown after the company, e.g. client projects. */
  note?: Localized;
  period: Period;
  /** Link to a certificate for this role, if any. */
  certificateUrl?: string;
  bullets?: Localized<string[]>;
  groups?: ExperienceGroup[];
  tags: string[];
}

export const experience: ExperienceItem[] = [
  {
    id: '63bits',
    role: { en: '.NET Developer', ka: '.NET დეველოპერი' },
    company: '63BITS',
    companyUrl: 'https://www.linkedin.com/company/1021937/',
    note: {
      en: 'client projects: Tamarind Learning, AquariumVet',
      ka: 'კლიენტების პროექტები: Tamarind Learning, AquariumVet',
    },
    period: { start: '2026-05', end: null },
    groups: [
      {
        title: 'Tamarind Learning Platform',
        url: 'https://tamarindlearning.com/',
        bullets: {
          en: [
            'Led a codebase-wide modernization of a large ASP.NET Core MVC / C# e-learning platform: the admin, website and advisor areas now follow one consistent pattern for routing, permissions and data grids, with every change team-reviewed.',
            'Delivered the AI-driven Advisor Learning Plans feature end to end: SQL Server data layer and stored-procedure repository, business logic, an advisor grid with PDF/Word export and a learner calendar, released to test and beta.',
            'Built backend services for AI: a separately deployable MCP microservice that lets AI assistants create and update site pages and assets, secured by an OAuth 2.0 authorization server built from scratch (REST endpoints, SSO, MFA).',
          ],
          ka: [
            'ვუხელმძღვანელე დიდი ASP.NET Core MVC / C# სასწავლო პლატფორმის სრულ მოდერნიზაციას: ადმინის, საიტისა და მრჩევლების ნაწილები გადავიყვანე როუტინგის, უფლებებისა და მონაცემთა ცხრილების ერთიან პატერნზე; ყოველი ცვლილება გუნდურ რევიუს გადიოდა.',
            'თავიდან ბოლომდე შევქმენი AI-ზე დაფუძნებული ფუნქცია Advisor Learning Plans: SQL Server-ის მონაცემთა ფენა და რეპოზიტორი (stored procedures), ბიზნეს ლოგიკა, მრჩევლის ცხრილი PDF/Word ექსპორტით და მოსწავლის კალენდარი; გამოვუშვი test და beta გარემოში.',
            'შევქმენი backend სერვისები AI-სთვის: ცალკე დასადეპლოებელი MCP მიკროსერვისი, რომლითაც AI ასისტენტები საიტის გვერდებსა და რესურსებს ქმნიან და ანახლებენ. მას იცავს ნულიდან აწყობილი OAuth 2.0 ავტორიზაციის სერვერი (REST endpoint-ები, SSO, MFA).',
          ],
        },
      },
      {
        title: 'AquariumVet Learning Platform',
        url: 'https://theaquariumvet.com/',
        bullets: {
          en: [
            "Built an advisor Learning Progress report from scratch (repository, controller, Razor view, a grid with export and progress bars) to track each learner's course progress by cohort.",
            'Brought Learning Plans over from Tamarind with a new repository, AI-generated roadmaps and plan documents, and automatic task completion when a learner finishes a course section.',
            'Refactored the MCP service around shared base classes and the invoice and certificate reports around explicit constructors (OOP, design patterns), and extended audit logging to show who changed what.',
          ],
          ka: [
            'ნულიდან შევქმენი მრჩევლის ანგარიში Learning Progress (რეპოზიტორი, კონტროლერი, Razor view, ცხრილი ექსპორტითა და პროგრესის ზოლებით), რომლითაც ყოველი მოსწავლის პროგრესი ჯგუფების (cohort) მიხედვით ჩანს.',
            'Tamarind-იდან გადმოვიტანე Learning Plans: ახალი რეპოზიტორი, AI-ით გენერირებული roadmap-ები და გეგმის დოკუმენტები, ამოცანების ავტომატური დასრულება, როცა მოსწავლე კურსის სექციას ასრულებს.',
            'MCP სერვისს რეფაქტორინგი გავუკეთე საერთო საბაზო კლასების გარშემო, ინვოისისა და სერტიფიკატის ანგარიშებს — ცხადი კონსტრუქტორების გარშემო (OOP, design patterns); გავაფართოვე audit logging, რომ ჩანდეს, ვინ რა შეცვალა.',
          ],
        },
      },
    ],
    tags: ['C#', 'ASP.NET Core MVC', 'SQL Server', 'Stored procedures', 'Razor', 'OAuth 2.0', 'MCP', 'JavaScript', 'Agile/Scrum'],
  },
  {
    id: 'inovatori',
    role: { en: '.NET Developer (part-time)', ka: '.NET დეველოპერი (ნახევარ განაკვეთზე)' },
    company: 'Inovatori Olympiad Platform',
    companyUrl: 'https://inovatori.edu.ge',
    period: { start: '2026-07', end: null },
    bullets: {
      en: [
        'Sole developer: designed, built and launched a live olympiad platform with 250+ registered students across Georgia: an ASP.NET Core (.NET 10) REST API with Clean Architecture, PostgreSQL and EF Core, plus a React / TypeScript frontend.',
        'A fair online exam engine with server-side timing and scoring and a three-phase anti-cheat system, covered by 50+ automated tests. Every bug fixed gets its own regression test.',
        "Protected minors' personal data with field-level encryption that still allows secure search, key rotation and audited admin access. Transactional email over SMTP.",
        'Release pipeline: automated tests, then a sandbox check, then production with Docker, Nginx and GitHub Actions, then health checks.',
      ],
      ka: [
        'ერთადერთი დეველოპერი: დავაპროექტე, შევქმენი და გავუშვი საოლიმპიადო პლატფორმა 250-ზე მეტი რეგისტრირებული მოსწავლით მთელი საქართველოდან: ASP.NET Core (.NET 10) REST API, Clean Architecture, PostgreSQL და EF Core, React / TypeScript ფრონტენდით.',
        'სამართლიანი ონლაინ საგამოცდო ძრავი სერვერზე დათვლილი დროითა და ქულებით და სამფაზიანი anti-cheat სისტემით, დაფარული 50+ ავტომატური ტესტით. ყოველ გასწორებულ ბაგს საკუთარი რეგრესიული ტესტი აქვს.',
        'არასრულწლოვანი მოსწავლეების პერსონალური მონაცემები დავიცავი ველის დონის დაშიფვრით, რომელიც მაინც იძლევა უსაფრთხო ძიებას, გასაღებების როტაციასა და ადმინის აუდიტირებულ წვდომას. ტრანზაქციული ელფოსტა SMTP-ით.',
        'რელიზის პროცესი: ავტომატური ტესტები, შემდეგ შემოწმება sandbox-ში, შემდეგ პროდაქშენი Docker-ით, Nginx-ითა და GitHub Actions-ით, ბოლოს health check-ები.',
      ],
    },
    tags: ['.NET 10', 'ASP.NET Core', 'Clean Architecture', 'PostgreSQL', 'EF Core', 'React', 'TypeScript', 'Docker', 'Nginx', 'GitHub Actions'],
  },
  {
    id: 'sagule',
    role: {
      en: 'Full-Stack Developer (freelance, part-time)',
      ka: 'Full-Stack დეველოპერი (ფრილანსი, ნახევარ განაკვეთზე)',
    },
    company: 'Sagule Resort Booking Platform',
    companyUrl: 'https://saguleresort.com',
    period: { start: '2025-10', end: '2026-08' },
    bullets: {
      en: [
        'Built the booking platform for a resort with 13 rooms, cottages and suites on ASP.NET Core and SQL Server, so guests can book and pay online.',
        'Two-way calendar sync with Airbnb, Booking.com and VRBO keeps availability correct on every channel.',
      ],
      ka: [
        'შევქმენი დაჯავშნის პლატფორმა კურორტისთვის, რომელსაც 13 ოთახი, კოტეჯი და ლუქსი აქვს (ASP.NET Core, SQL Server): სტუმრები ონლაინ ჯავშნიან და იხდიან.',
        'ორმხრივი კალენდრის სინქრონიზაცია Airbnb-თან, Booking.com-თან და VRBO-სთან ხელმისაწვდომობას ყველა არხზე ზუსტს ინარჩუნებს.',
      ],
    },
    tags: ['ASP.NET Core', 'SQL Server', 'Payments', 'iCal sync'],
  },
  {
    id: 'exadel',
    role: { en: '.NET Developer (Internship)', ka: '.NET დეველოპერი (სტაჟირება)' },
    company: 'Exadel .NET Bootcamp',
    period: { start: '2025-03', end: '2025-05' },
    certificateUrl: 'https://www.linkedin.com/feed/update/urn:li:activity:7333489964350963716/',
    bullets: {
      en: [
        'Built REST APIs with ASP.NET Core, C#, Entity Framework Core and MongoDB in an international Agile/Scrum team; implemented role-based authorization and wrote unit and integration tests.',
      ],
      ka: [
        'საერთაშორისო Agile/Scrum გუნდში ვქმნიდი REST API-ებს ASP.NET Core-ით, C#-ით, Entity Framework Core-ითა და MongoDB-ით; დავნერგე როლებზე დაფუძნებული ავტორიზაცია და დავწერე unit და ინტეგრაციული ტესტები.',
      ],
    },
    tags: ['ASP.NET Core', 'C#', 'EF Core', 'MongoDB', 'Agile/Scrum'],
  },
  {
    id: 'personal',
    role: { en: 'C# / .NET Developer', ka: 'C# / .NET დეველოპერი' },
    company: 'Personal Projects',
    note: { en: 'self-study', ka: 'თვითსწავლა' },
    period: { start: '2023', end: '2024' },
    bullets: {
      en: [
        'Built C# applications and ASP.NET MVC web projects with SQL Server and Entity Framework through self-study: OOP, data structures, algorithms and database design.',
      ],
      ka: [
        'თვითსწავლით ვქმნიდი C# აპლიკაციებსა და ASP.NET MVC ვებპროექტებს SQL Server-ითა და Entity Framework-ით: OOP, მონაცემთა სტრუქტურები, ალგორითმები და მონაცემთა ბაზების დიზაინი.',
      ],
    },
    tags: ['C#', 'ASP.NET MVC', 'SQL Server', 'Entity Framework'],
  },
];

/** Company names that should be localized in the UI (e.g. "Personal Projects"). */
export const companyLabel: Record<string, Localized> = {
  'Personal Projects': { en: 'Personal Projects', ka: 'პირადი პროექტები' },
};
