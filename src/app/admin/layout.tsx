"use client";
import { useState, useEffect, ReactNode } from "react";
import AdminDashboardHeader from "@/components/admin-layout/AdminDashboardHeader";
import AdminDashboardSidebar from "@/components/admin-layout/AdminDashboardSidebar";
import AdminDashboardFooter from "@/components/admin-layout/AdminDashboardFooter";
import AuthGuard from "@/utils/authGuard";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setCollapsed(window.innerWidth < 1024);
    };

    checkScreenSize();

    const handleResize = () => {
      setCollapsed(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen relative">
      <AdminDashboardSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* MAIN PANEL */}
      <div className="flex flex-col w-full">
        <AdminDashboardHeader collapsed={collapsed} setCollapsed={setCollapsed} />

        {/* SCROLLABLE MAIN CONTENT */}
        <main
          className="
            py-6 
            px-[15px] md:px-[30px] 
            overflow-y-auto 
            h-[calc(100vh-110px)]
            [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:bg-[#F7F8F81C]
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb:hover]:bg-[#F7F8F830]
          "
        >
          <div className="max-w-[1600px] mx-auto text-[#F7F8F8]">
            <AuthGuard allowedRoles={['ADMIN']}>
              {children}
            </AuthGuard>
          </div>
        </main>

        <AdminDashboardFooter collapsed={collapsed} />

        {/* BACKGROUND GLOW EFFECT */}
        <div
          className="
            absolute top-[-50%] bottom-[30%] right-0 left-0 
            rounded-[50%] z-[-1] 
            bg-[#EFB24D] opacity-[0.30] 
            blur-[300px] md:blur-[754px] 
            pointer-events-none
          "
        ></div>
      </div>
    </div>
  );
}
