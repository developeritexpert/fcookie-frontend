"use client";
import React from 'react';
import Image from 'next/image';

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
        <div className='pt-[80px] pb-[110px] '>
            <div className='container'>
                <h3 className='text-[32px] font-semibold mb-[20px] text-white text-center'>Discover</h3>

                <div className='flex gap-[30px]'>
                    {discover.map((item, index) => (
                        <div className='p-[16px] pb-[26px] bg-[#0D0D0D] border border-[#1E1E1E] rounded-[14px]'>
                            <Image src={item.image} alt="" width={428} height={243} className='rounded-[15px]' />
                            <p className= " mt-[20px] text-white text-[20px] font-medium  ">{item.title}</p>
                            <p className="mt-[5px] text-[#6C6C6C] text-[15px]  leading-[20px] font-normal  ">{item.subtitle}</p>

                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}


