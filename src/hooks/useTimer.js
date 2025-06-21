import { useEffect, useState, useRef } from 'react';
import { logSession } from '../utils/sessionLogger';

const useTimer = (initialSeconds = 1500) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            logSession({
              duration: initialSeconds,
              completed: true,
              tag: 'Untitled',
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const start = () => setIsRunning(true);

  const pause = () => setIsRunning(false);

  const reset = (tag = 'Untitled') => {
    clearInterval(intervalRef.current);

    if (secondsLeft !== initialSeconds) {
      const durationWorked = initialSeconds - secondsLeft;
      const wasCompleted = secondsLeft === 0;
      logSession({
        duration: durationWorked,
        completed: wasCompleted,
        tag: tag.trim() || 'Untitled',
      });
    }

    setSecondsLeft(initialSeconds);
    setIsRunning(false);
  };

  return {
    secondsLeft,
    isRunning,
    start,
    pause,
    reset,
  };
};

export default useTimer;
