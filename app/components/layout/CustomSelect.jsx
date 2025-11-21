"use client"

import { useState, useRef, useEffect } from "react";

export default function CustomSelect({ options = [], value, onChange, placeholder = "Select option" }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => { 
        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    return (
        <div ref={ref} className="relative w-full min-w-[250px]">
            <button
                onClick={() => setOpen(!open)}
                className="w-full border text-sm border-[#F7F8F81C] text-[#F7F8F8B2] bg-[#F7F8F80A] px-4 py-[10px] rounded-[7px] flex gap-[20px] justify-between items-center"
            >
                <span>{value?.label || placeholder}</span>

                <svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg"
                className={`duration-300 ${open ? 'rotate-180' : 'rotate-0'}`}>
                    <path d="M5.5 6L5.15373 5.67464L0 0.807034L0.692533 -4.76837e-07L5.5 4.54225L10.3075 -4.76837e-07L11 0.807034L5.84627 5.67464L5.5 6Z" fill="#F7F8F8" fillOpacity="0.7" />
                </svg>
            </button>

            {open && (
                <div className="absolute z-20 mt-1 w-full backdrop-blur-[50px] text-[#F7F8F8B2] border border-[#F7F8F81C] rounded-lg shadow-lg max-h-60 overflow-y-auto animate-fadeIn">
                    {options.map((opt) => (
                        <div
                            key={opt.value}
                            onClick={() => {
                                onChange(opt);
                                setOpen(false);
                            }}
                            className="px-4 py-2 cursor-pointer text-sm hover:text-[#fff] duration-300"
                        >
                            {opt.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
