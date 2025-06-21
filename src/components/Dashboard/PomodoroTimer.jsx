import React, { useEffect, useState } from 'react';

const focusDuration = 25 * 60; // 25 min
const breakDuration = 5 * 60;  // 5 min

const PomodoroTimer = () => {
  const [secondsLeft, setSecondsLeft] = useState(focusDuration);
  const [mode, setMode] = useState('focus'); // focus | break
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev === 1) {
            handleSessionEnd();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleSessionEnd = () => {
    const audio = new Audio('/Janam janam maa-1.mp3'); // Put your sound file in public folder
    audio.play();

    if (mode === 'focus') {
      logFocusSession();
      setMode('break');
      setSecondsLeft(breakDuration);
    } else {
      setMode('focus');
      setSecondsLeft(focusDuration);
    }
  };

  const logFocusSession = () => {
    const logs = JSON.parse(localStorage.getItem('focus_logs') || '[]');
    logs.push({
      tag: 'Pomodoro',
      duration: focusDuration,
      timestamp: Date.now(),
    });
    localStorage.setItem('focus_logs', JSON.stringify(logs));
  };

  const toggleTimer = () => {
    setIsRunning(prev => !prev);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSecondsLeft(mode === 'focus' ? focusDuration : breakDuration);
  };

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const seconds = String(secondsLeft % 60).padStart(2, '0');

  return (
    <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md mt-6 max-w-md mx-auto text-center">
      <h2 className="text-2xl font-bold mb-2">
        {mode === 'focus' ? '🧠 Focus Time' : '☕ Break Time'}
      </h2>
      <div className="text-5xl font-mono mb-4">{minutes}:{seconds}</div>
      <div className="flex justify-center gap-4">
        <button
          onClick={toggleTimer}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={resetTimer}
          className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
