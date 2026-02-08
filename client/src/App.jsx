/* COMPONENT: App
 * FILE: src/App.jsx
 * * IMPORTS REQUIRED IF SPLIT:*/

import { useState, useMemo, useEffect, useRef, useCallback } from "react";

import useTimeWallet from "./utils/hooks/useTimeWallet";
import { APP_CONFIG, INITIAL_DATA } from "./utils/constants";
import Sidebar from "./components/organisms/Sidebar";
import AddActivityModal from "./components/organisms/AddActivityModal";
import DashboardPage from "./pages/DashboardPage";
import TaskPage from "./pages/TaskPage";
import AnalysisPage from "./pages/AnalysisPage";
import SettingsPage from "./pages/SettingsPage";
import AuthPage from "./pages/AuthPage";
import useCloudData from "./utils/hooks/useCloudData";

import {
  LayoutDashboard,
  ListTodo,
  BarChart2,
  Wallet,
  Clock,
  Plus,
  Trash2,
  Moon,
  Briefcase,
  Car,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  X,
  User,
  LogOut,
  Settings,
  Lock,
  Mail,
  Loader2,
  Coffee,
  Dumbbell,
  Gamepad2,
  Menu,
} from "lucide-react";

// const App = () => {
//   const [user, setUser] = useState(() => {
//     const s = localStorage.getItem("dm_user");
//     return s ? JSON.parse(s) : null;
//   });
//   const [token, setToken] = useState(() => localStorage.getItem("dm_token"));

//   useEffect(() => {
//     if (user && token) {
//       localStorage.setItem("dm_user", JSON.stringify(user));
//       localStorage.setItem("dm_token", token);
//     } else {
//       localStorage.removeItem("dm_user");
//       localStorage.removeItem("dm_token");
//     }
//   }, [user, token]);

//   const [data, setData, isLoadingData, dataError] = useCloudData(user, token);
//   const wallet = useTimeWallet(data, setData);
//   const [activeView, setActiveView] = useState("dashboard");
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   if (!user)
//     return (
//       <AuthPage
//         onLogin={(res) => {
//           setUser(res.user);
//           setToken(res.token);
//         }}
//       />
//     );

//   return (
//     <div className="min-h-screen bg-white font-sans text-black flex selection:bg-black selection:text-white">
//       <Sidebar
//         activeView={activeView}
//         setActiveView={setActiveView}
//         onLogout={() => {
//           setUser(null);
//           setToken(null);
//         }}
//         user={user}
//       />
//       <main className="flex-1 md:ml-64 relative bg-gray-50 min-h-screen">
//         <header className="md:hidden bg-white p-4 flex justify-between items-center sticky top-0 z-40 border-b border-gray-200">
//           <div className="font-bold text-xl text-black">{APP_CONFIG.name}</div>
//           <button className="p-2 text-gray-600">Menu</button>
//         </header>
//         <div className="p-6 max-w-6xl mx-auto">
//           {dataError && (
//             <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg border border-red-200 flex items-center gap-3">
//               <AlertCircle />{" "}
//               <div>
//                 <p className="font-bold">Backend Error</p>
//                 <p className="text-sm">{dataError}</p>
//               </div>
//             </div>
//           )}
//           {isLoadingData && activeView === "dashboard" ? (
//             <div className="flex h-64 items-center justify-center text-gray-400 gap-2">
//               <Loader2 className="animate-spin" /> Loading Cloud Data...
//             </div>
//           ) : (
//             <>
//               {activeView === "dashboard" && (
//                 <DashboardPage
//                   wallet={wallet}
//                   onOpenModal={() => setIsModalOpen(true)}
//                 />
//               )}
//               {activeView === "tasks" && (
//                 <TaskPage tasks={wallet.tasks} actions={wallet.actions} />
//               )}
//               {activeView === "stats" && <AnalysisPage stats={wallet.stats} />}
//               {activeView === "settings" && (
//                 <SettingsPage
//                   budget={wallet.budget}
//                   setBudget={wallet.actions.updateBudget}
//                   user={user}
//                 />
//               )}
//             </>
//           )}
//         </div>
//       </main>
//       <AddActivityModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onAdd={wallet.actions.addActivity}
//       />
//     </div>
//   );
// };
const App = () => {
  const [user, setUser] = useState(() => {
    const s = localStorage.getItem("dm_user");
    return s ? JSON.parse(s) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("dm_token"));

  // STATE: Mobile Menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogin = useCallback((response) => {
    setUser(response.user);
    setToken(response.token);
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("dm_user");
    localStorage.removeItem("dm_token");
  }, []);

  useEffect(() => {
    if (user && token) {
      localStorage.setItem("dm_user", JSON.stringify(user));
      localStorage.setItem("dm_token", token);
    }
  }, [user, token]);

  const [data, setData, isLoadingData, dataError] = useCloudData(
    user,
    token,
    handleLogout,
  );
  const wallet = useTimeWallet(data, setData);

  const [activeView, setActiveView] = useState("dashboard");
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!user) return <AuthPage onLogin={handleLogin} />;

  return (
    <div className="min-h-screen bg-white font-sans text-black flex selection:bg-black selection:text-white">
      {/* SIDEBAR with Mobile Logic */}
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        onLogout={handleLogout}
        user={user}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <main className="flex-1 md:ml-64  bg-gray-50 min-h-screen">
        {/* MOBILE HEADER with Menu Toggle */}
        <header className="md:hidden bg-white p-4 flex justify-between items-center sticky top-0 z-40 border-b border-gray-200">
          <div className="font-bold text-xl text-black">{APP_CONFIG.name}</div>
          <button
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </header>

        <div className="p-6 max-w-6xl mx-auto">
          {dataError && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg border border-red-200 flex items-center gap-3">
              <AlertCircle />{" "}
              <div>
                <p className="font-bold">Backend Error</p>
                <p className="text-sm">{dataError}</p>
              </div>
            </div>
          )}
          {isLoadingData && activeView === "dashboard" ? (
            <div className="flex h-64 items-center justify-center text-gray-400 gap-2">
              <Loader2 className="animate-spin" /> Loading Cloud Data...
            </div>
          ) : (
            <>
              {activeView === "dashboard" && (
                <DashboardPage
                  wallet={wallet}
                  onOpenModal={() => setIsModalOpen(true)}
                />
              )}
              {activeView === "tasks" && (
                <TaskPage tasks={wallet.tasks} actions={wallet.actions} />
              )}
              {activeView === "stats" && <AnalysisPage stats={wallet.stats} />}
              {activeView === "settings" && (
                <SettingsPage
                  budget={wallet.budget}
                  setBudget={wallet.actions.updateBudget}
                  user={user}
                />
              )}
            </>
          )}
        </div>
      </main>
      <AddActivityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={wallet.actions.addActivity}
      />
    </div>
  );
};

export default App;
