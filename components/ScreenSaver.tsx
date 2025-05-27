
import React, { useEffect, useRef, useState } from 'react';
import { ScreensaverType } from '../types';

interface ScreenSaverProps {
  active: boolean;
  type: ScreensaverType;
  onExit: () => void;
}

// Star component for Starfield
const Star: React.FC<{ x: number; y: number; speed: number; size: number }> = ({ x, y, speed, size }) => {
  const [currentY, setCurrentY] = useState(y);

  useEffect(() => {
    if (speed === 0) return; // Static stars if speed is 0
    const interval = setInterval(() => {
      setCurrentY(prevY => {
        const newY = prevY + speed;
        return newY > window.innerHeight ? Math.random() * 50 : newY; // Reset star if it goes off screen
      });
    }, 50); // Adjust for smoother/faster animation
    return () => clearInterval(interval);
  }, [speed]);

  return (
    <div
      className="absolute rounded-full bg-white"
      style={{
        left: `${x}px`,
        top: `${currentY}px`,
        width: `${size}px`,
        height: `${size}px`,
        opacity: Math.random() * 0.5 + 0.5, // Random opacity
      }}
    />
  );
};


const ScreenSaver: React.FC<ScreenSaverProps> = ({ active, type, onExit }) => {
  const [stars, setStars] = useState<{ id: number; x: number; y: number; speed: number; size: number }[]>([]);

  useEffect(() => {
    if (active && type === ScreensaverType.STARFIELD) {
      const numStars = 100;
      const newStars = Array.from({ length: numStars }).map((_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        speed: Math.random() * 2 + 0.5, // Random speed
        size: Math.random() * 2 + 1,    // Random size
      }));
      setStars(newStars);
    } else {
      setStars([]);
    }
  }, [active, type]);


  useEffect(() => {
    if (!active) return;

    const handleActivity = () => {
      onExit();
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('mousedown', handleActivity);

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('mousedown', handleActivity);
    };
  }, [active, onExit]);

  if (!active || type === ScreensaverType.NONE) {
    return null;
  }

  let content = null;
  if (type === ScreensaverType.STARFIELD) {
    content = (
      <>
        {stars.map(star => <Star key={star.id} {...star} />)}
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl text-gray-300 animate-pulse">
            Y2K Portfolio OS
        </p>
      </>
    );
  } else if (type === ScreensaverType.PIPES) {
    // Placeholder for Pipes screensaver
    content = <p className="text-4xl text-green-400">3D Pipes (Coming Soon!)</p>;
  }


  return (
    <div
      className="fixed inset-0 z-[20000] bg-black flex items-center justify-center cursor-none"
      onClick={onExit} // also exit on click
    >
      {content}
    </div>
  );
};

export default ScreenSaver;
