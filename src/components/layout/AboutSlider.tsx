"use client";
import React, { useRef, useState, useEffect } from 'react'
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from 'next/link';


const Slider = dynamic(() => import("react-slick"), {
  ssr: false,
});


export default function AboutSlider() {
  const sliderRef = useRef(null);
  const [slidesToShow, setSlidesToShow] = useState(2);
  const [centerPadding, setCenterPadding] = useState("350px");
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      
      if (width < 480) {
        setSlidesToShow(1);
        setCenterPadding("0px");
      } else if (width < 768) {
        setSlidesToShow(1);
        setCenterPadding("60px");
      } else if (width < 1024) {
        setSlidesToShow(2);
        setCenterPadding("80px");
      } else if (width < 1200) {
        setSlidesToShow(2);
        setCenterPadding("140px");
      } else if (width < 1300) {
        setSlidesToShow(2);
        setCenterPadding("180px");
      } else if (width < 1500) {
        setSlidesToShow(2);
        setCenterPadding("200px");
      } else if (width < 1700) {
        setSlidesToShow(2);
        setCenterPadding("250px");
      } else {
        setSlidesToShow(2);
        setCenterPadding("350px");
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    // This is the same pattern used in ProductCarousel
    if (sliderRef.current) {
      setTimeout(() => {
        // We need to assert the type here to avoid TypeScript error
        const slider = sliderRef.current as any;
        if (slider && slider.slickGoTo) {
          slider.slickGoTo(0);
        }
      }, 100);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [slidesToShow]);

  interface ArrowProps {
    onClick?: () => void;
  }

  const NextArrow = ({ onClick }: ArrowProps) => (
    <button
      onClick={onClick}
      className="group cursor-pointer absolute md:left-[-40px] left-auto md:right-auto right-[10px] md:top-1/2 top-[104%] md:-translate-y-1/2 z-10 bg-[#F2F2F2] rounded-full p-2 transition flex items-center justify-center h-[30px] w-[30px] md:h-[40px] md:w-[40px] hover:bg-gradient-to-r hover:from-[#0A90C8] hover:to-[#3EE8F0]"
    >
      <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"
        className="fill-black group-hover:fill-white transition"
      >
        <path d="M6.46536 0.000206862L7.43643 0.974722L1.93183 6.45662L7.44537 12.1593L6.4571 13.1152L1.0684e-07 6.43874L6.46536 0.000206862Z"/>
      </svg>
    </button>
  );

  const PrevArrow = ({ onClick }: ArrowProps) => (
    <button
      onClick={onClick}
      className="group cursor-pointer absolute md:right-[-40px] right-0 md:top-1/2 top-[104%] md:-translate-y-1/2 z-10 bg-[#F2F2F2] rounded-full p-2 transition flex items-center justify-center h-[30px] w-[30px] md:h-[40px] md:w-[40px] hover:bg-gradient-to-r hover:from-[#0A90C8] hover:to-[#3EE8F0]"
    >
      <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"
        className="fill-black group-hover:fill-white transition rotate-180"
      >
        <path d="M6.46536 0.000206862L7.43643 0.974722L1.93183 6.45662L7.44537 12.1593L6.4571 13.1152L1.0684e-07 6.43874L6.46536 0.000206862Z"/>
      </svg>
    </button>
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    arrows: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
    centerPadding: centerPadding,

  responsive: [
    {
      breakpoint: 575, 
      settings: {
        centerPadding: "0px", 
        centerMode: false,   
      },
    },
  ],
  };
  

  const slides = [
    {
      id: 1,
      title: "Vault your collectibles",
      desc: "Digital packs, physical cards",
      img: "/img/about-slider2.webp",
      para: "Discover thousands of authenticated and vaulted collectibles ready to be added to your collection with a click."
    },
    {
      id: 2,
      title: "Vending Machine",
      desc: "Digital packs, physical cards",
      img: "/img/about-slider3.webp",
      para: "Discover thousands of authenticated and vaulted collectibles ready to be added to your collection with a click."
    },
    {
      id: 3,
      title: "Vault your collectibles",
      desc: "Ship your collectibles to our vault",
      img: "/img/about-slider1.webp",
      para: "Discover thousands of authenticated and vaulted collectibles ready to be added to your collection with a click."
    },
    {
      id: 4,
      title: "Vending Machine",
      desc: "Digital packs, physical cards",
      img: "/img/about-slider3.webp",
      para: "Discover thousands of authenticated and vaulted collectibles ready to be added to your collection with a click."
    },
  ];

  return (
    <div className='overflow-hidden relative md:pb-0 pb-[40px]'>
      {/* Slider Section */}
      <div className="w-full pt-[20px] pb-[20px] sm:pb-[40px] md:pb-[60px]" data-aos="fade-up" data-aos-delay="100">
        {/* @ts-ignore */}
        <Slider ref={sliderRef} {...settings}>
          {slides.map((item) => (
            <div key={item.id}>
              <div
                className="group relative rounded-md md:rounded-xl overflow-hidden cursor-pointer
                   w-full h-[300px] md:h-[400px]  xl:h-[478px]  px-[10px] py-[20px]   md:px-[25px] md:py-[25px]  xl:px-[40px] xl:py-[33px] flex flex-col justify-end
                      bg-cover bg-center transition-all duration-500" style={{ backgroundImage: `url(${item.img})` }}>
                {/* Title + Description */}
                <div className="text-white transition-all duration-500">
                  <h3
                    className="text-[22px] sm:text-[24px] md:text-[28px] xl:text-[32px] font-semibold
                        transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-[-10px] leading-normal">
                    {item.title}
                  </h3>

                  <p className="text-[16px] md:text-[18px] font-semibold opacity-90 w-[80%]
                        transition-all duration-500 delay-75 group-hover:opacity-0 group-hover:translate-y-[-10px]">
                    {item.desc}
                  </p>
                </div>

                {/* Para + Button (appear on hover) */}
                <div
                  className="absolute bottom-[25x] left-[25px] right-[25px] xl:bottom-[33px] xl:left-[40px] xl:right-[40px]
                           opacity-0 translate-y-6 transition-all duration-500
                           group-hover:opacity-100 group-hover:translate-y-0">

                  <p className="text-[16px] md:text-[18px] xl:text-[22px] font-medium leading-6 sm:leading-7 text-white mb-[14px] max-w-[492px]">
                    {item.para}
                  </p>

                  <Link
                    href="/marketplace"
                    className="inline-block w-full  text-center px-4 py-2
                                bg-[#EFB24D] text-black rounded-md
                                  font-normal text-[16px]">
                    Explore Marketplace
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}