"use client";

import React, { useState } from "react";
import { Heart, Share2, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FiShare2 } from "react-icons/fi";
import { GoTag } from "react-icons/go";
import { IoDiamondOutline } from "react-icons/io5";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { CiCircleCheck } from "react-icons/ci";
import { LuVault } from "react-icons/lu";
import { RiShieldFlashLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { TbShieldSearch } from "react-icons/tb";
import Breadcrumb from "@/components/layout/Breadcrumb";

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("PSA");
  const [activeGrade, setActiveGrade] = useState("8");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Top offer $129.65");

  const options = ["Top offer $129.65", "A", "B", "C"];


  const gradingTabs = ["PSA", "CGC", "BGS", "SGC"];
  const grades = ["6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10"];

  const transactions = [
    { date: "November 8, 2025", price: "$160.50" },
    { date: "November 8, 2025", price: "$167.50" },
    { date: "November 7, 2025", price: "$180.00" },
    { date: "November 6, 2025", price: "$190.00" },
    { date: "November 6, 2025", price: "$170.00" },
  ];

  const productImages = [
    "/img/market-card1.png",
    "/img/market-card3.png",
    "/img/market-card4.png",
    "/img/market-card5.png",
  ];

  const relatedProducts = [
    {
      title: "2023 Panini Prizm Zion Williamson Concourse Ball White Pink Prizm",
      price: "$34.00",
      image: "/img/market-card1.png",
    },
    {
      title: "2021 Panini Chronicles Optic Spalding Beige Gold",
      price: "$50.00",
      image: "/img/market-card2.png",
    },
    {
      title: "2007 Topps Select Rookie Norm Purple Pulse Foil Patch",
      price: "$299.99",
      image: "/img/market-card3.png",
    },
    {
      title: "2020 Panini Prizm Lebron Summer",
      price: "$75",
      image: "/img/market-card4.png",
    },
  ];

  const recentTransactions = [
    { date: "November 6, 2025", grade: "PSA 9 (Population 1003)", price: "$190.50" },
    { date: "November 6, 2025", grade: "", price: "$167.50" },
    { date: "November 7, 2025", grade: "", price: "$150.00" },
    { date: "November 6, 2025", grade: "", price: "$155.00" },
    { date: "November 6, 2025", grade: "", price: "$170.00" },
  ];

  const activityHistory = [
    { type: "Sold", amount: "$192.50", time: "1 week ago", from: "dtcantracollective2", to: "ooarooooo123729" },
    { type: "Mint", amount: "$25.00", time: "1 week ago", from: "fc000c...2000", to: "storaxpure41005" },
  ];




  const tags = [
    "PSA",
    "9 Mint",
    "Pokémon",
    "2023",
    "English",
    "2024 Bowman Draft Chrome Prospect Autograph Orange Refractor",
    "Carson Benge",
  ];

  const rows = [
    { label: "Standard", value: "ERC-721 token on the blockchain" },
    { label: "Chain", value: "Polygon" },
    { label: "Token ID", value: "168367...3114" },
    { label: "Contract address", value: "0x251B...dcAD" },
    { label: "Owner address", value: "0x5E47...CD6A" },
  ];

  const activityData = [
    {
      icons: <GoTag />,
      type: "Sale",
      time: "1 month ago",
      amount: "$142.50",
      from: "steampunkske1109",
      to: "pokecomics3725",
    },
    {
      icons: <IoDiamondOutline />,
      type: "Mint",
      time: "1 month ago",
      amount: "$25.00",
      from: "0x0000...0000",
      to: "steampunkske1109",
    },
  ];
  const breadcrumbItems = [
    { label: "Home", href: "/home" },
    { label: "Marketplace", href: "/marketplace" },
    { label: "2024 Bowman Draft Chrome Prospect Autograph Orange Refractor" } 
  ]


  return (
    <div >
    <Breadcrumb items={breadcrumbItems} />
      {/* Main Content */}
      <div className=" px-[20px] md:px-[30px] lg:px-[50px] pt-[30px] pb-[30px] sm:pt-[40px] sm:pb-[40px] md:pt-[60px] md:pb-[60px] lg:pt-[80px] lg:pb-[80px] xl:pt-[100px] xl:pb-[120px] relative">
        <div className="absolute top-0 left-0   bg-[#EFB24D]/20 blur-[724px] -z-10 h-[25%] w-full"></div>
        <div className="absolute bottom-[5%] sm:bottom-[10%]  md:bottom-[20%] lg:bottom-[35%] left-0  bg-[#EFB24D]/20 blur-[150px] -z-10 h-[108px] w-[108px] md:h-[208px] md:w-[208px] lg:h-[308px] lg:w-[308px]"></div>
        <div className="absolute bottom-[-5%] right-0 bg-[#75DA5B]/20 blur-[150px] -z-10 h-[108px] w-[108px] md:h-[208px] md:w-[208px] lg:h-[308px] lg:w-[308px]"></div>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12 ">
            {/* Left Side - Product Images */}
            <div className="space-y-6 ">
              <div className="sticky top-0 ">
                {/* Main Image */}
                <div className="bg-[#FFFFFF05] border border-[#E6E6E6] dark:border-[#FFFFFF1C] rounded-2xl py-[60px]  md:py-[114px] flex items-center justify-center min-h-[350px] md:min-h-[500px] relative">
                  <div className="absolute top-[15px] right-[16px] sm:top-[19px] sm:right-[27px] flex gap-2">
                    <button
                      onClick={() => setIsWatchlisted(!isWatchlisted)}
                      className=" transition" >
                      <Heart className={`w-5 h-5 ${isWatchlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                    </button>
                    <span className="text-black dark:text-white text-[14px] font-normal">
                      3 Watching
                    </span>
                  </div>
                  <img
                    src={productImages[selectedImage]}
                    alt="Product"
                    className=" w-full max-w-full max-h-[250px]  sm:max-w-[280px] sm:max-h-[400px] object-contain"
                  />
                </div>

                {/* Thumbnail Images */}
                <div className="grid grid-cols-4 gap-4 mt-[15px]" >
                  {productImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`border-2 ${selectedImage === idx ? 'border-[#f59e0b]  ' : ' border-[#E6E6E6] dark:border-[#FFFFFF1C]'
                        } rounded-xl  p-2 sm:p-4 flex items-center justify-center h-[100px] hover:border-[#f59e0b] transition`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="max-w-full max-h-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>


            {/* Right Side - Product Details */}
            <div className="space-y-6">
              {/* Title */}
              <div className=" flex justify-between items-center">
                <div className=" flex items-center gap-[5px] px-[13px] py-[10px] bg-[#FFFFFF0A]  rounded-[4px] text-black dark:text-white ">
                  <LuVault />
                  <p className="text-[12px] font-normal">Vaulted and Insured</p>
                </div>

                <div className="p-[10px]  border border-[#E6E6E6] dark:border-[#FFFFFF1C]">
                  <Link href="/" >
                    <p className="text-black dark:text-white z"><FiShare2 /></p>
                  </Link>
                </div>

              </div>
              <h1 className="text-[28px] md:text-[32px] font-semibold leading-tight mt-[15px] text-black dark:text-white ">
                2024 Bowman Draft Chrome Prospect Autographs Orange Refractors
              </h1>
              <p className="text-[16px] font-medium mt-[10px] text-black dark:text-white ">Owned by <span className="text-[#4DCE94]"> Fcookie</span></p>

              <div className=" flex items-center text-black dark:text-white w-[fit-content] gap-[5px] px-[13px] py-[10px] border border-[#E6E6E6] dark:border-[#FFFFFF0A] bg-[#FFFFFF0A] mt-[23px] rounded-[4px]">
                <TbShieldSearch />
                <p className="text-[12px] font-normal  ">PSA: 107245864</p>
              </div>

              {/* Price Box */}
              <div className="mt-6 bg-transparent transition hover:shadow-md hover:shadow-[#EFB24D80] border border-[#E6E6E6] dark:border-[#FFFFFF1C] px-[15px] sm:px-[25px] py-[23px] rounded-[7px]">
                <p className="text-[14px] font-light text-black dark:text-white ">Listed for <span className="text-[18px] font-medium">$2,690</span></p>
                <div className="mt-[15px] text-center text-[16px] text-normal flex flex-col sm:flex-row  gap-[10px]">

                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="sm:flex-1 px-3 py-[10px] w-full rounded-md bg-[#EFB24D] border border-[#EFB24D] transition-all  text-black hover:bg-transparent hover:text-[#EFB24D]"
                  >
                    Buy Now
                  </button>
                  <button
                    onClick={() => setShowOfferModal(true)}
                    className="sm:flex-1 px-3 py-[10px]  rounded-md border border-[#E6E6E6] dark:border-[#FFFFFF0A] bg-[#FFFFFF0A] text-[#EFB24D] transition-all hover:bg-[#EFB24D] hover:text-black"
                  >
                    Make an Offer
                  </button>
                </div>
                <div className=" mt-[35px] border-t border-[#E6E6E6] dark:border-[#FFFFFF1C]"></div>



                <div className="relative w-full pt-[18px]">
                  {/* Dropdown button */}
                  <div
                    onClick={() => setOpen(!open)}
                    className=" rounded px-4 py-2 cursor-pointer flex justify-between items-center text-[16px] font-normal text-black dark:text-white "
                  >
                    {selected}
                    <span className={`transform transition ${open ? "rotate-180" : ""}`}>
                      <IoIosArrowDown />
                    </span>
                  </div>

                  {/* Options */}
                  {open && (
                    <div className="absolute w-full  rounded mt-1  z-10 ">
                      {options.map((opt) => (
                        <div
                          key={opt}
                          onClick={() => {
                            setSelected(opt);
                            setOpen(false);
                          }}
                          className="px-4 py-2 bg-white dark:bg-[#0D0D0D] text-black dark:text-white cursor-pointer border-none"
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  )}
                </div>


              </div>



              {/* Features */}
              <div className="flex  flex-wrap gap-2 justify-between text-black dark:text-white border border-[#E6E6E6] dark:border-[#FFFFFF0A] bg-[#FFFFFF0A] rounded-[7px] px-[15px] sm:px-[25px] py-[25px]">
                <div className="flex items-center gap-2 text-[14px] font-normal">
                  <span className="text-lg"><CiCircleCheck /></span> Authenticity guarantee
                </div>
                <div className="flex items-center gap-2 text-[14px] font-normal ">
                  <span className="text-lg"><LuVault /></span> Handled and insured by fcookie
                </div>
                <div className="flex items-center gap-2 text-[14px] font-normal e">
                  <span className="text-lg"><RiShieldFlashLine /></span> Order-digitally, redeem anytime
                </div>
              </div>


              {/* Recent Transactions */}
              <div className="w-full transition hover:shadow-md hover:shadow-[#EFB24D80] border border-[#E6E6E6] dark:border-[#FFFFFF1C] rounded-[7px]  text-black dark:text-white">
                <h2 className="text-lg border-b border-[#E6E6E6] dark:border-[#FFFFFF0A] bg-[#FFFFFF0A] px-[15px] sm:px-[25px] py-[16px]">Recent Transactions</h2>

                <div className="px-[15px] sm:px-[25px] pt-[25px]">
                  {/* Grading Tabs */}
                  <div className="flex flex-wrap gap-3 mb-[21px]  ">
                    {gradingTabs.map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-[18px] py-[8px] text-[14px] font-normal rounded-lg border 
            ${activeTab === tab
                            ? "bg-[#EFB24D] text-black dark:text-white border-[#EFB24D]"
                            : "border-[#E6E6E6] dark:border-[#FFFFFF1C] text-black dark:text-white"
                          }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  {/* Grades */}
                  <div className="flex flex-wrap gap-[11px] mb-[37px]">
                    {grades.map((g) => (
                      <button
                        key={g}
                        onClick={() => setActiveGrade(g)}
                        className={`h-[34px] w-[64px] rounded-lg border text-[14px] font-normal 
                     ${activeGrade === g
                            ? "bg-[#EFB24D] text-black dark:text-white border-[#EFB24D] "
                            : "border-[#E6E6E6] dark:border-[#FFFFFF1C] text-black dark:text-white "
                          }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>

                  {/* Title row */}
                  <div className="flex justify-between items-center  px-[16px] py-[18px] rounded-[7px] text-[16px] font-normal border border-[#E6E6E6] dark:border-[#FFFFFF0A] bg-[#FFFFFF0A]">
                    <p >
                      {activeTab} {activeGrade} (Population 11003)
                    </p>

                    <button className="underline">
                      View All Transactions
                    </button>
                  </div>

                  {/* List */}
                  <div className="">
                    {transactions.map((t, index) => (
                      <div
                        key={index}
                        className="flex justify-between border-b border-[#E6E6E6] dark:border-[#1f1f1f] py-[22px] last:border-b-0"
                      >
                        <p className="text-black dark:text-white">{t.date}</p>
                        <p>{t.price}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className=" rounded-[7px] border text-black dark:text-white transition hover:shadow-md hover:shadow-[#EFB24D80] border-[#E6E6E6] dark:border-[#FFFFFF1C] shadow-lg ">
                {/* Header */}
                <div className="text-[16px] font-medium py-[16px] px-[15px] sm:px-[25px] border-b border-[#E6E6E6] dark:border-[#FFFFFF0A] bg-[#FFFFFF0A]  mb-3">
                  Details
                </div>

                <div className="px-[15px] sm:px-[25px] py-[25px]">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-[12px] mb-6">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center rounded-[4px] border border-[#E6E6E6] dark:border-[#FFFFFF1C] px-[19px] py-[9px] text-[14px] hover:text-[white] hover:bg-[#EFB24D] transition"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Info panel */}
                  <div className="rounded-lg border border-[#E6E6E6] dark:border-[#FFFFFF0A] bg-[#FFFFFF0A] px-[15px] py-[20px] ">
                    <dl className="space-y-[20px] text-[14px] ">
                      {rows.map((row) => (
                        <div
                          key={row.label}
                          className="flex items-center justify-between gap-[20px]"
                        >
                          <dt className="">
                            {row.label}
                          </dt>
                          <dd className=" text-right truncate">
                            {row.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  <div className="mt-[17px] flex justify-end">
                    <button
                      type="button"
                      className="text-[12px] text-black dark:text-white underline">
                      Show Less
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity-history*/}
          <div className=" text-black dark:text-white mt-[40px] lg:mt-[60px] xl:mt-[80px]">
            <h2 className="text-[32px] font-semibold mb-[12px]">Activity History</h2>

            <div className="space-y-4 " >
              {activityData.map((item, index) => (
                <div
                  key={index}
                  className=" border border-[#E6E6E6] dark:border-[#FFFFFF1C] transition hover:shadow-md hover:shadow-[#EFB24D80] rounded-[7px]  flex-col pb-[20px] pt-[20px] px-[15px] sm:px-[20px] sm:pb-[25px]">

                  <div className="flex justify-between items-center mb-[20px]">
                    <div className="flex items-center gap-3">
                      <span className="px-[13px] py-[7px] text-[14px] font-normal  rounded-lg bg-[#FFFFFF0A] flex gap-2 items-center">
                        {item.icons} {item.type}
                      </span>
                      <span className="text-[12px] opacity-50">{item.time}</span>
                    </div>


                    <div className="bg-[#FFFFFF0A] p-[10px]">
                      <Link href="/">
                        <FaArrowUpRightFromSquare />
                      </Link>
                    </div>
                  </div>

                  {/* Price */}
                  <p className="text-[22px] font-medium mb-[15px]">{item.amount}</p>

                  {/* From / To */}
                  <div className="flex flex-wrap items-center gap-2 px-[15px] py-[7px] text-black dark:text-white" >
                    <span className="opacity-50 text-[12px] font-light">From:</span>
                    <span className="text-[14px] font-normal ">
                      {item.from}
                    </span>
                    <div className="border border-[#FFFFFF1A] h-[22px]"></div>
                    <div>
                      <span className="opacity-50 text-[12px] font-light">To:</span>
                      <span className="text-[14px] font-normal">
                        {item.to}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products Section */}

      <div className="pt-[30px] pb-[30px]  sm:pt-[40px] sm:pb-[40px]   md:pt-[70px] md:pb-[80px]   lg:pt-[86px] lg:pb-[100px]  px-[20px] md:px-[30px] lg:px-[50px] relative">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#EFB24D14] to-[rgba(239,178,77,0)] pointer-events-none"></div>
        <div className="container relative z-10">

          <div className="flex items-center justify-center mb-[25px] sm:mb-[40px]">
            <h2 className="text-[32px] text-black dark:text-white font-semibold">Similar listings</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 xl:grid-cols-4 gap-6 ">
            {relatedProducts.map((item, index) => (
              <div
                key={index}
                className="group bg-transparent dark:bg-[#0D0D0D] border border-[#E6E6E6] dark:border-[#343434] rounded-2xl p-6 hover:border-[#EFB24D] hover:shadow-xl hover:shadow-[#EFB24D]/20 transition-all cursor-pointer"
              >
                <div className="w-full h-[180px] sm:h-[240px] flex items-center justify-center mb-6  rounded-xl overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform"
                  />
                </div>

                <div>
                  <h4 className="text-[16px] font-medium text-black dark:text-white mb-2 line-clamp-2 min-h-[40px]">
                    {item.title}
                  </h4>
                  <p className="text-[15px] font-normal text-[#6C6C6C]">
                    {item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>



      {/* Auth Modal */}
      {
        showAuthModal && (
          <div className="fixed inset-0  backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-2xl p-8 max-w-md w-full relative">
              <button
                onClick={() => setShowAuthModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-2xl font-bold mb-6">Login to Continue</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full bg-[#1a1a1a] border border-[#252525] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#f59e0b]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full bg-[#1a1a1a] border border-[#252525] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#f59e0b]"
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
            <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-2xl p-8 max-w-md w-full relative">
              <button
                onClick={() => setShowOfferModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
              >
                <X className="w-6 h-6" />
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
                      className="w-full bg-[#1a1a1a] border border-[#252525] rounded-lg pl-8 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#f59e0b]"
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Listed price: $2,690</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message (Optional)</label>
                  <textarea
                    placeholder="Add a message to the seller..."
                    rows={4}
                    className="w-full bg-[#1a1a1a] border border-[#252525] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#f59e0b] resize-none"
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
    </div >
  );
}