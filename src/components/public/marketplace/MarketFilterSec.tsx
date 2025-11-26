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
  const prices: string[] = ["₹0–₹500", "₹500–₹1000", "₹1000–₹2000", "₹2000+"];
  const sets: string[] = [
    "Base Set",
    "Jungle",
    "Fossil",
    "Team Rocket",
    "Neo Genesis",
  ];

  const languages: string[] = [
    "English",
    "Japanese",
    "Korean",
    "German",
    "French",
    "Spanish",
  ];

  const titleSubject: string[] = [
    "Character",
    "Trainer",
    "Item",
    "Energy",
    "Scene",
  ];

  const titlePKMN: string[] = [
    "Pikachu",
    "Charizard",
    "Mewtwo",
    "Eevee",
    "Bulbasaur",
    "Squirtle",
  ];

  const events: string[] = [
    "Promo Event",
    "Tournament",
    "Exclusive Release",
    "Anniversary",
  ];

  const variants: string[] = [
    "Normal",
    "Holo",
    "Reverse Holo",
    "Full Art",
    "Alternate Art",
  ];

  const tags: string[] = [
    "Rare",
    "Ultra Rare",
    "Vintage",
    "First Edition",
    "Graded",
  ];


  const crds = [
    {
      "title": "2021 Sample Card 1",
      "price": "$299",
      "image": "/img/market-card1.png",
    },
    {
      "title": "2021 Sample Card 2",
      "price": "$299",
     "image": "/img/market-card2.png",
    },
    {
      "title": "2021 Sample Card 3",
      "price": "$299",
      "image": "/img/market-card3.png",
    },
    {
      "title": "2021 Sample Card 4",
      "price": "$299",
     "image": "/img/market-card4.png",
    },
    {
      "title": "2021 Sample Card 5",
      "price": "$299",
      "image": "/img/market-card5.png",
    },
    {
      "title": "2021 Sample Card 6",
      "price": "$299",
      "image": "/img/market-card6.png",
    },
    {
      "title": "2021 Sample Card 7",
      "price": "$299",
     "image": "/img/market-card7.png",
    },
    {
      "title": "2021 Sample Card 8",
      "price": "$299",
     "image": "/img/market-card8.png",
    },
    {
      "title": "2021 Sample Card 9",
      "price": "$299",
      "image": "/img/market-card9.png",
    },
    {
      "title": "2021 Sample Card 10",
      "price": "$299",
      "image": "/img/market-card10.png",
    },
    {
      "title": "2021 Sample Card 11",
      "price": "$299",
      "image": "/img/market-card11.png",
    },
    {
      "title": "2021 Sample Card 12",
      "price": "$299",
      "image": "/img/market-card12.png",
    }
  ]

  return (
    <div className="text-white pt-[16px]">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* SIDEBAR */}
          <aside className="col-span-4 pe-[30px] border-r border-[#E6E6E6] dark:border-[#343434] me-[30px]">
            <div>
              <h2 className="text-[24px] md:text-[28px] lg:text-[32px] font-semibold text-left mb-[13px] text-black dark:text-white">
                Filter By:
              </h2>
              {/* ------ Price ------ */}
              <FilterDropdown title="Price">
                <div className="flex flex-col gap-2">
                  {prices.map((p) => (
                    <label key={p} className="flex items-center gap-2 text-[16px] text-black dark:text-white">
                      <input type="checkbox" className="accent-[#000] dark:accent-[#fff]" />
                      <span>{p}</span>
                    </label>
                  ))}
                </div>
              </FilterDropdown>

              {/* ------ Category ------ */}
              <FilterDropdown title="Category">
                <div className="flex flex-col gap-2">
                  {categories.map((c) => (
                    <label
                      key={c.name}
                      className="flex items-center justify-between text-sm cursor-pointer text-black dark:text-white "
                    >
                      <div className="flex items-center gap-[10px] ">
                        <input
                          type="checkbox"
                          className="accent-[#000] dark:accent-[#fff] w-[16px] h-[16px]"
                        />
                        <span className="opacity-80 group-hover:opacity-100 transition text-[16px] font-normal">
                          {c.name}
                        </span>
                      </div>

                      <span className="text-xs opacity-40  transition text-[16px] font-normal">
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
                    <label key={g} className="flex items-center gap-2 text-[16px] text-black dark:text-white">
                      <input type="checkbox" className="accent-[#000] dark:accent-[#fff]" />
                      <span>{g}</span>
                    </label>
                  ))}
                </div>
              </FilterDropdown>


              {/* ------ Grade ------ */}
              <FilterDropdown title="Grade">
                <div className="flex flex-col gap-2 mt-[20px]">
                  {grades.map((g) => (
                    <label key={g} className="flex items-center gap-2 text-[16px] text-black dark:text-white">
                      <input type="checkbox" className="accent-[#000] dark:accent-[#fff]" />
                      <span>{g}</span>
                    </label>
                  ))}
                </div>
              </FilterDropdown>


              {/* ------ Year ------ */}
              <FilterDropdown title="Year">
                <div className="flex flex-col gap-2">
                  {years.map((y) => (
                    <label key={y} className="flex items-center gap-2 text-[16px] text-black dark:text-white">
                      <input type="checkbox" className="accent-[#000] dark:accent-[#fff]" />
                      <span>{y}</span>
                    </label>
                  ))}
                </div>
              </FilterDropdown>


              {/* ------ Set ------ */}
              <FilterDropdown title="Set">
                <div className="flex flex-col gap-2">
                  {sets.map((s) => (
                    <label key={s} className="flex items-center gap-2 text-[16px] text-black dark:text-white">
                      <input type="checkbox" className="accent-[#000] dark:accent-[#fff]" />
                      <span>{s}</span>
                    </label>
                  ))}
                </div>
              </FilterDropdown>

              {/* ------ LAnguage ------ */}
              <FilterDropdown title="Language">
                <div className="flex flex-col gap-2">
                  {languages.map((l) => (
                    <label key={l} className="flex items-center gap-2 text-[16px] text-black dark:text-white">
                      <input type="checkbox" className="accent-[#000] dark:accent-[#fff]" />
                      <span>{l}</span>
                    </label>
                  ))}
                </div>
              </FilterDropdown>


              {/* ------ title/subject ------ */}
              <FilterDropdown title="Title/Subject">
                <div className="flex flex-col gap-2">
                  {titleSubject.map((t) => (
                    <label key={t} className="flex items-center gap-2 text-[16px] text-black dark:text-white">
                      <input type="checkbox" className="accent-[#000] dark:accent-[#fff]" />
                      <span>{t}</span>
                    </label>
                  ))}
                </div>
              </FilterDropdown>


              {/* ------ title/PKMN ------ */}
              <FilterDropdown title="Title/PKMN">
                <div className="flex flex-col gap-2">
                  {titlePKMN.map((p) => (
                    <label key={p} className="flex items-center gap-2 text-[16px] text-black dark:text-white">
                      <input type="checkbox" className="accent-[#000] dark:accent-[#fff]" />
                      <span>{p}</span>
                    </label>
                  ))}
                </div>
              </FilterDropdown>


              {/* ------ Events  ------ */}
              <FilterDropdown title="Event">
                <div className="flex flex-col gap-2">
                  {events.map((e) => (
                    <label key={e} className="flex items-center gap-2 text-[16px] text-black dark:text-white">
                      <input type="checkbox" className="accent-[#000] dark:accent-[#fff]" />
                      <span>{e}</span>
                    </label>
                  ))}
                </div>
              </FilterDropdown>


              {/* ------ variants  ------ */}
              <FilterDropdown title="Variant">
                <div className="flex flex-col gap-2">
                  {variants.map((v) => (
                    <label key={v} className="flex items-center gap-2 text-[16px] text-black dark:text-white">
                      <input type="checkbox" className="accent-[#000] dark:accent-[#fff]" />
                      <span>{v}</span>
                    </label>
                  ))}
                </div>
              </FilterDropdown>


              {/* ------ TAgs  ------ */}
              <FilterDropdown title="Tags">
                <div className="flex flex-col gap-2">
                  {tags.map((t) => (
                    <label key={t} className="flex items-center gap-2 text-[16px] text-black dark:text-white">
                      <input type="checkbox" className="accent-[#000] dark:accent-[#fff]" />
                      <span>{t}</span>
                    </label>
                  ))}
                </div>
              </FilterDropdown>





              {/* Clear filters */}
              <button className=" mt-[50px] py-[14px] px-[33px] text-[16px] font-normal bg-[#EFB24D] text-black  rounded-md font-semibold hover:bg-[#dca345] transition">
                Clear Filters
              </button>
            </div>
          </aside>

          {/* PRODUCTS GRID */}
          <main className="md:col-span-9 lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-[20px]">
              {crds.map((item, index) => (
                <article
                  key={index}
                  className="group border px-[20px] pb-[20px] pt-[40px] rounded-[14px] 
               border-[#E6E6E6] dark:border-[#1E1E1E] bg-transparent dark:bg-[#0D0D0D]
               hover:shadow-lg hover:scale-[1.01] transition-transform"
                >

                  {/* Image */}
                  <div className="w-full h-[180px] flex items-center justify-center overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={108}
                      height={180}
                      className="object-contain"
                    />
                  </div>

                  {/* Title & Price */}
                  <div className="mt-[40px]">
                    <h4 className="text-[16px] font-medium text-black dark:text-white">
                      {item.title}
                    </h4>
                    <p className="text-[15px] font-normal opacity-70 mt-1 text-[#6C6C6C]">
                      {item.price}
                    </p>
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

            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
