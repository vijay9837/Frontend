import axios from "axios";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";

const Subscription = () => {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [institutePlan, setInstitutePlan] = useState([]);

  const fetchInstitute = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_API}institute/allInstitute`
      );

      if (response.status === 200) {
        setInstitutePlan(response.data.institutes || []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstitute();
  }, []);

  const filteredInstitutes = institutePlan.filter((inst) =>
    inst.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.2 } },
  };

  const getPlanColor = (plan) => {
    switch (plan?.toLowerCase()) {
      case "trial":
        return "bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-700";
      case "pro":
        return "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-300 dark:border-green-700";
      case "pro+":
      case "proplus":
        return "bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border border-purple-300 dark:border-purple-700";
      case "enterprise":
        return "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-300 dark:border-blue-700";
      default:
        return "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300";
    }
  };

  return (
    <motion.div
      className="w-full h-full lg:p-6 p-2 flex flex-col gap-4 bg-slate-50 dark:bg-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <motion.input
          value={searchValue}
          type="text"
          placeholder="Search institute by name"
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full py-2 lg:py-3 pl-10 pr-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg lg:rounded-xl text-sm lg:text-base text-slate-800 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
          whileFocus={{ scale: 1.01 }}
        />
      </motion.div>

      <motion.div
        className="w-full rounded-lg lg:rounded-2xl shadow-md overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-max">
            <thead className="bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-700 dark:to-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0">
              <tr className="divide-x divide-slate-200 dark:divide-slate-700">
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                  Institute Name
                </th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                  Start Date
                </th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                  End Date
                </th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-center text-xs lg:text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.tr
                    className="bg-white dark:bg-slate-800"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <motion.div className="flex justify-center items-center gap-3">
                        <motion.div
                          className="w-8 h-8 border-3 border-slate-200 dark:border-slate-600 border-t-blue-500 rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <span className="text-slate-600 dark:text-slate-400 font-medium">Loading subscriptions...</span>
                      </motion.div>
                    </td>
                  </motion.tr>
                ) : filteredInstitutes?.length > 0 ? (
                  filteredInstitutes.map((inst, idx) => (
                    <motion.tr
                      key={inst.instituteId}
                      variants={rowVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ delay: idx * 0.05 }}
                      className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors divide-x divide-slate-200 dark:divide-slate-700"
                    >
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm font-medium text-slate-700 dark:text-slate-300">
                        {inst.instituteId}
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm font-semibold text-slate-900 dark:text-white truncate max-w-xs">
                        {inst.name}
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-center">
                        <motion.span
                          className={`px-3 py-1 rounded-lg text-xs lg:text-sm font-semibold inline-block ${getPlanColor(
                            inst.planname
                          )}`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {inst.planname || "N/A"}
                        </motion.span>
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm text-slate-700 dark:text-slate-300">
                        {inst.planstartdate
                          ? new Date(inst.planstartdate).toLocaleDateString("en-IN")
                          : "N/A"}
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm text-slate-700 dark:text-slate-300">
                        {inst.planenddate
                          ? new Date(inst.planenddate).toLocaleDateString("en-IN")
                          : "N/A"}
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-center">
                        <motion.button
                          className="px-3 lg:px-4 py-1 lg:py-2 text-xs lg:text-sm font-semibold rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:shadow-lg transition-all"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          View Details
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <motion.tr
                    className="bg-white dark:bg-slate-800"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <p className="text-slate-600 dark:text-slate-400 font-medium">
                        No Subscriptions Found
                      </p>
                    </td>
                  </motion.tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Subscription;