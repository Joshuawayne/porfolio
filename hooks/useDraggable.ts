import { useState, useCallback, useRef, RefObject, useEffect } from 'react';
import { TASKBAR_HEIGHT } from '../constants'; // Import taskbar height

interface DraggableOptions {
  initialX?: number;
  initialY?: number;
  bounds?: RefObject<HTMLElement> | 'parent' | {top?: number, left?: number, right?: number, bottom?: number};
  isDraggable?: boolean; // New: To enable/disable dragging
  onDragStart?: () => void;
  onDragEnd?: (position: { x: number; y: number }) => void; // New: Callback for drag end
}

const useDraggable = <T extends HTMLElement,>(
  options?: DraggableOptions
): [RefObject<T>, { x: number; y: number; isDragging: boolean }, (x: number, y: number) => void] => {
  const { initialX = 0, initialY = 0, bounds, isDraggable = true, onDragStart, onDragEnd } = options || {};
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<T>(null);
  const offset = useRef({ x: 0, y: 0 });

  const updatePosition = (x: number, y: number) => {
    setPosition({x, y});
  };

  const handleMouseDown = useCallback((e: MouseEvent) => {
    if (!isDraggable) return; // Respect isDraggable flag

    if (dragRef.current && (e.target === dragRef.current || dragRef.current.contains(e.target as Node))) {
      const targetTagName = (e.target as HTMLElement).tagName.toLowerCase();
      if (['input', 'button', 'textarea', 'select'].includes(targetTagName) && (e.target as HTMLElement) !== dragRef.current) {
         // If the dragRef itself is a button (like a title bar), allow dragging.
        // But if a button *inside* the dragRef is clicked, don't drag.
        // This check is a bit simplistic. Better to check if e.target has its own click handlers or is specifically meant to be interactive.
        if (!(e.target as HTMLElement).classList.contains('y2k-window-control-button')) { // Assuming control buttons have this class
             return;
        }
      }
      
      setIsDragging(true);
      onDragStart?.();
      offset.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      };
      e.preventDefault(); 
      e.stopPropagation();
    }
  }, [position.x, position.y, isDraggable, onDragStart]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !dragRef.current || !isDraggable) return;
    e.preventDefault();

    let newX = e.clientX - offset.current.x;
    let newY = e.clientY - offset.current.y;

    const elem = dragRef.current;
    const elemRect = elem.getBoundingClientRect(); // Current element dimensions

    let topBound = 0, leftBound = 0;
    let rightBound = window.innerWidth - elemRect.width;
    let bottomBound = window.innerHeight - elemRect.height - TASKBAR_HEIGHT;


    if (bounds) {
      if (bounds === 'parent' && elem.parentElement) {
        const parentRect = elem.parentElement.getBoundingClientRect();
        topBound = parentRect.top; // Relative to viewport, so fine
        leftBound = parentRect.left;
        rightBound = parentRect.right - elemRect.width;
        bottomBound = parentRect.bottom - elemRect.height;
      } else if (typeof bounds === 'object' && 'current' in bounds && bounds.current) {
        const boundsRect = bounds.current.getBoundingClientRect();
        topBound = boundsRect.top;
        leftBound = boundsRect.left;
        rightBound = boundsRect.right - elemRect.width;
        bottomBound = boundsRect.bottom - elemRect.height;
      } else if (typeof bounds === 'object' && !('current' in bounds)) {
        if (bounds.top !== undefined) topBound = bounds.top;
        if (bounds.left !== undefined) leftBound = bounds.left;
        if (bounds.right !== undefined) rightBound = bounds.right - elemRect.width;
        if (bounds.bottom !== undefined) bottomBound = bounds.bottom - elemRect.height;
      }
    }
    
    newX = Math.max(leftBound, Math.min(newX, rightBound));
    newY = Math.max(topBound, Math.min(newY, bottomBound));
    // Ensure y is not less than 0 (top of screen) and x is not less than 0 (left of screen)
    newX = Math.max(0, newX);
    newY = Math.max(0, newY);


    setPosition({ x: newX, y: newY });
  }, [isDragging, bounds, isDraggable]);

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
        setIsDragging(false);
        if (onDragEnd) {
            // position state might not be updated yet if setPosition is async
            // It's safer to calculate the final position directly here or ensure onDragEnd uses the latest.
            // For simplicity, we use the current 'position' state. If issues arise, recalculate from last mouse event.
            onDragEnd(position); 
        }
    }
  }, [isDragging, onDragEnd, position]);

  useEffect(() => {
    const currentDragRef = dragRef.current;
    if (!currentDragRef) return;

    currentDragRef.addEventListener('mousedown', handleMouseDown as EventListener);
    // These listeners should be on document to catch mouse events outside the dragRef
    document.addEventListener('mousemove', handleMouseMove as EventListener);
    document.addEventListener('mouseup', handleMouseUp as EventListener);

    return () => {
      currentDragRef.removeEventListener('mousedown', handleMouseDown as EventListener);
      document.removeEventListener('mousemove', handleMouseMove as EventListener);
      document.removeEventListener('mouseup', handleMouseUp as EventListener);
    };
  }, [handleMouseDown, handleMouseMove, handleMouseUp]);


  return [dragRef, { ...position, isDragging }, updatePosition];
};

export default useDraggable;