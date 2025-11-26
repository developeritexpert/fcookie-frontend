"use client";

import React from "react";
import Image from "next/image";
import AdminDashboardNavLink from "@/components/admin-layout/AdminDashboardNavLink";
import { adminSidebarItems } from "./sidebarData";
import { useRouter } from "next/navigation"; 
interface AdminDashboardSidebarProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

export default function AdminDashboardSidebar({
  collapsed,
  setCollapsed,
}: AdminDashboardSidebarProps) {
   const router = useRouter();

  const handleLogout = () => {
    // You can also clear auth tokens or perform logout logic here
    router.push("/"); // navigate to home
  };
  return (
    <div
      className={`z-[2] border-r border-[#F7F8F81A] md:bg-[#F7F8F80A] dark:text-[#F7F8F8B2] 
      h-full transition-all duration-500 fixed md:relative top-0 left-0 flex flex-col
      ${collapsed ? "w-[80px]" : "w-[280px]"}`}
    >
      {/* Logo */}
      <div className="px-[10px] flex-shrink-0">
        <div className="h-[60px] border-b border-[#F7F8F81C] p-[10px] flex items-center justify-center relative">
          {collapsed ? (
            <Image
              src="/icons/cookie.png"
              alt="Logo"
              width={50}
              height={50}
              className="md:block hidden"
            />
          ) : (
            <Image
              src="/img/header-logo.png"
              alt="Logo"
              width={100}
              height={100}
              className="md:block hidden"
            />
          )}

          {/* Mobile Logo */}
          <Image
            src="/img/header-logo.png"
            alt="Logo"
            width={120}
            height={120}
            className="md:hidden block"
          />

          {/* Mobile toggle */}
          <button
            className="md:hidden absolute top-[8px] right-[8px]"
            onClick={() => setCollapsed(!collapsed)}
          >
            <svg width="20" height="20" viewBox="0 0 329 329" className="fill-white">
              <path d="M194.8 164.7 323 36.5c8.3-8.3 8.3-21.8 0-30.1s-21.8-8.3-30.1 0L164.6 134.6 36.4 6.3c-8.3-8.3-21.8-8.3-30.1 0s-8.3 21.8 0 30.1l128.2 128.2L6.2 292.9c-8.3 8.3-8.3 21.8 0 30.1a21 21 0 0 0 30.1 0l128.2-128.2 128.2 128.2a21 21 0 0 0 30.1 0c8.3-8.3 8.3-21.8 0-30.1z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 pt-[30px] pl-[10px] overflow-y-auto">
        <nav className="flex flex-col space-y-[10px]">
          {adminSidebarItems.map((item) => (
            <AdminDashboardNavLink
              key={item.id}
              href={item.link}
              collapsed={collapsed}
              setCollapsed={setCollapsed}
            >
              {item.svg ? (
                <span className="shrink-0 w-[20px] h-[20px]">{item.svg}</span>
              ) : (
                <Image
                  src={item.icon!}
                  alt={item.name}
                  width={20}
                  height={20}
                  className="shrink-0"
                />
              )}
              {!collapsed && <span className="ml-3">{item.name}</span>}
            </AdminDashboardNavLink>
          ))}
        </nav>
      </div>

      {/* Footer / Logout */}
      <div className="flex-shrink-0 flex items-center justify-center py-4">
        <button
          onClick={handleLogout}

          className={`bg-[#F7F8F80A] border border-[#444444] rounded-[7px] flex items-center py-[6px] duration-300 ${
            collapsed ? "text-[0px] px-[10px] gap-[0px]" : "text-sm px-[20px] gap-[10px]"
          }`}
        >
          <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
            <path d="M10.8432 20.3609H1.37791V1.37791H10.8432C11.224 1.37791 11.5321 1.06971 11.5321 0.688953C11.5321 0.308192 11.224 0 10.8432 0H0.688953C0.308192 0 0 0.308192 0 0.688953V21.0498C0 21.4301 0.308192 21.7388 0.688953 21.7388H10.8432C11.224 21.7388 11.5321 21.4301 11.5321 21.0498C11.5321 20.6695 11.224 20.3609 10.8432 20.3609Z" fill="#F7F8F8" fillOpacity="0.7" />
          </svg>
          {!collapsed && <span className="ml-2">Logout</span>}
        </button>
      </div>
    </div>
  );
}
