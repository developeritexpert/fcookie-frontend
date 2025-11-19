"use client";
import React from 'react';
import Link from 'next/link';
export default function
    () {
    return (
        <div>
            <div className='px-[20px] md:px-[30px] lg:px-[50px] max-w-[1900px] m-auto pb-[30px] md:pb-[50px] lg:pb-[105px] relative'>
                 <div className="absolute top-[-50px] left-0 bg-[url('/img/bann-shade.png)]  bg-no-repeat bg-cover "></div>
                <div className="bg-[url('/img/bann1.png')] bg-cover bg-center h-[83vh] relative filter  brightness-110 rounded-[25px] ">
                    <div className="absolute top-[-50px] left-0 bg-[url('/bann-shade.png)] bg-cover bg-center  "></div>
                    <div className='flex flex-col text-white   absolute left-[15px] top-[15px] right-[15px]    sm:left-[20px] sm:top-[20px] md:right-auto  md:left-[40px] md:top-[40px]   lg:left-[180px] lg:bottom-[-25px] lg:top-auto lg:max-w-[598px]'>
                        <h1 className='text-[25px] md:text-[35px] lg:text-[50px] font-semibold  mb-[3px]'>Discover. Collect. Trade.</h1>
                        <p className=' text-[18px] md:text-[20px] font-normal leading-[27px] mb-5 md:mb-[31px]' >A digital marketplace built for the future of collectibles.
                            <br />
                            Own remarkable digital items with verified authenticity, transparent pricing, and a smooth trading experience.
                        </p>
                        <div>
                            <Link href="" className='bg-[#EFB24D] px-[20px] py-[10px] md:px-[30px] md:py-[14px] font-normal rounded-[7px] inline-block text-black'>Get Started</Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
