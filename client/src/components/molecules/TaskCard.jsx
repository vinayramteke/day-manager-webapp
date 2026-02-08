/**
 * COMPONENT: TaskCard
 * FILE: src/components/molecules/TaskCard.jsx
 * import { CheckCircle2, Trash2, ArrowRight } from 'lucide-react';
 * import Button from '../atoms/Button';
 */

import { CheckCircle2, Trash2, ArrowRight } from "lucide-react";
import Button from "../atoms/Button";

const TaskCard = ({ task, onComplete, onLogTime, onDelete }) => (
  <div
    className={`p-4 rounded-xl border mb-3 transition-all ${task.status === "completed" ? "bg-gray-50 border-gray-200 opacity-80" : "bg-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"}`}
  >
    <div className="flex justify-between items-start mb-2">
      <h4
        className={`font-bold text-lg ${task.status === "completed" ? "line-through text-gray-500" : "text-black"}`}
      >
        {task.title}
      </h4>
      <div className="flex gap-1">
        {task.status === "pending" && (
          <Button
            variant="ghost"
            onClick={() => onComplete(task.id, "completed")}
            className="text-gray-400 hover:text-green-600"
          >
            <CheckCircle2 size={20} />
          </Button>
        )}
        <Button
          variant="ghost"
          onClick={() => onDelete(task.id)}
          className="text-gray-400 hover:text-red-500"
        >
          <Trash2 size={18} />
        </Button>
      </div>
    </div>
    <div className="flex justify-between items-center mt-3">
      <span className="text-xs uppercase font-bold tracking-wider text-gray-500">
        {task.category}
      </span>
      <div className="flex items-center gap-2">
        <span className="text-sm font-mono font-medium bg-gray-100 px-2 py-1 rounded">
          Est: {task.estimatedTime}h
        </span>
        {task.status === "completed" && !task.logged && (
          <Button
            variant="primary"
            onClick={() => onLogTime(task)}
            className="px-3 py-1.5 text-xs"
          >
            LOG TO WALLET <ArrowRight size={12} />
          </Button>
        )}
        {task.logged && (
          <span className="text-xs font-bold text-green-600 flex items-center gap-1">
            <CheckCircle2 size={12} /> LOGGED
          </span>
        )}
      </div>
    </div>
  </div>
);
export default TaskCard;
