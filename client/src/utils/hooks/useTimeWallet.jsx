// /**
//  * HOOK: useTimeWallet
//  * FILE: src/utils/hooks/useTimeWallet.js
//  * * IMPORTS REQUIRED IF SPLIT:
//  * import { useMemo } from 'react';
//  * import { CheckCircle2 } from 'lucide-react';
//  */
import { useMemo } from "react";
import { CheckCircle2 } from "lucide-react";

// const useTimeWallet = (data, setData) => {
//   // Actions
//   const addActivity = (newActivity) => {
//     setData((prev) => ({
//       ...prev,
//       activities: [...prev.activities, { ...newActivity, id: Date.now() }],
//     }));
//   };

//   const deleteActivity = (id) => {
//     setData((prev) => ({
//       ...prev,
//       activities: prev.activities.filter((a) => a.id !== id),
//     }));
//   };

//   const addTask = (newTask) => {
//     setData((prev) => ({
//       ...prev,
//       tasks: [...prev.tasks, { ...newTask, id: Date.now(), status: "pending" }],
//     }));
//   };

//   const updateTaskStatus = (id, status) => {
//     setData((prev) => ({
//       ...prev,
//       tasks: prev.tasks.map((t) => (t.id === id ? { ...t, status } : t)),
//     }));
//   };

//   const deleteTask = (id) => {
//     setData((prev) => ({
//       ...prev,
//       tasks: prev.tasks.filter((t) => t.id !== id),
//     }));
//   };

//   const logTaskToWallet = (task) => {
//     // 1. Add to wallet
//     addActivity({
//       title: task.title,
//       time: task.estimatedTime,
//       type: task.category,
//       icon: <CheckCircle2 size={20} />,
//     });
//     // 2. Mark task as logged
//     setData((prev) => ({
//       ...prev,
//       tasks: prev.tasks.map((t) =>
//         t.id === task.id ? { ...t, logged: true } : t,
//       ),
//     }));
//   };

//   const updateBudget = (newBudget) => {
//     setData((prev) => ({ ...prev, budget: newBudget }));
//   };

//   // Calculations
//   const stats = useMemo(() => {
//     const spentHours = data.activities.reduce(
//       (acc, curr) => acc + curr.time,
//       0,
//     );
//     const balance = data.budget - spentHours;
//     const progress = (spentHours / data.budget) * 100;

//     // Category Breakdown
//     const categories = {
//       work: 0,
//       personal: 0,
//       health: 0,
//       wasted: 0,
//       fixed: 0,
//       commute: 0,
//     };
//     data.activities.forEach((a) => {
//       const key = a.type.toLowerCase();
//       if (categories[key] !== undefined) categories[key] += a.time;
//       else categories.personal += a.time;
//     });

//     const totalTracked = Object.values(categories).reduce((a, b) => a + b, 0);
//     const productivityScore =
//       totalTracked > 0
//         ? Math.round(
//             ((categories.work + categories.health) / totalTracked) * 100,
//           )
//         : 0;

//     return {
//       spentHours,
//       balance,
//       progress,
//       categories,
//       productivityScore,
//       totalTracked,
//     };
//   }, [data]);

//   return {
//     ...data,
//     stats,
//     actions: {
//       addActivity,
//       deleteActivity,
//       addTask,
//       updateTaskStatus,
//       deleteTask,
//       logTaskToWallet,
//       updateBudget,
//     },
//   };
// };

const useTimeWallet = (data, setData) => {
  const addActivity = (newActivity) => {
    // FIX: Ensure we only store primitive data, NO JSX
    const cleanActivity = {
      id: Date.now(),
      title: newActivity.title,
      time: newActivity.time,
      type: newActivity.type, // Store string only (e.g., 'work')
    };
    setData((prev) => ({
      ...prev,
      activities: [...prev.activities, cleanActivity],
    }));
  };

  const deleteActivity = (id) => {
    setData((prev) => ({
      ...prev,
      activities: prev.activities.filter((a) => a.id !== id),
    }));
  };

  const addTask = (newTask) => {
    const cleanTask = {
      id: Date.now(),
      title: newTask.title,
      estimatedTime: newTask.estimatedTime,
      category: newTask.category,
      status: "pending",
    };
    setData((prev) => ({ ...prev, tasks: [...prev.tasks, cleanTask] }));
  };

  const updateTaskStatus = (id, status) => {
    setData((prev) => ({
      ...prev,
      tasks: prev.tasks.map((t) => (t.id === id ? { ...t, status } : t)),
    }));
  };

  const deleteTask = (id) => {
    setData((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((t) => t.id !== id),
    }));
  };

  const logTaskToWallet = (task) => {
    // Pass string 'task_logged' or keep original category
    addActivity({
      title: task.title,
      time: task.estimatedTime,
      type: task.category,
    });
    setData((prev) => ({
      ...prev,
      tasks: prev.tasks.map((t) =>
        t.id === task.id ? { ...t, logged: true } : t,
      ),
    }));
  };

  const updateBudget = (newBudget) => {
    setData((prev) => ({ ...prev, budget: newBudget }));
  };

  const stats = useMemo(() => {
    const acts = data.activities || [];
    const spentHours = acts.reduce((acc, curr) => acc + curr.time, 0);
    const balance = (data.budget || 24) - spentHours;
    const progress = (spentHours / (data.budget || 24)) * 100;

    const categories = {
      work: 0,
      personal: 0,
      health: 0,
      wasted: 0,
      fixed: 0,
      commute: 0,
    };
    acts.forEach((a) => {
      const key = a.type ? a.type.toLowerCase() : "personal";
      if (categories[key] !== undefined) categories[key] += a.time;
      else categories.personal += a.time;
    });
    const totalTracked = Object.values(categories).reduce((a, b) => a + b, 0);
    const productivityScore =
      totalTracked > 0
        ? Math.round(
            ((categories.work + categories.health) / totalTracked) * 100,
          )
        : 0;
    return {
      spentHours,
      balance,
      progress,
      categories,
      productivityScore,
      totalTracked,
    };
  }, [data]);

  return {
    ...data,
    stats,
    actions: {
      addActivity,
      deleteActivity,
      addTask,
      updateTaskStatus,
      deleteTask,
      logTaskToWallet,
      updateBudget,
    },
  };
};

export default useTimeWallet;
