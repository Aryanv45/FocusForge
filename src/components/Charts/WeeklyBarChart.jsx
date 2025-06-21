import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const getPastWeekDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    dates.push(d.toLocaleDateString('en-IN', { weekday: 'short' }));
  }
  return dates;
};

const WeeklyBarChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem('focus_logs');
    if (!raw) return;

    try {
      const logs = JSON.parse(raw);
      const weekDays = getPastWeekDates();
      const dayMap = {};

      weekDays.forEach(day => {
        dayMap[day] = 0;
      });

      logs.forEach(log => {
        const date = new Date(log.timestamp);
        const day = date.toLocaleDateString('en-IN', { weekday: 'short' });
        if (dayMap.hasOwnProperty(day)) {
          const mins = Math.floor(Number(log.duration) / 60);
          dayMap[day] += mins;
        }
      });

      const chartData = Object.entries(dayMap).map(([day, minutes]) => ({
        day,
        minutes,
      }));

      setData(chartData);
    } catch (err) {
      console.error("Weekly chart error:", err);
    }
  }, []);

  return (
    <div className="bg-white dark:bg-zinc-800 p-6 mt-6 rounded-lg shadow-lg max-w-xl mx-auto">
      <h3 className="text-lg font-semibold mb-4">📆 Focus Time This Week</h3>
      {data.length === 0 ? (
        <p className="text-sm text-gray-500">No weekly data found.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="minutes" fill="#3B82F6" name="Minutes Focused" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default WeeklyBarChart;
