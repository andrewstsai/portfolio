import { Project } from "@/types";

export const projects: Project[] = [
  {
    title: "Animal Farm [WIP]",
    description:
      "A mobile app for productivity developed with friends from an exchange program.",
    technologies: ["Unity", "C#", "Firebase"],
    githubLink: "",
    demoLink: "",
    image: "/projects/animalfarm.png",
  },
  {
    title: "Portfolio Website",
    description:
      "A simple personal portfolio website showcasing my skills.",
    technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    githubLink: "https://github.com",
    demoLink: "",
    image: "/projects/portfolio-website.png",
  },
  {
    title: "Kanbas",
    description:
      "My first solo full-stack project. A copy of Instructure's Canvas LMS.",
    technologies: ["TypeScript", "Node.js", "React", "MongoDB", "JavaScript"],
    githubLink: "https://github.com/andrewstsai/kanbas-react-web-app",
    demoLink: "",
    image: "/projects/kanbas.png",
  },
  {
    title: "Covey.Town Vote Kick",
    description:
      "A feature for Covey.Town that allows users to vote to kick other users from their Covey.Town.",
    technologies: ["TypeScript", "Node.js", "React", "Docker", "Firebase"],
    githubLink: "https://github.com/neu-cs4530/covey-town-project-team-207",
    demoLink: "",
    image: "/projects/votekick.png",
  },
  {
    title: "NomNomNow",
    description: "My first introduction to database design. A prototype of a restaurant delivery service.",
    technologies: ["Python", "Flask", "Docker", "MySQL", "ngrok"],
    githubLink: "https://github.com/andrewstsai/NomNomNow",
    demoLink: "",
    image: "/projects/nomnomnow.png",
  },
  {
    title: "Minesweeper",
    description: "My first software project from high school. The code's terrible but got me into computer science",
    technologies: ["Python"],
    githubLink: "https://github.com/andrewstsai/Highschool-Projects",
    demoLink: "",
    image: "/projects/minesweeper.png",
  },
];
