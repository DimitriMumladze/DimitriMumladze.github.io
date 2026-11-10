import type { Localized } from './types';

export interface Project {
  id: string;
  title: Localized;
  url: string;
  /** Short host shown in the card header, e.g. "inovatori.edu.ge". */
  host: string;
  /** Client work done at 63BITS: shows the "my contributions" label. */
  client: boolean;
  description: Localized;
  bullets: Localized<string[]>;
  tags: string[];
}

export const projects: Project[] = [
  {
    id: 'inovatori',
    title: { en: 'Inovatori Olympiad Platform', ka: 'Inovatori • საოლიმპიადო პლატფორმა' },
    url: 'https://inovatori.edu.ge',
    host: 'inovatori.edu.ge',
    client: false,
    description: {
      en: 'An olympiad platform for students across Georgia with a fair, cheat-resistant online exam engine. I designed and built it on my own.',
      ka: 'საოლიმპიადო პლატფორმა მოსწავლეებისთვის მთელი საქართველოდან, სამართლიანი და თაღლითობისგან დაცული ონლაინ საგამოცდო ძრავით. სრულად მარტომ დავაპროექტე და შევქმენი.',
    },
    bullets: {
      en: [
        '250+ registered students across Georgia',
        'Server-side timing and scoring, three-phase anti-cheat, 50+ automated tests',
        "Field-level encryption for minors' data; releases through Docker, Nginx and GitHub Actions",
      ],
      ka: [
        '250+ რეგისტრირებული მოსწავლე მთელი საქართველოდან',
        'დრო და ქულები სერვერზე, სამფაზიანი anti-cheat, 50+ ავტომატური ტესტი',
        'არასრულწლოვანთა მონაცემების ველის დონის დაშიფვრა; რელიზები Docker-ით, Nginx-ითა და GitHub Actions-ით',
      ],
    },
    tags: ['.NET 10', 'Clean Architecture', 'PostgreSQL', 'EF Core', 'React', 'TypeScript', 'Docker', 'Nginx', 'GitHub Actions'],
  },
  {
    id: 'sagule',
    title: { en: 'Sagule Resort Booking', ka: 'Sagule Resort • დაჯავშნის პლატფორმა' },
    url: 'https://saguleresort.com',
    host: 'saguleresort.com',
    client: false,
    description: {
      en: 'A direct-booking site for a resort with 13 rooms, cottages and suites, with online booking and payment.',
      ka: 'პირდაპირი დაჯავშნის საიტი კურორტისთვის 13 ოთახით, კოტეჯითა და ლუქსით, ონლაინ ჯავშნითა და გადახდით.',
    },
    bullets: {
      en: [
        'Guests book and pay online, end to end',
        'Two-way calendar sync with Airbnb, Booking.com and VRBO',
        'Availability stays correct on every channel',
      ],
      ka: [
        'სტუმრები ონლაინ ჯავშნიან და იხდიან, თავიდან ბოლომდე',
        'ორმხრივი კალენდრის სინქრონიზაცია Airbnb-თან, Booking.com-თან და VRBO-სთან',
        'ხელმისაწვდომობა ყველა არხზე ზუსტია',
      ],
    },
    tags: ['ASP.NET Core', 'SQL Server', 'Payments', 'iCal sync (Airbnb/Booking/VRBO)'],
  },
  {
    id: 'tamarind',
    title: { en: 'Tamarind Learning', ka: 'Tamarind Learning' },
    url: 'https://tamarindlearning.com',
    host: 'tamarindlearning.com',
    client: true,
    description: {
      en: 'A large enterprise e-learning platform on ASP.NET Core MVC: modernization and AI features.',
      ka: 'დიდი კორპორაციული სასწავლო პლატფორმა ASP.NET Core MVC-ზე: მოდერნიზაცია და AI ფუნქციები.',
    },
    bullets: {
      en: [
        'Led a codebase-wide modernization of routing, permissions and data grids',
        'Shipped the AI-driven Advisor Learning Plans feature end to end',
        'MCP microservice for AI assistants, secured by an OAuth 2.0 server built from scratch',
      ],
      ka: [
        'ვუხელმძღვანელე კოდის სრულ მოდერნიზაციას: როუტინგი, უფლებები, მონაცემთა ცხრილები',
        'თავიდან ბოლომდე შევქმენი AI-ზე დაფუძნებული Advisor Learning Plans',
        'MCP მიკროსერვისი AI ასისტენტებისთვის, ნულიდან აწყობილი OAuth 2.0 სერვერით დაცული',
      ],
    },
    tags: ['ASP.NET Core MVC', 'SQL Server', 'MCP microservice', 'OAuth 2.0', 'AI features'],
  },
  {
    id: 'aquariumvet',
    title: { en: 'AquariumVet Learning', ka: 'AquariumVet Learning' },
    url: 'https://theaquariumvet.com',
    host: 'theaquariumvet.com',
    client: true,
    description: {
      en: 'An e-learning platform on ASP.NET Core MVC: advisor reporting, learning plans and audit trails.',
      ka: 'სასწავლო პლატფორმა ASP.NET Core MVC-ზე: მრჩევლის ანგარიშები, სასწავლო გეგმები და აუდიტი.',
    },
    bullets: {
      en: [
        'Learning Progress report from scratch: repository, controller, Razor view, exportable grid',
        'Learning Plans with AI-generated roadmaps and automatic task completion',
        'OOP refactors and extended audit logging (who changed what)',
      ],
      ka: [
        'Learning Progress ანგარიში ნულიდან: რეპოზიტორი, კონტროლერი, Razor view, ექსპორტირებადი ცხრილი',
        'Learning Plans AI-ით გენერირებული roadmap-ებითა და ამოცანების ავტომატური დასრულებით',
        'OOP რეფაქტორინგი და გაფართოებული audit logging (ვინ რა შეცვალა)',
      ],
    },
    tags: ['ASP.NET Core MVC', 'Razor', 'SQL Server', 'Reports', 'Audit logging'],
  },
];
