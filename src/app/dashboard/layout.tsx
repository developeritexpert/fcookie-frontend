"use client";

import { useState, useEffect, ReactNode } from "react";
import DashboardHeader from "@/components/dashboard-layout/DashboardHeader";
import DashboardSidebar from "@/components/dashboard-layout/DashboardSidebar";
import DashboardFooter from "@/components/dashboard-layout/DashboardFooter";

// Define props type
interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 1024) {
        setCollapsed(true);
      }
    };

    checkScreenSize();

    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen relative">
      <DashboardSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className="flex flex-col w-full">
        <DashboardHeader collapsed={collapsed} setCollapsed={setCollapsed} />

        <main
          className="py-6 px-[15px] md:px-[30px] overflow-y-auto h-[calc(100vh-110px)] 
          [&::-webkit-scrollbar]:w-2 
          [&::-webkit-scrollbar-track]:bg-transparent 
          [&::-webkit-scrollbar-thumb]:bg-[#F7F8F81C] 
          [&::-webkit-scrollbar-thumb]:rounded-full 
          [&::-webkit-scrollbar-thumb:hover]:bg-[#F7F8F830]"
        >
          <div className="max-w-[1600px] mx-auto text-[#F7F8F8]">
            {children}
          </div>
        </main>

        <DashboardFooter collapsed={collapsed} />

        <div
          className="absolute top-[-50%] bottom-[30%] right-0 left-0 rounded-[50%] z-[-1] 
          bg-[#EFB24D] opacity-[0.30] blur-[300px] md:blur-[754px] pointer-events-none"
        ></div>
      </div>
    </div>
  );
}
