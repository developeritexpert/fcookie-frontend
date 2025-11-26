"use client";

import React from "react";
import Image from "next/image";
import DashboardNavLink from "./DashboardNavLink";
import { dashboardSidebarItems } from "./sidebarData";
import { useRouter } from "next/navigation";

interface DashboardSidebarProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

export default function DashboardSidebar({
  collapsed,
  setCollapsed,
}: DashboardSidebarProps) {
  const router = useRouter();

  const handleLogout = () => {
    // You can also clear auth tokens or perform logout logic here
    router.push("/"); // navigate to home
  };

  return (
    <div
      className={`z-[2] border-r border-[#F7F8F81A] md:backdrop-blur-[0px] backdrop-blur-[100px] md:bg-[#F7F8F80A] dark:text-[#F7F8F8B2] h-full transition-all duration-500 md:duration-300 fixed md:relative top-0 left-0 flex flex-col
        ${collapsed ? "w-[80px] md:-translate-x-0 -translate-x-full" : "w-[280px] translate-x-0"}`}
    >
      {/* Logo Section */}
      <div className="px-[10px] flex-shrink-0">
        <div className="h-[60px] border-[#F7F8F81C] border-b p-[10px] flex items-center justify-center relative">
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

          {/* Mobile Close Button */}
          <button
            className="md:hidden absolute top-[8px] right-[8px]"
            onClick={() => setCollapsed(!collapsed)}
            aria-label="Close sidebar"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 329.269 329"
              className="fill-[#F7F8F8] w-[15px]"
            >
              <path d="M194.8 164.77 323.013 36.555c8.343-8.34 8.343-21.825 0-30.164-8.34-8.34-21.825-8.34-30.164 0L164.633 134.605 36.422 6.391c-8.344-8.34-21.824-8.34-30.164 0-8.344 8.34-8.344 21.824 0 30.164l128.21 128.215L6.259 292.984c-8.344 8.34-8.344 21.825 0 30.164a21.266 21.266 0 0 0 15.082 6.25c5.46 0 10.922-2.09 15.082-6.25l128.21-128.214 128.216 128.214a21.273 21.273 0 0 0 15.082 6.25c5.46 0 10.922-2.09 15.082-6.25 8.343-8.34 8.343-21.824 0-30.164zm0 0" />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation Section */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="pt-[30px] duration-300 pl-[10px] overflow-y-auto">
          <nav className="flex flex-col space-y-[10px] h-full">
            {dashboardSidebarItems.map((item) => (
              <DashboardNavLink
                key={item.id}
                href={item.link}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
              >
                {item.svg ? (
                  <span className="shrink-0 w-[20px] h-[20px] flex items-center justify-center">
                    {item.svg}
                  </span>
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
              </DashboardNavLink>
            ))}
          </nav>
        </div>

        {/* Logout Section */}
        <div className="flex-shrink-0 flex items-center justify-center py-[20px]">
          <button
            onClick={handleLogout}
            className={`bg-[#F7F8F80A] border border-[#444444] rounded-[7px] flex items-center py-[6px] duration-300 ${
              collapsed 
                ? "text-[0px] px-[15px] gap-[0px]" 
                : "text-sm px-[30px] gap-[10px]"
            }`}
          >
            <svg width="18" height="22" viewBox="0 0 18 22" fill="none" className="w-[15px]">
              <path 
                d="M10.8432 20.3609H1.37791V1.37791H10.8432C11.224 1.37791 11.5321 1.06971 11.5321 0.688953C11.5321 0.308192 11.224 0 10.8432 0H0.688953C0.308192 0 0 0.308192 0 0.688953V21.0498C0 21.4301 0.308192 21.7388 0.688953 21.7388H10.8432C11.224 21.7388 11.5321 21.4301 11.5321 21.0498C11.5321 20.6695 11.224 20.3609 10.8432 20.3609Z" 
                fill="#F7F8F8" 
                fillOpacity="0.7" 
              />
              <path 
                d="M16.9593 10.3398L12.6533 6.03389C12.3842 5.76474 11.9483 5.76474 11.6791 6.03389C11.41 6.30259 11.41 6.73938 11.6791 7.00807L14.852 10.1809H7.51879C7.13803 10.1809 6.82983 10.4896 6.82983 10.8699C6.82983 11.2502 7.13803 11.5588 7.51879 11.5588H14.8525L11.6796 14.7317C11.4105 15.0008 11.4105 15.4367 11.6796 15.7059C11.8142 15.8404 11.9905 15.9075 12.1669 15.9075C12.3433 15.9075 12.5197 15.8404 12.6542 15.7059L16.9602 11.3999C17.1058 11.2543 17.166 11.0605 17.1536 10.8699C17.165 10.6793 17.1053 10.4854 16.9593 10.3398Z" 
                fill="#F7F8F8" 
                fillOpacity="0.7" 
              />
            </svg>
            {!collapsed && "Logout"}
          </button>
        </div>
      </div>

      {/* Background Effect */}
      <div className="opacity-[0.3] blur-[200px] absolute left-[-50px] top-[30%] -translate-y-1/2 h-[250px] w-[300px] rounded-full z-[-1] bg-[#75DA5B]"></div>
    </div>
  );
}