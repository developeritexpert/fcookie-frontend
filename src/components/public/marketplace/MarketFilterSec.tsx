"use client";

import React, { useState } from "react";
import Image from "next/image";
import FilterDropdown from "./Filterdropdown";
import { IoGridOutline } from "react-icons/io5";

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
  const [viewType, setViewType] = useState("grid");
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      "title": "2024 Bowman Draft Chrome Prospect Autograph Orange ",
      "price": "$2,690",
      "image": "/img/market-card1.png",
    },
    {
      "title": "2023 Panini Select Concourse Teal White Pink Prizm",
      "price": "$975",
      "image": "/img/market-card2.png",
    },
    {
      "title": "2021 Panini Contenders Optic Splitting Image Gold",
      "price": "$3,000",
      "image": "/img/market-card3.png",
    },
    {
      "title": "2022 Panini Select Signature Neon Purple Pulsar Fotl Prizm",
      "price": "$550",
      "image": "/img/market-card4.png",
    },
    {
      "title": "2020 Panini Prizm Green Shimmer",
      "price": "$145",
      "image": "/img/market-card5.png",
    },
    {
      "title": "2024 Panini Select Zebra Shock",
      "price": "$150",
      "image": "/img/market-card6.png",
    },
    {
      "title": "2023 Panini Prizm Black and White Checker",
      "price": "$86",
      "image": "/img/market-card7.png",
    },
    {
      "title": "2024 Donruss Optic Rated Rookie Preview Pink",
      "price": "$50",
      "image": "/img/market-card8.png",
    },
    {
      "title": "2021 Donruss Optic Rated Rookie Blue Scope",
      "price": "$50",
      "image": "/img/market-card9.png",
    },
    {
      "title": "2022 Absolute",
      "price": "$40",
      "image": "/img/market-card10.png",
    },
    {
      "title": "2024 Optic Hash Marks",
      "price": "$40",
      "image": "/img/market-card11.png",
    },
    {
      "title": "2023 Panini Prizm Portait Variation Silver Prizm",
      "price": "$45",
      "image": "/img/market-card12.png",
    }
  ]

  return (
    <div className="text-white pt-[16px]  px-[20px] md:px-[30px] lg:px-[50px] ">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 md:gap-4 lg:gap-8">
          {/* SIDEBAR */}

          <aside className="md:col-span-4 hidden md:block  pe-[15px] lg:pe-[30px] border-r border-[#E6E6E6] dark:border-[#343434]  me:-[15px] lg:me-[30px]">
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



          {/* MOBILE TOGGLE BUTTON */}
          <div className="relative md:hidden">

            {/* FIXED FILTER BUTTON */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="fixed left-4 bottom-4 z-30 bg-white dark:bg-[#0D0D0D] text-black dark:text-white
               px-6 py-2 rounded-md shadow-lg border border-[#E6E6E6] dark:border-[#343434]">
              Filter
            </button>


            {/* OVERLAY */}
            {sidebarOpen && (
              <div
                onClick={() => setSidebarOpen(false)}
                className="fixed inset-0 bg-black/20 dark:bg-white/10 backdrop-blur-sm z-30"
              />
            )}

            {/* SIDEBAR */}
            <div
              className={`
          fixed top-0 left-0 h-full w-full sm:w-[70%] bg-white dark:bg-[#0D0D0D] border-r border-[#E6E6E6] dark:border-[#343434]
          z-40 p-6 overflow-y-scroll transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute right-4 top-4 text-black dark:text-white text-xl">
                ✕
              </button>

              <div className="mt-12">

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
            </div>
          </div>

          {/* PRODUCTS GRID */}

          <main className="col-span-full md:col-span-8 pb-[50px]  md:pb-[80px] lg:pb-[120px]">

            {/* topbar  */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 justify-between w-full py-4">

              <div className="flex items-center gap-2">

                {/* GRID Button */}
                {/* GRID Button */}
                <button
                  onClick={() => setViewType("grid")}
                  className={`p-2 border rounded-[1px] h-[46px] w-[46px] flex justify-center items-center
    ${viewType === "grid"
                      ? "bg-white border-[#E6E6E6]"
                      : "bg-[#0D0D0D] border-[#E6E6E6] dark:border-[#343434]"
                    }`}
                >
                  <IoGridOutline
                    size={20}
                    className={`transition-all
                     ${viewType === "grid"
                        ? "text-black"                   // active → black
                        : "text-white"                   // inactive → white on dark bg
                      }
  `}
                  />
                </button>

                {/* LIST Button */}
                <button
                  onClick={() => setViewType("list")}
                  className={`p-2 border rounded-[1px] h-[46px] w-[46px] flex justify-center items-center
                     ${viewType === "list"
                      ? "bg-white border-[#E6E6E6]"
                      : "bg-[#0D0D0D] border-[#E6E6E6] dark:border-[#343434]"
                    }`}
                >
                  <Image
                    src="/img/list-img.png"
                    alt=""
                    width={26}
                    height={16}
                    className={`transition-all
                      ${viewType === "list"
                        ? "filter-none"             // active → black
                        : "filter invert brightness-0 saturate-0" // inactive → white
                      }
    `}
                  />
                </button>
                {/* Select Box */}
                <div className="relative inline-block">
                  <select
                    className="appearance-none border border-[#E6E6E6] dark:border-[#343434] 
        rounded px-[19px] py-[12px] bg-transparent dark:bg-[#0D0D0D]
        text-black dark:text-white pr-10 cursor-pointer focus:outline-none 
        text-[14px] font-medium"
                  >
                    <option>Default Sorting</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest</option>
                  </select>

                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                    <svg
                      width="14"
                      height="14"
                      fill="none"
                      className="stroke-black dark:stroke-white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 5l4 4 4-4" />
                    </svg>
                  </span>
                </div>
              </div>

              <p className="text-[18px] font-medium text-black dark:text-white">
                Showing <span>1–12</span> of 236 Products
              </p>
            </div>


            <div
              className={
                viewType === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-[20px]"
                  : "flex flex-col gap-[20px]"
              }
            >
              {crds.map((item, index) => (
                <article
                  key={index}
                  className={`group border rounded-[14px] px-[10px] py-[20px] 
        border-[#E6E6E6] dark:border-[#1E1E1E] bg-transparent dark:bg-[#0D0D0D]
        hover:shadow-lg hover:scale-[1.01] transition-transform
        
        ${viewType === "list" ? "flex gap-5 items-center" : ""}
      `}
                >
                  {/* Image */}
                  <div
                    className={
                      viewType === "list"
                        ? "w-[120px] h-[190px] flex items-center justify-center"
                        : "w-full h-[180px] flex items-center justify-center"
                    }
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={108}
                      height={180}
                      className="object-contain"
                    />
                  </div>

                  {/* Title & Price */}
                  <div className={viewType === "list" ? "flex-1" : "mt-[20px] sm:mt-[40px]"}>
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
            <div className="flex items-center justify-center mt-[40px] md:mt-[70px] lg:mt-[100px]">
              <div className="flex items-center gap-3">
                <button className="w-[30px] h-[30px]  sm:w-[40px] sm:h-[40px]  lg:w-[50px] lg:h-[50px] rounded-full border border-[#E6E6E6] dark:border-[#343434]  flex items-center justify-center">
                  <svg
                    width="20"
                    height="12"
                    viewBox="0 0 20 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="transition-colors duration-300"
                  >
                    <path
                      d="M19.2035 5.62109C13.7528 5.62109 8.33928 5.62109 2.91641 5.62109C2.90714 5.64815 2.89787 5.6752 2.89787 5.70225C3.02765 5.76538 3.15743 5.82851 3.28721 5.90065C5.04848 6.82952 6.01255 8.29947 6.37407 10.1752C6.39261 10.2474 6.30919 10.3376 6.27211 10.4277C6.18868 10.3736 6.0589 10.3285 6.03109 10.2474C5.88277 9.82352 5.80861 9.37262 5.63248 8.9668C4.83528 7.10908 3.41699 6.00887 1.36835 5.6752C1.23857 5.65716 1.14587 5.48582 1.01609 5.3776C1.73914 5.14313 2.37876 5.00786 2.94422 4.74634C4.59426 3.9798 5.54906 2.66316 5.93839 0.940702C5.98474 0.724267 5.95693 0.390598 6.38334 0.534887C6.04963 2.66316 5.2895 3.6822 2.83298 5.25135C3.09254 5.25135 3.26867 5.25135 3.4448 5.25135C8.55249 5.25135 13.6601 5.25135 18.7771 5.26037C18.9718 5.26037 19.287 5.14313 19.2035 5.62109Z"
                      className=" fill-[#000000] stroke-[#6C6C6C] dark:fill-[#FFFFFF4D] dark:stroke-[#FFFFFF4D] group-hover:fill-[#000] group-hover:stroke-[#000] transition-colors duration-400"
                    />
                  </svg>
                </button>
                <button className="w-[30px] h-[30px]  sm:w-[40px] sm:h-[40px]   lg:w-[50px] lg:h-[50px]  rounded-full bg-[#75DA5B] text-white flex items-center justify-center">
                  1
                </button>
                <button className="w-[30px] h-[30px]  sm:w-[40px] sm:h-[40px]   lg:w-[50px] lg:h-[50px] rounded-full border border-[#E6E6E6] dark:border-[#343434]  text-[#6C6C6C] flex items-center justify-center">
                  2
                </button>
                <button className="w-[30px] h-[30px]  sm:w-[40px] sm:h-[40px]  lg:w-[50px] lg:h-[50px]  rounded-full border border-[#E6E6E6] dark:border-[#343434]  text-[#6C6C6C] flex items-center justify-center">
                  3
                </button>
                <button className="w-[30px] h-[30px]  sm:w-[40px] sm:h-[40px]   lg:w-[50px] lg:h-[50px]  rounded-full  bg-[#75DA5B]  flex items-center justify-center">
                  <svg
                    width="20"
                    height="12"
                    viewBox="0 0 20 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="transition-colors duration-300"
                  >
                    <path
                      d="M0.513762 5.55371C5.96445 5.55371 11.378 5.55371 16.8009 5.55371C16.8101 5.52666 16.8194 5.49961 16.8194 5.47255C16.6896 5.40942 16.5599 5.3463 16.4301 5.27415C14.6688 4.34529 13.7047 2.87534 13.3432 0.999577C13.3247 0.927432 13.4081 0.837251 13.4452 0.74707C13.5286 0.801179 13.6584 0.846269 13.6862 0.927432C13.8345 1.35128 13.9087 1.80219 14.0848 2.208C14.882 4.06573 16.3003 5.16594 18.3489 5.49961C18.4787 5.51764 18.5714 5.68899 18.7012 5.7972C17.9781 6.03167 17.3385 6.16694 16.7731 6.42847C15.123 7.19501 14.1682 8.51165 13.7789 10.2341C13.7325 10.4505 13.7604 10.7842 13.3339 10.6399C13.6677 8.51165 14.4278 7.4926 16.8843 5.92346C16.6247 5.92346 16.4486 5.92346 16.2725 5.92346C11.1648 5.92346 6.05714 5.92346 0.940174 5.91444C0.745507 5.91444 0.430333 6.03167 0.513762 5.55371Z"
                      className="fill-[#fff] stroke-[#fff] dark:fill-[#FFF] dark:stroke-[#FFFFFF4D] group-hover:fill-[#000] group-hover:stroke-[#000] transition-colors duration-400"
                    />
                  </svg>
                </button>
              </div>

            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
