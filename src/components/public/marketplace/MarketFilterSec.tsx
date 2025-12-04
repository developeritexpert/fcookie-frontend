"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from 'next/link';
import FilterDropdown from "./Filterdropdown";
import { IoChevronDown } from "react-icons/io5";
import { CgLayoutGridSmall } from "react-icons/cg";
import { BsArrowsAngleExpand } from "react-icons/bs";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

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
const options = [
  { id: 1, label: "Default Sorting", value: "default" },
  { id: 2, label: "Price: Low to High", value: "low-to-high" },
  { id: 3, label: "Price: High to Low", value: "high-to-low" },
  { id: 4, label: "Newest", value: "newest" },
];

type CardType = {
  title: string;
  price: string;
  image: string;
};

export default function ProductsFilter() {
  const [open, setOpen] = useState(false);
  const [viewType, setViewType] = useState("grid");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [openFilter, setOpenFilter] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);


  // dropdown hide when i click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  // overflow-hidden Add and Remove 
  useEffect(() => {
    if (openView) {
      document.body.classList.add("!overflow-hidden");
    } else {
      document.body.classList.remove("!overflow-hidden");
    }

    return () => {
      document.body.classList.remove("!overflow-hidden");
    };
  }, [openView]);



  // dropdown json
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




  // card json
  const crds: CardType[] = [
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
    <div className="text-white pt-[16px]  px-[20px] md:px-[30px] lg:px-[50px] relative">
      <div className="absolute top-[100px] sm:top-[150px]  md:top-[325px] lg:top-[300px] left-0  bg-[#EFB24D]/20 blur-[150px] -z-10 h-[108px] w-[108px] md:h-[208px] md:w-[208px] lg:h-[308px] lg:w-[308px]"></div>
      <div className="absolute bottom-[-5%] right-0 bg-[#75DA5B]/20 blur-[150px] -z-10 h-[108px] w-[108px] md:h-[208px] md:w-[208px] lg:h-[308px] lg:w-[308px]"></div>
      <div className="container " >
        <div className="flex  md:gap-4 lg:gap-8">
          {/* SIDEBAR */}
          <aside
            className={` pb-[30px] md:pb-[50px] pe-[15px] lg:pe-[30px] 
           border-r border-[#E6E6E6] dark:border-[#343434] me-[15px] lg:me-[30px]
           transition-all duration-300 linear overflow-hidden transform
          ${openFilter ? "basis-[25%] translate-x-0 hidden md:block " : "basis-0 hidden -translate-x-full"}`}>
            <div className="sticky top-0 ">
              <h2 className="text-[24px] md:text-[28px] lg:text-[32px] font-semibold text-left mb-[13px] text-black dark:text-white">
                Filter By:
              </h2>
              {/* ------ Price ------ */}
              <FilterDropdown title="Price">
                <div className="flex flex-col mt-[10px] gap-2">
                  {prices.map((p) => (
                    <label key={p} className="flex items-center gap-2 text-[16px] text-black dark:text-white">
                      <input
                        type="checkbox"
                        className="w-[22px] h-[22px] appearance-none border border-[#E6E6E6] dark:border-[#ffffff1a]
                           rounded-sm  bg-transparent relative cursor-pointer checked:bg-black dark:checked:bg-white   
                           checked:after:content-['']  checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2
                              checked:after:-translate-y-1/2 checked:after:w-[5px] checked:after:h-[10px] checked:after:border-r-2 checked:after:border-b-2
                            checked:after:border-white dark:checked:after:border-black after:rotate-45"/>
                      <span>{p}</span>
                    </label>
                  ))}
                </div>
              </FilterDropdown>

              {/* ------ Category ------ */}
              <FilterDropdown title="Category">
                <div className="flex flex-col mt-[10px] gap-2">
                  {categories.map((c) => (
                    <label
                      key={c.name}
                      className="flex items-center justify-between text-sm cursor-pointer text-black dark:text-white "
                    >
                      <div className="flex items-center gap-[10px] ">
                        <input
                          type="checkbox"
                          className="w-[22px] h-[22px] appearance-none border border-[#E6E6E6] dark:border-[#ffffff1a]
                           rounded-sm  bg-transparent relative cursor-pointer checked:bg-black dark:checked:bg-white   
                           checked:after:content-['']  checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2
                              checked:after:-translate-y-1/2 checked:after:w-[5px] checked:after:h-[10px] checked:after:border-r-2 checked:after:border-b-2
                            checked:after:border-white dark:checked:after:border-black after:rotate-45"/>
                        <span className=" group-hover:opacity-100 transition text-[16px] font-normal">
                          {c.name}
                        </span>
                      </div>

                      <span className=" transition text-[16px] font-normal">
                        ({c.count})
                      </span>
                    </label>
                  ))}
                </div>
              </FilterDropdown>

              {/* ------ Grader ------ */}
              <FilterDropdown title="Grader">
                <div className="flex flex-col mt-[10px]  gap-2">
                  {graders.map((g) => (
                    <label key={g} className="flex items-center gap-2 text-[16px] text-black dark:text-white">
                      <input
                        type="checkbox"
                        className="w-[22px] h-[22px] appearance-none border border-[#E6E6E6] dark:border-[#ffffff1a]
                           rounded-sm  bg-transparent relative cursor-pointer checked:bg-black dark:checked:bg-white   
                           checked:after:content-['']  checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2
                              checked:after:-translate-y-1/2 checked:after:w-[5px] checked:after:h-[10px] checked:after:border-r-2 checked:after:border-b-2
                            checked:after:border-white dark:checked:after:border-black after:rotate-45"/>
                      <span>{g}</span>
                    </label>
                  ))}
                </div>
              </FilterDropdown>



              {/* ------ Grade ------ */}
              <FilterDropdown title="Grade">
                <div className="flex flex-col gap-2 mt-[10px]">
                  {grades.map((g) => (
                    <label key={g} className="flex items-center gap-2 text-[16px] text-black dark:text-white">
                      <input
                        type="checkbox"
                        className="w-[22px] h-[22px] appearance-none border border-[#E6E6E6] dark:border-[#ffffff1a]
                           rounded-sm  bg-transparent relative cursor-pointer checked:bg-black dark:checked:bg-white   
                           checked:after:content-['']  checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2
                              checked:after:-translate-y-1/2 checked:after:w-[5px] checked:after:h-[10px] checked:after:border-r-2 checked:after:border-b-2
                            checked:after:border-white dark:checked:after:border-black after:rotate-45"/>
                      <span>{g}</span>
                    </label>
                  ))}
                </div>
              </FilterDropdown>


              {/* ------ Year ------ */}
              <FilterDropdown title="Year">
                <div className="flex flex-col mt-[10px]  gap-2">
                  {years.map((y) => (
                    <label key={y} className="flex items-center gap-2 text-[16px] text-black dark:text-white">
                      <input
                        type="checkbox"
                        className="w-[22px] h-[22px] appearance-none border border-[#E6E6E6] dark:border-[#ffffff1a]
                           rounded-sm  bg-transparent relative cursor-pointer checked:bg-black dark:checked:bg-white   
                           checked:after:content-['']  checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2
                              checked:after:-translate-y-1/2 checked:after:w-[5px] checked:after:h-[10px] checked:after:border-r-2 checked:after:border-b-2
                            checked:after:border-white dark:checked:after:border-black after:rotate-45"/>
                      <span>{y}</span>
                    </label>
                  ))}
                </div>
              </FilterDropdown>


              {/* ------ Set ------ */}
              <FilterDropdown title="Set">
                <div className="flex flex-col mt-[10px]  gap-2">
                  {sets.map((s) => (
                    <label key={s} className="flex items-center gap-2 text-[16px] text-black dark:text-white">
                      <input
                        type="checkbox"
                        className="w-[22px] h-[22px] appearance-none border border-[#E6E6E6] dark:border-[#ffffff1a]
                           rounded-sm  bg-transparent relative cursor-pointer checked:bg-black dark:checked:bg-white   
                           checked:after:content-['']  checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2
                              checked:after:-translate-y-1/2 checked:after:w-[5px] checked:after:h-[10px] checked:after:border-r-2 checked:after:border-b-2
                            checked:after:border-white dark:checked:after:border-black after:rotate-45"/>
                      <span>{s}</span>
                    </label>
                  ))}
                </div>
              </FilterDropdown>

              {/* ------ LAnguage ------ */}
              <FilterDropdown title="Language">
                <div className="flex flex-col mt-[10px]  gap-2">
                  {languages.map((l) => (
                    <label key={l} className="flex items-center gap-2 text-[16px] text-black dark:text-white">
                      <input
                        type="checkbox"
                        className="w-[22px] h-[22px] appearance-none border border-[#E6E6E6] dark:border-[#ffffff1a]
                           rounded-sm  bg-transparent relative cursor-pointer checked:bg-black dark:checked:bg-white   
                           checked:after:content-['']  checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2
                              checked:after:-translate-y-1/2 checked:after:w-[5px] checked:after:h-[10px] checked:after:border-r-2 checked:after:border-b-2
                            checked:after:border-white dark:checked:after:border-black after:rotate-45"/>
                      <span>{l}</span>
                    </label>
                  ))}
                </div>
              </FilterDropdown>


              {/* ------ title/subject ------ */}
              <FilterDropdown title="Title/Subject">
                <div className="flex flex-col mt-[10px]  gap-2">
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
                <div className="flex flex-col mt-[10px]  gap-2">
                  {titlePKMN.map((p) => (
                    <label key={p} className="flex items-center gap-2 text-[16px] text-black dark:text-white">
                      <input
                        type="checkbox"
                        className="w-[22px] h-[22px] appearance-none border border-[#E6E6E6] dark:border-[#ffffff1a]
                           rounded-sm  bg-transparent relative cursor-pointer checked:bg-black dark:checked:bg-white   
                           checked:after:content-['']  checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2
                              checked:after:-translate-y-1/2 checked:after:w-[5px] checked:after:h-[10px] checked:after:border-r-2 checked:after:border-b-2
                            checked:after:border-white dark:checked:after:border-black after:rotate-45"/>
                      <span>{p}</span>
                    </label>
                  ))}
                </div>
              </FilterDropdown>


              {/* ------ Events  ------ */}
              <FilterDropdown title="Event">
                <div className="flex flex-col mt-[10px]  gap-2">
                  {events.map((e) => (
                    <label key={e} className="flex items-center gap-2 text-[16px] text-black dark:text-white">
                      <input
                        type="checkbox"
                        className="w-[22px] h-[22px] appearance-none border border-[#E6E6E6] dark:border-[#ffffff1a]
                           rounded-sm  bg-transparent relative cursor-pointer checked:bg-black dark:checked:bg-white   
                           checked:after:content-['']  checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2
                              checked:after:-translate-y-1/2 checked:after:w-[5px] checked:after:h-[10px] checked:after:border-r-2 checked:after:border-b-2
                            checked:after:border-white dark:checked:after:border-black after:rotate-45"/>
                      <span>{e}</span>
                    </label>
                  ))}
                </div>
              </FilterDropdown>


              {/* ------ variants  ------ */}
              <FilterDropdown title="Variant">
                <div className="flex flex-col gap-2 mt-[10px] ">
                  {variants.map((v) => (
                    <label key={v} className="flex items-center gap-2 text-[16px] text-black dark:text-white">
                      <input
                        type="checkbox"
                        className="w-[22px] h-[22px] appearance-none border border-[#E6E6E6] dark:border-[#ffffff1a]
                           rounded-sm  bg-transparent relative cursor-pointer checked:bg-black dark:checked:bg-white   
                           checked:after:content-['']  checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2
                              checked:after:-translate-y-1/2 checked:after:w-[5px] checked:after:h-[10px] checked:after:border-r-2 checked:after:border-b-2
                            checked:after:border-white dark:checked:after:border-black after:rotate-45"/>
                      <span>{v}</span>
                    </label>
                  ))}
                </div>
              </FilterDropdown>


              {/* ------ TAgs  ------ */}
              <FilterDropdown title="Tags">
                <div className="flex flex-col mt-[10px]  gap-2">
                  {tags.map((t) => (
                    <label key={t} className="flex items-center gap-2 text-[16px] text-black dark:text-white">
                      <input
                        type="checkbox"
                        className="w-[22px] h-[22px] appearance-none border border-[#E6E6E6] dark:border-[#ffffff1a]
                           rounded-sm  bg-transparent relative cursor-pointer checked:bg-black dark:checked:bg-white   
                           checked:after:content-['']  checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2
                              checked:after:-translate-y-1/2 checked:after:w-[5px] checked:after:h-[10px] checked:after:border-r-2 checked:after:border-b-2
                            checked:after:border-white dark:checked:after:border-black after:rotate-45"/>
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

          {/* MOBILE TOGGLE Sidebar */}
          <div className="relative md:hidden">

            {/* FIXED FILTER BUTTON */}

            <button
              onClick={() => setSidebarOpen(true)}
              className="fixed left-4 bottom-4 z-30 bg-white dark:bg-[#0D0D0D] text-black dark:text-white
               px-6 py-2 rounded-md shadow-lg border border-[#E6E6E6] dark:border-[#343434] flex  items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                strokeWidth="2" className="w-4 h-4 stroke-black dark:stroke-white">
                <path d="M3 4h18M6 12h12M10 20h4" />
              </svg>
              Filters
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
                  <div className="flex flex-col mt-[10px] gap-2">
                    {prices.map((p) => (
                      <label key={p} className="flex items-center gap-2 text-[16px] text-black dark:text-white">
                        <input
                          type="checkbox"
                          className="w-[22px] h-[22px] appearance-none border border-[#E6E6E6] dark:border-[#ffffff1a]
                           rounded-sm  bg-transparent relative cursor-pointer checked:bg-black dark:checked:bg-white   
                           checked:after:content-['']  checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2
                              checked:after:-translate-y-1/2 checked:after:w-[5px] checked:after:h-[10px] checked:after:border-r-2 checked:after:border-b-2
                            checked:after:border-white dark:checked:after:border-black after:rotate-45"/>
                        <span>{p}</span>
                      </label>
                    ))}
                  </div>
                </FilterDropdown>

                {/* ------ Category ------ */}
                <FilterDropdown title="Category">
                  <div className="flex flex-col mt-[10px] gap-2">
                    {categories.map((c) => (
                      <label
                        key={c.name}
                        className="flex items-center justify-between text-sm cursor-pointer text-black dark:text-white "
                      >
                        <div className="flex items-center gap-[10px] ">
                          <input
                            type="checkbox"
                            className="w-[22px] h-[22px] appearance-none border border-[#E6E6E6] dark:border-[#ffffff1a]
                           rounded-sm  bg-transparent relative cursor-pointer checked:bg-black dark:checked:bg-white   
                           checked:after:content-['']  checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2
                              checked:after:-translate-y-1/2 checked:after:w-[5px] checked:after:h-[10px] checked:after:border-r-2 checked:after:border-b-2
                            checked:after:border-white dark:checked:after:border-black after:rotate-45"/>
                          <span className=" group-hover:opacity-100 transition text-[16px] font-normal">
                            {c.name}
                          </span>
                        </div>

                        <span className=" transition text-[16px] font-normal">
                          ({c.count})
                        </span>
                      </label>
                    ))}
                  </div>
                </FilterDropdown>

                {/* ------ Grader ------ */}
                <FilterDropdown title="Grader">
                  <div className="flex flex-col mt-[10px]  gap-2">
                    {graders.map((g) => (
                      <label key={g} className="flex items-center gap-2 text-[16px] text-black dark:text-white">
                        <input
                          type="checkbox"
                          className="w-[22px] h-[22px] appearance-none border border-[#E6E6E6] dark:border-[#ffffff1a]
                           rounded-sm  bg-transparent relative cursor-pointer checked:bg-black dark:checked:bg-white   
                           checked:after:content-['']  checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2
                              checked:after:-translate-y-1/2 checked:after:w-[5px] checked:after:h-[10px] checked:after:border-r-2 checked:after:border-b-2
                            checked:after:border-white dark:checked:after:border-black after:rotate-45"/>
                        <span>{g}</span>
                      </label>
                    ))}
                  </div>
                </FilterDropdown>



                {/* ------ Grade ------ */}
                <FilterDropdown title="Grade">
                  <div className="flex flex-col gap-2 mt-[10px]">
                    {grades.map((g) => (
                      <label key={g} className="flex items-center gap-2 text-[16px] text-black dark:text-white">
                        <input
                          type="checkbox"
                          className="w-[22px] h-[22px] appearance-none border border-[#E6E6E6] dark:border-[#ffffff1a]
                           rounded-sm  bg-transparent relative cursor-pointer checked:bg-black dark:checked:bg-white   
                           checked:after:content-['']  checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2
                              checked:after:-translate-y-1/2 checked:after:w-[5px] checked:after:h-[10px] checked:after:border-r-2 checked:after:border-b-2
                            checked:after:border-white dark:checked:after:border-black after:rotate-45"/>
                        <span>{g}</span>
                      </label>
                    ))}
                  </div>
                </FilterDropdown>


                {/* ------ Year ------ */}
                <FilterDropdown title="Year">
                  <div className="flex flex-col mt-[10px]  gap-2">
                    {years.map((y) => (
                      <label key={y} className="flex items-center gap-2 text-[16px] text-black dark:text-white">
                        <input
                          type="checkbox"
                          className="w-[22px] h-[22px] appearance-none border border-[#E6E6E6] dark:border-[#ffffff1a]
                           rounded-sm  bg-transparent relative cursor-pointer checked:bg-black dark:checked:bg-white   
                           checked:after:content-['']  checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2
                              checked:after:-translate-y-1/2 checked:after:w-[5px] checked:after:h-[10px] checked:after:border-r-2 checked:after:border-b-2
                            checked:after:border-white dark:checked:after:border-black after:rotate-45"/>
                        <span>{y}</span>
                      </label>
                    ))}
                  </div>
                </FilterDropdown>


                {/* ------ Set ------ */}
                <FilterDropdown title="Set">
                  <div className="flex flex-col mt-[10px]  gap-2">
                    {sets.map((s) => (
                      <label key={s} className="flex items-center gap-2 text-[16px] text-black dark:text-white">
                        <input
                          type="checkbox"
                          className="w-[22px] h-[22px] appearance-none border border-[#E6E6E6] dark:border-[#ffffff1a]
                           rounded-sm  bg-transparent relative cursor-pointer checked:bg-black dark:checked:bg-white   
                           checked:after:content-['']  checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2
                              checked:after:-translate-y-1/2 checked:after:w-[5px] checked:after:h-[10px] checked:after:border-r-2 checked:after:border-b-2
                            checked:after:border-white dark:checked:after:border-black after:rotate-45"/>
                        <span>{s}</span>
                      </label>
                    ))}
                  </div>
                </FilterDropdown>

                {/* ------ LAnguage ------ */}
                <FilterDropdown title="Language">
                  <div className="flex flex-col mt-[10px]  gap-2">
                    {languages.map((l) => (
                      <label key={l} className="flex items-center gap-2 text-[16px] text-black dark:text-white">
                        <input
                          type="checkbox"
                          className="w-[22px] h-[22px] appearance-none border border-[#E6E6E6] dark:border-[#ffffff1a]
                           rounded-sm  bg-transparent relative cursor-pointer checked:bg-black dark:checked:bg-white   
                           checked:after:content-['']  checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2
                              checked:after:-translate-y-1/2 checked:after:w-[5px] checked:after:h-[10px] checked:after:border-r-2 checked:after:border-b-2
                            checked:after:border-white dark:checked:after:border-black after:rotate-45"/>
                        <span>{l}</span>
                      </label>
                    ))}
                  </div>
                </FilterDropdown>


                {/* ------ title/subject ------ */}
                <FilterDropdown title="Title/Subject">
                  <div className="flex flex-col mt-[10px]  gap-2">
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
                  <div className="flex flex-col mt-[10px]  gap-2">
                    {titlePKMN.map((p) => (
                      <label key={p} className="flex items-center gap-2 text-[16px] text-black dark:text-white">
                        <input
                          type="checkbox"
                          className="w-[22px] h-[22px] appearance-none border border-[#E6E6E6] dark:border-[#ffffff1a]
                           rounded-sm  bg-transparent relative cursor-pointer checked:bg-black dark:checked:bg-white   
                           checked:after:content-['']  checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2
                              checked:after:-translate-y-1/2 checked:after:w-[5px] checked:after:h-[10px] checked:after:border-r-2 checked:after:border-b-2
                            checked:after:border-white dark:checked:after:border-black after:rotate-45"/>
                        <span>{p}</span>
                      </label>
                    ))}
                  </div>
                </FilterDropdown>


                {/* ------ Events  ------ */}
                <FilterDropdown title="Event">
                  <div className="flex flex-col mt-[10px]  gap-2">
                    {events.map((e) => (
                      <label key={e} className="flex items-center gap-2 text-[16px] text-black dark:text-white">
                        <input
                          type="checkbox"
                          className="w-[22px] h-[22px] appearance-none border border-[#E6E6E6] dark:border-[#ffffff1a]
                           rounded-sm  bg-transparent relative cursor-pointer checked:bg-black dark:checked:bg-white   
                           checked:after:content-['']  checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2
                              checked:after:-translate-y-1/2 checked:after:w-[5px] checked:after:h-[10px] checked:after:border-r-2 checked:after:border-b-2
                            checked:after:border-white dark:checked:after:border-black after:rotate-45"/>
                        <span>{e}</span>
                      </label>
                    ))}
                  </div>
                </FilterDropdown>


                {/* ------ variants  ------ */}
                <FilterDropdown title="Variant">
                  <div className="flex flex-col gap-2 mt-[10px] ">
                    {variants.map((v) => (
                      <label key={v} className="flex items-center gap-2 text-[16px] text-black dark:text-white">
                        <input
                          type="checkbox"
                          className="w-[22px] h-[22px] appearance-none border border-[#E6E6E6] dark:border-[#ffffff1a]
                           rounded-sm  bg-transparent relative cursor-pointer checked:bg-black dark:checked:bg-white   
                           checked:after:content-['']  checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2
                              checked:after:-translate-y-1/2 checked:after:w-[5px] checked:after:h-[10px] checked:after:border-r-2 checked:after:border-b-2
                            checked:after:border-white dark:checked:after:border-black after:rotate-45"/>
                        <span>{v}</span>
                      </label>
                    ))}
                  </div>
                </FilterDropdown>


                {/* ------ TAgs  ------ */}
                <FilterDropdown title="Tags">
                  <div className="flex flex-col mt-[10px]  gap-2">
                    {tags.map((t) => (
                      <label key={t} className="flex items-center gap-2 text-[16px] text-black dark:text-white">
                        <input
                          type="checkbox"
                          className="w-[22px] h-[22px] appearance-none border border-[#E6E6E6] dark:border-[#ffffff1a]
                           rounded-sm  bg-transparent relative cursor-pointer checked:bg-black dark:checked:bg-white   
                           checked:after:content-['']  checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2
                              checked:after:-translate-y-1/2 checked:after:w-[5px] checked:after:h-[10px] checked:after:border-r-2 checked:after:border-b-2
                            checked:after:border-white dark:checked:after:border-black after:rotate-45"/>
                        <span>{t}</span>
                      </label>
                    ))}
                  </div>
                </FilterDropdown>




                {/* Clear filters */}
                <button className=" mt-[50px] py-[14px] px-[33px] text-[16px] font-normal bg-[#EFB24D] text-black  rounded-md  hover:bg-[#dca345] transition">
                  Clear Filters
                </button>

              </div>
            </div>
          </div>


          {/* PRODUCTS GRID */}
          <main
            className={` pb-[50px] md:pb-[80px] lg:pb-[120px] transition duration-300 ease-in-out transform origin-right
            ${openFilter
                ? "basis-[75%] "
                : "basis-[100%] "
              }`}>
            <div className="w-full">

              {/* ---------- TOP BAR ---------- */}
              <div className="flex flex-col  flex-wrap sm:flex-row sm:items-center gap-5 justify-between w-full py-4">

                <div className="flex flex-wrap items-center gap-2">
                  {/* FILTER BUTTON */}
                  <button
                    onClick={() => setOpenFilter(prev => !prev)}
                    className="hidden md:flex items-center gap-2 h-[46px] px-[30px] border border-[#E6E6E6] dark:border-[#343434] bg-transparent 
                   text-black dark:text-white rounded-[5px] text-[14px] font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                      strokeWidth="2" className="w-4 h-4 stroke-black dark:stroke-white">
                      <path d="M3 4h18M6 12h12M10 20h4" />
                    </svg>
                    Filters
                  </button>

                  {/* GRID Button */}
                  <button
                    onClick={() => setViewType("grid")}
                    className={`p-2 border rounded-[1px] h-[46px] w-[46px] flex justify-center items-center
                       ${viewType === "grid"
                        ? "bg-white border-[#E6E6E6]"
                        : "bg-[#0D0D0D] border-[#E6E6E6] dark:border-[#343434]"}`}>
                    <svg width="19" height="19" viewBox="0 0 19 19" fill="currentColor"
                      className={`${viewType === "grid" ? "text-black" : "text-white"}`}>
                      <path d="M3.27586 0C1.47031 0 0 1.47031 0 3.27586V15.7241C0 17.5297 1.47031 19 3.27586 19H15.7241C17.5297 19 19 17.5297 19 15.7241V3.27586C19 1.47031 17.5297 0 15.7241 0H3.27586ZM3.27586 1.31034H8.84876V1.33594V8.84487H1.64186C1.5203 8.84487 1.41281 8.8807 1.31428 8.937V3.27599C1.31428 2.19213 2.19594 1.31047 3.27979 1.31047L3.27586 1.31034ZM1.31034 15.7241V10.0631C1.40888 10.1194 1.51637 10.1553 1.63793 10.1553H8.84483V17.6642V17.6898H3.27193C2.18808 17.6898 1.30641 16.8081 1.30641 15.7243L1.31034 15.7241ZM15.7241 17.6897H10.1512V17.6641V10.1551H17.6857V15.7241C17.6857 16.8079 16.8041 17.6896 15.7202 17.6896L15.7241 17.6897ZM17.6897 3.27586V8.84483H10.1552V1.3359V1.3103H15.7281C16.8119 1.3103 17.6936 2.19197 17.6936 3.27582L17.6897 3.27586Z" />
                    </svg>
                  </button>

                  {/* SMALL GRID Button */}
                  <button
                    onClick={() => setViewType("small-grid")}
                    className={`p-2 border rounded-[1px] h-[46px] w-[46px] flex justify-center items-center
                     ${viewType === "small-grid"
                        ? "bg-white border-[#E6E6E6]"
                        : "bg-[#0D0D0D] border-[#E6E6E6] dark:border-[#343434]"
                      }`}>

                    <CgLayoutGridSmall
                      className={`
                           ${viewType === "small-grid" ? "text-black" : "text-white"} w-8 h-8`} />

                  </button>

                  {/* Sort Dropdown */}
                  <div className="relative w-[220px]" ref={dropdownRef}>
                    <div
                      className="flex justify-between items-center cursor-pointer px-[19px] h-[46px] border border-[#E6E6E6] dark:border-[#343434]
                     bg-white dark:bg-transparent text-black dark:text-white rounded text-[14px] font-medium"
                      onClick={() => setIsOpen(!isOpen)} >
                      {selected.label}

                      <IoChevronDown className={`${isOpen ? "rotate-180" : ""} transition-transform`} />
                    </div>

                    {/* Dropdown Menu */}
                    {isOpen && (
                      <div className="absolute top-full left-0 w-full mt-1 border border-[#E6E6E6] dark:border-[#343434]
                        bg-white dark:bg-[#0D0D0D] rounded shadow-md z-50">
                        {options.map((option) => (
                          <div
                            key={option.id}
                            onClick={() => {
                              setSelected(option);
                              setIsOpen(false);
                            }}
                            className="px-4 py-2 cursor-pointer text-black dark:text-white text-[14px]
                          hover:bg-[#F5F5F5] dark:hover:bg-[#1A1A1A]"
                          >
                            {option.label}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>



                </div>

                <p className="text-[18px] font-medium text-black dark:text-white">
                  Showing <span>1–12</span> of 236 Products
                </p>
              </div>

              {/* ---------- GRID SECTION ---------- */}
              <div
                className={`grid gap-[20px] transition-all duration-300
                  ${viewType === "grid" ? openFilter
                    ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                    : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"
                    : openFilter
                      ? "grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5  gap-[7px] sm:gap-[10px]  md:gap-[15px]"
                      : "grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-[7px] sm:gap-[10px] md:gap-[15px]"}
                      `}>

                {/* {crds.map((item, index) => (
                  <article
                    key={index}
                    className="group border rounded-[14px] flex flex-col p-[15px] border-[#E6E6E6] dark:border-[#1E1E1E] bg-transparent
                   dark:bg-[#0D0D0D] hover:shadow-lg transition-shadow duration-300 hover:shadow-[#EFB24D]/20 h-full relative">

                  
                    <button
                      onClick={() => setOpenView(true)}  // <-- open modal
                      className="absolute top-[15px] right-[15px] w-8 h-8 flex items-center justify-center 
                        cursor-pointer group transition">
                      <BsArrowsAngleExpand
                        className="text-black dark:text-white opacity-0 group-hover:opacity-100 transition "
                      />
                    </button>




                
                    <div
                      className={`flex items-center justify-center rounded-[4px]
                             ${viewType === "small-grid" ? "h-[140px]" : "h-[180px]"}`}>
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={120}
                        height={180}
                        className=" h-full object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>

   
                    <h4 className="text-[14px] sm:text-[16px] font-medium text-black dark:text-white mt-[20px] mb-[10px]">
                      {item.title}
                    </h4>

                
                    <p className="text-[15px] font-normal opacity-70 mt-auto text-[#6C6C6C]">
                      {item.price}
                    </p>
                  </article>
                ))} */}

                {crds.map((item, index) => (
                  <article
                    key={index}
                    // onClick={() => {
                    //   setSelectedCard(item);
                    //   setOpenView(true);
                    // }}
                    className=" border rounded-[8px] sm:rounded-[14px] flex flex-col p-[15px] border-[#E6E6E6] dark:border-[#1E1E1E]
                       bg-transparent dark:bg-[#0D0D0D] hover:shadow-lg transition-shadow duration-300
                       hover:shadow-[#EFB24D]/20 h-full relative cursor-pointer group">

                    {/* VIEWPORT BUTTON */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCard(item);
                        setOpenView(true);
                      }}
                      className="  absolute top-[15px] right-[15px] w-8 h-8 flex items-center justify-center cursor-pointer transition"
                      aria-label="Open viewport">
                      <BsArrowsAngleExpand
                        className="text-black dark:text-white opacity-0 group-hover:opacity-100 transition w-5 h-5"
                      />
                    </button>

                    {/* IMAGE */}
                    <div
                      className={`flex items-center justify-center rounded-[4px]
                ${viewType === "small-grid" ? "h-[140px]" : "h-[180px]"}`}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={120}
                        height={180}
                        className="h-full object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>

                    {/* TITLE */}
                    <h4 className="text-[14px] sm:text-[16px] font-medium text-black dark:text-white mt-[20px] mb-[10px]">
                      {item.title}
                    </h4>

                    {/* PRICE */}
                    <p className="text-[15px] font-normal opacity-70 mt-auto text-[#6C6C6C]">
                      {item.price}
                    </p>
                  </article>
                ))}
              </div>

              {/* viewport Toggle Content */}
              {openView && selectedCard && (
                <div className="fixed inset-0 z-50 hidden  bg-[#000000d0] lg:flex items-center justify-center h-screen">
                  <div className="relative z-50 w-full max-w-[900px]  bg-[white] dark:bg-[#0D0D0D] text-black dark:text-white rounded-xl overflow-hidden shadow-xl flex flex-col lg:flex-row transition">

                    <button
                      onClick={() => {
                        setOpenView(false);
                        setSelectedCard(null);
                      }}
                      className="absolute top-4 right-4 p-2  rounded-md ">
                      x
                    </button>


                    <div className="w-full lg:w-1/2 bg-white dark:bg-[#111] flex items-center justify-center p-6">
                      <img
                        src={selectedCard.image}
                        alt={selectedCard.title}
                        className="max-h-[350px] object-contain"
                      />
                    </div>
                    <div className="w-full lg:w-1/2 p-6 space-y-4">

                      <h1 className="text-xl pr-[20px] font-semibold leading-snug">
                        {selectedCard.title}
                      </h1>


                      <div className="flex flex-wrap gap-2">
                        {[
                          "CGC",
                          "9 MINT",
                          "Pokémon",
                          "English",
                        ].map((t) => (
                          <span
                            key={t}
                            className="px-3 py-1 border border-[#E6E6E6] dark:border-transparent transition-all hover:border-[#EFB24D] hover:text-white hover:bg-[#EFB24D] bg-white/10 rounded-full text-sm">
                            {t}
                          </span>
                        ))}
                      </div>



                      <div className="border border-[#E6E6E6]  dark:border-white/10 p-4 rounded-lg flex items-center justify-between">
                        <span className="">Not listed</span>

                        <div className=" flex flex-wrap gap-[15px]">
                          <button
                            onClick={() => setShowAuthModal(true)}
                            className=" px-3 py-[10px] w-full min-w-[130px] rounded-md bg-[#EFB24D] border border-[#EFB24D] transition-all hover:text-white text-black "
                          >
                            Buy Now
                          </button>

                          <button
                            onClick={() => setShowOfferModal(true)}
                            className=" px-3 py-[10px] w-full min-w-[130px] rounded-md border border-[#E6E6E6] dark:border-[#FFFFFF0A] hover:text-white bg-[#EFB24D] text-black transition-all  "
                          >
                            Make an Offer
                          </button>
                        </div>
                      </div>

                      <div className="border border-[#E6E6E6]  dark:border-white/10 p-4 rounded-lg space-y-2">


                        <div className="flex items-center justify-between">
                          <span className="text-lg font-semibold">{selectedCard.price}</span>
                          <span className="text-sm text-gray-400">Expires in 7 days</span>
                        </div>

                        <p className="text-sm text-gray-400">
                          From <span className="text-black dark:text-white font-medium">Fcookie</span>
                        </p>
                      </div>


                      <div className="mt-[20px]">

                        <Link href="/product-detail"  >
                          <p className="w-[fit-content] rounded-md px-[24px] py-[12px] border border-[#E6E6E6] flex items-center gap-2  dark:border-white/10">
                            <FaArrowUpRightFromSquare /> Open Full Page
                          </p>
                        </Link>
                      </div>

                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* PAGINATION */}
            <div className="flex items-center justify-center mt-[40px] md:mt-[70px] lg:mt-[100px]">
              <div className="flex items-center gap-3">
                <button className=" group w-[30px] h-[30px]  sm:w-[40px] sm:h-[40px]  lg:w-[50px] lg:h-[50px] rounded-full border border-[#E6E6E6] dark:border-[#343434] hover:border-[#75DA5B] hover:bg-[#75DA5B] text-[#6C6C6C] hover:text-white  flex items-center justify-center">
                  <svg
                    width="20"
                    height="12"
                    viewBox="0 0 20 12"
                    xmlns="http://www.w3.org/2000/svg"
                    className="group ">
                    <path
                      d="M19.2035 5.62109C13.7528 5.62109 8.33928 5.62109 2.91641 5.62109C2.90714 5.64815 2.89787 5.6752 2.89787 5.70225C3.02765 5.76538 3.15743 5.82851 3.28721 5.90065C5.04848 6.82952 6.01255 8.29947 6.37407 10.1752C6.39261 10.2474 6.30919 10.3376 6.27211 10.4277C6.18868 10.3736 6.0589 10.3285 6.03109 10.2474C5.88277 9.82352 5.80861 9.37262 5.63248 8.9668C4.83528 7.10908 3.41699 6.00887 1.36835 5.6752C1.23857 5.65716 1.14587 5.48582 1.01609 5.3776C1.73914 5.14313 2.37876 5.00786 2.94422 4.74634C4.59426 3.9798 5.54906 2.66316 5.93839 0.940702C5.98474 0.724267 5.95693 0.390598 6.38334 0.534887C6.04963 2.66316 5.2895 3.6822 2.83298 5.25135C3.09254 5.25135 3.26867 5.25135 3.4448 5.25135C8.55249 5.25135 13.6601 5.25135 18.7771 5.26037C18.9718 5.26037 19.287 5.14313 19.2035 5.62109Z"
                      fill="currentColor"
                      stroke="currentColor"
                      className="text-black stroke-gray-500 group-hover:text-white group-hover:stroke-white transition-colors duration-400"
                    />
                  </svg>
                </button>
                <button className="w-[30px] h-[30px]  sm:w-[40px] sm:h-[40px] text-[22px] font-normal  lg:w-[50px] lg:h-[50px]  rounded-full border border-[#E6E6E6] dark:border-[#343434]  hover:border-[#75DA5B] hover:bg-[#75DA5B] text-[#6C6C6C] hover:text-white flex items-center justify-center">
                  1
                </button>
                <button className="w-[30px] h-[30px]  sm:w-[40px] sm:h-[40px] text-[22px] font-normal  lg:w-[50px] lg:h-[50px] rounded-full border border-[#E6E6E6] dark:border-[#343434]  text-[#6C6C6C] hover:border-[#75DA5B] hover:bg-[#75DA5B] hover:text-white  flex items-center justify-center">
                  2
                </button>
                <button className="w-[30px] h-[30px]  sm:w-[40px] sm:h-[40px] text-[22px] font-normal  lg:w-[50px] lg:h-[50px]  rounded-full border border-[#E6E6E6] dark:border-[#343434]  text-[#6C6C6C] hover:border-[#75DA5B] hover:bg-[#75DA5B] hover:text-white  flex items-center justify-center">
                  3
                </button>
                <button className=" group w-[30px] h-[30px]  sm:w-[40px] sm:h-[40px]   lg:w-[50px] lg:h-[50px]  rounded-full border border-[#E6E6E6] dark:border-[#343434] hover:border-[#75DA5B] hover:bg-[#75DA5B] text-[#6C6C6C] hover:text-white   flex items-center justify-center">
                  <svg
                    width="20"
                    height="12"
                    viewBox="0 0 20 12"
                    xmlns="http://www.w3.org/2000/svg"
                    className="group">
                    <path
                      d="M0.513762 5.55371C5.96445 5.55371 11.378 5.55371 16.8009 5.55371C16.8101 5.52666 16.8194 5.49961 16.8194 5.47255C16.6896 5.40942 16.5599 5.3463 16.4301 5.27415C14.6688 4.34529 13.7047 2.87534 13.3432 0.999577C13.3247 0.927432 13.4081 0.837251 13.4452 0.74707C13.5286 0.801179 13.6584 0.846269 13.6862 0.927432C13.8345 1.35128 13.9087 1.80219 14.0848 2.208C14.882 4.06573 16.3003 5.16594 18.3489 5.49961C18.4787 5.51764 18.5714 5.68899 18.7012 5.7972C17.9781 6.03167 17.3385 6.16694 16.7731 6.42847C15.123 7.19501 14.1682 8.51165 13.7789 10.2341C13.7325 10.4505 13.7604 10.7842 13.3339 10.6399C13.6677 8.51165 14.4278 7.4926 16.8843 5.92346C16.6247 5.92346 16.4486 5.92346 16.2725 5.92346C11.1648 5.92346 6.05714 5.92346 0.940174 5.91444C0.745507 5.91444 0.430333 6.03167 0.513762 5.55371Z"
                      fill="currentColor"
                      stroke="currentColor"
                      className="text-black stroke-gray-500 group-hover:text-white group-hover:stroke-white transition-colors duration-400"
                    />
                  </svg>

                </button>
              </div>

            </div>

          </main>
        </div>
      </div>

      {/*Buy Auth Modal */}
      {
        showAuthModal && (
          <div className="fixed inset-0  backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#0f0f0f] text-black dark:text-white border border-[#E6E6E6] dark:border-[#1a1a1a] rounded-2xl p-8 max-w-md w-full relative">
              <button
                onClick={() => setShowAuthModal(false)}
                className="absolute top-4 right-4   transition">
                x
              </button>

              <h2 className="text-2xl font-bold mb-6">Login to Continue</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full dark:bg-[#1a1a1a] border border-[#E6E6E6] dark:border-[#252525] rounded-lg px-4 py-3  placeholder-gray-500 focus:outline-none focus:border-[#f59e0b]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full dark:bg-[#1a1a1a] border border-[#E6E6E6] dark:border-[#252525] rounded-lg px-4 py-3  placeholder-gray-500 focus:outline-none focus:border-[#f59e0b]"
                  />
                </div>

                <button className="w-full bg-[#EFB24D] hover:bg-[#d97706] text-black py-3 rounded-lg font-semibold transition">
                  Login
                </button>

                <p className="text-center text-sm text-gray-400">
                  Don't have an account? <a href="#" className="text-[#EFB24D] hover:underline">Sign up</a>
                </p>
              </div>
            </div>
          </div>
        )
      }


      {/* Make Offer Modal */}
      {
        showOfferModal && (
          <div className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#0f0f0f] border border-[#E6E6E6] dark:border-[#1a1a1a]  text-black dark:text-white  rounded-2xl p-8 max-w-md w-full relative">
              <button
                onClick={() => setShowOfferModal(false)}
                className="absolute top-4 right-4  transition"  >
                x
              </button>

              <h2 className="text-2xl font-bold mb-6">Make an Offer</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Your Offer</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full bg-white dark:bg-[#1a1a1a] border border-[#E6E6E6] dark:border-[#252525] rounded-lg pl-8 pr-4 py-3  placeholder-gray-500 focus:outline-none focus:border-[#f59e0b]"
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Listed price: $2,690</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message (Optional)</label>
                  <textarea
                    placeholder="Add a message to the seller..."
                    rows={4}
                    className="w-full bg-white dark:bg-[#1a1a1a] border border-[#E6E6E6] dark:border-[#252525] rounded-lg px-4 py-3  placeholder-gray-500 focus:outline-none focus:border-[#f59e0b] resize-none"
                  />
                </div>

                <button className="w-full bg-[#EFB24D] hover:bg-[#d97706] text-black py-3 rounded-lg font-semibold transition">
                  Submit Offer
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}
