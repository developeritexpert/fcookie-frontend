import React from 'react'
import Link from 'next/link';


export default function VaultSecurity() {
    return (
        <div className='pt-[20px] sm:pt-[40px] md:pt-[60px] pb-[30px] sm:pb-[50px] md:pb-[80px] lg:pb-[120px]  px-[20px] md:px-[30px] lg:px-[50px] relative'>
             <div className="absolute top-[-100px] sm:top-[-150px]  md:top-[-225px] lg:top-[-200px] left-0  bg-[#EFB24D]/20 blur-[150px] -z-10 h-[108px] w-[108px] md:h-[208px] md:w-[208px] lg:h-[308px] lg:w-[308px]"></div>
            <div className=' container' data-aos="fade-up" data-aos-delay="100">
                <h2 className='text-center text-[24px] md:text-[28px] lg:text-[32px] font-semibold mb-[5px] md:mb-[11px]'>
                    Vault-Grade Security
                </h2>
                <p className='text-[16px] md:text-[18px] font-normal text-center '>
                    Secure and protect your collection — vaulted and insured, free of charge.
                </p>
                <div className='flex justify-center items-center max-w-[1170px] h-full min-h-[250px] sm:min-h-[350px] md:min-h-[450px] lg:min-h-[550px] m-auto mt-[22px] bg-[url("/img/about-video-img.webp")] bg-cover bg-center rounded-[10px] md:rounded-[20px]'>


                    <Link href="">
                        <button className="relative w-[70px] h-[70px] flex items-center justify-center">
                            <span className="absolute w-[70px] h-[70px] rounded-full bg-[#75DA5B]/50 animate-ping"></span>
                            {/* Button */}
                            <div className="w-[50px] h-[50px]  md:w-[70px] md:h-[70px] bg-[#75DA5B] rounded-full flex items-center justify-center relative z-10 transition-transform duration-500 hover:scale-110">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-8 h-8 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                        </button>
                    </Link>

                </div>

            </div>
        </div>
    )
}
