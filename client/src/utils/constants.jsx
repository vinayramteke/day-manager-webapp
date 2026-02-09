import {
  Wallet,
  ListTodo,
  BarChart2,
  Settings,
  Moon,
  Briefcase,
} from "lucide-react";

// export const APP_CONFIG = {
//   name: "Day Manager",
//   version: "Mono v1.3",
//   defaultBudget: 24,
//   localStorageKeys: {
//     USER: "dm_user",
//     DATA: "dm_data",
//   },
// };

const isProduction = import.meta.env.PROD; // Automatically true on Vercel

export const APP_CONFIG = {
  name: "Day Manager",
  version: "Cloud v1.1",
  // apiUrl: "http://localhost:5000/api",
  // apiUrl: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  apiUrl: isProduction
    ? import.meta.env.VITE_API_URL // This comes from Vercel settings
    : "http://localhost:5000", // Your local backend
};

export const NAV_ITEMS = [
  { id: "dashboard", label: "Time Wallet", icon: <Wallet size={20} /> },
  { id: "tasks", label: "Task Planner", icon: <ListTodo size={20} /> },
  { id: "stats", label: "Analysis", icon: <BarChart2 size={20} /> },
  { id: "settings", label: "Settings", icon: <Settings size={20} /> },
];

export const INITIAL_DATA = {
  activities: [
    {
      id: 1,
      title: "Sleep (Essential)",
      time: 8,
      type: "fixed",
      icon: <Moon size={20} />,
    },
    {
      id: 2,
      title: "Office Work",
      time: 9,
      type: "work",
      icon: <Briefcase size={20} />,
    },
  ],
  tasks: [
    {
      id: 101,
      title: "Gym Session",
      estimatedTime: 1.5,
      category: "health",
      status: "pending",
    },
  ],
  budget: 24,
};
