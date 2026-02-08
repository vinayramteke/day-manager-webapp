/**
 * PAGE: DashboardPage
 * FILE: src/pages/DashboardPage.jsx
 * * IMPORTS REQUIRED IF SPLIT:
 * import { Plus, Wallet } from 'lucide-react';
 * import Button from '../components/atoms/Button';
 * import TimeHero from '../components/molecules/TimeHero';
 * import ActivityCard from '../components/molecules/ActivityCard';
 */
import { Plus, Wallet } from "lucide-react";
import Button from "../components/atoms/Button";
import TimeHero from "../components/molecules/TimeHero";
import ActivityCard from "../components/molecules/ActivityCard";

const DashboardPage = ({ wallet, onOpenModal }) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-3xl font-extrabold text-black tracking-tight">
          Time Wallet
        </h2>
        <p className="text-gray-500">Manage your {wallet.budget} hours.</p>
      </div>
      <Button onClick={onOpenModal} className="hidden md:flex px-6 py-3">
        <Plus size={18} /> <span>SPEND TIME</span>
      </Button>
      <Button
        onClick={onOpenModal}
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-xl z-40"
      >
        <Plus size={24} />
      </Button>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <TimeHero
          balance={wallet.stats.balance}
          spent={wallet.stats.spentHours}
          progress={wallet.stats.progress}
          budget={wallet.budget}
        />
        <div>
          <h3 className="text-lg font-bold text-black mb-4 flex items-center gap-2 border-b-2 border-black pb-2 inline-flex">
            <Wallet size={20} className="text-black" /> Transaction History
          </h3>
          <div className="space-y-3">
            {wallet.activities.map((a) => (
              <ActivityCard
                key={a.id}
                item={a}
                onDelete={wallet.actions.deleteActivity}
              />
            ))}
            {wallet.activities.length === 0 && (
              <div className="p-8 text-center border-2 border-dashed border-gray-300 rounded-xl text-gray-400">
                <p>No time spent yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
          <h3 className="font-bold text-black mb-6 border-b-2 border-black pb-4 flex justify-between items-center">
            <span>Daily Receipt</span>
            <span className="text-xs bg-black text-white px-2 py-1 rounded">
              {new Date().toLocaleDateString()}
            </span>
          </h3>
          <div className="space-y-3 font-mono text-sm">
            {wallet.activities.map((a) => (
              <div key={a.id} className="flex justify-between text-gray-800">
                <span className="truncate max-w-[150px] font-medium">
                  {a.title}
                </span>
                <span>-{a.time.toFixed(2)}h</span>
              </div>
            ))}
            <div className="border-t-4 border-black my-4"></div>
            <div className="flex justify-between text-lg font-bold items-center">
              <span>NET BALANCE</span>
              <span className="bg-gray-100 px-2 py-1 rounded border border-gray-200">
                {wallet.stats.balance.toFixed(2)}h
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default DashboardPage;
