import React, { useEffect, useState } from "react";
import { getTimeRemaining } from "../../utils/timeUtils";

const TaskList = ({ tasks, onToggle, onDelete }) => {
  const [tick, setTick] = useState(Date.now());

  // Trigger re-render every minute
  useEffect(() => {
    const interval = setInterval(() => setTick(Date.now()), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-6 space-y-4">
      {tasks.length === 0 ? (
        <p className="text-center text-sm text-gray-400 dark:text-gray-500 italic">
          No tasks to display.
        </p>
      ) : (
        tasks.map((task) => {
          const { expired, hours, minutes } = getTimeRemaining(task.dueDate);
          const isOverdue = expired && !task.completed;

          return (
            <div
              key={task.id}
              className={`flex justify-between items-start gap-4 p-4 rounded-xl border shadow-sm
              transition-colors 
              ${
                task.completed
                  ? "bg-green-50 dark:bg-green-800 text-gray-500"
                  : isOverdue
                  ? "bg-red-50 dark:bg-red-900 border-red-500"
                  : "bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700"
              }`}
            >
              <div className="flex-1 space-y-1">
                <p className="text-md font-semibold">{task.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Due: {new Date(task.dueDate).toLocaleString()}
                </p>

                {!task.completed && (
                  <p
                    className={`text-sm font-medium ${
                      expired ? "text-red-600 dark:text-red-400" : "text-blue-600"
                    }`}
                  >
                    {expired
                      ? "⏰ Overdue"
                      : `⏳ ${hours}h ${minutes}m left`}
                  </p>
                )}
              </div>

              <div className="flex-shrink-0 flex gap-2">
                <button
                  onClick={() => onToggle(task.id)}
                  className={`text-xs px-3 py-1 rounded font-medium ${
                    task.completed
                      ? "bg-yellow-400 hover:bg-yellow-500"
                      : "bg-green-500 hover:bg-green-600 text-white"
                  }`}
                >
                  {task.completed ? "Undo" : "Done"}
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  className="text-xs px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default TaskList;
