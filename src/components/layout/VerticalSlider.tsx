import React from "react";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

export default function VerticalSlider() {
  const settings = {
    vertical: true,
    verticalSwiping: true,
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          vertical: false,
          verticalSwiping: false,
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          vertical: false,
          verticalSwiping: false,
          slidesToShow: 1,
        },
      },
    ],
  };

  const contentCards = [
    {
      id: 1,
      title: "1. Deliver Your Collectibles",
      desc: "Ship directly to the vault from your home, or from grading companies and marketplaces like PSA, CGC, eBay, and Fanatics Collect.",
    },
    {
      id: 2,
      title: "2. Access Your Free Vault",
      desc: "After your package arrives at our vault, your collectible is authenticated, vaulted, and insured for free. We process your collectible and add it directly to your collection.",
    },
    {
      id: 3,
      title: "3. Deliver Your Collectibles",
      desc: "Ship directly to the vault from your home, or from grading companies and marketplaces like PSA, CGC, eBay, and Fanatics Collect.",
    },
    {
      id: 4,
      title: "4. Access Your Free Vault",
      desc: "After your package arrives at our vault, your collectible is authenticated, vaulted, and insured for free. We process your collectible and add it directly to your collection.",
    },
  ];

  return (
    <div className="py-[30px] sm:py-[50px] md:py-[70px] lg:py-[100px] px-[20px] md:px-[30px] lg:px-[50px] relative">
      <div className="absolute bottom-[30%] right-0 bg-[#75DA5B]/20 blur-[150px] -z-10 h-[108px] w-[108px] md:h-[208px] md:w-[208px] lg:h-[308px] lg:w-[308px]"></div>
      <div className="absolute inset-0 z-[-1] bg-gradient-to-b from-[#EFB24D14] to-[rgba(239,178,77,0)] pointer-events-none" />
      <div className="container mx-auto">
        <div className="w-full flex flex-col md:flex-row gap-[30px]  md:gap-[40px] lg:gap-[70px]  xl:gap-[100px]">
          {/* LEFT SIDE TEXT */}
          <div className="flex-1">
            <div className="flex flex-col justify-center h-full">
              <h2 className="text-[24px] md:text-[28px] lg:text-[32px] font-semibold">Your Collection, Safely Vaulted</h2>
              <div className="vertical-sld mx-auto max-w-[420px] w-full h-[380px] mt-6 overflow-hidden">
                <Slider {...settings}>
                  {contentCards.map((card) => (
                    <div key={card.id} className="px-[5px]">
                      <div className="g-[#0D0D0D] border border-[#2A2A2A] rounded-[16px] px-6 py-5
                        transition-all duration-300 slick-active:opacity-100 opacity-40">
                        <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                        <p className="text-gray-400 text-sm">{card.desc}</p>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="flex-1 basis-[250px] ">
            <div className="rounded-[20px] overflow-hidden">
              <img
                src="/img/verticalslider-img.webp"
                alt="Vending machines"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
