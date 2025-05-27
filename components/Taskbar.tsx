import React from 'react';
import { WindowInstance } from '../types';
import SystemTray from './SystemTray';
import { Y2K_GRAY_BACKGROUND } from '../constants';

interface TaskbarProps {
  windows: WindowInstance[];
  onTaskbarButtonClick: (id: string) => void;
  onStartButtonClick: () => void; // For a Start Menu
  isAutoHide?: boolean; // For future autohide feature
  activeWindowId?: string | null;
}

const Taskbar: React.FC<TaskbarProps> = ({ windows, onTaskbarButtonClick, onStartButtonClick, activeWindowId }) => {
  return (
    <div className={`fixed bottom-0 left-0 right-0 h-10 ${Y2K_GRAY_BACKGROUND} y2k-raised flex items-center justify-between px-1 z-[9000] select-none border-t-2 border-t-white`}>
      <div className="flex items-center space-x-1">
        <button
          onClick={onStartButtonClick}
          className="y2k-button font-bold text-sm px-3 py-1 flex items-center space-x-1 bg-green-600 text-white hover:bg-green-700"
        >
          {/* Windows logo like icon (simplified) */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 3a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V4a1 1 0 00-1-1H4zm0 8a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1v-4a1 1 0 00-1-1H4zm8-8a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V4a1 1 0 00-1-1h-4zm0 8a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1v-4a1 1 0 00-1-1h-4z" clipRule="evenodd" />
          </svg>
          <span>Start</span>
        </button>
        {/* Separator */}
        <div className="h-6 w-px bg-gray-500 border-l border-white"></div>

        {windows.map((win) => (
          <button
            key={win.id}
            onClick={() => onTaskbarButtonClick(win.id)}
            className={`y2k-button px-2 py-1 text-xs min-w-[100px] max-w-[150px] truncate text-left ${win.id === activeWindowId && !win.isMinimized ? 'y2k-sunken bg-gray-400' : ''} ${win.isMinimized ? 'font-semibold' : ''}`}
            title={win.title}
          >
            <div className="flex items-center space-x-1">
                {/* win.icon is React.ReactElement, clone it to apply new className */}
                {/* The original className in getAppIcon was "w-4 h-4", here we use "w-3 h-3" */}
                {win.icon && React.cloneElement(win.icon, {className: "w-3 h-3"})}
                <span>{win.title}</span>
            </div>
          </button>
        ))}
      </div>
      <SystemTray />
    </div>
  );
};

export default Taskbar;