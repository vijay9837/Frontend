import React from "react";
import { motion } from "framer-motion";
import { HiUserGroup } from "react-icons/hi";

const Employes = () => {
  const employData = [
    { image: "", id: "324", name: "Vijay", role: "Sales" },
    { image: "", id: "325", name: "Amit", role: "Sales" },
    { image: "", id: "326", name: "Rahul", role: "Sales" },
    { image: "", id: "327", name: "Saurabh", role: "Sales" },
    { image: "", id: "328", name: "Priya", role: "HR" },
    { image: "", id: "329", name: "Akshay", role: "Development" },
    { image: "", id: "330", name: "Neha", role: "Marketing" },
    { image: "", id: "331", name: "Ravi", role: "Finance" },
    { image: "", id: "332", name: "Anjali", role: "Support" },
    { image: "", id: "333", name: "Karan", role: "Operations" },
    { image: "", id: "334", name: "Pooja", role: "Design" },
    { image: "", id: "335", name: "Vishal", role: "QA" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    hover: { x: 4, transition: { duration: 0.2 } },
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const avatarColors = [
    "bg-blue-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-red-500",
    "bg-indigo-500",
    "bg-cyan-500",
    "bg-orange-500",
    "bg-teal-500",
    "bg-rose-500",
    "bg-lime-500",
  ];

  return (
    <motion.div
      className="w-full h-full bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 flex flex-col gap-3 p-4 lg:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.h2
        className="text-lg lg:text-xl font-bold flex items-center justify-between p-3 rounded-xl bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <span>Team Members</span>
        <HiUserGroup className="text-2xl text-blue-500" />
      </motion.h2>

      <motion.div
        className="w-full h-full overflow-y-auto demo flex flex-col gap-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {employData && employData.length > 0 ? (
          employData.map((emp, idx) => (
            <motion.div
              key={emp.id}
              variants={itemVariants}
              whileHover="hover"
              className="flex justify-between items-center p-3 lg:p-4 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl hover:shadow-md dark:hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <div className="flex items-center gap-3 flex-1">
                <div
                  className={`${avatarColors[idx % avatarColors.length]} w-9 lg:w-10 h-9 lg:h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm border-2 border-white dark:border-slate-600`}
                >
                  {getInitials(emp.name)}
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold text-sm lg:text-base text-slate-900 dark:text-slate-100">
                    {emp.name}
                  </p>
                  <p className="text-xs lg:text-sm text-slate-500 dark:text-slate-400">
                    {emp.role}
                  </p>
                </div>
              </div>
              <motion.div
                className="w-2 h-2 rounded-full bg-green-500 group-hover:bg-blue-500 transition-colors"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          ))
        ) : (
          <p className="text-center text-slate-500 dark:text-slate-400 py-4">
            No Employees
          </p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Employes;