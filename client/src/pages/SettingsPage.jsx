/**
 * PAGE: SettingsPage
 * FILE: src/pages/SettingsPage.jsx
 * * IMPORTS REQUIRED IF SPLIT:
 * import { useState } from 'react';
 * import Button from '../components/atoms/Button';
 */
import { useState } from "react";
import Button from "../components/atoms/Button";

const SettingsPage = ({ budget, setBudget, user }) => {
  const [val, setVal] = useState(budget);
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-black tracking-tight">
          Settings
        </h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="font-bold text-xl mb-4 border-b border-gray-100 pb-2">
            Time Budget
          </h3>
          <div className="flex gap-4 items-center">
            <input
              type="number"
              value={val}
              onChange={(e) => setVal(e.target.value)}
              className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none font-bold"
            />
            <span className="text-sm text-gray-500">hours</span>
          </div>
          <Button
            onClick={() => setBudget(parseFloat(val))}
            className="mt-4 text-sm"
          >
            Update Budget
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
