"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Discover() {
    const discover = [
        {
            "title": "Get the app",
            "subtitle": "The thrill of the rip – now in your pocket.",
            "image": "/img/discove-img-1.png",
            "link": "/app"
        },
        {
            "title": "Less shipping, more collecting",
            "subtitle": "Ship and vault directly from eBay, PWCC, & PSA.",
            "image": "/img/discove-img-2.png",
            "link": "/collecting"
        },
        {
            "title": "Have an idea or feedback?",
            "subtitle": "Let us know!",
            "image": "/img/discove-img-3.png",
            "link": "/feedback"
        }
    ]
    return (
        <div className=' pt-[30px] md:pt-[50px] lg:pt-[80px] pb-[40px] md:pb-[50px] lg:pb-[110px]   px-[20px] md:px-[30px] lg:px-[50px] relative' >
            <div className="absolute inset-0 z-[-1px] bg-gradient-to-b from-[#EFB24D14] to-[rgba(239,178,77,0)] pointer-events-none"></div>
            <div className='container relative' data-aos="fade-up" data-aos-delay="100">
                <h3 className='text-[24px] md:text-[28px] lg:text-[32px] font-semibold mb-[20px] text-black dark:text-white text-center'>Discover</h3>
                <Link href="/">
                    <div className='grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-[30px] '>
                        {discover.map((item, index) => (
                            <div key={index} className=' group p-[16px] pb-[26px] dark:bg-[#0D0D0D] border border-[#E6E6E6] dark:border-[#1E1E1E] rounded-[14px]  transition-all duration-300 hover:shadow-lg hover:shadow-[#EFB24D]/20 '>
                                <div className='overflow-hidden rounded-[15px] '>
                                    <Image src={item.image} alt="" width={200} height={200} className=' group-hover:scale-105 transition-transform rounded-[15px] w-full h-full  max-w-full sm:max-w-[428px] max-h-[fit-content] object-cover object-center' />
                                </div>
                                <p className=" mt-[20px] text-[18px]  md:text-[20px] font-medium ">{item.title}</p>
                                <p className="mt-[5px] text-[#6C6C6C] text-[15px]  leading-[20px] font-normal  ">{item.subtitle}</p>

                            </div>
                        ))}
                    </div>
                </Link>

            </div>
        </div>
    )
}


