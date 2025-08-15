import React, { useState } from 'react';
import { FaStar, FaEye, FaCalendarAlt, FaTrophy, FaFire, FaCrown } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import RatingModal from './RatingModal';

interface GameStatsProps {
  visits?: number;
  rating?: number;
  totalRatings?: number;
  createdAt: string;
  isPopular?: boolean;
  isNew?: boolean;
  isPremium?: boolean;
  gameTitle: string;
  gameId: number;
}

const GameStats: React.FC<GameStatsProps> = ({ 
  visits = 0, 
  rating = 0,
  totalRatings = 0,
  createdAt, 
  isPopular = false, 
  isNew = false, 
  isPremium = false,
  gameTitle,
  gameId
}) => {
  const [showRatingModal, setShowRatingModal] = useState(false);
  const { isDark } = useTheme();

  const formatVisits = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays <= 7) return `${diffDays} days ago`;
    if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  const openRatingModal = () => {
    setShowRatingModal(true);
  };

  return (
    <div className="space-y-3">
      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        {isPremium && (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
            <FaCrown className="w-3 h-3 mr-1" />
            Premium
          </span>
        )}
        {isPopular && (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-red-500 to-pink-500 text-white">
            <FaFire className="w-3 h-3 mr-1" />
            Popular
          </span>
        )}
        {isNew && (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-green-400 to-blue-500 text-white">
            <FaTrophy className="w-3 h-3 mr-1" />
            New
          </span>
        )}
      </div>

      {/* Stats Row */}
      <div className={`flex items-center justify-between text-sm ${
        isDark ? 'text-gray-200' : 'text-gray-800'
      }`}>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <FaEye className="w-4 h-4 mr-1 text-blue-600" />
            <span className="font-medium">{formatVisits(visits)}</span>
          </div>
          <div className="flex items-center">
            <FaCalendarAlt className="w-4 h-4 mr-1 text-green-600" />
            <span className="font-medium">{formatDate(createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Rating System */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-medium ${
              isDark ? 'text-gray-200' : 'text-gray-800'
            }`}>Rating:</span>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`w-4 h-4 ${
                    rating >= star ? 'text-yellow-500' : (isDark ? 'text-gray-600' : 'text-gray-300')
                  }`}
                />
              ))}
              <span className={`text-sm font-medium ml-1 ${
                isDark ? 'text-gray-200' : 'text-gray-800'
              }`}>
                {rating}/5 ({totalRatings} reviews)
              </span>
            </div>
          </div>
        </div>
        
        <button
          onClick={openRatingModal}
          className="w-full mt-2 px-3 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white text-sm font-medium rounded-lg transition-all duration-200 transform hover:scale-105"
        >
          Rate & Review This Game
        </button>
      </div>
      
      {/* Rating Modal */}
      <RatingModal
        isOpen={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        gameTitle={gameTitle}
        gameId={gameId}
        currentRating={rating}
      />
    </div>
  );
};

export default GameStats;
