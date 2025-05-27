
import React from 'react';

interface GamePlaceholderAppProps {
  gameName: string;
}

const GamePlaceholderApp: React.FC<GamePlaceholderAppProps> = ({ gameName }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-800 text-white p-4">
      <h2 className="text-2xl font-bold mb-4">{gameName}</h2>
      <p className="mb-2">Classic Y2K Gaming Experience!</p>
      <div className="w-32 h-32 bg-black border-4 border-gray-500 y2k-sunken flex items-center justify-center mb-4">
        <p className="text-sm text-gray-400">(Game Area)</p>
      </div>
      <button className="y2k-button bg-green-500 hover:bg-green-600 text-white px-4 py-2">
        Start Game
      </button>
      <p className="text-xs mt-4 text-gray-400">Full game logic not implemented in this demo.</p>
    </div>
  );
};

export default GamePlaceholderApp;
