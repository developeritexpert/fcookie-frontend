"use client";
import { useState, ReactNode } from "react";
import { IoChevronDown } from "react-icons/io5";

interface FilterDropdownProps {
  title: string;
  children: ReactNode;
}

export default function FilterDropdown({ title, children }: FilterDropdownProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="w-full bg-transparent border-b border-[#E6E6E6] dark:border-[#343434] py-[30px] !m-0">
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between mb-[10px] text-left text-black dark:text-white"
      >
        <span className="text-[20px] font-medium">{title}</span>

        <IoChevronDown
          className={` transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Content */}
      {open && <div className="mt-1 pl-1">{children}</div>}
    </div>
  );
}
