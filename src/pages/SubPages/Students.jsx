import { Filter, Search } from "lucide-react";
import { MdDeleteSweep } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Students = () => {
  const [institute, setInstitute] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [listLimit, setListLimit] = useState("10");
  const [loading, setLoading] = useState(false);

  const fecthInstitute = async () => {
    setLoading(true);
    try {
      setTimeout(() => {
        setInstitute([]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fecthInstitute();
  }, []);

  const openInstitute = (e) => {
    e.preventDefault();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.2 } },
  };

  const filterGroupVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="w-full flex flex-col lg:gap-4 gap-3 h-full dark:bg-gray-900 p-2 lg:p-6 bg-slate-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="w-full flex flex-col lg:gap-4 gap-3"
        variants={filterGroupVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="w-full relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <motion.input
            type="text"
            placeholder="Search student name, ID or email"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full py-2 lg:py-3 pl-10 pr-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 lg:rounded-xl rounded-lg text-sm lg:text-base text-slate-800 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
            whileFocus={{ scale: 1.01 }}
          />
        </div>

        <motion.div
          className="grid grid-cols-3 lg:grid-cols-3 gap-2 lg:gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
        >
          <motion.div
            className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 lg:rounded-xl rounded-lg px-3 lg:px-4 py-2 lg:py-3"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <label className="text-xs lg:text-sm font-semibold dark:text-slate-300 whitespace-nowrap">
              From:
            </label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="bg-transparent text-xs lg:text-sm text-slate-800 dark:text-white outline-none w-full"
            />
          </motion.div>

          <motion.div
            className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 lg:rounded-xl rounded-lg px-3 lg:px-4 py-2 lg:py-3"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <label className="text-xs lg:text-sm font-semibold dark:text-slate-300 whitespace-nowrap">
              To:
            </label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="bg-transparent text-xs lg:text-sm text-slate-800 dark:text-white outline-none w-full"
            />
          </motion.div>

          <motion.div
            className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 lg:rounded-xl rounded-lg px-3 lg:px-4 py-2 lg:py-3"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <label className="text-xs lg:text-sm font-semibold dark:text-slate-300 whitespace-nowrap">
              Show:
            </label>
            <select
              value={listLimit}
              onChange={(e) => setListLimit(e.target.value)}
              className="bg-transparent text-xs lg:text-sm text-slate-800 dark:text-white outline-none w-full cursor-pointer"
            >
              <option value="10">Top 10</option>
              <option value="25">Top 25</option>
              <option value="50">Top 50</option>
              <option value="100">Top 100</option>
            </select>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="w-full h-full rounded-xl lg:rounded-2xl shadow-md overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-700 dark:to-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0">
              <tr className="divide-x divide-slate-200 dark:divide-slate-700">
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider hidden lg:table-cell">
                  Email
                </th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-center text-xs lg:text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-center text-xs lg:text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                  Actions
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
                        <span className="text-slate-600 dark:text-slate-400 font-medium">Loading students...</span>
                      </motion.div>
                    </td>
                  </motion.tr>
                ) : institute?.length > 0 ? (
                  institute.map((inst, idx) => (
                    <motion.tr
                      key={inst.instituteId}
                      variants={rowVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ delay: idx * 0.05 }}
                      className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors divide-x divide-slate-200 dark:divide-slate-700"
                    >
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm text-slate-700 dark:text-slate-300 font-medium">
                        {inst.instituteId}
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm text-slate-900 dark:text-white font-semibold truncate">
                        {inst.name}
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm text-slate-700 dark:text-slate-300 hidden lg:table-cell truncate">
                        {inst.email}
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm text-slate-700 dark:text-slate-300">
                        {inst.contact}
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-center">
                        <motion.span
                          className={`px-3 py-1 rounded-full text-xs lg:text-sm font-semibold ${
                            inst.status === "active"
                              ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                              : "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400"
                          }`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {inst.status}
                        </motion.span>
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <motion.button
                            className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <AiFillEdit className="text-lg lg:text-xl" />
                          </motion.button>
                          <motion.button
                            className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <MdDeleteSweep className="text-lg lg:text-xl" />
                          </motion.button>
                        </div>
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
                        No Students Registered
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

export default Students;