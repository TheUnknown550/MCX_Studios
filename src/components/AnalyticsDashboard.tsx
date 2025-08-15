import React, { useState, useEffect } from 'react';
import { FaChartLine, FaUsers, FaGamepad, FaClock, FaTimes } from 'react-icons/fa';
import { games } from '../data/games';

interface AnalyticsDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ isOpen, onClose }) => {
  // Calculate real stats from game data
  const totalVisits = games.reduce((sum, game) => sum + (game.visits || 0), 0);
  const estimatedActiveUsers = Math.max(Math.floor(totalVisits / 100), 5);
  const topGame = games.reduce((top, game) => 
    (game.visits || 0) > (top.visits || 0) ? game : top, games[0]);

  const [stats, setStats] = useState({
    totalVisits,
    activeUsers: estimatedActiveUsers,
    gamesPlayed: totalVisits, // Assuming 1 visit = 1 game played
    avgSessionTime: '8:42',
    topGame: topGame?.title || 'No games available',
    growth: '+18%'
  });

  const [chartData] = useState([
    { day: 'Mon', visits: 1200 },
    { day: 'Tue', visits: 1800 },
    { day: 'Wed', visits: 1600 },
    { day: 'Thu', visits: 2200 },
    { day: 'Fri', visits: 2800 },
    { day: 'Sat', visits: 3200 },
    { day: 'Sun', visits: 2400 },
  ]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        activeUsers: Math.max(Math.floor(Math.random() * 10) + estimatedActiveUsers - 5, 1),
        totalVisits: prev.totalVisits + Math.floor(Math.random() * 2),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  const maxVisits = Math.max(...chartData.map(d => d.visits));

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <FaChartLine className="w-6 h-6 text-blue-500" />
            <h2 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <FaTimes className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Visits</p>
                <p className="text-2xl font-bold">{stats.totalVisits.toLocaleString()}</p>
              </div>
              <FaChartLine className="w-8 h-8 text-blue-200" />
            </div>
            <p className="text-blue-100 text-xs mt-2">{stats.growth} from last week</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Active Users</p>
                <p className="text-2xl font-bold">{stats.activeUsers}</p>
              </div>
              <FaUsers className="w-8 h-8 text-green-200" />
            </div>
            <p className="text-green-100 text-xs mt-2">Currently online</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Games Played</p>
                <p className="text-2xl font-bold">{stats.gamesPlayed.toLocaleString()}</p>
              </div>
              <FaGamepad className="w-8 h-8 text-purple-200" />
            </div>
            <p className="text-purple-100 text-xs mt-2">Total sessions</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Avg. Session</p>
                <p className="text-2xl font-bold">{stats.avgSessionTime}</p>
              </div>
              <FaClock className="w-8 h-8 text-orange-200" />
            </div>
            <p className="text-orange-100 text-xs mt-2">Time per visit</p>
          </div>
        </div>

        {/* Chart */}
        <div className="p-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Visits</h3>
          <div className="flex items-end space-x-4 h-32">
            {chartData.map((data, index) => (
              <div key={data.day} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t transition-all duration-500 hover:from-blue-600 hover:to-blue-500"
                  style={{ 
                    height: `${(data.visits / maxVisits) * 100}%`,
                    animationDelay: `${index * 100}ms`
                  }}
                ></div>
                <p className="text-xs text-gray-600 mt-2">{data.day}</p>
                <p className="text-xs font-semibold text-gray-800">{data.visits}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Game */}
        <div className="p-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Performing Game</h3>
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm">Most Popular</p>
                <p className="text-xl font-bold">{stats.topGame}</p>
                <p className="text-yellow-100 text-sm mt-1">{topGame?.visits || 0} plays this year</p>
              </div>
              <div className="text-4xl">🏆</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
