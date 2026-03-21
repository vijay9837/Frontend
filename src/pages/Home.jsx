import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Components/Navbar";
import Sidenav from "../Components/Sidenav";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { closesidenav } from "../redux/Slices/toggleslice";
import SearchBox from "../Components/SearchBox";
import { Search } from "lucide-react";
import { searchboxclose, searchboxopen } from "../redux/Slices/searchslice";
import { useState } from "react";
import { closeAddInstitue } from "../redux/Slices/addInstituteSlice";
import AddInstitute from "../Components/AddInstitute";

const Home = () => {
  const issidenav = useSelector((state) => state.toggle);
  const dispatch = useDispatch();
  const isaddInstitute = useSelector((state) => state.addInstitute);

  const searchboxhandle = (e) => {
    if (e.target.value !== "") {
      dispatch(searchboxopen());
    } else {
      dispatch(searchboxclose());
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } },
  };

  const mobileOverlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.15 } },
  };

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-white dark:bg-gray-900">
      {/* Add Institute Modal */}
      <AnimatePresence>
        {isaddInstitute && (
          <motion.div
            onClick={() => dispatch(closeAddInstitue())}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-800 h-full lg:h-auto lg:w-8/12 lg:shadow-2xl shadow-black lg:rounded-2xl lg:p-6 p-4 overflow-y-auto demo"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <AddInstitute />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        className="h-full flex-shrink-0 z-41"
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Sidenav />
      </motion.div>

      <AnimatePresence>
        {issidenav && (
          <motion.div
            onClick={() => dispatch(closesidenav())}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            variants={mobileOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          />
        )}
      </AnimatePresence>

      {/* Main Content Container */}
      <motion.div
        className="flex flex-col h-full flex-1 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {/* Navbar */}
        <motion.div
          className="w-full flex-shrink-0 z-40"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Navbar />
        </motion.div>

        {/* Main Content Area */}
        <motion.main
          className="flex-1 w-full overflow-y-auto demo bg-slate-50 dark:bg-gray-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Outlet />
        </motion.main>
      </motion.div>
    </div>
  );
};

export default Home;
