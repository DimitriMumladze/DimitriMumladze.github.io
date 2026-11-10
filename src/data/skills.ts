import type { Accent, Localized } from './types';

/** A plain string is shown as-is in both languages. */
export type SkillItem = string | Localized;

export interface SkillGroup {
  id: string;
  title: Localized;
  accent: Accent;
  items: SkillItem[];
}

export const skills: SkillGroup[] = [
  {
    id: 'backend',
    title: { en: 'Backend', ka: 'ბექენდი' },
    accent: 1,
    items: ['C#', '.NET / ASP.NET Core (.NET 8–10)', 'MVC', 'Entity Framework Core', 'LINQ', 'RESTful APIs'],
  },
  {
    id: 'databases',
    title: { en: 'Databases', ka: 'მონაცემთა ბაზები' },
    accent: 2,
    items: [
      { en: 'SQL Server (stored procedures)', ka: 'SQL Server (stored procedures)' },
      'PostgreSQL',
      'MySQL',
      'MongoDB',
    ],
  },
  {
    id: 'design',
    title: { en: 'Design', ka: 'არქიტექტურა და დიზაინი' },
    accent: 3,
    items: [
      'OOP',
      'SOLID',
      { en: 'Design patterns (Repository, Unit of Work, DI)', ka: 'Design patterns (Repository, Unit of Work, DI)' },
      'Clean Architecture',
      { en: 'Microservices', ka: 'მიკროსერვისები' },
      { en: 'Messaging (familiar)', ka: 'Messaging (საბაზისო)' },
    ],
  },
  {
    id: 'frontend',
    title: { en: 'Front-end', ka: 'ფრონტენდი' },
    accent: 1,
    items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', { en: 'React (working level)', ka: 'React (სამუშაო დონე)' }],
  },
  {
    id: 'devops',
    title: { en: 'DevOps & Monitoring', ka: 'DevOps და მონიტორინგი' },
    accent: 2,
    items: [
      'Git',
      'GitHub Actions CI/CD',
      'Docker',
      'Nginx',
      'Cloudflare',
      'VPS',
      'Serilog',
      { en: 'Health checks', ka: 'Health checks' },
      { en: 'GCP (basics)', ka: 'GCP (საბაზისო)' },
    ],
  },
  {
    id: 'security',
    title: { en: 'Security & Practices', ka: 'უსაფრთხოება და პრაქტიკები' },
    accent: 3,
    items: [
      'OAuth 2.0',
      'JWT',
      { en: 'Role-based access', ka: 'როლებზე დაფუძნებული წვდომა' },
      { en: 'Encryption', ka: 'დაშიფვრა' },
      { en: 'Audit logging', ka: 'Audit logging' },
      { en: 'Unit, integration & regression testing', ka: 'Unit, ინტეგრაციული და რეგრესიული ტესტირება' },
    ],
  },
  {
    id: 'ai',
    title: { en: 'AI Tools', ka: 'AI ინსტრუმენტები' },
    accent: 1,
    items: ['Claude Code', 'ChatGPT', { en: 'AI-assisted development', ka: 'AI-ით დახმარებული დეველოპმენტი' }],
  },
];
