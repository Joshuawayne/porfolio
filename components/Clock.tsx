
import React, { useState, useEffect } from 'react';

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000); // Update every second

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div className="px-2 py-1 text-xs text-black select-none">
      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </div>
  );
};

export default Clock;
