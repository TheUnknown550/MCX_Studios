import React, { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder = "Search games..." }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const { isDark } = useTheme();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="relative w-full max-w-md mx-auto mb-4 px-2 sm:px-4">
      <div className={`relative transition-all duration-300 ${isFocused ? 'scale-105' : ''}`}>
        <FaSearch className={`absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200 w-4 h-4 ${
          isDark ? 'text-gray-500' : 'text-gray-400'
        }`} />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 md:py-4 rounded-2xl border-2 border-transparent backdrop-blur-md focus:outline-none transition-all duration-300 shadow-lg hover:shadow-xl text-sm md:text-base ${
            isDark 
              ? 'bg-gray-800/80 text-gray-200 placeholder-gray-400 focus:border-purple-500' 
              : 'bg-white/80 text-gray-800 placeholder-gray-500 focus:border-blue-500'
          }`}
        />
        {query && (
          <button
            onClick={clearSearch}
            className={`absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200 p-1 ${
              isDark 
                ? 'text-gray-500 hover:text-gray-300' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <FaTimes className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        )}
      </div>
      
      {/* Search suggestion indicator */}
      {isFocused && query && (
        <div className={`absolute top-full left-4 right-4 mt-2 p-2 backdrop-blur-md rounded-xl shadow-lg z-10 ${
          isDark ? 'bg-gray-800/90' : 'bg-white/90'
        }`}>
          <p className={`text-sm ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Searching for "{query}"...
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
