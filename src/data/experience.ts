export type ExperienceEntry = {
  period: string;
  company: string;
  role: string;
  bullets: string[];
};

export const experience: ExperienceEntry[] = [
  {
    period: "Jun 2025 – Present",
    company: "Sirinti AI",
    role: "Software Engineer",
    bullets: [
      "Building automated workflow system that orchestrates client onboarding and daily prospecting scripts, eliminating 5 hours of manual daily operations",
      "Developing pipeline that parses client Ideal Customer Profiles, queries Apollo API for matching companies and contacts, and exports CSV for platform enrichment",
      "Shipped full-stack company-watchlist and lead-campaign features (Next.js, NestJS, Postgres) with CSV import/export, sortable multi-column tables, and Redux state",
      "Designed and built RESTful endpoints for admin marketing-news system across both Next.js homepage and Vite dashboard with admin-only access controls",
    ],
  },
  {
    period: "Jun 2023 – Dec 2023",
    company: "Cirrus Data Solutions",
    role: "Software Engineer Co-op",
    bullets: [
      "Delivered admin controls and bug fixes for internal cloud-migration testing platform offering 40+ lab scenarios, replacing manual VMware operations with in-app buttons",
      "Wrote Python scripts using AWS Boto3 and Azure SDKs to consolidate VM utilization data across both clouds, surfacing idle instances that cut 15% from monthly infrastructure spend",
    ],
  },
  {
    period: "Feb 2023 – May 2023",
    company: "Chirp",
    role: "Software Developer Intern",
    bullets: [
      "Developed 4-screen marketing and registration site for early-stage startup as sole frontend developer, translating Figma designs into responsive production code",
      "Wired contact form to PHP backend that routed inquiries to team email, handling form validation and submission flow",
    ],
  },
];
