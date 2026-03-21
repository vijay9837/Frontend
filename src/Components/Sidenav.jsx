import { MdDashboard } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { closesidenav } from "../redux/Slices/toggleslice";
import { LogOut, Settings, University, User2Icon } from "lucide-react";
import { MdOutlineSupportAgent } from "react-icons/md";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { logout } from "../redux/Slices/user";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Sidenav = () => {
  const issidenav = useSelector((state) => state.toggle);
  const [loggingOut, setIsloggingOut] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsloggingOut(true);
    setTimeout(() => {
      dispatch(logout());
      navigate("/admin/login");
    }, 2000);
  };

  const handleNavClick = () => {
    dispatch(closesidenav());
  };

  const navItems = [
    { to: "/dashboard", icon: MdDashboard, label: "Dashboard" },
    { to: "/institute", icon: University, label: "Institute" },
    { to: "/students", icon: User2Icon, label: "Students" },
    { to: "/inqueries", icon: MdOutlineSupportAgent, label: "Inqueries" },
    { to: "/subscription", icon: FaHandHoldingDollar, label: "Subscription" },
  ];

  const logoVariants = {
    visible: { opacity: 1, scale: 1, x: 0 },
    hidden: { opacity: 0, scale: 0.8, x: -20 },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (custom) => ({
      opacity: 1,
      x: 0,
      transition: { delay: custom * 0.05, duration: 0.3 },
    }),
  };

  return (
    <motion.aside
      id="sidebar"
      className={`shadow-xl flex flex-col h-screen bg-gradient-to-b from-blue-700 to-blue-800 dark:from-slate-800 dark:to-slate-900 py-4 overflow-hidden border-r border-blue-600 dark:border-slate-700 transition-all duration-300 ease-in-out fixed sm:static lg:static top-0 left-0 z-40 lg:z-0
        ${issidenav ? "lg:w-55 w-[70%]" : "lg:w-16 w-0"}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="flex items-center justify-center px-3 py-4 mb-2"
        initial="hidden"
        animate={issidenav ? "visible" : "hidden"}
        variants={logoVariants}
        transition={{ duration: 0.3 }}
      >
        <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
          <h2 className="text-white font-bold text-2xl tracking-wide">
            Silverwink
          </h2>
          <div className="h-1 w-12 bg-gradient-to-r from-blue-400 to-blue-300 rounded-full mx-auto mt-1" />
        </motion.div>
      </motion.div>

      <div className="flex flex-col justify-between h-full overflow-y-auto demo">
        <motion.nav
          className="space-y-1 px-2 lg:mt-3 mt-2"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
            },
          }}
          initial="visible"
        >
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                custom={idx}
                variants={menuItemVariants}
                onMouseEnter={() => setHoveredItem(item.to)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <NavLink
                  to={item.to}
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    `relative flex items-center gap-3 px-3 py-3 lg:py-2.5 rounded-lg text-white/90 transition-all duration-200 group ${
                      isActive
                        ? "bg-white/15 shadow-lg border border-white/20"
                        : "hover:bg-white/10"
                    }`
                  }
                >
                  <motion.div
                    className="flex-shrink-0"
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon className="w-5 h-5 lg:w-6 lg:h-6" />
                  </motion.div>

                  <AnimatePresence>
                    {issidenav && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-sm lg:text-base font-medium whitespace-nowrap overflow-hidden"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {!issidenav && hoveredItem === item.to && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="hidden lg:block absolute left-full ml-3 px-2 py-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold rounded-lg whitespace-nowrap pointer-events-none z-50 shadow-lg"
                      >
                        {item.label}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              </motion.div>
            );
          })}
        </motion.nav>

        <motion.nav
          className="space-y-1 px-2 pb-4"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.05, delayChildren: 0.3 },
            },
          }}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            custom={0}
            variants={menuItemVariants}
            onMouseEnter={() => setHoveredItem("/settings")}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <NavLink
              to={"/settings"}
              onClick={handleNavClick}
              className={({ isActive }) =>
                `relative flex items-center gap-3 px-3 py-3 lg:py-2.5 rounded-lg text-white/90 transition-all duration-200 group ${
                  isActive
                    ? "bg-white/15 shadow-lg border border-white/20"
                    : "hover:bg-white/10"
                }`
              }
            >
              <motion.div
                className="flex-shrink-0"
                whileHover={{ scale: 1.15, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Settings className="w-5 h-5 lg:w-6 lg:h-6" />
              </motion.div>

              <AnimatePresence>
                {issidenav && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm lg:text-base font-medium whitespace-nowrap overflow-hidden"
                  >
                    Settings
                  </motion.span>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {!issidenav && hoveredItem === "/settings" && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="hidden lg:block absolute left-full ml-3 px-2 py-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold rounded-lg whitespace-nowrap pointer-events-none z-50 shadow-lg"
                  >
                    Settings
                  </motion.div>
                )}
              </AnimatePresence>
            </NavLink>
          </motion.div>

          <motion.div
            custom={1}
            variants={menuItemVariants}
            onMouseEnter={() => setHoveredItem("logout")}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <motion.button
              onClick={handleLogout}
              className="w-full relative flex items-center gap-3 px-3 py-3 lg:py-2.5 rounded-lg text-white/90 transition-all duration-200 hover:bg-red-500/20 group"
              whileHover={{ backgroundColor: "rgba(239, 68, 68, 0.15)" }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="flex-shrink-0"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <LogOut className="w-5 h-5 lg:w-6 lg:h-6" />
              </motion.div>

              <AnimatePresence>
                {issidenav && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="whitespace-nowrap overflow-hidden text-sm lg:text-base font-medium"
                  >
                    {loggingOut ? (
                      <div className="flex items-center gap-2">
                        <motion.div
                          className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                        <span>Logging Out...</span>
                      </div>
                    ) : (
                      "Logout"
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {!issidenav && hoveredItem === "logout" && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="hidden lg:block absolute left-full ml-3 px-2 py-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold rounded-lg whitespace-nowrap pointer-events-none z-50 shadow-lg"
                  >
                    Logout
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </motion.nav>
      </div>
    </motion.aside>
  );
};

export default Sidenav;