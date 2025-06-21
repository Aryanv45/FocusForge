import React, { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = [
  '#6366F1', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
  '#3B82F6', '#EC4899', '#22C55E', '#EAB308', '#0EA5E9',
];

const FocusChart = () => {
  const [data, setData] = useState([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('focus_logs');
      if (!raw) return;

      const logs = JSON.parse(raw);
      if (!Array.isArray(logs)) return;

      const tagMap = {};

      logs.forEach(log => {
        const tag = log.tag?.trim() || 'Untitled';
        const duration = Number(log.duration);
        if (!isNaN(duration)) {
          tagMap[tag] = (tagMap[tag] || 0) + duration;
        }
      });

      const chartData = Object.entries(tagMap).map(([tag, seconds]) => ({
        name: tag,
        value: Math.floor(seconds / 60), // convert to minutes
      }));

      setData(chartData);
    } catch (error) {
      console.error("FocusChart error:", error);
      setHasError(true);
    }
  }, []);

  if (hasError) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-lg mt-6 max-w-md mx-auto">
        ⚠️ Something went wrong while loading your focus chart.
        <br />
        Try clearing your session history or reloading the page.
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-800 p-6 mt-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-4">📊 Focus Time by Tag</h3>
      {data.length === 0 ? (
        <p className="text-sm text-gray-500">No data to display.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              dataKey="value"
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, value }) => `${name}: ${value} min`}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default FocusChart;
