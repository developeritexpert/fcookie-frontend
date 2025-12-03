import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { Settings } from "react-slick";
import SliderBase from "react-slick";

const Slider = dynamic(() => import("react-slick"), {
  ssr: false,
}) as unknown as typeof SliderBase;

export default function VerticalSlider() {
  const sliderRef = useRef<any>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const settings: Settings = {
    vertical: true,
    verticalSwiping: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2500,
  };

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const slick = sliderRef.current?.innerSlider;
      if (!slick) return;

      if (e.deltaY > 0) slick.slickNext();
      else slick.slickPrev();
    };

    wrapper.addEventListener("wheel", handleWheel, { passive: false });
    return () => wrapper.removeEventListener("wheel", handleWheel);
  }, []);






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
    <div className="pt-[30px] pb-[20px]  sm:py-[50px] md:py-[70px] lg:py-[100px] px-[20px] md:px-[30px] lg:px-[50px] relative">
      <div className="absolute bottom-[30%] right-0 bg-[#75DA5B]/20 blur-[150px] -z-10 h-[108px] w-[108px] md:h-[208px] md:w-[208px] lg:h-[308px] lg:w-[308px]"></div>
      <div className="absolute inset-0 z-[-1] bg-gradient-to-b from-[#EFB24D14] to-[rgba(239,178,77,0)] pointer-events-none" />
      <div className="container mx-auto" data-aos="fade-up" data-aos-delay="100">
        <div className="w-full flex flex-col lg:flex-row gap-[30px]  md:gap-[40px]  xl:gap-[50px]  2xl:gap-[100px]">
          {/* LEFT SIDE TEXT */}
          <div className="flex-1">
            <div className="flex flex-col justify-center h-full">
              <h2 className="text-[24px] md:text-[28px] lg:text-[32px] font-semibold">Your Collection, Safely Vaulted</h2>
              <div ref={wrapperRef} className="vertical-sld mx-auto  w-full mt-6 overflow-hidden relative">
                <div className="absolute z-10 bottom-0 left-0 w-full min-h-[100px] sm:min-h-[130px] md:min-h-[182px]
                     bg-gradient-to-t from-white/100 to-white/0
                      dark:bg-[linear-gradient(0deg,#070502_43.5%,rgba(7,5,2,0)_100%)]"></div>
                <Slider ref={sliderRef} {...settings}>
                  {contentCards.map((card) => (
                    <div key={card.id} className="px-[5px]">
                      <div className="bg-transparent dark:bg-[#0D0D0D] border border-[#E6E6E6] dark:border-[#343434] rounded-[16px] px-[15px] py-[20px] md:px-[30px] md:py-[25px] 2xl:px-[36px] 2xl:py-[30px]
                        transition-all duration-300  text-black dark:text-white">
                        <h3 className=" text-[18px] lg:text-[20px] xl:text-[22px] font-medium mb-[10px]">{card.title}</h3>
                        <p className=" font-normal text-[16px] lg:text-[18px]">{card.desc}</p>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="flex-1  xl:basis-[250px] ">
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
