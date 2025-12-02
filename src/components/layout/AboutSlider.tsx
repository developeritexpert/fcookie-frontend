import React from 'react'
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from 'next/link';


const Slider = dynamic(() => import("react-slick"), {
  ssr: false,
});


export default function AboutSlider() {

  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    centerMode: true,
    centerPadding: "350px",
    slidesToShow: 2,

    responsive: [
       {
        breakpoint: 1700,
        settings: {          
          centerPadding: "250px",
        },
      },
        {
        breakpoint: 1500,
        settings: {       
          centerPadding: "200px",
        },
      },
        {
        breakpoint: 1300,
        settings: {       
          centerPadding: "180px",
        },
      },    
         {
        breakpoint: 1200,
        settings: {       
          centerPadding: "140px",
        },
      }, 
      {
        breakpoint: 1024,
        settings: {         
          centerPadding: "80px",
        },
      },
      {
        breakpoint: 768,
        settings: {      
            slidesToShow: 1,
          centerPadding: "60px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerPadding: "0px",
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
    <div className='overflow-hidden'>
      {/* Slider Section */}
      <div className="w-full pt-[20px] pb-[20px] sm:pb-[40px] md:pb-[60px]">
        <Slider {...settings}>
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

                  <p className="text-[16px] md:text-[18px] xl:text-[22px] font-medium text-white mb-[14px] max-w-[492px]">
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
