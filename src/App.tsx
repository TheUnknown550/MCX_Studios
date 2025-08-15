import { useState, useMemo, useEffect } from "react";
import { NotificationProvider } from "./components/NotificationSystem";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import LoadingScreen from "./components/LoadingScreen";
import AnimatedBackground from "./components/AnimatedBackground";
import SearchBar from "./components/SearchBar";
import Tabs from "./components/Tabs";
import type { TabOption, SortOption } from "./components/Tabs";
import GameCard from "./components/GameCard";
import ReviewsPage from "./components/ReviewsPage";
import Header from "./components/Header";
import ThemeToggle from "./components/ThemeToggle";
import { analytics, initializeAnalytics } from "./utils/analytics";
import { games } from "./data/games";

function AppContent() {
  const [activeTab, setActiveTab] = useState<TabOption>("roblox");
  const [sortBy, setSortBy] = useState<SortOption>("recent");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { isDark } = useTheme(); // This will force re-render when theme changes

  // Initialize Google Analytics
  useEffect(() => {
    initializeAnalytics();
  }, []);

  // Track tab changes
  const handleTabChange = (tab: TabOption) => {
    setActiveTab(tab);
    analytics.trackTabChange(tab);
  };

  // Track search queries
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const resultsCount = filterGames(gamesToShow).length;
      analytics.trackSearch(query, resultsCount);
    }
  };

  // Filter games based on search query
  const filterGames = (gamesArray: typeof games) => {
    if (!searchQuery) return gamesArray;
    return gamesArray.filter((game) => 
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.genre?.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  // Sort games based on selected option
  const sortGames = (gamesArray: typeof games, sortOption: SortOption) => {
    return [...gamesArray].sort((a, b) => {
      switch (sortOption) {
        case 'recent':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'popular':
          return (b.visits || 0) - (a.visits || 0);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  };

  const gamesToShow = useMemo(() => {
    if (activeTab === 'reviews') return []; // Reviews will be handled by ReviewsPage
    
    let filteredGames = games;
    if (activeTab === 'roblox') {
      filteredGames = games.filter(game => game.platform === 'roblox');
    } else if (activeTab === 'mobile') {
      filteredGames = games.filter(game => game.platform === 'mobile');
    }

    // Sort the filtered games
    const sortedGames = sortGames(filteredGames, sortBy);
    
    // Apply search filter
    return filterGames(sortedGames);
  }, [activeTab, sortBy, searchQuery]);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 relative overflow-hidden ${
      isDark 
        ? 'bg-gradient-to-tr from-gray-900 via-purple-900 to-indigo-900' 
        : 'bg-gradient-to-tr from-cyan-400 via-blue-300 to-indigo-400'
    }`}>
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Theme Toggle - Fixed Top Right */}
      <div className="fixed top-3 right-3 sm:top-4 sm:right-4 z-50">
        <ThemeToggle />
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
        <Header />
        
        {/* Search Bar */}
        <div className="mt-6 sm:mt-8 flex justify-center">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Navigation Tabs */}
        <Tabs 
          activeTab={activeTab} 
          setActiveTab={handleTabChange}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Content Area */}
        {activeTab === 'reviews' ? (
          <div className="mt-6 sm:mt-8">
            <ReviewsPage />
          </div>
        ) : (
          <>
            {/* Results Info */}
            <div className="mt-4 sm:mt-6 text-center px-2">
              <p className="text-gray-900 dark:text-gray-100 font-bold text-sm sm:text-lg bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full inline-block">
                {searchQuery ? (
                  <>Showing {gamesToShow.length} result{gamesToShow.length !== 1 ? 's' : ''} for "{searchQuery}"</>
                ) : (
                  <>Showing {gamesToShow.length} {activeTab} game{gamesToShow.length !== 1 ? 's' : ''}</>
                )}
              </p>
            </div>
          </>
        )}

        {/* Games Grid */}
        {gamesToShow.length > 0 ? (
          <div className="mt-6 sm:mt-8 flex justify-center px-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 w-full max-w-7xl">
              {gamesToShow.map((game) => (
                <div key={game.id} className="flex justify-center">
                  <GameCard game={game} />
                </div>
              ))}
            </div>
          </div>
        ) : activeTab !== 'reviews' ? (
          <div className="mt-8 sm:mt-12 text-center space-y-3 sm:space-y-4 px-4">
            <div className="text-4xl sm:text-6xl">
              {activeTab === 'mobile' ? '📱' : '🎮'}
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg inline-block">
              {activeTab === 'mobile' ? 'New games coming soon!' : 'No games found'}
            </h3>
            <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200 bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg inline-block max-w-md mx-auto">
              {activeTab === 'mobile' 
                ? 'We\'re working on exciting mobile games! Stay tuned for updates.' 
                : searchQuery 
                  ? 'Try adjusting your search or browse different categories'
                  : 'Check back later for new releases'
              }
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="mt-3 sm:mt-4 px-4 sm:px-6 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 font-semibold text-sm sm:text-base"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : null}

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-900 dark:text-gray-100 border-t border-gray-300/50 dark:border-gray-600/50 pt-8">
          <div className="space-y-2 bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm px-6 py-4 rounded-xl inline-block">
            <p className="font-bold text-lg">MCX Studios</p>
            <p className="text-sm font-medium">Creating amazing Roblox experiences since 2025</p>
            <p className="text-xs font-medium opacity-80">© 2025 MCX Studios. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AppContent />
      </NotificationProvider>
    </ThemeProvider>
  );
}