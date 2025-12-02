"use client";

import Link from "next/link";
import { JSX } from "react";

export default function Banner(): JSX.Element {
  return (
    <div>
      <div className="px-[20px] md:px-[30px] lg:px-[50px] m-auto pb-[20px] md:pb-[50px] lg:pb-[105px] relative">
        
        {/* Background Shade */}
           <div className="absolute top-[-10%] left-0  bg-[#EFB24D]/40 blur-[724px] -z-0 h-[25%] w-full"></div>

        {/* Banner Image */}
        <div className="bg-[url('/img/bann1.png')] bg-cover bg-center max-w-[1800px] m-auto w-full h-[360px] md:h-[420px] lg:h-[642px] relative filter brightness-110 rounded-[10px] md:rounded-[15px] lg:rounded-[25px]">

          {/* Gradient Overlay */}
          <div className="absolute inset-0 
            bg-[linear-gradient(0deg,rgba(0,0,0,0.1),rgba(0,0,0,0.1)),linear-gradient(180deg,rgba(255,255,255,0)_43.69%,rgba(255,255,255,0.99)_100%)] 
            dark:bg-[linear-gradient(180deg,rgba(0,0,0,0)_43.69%,rgba(0,0,0,0.94)_100%),linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2))] 
            rounded-[10px] md:rounded-[15px] lg:rounded-[25px]"></div>

          {/* Banner Shade 2 (Fixed URL typo) */}
          <div className="absolute top-[-50px] left-0 bg-[url('/img/bann-shade.png')] bg-cover bg-center"></div>

          {/* Text Content */}
          <div className="flex flex-col text-white absolute left-[15px] top-[15px] right-[15px] 
            sm:left-[20px] sm:top-[20px] 
            md:right-auto md:left-[30px] md:bottom-[-25px] md:top-auto 
            xl:left-[180px] xl:bottom-[-25px] 
            lg:top-auto lg:max-w-[598px]"
          >
            <h1 className="text-[25px] md:text-[35px] lg:text-[50px] font-semibold mb-[3px]">
              Discover. Collect. Trade.
            </h1>

            <p className="text-[18px] md:text-[20px] leading-[27px] mb-5 md:mb-[31px]">
              A digital marketplace built for the future of collectibles.
              <br />
              Own remarkable digital items with verified authenticity, transparent pricing, and a smooth trading experience.
            </p>

            {/* Button */}
            <div>
              <Link
                href="/"
                className="bg-[#EFB24D] border border-[#EFB24D] px-[20px] py-[10px] md:px-[30px] md:py-[14px] 
                rounded-[7px] inline-block text-black transition-all duration-200
                hover:text-black dark:hover:text-white hover:border-[#EFB24D] hover:bg-transparent"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
