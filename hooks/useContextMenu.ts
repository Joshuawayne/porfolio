
import { useState, useCallback, useEffect } from 'react';
import { ContextMenuItem, ContextMenuState } from '../types';

const useContextMenu = (): [ContextMenuState, (event: React.MouseEvent, items: ContextMenuItem[]) => void, () => void] => {
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({
    visible: false,
    x: 0,
    y: 0,
    items: [],
  });

  const showContextMenu = useCallback((event: React.MouseEvent, items: ContextMenuItem[]) => {
    event.preventDefault();
    event.stopPropagation();
    
    // Adjust position if too close to edge of screen
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const menuWidth = 200; // Approximate width of context menu
    const menuHeight = items.length * 30; // Approximate height

    let x = event.clientX;
    let y = event.clientY;

    if (x + menuWidth > screenWidth) {
      x = screenWidth - menuWidth - 10;
    }
    if (y + menuHeight > screenHeight) {
      y = screenHeight - menuHeight - 10;
    }
    
    setContextMenu({
      visible: true,
      x,
      y,
      items,
    });
  }, []);

  const hideContextMenu = useCallback(() => {
    if (contextMenu.visible) {
      setContextMenu((prev) => ({ ...prev, visible: false }));
    }
  }, [contextMenu.visible]);

  useEffect(() => {
    const handleClickOutside = () => {
      hideContextMenu();
    };
    
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        hideContextMenu();
      }
    };

    if (contextMenu.visible) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [contextMenu.visible, hideContextMenu]);

  return [contextMenu, showContextMenu, hideContextMenu];
};

export default useContextMenu;
