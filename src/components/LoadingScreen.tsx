import React, { useState, useEffect } from 'react';
import { FaGamepad, FaRocket } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  const { isDark } = useTheme();

  const messages = [
    "🎮 Loading MCX Studios...",
    "🚀 Preparing your games...",
    "✨ Almost ready!",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const messageTimer = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % messages.length);
    }, 1000);

    return () => {
      clearInterval(timer);
      clearInterval(messageTimer);
    };
  }, [onComplete, messages.length]);

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black' 
        : 'bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600'
    }`}>
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 rounded-full opacity-30 animate-bounce ${
              isDark ? 'bg-blue-400' : 'bg-white'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="text-center z-10 max-w-md mx-auto px-6">
        {/* Logo Animation */}
        <div className="mb-8 relative">
          <div className={`inline-block p-6 backdrop-blur-md rounded-full ${
            isDark ? 'bg-gray-800/40' : 'bg-white/20'
          }`}>
            <FaGamepad className="w-16 h-16 text-white animate-pulse" />
          </div>
          <div className="absolute -top-2 -right-2">
            <FaRocket className="w-8 h-8 text-yellow-400 animate-bounce" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-white mb-2 animate-fadeInUp">
          MCX Studios
        </h1>
        <p className="text-white/80 mb-8 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          Game Development & Creation
        </p>

        {/* Loading Message */}
        <div className="mb-6 h-8">
          <p className="text-lg text-white font-medium animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            {messages[currentMessage]}
          </p>
        </div>

        {/* Progress Bar */}
        <div className={`w-full rounded-full h-3 mb-4 overflow-hidden ${
          isDark ? 'bg-gray-700/40' : 'bg-white/20'
        }`}>
          <div 
            className={`h-full rounded-full transition-all duration-300 ease-out ${
              isDark 
                ? 'bg-gradient-to-r from-blue-400 to-purple-400' 
                : 'bg-gradient-to-r from-yellow-400 to-pink-400'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress Text */}
        <p className="text-white/60 text-sm">
          {progress}% Complete
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
