import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

const OrganisationPerformanceChart = () => {
  const [view, setView] = useState("Month");

  const data = {
    Day: {
      labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      datasets: [
        {
          label: "Day Wise",
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: true,
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          tension: 0.4,
          pointRadius: 5,
          pointBackgroundColor: "#3b82f6",
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
        },
      ],
    },
    Month: {
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
          label: "Month Wise",
          data: [65, 59, 80, 81, 56, 55, 40, 75, 70, 85, 88, 90],
          fill: true,
          borderColor: "#10b981",
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          tension: 0.4,
          pointRadius: 5,
          pointBackgroundColor: "#10b981",
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
        },
      ],
    },
    Year: {
      labels: ["2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"],
      datasets: [
        {
          label: "Year Wise",
          data: [65, 59, 80, 81, 56, 55, 40, 95],
          fill: true,
          borderColor: "#a855f7",
          backgroundColor: "rgba(168, 85, 247, 0.1)",
          tension: 0.4,
          pointRadius: 5,
          pointBackgroundColor: "#a855f7",
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
        },
      ],
    },
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: { usePointStyle: true, padding: 15, font: { size: 12 } },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        titleFont: { size: 12 },
        bodyFont: { size: 11 },
        borderColor: "rgba(255, 255, 255, 0.2)",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "rgba(100, 116, 139, 0.8)", font: { size: 11 } },
      },
      y: {
        grid: { color: "rgba(0,0,0,0.05)" },
        ticks: { color: "rgba(100, 116, 139, 0.8)", font: { size: 11 } },
      },
    },
  };

  const selectVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
  };

  return (
    <motion.div
      className="w-full h-full bg-white dark:bg-slate-800 dark:text-white p-4 lg:p-8 flex flex-col gap-4 lg:max-h-96"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <h2 className="lg:text-xl text-lg font-bold text-slate-900 dark:text-slate-100">
          Organisation Performance
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
          <option value="Day">Day Wise</option>
          <option value="Month">Month Wise</option>
          <option value="Year">Year Wise</option>
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
            className="w-full h-full"
          >
            <Line data={data[view]} options={options} />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default OrganisationPerformanceChart;