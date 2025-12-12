"use client";
import { useState } from "react";

interface PriceRangeFilterProps {
  onPriceChange?: (min: number | null, max: number | null) => void;
}

export default function PriceRangeFilter({ onPriceChange }: PriceRangeFilterProps) {
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleApply = () => {
    const min = minPrice ? parseFloat(minPrice) : null;
    const max = maxPrice ? parseFloat(maxPrice) : null;

    // Validation
    if (min !== null && max !== null && min > max) {
      setError("Min price cannot be greater than max price");
      return;
    }

    if (min !== null && min < 0) {
      setError("Price cannot be negative");
      return;
    }

    if (max !== null && max < 0) {
      setError("Price cannot be negative");
      return;
    }

    setError("");
    onPriceChange?.(min, max);
  };

  const handleReset = () => {
    setMinPrice("");
    setMaxPrice("");
    setError("");
    onPriceChange?.(null, null);
  };

  return (
    <div className="flex flex-col mt-[10px] gap-3">
      {/* Input Fields */}
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <label className="block text-[14px] text-gray-600 dark:text-gray-400 mb-1">
            Min Price
          </label>
          <input
            type="number"
            placeholder="0"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full px-3 py-2 border border-[#E6E6E6] dark:border-[#343434] 
                     rounded-md bg-transparent text-black dark:text-white
                     focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white
                     placeholder:text-gray-400 dark:placeholder:text-gray-600"
            min="0"
            step="0.01"
          />
        </div>

        <span className="text-gray-400 mt-6">—</span>

        <div className="flex-1">
          <label className="block text-[14px] text-gray-600 dark:text-gray-400 mb-1">
            Max Price
          </label>
          <input
            type="number"
            placeholder="Any"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full px-3 py-2 border border-[#E6E6E6] dark:border-[#343434] 
                     rounded-md bg-transparent text-black dark:text-white
                     focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white
                     placeholder:text-gray-400 dark:placeholder:text-gray-600"
            min="0"
            step="0.01"
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-[14px] mt-1">{error}</p>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2 mt-2">
        <button
          onClick={handleApply}
          className="flex-1 px-4 py-2 bg-black dark:bg-white text-white dark:text-black
                   rounded-md font-medium hover:opacity-80 transition-opacity"
        >
          Apply
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 border border-[#E6E6E6] dark:border-[#343434] 
                   text-black dark:text-white rounded-md font-medium
                   hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Quick Price Ranges (Optional) */}
      <div className="mt-3 pt-3 border-t border-[#E6E6E6] dark:border-[#343434]">
        <p className="text-[14px] text-gray-600 dark:text-gray-400 mb-2">Quick Select:</p>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "Under $50", min: 0, max: 50 },
            { label: "$50 - $100", min: 50, max: 100 },
            { label: "$100 - $200", min: 100, max: 200 },
            { label: "Over $200", min: 200, max: null },
          ].map((range) => (
            <button
              key={range.label}
              onClick={() => {
                setMinPrice(range.min.toString());
                setMaxPrice(range.max?.toString() || "");
                setError("");
              }}
              className="px-3 py-1.5 text-[14px] border border-[#E6E6E6] dark:border-[#343434]
                       rounded-full hover:bg-black hover:text-white dark:hover:bg-white 
                       dark:hover:text-black transition-colors"
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}