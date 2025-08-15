// src/components/Header.tsx
import React, { useState, useEffect } from "react";
import { FaYoutube, FaTiktok, FaDiscord, FaGamepad, FaUsers, FaFire, FaChartLine } from "react-icons/fa";
import { games } from "../data/games";
import AnalyticsDashboard from "./AnalyticsDashboard";

const Header: React.FC = () => {
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
                <header className="w-full max-w-6xl flex flex-col items-center justify-between p-4 md:p-6 bg-white/95 backdrop-blur-md shadow-xl rounded-3xl border border-white/40">
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
                            <h1 className="text-xl font-bold text-gray-900 mb-1">MCX_Studios</h1>
                            <p className="text-sm text-gray-700 mb-3">Game Developer & Creator</p>
                            
                            {/* Stats Row - Mobile */}
                            <div className="flex justify-center space-x-4 text-xs mb-4">
                                <div className="flex flex-col items-center text-blue-700">
                                    <FaGamepad className="w-4 h-4 mb-1" />
                                    <span className="font-semibold">{animatedStats.totalGames}</span>
                                    <span className="text-gray-700 text-xs">Games</span>
                                </div>
                                <div className="flex flex-col items-center text-green-700">
                                    <FaFire className="w-4 h-4 mb-1" />
                                    <span className="font-semibold">{formatNumber(animatedStats.totalPlays)}</span>
                                    <span className="text-gray-700 text-xs">Plays</span>
                                </div>
                                <div className="flex flex-col items-center text-purple-700">
                                    <FaUsers className="w-4 h-4 mb-1" />
                                    <span className="font-semibold">{animatedStats.activePlayers}</span>
                                    <span className="text-gray-700 text-xs">Online</span>
                                </div>
                            </div>
                        </div>

                        {/* Social Links - Mobile */}
                        <div className="flex justify-center space-x-3">
                            <button
                                onClick={() => setShowAnalytics(true)}
                                className="group p-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500 hover:to-purple-500 text-blue-700 hover:text-white transition-all duration-300 border border-blue-300"
                                title="View Analytics"
                            >
                                <FaChartLine className="w-4 h-4" />
                            </button>
                            <a
                                href="https://www.youtube.com/@MCX_Studios24"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group p-2 rounded-full bg-red-500/10 hover:bg-red-500 text-red-700 hover:text-white transition-all duration-300"
                                title="YouTube Channel"
                            >
                                <FaYoutube className="w-4 h-4" />
                            </a>
                            <a
                                href="https://www.tiktok.com/@mcx_studios24"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group p-2 rounded-full bg-gray-900/10 hover:bg-gray-900 text-gray-800 hover:text-white transition-all duration-300"
                                title="TikTok"
                            >
                                <FaTiktok className="w-4 h-4" />
                            </a>
                            <a
                                href="https://discord.gg/your-discord"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group p-2 rounded-full bg-indigo-500/10 hover:bg-indigo-500 text-indigo-700 hover:text-white transition-all duration-300"
                                title="Discord Server"
                            >
                                <FaDiscord className="w-4 h-4" />
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
                                <h1 className="text-2xl font-bold text-gray-900 mb-1">MCX_Studios</h1>
                                <p className="text-sm text-gray-700 mb-2">Game Developer & Creator</p>
                                
                                {/* Stats Row - Desktop */}
                                <div className="flex space-x-4 text-xs">
                                    <div className="flex items-center space-x-1 text-blue-700">
                                        <FaGamepad className="w-3 h-3" />
                                        <span className="font-semibold">{animatedStats.totalGames}</span>
                                        <span className="text-gray-700">Games</span>
                                    </div>
                                    <div className="flex items-center space-x-1 text-green-700">
                                        <FaFire className="w-3 h-3" />
                                        <span className="font-semibold">{formatNumber(animatedStats.totalPlays)}</span>
                                        <span className="text-gray-700">Plays</span>
                                    </div>
                                    <div className="flex items-center space-x-1 text-purple-700">
                                        <FaUsers className="w-3 h-3" />
                                        <span className="font-semibold">{animatedStats.activePlayers}</span>
                                        <span className="text-gray-700">Online</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Links & Analytics - Desktop */}
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setShowAnalytics(true)}
                                className="group p-3 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500 hover:to-purple-500 text-blue-700 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 border border-blue-300"
                                title="View Analytics"
                            >
                                <FaChartLine className="w-5 h-5" />
                            </button>
                            <a
                                href="https://www.youtube.com/@MCX_Studios24"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group p-3 rounded-full bg-red-500/10 hover:bg-red-500 text-red-700 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                                title="YouTube Channel"
                            >
                                <FaYoutube className="w-5 h-5" />
                            </a>
                            <a
                                href="https://www.tiktok.com/@mcx_studios24"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group p-3 rounded-full bg-gray-900/10 hover:bg-gray-900 text-gray-800 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                                title="TikTok"
                            >
                                <FaTiktok className="w-5 h-5" />
                            </a>
                            <a
                                href="https://discord.gg/your-discord"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group p-3 rounded-full bg-indigo-500/10 hover:bg-indigo-500 text-indigo-700 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                                title="Discord Server"
                            >
                                <FaDiscord className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </header>
                
                {/* Notification Badge */}
                <div className="mt-4 px-4 py-2 bg-gradient-to-r from-green-400/20 to-blue-500/20 backdrop-blur-sm rounded-full border border-green-400/40">
                    <p className="text-sm font-medium text-gray-800">
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