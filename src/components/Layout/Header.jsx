// src/components/Layout/Header.jsx
import React from "react";

const Header = ({ darkMode, setDarkMode }) => (
  <header className="bg-white dark:bg-zinc-800 shadow-sm px-6 py-4 flex justify-between items-center">
    <h1 className="text-2xl font-bold tracking-tight">🧠 FocusForge</h1>
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="px-3 py-1 rounded border text-sm hover:bg-gray-100 dark:hover:bg-zinc-700"
    >
      {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  </header>
);

export default Header;
