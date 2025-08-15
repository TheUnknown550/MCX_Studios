import React, { useState } from "react";
import type { GameEntry } from "../data/games";
import GameStats from "./GameStats";
import { useNotifications } from "./NotificationSystem";
import { useTheme } from "../contexts/ThemeContext";
import { analytics } from "../utils/analytics";
import { FaPlay, FaHeart, FaShareAlt, FaExternalLinkAlt } from "react-icons/fa";

interface GameCardProps {
  game: GameEntry;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [playCount, setPlayCount] = useState(0);
  const { addNotification } = useNotifications();
  const { isDark } = useTheme();

  const handlePlay = () => {
    setPlayCount(prev => prev + 1);
    
    // Track game play event
    analytics.trackGamePlay(game.title, game.id);
    
    addNotification({
      type: 'success',
      title: 'Game Launched!',
      message: `Opening ${game.title} in Roblox...`,
      duration: 3000
    });
    window.open(game.link, '_blank');
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    
    // Track like/unlike event
    analytics.trackGameLike(game.title, game.id, newLikedState);
    
    if (newLikedState) {
      addNotification({
        type: 'success',
        title: 'Added to Favorites!',
        message: `${game.title} has been added to your favorites.`,
        duration: 2000
      });
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: game.title,
        text: game.description,
        url: game.link,
      });
      analytics.trackGameShare(game.title, game.id, 'native_share');
    } else {
      navigator.clipboard.writeText(game.link);
      analytics.trackGameShare(game.title, game.id, 'clipboard');
      addNotification({
        type: 'info',
        title: 'Link Copied!',
        message: 'Game link has been copied to your clipboard.',
        duration: 2000
      });
    }
  };

  // Determine if game is popular, new, or premium based on data
  const isPopular = (game.visits || 0) > 1000;
  const isNew = new Date(game.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // 30 days
  const isPremium = game.title.includes('Premium') || game.title.includes('VIP');

  return (
    <div 
      className={`group rounded-3xl shadow-lg p-5 max-w-xs w-full
                 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:rotate-1 cursor-pointer
                 border ${
                   isDark 
                     ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/50' 
                     : 'bg-gradient-to-br from-white to-gray-100 border-gray-200/50'
                 }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Overlay */}
      <div className="relative overflow-hidden rounded-2xl mb-5">
        <img
          src={game.imageUrl}
          alt={game.title}
          className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 flex items-center justify-center ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <button
            onClick={handlePlay}
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full transform transition-all duration-300 hover:scale-110 shadow-lg"
          >
            <FaPlay className="w-6 h-6" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex space-x-2">
          <button
            onClick={handleLike}
            className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
              isLiked 
                ? 'bg-red-500 text-white' 
                : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
            }`}
          >
            <FaHeart className="w-4 h-4" />
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-white/80 backdrop-blur-md text-gray-600 hover:bg-blue-500 hover:text-white transition-all duration-300"
          >
            <FaShareAlt className="w-4 h-4" />
          </button>
        </div>

        {/* Play Count Badge */}
        {playCount > 0 && (
          <div className="absolute bottom-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            Played {playCount}x
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-3">
        <h3 className={`text-xl font-semibold line-clamp-2 leading-tight ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          {game.title}
        </h3>
        
        <p className={`text-sm leading-relaxed line-clamp-3 ${
          isDark ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {game.description}
        </p>

        {/* Game Statistics */}
        <GameStats
          visits={game.visits}
          rating={game.rating || 0}
          totalRatings={game.totalRatings || 0}
          createdAt={game.createdAt}
          isPopular={isPopular}
          isNew={isNew}
          isPremium={isPremium}
          gameTitle={game.title}
          gameId={game.id}
        />

        {/* Play Button */}
        <button
          onClick={handlePlay}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-5 py-3 rounded-xl text-sm font-semibold
                     transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
        >
          <FaExternalLinkAlt className="w-4 h-4" />
          <span>Play on Roblox</span>
        </button>
      </div>
    </div>
  );
};

export default GameCard;
