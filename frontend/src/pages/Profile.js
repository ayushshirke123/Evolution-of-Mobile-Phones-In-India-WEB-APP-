import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User } from 'lucide-react';

const Profile = () => {
  const { userProfile } = useAuth();

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <User className="w-16 h-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">User Profile</h1>
          <p className="text-gray-600 mb-8">
            Welcome, {userProfile?.displayName || 'Player'}!
          </p>
          <div className="card max-w-md mx-auto">
            <p className="text-gray-500">
              Profile management and detailed statistics will be implemented with user settings and game history.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;