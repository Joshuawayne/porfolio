
import React from 'react';
import { ContextMenuState } from '../types';

interface ContextMenuProps {
  menuState: ContextMenuState;
  onClose: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ menuState, onClose }) => {
  if (!menuState.visible) {
    return null;
  }

  return (
    <div
      className="fixed y2k-raised shadow-lg text-sm z-[10000] py-1 min-w-[180px]"
      style={{
        top: menuState.y,
        left: menuState.x,
        backgroundColor: '#c0c0c0', // Standard Y2K gray
      }}
      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside menu
    >
      {menuState.items.map((item, index) => {
        if (item.isSeparator) {
          return <div key={`sep-${index}`} className="h-px bg-gray-500 my-1 mx-1" />;
        }
        return (
          <button
            key={item.label + index}
            onClick={() => {
              if (!item.disabled) {
                item.onClick();
                onClose();
              }
            }}
            disabled={item.disabled}
            className={`w-full text-left px-3 py-1 hover:bg-blue-600 hover:text-white ${
              item.disabled ? 'text-gray-500 cursor-default' : 'text-black'
            } flex items-center space-x-2`}
          >
            {item.icon && <span className="w-4 h-4">{item.icon}</span>}
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ContextMenu;
