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
      className="border-none text-white p-2 rounded">
      <option className="text-black" value="en">English</option>
      <option className="text-black" value="hi">Hindi</option>
      <option className="text-black" value="fr">French</option>
    </select>
  );
}