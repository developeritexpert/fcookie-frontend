"use client";
import { useState } from "react";

export default function LanguageDropdown() {
  const [lang, setLang] = useState("en");

  const handleChange = (e) => {
    setLang(e.target.value);
  };

  return (
    <select
      value={lang}
      onChange={handleChange}
      className=" p-2 bg-transparent border-none focus-visible:outline-none">
      <option className="text-black" value="en">EN</option>
      <option className="text-black" value="hi">HI</option>
      <option className="text-black" value="fr">FR</option>
    </select>
  );
}