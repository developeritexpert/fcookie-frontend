"use client";
import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";

export default function FilterDropdown({ title, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full bg-transparent border-b border-[#343434] py-[30px] ">
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between mb-[20px] text-left"
      >
        <span className="text-[20px] font-medium">{title}</span>

        <IoChevronDown
          className={`text-white/70 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Content */}
      {open && <div className="mt-1 pl-1">{children}</div>}
    </div>
  );
}
