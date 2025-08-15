import React from 'react'
import { FaClock, FaFire, FaStar, FaComments } from 'react-icons/fa'
import { useTheme } from '../contexts/ThemeContext'

type TabOption = 'recent' | 'popular' | 'recommended' | 'reviews'

interface TabsProps {
  activeTab: TabOption
  setActiveTab: (tab: TabOption) => void
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  const { isDark } = useTheme();
  
  const tabs = [
    { 
      id: 'recent' as TabOption, 
      label: 'Recent', 
      icon: FaClock,
      description: 'Latest releases'
    },
    { 
      id: 'popular' as TabOption, 
      label: 'Popular', 
      icon: FaFire,
      description: 'Most played'
    },
    { 
      id: 'recommended' as TabOption, 
      label: 'Recommended', 
      icon: FaStar,
      description: 'Staff picks'
    },
    { 
      id: 'reviews' as TabOption, 
      label: 'Reviews', 
      icon: FaComments,
      description: 'Player feedback'
    },
  ]

  return (
    <div className="flex justify-center mt-8 px-4">
      <div className={`backdrop-blur-md p-2 rounded-2xl ${
        isDark 
          ? 'bg-gray-800/30 border-gray-600/50' 
          : 'bg-white/30 border-white/50'
      }`}>
        {/* Mobile: Vertical stack */}
        <div className="sm:hidden grid grid-cols-2 gap-2 w-full max-w-sm">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group relative px-3 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : `${isDark ? 'text-gray-200 hover:bg-gray-700/60' : 'text-gray-800 hover:bg-white/60'}`
                }`}
              >
                <div className="flex flex-col items-center space-y-1">
                  <Icon className={`w-4 h-4 transition-all duration-300 ${
                    isActive 
                      ? 'text-white' 
                      : `${isDark ? 'text-gray-300 group-hover:text-gray-100' : 'text-gray-700 group-hover:text-gray-900'}`
                  }`} />
                  <span className="text-xs">{tab.label}</span>
                </div>
                
                {/* Active indicator for mobile */}
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div>
                )}
              </button>
            )
          })}
        </div>

        {/* Desktop: Horizontal layout */}
        <div className="hidden sm:flex space-x-1">
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
    </div>
  )
}

export default Tabs
