"use client"
import React from 'react'
import Link from 'next/link'
export default function
    () {
    return (
        <div>
            <div className='bg-[#090702] px-[60px] pb-[105px] relative'>
                 <div className="absolute top-[-50px] left-0 bg-[url('/img/bann-shade.png)] bg-cover bg-center  "></div>
                <div className="bg-[url('/img/bann1.png')] bg-cover bg-center h-[83vh] relative  rounded-[25px] ">
                    <div className="absolute top-[-50px] left-0 bg-[url('/bann-shade.png)] bg-cover bg-center  "></div>
                    <div className='flex flex-col text-white absolute left-[180px] bottom-[-25px] max-w-[598px]'>
                        <h1 className='text-[50px] font-[600]  mb-[3px]'>Discover. Collect. Trade.</h1>
                        <p className='text-[20px] font-[400] leading-[27px] mb-[31px]' >A digital marketplace built for the future of collectibles.
                            <br />
                            Own remarkable digital items with verified authenticity, transparent pricing, and a smooth trading experience.
                        </p>
                        <div>
                            <Link href="" className='bg-[#EFB24D] px-[30px] py-[14px] font-[400] rounded-[7px] inline-block text-black'>Get Started</Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
