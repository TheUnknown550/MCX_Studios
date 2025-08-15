import React, { useState } from 'react';
import { FaStar, FaThumbsUp, FaUser, FaCheckCircle, FaFilter, FaSearch } from 'react-icons/fa';
import { games } from '../data/games';

const ReviewsPage: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<number | 'all'>('all');
  const [ratingFilter, setRatingFilter] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Get all reviews from all games
  const allReviews = games.flatMap(game => 
    (game.reviews || []).map(review => ({
      ...review,
      gameTitle: game.title,
      gameId: game.id
    }))
  );

  // Filter reviews
  const filteredReviews = allReviews.filter(review => {
    const matchesGame = selectedGame === 'all' || review.gameId === selectedGame;
    const matchesRating = ratingFilter === 'all' || review.rating === ratingFilter;
    const matchesSearch = searchQuery === '' || 
      review.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.username.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesGame && matchesRating && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getAverageRating = (gameId?: number) => {
    const gameReviews = gameId 
      ? allReviews.filter(r => r.gameId === gameId)
      : allReviews;
    
    if (gameReviews.length === 0) return 0;
    
    const sum = gameReviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / gameReviews.length).toFixed(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Game Reviews
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          See what players are saying about MCX Studios games
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center space-x-3">
            <FaStar className="w-8 h-8 text-yellow-400" />
            <div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {getAverageRating()}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Average Rating</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center space-x-3">
            <FaUser className="w-8 h-8 text-blue-400" />
            <div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {allReviews.length}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Reviews</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center space-x-3">
            <FaCheckCircle className="w-8 h-8 text-green-400" />
            <div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {allReviews.filter(r => r.verified).length}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Verified Reviews</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-center space-x-2 mb-4">
          <FaFilter className="w-4 h-4 text-gray-500" />
          <span className="font-medium text-gray-700 dark:text-gray-300">Filters</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reviews..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Game Filter */}
          <select
            value={selectedGame}
            onChange={(e) => setSelectedGame(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 focus:outline-none"
          >
            <option value="all">All Games</option>
            {games.map(game => (
              <option key={game.id} value={game.id}>{game.title}</option>
            ))}
          </select>

          {/* Rating Filter */}
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 focus:outline-none"
          >
            <option value="all">All Ratings</option>
            <option value={5}>5 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={3}>3 Stars</option>
            <option value={2}>2 Stars</option>
            <option value={1}>1 Star</option>
          </select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No reviews found matching your criteria.</p>
          </div>
        ) : (
          filteredReviews.map((review) => (
            <div key={review.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
              {/* Review Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={review.avatar}
                    alt={review.username}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-800 dark:text-white">
                        {review.username}
                      </span>
                      {review.verified && (
                        <FaCheckCircle className="w-4 h-4 text-blue-500" title="Verified Player" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(review.createdAt)}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className={`w-4 h-4 ${
                          review.rating >= star ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    for {review.gameTitle}
                  </p>
                </div>
              </div>

              {/* Review Content */}
              {review.title && (
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                  {review.title}
                </h3>
              )}
              
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                {review.comment}
              </p>

              {/* Review Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                  <FaThumbsUp className="w-4 h-4" />
                  <span className="text-sm">Helpful ({review.helpful})</span>
                </button>
                
                <span className="text-xs text-gray-400">
                  Review #{review.id}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;
