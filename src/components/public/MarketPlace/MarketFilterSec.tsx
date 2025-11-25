"use client";

import React from "react";
import Image from "next/image";
import FilterDropdown from "./Filterdropdown";

const HERO_IMAGE = "/mnt/data/21d5008a-d5dd-4005-a4a2-afbb03982848.png";

// ------- Types ---------

interface Category {
  name: string;
  count: number;
}

interface Product {
  id: number;
  title: string;
  price: string;
  image: string;
}

export default function ProductsFilter() {
  const categories: Category[] = [
    { name: "Pokémon", count: 72552 },
    { name: "Basketball", count: 18820 },
    { name: "Baseball", count: 16940 },
  ];

  const graders: string[] = ["PSA", "BGS", "SGC", "CGC"];
  const grades: string[] = ["10", "9.5", "9", "8.5", "8"];
  const years: string[] = ["2024", "2023", "2022", "2021"];

  const products: Product[] = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `2021 Sample Card ${i + 1}`,
    price: "$299",
    image: HERO_IMAGE,
  }));

  return (
    <div className="text-white pt-[16px]">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* SIDEBAR */}
          <aside className="col-span-4 pe-[30px] border-r border-[#343434] me-[30px]">
            <div className="sticky top-6 space-y-6">
              <h2 className="text-[24px] md:text-[28px] lg:text-[32px] font-semibold text-left mb-[13px]">
                Filter By:
              </h2>

              {/* ------ Category ------ */}
              <FilterDropdown title="Category">
                <div className="flex flex-col gap-2">
                  {categories.map((c) => (
                    <label
                      key={c.name}
                      className="flex items-center justify-between text-sm cursor-pointer group mb-[17px]"
                    >
                      <div className="flex items-center gap-[10px]">
                        <input
                          type="checkbox"
                          className="accent-[#fff] w-[16px] h-[16px]"
                        />
                        <span className="opacity-80 group-hover:opacity-100 transition text-[16px] font-normal">
                          {c.name}
                        </span>
                      </div>

                      <span className="text-xs opacity-40 group-hover:opacity-60 transition text-[16px] font-normal">
                        ({c.count})
                      </span>
                    </label>
                  ))}
                </div>
              </FilterDropdown>

              {/* ------ Grader ------ */}
              <FilterDropdown title="Grader">
                <div className="flex flex-col gap-2">
                  {graders.map((g) => (
                    <label key={g} className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="accent-[#EFB24D]" />
                      <span>{g}</span>
                    </label>
                  ))}
                </div>
              </FilterDropdown>

              {/* ------ Grade ------ */}
              <FilterDropdown title="Grade">
                <div className="flex flex-col gap-2">
                  {grades.map((g) => (
                    <label key={g} className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="accent-[#EFB24D]" />
                      <span>{g}</span>
                    </label>
                  ))}
                </div>
              </FilterDropdown>

              {/* ------ Year ------ */}
              <FilterDropdown title="Year">
                <div className="flex flex-col gap-2">
                  {years.map((y) => (
                    <label key={y} className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="accent-[#EFB24D]" />
                      <span>{y}</span>
                    </label>
                  ))}
                </div>
              </FilterDropdown>

              {/* Clear filters */}
              <button className="mt-5 w-full bg-[#EFB24D] text-black py-2 rounded-md font-semibold hover:bg-[#dca345] transition">
                Clear Filters
              </button>
            </div>
          </aside>

          {/* PRODUCTS GRID */}
          <main className="md:col-span-9 lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-[20px]">
              {products.map((p) => (
                <article
                  key={p.id}
                  className="group bg-black/50 rounded-xl border border-white/6 p-3 hover:shadow-lg hover:scale-[1.01] transition-transform"
                >
                  <div className="w-full h-[200px] rounded-lg overflow-hidden bg-gradient-to-b from-[#0b0b0b] to-[#1b0b07] relative">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold">{p.title}</h4>
                      <p className="text-xs opacity-70 mt-1">{p.price}</p>
                    </div>

                    <div className="flex flex-col items-end">
                      <div className="text-xs opacity-60">PWR</div>
                      <div className="mt-2 w-8 h-8 rounded-full bg-[#0b0b0b] border border-white/10 flex items-center justify-center text-xs">
                        PG
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* PAGINATION */}
            <div className="flex items-center justify-between mt-8">
              <div className="flex items-center gap-3">
                <button className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center">
                  ◀
                </button>
                <button className="w-8 h-8 rounded-full bg-[#EFB24D] text-black flex items-center justify-center">
                  1
                </button>
                <button className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center">
                  2
                </button>
                <button className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center">
                  3
                </button>
                <button className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center">
                  ▶
                </button>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-[#13ce6b]" />
                <div className="w-3 h-3 rounded-full bg-[#13ce6b]" />
                <div className="w-3 h-3 rounded-full bg-[#13ce6b]" />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
