"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { ReactNode } from "react";

interface AdminDashboardNavLinkProps {
  href: string;
  children: ReactNode;
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  matchType?: "exact" | "startsWith" | "contains";
  matchPatterns?: string[];
}

const AdminDashboardNavLink: React.FC<AdminDashboardNavLinkProps> = ({
  href,
  children,
  collapsed,
  setCollapsed,
  matchType = "startsWith", // Default to match child routes
  matchPatterns = [],
}) => {
  const pathname = usePathname();
  
  // Check if active based on match type
  let isActive = false;
  
  switch (matchType) {
    case "exact":
      isActive = pathname === href;
      break;
      
    case "contains":
      isActive = pathname.includes(href);
      break;
      
    case "startsWith":
    default:
      // Default behavior: match exact or starts with href + "/"
      isActive = pathname === href || pathname.startsWith(href + "/");
      break;
  }
  
  // Also check additional match patterns if provided
  if (!isActive && matchPatterns.length > 0) {
    isActive = matchPatterns.some(pattern => 
      pathname === pattern || pathname.startsWith(pattern + "/")
    );
  }

  const handleClick = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setCollapsed(!collapsed);
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={clsx(
        "flex items-center gap-[10px] text-sm py-[10px] pl-[20px] pr-[30px] whitespace-nowrap rounded-l-full duration-100 cursor-pointer group relative",
        "bg-gradient-to-r from-[#75DA5B00] to-[#4DCE9400] hover:from-[#75DA5B] hover:to-[#4DCE94] hover:text-black font-medium",

        isActive
          ? "bg-gradient-to-r from-[#75DA5B] to-[#4DCE94] text-black font-medium"
          : "text-white",

        collapsed ? "md:text-[0px] text-base" : "text-base"
      )}
    >
      {children}
    </Link>
  );
};

export default AdminDashboardNavLink;
