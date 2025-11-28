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
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          centerPadding: "200px",
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerPadding: "40px",
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
          centerPadding: "20px",
        },
      },
    ],
  };

  const slides = [
    {
      id: 1,
      title: "Vending Machine",
      desc: "Digital packs, physical cards",
      img: "/img/about-slider2.webp",
    },
    {
      id: 2,
      title: "Explore Marketplace",
      desc: "Discover collectibles ready to be added",
      img: "/img/about-slider3.webp",
    },
    {
      id: 3,
      title: "Vault Collectibles",
      desc: "Authenticated and vaulted items",
      img: "/img/about-slider1.webp",
    },
    {
      id: 4,
      title: "Explore Marketplace",
      desc: "Discover collectibles ready to be added",
      img: "/img/about-slider3.webp",
    },

  ];
  return (
    <div className='overflow-hidden'>
      {/* Slider Section */}
      <div className="w-full pt-[20px] pb-[60px]">
        <Slider {...settings}>
          {slides.map((item) => (
            <div key={item.id} >
              <div
                className="group rounded-xl overflow-hidden group cursor-pointer
              w-full h-[478px] px-[40px] py-[33px] flex flex-col justify-end" style={{ backgroundImage: `url(${item.img})`, backgroundSize: "cover" }} >

                <div className=" text-white">
                  <h3 className="text-[22px] font-semibold">{item.title}</h3>
                  <p className="text-sm opacity-90 w-[80%]">{item.desc}</p>
                  <div className="group">
                    <Link
                      href="/marketplace"
                      className=" text-center mt-3 px-4 py-2 bg-[#EFB24D] text-black rounded-md hidden group-hover:block 
                      font-normal text-[16px]">
                      Explore Marketplace
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}
