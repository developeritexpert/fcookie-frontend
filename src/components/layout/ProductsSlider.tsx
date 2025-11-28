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
    <div className="pt-[30px] lg:pt-[50px] pb-[50px] lg:pb-[110px] px-[20px] md:px-[30px] lg:px-[50px] overflow-hidden relative  ">
      <div className=" move-right absolute   bottom-0 left-[-20%] z-20 w-[300px] h-[75px]   sm:w-[400px] sm:h-[120px]   md:w-[550px] md:h-[130px]   lg:w-[650px] lg:h-[150px]  xl:w-[876px] xl:h-[195px]   bg-[url('/img/fcookie.png')]  bg-no-repeat bg-contain"></div>
      <div className="container relative">
        <div className="absolute z-10 top-0 left-[-200%] bg-white dark:bg-black w-[200%] h-full "></div>
        <div className="flex justify-between mb-[30px] text-black dark:text-white">
          <h2 className="font-semibold text-[24px] md:text-[28px] lg:text-[32px] ">
            Featured Products
          </h2>

          <Link href="/" className="flex gap-1 items-center ">
            <TfiLayoutLineSolid />
            Explore All Collections
          </Link>
        </div>

        <Slider ref={sliderRef} {...settings}>
          {slides.map((item, i) => (
            <div
              key={i}
              className="group h-full p-[14px] pb-[24px] border border-[#E6E6E6] dark:border-[#1E1E1E] w-full bg-white dark:bg-[#0D0D0D] rounded-[14px]  transition-all duration-300 hover:shadow-lg hover:shadow-[#EFB24D]/20"
            >
              <div className="bg-[#1921610A] rounded-[14px] flex items-center justify-center overflow-hidden  ">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={272}
                  height={225}
                  className="rounded-[14px] group-hover:scale-105 transition-transform"
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
              className="group border rounded-[21px]  border-[#E6E6E6] dark:border-[#FFFFFF4D] hover:border-[#EFB24D] hover:bg-[#EFB24D] bg-transparent duration-400 py-[11px] px-[18px] transition "
            >
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
                  className=" fill-[#000000] stroke-[#000000] dark:fill-[#FFFFFF4D] dark:stroke-[#FFFFFF4D] group-hover:fill-[#000] group-hover:stroke-[#000] transition-colors duration-400"
                />
              </svg>
            </button>

            <button
              onClick={() => sliderRef.current?.slickNext()}
              className="group border rounded-[21px]  border-[#E6E6E6] dark:border-[#FFFFFF4D] hover:border-[#EFB24D] hover:bg-[#EFB24D] bg-transparent duration-400 py-[11px] px-[18px] transition "
            >
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
                  className="fill-[#000000] stroke-[#000000] dark:fill-[#FFFFFF4D] dark:stroke-[#FFFFFF4D] group-hover:fill-[#000] group-hover:stroke-[#000] transition-colors duration-400"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
