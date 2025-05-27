
import React from 'react';

interface ProgressBarProps {
  progress: number; // 0 to 100
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full h-6 bg-gray-700 border-2 border-gray-500 y2k-sunken p-0.5">
      <div
        className="h-full bg-blue-500 transition-all duration-500 ease-linear"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
