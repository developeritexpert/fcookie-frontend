"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData as ChartJSData,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartData {
  labels: string[];
  values: number[];
}

interface Props {
  data?: ChartData | null;
  timeRange?: "7days" | "30days";
}

const DashboardPerformanceChart: React.FC<Props> = ({
  data,
  timeRange = "7days",
}) => {
  const chartData: ChartJSData<"bar", number[], string> = {
    labels: data?.labels ?? ["01", "02", "03", "04", "05", "06", "07"],
    datasets: [
      {
        label: "Performance Value",
        data: data?.values ?? [1020, 1050, 1100, 1150, 1180, 1200, 1220],
        backgroundColor: Array(7).fill("#453215"),
        borderSkipped: "bottom",
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#F7F8F80A",
        titleColor: "#ffffff",
        bodyColor: "#F7F8F8B2",
        borderColor: "#F7F8F81C",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: (context) => `Value: ${context.parsed.y}`,
        },
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#F7F8F8B2",
        },
      },
      y: {
        min: 1020,
        max: 1220,
        grid: {
          color: "#F7F8F81A",
        },
        ticks: {
          color: "#F7F8F8B2",
          stepSize: 20,
          callback: (value) => value as number,
        },
      },
    },

    interaction: {
      intersect: false,
      mode: "index",
    },
  };

  return (
    <div className="w-full h-[300px]">
      <Bar data={chartData} options={options} className="!w-full" />
    </div>
  );
};

export default DashboardPerformanceChart;
