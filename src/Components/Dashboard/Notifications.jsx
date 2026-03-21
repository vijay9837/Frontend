import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdNotifications } from "react-icons/md";
import { RiMessage2Line } from "react-icons/ri";
import { X } from "lucide-react";

const Notifications = () => {
  const [notification, setNotification] = useState([
    { id: 101, title: "New Student Enrolled", body: "John Doe joined the platform", seen: true, type: "success" },
    { id: 102, title: "Payment Received", body: "Payment of $500 received from ABC Institute", seen: false, type: "info" },
    { id: 103, title: "Institute Updated", body: "XYZ Institute profile has been updated", seen: true, type: "info" },
    { id: 104, title: "New Inquiry", body: "New inquiry received from Delhi region", seen: true, type: "alert" },
    { id: 105, title: "Course Completed", body: "5 students completed Advanced Python course", seen: true, type: "success" },
    { id: 106, title: "System Update", body: "System will undergo maintenance at 2 AM", seen: false, type: "warning" },
    { id: 107, title: "Subscription Expiring", body: "Pro subscription expiring in 3 days", seen: false, type: "warning" },
    { id: 108, title: "Feedback Received", body: "New feedback submitted by a student", seen: false, type: "info" },
  ]);

  const [expandedId, setExpandedId] = useState(null);

  const notificationUpdateHandle = (id) => {
    setNotification((prev) =>
      prev.map((noti) =>
        noti.id === id ? { ...noti, seen: !noti.seen } : noti
      )
    );
  };

  const removeNotification = (id) => {
    setNotification((prev) => prev.filter((noti) => noti.id !== id));
  };

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
    exit: { opacity: 0, x: 20, transition: { duration: 0.2 } },
    hover: { x: 4, transition: { duration: 0.2 } },
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case "success":
        return "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700";
      case "warning":
        return "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700";
      case "alert":
        return "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700";
      case "info":
      default:
        return "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700";
    }
  };

  const getIndicatorColor = (type) => {
    switch (type) {
      case "success":
        return "bg-green-500";
      case "warning":
        return "bg-yellow-500";
      case "alert":
        return "bg-red-500";
      case "info":
      default:
        return "bg-blue-500";
    }
  };

  const unreadCount = notification.filter((n) => !n.seen).length;

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
        <div className="flex items-center gap-2">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <motion.span
              className="w-5 h-5 lg:w-6 lg:h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {unreadCount}
            </motion.span>
          )}
        </div>
        <RiMessage2Line className="text-2xl text-blue-500" />
      </motion.h2>

      <motion.ul
        className="w-full flex flex-col gap-2 overflow-y-auto demo h-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {notification.length > 0 ? (
            notification.map((noti) => (
              <motion.li
                key={noti.id}
                variants={itemVariants}
                whileHover="hover"
                exit="exit"
                onClick={() => {
                  notificationUpdateHandle(noti.id);
                  setExpandedId(expandedId === noti.id ? null : noti.id);
                }}
                className={`p-3 lg:p-4 rounded-xl border-2 cursor-pointer transition-all ${getNotificationColor(
                  noti.type
                )} relative group`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2 flex-1">
                    <motion.div
                      className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${getIndicatorColor(
                        noti.type
                      )}`}
                      animate={!noti.seen ? { scale: [1, 1.2, 1] } : {}}
                      transition={!noti.seen ? { duration: 2, repeat: Infinity } : {}}
                    />
                    <div className="flex flex-col gap-1 flex-1">
                      <h3 className="text-sm lg:text-base font-semibold text-slate-900 dark:text-slate-100">
                        {noti.title}
                      </h3>
                      <p className="text-xs lg:text-sm text-slate-600 dark:text-slate-400 line-clamp-1">
                        {noti.body}
                      </p>
                    </div>
                  </div>
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeNotification(noti.id);
                    }}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X size={16} />
                  </motion.button>
                </div>

                {!noti.seen && (
                  <motion.div
                    className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.li>
            ))
          ) : (
            <motion.li
              className="text-center text-slate-500 dark:text-slate-400 py-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No Notifications
            </motion.li>
          )}
        </AnimatePresence>
      </motion.ul>
    </motion.div>
  );
};

export default Notifications;