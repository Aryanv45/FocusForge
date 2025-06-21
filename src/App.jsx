import React, { useEffect, useState } from "react";
import DashboardSummary from "./components/Dashboard/DashboardSummary";
import PomodoroTimer from "./components/Dashboard/PomodoroTimer";
import StreakTracker from "./components/Dashboard/StreakTracker";
import FocusChart from "./components/Charts/FocusChart";
import WeeklyBarChart from "./components/Charts/WeeklyBarChart";
import TaskManager from "./components/Tasks/TaskManager";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-white transition-colors duration-300">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="flex-grow p-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="space-y-4">
          <DashboardSummary />
          <PomodoroTimer />
          <StreakTracker />
        </section>

        <section className="space-y-4">
          <TaskManager />
          <FocusChart />
          <WeeklyBarChart />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;
