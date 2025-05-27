
import React, { useRef, useEffect } from 'react';
import useDraggable from '../hooks/useDraggable';
import { WindowInstance } from '../types';
import { Y2K_BLUE_TITLE_BAR, Y2K_GRAY_BACKGROUND, TASKBAR_HEIGHT, MaximizeIconSvg, RestoreIconSvg } from '../constants';

interface WindowProps {
  window: WindowInstance;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onFocus: (id: string) => void;
  onToggleMaximize: (id: string) => void; // New prop
  onUpdatePosition: (id: string, x: number, y: number) => void; // New prop
  children: React.ReactNode;
}

const WindowComponent: React.FC<WindowProps> = ({ 
    window: win, 
    onClose, 
    onMinimize, 
    onFocus, 
    onToggleMaximize,
    onUpdatePosition,
    children 
}) => {
  const [titleBarRef, position, setPosition] = useDraggable<HTMLDivElement>({ 
    initialX: win.x, 
    initialY: win.y,
    isDraggable: !win.isMaximized, // Draggable only if not maximized
    onDragEnd: (newPos) => {
        if (!win.isMaximized) {
            onUpdatePosition(win.id, newPos.x, newPos.y);
        }
    },
    onDragStart: () => { // Ensure focus on drag start
        onFocus(win.id);
    }
  });
  const windowRef = useRef<HTMLDivElement>(null);
  
  // When window props (like x,y from App state) change, update draggable hook's internal position
  // Only if not maximized and not currently being dragged (to avoid conflicts)
  useEffect(() => {
    if (!win.isMaximized && !position.isDragging) {
      setPosition(win.x, win.y);
    }
  }, [win.x, win.y, win.isMaximized, setPosition, position.isDragging]);


  if (win.isMinimized) {
    return null;
  }
  
  const handleWindowFocus = (e: React.MouseEvent) => {
    // Prevent focus change if clicking on a control button itself.
    // Control buttons handle focus via onMouseDownCapture on title bar or their own onClick.
    if ((e.target as HTMLElement).closest('.y2k-window-control-button')) {
        return;
    }
    onFocus(win.id);
  };

  const windowStyles: React.CSSProperties = win.isMaximized ? {
    left: 0,
    top: 0,
    width: '100vw',
    height: `calc(100vh - ${TASKBAR_HEIGHT}px)`,
    zIndex: win.zIndex,
    display: 'flex',
    borderColor: win.isActive ? '#000080' : '#808080',
  } : {
    left: position.x,
    top: position.y,
    width: win.width,
    height: win.height,
    zIndex: win.zIndex,
    display: 'flex',
    borderColor: win.isActive ? '#000080' : '#808080',
  };


  return (
    <div
      ref={windowRef}
      className={`fixed ${Y2K_GRAY_BACKGROUND} y2k-raised shadow-2xl flex flex-col overflow-hidden`}
      style={windowStyles}
      onMouseDown={handleWindowFocus} 
    >
      <div
        ref={titleBarRef} 
        className={`h-7 ${Y2K_BLUE_TITLE_BAR} flex items-center justify-between px-2 ${!win.isMaximized ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'} select-none`}
        onMouseDownCapture={(e) => {
             // If clicking directly on title bar (not buttons), trigger focus
            if (e.target === titleBarRef.current) {
                onFocus(win.id);
            }
        }}
        onDoubleClick={() => { if (!win.isMaximized) onToggleMaximize(win.id);}} // Double click title bar to maximize (if not already)
      >
        <div className="flex items-center space-x-1">
            {win.icon && React.cloneElement(win.icon, {className: "w-4 h-4 text-white"})}
            <span className="text-white font-bold text-xs truncate max-w-[calc(100%-80px)]">{win.title}</span>
        </div>
        <div className="flex space-x-1">
          <button
            onClick={(e) => { e.stopPropagation(); onMinimize(win.id);}}
            className="y2k-button y2k-window-control-button w-5 h-5 flex items-center justify-center text-black font-black text-xs bg-gray-300 hover:bg-gray-400"
            aria-label="Minimize"
          >
            _
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onToggleMaximize(win.id); }}
            className="y2k-button y2k-window-control-button w-5 h-5 flex items-center justify-center text-black font-black text-xs bg-gray-300 hover:bg-gray-400"
            aria-label={win.isMaximized ? "Restore" : "Maximize"}
          >
            {win.isMaximized ? RestoreIconSvg : MaximizeIconSvg}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onClose(win.id); }}
            className="y2k-button y2k-window-control-button w-5 h-5 flex items-center justify-center text-black font-black text-xs bg-red-500 hover:bg-red-600"
            aria-label="Close"
          >
            X
          </button>
        </div>
      </div>
      <div className="flex-grow p-1 overflow-auto y2k-sunken bg-white">
        {children}
      </div>
      <div className="h-5 border-t border-gray-400 px-1 text-xs flex items-center y2k-raised">
        {/* Status text could go here */}
      </div>
    </div>
  );
};

export default WindowComponent;