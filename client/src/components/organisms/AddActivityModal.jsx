/**
 * COMPONENT: AddActivityModal
 * FILE: src/components/organisms/AddActivityModal.jsx
 * import { useState } from 'react';
 * import {  X } from 'lucide-react';
 * import Button from '../atoms/Button';
 */

import { useState } from "react";
import { X } from "lucide-react";
import Button from "../atoms/Button";

const AddActivityModal = ({ isOpen, onClose, onAdd }) => {
  const [title, setTitle] = useState("");
  const [hours, setHours] = useState("");
  const [category, setCategory] = useState("work");
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-white/80 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-full max-w-md shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-black overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-black text-white">
          <h3 className="font-bold text-lg">Spend Time</h3>
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-white hover:text-white hover:bg-gray-800"
          >
            <X size={20} />
          </Button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (title && hours) {
              onAdd({ title, time: parseFloat(hours), type: category });
              setTitle("");
              setHours("");
              onClose();
            }
          }}
          className="p-6 space-y-4"
        >
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
              Activity Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black outline-none font-medium"
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                Duration
              </label>
              <input
                type="number"
                step="0.5"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black outline-none font-medium"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                Category
              </label>
              <select
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black outline-none font-medium"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {["work", "personal", "health", "wasted"].map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <Button type="submit" className="w-full py-4 mt-4">
            CONFIRM
          </Button>
        </form>
      </div>
    </div>
  );
};
export default AddActivityModal;
