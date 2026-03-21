import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const chartDataMap = {
  day: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Trial Plan",
        data: [50, 40, 30, 20, 10, 15, 25],
        backgroundColor: "#fbbf24",
        borderRadius: 6,
        borderSkipped: false,
      },
      {
        label: "Pro Plan",
        data: [120, 100, 140, 130, 150, 160, 170],
        backgroundColor: "#10b981",
        borderRadius: 6,
        borderSkipped: false,
      },
      {
        label: "Pro+ Plan",
        data: [80, 70, 90, 85, 95, 100, 110],
        backgroundColor: "#a78bfa",
        borderRadius: 6,
        borderSkipped: false,
      },
      {
        label: "Enterprise Plan",
        data: [200, 220, 210, 230, 240, 260, 280],
        backgroundColor: "#60a5fa",
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  },

  month: {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Trial Plan",
        data: [300, 280, 260, 240, 220, 210, 200, 190, 180, 170, 160, 150],
        backgroundColor: "#fbbf24",
        borderRadius: 6,
        borderSkipped: false,
      },
      {
        label: "Pro Plan",
        data: [800, 820, 850, 870, 900, 950, 980, 1000, 1020, 1050, 1080, 1100],
        backgroundColor: "#10b981",
        borderRadius: 6,
        borderSkipped: false,
      },
      {
        label: "Pro+ Plan",
        data: [500, 520, 540, 560, 580, 600, 630, 650, 670, 700, 720, 750],
        backgroundColor: "#a78bfa",
        borderRadius: 6,
        borderSkipped: false,
      },
      {
        label: "Enterprise Plan",
        data: [
          1200, 1250, 1300, 1350, 1400, 1450, 1500, 1550, 1600, 1650, 1700,
          1750,
        ],
        backgroundColor: "#60a5fa",
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  },

  year: {
    labels: ["2021", "2022", "2023", "2024", "2025"],
    datasets: [
      {
        label: "Trial Plan",
        data: [2000, 1800, 1600, 1400, 1200],
        backgroundColor: "#fbbf24",
        borderRadius: 6,
        borderSkipped: false,
      },
      {
        label: "Pro Plan",
        data: [8000, 9000, 10500, 12000, 14000],
        backgroundColor: "#10b981",
        borderRadius: 6,
        borderSkipped: false,
      },
      {
        label: "Pro+ Plan",
        data: [5000, 6000, 7000, 8500, 10000],
        backgroundColor: "#a78bfa",
        borderRadius: 6,
        borderSkipped: false,
      },
      {
        label: "Enterprise Plan",
        data: [15000, 17000, 20000, 24000, 30000],
        backgroundColor: "#60a5fa",
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  },
};

const PaymentBarChart = () => {
  const [view, setView] = useState("day");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  const selectVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
  };

  return (
    <motion.div
      className="w-full h-full bg-white dark:bg-slate-800 dark:text-white p-4 lg:p-8 flex flex-col justify-center gap-4 lg:max-h-96"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="flex justify-between items-center">
        <h2 className="lg:text-xl text-lg font-bold text-slate-900 dark:text-slate-100">
          Plan Performance
        </h2>
        <motion.select
          value={view}
          onChange={(e) => setView(e.target.value)}
          variants={selectVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          className="border border-slate-300 dark:border-slate-600 rounded-lg lg:py-2 py-1 px-3 lg:px-4 text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white cursor-pointer transition-colors hover:border-slate-400 dark:hover:border-slate-500"
        >
          <option value="day">Day Wise</option>
          <option value="month">Month Wise</option>
          <option value="year">Year Wise</option>
        </motion.select>
      </div>

      <div className="relative w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Bar
              data={chartDataMap[view]}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: "top" },
                  title: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    grid: { display: false },
                    ticks: { color: "rgba(100, 116, 139, 0.8)" },
                  },
                  y: {
                    grid: { color: "rgba(0,0,0,0.05)" },
                    ticks: { color: "rgba(100, 116, 139, 0.8)" },
                  },
                },
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default PaymentBarChart;