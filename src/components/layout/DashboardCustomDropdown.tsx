"use client";

import { useState, useRef, useEffect } from "react";

export interface DropdownOption {
    value: string;
    label: string;
    icon?: React.ReactNode; // Optional icon for each option
}

interface CustomDropdownProps {
    options: DropdownOption[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    dropdownClassName?: string;
    showIndicator?: boolean; // For status indicators
    getIndicatorColor?: (value: string) => string; // Function to get indicator color
    disabled?: boolean;
    error?: boolean;
    errorMessage?: string;
}

export default function CustomDropdown({
    options,
    value,
    onChange,
    placeholder = "Select",
    className = "",
    dropdownClassName = "",
    showIndicator = false,
    getIndicatorColor,
    disabled = false,
    error = false,
    errorMessage = "",
}: CustomDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(opt => opt.value === value);

    // Handle click outside to close dropdown
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Handle keyboard navigation
    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (!isOpen || disabled) return;

            const currentIndex = options.findIndex(opt => opt.value === value);
            let newIndex = currentIndex;

            switch (event.key) {
                case 'ArrowDown':
                    event.preventDefault();
                    newIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0;
                    break;
                case 'ArrowUp':
                    event.preventDefault();
                    newIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
                    break;
                case 'Enter':
                case ' ':
                    event.preventDefault();
                    if (currentIndex >= 0) {
                        onChange(options[currentIndex].value);
                        setIsOpen(false);
                    }
                    break;
                case 'Escape':
                    setIsOpen(false);
                    break;
                default:
                    break;
            }

            if (newIndex !== currentIndex && newIndex >= 0 && newIndex < options.length) {
                onChange(options[newIndex].value);
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            return () => document.removeEventListener('keydown', handleKeyDown);
        }
    }, [isOpen, value, options, onChange, disabled]);

    const baseClasses = "w-full border placeholder:text-[#F7F8F8B2] border-[#F7F8F81C] rounded-[7px] text-[#F7F8F8B2] text-sm px-4 py-3 flex items-center justify-between focus-visible:outline-0 transition-colors";
    const stateClasses = disabled 
        ? "opacity-50 cursor-not-allowed" 
        : "cursor-pointer hover:bg-[#F7F8F80A]";
    const errorClasses = error ? "border-red-500" : "";

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                className={`${baseClasses} ${stateClasses} ${errorClasses} ${className}`}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-label={placeholder}
            >
                <div className="flex items-center gap-2 overflow-hidden">
                    {showIndicator && selectedOption && getIndicatorColor && (
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${getIndicatorColor(selectedOption.value)}`}></span>
                    )}
                    {selectedOption?.icon && (
                        <span className="flex-shrink-0">{selectedOption.icon}</span>
                    )}
                    <span className={`truncate ${selectedOption ? "text-[#F7F8F8]" : "text-[#F7F8F8B2]"}`}>
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>
                </div>
                <svg
                    className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            
            {error && errorMessage && (
                <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
            )}
            
            {isOpen && !disabled && (
                <div className={`absolute z-50 w-full mt-1 border border-[#F7F8F81C] bg-[#F7F8F81C] backdrop-blur-[20px] rounded-[7px] shadow-lg max-h-60 overflow-auto ${dropdownClassName}`}>
                    {options.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                                onChange(option.value);
                                setIsOpen(false);
                            }}
                            className={`w-full text-left px-4 py-3 text-sm hover:bg-[#F7F8F815] transition-colors flex items-center gap-2
                                ${value === option.value ? "bg-[#F7F8F815] text-[#F7F8F8B2]" : "text-[#F7F8F8B2]"}`}
                            role="option"
                            aria-selected={value === option.value}
                        >
                            {showIndicator && getIndicatorColor && (
                                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${getIndicatorColor(option.value)}`}></span>
                            )}
                            {option.icon && (
                                <span className="flex-shrink-0">{option.icon}</span>
                            )}
                            <span className="truncate">{option.label}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}