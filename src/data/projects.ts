export type ProjectSection = {
  problem: string;
  howItWorks: string;
  architecture: string;
};

export type Project = {
  slug: string;
  title: string;
  blurb: string;
  image: string;
  body?: string;
  sections?: ProjectSection;
  links?: { href: string; label: string }[];
  tags?: string[];
  year?: string;
};

export const projects: Project[] = [
  {
    slug: "insta-share",
    title: "Insta Share",
    blurb:
      "Real-time file-sharing web app where users drag and drop files onto a shared 2D canvas with anonymous session-based collaboration.",
    image: "https://i.ibb.co/7dC1G35Q/image.png",
    year: "2025",
    tags: ["Java", "Spring Boot", "Angular", "TypeScript", "Redis", "AWS"],
    sections: {
      problem:
        "Sharing files quickly between devices or with collaborators shouldn't require accounts, email attachments, or cloud storage setup. Most existing tools are either asynchronous, cluttered with UI, or lock files behind a sign-in wall. The goal was zero-friction, session-based file sharing — just share a link and start dropping.",
      howItWorks:
        "Opening the app generates a unique session URL. Anyone with the link joins the same shared 2D canvas and can see all participants in real time. Files are dragged directly onto the canvas, where they appear for everyone instantly. Sessions and their files automatically expire after one day, or sooner when all users leave. No accounts, no setup required.",
      architecture:
        "The backend is a Spring Boot service that manages WebSocket connections using the STOMP protocol, broadcasting canvas events to all session participants. Uploaded files go to AWS S3; Redis caches the presigned access URLs so repeated fetches skip the round-trip to AWS, and enforces per-user upload rate limits to prevent abuse. The Angular frontend handles drag-and-drop interactions and renders the live canvas. A GitHub Actions CI pipeline runs the JUnit and Mockito test suite on every push.",
    },
    links: [
      { href: "https://github.com/andrewstsai/insta-share-frontend", label: "Frontend" },
      { href: "https://github.com/andrewstsai/insta-share-backend", label: "Backend" },
    ],
  },
  {
    slug: "menu-passport",
    title: "Menu Passport",
    blurb:
      "Agentic AI system that translates foreign restaurant menus from photo to enriched output with OCR, translation, and dish imagery.",
    image: "https://i.ibb.co/HfzFNWpW/menupassport.png",
    year: "2025",
    tags: ["Python", "LangChain", "GPT-4", "React", "TypeScript", "GCP"],
    sections: {
      problem:
        "Dining at foreign restaurants is exciting but often inaccessible when you can't read the menu. Raw translation gives you words, not context — you still don't know what a dish actually looks like, whether it's spicy, or if it's vegetarian. The gap isn't translation; it's enrichment.",
      howItWorks:
        "Point your camera at any menu. Google Vision OCR extracts the text, and a LangChain agent powered by GPT-4 takes over: it filters the OCR results to include only menu items, translates each of them, fetches a representative photo via the Google Custom Search Images API, and converts currency. The result is a rich, visual menu in your language — readable even if you've never encountered the cuisine. The app is live, with the frontend on Vercel and the backend on Render.",
      architecture:
        "The agent orchestrates 10 specialized tools, each handling a discrete step: OCR parsing, language detection, per-item translation, description generation, image search, dietary classification, and structured output formatting. Token costs were reduced by 60% by passing structured context between tool calls and caching translation and image results keyed by dish name — avoiding redundant LLM and API calls for repeated items across large menus. The React/TypeScript frontend is deployed on Vercel; the Python/FastAPI + LangChain backend runs on Render.",
    },
    links: [
      { href: "https://github.com/andrewstsai/menu-passport-frontend", label: "Frontend" },
      { href: "https://github.com/andrewstsai/menu-passport-backend", label: "Backend" },
    ],
  },
];
