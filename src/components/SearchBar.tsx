import React, { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder = "Search games..." }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

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
    <div className="relative w-full max-w-md mx-auto mb-6 px-4">
      <div className={`relative transition-all duration-300 ${isFocused ? 'scale-105' : ''}`}>
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors duration-200" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-3 md:py-4 rounded-2xl border-2 border-transparent bg-white/80 backdrop-blur-md text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-all duration-300 shadow-lg hover:shadow-xl text-sm md:text-base"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1"
          >
            <FaTimes className="w-4 h-4" />
          </button>
        )}
      </div>
      
      {/* Search suggestion indicator */}
      {isFocused && query && (
        <div className="absolute top-full left-4 right-4 mt-2 p-2 bg-white/90 backdrop-blur-md rounded-xl shadow-lg z-10">
          <p className="text-sm text-gray-600">
            Searching for "{query}"...
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
