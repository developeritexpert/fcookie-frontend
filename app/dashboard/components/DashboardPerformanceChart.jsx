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
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const DashboardPerformanceChart = ({ data, timeRange = '7days' }) => {
  const chartData = {
    labels: data?.labels || ['01', '02', '03', '04', '05', '06', '07'],
    datasets: [
      {
        label: 'Performance Value',
        data: data?.values || [1020, 1050, 1100, 1150, 1180, 1200, 1220],
        backgroundColor: [
          '#453215',
          '#453215',
          '#453215',
          '#453215',
          '#453215',
          '#453215',
          '#453215',
        ],
        borderSkipped: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#F7F8F80A',
        titleColor: '#ffffff',
        bodyColor: '#F7F8F8B2',
        borderColor: '#F7F8F81C',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return `Value: ${context.parsed.y}`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#F7F8F8B2',
        },
      },
      y: {
        min: 1020,
        max: 1220,
        grid: {
          color: '#F7F8F81A',
        },
        ticks: {
          color: '#F7F8F8B2',
          stepSize: 20,
          callback: function(value) {
            return value;
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  return (
    <div className="w-full h-[300px]">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default DashboardPerformanceChart;