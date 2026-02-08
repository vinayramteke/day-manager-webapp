/**
 * COMPONENT: TimeHero
 * FILE: src/components/molecules/TimeHero.jsx
 * import { Clock } from 'lucide-react';
 */
import { Clock } from "lucide-react";

const TimeHero = ({ balance, spent, progress, budget }) => {
  const formatTime = (d) => ({
    h: Math.floor(d),
    m: Math.round((d - Math.floor(d)) * 60),
  });
  const remaining = formatTime(Math.max(0, balance));
  return (
    <div className="bg-black text-white rounded-xl p-8 shadow-2xl mb-8 relative overflow-hidden border border-gray-800">
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <div className="flex items-center gap-2 text-gray-400 mb-2 uppercase tracking-wider text-xs font-semibold">
            <Clock size={14} /> <span>Time Remaining Today</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-7xl font-bold tracking-tight">
              {String(remaining.h).padStart(2, "0")}
            </span>
            <span className="text-2xl text-gray-500 font-medium mr-4">h</span>
            <span className="text-7xl font-bold tracking-tight">
              {String(remaining.m).padStart(2, "0")}
            </span>
            <span className="text-2xl text-gray-500 font-medium">m</span>
          </div>
          <p className="text-gray-400 mt-2 text-sm">
            Spent{" "}
            <span className="text-white font-bold">{spent.toFixed(1)}h</span> of{" "}
            {budget}h.
          </p>
        </div>
        <div className="w-full md:w-1/3 border border-gray-800 rounded-xl p-4">
          <div className="flex justify-between text-xs font-medium text-gray-400 mb-2">
            <span>Budget Usage</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-4 bg-gray-900 rounded-full overflow-hidden border border-gray-800">
            <div
              className={`h-full transition-all duration-1000 ease-out ${progress > 100 ? "bg-red-500" : "bg-white"}`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeHero;
