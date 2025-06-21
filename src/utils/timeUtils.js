export function getTimeRemaining(dueDate) {
  const total = new Date(dueDate) - new Date();
  if (total <= 0) return { expired: true };

  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / (1000 * 60)) % 60);

  return {
    expired: false,
    hours,
    minutes,
  };
}
