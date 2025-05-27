import React from 'react'; // Ensure React is imported for React.ReactElement

export enum BootPhase {
  STARTING,
  HARDWARE_INIT,
  OS_LOADING,
  DESKTOP_START,
  DONE,
}

export enum AppType {
  NOTEPAD = 'NOTEPAD',
  SETTINGS = 'SETTINGS',
  RECYCLE_BIN = 'RECYCLE_BIN',
  FOLDER = 'FOLDER',
  CALCULATOR = 'CALCULATOR',
  MINESWEEPER = 'MINESWEEPER', // Example Game
  CD_PLAYER = 'CD_PLAYER', // Example CD ROM
}

// For the portfolio sections within FolderApp
export type PortfolioAppSectionType = 'home' | 'about' | 'projects' | 'contact' | 'cv';

export interface WindowInstance {
  id: string;
  appType: AppType;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  isMinimized: boolean;
  isActive: boolean;
  isMaximized?: boolean; // Added for maximize/restore
  originalRect?: { x: number; y: number; width: number; height: number }; // Added for pre-maximize state
  icon?: React.ReactElement<React.SVGAttributes<SVGSVGElement>>;
  data?: any;
}

export interface DesktopIconItem {
  id: string;
  label: string;
  icon: React.ReactElement<React.SVGAttributes<SVGSVGElement>>;
  appType: AppType;
  defaultPosition: { x: number; y: number };
  data?: any;
}

type ContextMenuActionItem = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  isSeparator?: false | undefined;
};
type ContextMenuSeparatorItem = {
  isSeparator: true;
  label?: never;
  onClick?: never;
  disabled?: never;
  icon?: never;
};
export type ContextMenuItem = ContextMenuActionItem | ContextMenuSeparatorItem;


export interface ContextMenuState {
  visible: boolean;
  x: number;
  y: number;
  items: ContextMenuItem[];
}

export const Y2K_WALLPAPERS = [
  'https://picsum.photos/seed/bliss/1920/1080',
  'https://picsum.photos/seed/win2kblue/1920/1080',
  'https://picsum.photos/seed/space/1920/1080',
  '#008080',
  '#5A7EDC',
];

export type Wallpaper = string;

export enum ScreensaverType {
  NONE = 'NONE',
  STARFIELD = 'STARFIELD',
  PIPES = 'PIPES',
}

export interface PortfolioProject {
  id: string;
  title: string;
  imageUrl?: string;
  description: string;
  technologies: string[];
  liveLink?: string;
  repoLink?: string;
}