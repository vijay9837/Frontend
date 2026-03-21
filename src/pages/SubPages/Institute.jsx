import { Search } from "lucide-react";
import { AiFillEdit } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  closeAddInstitue,
  openAddInstitute,
} from "../../redux/Slices/addInstituteSlice";

const Institute = () => {
  let responseInstitute = [];
  const navigate = useNavigate();
  const [allInstitutes, setAllInstitutes] = useState([]);
  const [institutes, setInstitutes] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const fecthInstitute = async () => {
    const url = `${import.meta.env.VITE_REACT_API}institute/allInstitute`;
    try {
      setLoading(true);
      const response = await axios(url);
      responseInstitute = response.data.institutes;
      if (response.status === 200) {
        setAllInstitutes(response.data.institutes);
        setInstitutes(response.data.institutes);
        setLoading(false);
      }
    } catch (error) {
      console.error("error" + error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fecthInstitute();
  }, []);

  const instituteStatusUpdate = async (e) => {
    const status = e.target.value;
    const id = e.target.id;
    const url = `${import.meta.env.VITE_REACT_API}institute/updateInstitute/${id}`;
    try {
      const response = await axios.put(url);
      if (response.status === 200) {
        fecthInstitute();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const searchStudent = (e) => {
    if (e === "active" || e === "inactive" || e === "pending") {
      const filtered = allInstitutes.filter((inst) => inst.status === e);
      setInstitutes(filtered.length === 0 ? allInstitutes : filtered);
    } else {
      const value = e.target.value.toLowerCase();
      setSearchValue(value);

      if (!value) {
        setInstitutes(allInstitutes);
        return;
      }

      const filtered = allInstitutes.filter((inst) => {
        return (
          inst.name?.toLowerCase().includes(value) ||
          inst.contact?.toString().includes(value) ||
          inst.instituteId?.toString().includes(value)
        );
      });
      setInstitutes(filtered.length === 0 ? allInstitutes : filtered);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-300 dark:border-green-700";
      case "inactive":
        return "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-300 dark:border-red-700";
      case "pending":
        return "bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-700";
      default:
        return "bg-slate-100 dark:bg-slate-700";
    }
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

  return (
    <motion.div
      className="w-full flex flex-col lg:gap-4 gap-3 h-full dark:bg-gray-900 p-2 lg:p-6 bg-slate-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="w-full flex flex-col sm:flex-row lg:gap-4 gap-3 items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-full sm:flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <motion.input
            value={searchValue}
            type="text"
            placeholder="Search institute name, ID or phone"
            onChange={searchStudent}
            className="w-full py-2 lg:py-3 pl-10 pr-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 lg:rounded-xl rounded-lg text-sm lg:text-base text-slate-800 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
            whileFocus={{ scale: 1.01 }}
          />
        </div>
        <motion.button
          onClick={() => dispatch(openAddInstitute())}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-sm lg:text-base px-4 lg:px-6 py-2 lg:py-3 rounded-lg lg:rounded-xl hover:shadow-lg transition-all active:scale-95 whitespace-nowrap"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          + Add Institute
        </motion.button>
      </motion.div>

      <motion.div
        className="w-full h-full rounded-xl lg:rounded-2xl shadow-md overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
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
                  Address
                </th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-center text-xs lg:text-sm font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                  Status
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
                        <span className="text-slate-600 dark:text-slate-400 font-medium">Loading institutes...</span>
                      </motion.div>
                    </td>
                  </motion.tr>
                ) : institutes?.length > 0 ? (
                  institutes.map((inst, idx) => (
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
                        {inst.address}
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm text-slate-700 dark:text-slate-300">
                        {inst.contact}
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-center">
                        <motion.select
                          id={inst._id}
                          onChange={instituteStatusUpdate}
                          className={`${getStatusColor(inst.status)} text-xs lg:text-sm font-semibold px-3 py-1 rounded-lg outline-none cursor-pointer transition-all hover:shadow-md`}
                          value={inst.status}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <option value="pending">Pending</option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </motion.select>
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-center">
                        <motion.button
                          className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <AiFillEdit className="text-lg lg:text-xl" />
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
                        No Institute Registered
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

export default Institute;