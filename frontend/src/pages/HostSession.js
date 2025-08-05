import React from 'react';
import { Users } from 'lucide-react';

const HostSession = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Users className="w-16 h-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Host a Quiz Session</h1>
          <p className="text-gray-600 mb-8">
            This feature is coming soon! You'll be able to create and host quiz sessions here.
          </p>
          <div className="card max-w-md mx-auto">
            <p className="text-gray-500">
              Host Session functionality will be implemented as part of the backend API development.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostSession;