"use client";
import AboutFaq from '@/components/layout/AboutFaq';
import AboutSlider from '@/components/layout/AboutSlider';
import Discover from '@/components/layout/DiscoverMore'
import VaultSecurity from '@/components/layout/VaultSecurity';
import VertcalSlider from '@/components/layout/VerticalSlider';
import React from "react";

export default function AboutPage() {




  return (
    <div>
      {/* Banner */}
      <div className="px-[20px] md:px-[30px] lg:px-[60px] m-auto pb-[20px] md:pb-[50px] lg:pb-[100px] relative ">
        <div className="absolute top-[-10%] left-0 bg-[#EFB24D]/40 blur-[724px] -z-0 h-[25%] w-full"></div>

        <div className="bg-[url('/img/about-banner.webp')] bg-no-repeat bg-center bg-cover 
        m-auto max-w-[1800px] w-full h-[250px] sm:h-[300px] md:h-[420px] lg:h-[642px] 
        relative brightness-110 rounded-[10px] md:rounded-[15px] lg:rounded-[25px]">

          {/* bg-gradient  */}
          {/* <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.1),rgba(0,0,0,0.1)),
          linear-gradient(180deg,rgba(255,255,255,0)_43.69%,rgba(255,255,255,0.99)_100%)] 
          dark:bg-[linear-gradient(180deg,rgba(0,0,0,0)_43.69%,rgba(0,0,0,0.94)_100%),
          linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2))] 
          rounded-[10px] md:rounded-[15px] lg:rounded-[25px]"></div> */}

          <div className="flex flex-col text-white absolute top-[25px] left-[20px] 
          sm:top-[30px] sm:left-[30px] md:top-auto md:left-[40px] md:bottom-[33px] 
          lg:left-[80px] xl:left-[180px]">
            <h1 className="text-[26px] sm:text-[28px] md:text-[35px] lg:text-[50px] font-semibold mb-[8px]">
              Where Collecting Evolves
            </h1>
            <p className="text-[18px] md:text-[20px] max-w-[650px]">
              At Fcookie, we bring collectors, creators, and fans together through a transparent
              and rewarding digital marketplace.
            </p>
          </div>
        </div>
      </div>
      <AboutSlider />
      <VaultSecurity />
      <VertcalSlider />
      <AboutFaq />
      <Discover />
    </div>
  );
}
