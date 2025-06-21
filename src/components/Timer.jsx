import React, { useState } from 'react';
import useTimer from '../hooks/useTimer';

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

const Timer = () => {
  const [tag, setTag] = useState('');
  const { secondsLeft, isRunning, start, pause, reset } = useTimer(1500);

  return (
    <div className="bg-white dark:bg-zinc-800 border p-6 rounded-lg shadow-lg w-full max-w-md mx-auto text-center">
      <h2 className="text-xl font-semibold mb-4">⏳ Focus Timer</h2>
      <div className="text-5xl font-bold mb-4">{formatTime(secondsLeft)}</div>

      <input
        type="text"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        placeholder="Enter session tag (e.g., DSA)"
        className="mb-4 px-3 py-2 rounded border w-full dark:bg-zinc-900"
      />

      <div className="flex justify-center gap-4">
        {!isRunning ? (
          <button onClick={start} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Start
          </button>
        ) : (
          <button onClick={pause} className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500">
            Pause
          </button>
        )}
        <button onClick={() => reset(tag)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
