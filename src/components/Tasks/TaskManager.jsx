import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { getTimeRemaining } from "../../utils/timeUtils";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  // Request permission on load
  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  // Notification checker
  useEffect(() => {
    const interval = setInterval(() => {
      if (Notification.permission !== "granted") return;

      setTasks((prev) =>
        prev.map((task) => {
          const { expired, hours, minutes } = getTimeRemaining(task.dueDate);
          const timeLeft = hours * 60 + minutes;

          if (
            !task.completed &&
            !task.notified &&
            !expired &&
            timeLeft <= 30
          ) {
            new Notification("⏰ Deadline Alert", {
              body: `${task.title} is due in ${timeLeft} minutes.`,
              icon: "/vite.svg",
            });

            return { ...task, notified: true };
          }

          return task;
        })
      );
    }, 60000); // check every minute

    return () => clearInterval(interval);
  }, [tasks]);

  const addTask = (task) => {
    const taskWithNotify = { ...task, notified: false };
    setTasks((prev) => [...prev, taskWithNotify]);
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              notified: false, // reset notification if undone
            }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "completed") return task.completed;
      if (filter === "pending") return !task.completed;
      return true;
    })
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  return (
    <div className="max-w-2xl mx-auto p-4 min-h-screen transition-colors duration-300 bg-white text-black dark:bg-zinc-900 dark:text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🧠 FocusForge</h1>
        <button className="text-sm border px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-800">
          🌙 Toggle Theme
        </button>
      </div>

      <TaskForm onAdd={addTask} />

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        {["all", "pending", "completed"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-1 rounded-full border text-sm font-medium transition 
              ${
                filter === type
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300"
              }`}
          >
            {type[0].toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <TaskList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
      />
    </div>
  );
};

export default TaskManager;
