// src/components/Header.tsx
import React, { useState, useEffect } from "react";
import { FaYoutube, FaTiktok, FaInstagram, FaGamepad, FaUsers, FaFire, FaChartLine } from "react-icons/fa";
import { games } from "../data/games";
import { useTheme } from "../contexts/ThemeContext";
import AnalyticsDashboard from "./AnalyticsDashboard";
import { analytics } from "../utils/analytics";

const Header: React.FC = () => {
    const { isDark } = useTheme();
    
    // Calculate stats from actual game data
    const totalGames = games.length;
    const totalPlays = games.reduce((sum, game) => sum + (game.visits || 0), 0);
    const estimatedActivePlayers = Math.max(Math.floor(totalPlays / 100), 5);

    const [stats] = useState({
        totalGames,
        totalPlays,
        activePlayers: estimatedActivePlayers,
    });

    const [animatedStats, setAnimatedStats] = useState({
        totalGames: 0,
        totalPlays: 0,
        activePlayers: 0,
    });

    const [showAnalytics, setShowAnalytics] = useState(false);

    // Animate stats on load
    useEffect(() => {
        const duration = 2000;
        const steps = 60;
        const interval = duration / steps;

        let step = 0;
        const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            
            setAnimatedStats({
                totalGames: Math.floor(stats.totalGames * progress),
                totalPlays: Math.floor(stats.totalPlays * progress),
                activePlayers: Math.floor(stats.activePlayers * progress),
            });

            if (step >= steps) {
                clearInterval(timer);
                setAnimatedStats(stats);
            }
        }, interval);

        return () => clearInterval(timer);
    }, [stats]);

    const formatNumber = (num: number) => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return num.toString();
    };

    return (
        <>
            <div className="justify-center items-center flex flex-col relative z-10 px-4">
                <header className={`w-full max-w-6xl flex flex-col items-center justify-between p-4 md:p-6 backdrop-blur-md shadow-xl rounded-3xl ${
                    isDark 
                        ? 'bg-gray-800/95 border-gray-600/40' 
                        : 'bg-white/95 border-white/40'
                }`}>
                    {/* Mobile: Stacked layout */}
                    <div className="md:hidden w-full space-y-4">
                        {/* Profile Section - Mobile */}
                        <div className="flex flex-col items-center text-center">
                            <div className="relative mb-3">
                                <img
                                    src="Logo.png"
                                    alt="Profile"
                                    className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
                                />
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                            </div>
                            <h1 className={`text-xl font-bold mb-1 ${
                                isDark ? 'text-white' : 'text-gray-900'
                            }`}>MCX_Studios</h1>
                            <p className={`text-sm mb-3 ${
                                isDark ? 'text-gray-300' : 'text-gray-700'
                            }`}>Game Developer & Creator</p>
                            
                            {/* Stats Row - Mobile */}
                            <div className="flex justify-center space-x-4 text-xs mb-4">
                                <div className={`flex flex-col items-center ${
                                    isDark ? 'text-blue-400' : 'text-blue-700'
                                }`}>
                                    <FaGamepad className="w-4 h-4 mb-1" />
                                    <span className="font-semibold">{animatedStats.totalGames}</span>
                                    <span className={`text-xs ${
                                        isDark ? 'text-gray-400' : 'text-gray-700'
                                    }`}>Games</span>
                                </div>
                                <div className={`flex flex-col items-center ${
                                    isDark ? 'text-green-400' : 'text-green-700'
                                }`}>
                                    <FaFire className="w-4 h-4 mb-1" />
                                    <span className="font-semibold">{formatNumber(animatedStats.totalPlays)}</span>
                                    <span className={`text-xs ${
                                        isDark ? 'text-gray-400' : 'text-gray-700'
                                    }`}>Plays</span>
                                </div>
                                <div className={`flex flex-col items-center ${
                                    isDark ? 'text-purple-400' : 'text-purple-700'
                                }`}>
                                    <FaUsers className="w-4 h-4 mb-1" />
                                    <span className="font-semibold">{animatedStats.activePlayers}</span>
                                    <span className={`text-xs ${
                                        isDark ? 'text-gray-400' : 'text-gray-700'
                                    }`}>Online</span>
                                </div>
                            </div>
                        </div>

                        {/* Social Links - Mobile */}
                        <div className="flex justify-center space-x-3">
                            <button
                                onClick={() => {
                                    setShowAnalytics(true);
                                    analytics.trackAnalyticsView();
                                }}
                                className={`group p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
                                    isDark 
                                        ? 'bg-blue-500/20 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 text-blue-400 hover:text-white border border-blue-400/30' 
                                        : 'bg-blue-500/10 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 text-blue-700 hover:text-white border border-blue-300'
                                }`}
                                title="View Analytics"
                            >
                                <FaChartLine className="w-4 h-4" />
                            </button>
                            <a
                                href="https://www.youtube.com/@MCX_Studios24"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => analytics.trackSocialClick('youtube')}
                                className={`group p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
                                    isDark 
                                        ? 'bg-red-500/20 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 text-red-400 hover:text-white border border-red-400/30' 
                                        : 'bg-red-500/10 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 text-red-700 hover:text-white border border-red-300'
                                }`}
                                title="YouTube Channel"
                            >
                                <FaYoutube className="w-4 h-4" />
                            </a>
                            <a
                                href="https://www.tiktok.com/@mcx_studios24"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => analytics.trackSocialClick('tiktok')}
                                className={`group p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
                                    isDark 
                                        ? 'bg-pink-500/20 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 text-pink-400 hover:text-white border border-pink-400/30' 
                                        : 'bg-gray-800/10 hover:bg-gradient-to-r hover:from-gray-800 hover:to-black text-gray-800 hover:text-white border border-gray-300'
                                }`}
                                title="TikTok"
                            >
                                <FaTiktok className="w-4 h-4" />
                            </a>
                            <a
                                href="https://www.instagram.com/mcxstudios24/"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => analytics.trackSocialClick('instagram')}
                                className={`group p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
                                    isDark 
                                        ? 'bg-purple-500/20 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 text-purple-400 hover:text-white border border-purple-400/30' 
                                        : 'bg-purple-500/10 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 text-purple-700 hover:text-white border border-purple-300'
                                }`}
                                title="Instagram"
                            >
                                <FaInstagram className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Desktop: Horizontal layout */}
                    <div className="hidden md:flex w-full items-center justify-between">
                        {/* Profile Section - Desktop */}
                        <div className="flex items-center space-x-6">
                            <div className="relative">
                                <img
                                    src="Logo.png"
                                    alt="Profile"
                                    className="w-16 h-16 rounded-full border-4 border-white shadow-lg transform transition-transform duration-300 hover:scale-110"
                                />
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                            </div>
                            <div>
                                <h1 className={`text-2xl font-bold mb-1 ${
                                    isDark ? 'text-white' : 'text-gray-900'
                                }`}>MCX_Studios</h1>
                                <p className={`text-sm mb-2 ${
                                    isDark ? 'text-gray-300' : 'text-gray-700'
                                }`}>Game Developer & Creator</p>
                                
                                {/* Stats Row - Desktop */}
                                <div className="flex space-x-4 text-xs">
                                    <div className={`flex items-center space-x-1 ${
                                        isDark ? 'text-blue-400' : 'text-blue-700'
                                    }`}>
                                        <FaGamepad className="w-3 h-3" />
                                        <span className="font-semibold">{animatedStats.totalGames}</span>
                                        <span className={isDark ? 'text-gray-400' : 'text-gray-700'}>Games</span>
                                    </div>
                                    <div className={`flex items-center space-x-1 ${
                                        isDark ? 'text-green-400' : 'text-green-700'
                                    }`}>
                                        <FaFire className="w-3 h-3" />
                                        <span className="font-semibold">{formatNumber(animatedStats.totalPlays)}</span>
                                        <span className={isDark ? 'text-gray-400' : 'text-gray-700'}>Plays</span>
                                    </div>
                                    <div className={`flex items-center space-x-1 ${
                                        isDark ? 'text-purple-400' : 'text-purple-700'
                                    }`}>
                                        <FaUsers className="w-3 h-3" />
                                        <span className="font-semibold">{animatedStats.activePlayers}</span>
                                        <span className={isDark ? 'text-gray-400' : 'text-gray-700'}>Online</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Links & Analytics - Desktop */}
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => {
                                    setShowAnalytics(true);
                                    analytics.trackAnalyticsView();
                                }}
                                className={`group p-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${
                                    isDark 
                                        ? 'bg-blue-500/20 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 text-blue-400 hover:text-white border border-blue-400/30' 
                                        : 'bg-blue-500/10 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 text-blue-700 hover:text-white border border-blue-300'
                                }`}
                                title="View Analytics"
                            >
                                <FaChartLine className="w-5 h-5" />
                            </button>
                            <a
                                href="https://www.youtube.com/@MCX_Studios24"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => analytics.trackSocialClick('youtube')}
                                className={`group p-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${
                                    isDark 
                                        ? 'bg-red-500/20 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 text-red-400 hover:text-white border border-red-400/30' 
                                        : 'bg-red-500/10 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 text-red-700 hover:text-white border border-red-300'
                                }`}
                                title="YouTube Channel"
                            >
                                <FaYoutube className="w-5 h-5" />
                            </a>
                            <a
                                href="https://www.tiktok.com/@mcx_studios24"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => analytics.trackSocialClick('tiktok')}
                                className={`group p-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${
                                    isDark 
                                        ? 'bg-pink-500/20 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 text-pink-400 hover:text-white border border-pink-400/30' 
                                        : 'bg-gray-800/10 hover:bg-gradient-to-r hover:from-gray-800 hover:to-black text-gray-800 hover:text-white border border-gray-300'
                                }`}
                                title="TikTok"
                            >
                                <FaTiktok className="w-5 h-5" />
                            </a>
                            <a
                                href="https://www.instagram.com/mcxstudios24/"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => analytics.trackSocialClick('instagram')}
                                className={`group p-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${
                                    isDark 
                                        ? 'bg-purple-500/20 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 text-purple-400 hover:text-white border border-purple-400/30' 
                                        : 'bg-purple-500/10 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 text-purple-700 hover:text-white border border-purple-300'
                                }`}
                                title="Instagram"
                            >
                                <FaInstagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </header>
                
                {/* Notification Badge */}
                <div className={`mt-4 px-4 py-2 backdrop-blur-sm rounded-full border ${
                    isDark 
                        ? 'bg-gradient-to-r from-green-400/20 to-blue-500/20 border-green-400/40' 
                        : 'bg-gradient-to-r from-green-400/20 to-blue-500/20 border-green-400/40'
                }`}>
                    <p className={`text-sm font-medium ${
                        isDark ? 'text-gray-200' : 'text-gray-800'
                    }`}>
                        🎮 Welcome to MCX Studios - Creating amazing experiences since 2025!
                    </p>
                </div>
            </div>

            {/* Analytics Dashboard */}
            <AnalyticsDashboard 
                isOpen={showAnalytics} 
                onClose={() => setShowAnalytics(false)} 
            />
        </>
    );
};

export default Header;