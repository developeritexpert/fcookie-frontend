"use client";
import React from 'react'
import Image from 'next/image';

export default function ContentImg() {
    return (
        <div className="pt-[30px] pb-[30px]  lg:pt-[50px] lg:pb-[43px]  relative">
            <div className="absolute z-30  bottom-[-25%] right-0 h-[538px] w-[270px]  bg-[#75DA5B]/30 blur-[524px] pointer-events-none"></div>
            <div className='px-[20px] md:px-[30px] lg:px-[50px]  overflow-hidden'>
                <div className='container'>
                    <div className='text-[28px] md:text-[35px]  lg:text-[40px] font-semibold leading-[40px] md:leading-[45px] lg:leading-[55px] text-[] dark:text-white text-center max-w-[1195px] m-auto mb-[87px] '>
                        <p>Fcookie is a platform that lets people buy and sell shared ownership in
                            <span className=' text-[#00000066] dark:text-[#FFFFFF66]'>
                                digital collectible assets. We believe investing should be shaped by passion,
                                identity, and community not just numbers on a chart.
                            </span>
                        </p>
                    </div>
                    <div className="relative" >
                        <div className='absolute z-30 top-[-25%] lg:top-[-22%] xl:top-[-19%] right-[-28%] sm:h-[130px] sm:w-[400px] md:h-[150px] md:w-[600px] lg:h-[180px] lg:w-[776px]  xl:h-[200px] xl:w-[876px]'>
                            <Image src="/img/fcookie.png" alt="Login" height={200} width={200} className='w-full' />
                        </div>

                        <Image src="/img/cont-img1.png" alt="" width={500} height={500} className='w-full max-h-[587px] rounded-[25px]' />
                    </div>

                </div>

            </div>
        </div>
    )
}

