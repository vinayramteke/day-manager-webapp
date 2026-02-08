/**
 * PAGE: AnalysisPage
 * FILE: src/pages/AnalysisPage.jsx
 * * IMPORTS REQUIRED IF SPLIT:
 * import { BarChart2 } from 'lucide-react';
 */

import { BarChart2 } from "lucide-react";

const AnalysisPage = ({ stats }) => {
  const SimpleBar = ({ l, v, m, c }) => (
    <div className="mb-4">
      <div className="flex justify-between text-sm font-bold mb-1">
        <span className="uppercase tracking-wider">{l}</span>
        <span>{v.toFixed(1)}h</span>
      </div>
      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${c}`}
          style={{ width: `${Math.min((v / m) * 100, 100)}%` }}
        />
      </div>
    </div>
  );
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-black tracking-tight">
          Analysis
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-black text-white p-6 rounded-xl shadow-lg">
          <h4 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">
            Efficiency
          </h4>
          <div className="text-5xl font-bold">
            {stats.productivityScore}
            <span className="text-xl">%</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            <BarChart2 size={20} /> Category Breakdown
          </h3>
          <SimpleBar l="Work" v={stats.categories.work} m={24} c="bg-black" />
          <SimpleBar
            l="Health"
            v={stats.categories.health}
            m={24}
            c="bg-gray-800"
          />
          <SimpleBar
            l="Personal"
            v={stats.categories.personal}
            m={24}
            c="bg-gray-600"
          />
          <SimpleBar
            l="Wasted"
            v={stats.categories.wasted}
            m={24}
            c="bg-red-500"
          />
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
