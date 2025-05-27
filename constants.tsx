
import React from 'react';
import { AppType, DesktopIconItem } from './types';

// SVG Icons (simplified for brevity)
export const FolderIconSvg = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-yellow-500">
    <path d="M10 4H4c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h16c1.11 0 2-.9 2-2V8c0-1.1-.89-2-2-2h-8l-2-2z" />
  </svg>
);

export const FileIconSvg = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-gray-700">
    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
  </svg>
);

export const RecycleBinFullSvg = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-gray-600">
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12l1.41 1.41L13.41 14l2.12 2.12l-1.41 1.41L12 15.41l-2.12 2.12l-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/>
  </svg>
);

export const RecycleBinEmptySvg = (
   <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-gray-600">
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm13-15h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
  </svg>
);

export const SettingsIconSvg = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-blue-600">
    <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61.22l2 3.46c.13.22.07.49.12.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
  </svg>
);

export const CalculatorIconSvg = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-green-600">
    <path d="M7 2h10v4h-10zM6 8v13h12V8H6zm2 2h2v2H8zm3 0h2v2h-2zm3 0h2v2h-2zm-6 3h2v2H8zm3 0h2v2h-2zm3 0h2v2h-2zm-6 3h2v2H8zm3 0h2v2h-2zm3 0h2v2h-2z" />
  </svg>
);

export const MinesweeperIconSvg = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-red-600">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6zm2 4h2v-2h-2v2zm0-4h2V7h-2v6z"/>
    <circle cx="12" cy="12" r="3" fill="black"/>
  </svg>
);

export const CdPlayerIconSvg = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-purple-600">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8zm0 3c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z"/>
    <circle cx="12" cy="12" r="1.5" fill="white" />
  </svg>
);

export const MaximizeIconSvg = (
  <svg viewBox="0 0 10 10" fill="none" stroke="black" strokeWidth="1" className="w-2.5 h-2.5">
    <rect x="0.5" y="0.5" width="9" height="9" />
  </svg>
);

export const RestoreIconSvg = (
  <svg viewBox="0 0 10 10" fill="none" stroke="black" strokeWidth="1" className="w-2.5 h-2.5">
    <rect x="1.5" y="0.5" width="8" height="8" />
    <path d="M0.5 1.5 H8.5 V9.5" fill="silver" stroke="black"/>
    <rect x="0.5" y="1.5" width="8" height="8" fill="none"/>
  </svg>
);


export const INITIAL_DESKTOP_ICONS: DesktopIconItem[] = [
  { id: 'my-documents', label: 'My Documents', icon: FolderIconSvg, appType: AppType.FOLDER, defaultPosition: { x: 20, y: 20 }, data: { folderPath: '/My Documents' } },
  { id: 'recycle-bin', label: 'Recycle Bin', icon: RecycleBinEmptySvg, appType: AppType.RECYCLE_BIN, defaultPosition: { x: 20, y: 120 } },
  { id: 'settings-app', label: 'Control Panel', icon: SettingsIconSvg, appType: AppType.SETTINGS, defaultPosition: { x: 20, y: 220 } },
  { id: 'calculator-app', label: 'Calculator', icon: CalculatorIconSvg, appType: AppType.CALCULATOR, defaultPosition: { x: 20, y: 320 } },
  { id: 'minesweeper-app', label: 'Minesweeper', icon: MinesweeperIconSvg, appType: AppType.MINESWEEPER, defaultPosition: { x: 120, y: 20 } },
  { id: 'cdplayer-app', label: 'CD Player', icon: CdPlayerIconSvg, appType: AppType.CD_PLAYER, defaultPosition: { x: 120, y: 120 } },
];

export const Y2K_BLUE_TITLE_BAR = 'bg-gradient-to-r from-blue-700 to-blue-500';
export const Y2K_GRAY_BACKGROUND = 'bg-gray-300'; // Typically #C0C0C0

export const DEFAULT_WALLPAPER = '#008080'; // Classic Teal
export const IDLE_TIMEOUT = 30000; // 30 seconds for screensaver
export const TASKBAR_HEIGHT = 40; // Taskbar height in pixels

// Minimal mock file system
export const MOCK_FILE_SYSTEM = {
  '/': {
    'My Documents': {
      'resume.txt': 'This is my resume...',
      'projects': {
        'project1.txt': 'Details about project 1.'
      }
    },
    'Program Files': {}
  }
};