"use client";
import { useState } from "react";
import DashboardHeader from "../dashboard/components/DashboardHeader"
import DashboardSidebar from "../dashboard/components/DashboardSidebar"
import DashboardFooter from "../dashboard/components/DashboardFooter"

export default function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen relative">
      <DashboardSidebar collapsed={collapsed} setCollapsed={setCollapsed}/>
      <div className="flex flex-col w-full">
        <DashboardHeader collapsed={collapsed} setCollapsed={setCollapsed}/>
        <main className="py-6 px-[15px] md:px-[30px] overflow-y-auto h-[calc(100vh-170px)] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#F7F8F81C] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-[#F7F8F830]">
          <div className="max-w-[1400px] mx-auto text-[#F7F8F8]">
            {children}
          </div>
        </main>
        <DashboardFooter collapsed={collapsed}/>
        <div className='absolute top-[-50%] bottom-[30%] right-0 left-0 rounded-[50%] z-[-1] bg-[#EFB24D] opacity-[0.30] blur-[300px] md:blur-[754px] pointer-events-none'></div>
      </div>
    </div>
  );
}
