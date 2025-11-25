"use client";

import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { JSX } from "react";
// ---- Types ----
interface SlideItem {
    image: string;
    title: string;
    name: string;
    bid: string;
    day: string;
}

export default function CollectionSlider(): JSX.Element {
    const sliderRef = useRef<Slider | null>(null);

    const [current, setCurrent] = useState<number>(1);
    const [total, setTotal] = useState<number>(0);
    const [progress, setProgress] = useState<number>(0);
    const [slidesToShow, setSlidesToShow] = useState<number>(4);

    const slides: SlideItem[] = [
        {
            image: "/img/slider-img.png",
            title: "Factory Sealed ",
            name: "Kevin Durant/Lebron James/Stephen Curry",
            bid: "$425,000 / Bid",
            day: "9d 18h"
        },
        {
            image: "/img/slider-img1.png",
            title: "PSA 9 | 1/1 | POP 1 ",
            name: "Victor Wembanyama",
            bid: "$110,000 / Bid",
            day: "2d 18h"
        },
        {
            image: "/img/slider-img2.png",
            title: "Factory Sealed | 1/1",
            name: "Stephen Curry",
            bid: "$86,875 / Bid",
            day: "9d 18h"
        },
        {
            image: "/img/slider-img3.png",
            title: "Factory Sealed | 1/1 ",
            name: "Stephen Curry",
            bid: "$67,396 / Bid",
            day: "9d 18h"
        },
        {
            image: "/img/slider-img4.png",
            title: "PSA 3.5 Auto 7 | POP 1",
            name: "Michael Jordan",
            bid: "$63,316 / Bid",
            day: "9d 18h"
        }
    ];

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;

            if (width < 480) setSlidesToShow(1);
            else if (width < 768) setSlidesToShow(2);
            else if (width < 1024) setSlidesToShow(3);
            else setSlidesToShow(4);
        };

        handleResize();
        setTotal(slides.length);
        setProgress((1 / slides.length) * 100);

        window.addEventListener("resize", handleResize);

        if (sliderRef.current) {
            setTimeout(() => {
                sliderRef.current?.slickGoTo(0);
            }, 150);
        }

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow,
        slidesToScroll: 1,
        arrows: false,
        speed: 600,
        autoplay: false,
        beforeChange: (_old: number, newIndex: number) => {
            setCurrent(newIndex + 1);
            setProgress(((newIndex + 1) / slides.length) * 100);
        }
    };

    return (
        <div className="px-[20px] md:px-[30px] lg:px-[50px] relative -z-0">
            <div className="pt-[20px] sm:pt-[30px] pb-[30px] md:pb-[50px] overflow-hidden relative">

                <div className="container relative">
                    {/* Header */}
                    <div className="flex justify-between mb-[30px]">
                        <h2 className="font-semibold text-[22px] md:text-[28px] lg:text-[32px]">
                            Top Collections
                        </h2>

                        <Link href="/" className="flex gap-1 items-center">
                            <TfiLayoutLineSolid />
                            Explore All Collections
                        </Link>
                    </div>

                    {/* Slider */}
                    <Slider ref={sliderRef} {...settings}>
                        {slides.map((item, i) => (
                            <div key={i} className="py-[20px] flex flex-col items-center bg-white dark:bg-[#0D0D0D] border border-[#E6E6E6] dark:border-[#1E1E1E] rounded-[14px]">
                                <div className="bg-[#1921610A] rounded-full flex items-center justify-center">
                                    <Image
                                        src={item.image}
                                        alt="Model"
                                        width={300}
                                        height={300}
                                        className="w-full h-full max-w-[185px] max-h-[276px]"
                                    />
                                </div>

                                <p className="text-center mt-[20px] text-[#6C6C6C]">{item.title}</p>
                                <p className="text-center text-[#6C6C6C] mb-[17px]">{item.name}</p>

                                <Link
                                    href="/"
                                    className="text-white py-[5px] px-[10px] bg-[linear-gradient(180deg,#75DA5B_0%,#4DCE94_100%)] text-[13px] font-semibold rounded-[4px]"
                                >
                                    {item.bid}
                                </Link>

                                <p className="text-center text-[13px] mt-2">{item.day}</p>
                            </div>
                        ))}
                    </Slider>

                    {/* Progress Bar */}
                    <div className="w-full bg-[#0A90C812] h-1 rounded-full mt-[50px] overflow-hidden">
                        <div
                            className="h-full bg-[#7C4A17] transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    {/* Arrows */}
                    <div className="flex justify-between items-center mt-4">
                        <p className="text-sm flex items-center gap-1">
                            <span className="text-[29px] font-semibold">{current}</span>
                            /
                            <span className="text-[22px]">{total}</span>
                        </p>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => sliderRef.current?.slickPrev()}
                                className="group border px-4 py-2 rounded-[21px]"
                            >
                                Prev
                            </button>

                            <button
                                onClick={() => sliderRef.current?.slickNext()}
                                className="group border px-4 py-2 rounded-[21px]"
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
