"use client";
import { useState } from "react";
 import Image from 'next/image';

export default function LanguageDropdown() {
  const [lang, setLang] = useState("en");

  const handleChange = (e) => {
    setLang(e.target.value);
  };

  return (
    <div className="flex items-center gap-1">
      <Image src="/img/flag1.png" alt="Flag" width={29} height={29} className="md:h-[30px] md:w-[30px] h-[20px] w-[20px] object-cover"/>
      <select
        value={lang}
        onChange={handleChange}
        className="bg-transparent dark:bg-black/30 text-black dark:text-white rounded-md cursor-pointer focus:outline-none text-sm md:text-base">
        <option value="en" className="text-black dark:text-white bg-white dark:bg-black">EN</option>
        <option value="hi" className="text-black dark:text-white bg-white dark:bg-black">HI</option>
        <option value="fr" className="text-black dark:text-white bg-white dark:bg-black">FR</option>
      </select>
    </div>
  );
}