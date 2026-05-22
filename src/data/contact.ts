export type ContactLink = {
  label: string;
  handle: string;
  href: string;
  icon: "mail" | "github" | "linkedin" | "instagram" | "twitter";
};

export const contacts: ContactLink[] = [
  {
    label: "Email",
    handle: "andrewstsai@gmail.com",
    href: "mailto:andrewstsai@gmail.com",
    icon: "mail",
  },
  {
    label: "GitHub",
    handle: "@andrewstsai",
    href: "https://github.com/andrewstsai",
    icon: "github",
  },
  {
    label: "LinkedIn",
    handle: "andrew-s-tsai",
    href: "https://linkedin.com/in/andrew-s-tsai",
    icon: "linkedin",
  },
];
