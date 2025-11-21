"use client";

import { useState, useEffect } from 'react';
import AdminDashboardPerformanceChart from './AdminDashboardPerformanceChart';

const DashboardPerformanceInsights = () => {
  const [timeRange, setTimeRange] = useState('7days');
  const [chartData, setChartData] = useState(null);

  const mockData = {
    '7days': {
      labels: ['01', '02', '03', '04', '05', '06', '07'],
      values: [1195, 1170, 1210, 1195, 1155, 1210, 1185],
      currentValue: 1220
    },
    '30days': {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      values: [1120, 1065, 1150, 1205],
        currentValue: 1220
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setTimeout(() => {
        setChartData(mockData[timeRange]);
      }, 100);
    };

    fetchData();
  }, [timeRange]);

  const currentValue = chartData?.currentValue || 1220;

  return (
    <div className="bg-[#F7F8F805] rounded-[7px] border border-[#F7F8F81C] p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-[#F7F8F8B2]">
            Performance & Insights
          </h2>
        </div>
        
        <div className="flex gap-2 mt-4 sm:mt-0 border border-[#F7F8F81C] bg-[#F7F8F80A] p-1 rounded-[7px] self-end">
          <button
            onClick={() => setTimeRange('7days')}
            className={`px-4 py-2 rounded-[7px] text-sm font-medium transition-colors ${
              timeRange === '7days'
                ? 'bg-gradient-to-r from-[#75DA5B] to-[#4DCE94] text-black font-semibold'
                : 'bg-transparent'
            }`}
          >
            Last 7 Days
          </button>
        
          <button
            onClick={() => setTimeRange('30days')}
            className={`px-4 py-2 rounded-[7px] text-sm font-medium transition-colors ${
              timeRange === '30days'
                ? 'bg-gradient-to-r from-[#75DA5B] to-[#4DCE94] text-black font-semibold'
                : 'bg-transparent'
            }`}
          >
            Last 30 Days
          </button>
        </div>
      </div>

      <div className="mb-4">
        <AdminDashboardPerformanceChart data={chartData} timeRange={timeRange}/>
      </div>

      <div className="text-center text-sm text-[#F7F8F8B2]">
        Time (Last {timeRange === '7days' ? '7 Days' : '30 Days'})
      </div>
    </div>
  );
};

export default DashboardPerformanceInsights;