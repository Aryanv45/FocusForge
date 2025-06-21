import React, { useEffect, useState } from 'react';

const getDateKey = (timestamp) =>
  new Date(timestamp).toLocaleDateString('en-CA');

const DashboardSummary = () => {
  const [todayMinutes, setTodayMinutes] = useState(0);
  const [weekMinutes, setWeekMinutes] = useState(0);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const rawLogs = JSON.parse(localStorage.getItem('focus_logs') || '[]');
    const rawTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    const todayKey = getDateKey(new Date());
    const weekKeys = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      weekKeys.push(getDateKey(date));
    }

    let todaySum = 0;
    let weekSum = 0;
    let pomodoroSessions = 0;
    const streakDays = new Set();

    rawLogs.forEach(log => {
      const key = getDateKey(log.timestamp);
      const mins = Math.floor(log.duration / 60);
      if (key === todayKey) todaySum += mins;
      if (weekKeys.includes(key)) weekSum += mins;
      if (log.tag === 'Pomodoro') pomodoroSessions++;
      streakDays.add(key);
    });

    let streakCalc = 0;
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const key = getDateKey(date);
      if (streakDays.has(key)) {
        streakCalc++;
      } else {
        break;
      }
    }

    const doneTasks = rawTasks.filter(task => task.completed).length;

    setTodayMinutes(todaySum);
    setWeekMinutes(weekSum);
    setPomodoroCount(pomodoroSessions);
    setCompletedTasks(doneTasks);
    setStreak(streakCalc);
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6 max-w-4xl mx-auto text-center">
      <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow">
        <h4 className="text-sm text-gray-500">Today</h4>
        <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
          {todayMinutes} mins
        </p>
      </div>
      <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow">
        <h4 className="text-sm text-gray-500">This Week</h4>
        <p className="text-xl font-bold text-green-600 dark:text-green-400">
          {weekMinutes} mins
        </p>
      </div>
      <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow">
        <h4 className="text-sm text-gray-500">Pomodoros</h4>
        <p className="text-xl font-bold text-red-600 dark:text-red-400">
          {pomodoroCount}
        </p>
      </div>
      <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow">
        <h4 className="text-sm text-gray-500">Streak 🔥</h4>
        <p className="text-xl font-bold text-orange-500 dark:text-orange-300">
          {streak} days
        </p>
      </div>
    </div>
  );
};

export default DashboardSummary;
