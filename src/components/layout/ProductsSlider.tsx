"use client";

import React, { useRef, useState, useEffect } from "react";
import Slider, { Settings } from "react-slick";
import Image from "next/image";
import Link from "next/link";
import { TfiLayoutLineSolid } from "react-icons/tfi";

import { JSX } from "react";
interface SlideItem {
  image: string;
  title: string;
  price: string;
}

export default function ProductsSlider(): JSX.Element {
  const sliderRef = useRef<Slider | null>(null);

  const [current, setCurrent] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [slidesToShow, setSlidesToShow] = useState<number>(7);

  const slides: SlideItem[] = [
    { image: "/img/product-slider1.png", title: "Baseball Starter Pack", price: "$25.00" },
    { image: "/img/product-slider2.png", title: "Baseball Starter Pack", price: "$25.00" },
    { image: "/img/product-slider3.png", title: "Pokémon Starter Pack", price: "$25.00" },
    { image: "/img/product-slider4.png", title: "Sports Starter Pack", price: "$25.00" },
    { image: "/img/product-slider5.png", title: "Baseball Pro Pack", price: "$25.00" },
    { image: "/img/product-slider6.png", title: "Football Pro Pack", price: "$25.00" },
  ];

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 480) setSlidesToShow(1);
      else if (width < 768) setSlidesToShow(2);
      else if (width < 1024) setSlidesToShow(3);
      else setSlidesToShow(5);
    };

    handleResize();
    setTotal(slides.length);
    setProgress((1 / slides.length) * 100);

    window.addEventListener("resize", handleResize);

    // safe access with optional chaining
    setTimeout(() => {
      sliderRef.current?.slickGoTo(0);
    }, 100);

    return () => window.removeEventListener("resize", handleResize);
  }, [slides.length]);

  const settings: Settings = {
    dots: false,
    infinite: true,
    slidesToShow,
    slidesToScroll: 1,
    arrows: false,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 4000,
    beforeChange: (_oldIndex: number, newIndex: number) => {
      setProgress(((newIndex + 1) / slides.length) * 100);
      setCurrent(newIndex + 1);
    },
  };

  return (
    <div className="pt-[30px] lg:pt-[50px] pb-[50px] lg:pb-[110px] px-[20px] md:px-[30px] lg:px-[50px] overflow-hidden relative">
      <div className="relative">
        <div className="container relative">
          <div className="flex justify-between mb-[30px]">
            <h2 className="font-semibold text-[24px] md:text-[28px] lg:text-[32px] text-white">
              Featured Products
            </h2>

            <Link href="/" className="flex gap-1 items-center text-white">
              <TfiLayoutLineSolid />
              Explore All Collections
            </Link>
          </div>

          <Slider ref={sliderRef} {...settings}>
            {slides.map((item, i) => (
              <div
                key={i}
                className="h-full p-[14px] pb-[24px] border border-[#E6E6E6] dark:border-[#1E1E1E] w-full bg-white dark:bg-[#0D0D0D] rounded-[14px]"
              >
                <div className="bg-[#1921610A] rounded-full flex items-center justify-center">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={272}
                    height={225}
                    className="rounded-[14px]"
                  />
                </div>
                <p className="mt-[25px] text-[18px] sm:text-[20px] dark:text-white font-medium">
                  {item.title}
                </p>
                <p className="mt-[5px] text-[15px] text-[#6C6C6C]">{item.price}</p>
              </div>
            ))}
          </Slider>

          <div className="w-full bg-[#0A90C812] h-1 rounded-full mt-[48px] overflow-hidden flex">
            <div
              className="h-full bg-[#7C4A17] transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <p className="text-sm flex items-center">
              <span className="font-semibold text-[24px] md:text-[29px]">{current}</span>/
              <span className="ml-1 text-[18px] md:text-[22px]">{total}</span>
            </p>

            <div className="flex items-center gap-4">
              <button
                onClick={() => sliderRef.current?.slickPrev()}
                className="group border border-[#FFFFFF4D] hover:bg-[#EFB24D] transition rounded-[21px] w-12 flex items-center justify-center"
              >
                Prev
              </button>

              <button
                onClick={() => sliderRef.current?.slickNext()}
                className="group border border-[#FFFFFF4D] hover:bg-[#EFB24D] transition rounded-[21px] w-12 flex items-center justify-center"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
