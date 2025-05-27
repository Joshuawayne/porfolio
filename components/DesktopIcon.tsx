import React from 'react';
import { DesktopIconItem } from '../types';

interface DesktopIconProps {
  iconData: DesktopIconItem;
  onDoubleClick: (iconData: DesktopIconItem) => void;
  onContextMenu: (event: React.MouseEvent, iconData: DesktopIconItem) => void;
  isSelected?: boolean; // For future selection styling
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ iconData, onDoubleClick, onContextMenu, isSelected }) => {
  return (
    <button // Using button for accessibility and focus, but styled as icon
      className={`desktop-icon-button-wrapper flex flex-col items-center w-24 h-24 p-2 m-1 text-center hover:bg-blue-500 hover:bg-opacity-30 focus:bg-blue-500 focus:bg-opacity-50 focus:outline-dotted focus:outline-1 focus:outline-white rounded-sm ${isSelected ? 'bg-blue-500 bg-opacity-50' : ''}`}
      onDoubleClick={() => onDoubleClick(iconData)}
      onContextMenu={(e) => onContextMenu(e, iconData)}
      style={{
        position: 'absolute',
        left: `${iconData.defaultPosition.x}px`,
        top: `${iconData.defaultPosition.y}px`,
      }}
      aria-label={iconData.label}
    >
      <div className="w-10 h-10 mb-1 flex items-center justify-center">{iconData.icon}</div>
      <span className={`text-xs text-white ${isSelected ? 'bg-blue-700 px-1' : ''} select-none`}>{iconData.label}</span>
    </button>
  );
};

export default DesktopIcon;