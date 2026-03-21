import React from "react";
import { motion } from "framer-motion";
import AnimatedCounter from "../../Components/AnimatedCounter";
import PaymentBarChart from "../../Components/Dashboard/Charts/PaymentBarChart";
import OrganisationPerformanceChart from "../../Components/Dashboard/Charts/OrganisationPerformanceChart";
import Employes from "../../Components/Dashboard/Employes";
import Notifications from "../../Components/Dashboard/Notifications";

const Dashboard = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const statCardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 15 },
    visible: (custom) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { delay: custom * 0.1, duration: 0.4 },
    }),
    hover: { scale: 1.03, transition: { duration: 0.2 } },
  };

  const stats = [
    { label: "Total Students", target: 2345, color: "from-amber-400 to-orange-500", bg: "bg-amber-50 dark:bg-amber-900/20", border: "border-amber-300 dark:border-amber-700" },
    { label: "Total Institutes", target: 34, color: "from-emerald-400 to-green-500", bg: "bg-emerald-50 dark:bg-emerald-900/20", border: "border-emerald-300 dark:border-emerald-700" },
    { label: "Total Employees", target: 4, color: "from-violet-400 to-purple-500", bg: "bg-violet-50 dark:bg-violet-900/20", border: "border-violet-300 dark:border-violet-700" },
  ];

  return (
    <motion.div
      className="w-full min-h-screen lg:h-screen h-auto bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800 p-4 lg:p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="w-full h-full flex flex-col lg:grid grid-cols-12 grid-rows-12 gap-4 lg:gap-6">
        {/* Stats Cards Row */}
        <motion.div className="lg:col-span-8 col-span-12 row-span-2 lg:order-1 flex flex-col sm:flex-row items-center gap-3 md:gap-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              variants={statCardVariants}
              whileHover="hover"
              className={`flex-1 w-full rounded-2xl lg:rounded-3xl ${stat.bg} backdrop-blur-sm border-2 ${stat.border} cursor-pointer transition-shadow hover:shadow-lg dark:shadow-xl`}
            >
              <div className="relative p-4 lg:p-6 flex flex-col items-center justify-center h-full">
                <motion.p className="text-2xl lg:text-3xl font-bold text-slate-800 dark:text-slate-100">
                  <AnimatedCounter target={stat.target} />
                </motion.p>
                <h3 className="text-xs lg:text-sm font-semibold text-slate-700 dark:text-slate-400 mt-2 text-center">
                  {stat.label}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Payment Bar Chart */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-8 col-span-12 lg:row-span-5 row-span-4 lg:order-3 rounded-2xl lg:rounded-3xl shadow-lg hover:shadow-xl transition-shadow bg-white dark:bg-slate-800 overflow-hidden border border-slate-200 dark:border-slate-700"
        >
          <PaymentBarChart />
        </motion.div>

        {/* Organisation Performance Chart */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-8 col-span-12 lg:row-span-5 row-span-4 lg:order-5 rounded-2xl lg:rounded-3xl shadow-lg hover:shadow-xl transition-shadow bg-white dark:bg-slate-800 overflow-hidden border border-slate-200 dark:border-slate-700"
        >
          <OrganisationPerformanceChart />
        </motion.div>

        {/* Employees Section */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-4 col-span-12 lg:row-span-6 lg:order-2 rounded-2xl lg:rounded-3xl shadow-lg hover:shadow-xl transition-shadow bg-white dark:bg-slate-800 overflow-hidden border border-slate-200 dark:border-slate-700"
        >
          <Employes />
        </motion.div>

        {/* Notifications Section */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-4 col-span-12 lg:row-span-6 lg:order-4 rounded-2xl lg:rounded-3xl shadow-lg hover:shadow-xl transition-shadow bg-white dark:bg-slate-800 overflow-hidden border border-slate-200 dark:border-slate-700"
        >
          <Notifications />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;