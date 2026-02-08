/**
 * PAGE: TaskPage
 * FILE: src/pages/TaskPage.jsx
 * import { useState } from 'react';
 * import Button from '../components/atoms/Button';
 * import TaskCard from '../components/molecules/TaskCard';
 */

import { useState } from "react";
import Button from "../components/atoms/Button";
import TaskCard from "../components/molecules/TaskCard";

const TaskPage = ({ tasks, actions }) => {
  const [form, setForm] = useState({ title: "", time: "", category: "work" });
  const p = tasks.filter((t) => t.status === "pending"),
    c = tasks.filter((t) => t.status === "completed");
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-extrabold text-black tracking-tight">
            Task Planner
          </h2>
          <p className="text-gray-500">Budget your time before you spend it.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (form.title && form.time) {
                actions.addTask({
                  title: form.title,
                  estimatedTime: parseFloat(form.time),
                  category: form.category,
                });
                setForm({ title: "", time: "", category: "work" });
              }
            }}
            className="bg-black text-white p-6 rounded-xl shadow-lg border border-gray-800"
          >
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">
              Add New Task
            </h3>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Task Name"
                className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              <input
                type="number"
                placeholder="Hrs"
                className="w-24 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
              />
              <Button type="submit" variant="secondary">
                ADD
              </Button>
            </div>
          </form>
          <div>
            <h3 className="font-bold text-xl mb-4">Up Next</h3>
            {p.map((t) => (
              <TaskCard
                key={t.id}
                task={t}
                onComplete={actions.updateTaskStatus}
                onDelete={actions.deleteTask}
              />
            ))}
          </div>
        </div>
        <div className="lg:col-span-1 bg-gray-50 p-6 rounded-xl border border-gray-200 h-fit">
          <h3 className="font-bold text-xl mb-4">Completed</h3>
          {c.map((t) => (
            <TaskCard
              key={t.id}
              task={t}
              onLogTime={actions.logTaskToWallet}
              onDelete={actions.deleteTask}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default TaskPage;
