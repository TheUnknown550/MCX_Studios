import React, { useState } from "react";
import { useSortedGames } from "./hooks/useSortedGames";
import Tabs from "./components/Tabs";
import GameCard from "./components/GameCard";
import Header from "./components/Header"; // at the top


export default function App() {
  const [activeTab, setActiveTab] = useState<"recent" | "popular" | "recommended">("recent");
  const { mostRecent = [], mostPopular = [], recommended = [] } = useSortedGames();

  const gamesToShow = {
    recent: mostRecent,
    popular: mostPopular,
    recommended: recommended,
  }[activeTab] || [];

  if (!gamesToShow.length) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 text-center text-gray-200 bg-gradient-to-tr from-purple-700 via-pink-600 to-red-500">
        Loading games or no games available...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-cyan-400 via-blue-300 to-indigo-400 p-6">
        <Header />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="mt-6 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {gamesToShow.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}
