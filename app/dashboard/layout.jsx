"use client";
import { useState } from "react";
import DashboardHeader from "../dashboard/components/DashboardHeader"
import DashboardSidebar from "../dashboard/components/DashboardSidebar"
import DashboardFooter from "../dashboard/components/DashboardFooter"

export default function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen relative">
      <DashboardSidebar collapsed={collapsed}/>
      <div className="flex flex-col flex-1">
        <DashboardHeader collapsed={collapsed} setCollapsed={setCollapsed}/>
        <main className="p-6 overflow-y-auto h-[calc(100vh-170px)]">
          {children}
        </main>
        <DashboardFooter collapsed={collapsed}/>
        <div className='absolute top-[-50%] bottom-[30%] right-0 left-0 rounded-[50%] z-[-1] bg-[#EFB24D] opacity-[0.30] blur-[754px] pointer-events-none'></div>
      </div>
    </div>
  );
}
