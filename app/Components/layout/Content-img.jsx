import React from 'react'
import Image from 'next/image';

export default function ContentImg() {
    return (
        <div className='pt-[50px] relative z-30 '>
            <div className='container'>
                <div className='text-[40px] font-semibold leading-[55px] text-white text-center max-w-[1195px] m-auto mb-[87px] '>
                    <p>Fcookie is a platform that lets people buy and sell shared ownership in
                        <span className='text-[#FFFFFF66]'> 
                              digital collectible assets. We believe investing should be shaped by passion,
                            identity, and community not just numbers on a chart.
                        </span>
                    </p>
                </div>
                <div className="relative " >
                    <div className='absolute'></div>

                    <Image src="/img/cont-img1.png" alt="" width={200} height={200} className='w-full max-h-[587px] rounded-[25px]' />
                </div>



            </div>
        </div>
    )
}

