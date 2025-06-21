import React, { useEffect, useState } from 'react';

const formatTime = (sec) => {
  const m = Math.floor(sec / 60).toString().padStart(2, '0');
  const s = (sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

const SessionHistory = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem('focus_logs');
    if (data) {
      setLogs(JSON.parse(data).reverse()); // newest first
    }
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('focus_logs');
    setLogs([]);
  };

  return (
    <div className="bg-white dark:bg-zinc-800 p-4 mt-6 rounded-lg shadow-lg max-w-md mx-auto">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">📜 Session History</h3>
        {logs.length > 0 && (
          <button onClick={clearHistory} className="text-sm bg-red-500 text-white px-2 py-1 rounded">
            Clear All
          </button>
        )}
      </div>

      {logs.length === 0 ? (
        <p className="text-sm text-gray-500">No sessions logged yet.</p>
      ) : (
        <ul className="divide-y divide-gray-300 dark:divide-gray-700 text-left">
          {logs.map((log, index) => (
            <li key={index} className="py-2">
              <p className="text-sm">
                <strong className="text-blue-600">{log.tag}</strong> — {formatTime(log.duration)} minutes
              </p>
              <p className="text-xs text-gray-500">
                {new Date(log.timestamp).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SessionHistory;
