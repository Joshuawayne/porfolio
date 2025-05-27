import { useState, useEffect, useCallback, useRef } from 'react';

const useIdleTimer = (timeout: number, onIdle: () => void): { isIdle: boolean; reset: () => void } => {
  const [isIdle, setIsIdle] = useState(false);
  const timerRef = useRef<number | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsIdle(false);
    timerRef.current = window.setTimeout(() => {
      setIsIdle(true);
      onIdle();
    }, timeout);
  }, [timeout, onIdle]);

  useEffect(() => {
    const events = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart'];

    const handleActivity = () => {
      resetTimer();
    };

    resetTimer(); // Start timer on mount

    events.forEach(event => window.addEventListener(event, handleActivity));

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      events.forEach(event => window.removeEventListener(event, handleActivity));
    };
  }, [resetTimer]);

  return { isIdle, reset: resetTimer };
};

export default useIdleTimer;