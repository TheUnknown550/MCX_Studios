export type GameEntry = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  universeId: number;
  createdAt: string; // ISO date string
  visits?: number; // optional field for popularity
};

export const games: GameEntry[] = [
  {
    id: 1,
    title: "Escape The Impossible BRAIN ROT OBBY!!!",
    description: "🧠 BRAIN ROT OBBY - Can You Survive the Chaos?",
    imageUrl: "https://tr.rbxcdn.com/180DAY-e1a8146f5ea1ba6768658e09dd27c4be/150/150/Image/Webp/noFilter",
    link: "https://www.roblox.com/games/118906484497652/Escape-The-Impossible-BRAIN-ROT-OBBY",
    universeId: 7972259029,
    createdAt: "2025-01-07T09:00:00Z",
    visits: 400,
  },
  {
    id: 2,
    title: "Higher Heights",
    description: "How high can you go?",
    imageUrl: "https://tr.rbxcdn.com/180DAY-d14ffe54f0f4e7a04eb780e4ff948fd4/150/150/Image/Webp/noFilter",
    link: "https://www.roblox.com/games/84024545489993/Higher-Heights",
    universeId: 8194190200,
    createdAt: "2025-07-22T12:00:00Z",
    visits: 2,
  },
];
