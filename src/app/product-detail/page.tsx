"use client";

import React, { useState } from "react";
import { Heart, Share2, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FiShare2 } from "react-icons/fi";
import { GoTag } from "react-icons/go";
import { IoDiamondOutline } from "react-icons/io5";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import Breadcrumb from "@/components/layout/Breadcrumb";
import SimilarProducts from "@/components/layout/SimilarProducts";


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
      <div className="px-[20px] md:px-[30px] lg:px-[50px] ">
        <div className="container">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>
      {/* Main Content */}
      <div className=" px-[20px] md:px-[30px] lg:px-[50px] pt-[30px] pb-[30px] sm:pt-[40px] sm:pb-[40px] md:pt-[50px] md:pb-[60px] lg:pb-[80px] xl:pb-[120px] relative">
        <div className="absolute top-0 left-0   bg-[#EFB24D]/20 blur-[724px] -z-10 h-[25%] w-full"></div>
        <div className="absolute bottom-[5%] sm:bottom-[10%]  md:bottom-[20%] lg:bottom-[35%] left-0  bg-[#EFB24D]/20 blur-[150px] -z-10 h-[108px] w-[108px] md:h-[208px] md:w-[208px] lg:h-[308px] lg:w-[308px]"></div>
        <div className="absolute bottom-[-5%] right-0 bg-[#75DA5B]/20 blur-[150px] -z-10 h-[108px] w-[108px] md:h-[208px] md:w-[208px] lg:h-[308px] lg:w-[308px]"></div>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12 ">
            {/* Left Side - Product Images */}
            <div className="space-y-6 ">
              <div className="sticky top-[100px] ">
                {/* <div className="relative"> */}
                  {/* <div className="absolute bottom-[-5%] sm:bottom-[-10%]  md:bottom-[-15%] lg:bottom-[-20%] left-0  bg-[#EFB24D]/20 blur-[150px] -z-10 h-[108px] w-[108px] md:h-[208px] md:w-[208px] lg:h-[308px] lg:w-[308px]"></div> */}
                 {/* Main Image */}
                  <div className="bg-[#FFFFFF05] border border-[#E6E6E6] dark:border-[#FFFFFF1C] rounded-2xl py-[60px]  md:py-[114px] flex items-center justify-center min-h-[350px] md:min-h-[500px] relative">
                    <div className="absolute top-[15px] right-[16px] sm:top-[19px] sm:right-[27px] flex gap-2">
                      <button
                        onClick={() => setIsWatchlisted(!isWatchlisted)}
                        className=" transition" >
                        <Heart className={`w-5 h-5 ${isWatchlisted ? 'fill-red-500 text-red-500' : 'text-black dark:text-white'}`} />
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
                {/* </div> */}
              </div>
            </div>


            {/* Right Side - Product Details */}
            <div className="space-y-6">
              {/* Title */}
              <div className=" flex justify-between items-center">
                <div className=" flex items-center gap-[5px] px-[13px] py-[10px] border border-[#E6E6E6] dark:border-[#FFFFFF0A] bg-[#FFFFFF0A]  rounded-[4px] text-black dark:text-white ">

                  <svg width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                    className="transition-colors duration-300 text-black stroke-black dark:text-white dark:stroke-white"
                  >
                    <path d="M13.8575 0.0999976H1.32502C0.646376 0.0999976 0.0996094 0.646109 0.0996094 1.3254V13.8745C0.0996094
                   14.5531 0.645721 15.0999 1.32502 15.0999H13.8741C14.1885 15.0999 14.5195 14.9674 14.7352 14.7356C14.967
                    14.5038 15.0829 14.1895 15.0829 13.8578L15.0822 1.32531C15.0822 0.646027 14.5362 0.0999976 13.8575 
                    0.0999976ZM14.387 14.3874C14.2545 14.5199 14.0727 14.6025 13.8736 14.6025H1.32513C0.927545 14.6025 0.596551 
                    14.2715 0.596551 13.8739V1.3255C0.596551 0.927917 0.927545 0.596923 1.32513 0.596923H13.8577C14.2553 0.596923 14.5862 0.927917 
                    14.5862 1.3255V13.858C14.5856 14.0565 14.5195 14.2382 14.387 14.3874Z"   fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="0.2" />
                    <path d="M12.9623 1.80501H2.23463C1.98622 1.80501 1.80439 1.98684 1.80439 2.23524V3.444C1.53934 3.46064 1.32422
                      3.67577 1.32422 3.94081V5.59651C1.32422 5.86157 1.53934 6.07669 1.80439 6.09333V9.02368C1.53934 9.04032 1.32422 9.25545
                       1.32422 9.52049V11.1762C1.32422 11.4413 1.53934 11.6564 1.80439 11.673V12.9643C1.80439 13.2128 1.98622 13.3946 2.23463 
                       13.3946H12.9623C13.2107 13.3946 13.3925 13.2128 13.3925 12.9643L13.3932 2.23601C13.3932 1.98761 13.2107 1.80501 12.9623 
                       1.80501ZM1.65525 5.59648V3.94078C1.65525 3.84154 1.72119 3.77496 1.82106 3.77496H2.11877C2.218 3.77496 2.28458 3.8409
                       2.28458 3.94078V5.59648C2.28458 5.69572 2.21864 5.7623 2.11877 5.7623H1.82106C1.72119 5.7623 1.65525 5.69572 1.65525 
                       5.59648ZM1.65525 11.1754V9.51973C1.65525 9.4205 1.72119 9.35392 1.82106 9.35392H2.11877C2.218 9.35392 2.28458 9.41986 
                       2.28458 9.51973V11.1754C2.28458 11.2747 2.21864 11.3413 2.11877 11.3413H1.82106C1.72119 11.3413 1.65525 11.2753 1.65525 
                       11.1754ZM13.0616 12.9636C13.0616 13.0135 13.0117 13.0628 12.9624 13.0628H2.23472C2.18478 13.0628 2.13548 13.0129 2.13548 
                       2.9636V11.6722C2.40054 11.6556 2.61565 11.4405 2.61565 11.1754V9.51972C2.61565 9.25466 2.40054 9.03954 2.13548 
                       9.0229V6.09321C2.40054 6.07657 2.61565 5.86144 2.61565 5.5964V3.94069C2.61565 3.67564 2.40054 3.46052
                        2.13548 3.44388V2.23513C2.13548 2.18519 2.18542 2.13589 2.23472 2.13589H12.9624C13.0123 2.13589 13.0616 2.18583
                         13.0616 2.23513V12.9636Z"  fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="0.2" />

                    <path
                      d="M9.86799 9.05688C10.0998 8.65929 10.2323 8.21242 10.2323 7.7156C10.2323 7.20213 10.0831 6.72196 9.81871 
                         6.30838L10.4807 5.64637C10.7291 5.39797 10.7291 5.01703 10.4807 4.76861C10.2323 4.52021 9.85137 4.52021 
                         9.60295 4.76861L8.92431 5.44725C8.54338 5.23213 8.09649 5.0996 7.61632 5.0996C7.11951 5.0996 6.67262 5.23213 6.27503 5.48054L5.56309 4.76859C5.31468 4.52019 4.93375 4.52019 4.68533 4.76859C4.43692 5.017 4.43692 5.39793 4.68533 5.64636L5.39727 6.3583C5.14887 6.75589 5.01634 7.21941 5.01634 7.71558C5.01634 8.19575 5.14887 8.64263 5.38064 9.02358L4.71863 9.68558C4.60275 9.80146 4.5368 9.96729 4.5368 10.1325C4.5368 10.2983 4.60275 10.4468 4.71863 10.5794C4.83451 10.6952 5.00034 10.7612 5.16552 10.7612C5.33134 10.7612 5.47988 10.6952 5.61241 10.5794L6.25776 9.934C6.65534 10.1824 7.13552 10.3476 7.64834 10.3476C8.14515 10.3476 8.62533 10.1984 9.02227 9.95L9.65161 10.5793C9.76749 10.6952 9.93332 10.7612 10.0985 10.7612C10.2643 10.7612 10.4129 10.6952 10.5454 10.5793C10.6613 10.4635 10.7272 10.2976 10.7272 10.1325C10.7272 9.96663 10.6613 9.81809 10.5454 9.68556L9.86799 9.05688ZM9.85135 5.00038C9.96723 4.8845 10.1491 4.8845 10.2649 5.00038C10.3808 5.11626 10.3808 5.29809 10.2649 5.41396L9.63559 6.0433C9.50306 5.89413 9.37053 5.76159 9.20536 5.64572L9.85135 5.00038ZM4.93438 5.4146C4.8185 5.29872 4.8185 5.1169 4.93438 5.00102C5.05026 4.88514 5.23208 4.88514 5.34796 5.00102L6.00997 5.66302C5.86079 5.77891 5.71226 5.92808 5.59638 6.07661L4.93438 5.4146ZM5.34796 10.3316C5.23208 10.4475 5.05026 10.4475 4.93438 10.3316C4.88444 10.2816 4.85179 10.199 4.85179 10.1331C4.85179 10.0505 4.88508 9.98393 4.93438 9.93464L5.54708 9.32194C5.66296 9.47111 5.79549 9.61964 5.94467 9.73552L5.34796 10.3316ZM5.34796 7.71558C5.34796 6.45752 6.37425 5.43116 7.63238 5.43116C8.89052 5.43116 9.91681 6.45744 9.91681 7.71558C9.91745 8.97364 8.89116 10 7.63304 10C6.35835 10 5.34796 8.97372 5.34796 7.71558ZM10.2649 10.3316C10.149 10.4475 9.96722 10.4475 9.85135 10.3316L9.27193 9.75216C9.42111 9.63627 9.55364 9.4871 9.68551 9.33857L10.2816 9.93462C10.3315 9.98456 10.3642 10.0672 10.3642 10.1331C10.3642 10.199 10.3315 10.265 10.2649 10.3316Z"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="0.2" />
                    <path d="M7.61574 6.02655C6.68869 6.02655 5.92676 6.78778 5.92676 7.71553C5.92676 8.64257 6.68863 9.40451 7.61574 9.40451C8.54285 9.40451 9.30472 8.64328 9.30472 7.71553C9.30408 6.78848 8.55948 6.02655 7.61574 6.02655ZM7.61574 9.07278C6.8705 9.07278 6.25846 8.46007 6.25846 7.7155C6.25846 6.97026 6.87116 6.35822 7.61574 6.35822C8.36097 6.35822 8.97302 6.97092 8.97302 7.7155C8.97302 8.46073 8.37697 9.07278 7.61574 9.07278Z" fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="0.2" />
                  </svg>
                  <p className="text-[12px] font-normal">Vaulted and Insured</p>
                </div>

                <div className="p-[10px] rounded-[4px]  border border-[#E6E6E6] dark:border-[#FFFFFF1C]">
                  <Link href="/" >
                    <p className="text-black dark:text-white z"><FiShare2 /></p>
                  </Link>
                </div>

              </div>
              <h1 className="text-[24px] md:text-[28px] lg:text-[32px] font-semibold leading-tight mt-[15px] text-black dark:text-white ">
                2024 Bowman Draft Chrome Prospect Autographs Orange Refractors
              </h1>
              <p className="text-[16px] font-medium mt-[10px] text-black dark:text-white ">Owned by <span className="text-[#4DCE94]"> Fcookie</span></p>

              <div className=" flex items-center text-black dark:text-white w-[fit-content] gap-[5px] px-[13px] py-[10px] border border-[#E6E6E6] dark:border-[#FFFFFF0A] bg-[#FFFFFF0A] mt-[23px] rounded-[4px]">
                <svg width="14" height="17" viewBox="0 0 14 17" xmlns="http://www.w3.org/2000/svg"
                  className="transition-colors duration-300 text-black stroke-black dark:text-white dark:stroke-white">
                  <path d="M6.53653 0.0409589L0.332269 2.61276C0.234324 2.65231 0.150456 2.71972 0.0913023 2.80645C0.0321489 2.89318 0.00037369 2.99532 0 3.09993V9.01394C0 11.5509 1.68197 13.5325 3.29404 14.8713C4.90611 16.2102 6.51934 16.9503 6.51934 16.9503C6.59018 16.983 6.66743 17 6.74563 17C6.82383 17 6.90108 16.983 6.97192 16.9503C6.97192 16.9503 8.57941 16.2102 10.1915 14.8713C11.8036 13.5325 13.4855 11.5509 13.4855 9.01394V3.09993C13.4856 2.99596 13.4547 2.89428 13.3966 2.80762C13.3385 2.72096 13.2559 2.65318 13.159 2.61276L6.949 0.0409589C6.88368 0.0139268 6.81358 0 6.74276 0C6.67195 0 6.60185 0.0139268 6.53653 0.0409589ZM6.74276 1.10027L12.42 3.45117V9.01394C12.42 11.0814 10.9962 12.8276 9.50403 14.0669C8.12429 15.2128 6.94303 15.7504 6.74276 15.8456C6.53959 15.7491 5.35938 15.2113 3.9815 14.0669C2.48934 12.8276 1.07128 11.0814 1.07128 9.01394V3.45117L6.74276 1.10027Z" fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="0.2" />
                  <path d="M6.31082 4.25201C4.60149 4.25199 3.2041 5.64817 3.2041 7.35734C3.20413 9.06651 4.60149 10.4627 6.31082 10.4627C6.97413 10.4627 7.58946 10.2514 8.09517 9.89418L9.37878 11.1778C9.58649 11.3863 9.9236 11.3863 10.1312 11.1778C10.3397 10.9701 10.3397 10.6329 10.1312 10.4253L8.84762 9.14171C9.20479 8.636 9.41612 8.0206 9.41615 7.35734C9.41615 5.6482 8.02015 4.25201 6.31082 4.25201ZM6.31082 5.31295C7.44614 5.31295 8.35385 6.22243 8.35382 7.35734C8.35382 8.49226 7.44614 9.40035 6.31082 9.40035C5.1755 9.40037 4.26643 8.49226 4.26643 7.35734C4.2664 6.22243 5.1755 5.31295 6.31082 5.31295Z" fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="0.2" />
                </svg>

                <p className="text-[12px] font-normal  ">PSA: 107245864</p>
              </div>

              {/* Price Box */}
              <div className="mt-6 bg-transparent transition border border-[#E6E6E6] dark:border-[#FFFFFF1C] px-[15px] sm:px-[25px] py-[23px] rounded-[7px]">
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



                <div className="w-full pt-[18px]">
                  {/* Accordion Header */}
                  <div
                    onClick={() => setOpen(!open)}
                    className="flex justify-between items-center cursor-pointer  text-[16px] font-normal text-black dark:text-white "
                  >
                    <span>{selected}</span>

                    <span
                      className={`transform transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"
                        }`}
                    >
                      <IoIosArrowDown />
                    </span>
                  </div>

                  {/* Accordion Body */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[500px] mt-2" : "max-h-0"
                      }`}
                  >
                    {options.map((opt) => (
                      <div
                        key={opt}
                        onClick={() => {
                          setSelected(opt);
                          setOpen(false);
                        }}
                        className="px-4 py-3 cursor-pointer bg-transparent text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[#1a1a1a]"
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                </div>

              </div>



              {/* Features */}
              <div className="flex  flex-wrap gap-2 justify-between text-black dark:text-white border border-[#E6E6E6] dark:border-[#FFFFFF0A] bg-[#FFFFFF0A] rounded-[7px] px-[15px] sm:px-[25px] py-[25px]">
                <div className="flex items-center gap-2 text-[14px] font-normal">
                  <span className="text-lg">

                    <svg width="15" height="16" viewBox="0 0 15 16" xmlns="http://www.w3.org/2000/svg" className="transition-colors duration-300 text-black dark:text-white">
                      <path fillRule="evenodd" clipRule="evenodd"  d="M4.50375 1.3056C3.90846 1.13013 3.34334 1.2064 2.91196 1.528C2.48006 1.8496 2.23497 2.3776 2.21363 3.0128C2.17877 3.624 1.80047 4.16053 1.24316 4.38667C0.654627 4.60587 0.241459 5.008 0.0765041 5.528C-0.0884509 6.048 0.0161421 6.62347 0.363224 7.14987C0.685849 7.66507 0.68689 8.32747 0.365826 8.84587C0.0156217 9.3776 -0.0879305 9.95253 0.0765041 10.472C0.241459 10.9925 0.655668 11.3952 1.23847 11.6117C1.79526 11.8347 2.17617 12.3696 2.21363 12.9819C2.23497 13.6235 2.48058 14.1509 2.91196 14.472C3.34386 14.7936 3.91002 14.8699 4.50583 14.6939C5.08344 14.5392 5.6985 14.7424 6.08045 15.2155C6.46552 15.7211 6.96663 16 7.5 16C8.03389 16 8.53552 15.7205 8.91643 15.2192C9.29525 14.7456 9.90928 14.5397 10.4895 14.6928C11.0915 14.8699 11.6567 14.7936 12.088 14.472C12.5199 14.1504 12.765 13.6224 12.7864 12.9872C12.8212 12.376 13.1995 11.8395 13.7568 11.6133C14.3454 11.3941 14.7585 10.992 14.9235 10.472C15.0885 9.952 14.9839 9.37653 14.6368 8.85013C14.3142 8.33493 14.3131 7.67253 14.6342 7.15413C14.9844 6.6224 15.0879 6.04747 14.9235 5.528C14.7585 5.00747 14.3443 4.6048 13.7615 4.38827C13.2047 4.16533 12.8238 3.6304 12.7864 3.01813C12.765 2.37653 12.5194 1.84907 12.088 1.528C11.6561 1.2064 11.09 1.13013 10.4942 1.30613C9.91656 1.4608 9.3015 1.2576 8.91955 0.784533C8.53448 0.278933 8.03337 0 7.5 0C6.96611 0 6.46448 0.279467 6.08357 0.7808C5.70475 1.2544 5.09072 1.46027 4.51052 1.3072L4.50375 1.3056ZM4.22119 2.33227C4.22536 2.33333 4.229 2.3344 4.23316 2.33547C5.21301 2.6016 6.25425 2.25493 6.8943 1.44907C6.8969 1.44587 6.8995 1.44267 6.9021 1.43947C7.06758 1.2208 7.26792 1.06667 7.5 1.06667C7.73208 1.06667 7.93242 1.2208 8.0979 1.43947C8.1005 1.44267 8.1031 1.44587 8.1057 1.4496C8.74575 2.25493 9.78699 2.6016 10.7668 2.33547C10.7705 2.3344 10.7746 2.33333 10.7783 2.33227C11.0379 2.25493 11.2882 2.25067 11.4761 2.39093C11.6639 2.53067 11.7378 2.776 11.7462 3.05227C11.7462 3.05653 11.7462 3.0608 11.7467 3.0656C11.8029 4.1024 12.446 5.01013 13.3915 5.38507C13.3952 5.38667 13.3988 5.38827 13.403 5.38987C13.6569 5.4832 13.862 5.63093 13.9338 5.8576C14.0056 6.08373 13.9244 6.3264 13.7725 6.5552C13.7704 6.55893 13.7678 6.56267 13.7657 6.56587C13.2162 7.43893 13.2162 8.56107 13.7657 9.4336C13.7683 9.43733 13.7704 9.44107 13.7725 9.44427C13.9244 9.67307 14.0056 9.91627 13.9338 10.1424C13.862 10.3685 13.6575 10.5163 13.403 10.6101C13.3994 10.6117 13.3952 10.6128 13.391 10.6144C12.446 10.9899 11.8029 11.8976 11.7467 12.9349C11.7467 12.9392 11.7467 12.9429 11.7462 12.9472C11.7378 13.224 11.6639 13.4693 11.4761 13.6091C11.2882 13.7488 11.0379 13.7451 10.7788 13.6677C10.7746 13.6667 10.771 13.6656 10.7668 13.6645C9.78699 13.3984 8.74575 13.7451 8.1057 14.5509C8.1031 14.5541 8.1005 14.5573 8.0979 14.5605C7.93242 14.7792 7.73208 14.9333 7.5 14.9333C7.26792 14.9333 7.06758 14.7792 6.9021 14.5605C6.8995 14.5573 6.8969 14.5541 6.8943 14.5504C6.25425 13.7451 5.21301 13.3984 4.23316 13.6645C4.22952 13.6656 4.22536 13.6667 4.22171 13.6677C3.96205 13.7451 3.71176 13.7493 3.52391 13.6091C3.33606 13.4693 3.26217 13.224 3.25384 12.9477C3.25384 12.9435 3.25384 12.9392 3.25332 12.9344C3.19712 11.8976 2.55395 10.9899 1.60845 10.6149C1.60481 10.6133 1.60117 10.6117 1.597 10.6101C1.34307 10.5168 1.13804 10.3691 1.06623 10.1424C0.994424 9.91627 1.0756 9.6736 1.22755 9.4448C1.22963 9.44107 1.23223 9.43733 1.23431 9.43413C1.78381 8.56107 1.78381 7.43893 1.23431 6.5664C1.23171 6.56267 1.22963 6.55893 1.22755 6.55573C1.0756 6.32693 0.994424 6.08373 1.06623 5.8576C1.13804 5.63147 1.34255 5.48373 1.597 5.38987C1.60065 5.38827 1.60481 5.3872 1.60897 5.3856C2.55395 5.01013 3.19712 4.1024 3.25332 3.06507C3.25332 3.0608 3.25332 3.05707 3.25384 3.0528C3.26217 2.776 3.33606 2.53067 3.52391 2.39093C3.71176 2.2512 3.96205 2.25493 4.22119 2.33227ZM7.23982 8.84587L5.52626 7.0896C5.32332 6.8816 4.99341 6.8816 4.79047 7.0896C4.58753 7.2976 4.58753 7.63573 4.79047 7.84373C4.79047 7.84373 5.90613 8.9872 6.50403 9.6C6.69916 9.8 6.96403 9.91253 7.23982 9.91253C7.51561 9.91253 7.78048 9.8 7.97561 9.6L10.7299 6.77707C10.9328 6.56907 10.9328 6.23093 10.7299 6.02293C10.527 5.81493 10.197 5.81493 9.9941 6.02293L7.23982 8.84587Z" fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="0.2" />
                    </svg>

                  </span> Authenticity guarantee
                </div>
                <div className="flex items-center gap-2 text-[14px] font-normal ">
                  <span className="text-lg">
                    <svg width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                      className="transition-colors duration-300 text-black stroke-black dark:text-white dark:stroke-white"
                    >
                      <path d="M13.8575 0.0999976H1.32502C0.646376 0.0999976 0.0996094 0.646109 0.0996094 1.3254V13.8745C0.0996094
                   14.5531 0.645721 15.0999 1.32502 15.0999H13.8741C14.1885 15.0999 14.5195 14.9674 14.7352 14.7356C14.967
                    14.5038 15.0829 14.1895 15.0829 13.8578L15.0822 1.32531C15.0822 0.646027 14.5362 0.0999976 13.8575 
                    0.0999976ZM14.387 14.3874C14.2545 14.5199 14.0727 14.6025 13.8736 14.6025H1.32513C0.927545 14.6025 0.596551 
                    14.2715 0.596551 13.8739V1.3255C0.596551 0.927917 0.927545 0.596923 1.32513 0.596923H13.8577C14.2553 0.596923 14.5862 0.927917 
                    14.5862 1.3255V13.858C14.5856 14.0565 14.5195 14.2382 14.387 14.3874Z"   fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="0.2" />
                      <path d="M12.9623 1.80501H2.23463C1.98622 1.80501 1.80439 1.98684 1.80439 2.23524V3.444C1.53934 3.46064 1.32422
                      3.67577 1.32422 3.94081V5.59651C1.32422 5.86157 1.53934 6.07669 1.80439 6.09333V9.02368C1.53934 9.04032 1.32422 9.25545
                       1.32422 9.52049V11.1762C1.32422 11.4413 1.53934 11.6564 1.80439 11.673V12.9643C1.80439 13.2128 1.98622 13.3946 2.23463 
                       13.3946H12.9623C13.2107 13.3946 13.3925 13.2128 13.3925 12.9643L13.3932 2.23601C13.3932 1.98761 13.2107 1.80501 12.9623 
                       1.80501ZM1.65525 5.59648V3.94078C1.65525 3.84154 1.72119 3.77496 1.82106 3.77496H2.11877C2.218 3.77496 2.28458 3.8409
                       2.28458 3.94078V5.59648C2.28458 5.69572 2.21864 5.7623 2.11877 5.7623H1.82106C1.72119 5.7623 1.65525 5.69572 1.65525 
                       5.59648ZM1.65525 11.1754V9.51973C1.65525 9.4205 1.72119 9.35392 1.82106 9.35392H2.11877C2.218 9.35392 2.28458 9.41986 
                       2.28458 9.51973V11.1754C2.28458 11.2747 2.21864 11.3413 2.11877 11.3413H1.82106C1.72119 11.3413 1.65525 11.2753 1.65525 
                       11.1754ZM13.0616 12.9636C13.0616 13.0135 13.0117 13.0628 12.9624 13.0628H2.23472C2.18478 13.0628 2.13548 13.0129 2.13548 
                       2.9636V11.6722C2.40054 11.6556 2.61565 11.4405 2.61565 11.1754V9.51972C2.61565 9.25466 2.40054 9.03954 2.13548 
                       9.0229V6.09321C2.40054 6.07657 2.61565 5.86144 2.61565 5.5964V3.94069C2.61565 3.67564 2.40054 3.46052
                        2.13548 3.44388V2.23513C2.13548 2.18519 2.18542 2.13589 2.23472 2.13589H12.9624C13.0123 2.13589 13.0616 2.18583
                         13.0616 2.23513V12.9636Z"  fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="0.2" />

                      <path
                        d="M9.86799 9.05688C10.0998 8.65929 10.2323 8.21242 10.2323 7.7156C10.2323 7.20213 10.0831 6.72196 9.81871 
                         6.30838L10.4807 5.64637C10.7291 5.39797 10.7291 5.01703 10.4807 4.76861C10.2323 4.52021 9.85137 4.52021 
                         9.60295 4.76861L8.92431 5.44725C8.54338 5.23213 8.09649 5.0996 7.61632 5.0996C7.11951 5.0996 6.67262 5.23213 6.27503 5.48054L5.56309 4.76859C5.31468 4.52019 4.93375 4.52019 4.68533 4.76859C4.43692 5.017 4.43692 5.39793 4.68533 5.64636L5.39727 6.3583C5.14887 6.75589 5.01634 7.21941 5.01634 7.71558C5.01634 8.19575 5.14887 8.64263 5.38064 9.02358L4.71863 9.68558C4.60275 9.80146 4.5368 9.96729 4.5368 10.1325C4.5368 10.2983 4.60275 10.4468 4.71863 10.5794C4.83451 10.6952 5.00034 10.7612 5.16552 10.7612C5.33134 10.7612 5.47988 10.6952 5.61241 10.5794L6.25776 9.934C6.65534 10.1824 7.13552 10.3476 7.64834 10.3476C8.14515 10.3476 8.62533 10.1984 9.02227 9.95L9.65161 10.5793C9.76749 10.6952 9.93332 10.7612 10.0985 10.7612C10.2643 10.7612 10.4129 10.6952 10.5454 10.5793C10.6613 10.4635 10.7272 10.2976 10.7272 10.1325C10.7272 9.96663 10.6613 9.81809 10.5454 9.68556L9.86799 9.05688ZM9.85135 5.00038C9.96723 4.8845 10.1491 4.8845 10.2649 5.00038C10.3808 5.11626 10.3808 5.29809 10.2649 5.41396L9.63559 6.0433C9.50306 5.89413 9.37053 5.76159 9.20536 5.64572L9.85135 5.00038ZM4.93438 5.4146C4.8185 5.29872 4.8185 5.1169 4.93438 5.00102C5.05026 4.88514 5.23208 4.88514 5.34796 5.00102L6.00997 5.66302C5.86079 5.77891 5.71226 5.92808 5.59638 6.07661L4.93438 5.4146ZM5.34796 10.3316C5.23208 10.4475 5.05026 10.4475 4.93438 10.3316C4.88444 10.2816 4.85179 10.199 4.85179 10.1331C4.85179 10.0505 4.88508 9.98393 4.93438 9.93464L5.54708 9.32194C5.66296 9.47111 5.79549 9.61964 5.94467 9.73552L5.34796 10.3316ZM5.34796 7.71558C5.34796 6.45752 6.37425 5.43116 7.63238 5.43116C8.89052 5.43116 9.91681 6.45744 9.91681 7.71558C9.91745 8.97364 8.89116 10 7.63304 10C6.35835 10 5.34796 8.97372 5.34796 7.71558ZM10.2649 10.3316C10.149 10.4475 9.96722 10.4475 9.85135 10.3316L9.27193 9.75216C9.42111 9.63627 9.55364 9.4871 9.68551 9.33857L10.2816 9.93462C10.3315 9.98456 10.3642 10.0672 10.3642 10.1331C10.3642 10.199 10.3315 10.265 10.2649 10.3316Z"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="0.2" />
                      <path d="M7.61574 6.02655C6.68869 6.02655 5.92676 6.78778 5.92676 7.71553C5.92676 8.64257 6.68863 9.40451 7.61574 9.40451C8.54285 9.40451 9.30472 8.64328 9.30472 7.71553C9.30408 6.78848 8.55948 6.02655 7.61574 6.02655ZM7.61574 9.07278C6.8705 9.07278 6.25846 8.46007 6.25846 7.7155C6.25846 6.97026 6.87116 6.35822 7.61574 6.35822C8.36097 6.35822 8.97302 6.97092 8.97302 7.7155C8.97302 8.46073 8.37697 9.07278 7.61574 9.07278Z" fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="0.2" />
                    </svg>
                  </span>Vaulted and insured for free
                </div>
                <div className="flex items-center gap-2 text-[14px] font-normal e">
                  <span className="text-lg">
                    <svg width="13" height="17" viewBox="0 0 13 17" xmlns="http://www.w3.org/2000/svg" className="transition-colors duration-300 text-black dark:text-white">
                      <path d="M9.66715 7.16362C9.62728 7.06355 9.52721 7.00336 9.42715 7.00336H7.92614L9.70701 0.398938C9.74688 0.278546 9.68669 0.138604 9.56708 0.0784036C9.44668 0.0182073 9.30674 0.0580781 9.22701 0.158145L3.06268 8.66464C3.00249 8.74438 3.00249 8.86477 3.04236 8.94451C3.08223 9.04457 3.1823 9.10477 3.28236 9.10477H4.78336L3.00249 15.7092C2.96262 15.8296 3.02282 15.9695 3.14243 16.0297C3.1823 16.0501 3.22217 16.05 3.26282 16.05C3.34256 16.05 3.44263 16.0102 3.48329 15.9297L9.6264 7.46379C9.70692 7.36372 9.70702 7.26369 9.66715 7.16362ZM3.94292 14.4083L5.42359 8.90459C5.44391 8.82485 5.42359 8.72478 5.38372 8.66459C5.32352 8.60439 5.24378 8.56452 5.16325 8.56452H3.84205L8.74613 1.72014L7.26546 7.22382C7.24513 7.30356 7.26546 7.40363 7.30533 7.46382C7.36552 7.52402 7.44526 7.56389 7.52579 7.56389H8.86653L3.94292 14.4083Z" fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="0.2" />
                      <path d="M10.5271 12.8072C12.2681 11.2859 13.0288 8.94443 12.5284 6.68272C12.168 5.08165 11.2275 3.70112 9.86644 2.80052C9.74605 2.72078 9.56624 2.76065 9.4865 2.88026C9.40676 3.00065 9.44663 3.18046 9.56625 3.2602C10.8069 4.08106 11.6677 5.34119 11.9883 6.80237C12.4487 8.86395 11.7483 11.0052 10.1667 12.3857C9.42639 13.0463 8.56566 13.4864 7.5854 13.6866C7.56507 13.6866 7.54553 13.6866 7.5252 13.7069L7.40481 13.2066C7.38449 13.1065 7.30474 13.0268 7.20468 13.0064C7.10461 12.9861 7.00454 13.0064 6.92481 13.0862L5.94447 14.1283C5.88428 14.1885 5.84441 14.2885 5.86473 14.3886C5.88506 14.4683 5.94447 14.5489 6.04454 14.5887L7.40561 15.1094C7.44548 15.1297 7.46581 15.1297 7.50568 15.1297C7.56588 15.1297 7.64562 15.1094 7.68549 15.05C7.76523 14.9898 7.80588 14.8897 7.76523 14.7897L7.64484 14.269C7.66516 14.269 7.68471 14.269 7.70503 14.2487C8.76668 14.0079 9.747 13.5075 10.5273 12.8071L10.5271 12.8072Z" fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="0.2" />
                      <path d="M3.14211 12.8674C1.90144 12.0466 1.02029 10.7864 0.700673 9.32526C0.240205 7.26368 0.940673 5.12245 2.52221 3.74192C3.24301 3.10166 4.14362 2.64119 5.10354 2.44105C5.12387 2.44105 5.14341 2.44105 5.16374 2.42073L5.28413 2.92106C5.30445 3.02113 5.3842 3.10087 5.48426 3.14153C5.50459 3.14153 5.52413 3.16186 5.564 3.16186C5.64375 3.16186 5.70394 3.12198 5.76414 3.08211L6.78514 2.04158C6.84534 1.98138 6.88521 1.88131 6.86488 1.80158C6.84456 1.70151 6.78514 1.64131 6.68507 1.60144L5.324 1.08077C5.22394 1.0409 5.12387 1.06045 5.04414 1.12065C4.9644 1.18084 4.92374 1.30045 4.96439 1.40051L5.08479 1.90085C5.06446 1.90085 5.04492 1.92117 5.02459 1.92117C3.96372 2.16117 3.00284 2.64198 2.2023 3.36198C0.461297 4.88332 -0.299372 7.22476 0.200962 9.48648C0.561364 11.0875 1.50183 12.4885 2.86294 13.3891C2.90282 13.429 2.96301 13.429 3.02321 13.429C3.10295 13.429 3.20302 13.3891 3.26321 13.3086C3.3023 13.128 3.26243 12.9474 3.14203 12.8677L3.14211 12.8674Z" fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="0.2" />
                    </svg>

                  </span>Collect digitally, redeem anytime
                </div>
              </div>


              {/* Recent Transactions */}
              <div className="w-full transition border border-[#E6E6E6] dark:border-[#FFFFFF1C] rounded-[7px]  text-black dark:text-white">
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
                  <div className="flex justify-between items-center  px-[10px] sm:px-[16px] py-[18px] rounded-[7px] text-[15px] sm:text-[16px] font-normal border border-[#E6E6E6] dark:border-[#FFFFFF0A] bg-[#FFFFFF0A]">
                    <p >
                      {activeTab} {activeGrade} (Population 11003)
                    </p>

                    <button className="underline">
                      View All Transactions
                    </button>
                  </div>

                  {/* List */}
                  <div className="px-[10px] sm:px-[16px]">
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
              <div className=" rounded-[7px] border text-black dark:text-white transition  border-[#E6E6E6] dark:border-[#FFFFFF1C] shadow-lg ">
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
            <h2 className="text-[24px] md:text-[28px] lg:text-[32px] font-semibold mb-[12px]">Activity History</h2>

            <div className="space-y-4 " >
              {activityData.map((item, index) => (
                <div
                  key={index}
                  className=" border border-[#E6E6E6] dark:border-[#FFFFFF1C] transition rounded-[7px]  flex-col pb-[20px] pt-[20px] px-[15px] sm:px-[20px] sm:pb-[25px]">

                  <div className="flex justify-between items-center mb-[20px]">
                    <div className="flex items-center gap-3">
                      <span className="px-[13px] py-[7px] text-[14px] font-normal  rounded-lg bg-[#FFFFFF0A] flex gap-2 items-center">
                        {item.icons} {item.type}
                      </span>
                      <span className="text-[12px] opacity-50">{item.time}</span>
                    </div>


                    <div className="bg-[#FFFFFF0A] p-[10px] rounded-[4px] ">
                      <Link href="/">
                        <FaArrowUpRightFromSquare />
                      </Link>
                    </div>
                  </div>

                  {/* Price */}
                  <p className="text-[22px] font-medium mb-[15px]">{item.amount}</p>

                  {/* From / To */}
                  <div className="flex flex-wrap items-center gap-2 px-[15px] py-[7px] text-black dark:text-white border border-[#E6E6E6] dark:border-transparent bg-[#FFFFFF0A] w-[fit-content] rounded-[4px]" >
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
      <SimilarProducts />



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