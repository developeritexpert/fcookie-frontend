"use client";
import { useState } from "react";
import Image from "next/image";
import { IoChevronDown } from "react-icons/io5";

export default function LanguageDropdown() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("en");

  type Lang = {
    code: string;
    label: string;
    flag: string;
  };

  const languages: Lang[] = [
    { code: "en", label: "EN", flag: "/img/flag1.png" },
    { code: "hi", label: "HI", flag: "/img/flag2.png" },
    { code: "fr", label: "FR", flag: "/img/flag3.png" },
  ];

  const selected = languages.find((l) => l.code === lang) ?? languages[0];

  return (
    <div className="relative flex items-center">
      <div className="inline-block">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 bg-transparent text-black dark:text-white px-2 py-1 rounded-md"
        >
          <Image
            src={selected.flag}
            width={100}
            height={100}
            alt="flag"
            className="w-[22px] h-[22px] sm:w-[29px] sm:h-[29px] rounded-full object-cover"
          />

          <span className="text-[14px] font-semibold">{selected.label}</span>

          <IoChevronDown
            className={`transition-transform duration-600 text-black dark:text-white ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown */}
        {open && (
          <div
            className="absolute left-0 mt-1 w-full bg-white dark:bg-[#FFFFFF12] border border-[#444444] backdrop-blur-[20px] text-black dark:text-white rounded-md z-50 py-2 shadow-xl"
          >
            {languages.map((item) => (
              <div
                key={item.code}
                onClick={() => {
                  setLang(item.code);
                  setOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-black/10 dark:hover:bg-white/20"
              >
                <Image
                  src={item.flag}
                  width={100}
                  height={100}
                  alt={item.label}
                  className="w-[22px] h-[22px] sm:w-[29px] sm:h-[29px] rounded-full object-cover"
                />
                <span className="text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}