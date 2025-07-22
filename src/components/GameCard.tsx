import React from "react";
import type { GameEntry } from "../data/games";

interface GameCardProps {
  game: GameEntry;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <div className="bg-gradient-to-br from-white to-gray-100 rounded-3xl shadow-lg p-5 max-w-xs w-full
                    transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      <img
        src={game.imageUrl}
        alt={game.title}
        className="rounded-2xl w-full h-44 object-cover mb-5 border border-gray-200 shadow-sm"
      />
      <h3 className="text-xl font-semibold mb-2 text-gray-900">{game.title}</h3>
      <p className="text-gray-700 text-sm mb-4 leading-relaxed">{game.description}</p>
      <a
        href={game.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-blue-600 text-white px-5 py-3 rounded-xl text-sm font-semibold
                   hover:bg-blue-700 shadow-md transition-colors duration-200"
      >
        Play on Roblox
      </a>
    </div>
  );
};

export default GameCard;
