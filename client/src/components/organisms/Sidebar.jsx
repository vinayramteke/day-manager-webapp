/**
 * COMPONENT: Sidebar
 * FILE: src/components/organisms/Sidebar.jsx
 * * IMPORTS REQUIRED IF SPLIT:
 * import { LogOut } from 'lucide-react';
 * import Button from '../atoms/Button';
 * import { APP_CONFIG, NAV_ITEMS } from '../../utils/constants';
 */

// import { LogOut } from "lucide-react";
import Button from "../atoms/Button";
import { APP_CONFIG, NAV_ITEMS } from "../../utils/constants";
import { LogOut, Wallet, ListTodo, BarChart2, Settings, X } from "lucide-react";

const Sidebar = ({
  activeView,
  setActiveView,
  onLogout,
  user,
  isOpen,
  onClose,
}) => {
  return (
    <>
      {/* Mobile Backdrop - Only visible when menu is open on small screens */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64
          bg-black text-white
          border-r border-gray-800
          z-50
          flex flex-col
          overflow-y-auto
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Header */}
        <div className="p-6 flex items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white text-black rounded-lg flex items-center justify-center font-bold text-xl">
              DM
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">
                {APP_CONFIG.name}
              </h1>
              <p className="text-xs text-gray-500">{APP_CONFIG.version}</p>
            </div>
          </div>

          {/* Close button (mobile only) */}
          <button
            onClick={onClose}
            className="md:hidden text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveView(item.id);
                onClose(); // Closes drawer on mobile after selection
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 border ${
                activeView === item.id
                  ? "bg-white text-black border-white font-bold shadow-sm"
                  : "text-gray-400 border-transparent hover:border-gray-800 hover:text-white"
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer / User Profile */}
        <div className="p-4 border-t border-gray-900">
          <div className="flex items-center gap-3 px-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-xs font-bold">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold truncate">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.email || "user@example.com"}
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            onClick={onLogout}
            className="w-full justify-start px-2 text-sm text-gray-400 hover:text-red-500 hover:bg-gray-900 transition-colors"
          >
            <LogOut size={16} className="mr-2" /> <span>Sign Out</span>
          </Button>
        </div>
      </aside>
    </>
  );
};
export default Sidebar;
