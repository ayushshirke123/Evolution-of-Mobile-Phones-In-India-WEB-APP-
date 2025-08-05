import React from 'react';
import { useParams } from 'react-router-dom';
import { Trophy } from 'lucide-react';

const Leaderboard = () => {
  const { sessionCode } = useParams();

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Trophy className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Leaderboard</h1>
          <p className="text-gray-600 mb-8">
            Session Code: <span className="font-mono font-bold">{sessionCode}</span>
          </p>
          <div className="card max-w-md mx-auto">
            <p className="text-gray-500">
              Live leaderboard functionality will be implemented with real-time updates and player rankings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;