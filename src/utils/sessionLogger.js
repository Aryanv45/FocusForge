export const logSession = ({ duration, completed }) => {
  const logs = JSON.parse(localStorage.getItem('focus_logs') || '[]');

  const newLog = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    duration,
    completed,
  };

  logs.push(newLog);
  localStorage.setItem('focus_logs', JSON.stringify(logs));
};

export const getSessionLogs = () => {
  return JSON.parse(localStorage.getItem('focus_logs') || '[]');
};

export const clearSessionLogs = () => {
  localStorage.removeItem('focus_logs');
};
