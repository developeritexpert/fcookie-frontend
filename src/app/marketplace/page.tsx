
import React from "react";
import Discover from "@/components/layout/DiscoverMore";
import ProductsFilter from "@/components/public/marketplace/MarketFilterSec";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketplace | Start Building Your Collection",
  description:
    "Discover, collect, and trade digital packs and rare items. Explore products and build your collection.",
};

export default function MarketplacePage() {
  return (
    <div>
      {/* Banner */}
      <div className="px-[20px] md:px-[30px] lg:px-[60px] m-auto pb-[20px] md:pb-[50px] lg:pb-[105px] relative ">
        <div className="absolute top-[-10%] left-0  bg-[#EFB24D]/40 blur-[724px] -z-0 h-[25%] w-full"></div>



        <div className="bg-[url('/img/market-bann-img.webp')]  bg-no-repeat bg-center bg-cover m-auto max-w-[1800px] w-full h-[250px] sm:h-[300px] md:h-[420px] lg:h-[642px] relative brightness-110 rounded-[10px] md:rounded-[15px] lg:rounded-[25px]">
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.1),rgba(0,0,0,0.1)),linear-gradient(180deg,rgba(255,255,255,0)_43.69%,rgba(255,255,255,0.99)_100%)] dark:bg-[linear-gradient(180deg,rgba(0,0,0,0)_43.69%,rgba(0,0,0,0.94)_100%),linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2))] rounded-[10px] md:rounded-[15px] lg:rounded-[25px]"></div>

          {/* Banner Text */}
          <div className="flex flex-col text-white absolute top-[25px] left-[20px] sm:top-[30px] sm:left-[30px] md:top-auto md:left-[40px] md:bottom-[33px] lg:left-[80px] xl:left-[180px]">
            <h1 className="text-[26px] sm:text-[28px] md:text-[35px] lg:text-[50px] font-semibold mb-[8px] leading-[30px] md:leading-[40px] ">
              Start Building Your Collection
            </h1>

            <p className="text-[18px] md:text-[20px] leading-[24px] md:leading-[27px] max-w-[650px]">
              Discover, collect, and trade digital packs and rare items. Your next
              find is waiting.
            </p>
          </div>
        </div>
      </div>

      {/* Filters & Discover section */}
      <ProductsFilter />
      <Discover />
    </div>
  );
}
