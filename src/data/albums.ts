export type Album = {
  slug: string;
  title: string;
  description?: string;
  cover: string;
};

export const albums: Album[] = [
  { slug: "japan",   title: "Japan",   cover: "https://i.ibb.co/rGL6jDxH/IMG-5429.jpg" },
  { slug: "taiwan",  title: "Taiwan",  cover: "https://i.ibb.co/bqHp6tJ/P1030186.jpg" },
  { slug: "food",    title: "Food",    cover: "https://i.ibb.co/Xfb3fyWQ/IMG-1442.jpg" },
  { slug: "biscuit", title: "Biscuit", cover: "https://i.ibb.co/YT0BXJp5/IMG-0082.jpg" },
];
