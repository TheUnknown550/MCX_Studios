import React from 'react'
import { FaGamepad, FaMobile, FaComments, FaSortAmountDown } from 'react-icons/fa'
import { useTheme } from '../contexts/ThemeContext'

type TabOption = 'roblox' | 'mobile' | 'reviews'
type SortOption = 'recent' | 'popular' | 'rating' | 'alphabetical'

export type { TabOption, SortOption }

interface TabsProps {
  activeTab: TabOption
  setActiveTab: (tab: TabOption) => void
  sortBy: SortOption
  setSortBy: (sort: SortOption) => void
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab, sortBy, setSortBy }) => {
  const { isDark } = useTheme();
  
  const tabs = [
    { 
      id: 'roblox' as TabOption, 
      label: 'Roblox Games', 
      icon: FaGamepad,
      description: 'Roblox experiences'
    },
    { 
      id: 'mobile' as TabOption, 
      label: 'Mobile Games', 
      icon: FaMobile,
      description: 'Mobile apps'
    },
    { 
      id: 'reviews' as TabOption, 
      label: 'Reviews', 
      icon: FaComments,
      description: 'Player feedback'
    },
  ]

  const sortOptions = [
    { value: 'recent' as SortOption, label: 'Most Recent' },
    { value: 'popular' as SortOption, label: 'Most Popular' },
    { value: 'rating' as SortOption, label: 'Highest Rated' },
    { value: 'alphabetical' as SortOption, label: 'A-Z' },
  ]

  return (
    <div className="flex flex-col items-center mt-6 px-4 space-y-3">
      {/* Tabs */}
      <div className={`backdrop-blur-md p-2 rounded-2xl w-full max-w-4xl ${
        isDark 
          ? 'bg-gray-800/30 border border-gray-600/50' 
          : 'bg-white/30 border border-white/50'
      }`}>
        {/* Mobile: Horizontal grid with smaller buttons */}
        <div className="sm:hidden grid grid-cols-3 gap-1 w-full">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group relative px-2 py-2.5 rounded-xl font-semibold transition-all duration-300 text-center ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                    : `${isDark ? 'text-gray-200 hover:bg-gray-700/60' : 'text-gray-800 hover:bg-white/60'}`
                }`}
              >
                <div className="flex flex-col items-center space-y-1">
                  <Icon className={`w-3.5 h-3.5 transition-all duration-300 ${
                    isActive 
                      ? 'text-white' 
                      : `${isDark ? 'text-gray-300 group-hover:text-gray-100' : 'text-gray-700 group-hover:text-gray-900'}`
                  }`} />
                  <span className="text-xs leading-tight whitespace-nowrap">
                    {tab.id === 'roblox' ? 'Roblox\nGames' : 
                     tab.id === 'mobile' ? 'Mobile\nGames' : 
                     'Reviews'}
                  </span>
                </div>
                
                {/* Active indicator for mobile */}
                {isActive && (
                  <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full"></div>
                )}
              </button>
            )
          })}
        </div>

        {/* Desktop/Tablet: Horizontal layout */}
        <div className="hidden sm:flex space-x-1 justify-center">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group relative px-4 lg:px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : `${isDark ? 'text-gray-200 hover:bg-gray-700/60' : 'text-gray-800 hover:bg-white/60'}`
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon className={`w-4 h-4 transition-all duration-300 ${
                    isActive 
                      ? 'text-white' 
                      : `${isDark ? 'text-gray-300 group-hover:text-gray-100' : 'text-gray-700 group-hover:text-gray-900'}`
                  }`} />
                  <span className="text-sm lg:text-base">{tab.label}</span>
                </div>
                
                {/* Tooltip */}
                <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap ${
                  isDark ? 'bg-gray-700' : 'bg-gray-900'
                }`}>
                  {tab.description}
                  <div className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${
                    isDark ? 'border-t-gray-700' : 'border-t-gray-900'
                  }`}></div>
                </div>
                
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Sort Dropdown - Only show for games tabs, not reviews */}
      {(activeTab === 'roblox' || activeTab === 'mobile') && (
        <div className={`backdrop-blur-md p-2.5 rounded-xl w-full max-w-sm sm:max-w-md ${
          isDark 
            ? 'bg-gray-800/30 border border-gray-600/50' 
            : 'bg-white/30 border border-white/50'
        }`}>
          <div className="flex items-center justify-center space-x-2 sm:space-x-3">
            <FaSortAmountDown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`} />
            <label className={`text-xs sm:text-sm font-medium ${
              isDark ? 'text-gray-200' : 'text-gray-800'
            }`}>
              Sort:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className={`px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 border flex-1 max-w-32 sm:max-w-none ${
                isDark 
                  ? 'bg-gray-700/80 text-gray-200 border-gray-600 hover:border-gray-500 focus:border-blue-400' 
                  : 'bg-white/80 text-gray-800 border-gray-300 hover:border-gray-400 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  )
}

export default Tabs
