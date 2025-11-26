"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { ReactNode } from "react";

interface DashboardNavLinkProps {
  href: string;
  children: ReactNode;
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

function DashboardNavLink({ href, children, collapsed, setCollapsed }: DashboardNavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={() => {
        if (window.innerWidth < 768) {
          setCollapsed(!collapsed);
        }
      }}
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
}

export default DashboardNavLink;