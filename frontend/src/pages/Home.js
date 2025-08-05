import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Users, 
  Trophy, 
  Zap, 
  Clock, 
  TrendingUp, 
  Star,
  ArrowRight,
  Play
} from 'lucide-react';

const Home = () => {
  const { currentUser } = useAuth();

  const features = [
    {
      icon: <Users className="w-8 h-8 text-primary-600" />,
      title: "Real-time Multiplayer",
      description: "Compete with friends and players worldwide in live quiz battles"
    },
    {
      icon: <Trophy className="w-8 h-8 text-secondary-600" />,
      title: "Live Leaderboards",
      description: "Track your progress and climb the rankings in real-time"
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-600" />,
      title: "Instant Results",
      description: "Get immediate feedback and see how you stack up against others"
    },
    {
      icon: <Clock className="w-8 h-8 text-purple-600" />,
      title: "Timed Challenges",
      description: "Test your speed and accuracy with time-based questions"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
      title: "Progress Tracking",
      description: "Monitor your improvement with detailed statistics and analytics"
    },
    {
      icon: <Star className="w-8 h-8 text-orange-600" />,
      title: "Multiple Categories",
      description: "Choose from aptitude, logical reasoning, quantitative, and more"
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Players" },
    { number: "50+", label: "Quiz Categories" },
    { number: "1M+", label: "Questions Answered" },
    { number: "99%", label: "Uptime" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Battle Your Way to the
              <span className="text-gradient block">Top of the Leaderboard</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join thousands of players in the ultimate multiplayer quiz experience. 
              Test your aptitude, compete in real-time, and climb the global rankings.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {currentUser ? (
                <>
                  <Link to="/dashboard" className="btn-primary text-lg px-8 py-3 flex items-center space-x-2">
                    <Play className="w-5 h-5" />
                    <span>Start Playing</span>
                  </Link>
                  <Link to="/join" className="btn-secondary text-lg px-8 py-3 flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>Join a Game</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn-primary text-lg px-8 py-3 flex items-center space-x-2">
                    <Play className="w-5 h-5" />
                    <span>Get Started Free</span>
                  </Link>
                  <Link to="/login" className="text-gray-700 hover:text-primary-600 text-lg font-medium flex items-center space-x-2">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose AptiBattle?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the next generation of online learning with our cutting-edge multiplayer quiz platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="card hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="mb-4 group-hover:scale-110 transition-transform duration-200">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get started in just three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Create or Join
              </h3>
              <p className="text-gray-600">
                Host your own quiz session or join an existing one with a simple code
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-secondary-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Compete Live
              </h3>
              <p className="text-gray-600">
                Answer questions in real-time and compete against other players
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-yellow-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Win & Learn
              </h3>
              <p className="text-gray-600">
                Climb the leaderboard, earn points, and improve your skills
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Start Your Quiz Battle?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of players and test your knowledge in the ultimate multiplayer experience
          </p>
          
          {currentUser ? (
            <Link 
              to="/dashboard" 
              className="inline-flex items-center space-x-2 bg-white text-primary-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Play className="w-5 h-5" />
              <span>Go to Dashboard</span>
            </Link>
          ) : (
            <Link 
              to="/login" 
              className="inline-flex items-center space-x-2 bg-white text-primary-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Users className="w-5 h-5" />
              <span>Join AptiBattle Today</span>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;