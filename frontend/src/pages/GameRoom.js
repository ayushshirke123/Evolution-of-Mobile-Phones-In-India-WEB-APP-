import React from 'react';
import { useParams } from 'react-router-dom';
import { GamepadIcon } from 'lucide-react';

const GameRoom = () => {
  const { sessionCode } = useParams();

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <GamepadIcon className="w-16 h-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Game Room</h1>
          <p className="text-gray-600 mb-8">
            Session Code: <span className="font-mono font-bold">{sessionCode}</span>
          </p>
          <div className="card max-w-md mx-auto">
            <p className="text-gray-500">
              Game Room functionality with real-time quiz gameplay will be implemented with WebSocket integration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameRoom;