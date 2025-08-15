export type Review = {
  id: string;
  userId: string;
  username: string;
  avatar?: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
  helpful: number;
  verified: boolean;
};

export type GamePlatform = 'roblox' | 'mobile' | 'pc' | 'web';

export type GameEntry = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  platform: GamePlatform;
  universeId?: number; // Optional for non-Roblox games
  createdAt: string; // ISO date string
  visits?: number; // optional field for popularity
  genre?: string[];
  difficulty?: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  features?: string[];
  maxPlayers?: number;
  rating?: number; // Average rating
  totalRatings?: number;
  reviews?: Review[];
  downloadUrl?: string; // For mobile games
  storeLinks?: {
    playStore?: string;
    appStore?: string;
    steam?: string;
  };
};

export const games: GameEntry[] = [
  {
    id: 1,
    title: "Escape The Impossible BRAIN ROT OBBY!!!",
    description: "🧠 BRAIN ROT OBBY - Can You Survive the Chaos? Navigate through mind-bending obstacles and prove your skills in this intense parkour challenge!",
    imageUrl: "https://tr.rbxcdn.com/180DAY-e1a8146f5ea1ba6768658e09dd27c4be/150/150/Image/Webp/noFilter",
    link: "https://www.roblox.com/games/118906484497652/Escape-The-Impossible-BRAIN-ROT-OBBY",
    platform: "roblox",
    universeId: 7972259029,
    createdAt: "2025-01-07T09:00:00Z",
    visits: 1247,
    genre: ["Obby", "Parkour", "Challenge"],
    difficulty: "Hard",
    features: ["Checkpoints", "Leaderboard", "Custom Animations"],
    maxPlayers: 12,
    rating: 4.3,
    totalRatings: 89,
    reviews: [
      {
        id: "r1",
        userId: "u1",
        username: "ProObbyPlayer",
        avatar: "https://via.placeholder.com/40x40/3B82F6/FFFFFF?text=P",
        rating: 5,
        title: "Absolutely Insane Challenge!",
        comment: "This obby is no joke! Took me 3 hours to complete but so worth it. The brain rot theme is hilarious and the obstacles are creative. Definitely recommend for experienced players!",
        createdAt: "2025-08-10T14:30:00Z",
        helpful: 23,
        verified: true,
      },
      {
        id: "r2",
        userId: "u2",
        username: "CasualGamer123",
        avatar: "https://via.placeholder.com/40x40/10B981/FFFFFF?text=C",
        rating: 4,
        title: "Fun but Difficult",
        comment: "Really enjoyed the unique concept. Some parts are extremely challenging but the checkpoints save you from rage quitting. Great work MCX!",
        createdAt: "2025-08-08T10:15:00Z",
        helpful: 15,
        verified: false,
      },
      {
        id: "r3",
        userId: "u3",
        username: "RobloxReviewer",
        avatar: "https://via.placeholder.com/40x40/F59E0B/FFFFFF?text=R",
        rating: 4,
        title: "Creative and Challenging",
        comment: "Love the brain rot aesthetic! The difficulty curve is well balanced. Only complaint is some jumps feel a bit inconsistent, but overall amazing obby.",
        createdAt: "2025-08-05T16:45:00Z",
        helpful: 31,
        verified: true,
      },
    ],
  },
  {
    id: 2,
    title: "Higher Heights",
    description: "How high can you go? Climb to incredible heights in this vertical climbing adventure. Test your endurance and reach for the sky!",
    imageUrl: "https://tr.rbxcdn.com/180DAY-d14ffe54f0f4e7a04eb780e4ff948fd4/150/150/Image/Webp/noFilter",
    link: "https://www.roblox.com/games/84024545489993/Higher-Heights",
    platform: "roblox",
    universeId: 8194190200,
    createdAt: "2025-07-22T12:00:00Z",
    visits: 856,
    genre: ["Climbing", "Adventure", "Simulator"],
    difficulty: "Medium",
    features: ["Height Tracker", "Power-ups", "Weather System"],
    maxPlayers: 8,
    rating: 4.7,
    totalRatings: 67,
    reviews: [
      {
        id: "r4",
        userId: "u4",
        username: "ClimbingFan",
        avatar: "https://via.placeholder.com/40x40/8B5CF6/FFFFFF?text=C",
        rating: 5,
        title: "Perfect Climbing Experience",
        comment: "This game is incredibly relaxing yet challenging. The height tracker is a nice touch and the power-ups add variety. Reached 2000+ height so far!",
        createdAt: "2025-08-12T09:20:00Z",
        helpful: 19,
        verified: true,
      },
      {
        id: "r5",
        userId: "u5",
        username: "AdventureSeeker",
        avatar: "https://via.placeholder.com/40x40/EF4444/FFFFFF?text=A",
        rating: 4,
        title: "Great Concept",
        comment: "Love the simple yet addictive gameplay. Weather effects are really cool! Would love to see more power-ups in future updates.",
        createdAt: "2025-08-09T13:10:00Z",
        helpful: 12,
        verified: false,
      },
    ],
  },
];
