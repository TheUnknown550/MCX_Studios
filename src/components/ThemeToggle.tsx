import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import { analytics } from '../utils/analytics';

const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  const handleToggle = () => {
    toggleTheme();
    analytics.trackThemeChange(isDark ? 'light' : 'dark');
  };

  return (
    <button
      onClick={handleToggle}
      className="group relative p-3 rounded-full bg-gradient-to-r from-yellow-400/10 to-purple-600/10 dark:from-purple-600/10 dark:to-blue-600/10 hover:from-yellow-400 hover:to-orange-500 dark:hover:from-purple-600 dark:hover:to-blue-600 text-yellow-600 dark:text-purple-300 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 border border-yellow-400/30 dark:border-purple-400/30"
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <div className="relative w-5 h-5">
        {/* Sun Icon */}
        <FaSun 
          className={`absolute inset-0 w-5 h-5 transition-all duration-500 transform ${
            isDark ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'
          }`} 
        />
        {/* Moon Icon */}
        <FaMoon 
          className={`absolute inset-0 w-5 h-5 transition-all duration-500 transform ${
            isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'
          }`} 
        />
      </div>
      
      {/* Animated glow effect */}
      <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
        isDark 
          ? 'shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40' 
          : 'shadow-lg shadow-yellow-500/20 group-hover:shadow-yellow-500/40'
      }`}></div>
    </button>
  );
};

export default ThemeToggle;
