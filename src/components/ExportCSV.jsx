import React from 'react';

const ExportCSV = () => {
  const handleExport = () => {
    const logs = JSON.parse(localStorage.getItem('focus_logs') || '[]');
    if (!Array.isArray(logs) || logs.length === 0) {
      alert('No data to export.');
      return;
    }

    const header = ['Tag', 'Duration (minutes)', 'Date'];
    const rows = logs.map(log => [
      `"${log.tag}"`,
      Math.floor(Number(log.duration) / 60),
      new Date(log.timestamp).toLocaleString()
    ]);

    const csvContent = [header, ...rows].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'focus_logs.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="text-right mt-2 max-w-md mx-auto">
      <button
        onClick={handleExport}
        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
      >
        ⬇️ Export Logs to CSV
      </button>
    </div>
  );
};

export default ExportCSV;
