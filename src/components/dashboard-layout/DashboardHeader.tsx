"use client";

import React from "react";
import Image from "next/image";
import LanguageDropdown from "@/components/layout/LanguageDropdown";

interface DashboardHeaderProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  collapsed,
  setCollapsed,
}) => {
  return (
    <header className="h-[60px] py-[10px] bg-[#F7F8F80A] flex items-center justify-between px-4 border-b border-[#444444] dark:text-[#F7F8F8]">
      <div className="flex items-center gap-[10px] md:gap-[20px]">
        <button onClick={() => setCollapsed(!collapsed)} className="p-2">
          <Image
            src="/icons/toggle.png"
            alt="Toggle Sidebar"
            width={30}
            height={30}
            className="w-[20px]"
          />
        </button>
        <p className="text-sm md:text-base">Hello, John Doe!</p>
      </div>

      <div className="flex items-center gap-[15px] md:gap-[20px]">
        <LanguageDropdown />

        <div className="relative">
          {/* Bell Icon */}
          <svg
            width="20"
            height="24"
            viewBox="0 0 20 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[15px] md:w-[20px]"
          >
            <path
              d="M9.84814 23.0858C11.7276 23.0858 13.3612 21.8157 13.8233 19.9957C13.9003 19.693 13.7165 19.385 13.4139 19.3066C13.1112 19.2296 12.8018 19.4134 12.7248 19.716C12.391 21.032 11.2074 21.9508 9.84814 21.9508C8.48887 21.9508 7.30525 21.032 6.97151 19.716C6.8945 19.4134 6.58643 19.2296 6.28242 19.3066C5.97976 19.3836 5.796 19.6917 5.87301 19.9957C6.33511 21.8157 7.97002 23.0858 9.84814 23.0858Z"
              fill="#F7F8F8"
            />
            <path
              d="M9.84831 0C6.18801 0 3.21139 2.97797 3.21139 6.63692V13.5549L0.0996601 18.0813C-0.0192424 18.2542 -0.032754 18.4799 0.0645298 18.6663C0.161814 18.8528 0.355031 18.969 0.565812 18.969H19.1308C19.3416 18.969 19.5348 18.8528 19.6321 18.6663C19.7294 18.4799 19.7172 18.2556 19.597 18.0813L16.4852 13.5549V6.63692C16.4852 2.97662 13.5086 0 9.84831 0ZM18.0539 17.8367H1.64269L4.24503 14.0521C4.30989 13.9575 4.34502 13.8454 4.34502 13.7319V6.63827C4.34502 3.60356 6.81495 1.13363 9.84967 1.13363C12.8844 1.13363 15.3543 3.60356 15.3543 6.63827V13.7319C15.3543 13.8467 15.3894 13.9589 15.4543 14.0521L18.0539 17.8367Z"
              fill="#F7F8F8"
            />
          </svg>

          <span className="text-xs font-semibold absolute top-[-5px] right-[-5px] rounded-full h-[17px] w-[17px] p-1 flex items-center justify-center text-[#EFB24D] bg-[#F7F8F8]">
            6
          </span>
        </div>

        <div className="">
          <Image
            src="/img/user.png"
            alt="User"
            width={100}
            height={100}
            className="w-[30px] h-[30px] md:w-[35px] md:h-[35px] object-cover rounded-full"
          />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
