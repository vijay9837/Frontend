import React from "react";
import { RiProfileFill } from "react-icons/ri";
import { NavLink, Outlet } from "react-router-dom";
import { MdOutlineSecurity } from "react-icons/md";
import { IoIosPricetags } from "react-icons/io";
import { motion } from "framer-motion";

const Settings = () => {
  const tabs = [
    { to: "profile", icon: RiProfileFill, label: "Profile" },
    { to: "security", icon: MdOutlineSecurity, label: "Security" },
    { to: "plans", icon: IoIosPricetags, label: "Plans & Pricing" },
  ];

  const tabVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.1, duration: 0.3 },
    }),
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      className="w-full h-full lg:p-6 p-3 flex flex-col gap-4 lg:gap-6 dark:bg-gray-900 bg-slate-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="flex flex-col sm:flex-row gap-2 lg:gap-3 flex-wrap"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {tabs.map((tab, idx) => {
          const Icon = tab.icon;
          return (
            <motion.div
              key={idx}
              custom={idx}
              variants={tabVariants}
              initial="hidden"
              animate="visible"
            >
              <NavLink
                to={tab.to}
                end
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-2 px-4 lg:px-6 py-2 lg:py-3 rounded-lg lg:rounded-xl text-sm lg:text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg hover:shadow-xl transition-all transform"
                    : "flex items-center gap-2 px-4 lg:px-6 py-2 lg:py-3 rounded-lg lg:rounded-xl text-sm lg:text-base font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all hover:shadow-md"
                }
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="text-lg lg:text-xl" />
                </motion.div>
                {tab.label}
              </NavLink>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.main
        className="bg-white dark:bg-slate-800 lg:rounded-2xl rounded-xl shadow-md border border-slate-200 dark:border-slate-700 overflow-hidden"
        variants={contentVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="overflow-y-auto demo w-full p-4 lg:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </div>
      </motion.main>
    </motion.div>
  );
};

export default Settings;