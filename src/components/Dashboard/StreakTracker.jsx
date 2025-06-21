import React, { useEffect, useState } from 'react';

const getDateKey = (timestamp) =>
  new Date(timestamp).toLocaleDateString('en-CA'); // format: yyyy-mm-dd

const StreakTracker = () => {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  useEffect(() => {
    const raw = localStorage.getItem('focus_logs');
    if (!raw) return;

    try {
      const logs = JSON.parse(raw);
      const uniqueDays = new Set(logs.map(log => getDateKey(log.timestamp)));
      const sortedDays = Array.from(uniqueDays).sort();

      // Calculate streaks
      let current = 0;
      let longest = 0;
      let streak = 0;
      let prevDate = null;

      sortedDays.forEach(dateStr => {
        const date = new Date(dateStr);
        if (!prevDate) {
          streak = 1;
        } else {
          const diff = Math.round((date - prevDate) / (1000 * 60 * 60 * 24));
          if (diff === 1) {
            streak++;
          } else if (diff === 0) {
            // Same day, ignore
          } else {
            longest = Math.max(longest, streak);
            streak = 1;
          }
        }
        prevDate = date;
      });

      longest = Math.max(longest, streak);

      // Current streak logic
      const todayKey = getDateKey(new Date());
      const yesterdayKey = getDateKey(new Date(Date.now() - 86400000));
      if (uniqueDays.has(todayKey)) {
        current = streak;
      } else if (uniqueDays.has(yesterdayKey)) {
        current = streak - 1;
      }

      setCurrentStreak(current);
      setLongestStreak(longest);
    } catch (error) {
      console.error("Streak calculation error:", error);
    }
  }, []);

  return (
    <div className="bg-white dark:bg-zinc-800 p-4 mt-6 rounded-lg shadow-md max-w-md mx-auto text-center">
      <h3 className="text-lg font-bold mb-2">🔥 Focus Streak</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Current Streak: <span className="font-semibold text-blue-600 dark:text-blue-400">{currentStreak} day(s)</span>
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Longest Streak: <span className="font-semibold text-green-600 dark:text-green-400">{longestStreak} day(s)</span>
      </p>
    </div>
  );
};

export default StreakTracker;
