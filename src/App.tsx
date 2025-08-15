import { useState, useMemo } from "react";
import { useSortedGames } from "./hooks/useSortedGames";
import { NotificationProvider } from "./components/NotificationSystem";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import LoadingScreen from "./components/LoadingScreen";
import AnimatedBackground from "./components/AnimatedBackground";
import SearchBar from "./components/SearchBar";
import Tabs from "./components/Tabs";
import GameCard from "./components/GameCard";
import ReviewsPage from "./components/ReviewsPage";
import Header from "./components/Header";

function AppContent() {
  const [activeTab, setActiveTab] = useState<"recent" | "popular" | "recommended" | "reviews">("recent");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { mostRecent = [], mostPopular = [], recommended = [] } = useSortedGames();
  const { isDark } = useTheme(); // This will force re-render when theme changes

  // Filter games based on search query
  const filterGames = (games: typeof mostRecent) => {
    if (!searchQuery) return games;
    return games.filter(game => 
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.genre?.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  const gamesToShow = useMemo(() => {
    if (activeTab === 'reviews') return []; // Reviews will be handled by ReviewsPage
    
    const games = {
      recent: mostRecent,
      popular: mostPopular,
      recommended: recommended,
    }[activeTab] || [];

    return filterGames(games);
  }, [activeTab, searchQuery, mostRecent, mostPopular, recommended]);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  if (!mostRecent.length && !mostPopular.length && !recommended.length) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 text-center text-gray-200 bg-gradient-to-tr from-purple-700 via-pink-600 to-red-500">
        <div className="space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mx-auto"></div>
          <p className="text-xl font-semibold">Loading amazing games...</p>
          <p className="text-sm opacity-75">Preparing your gaming experience</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 relative overflow-hidden ${
      isDark 
        ? 'bg-gradient-to-tr from-gray-900 via-purple-900 to-indigo-900' 
        : 'bg-gradient-to-tr from-cyan-400 via-blue-300 to-indigo-400'
    }`}>
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Main Content */}
      <div className="relative z-10 p-6">
        <Header />
        
        {/* Search Bar */}
        <div className="mt-8 flex justify-center">
          <SearchBar onSearch={setSearchQuery} />
        </div>

        {/* Navigation Tabs */}
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content Area */}
        {activeTab === 'reviews' ? (
          <div className="mt-8">
            <ReviewsPage />
          </div>
        ) : (
          <>
            {/* Results Info */}
            <div className="mt-6 text-center">
              <p className="text-gray-900 dark:text-gray-100 font-bold text-lg bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm px-4 py-2 rounded-full inline-block">
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
          <div className="mt-8 flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl">
              {gamesToShow.map((game) => (
                <div key={game.id} className="flex justify-center">
                  <GameCard game={game} />
                </div>
              ))}
            </div>
          </div>
        ) : activeTab !== 'reviews' ? (
          <div className="mt-12 text-center space-y-4">
            <div className="text-6xl">🎮</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm px-4 py-2 rounded-lg inline-block">No games found</h3>
            <p className="text-gray-800 dark:text-gray-200 bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm px-4 py-2 rounded-lg inline-block">
              Try adjusting your search or browse different categories
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 font-semibold"
            >
              Clear Search
            </button>
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