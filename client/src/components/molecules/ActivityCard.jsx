/**
 * COMPONENT: ActivityCard
 * FILE: src/components/molecules/ActivityCard.jsx
 * import Button from '../atoms/Button';
 */
import {
  Trash2,
  Moon,
  Briefcase,
  Car,
  CheckCircle2,
  Coffee,
  Dumbbell,
  Gamepad2,
} from "lucide-react";

import Button from "../atoms/Button";
const getCategoryIcon = (type) => {
  const t = type ? type.toLowerCase() : "personal";
  switch (t) {
    case "work":
      return <Briefcase size={20} />;
    case "health":
      return <Dumbbell size={20} />;
    case "commute":
      return <Car size={20} />;
    case "wasted":
      return <Gamepad2 size={20} />;
    case "fixed":
      return <Moon size={20} />;
    case "task_logged":
      return <CheckCircle2 size={20} />;
    default:
      return <Coffee size={20} />; // 'personal' or default
  }
};

const ActivityCard = ({ item, onDelete }) => (
  <div className="group bg-white rounded-xl p-4 border border-gray-200 hover:border-black transition-all flex justify-between items-center shadow-sm">
    <div className="flex items-center gap-4">
      {/* Used helper to get icon instead of item.icon */}
      <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl bg-black text-white">
        {getCategoryIcon(item.type)}
      </div>
      <div>
        <h3 className="font-bold text-black text-lg">{item.title}</h3>
        <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
          {item.type} Cost
        </p>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <span className="font-mono font-bold text-black bg-gray-100 px-3 py-1 rounded-md text-sm border border-gray-200">
        -{item.time}h
      </span>
      <Button variant="ghost" onClick={() => onDelete(item.id)}>
        <Trash2 size={18} />
      </Button>
    </div>
  </div>
);

export default ActivityCard;
