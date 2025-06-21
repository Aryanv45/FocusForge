# 🧠 FocusForge – The Productivity Pattern Profiler

**FocusForge** is a smart habit and task tracker that visualizes your productivity patterns to help you optimize your daily routine. Whether you're a student, developer, or remote worker, FocusForge empowers you to analyze focus sessions, track streaks, and build better habits — all within a beautiful, minimal dashboard.

---

## 🚀 Features

- ⏱️ Pomodoro Timer: Focus timer with start/stop/reset functionality and session tracking.
- 🔥 Daily Streak Tracker: Track consecutive focused days with visual indicators.
- 📊 Focus Analytics Dashboard: Charts your focus durations over time.
- 📅 Task Completion History *(coming soon)*: Visualize what tasks you completed and when.
- 🌙 Dark Mode: Tailored for late-night productivity.
- 💾 LocalStorage-Based Persistence: Works offline without backend.

---

## 🛠️ Tech Stack

- Frontend: React  
- Styling: TailwindCSS  
- UI Components: ShadCN UI, Lucide Icons  
- Charts: Recharts  
- State Management: React Hooks (useState, useEffect)  
- Persistence: LocalStorage  

---

## 📂 Folder Structure
```plaintext
focusforge/  
├── public/                         # Static assets and base HTML  
├── src/  
│   ├── components/  
│   │   └── Dashboard/  
│   │       ├── DashboardSummary.jsx       # Summary of focus stats  
│   │       ├── PomodoroTimer.jsx          # Timer component  
│   │       ├── StreakTracker.jsx          # Daily streaks component  
│   │       └── FocusChart.jsx             # Productivity graph  
│   ├── App.jsx                            # Main application entry  
│   └── index.js                           # React DOM entry point  
├── tailwind.config.js                    # Tailwind configuration  
├── postcss.config.js                     # PostCSS setup  
├── package.json                          # Dependencies and scripts  
└── README.md                             # Project documentation  
```
---

## 📥 Getting Started

To run FocusForge locally:

1. Clone the repository: `git clone https://github.com/your-username/focusforge.git`  
2. Navigate to the project directory: `cd focusforge`  
3. Install dependencies: `npm install`  
4. Start the development server: `npm run dev` or `npm start`  

Requires Node.js and npm installed on your system.

---
