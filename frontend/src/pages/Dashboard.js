import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/apiService';
import { 
  Users, 
  Trophy, 
  Play, 
  TrendingUp, 
  Clock, 
  Award,
  Plus,
  History
} from 'lucide-react';

const Dashboard = () => {
  const { userProfile } = useAuth();
  const [stats, setStats] = useState({
    totalGamesPlayed: 0,
    totalGamesWon: 0,
    totalScore: 0,
    winRate: 0
  });
  const [recentSessions, setRecentSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch user stats
      if (userProfile) {
        setStats({
          totalGamesPlayed: userProfile.totalGamesPlayed || 0,
          totalGamesWon: userProfile.totalGamesWon || 0,
          totalScore: userProfile.totalScore || 0,
          winRate: userProfile.totalGamesPlayed > 0 
            ? Math.round((userProfile.totalGamesWon / userProfile.totalGamesPlayed) * 100) 
            : 0
        });
      }
      
      // Fetch recent sessions
      const history = await apiService.getPlayerHistory();
      setRecentSessions(history.slice(0, 5)); // Show last 5 sessions
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      title: 'Host a Quiz',
      description: 'Create a new quiz session and invite players',
      icon: <Users className="w-8 h-8 text-primary-600" />,
      link: '/host',
      color: 'primary'
    },
    {
      title: 'Join a Quiz',
      description: 'Enter a session code to join an existing quiz',
      icon: <Play className="w-8 h-8 text-secondary-600" />,
      link: '/join',
      color: 'secondary'
    },
    {
      title: 'View Profile',
      description: 'Check your stats and achievements',
      icon: <Trophy className="w-8 h-8 text-yellow-600" />,
      link: '/profile',
      color: 'yellow'
    }
  ];

  const statCards = [
    {
      title: 'Games Played',
      value: stats.totalGamesPlayed,
      icon: <Play className="w-6 h-6 text-blue-600" />,
      color: 'blue'
    },
    {
      title: 'Games Won',
      value: stats.totalGamesWon,
      icon: <Trophy className="w-6 h-6 text-green-600" />,
      color: 'green'
    },
    {
      title: 'Total Score',
      value: stats.totalScore.toLocaleString(),
      icon: <Award className="w-6 h-6 text-purple-600" />,
      color: 'purple'
    },
    {
      title: 'Win Rate',
      value: `${stats.winRate}%`,
      icon: <TrendingUp className="w-6 h-6 text-orange-600" />,
      color: 'orange'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {userProfile?.displayName || 'Player'}! 👋
          </h1>
          <p className="text-gray-600">
            Ready to challenge your knowledge and compete with others?
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className="card hover:shadow-lg transition-all duration-200 group"
              >
                <div className="flex items-start space-x-4">
                  <div className="group-hover:scale-110 transition-transform duration-200">
                    {action.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {action.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {action.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                <History className="w-5 h-5" />
                <span>Recent Activity</span>
              </h2>
              <Link 
                to="/profile" 
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                View All
              </Link>
            </div>
            
            {recentSessions.length > 0 ? (
              <div className="space-y-4">
                {recentSessions.map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        session.position <= 3 ? 'bg-yellow-100' : 'bg-gray-100'
                      }`}>
                        {session.position <= 3 ? (
                          <Trophy className="w-5 h-5 text-yellow-600" />
                        ) : (
                          <span className="text-sm font-semibold text-gray-600">
                            #{session.position}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Quiz Session
                        </p>
                        <p className="text-sm text-gray-500">
                          Position: #{session.position} • Score: {session.totalScore}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">
                        {new Date(session.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No recent activity</p>
                <p className="text-sm text-gray-400">
                  Start playing to see your activity here!
                </p>
              </div>
            )}
          </div>

          {/* Quick Start */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Quick Start</span>
            </h2>
            
            <div className="space-y-4">
              <Link
                to="/host"
                className="block p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors group"
              >
                <div className="text-center">
                  <Users className="w-8 h-8 text-gray-400 group-hover:text-primary-600 mx-auto mb-2" />
                  <p className="font-medium text-gray-900 group-hover:text-primary-900">
                    Host New Quiz
                  </p>
                  <p className="text-sm text-gray-500">
                    Create a session and invite friends
                  </p>
                </div>
              </Link>
              
              <Link
                to="/join"
                className="block p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-secondary-300 hover:bg-secondary-50 transition-colors group"
              >
                <div className="text-center">
                  <Play className="w-8 h-8 text-gray-400 group-hover:text-secondary-600 mx-auto mb-2" />
                  <p className="font-medium text-gray-900 group-hover:text-secondary-900">
                    Join with Code
                  </p>
                  <p className="text-sm text-gray-500">
                    Enter a session code to join
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;