import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { IoMoonSharp } from "react-icons/io5";
import LanguageDropdown from './LanguageDropdown';

export default function header() {
    return (
        <>
            <header className="bg-[#0F0B05] w-full py-[25px] " >
                <div className="p-[16px] container bg-[#FFFFFF12] flex justify-between items-center rounded-[11px] border border-[#444444]">
                    <div className=' flex gap-[75px]'>
                        <Link href="/">
                            <Image src="/img/header-logo.png"
                                alt=""
                                width={131}
                                height={35} />
                        </Link>
                        <div className='text-[#F7F8F8] flex item-center gap-[75px]'>
                            <div className='flex items-center hover:text-[#EFB24D]'> <Link href="/"  >Home</Link></div>
                            <div className='flex items-center hover:text-[#EFB24D]'> <Link href="/">Marketplace</Link></div>
                            <div className='flex items-center hover:text-[#EFB24D]'> <Link href="/">Submit my collectibles</Link></div>
                        </div>
                    </div>

                    <div className=' flex'>
                        <LanguageDropdown/>
                        <div>
                            <Link href="/" className='bg-[#FFFFFF0D] px-[16px] py-[11px] text-white flex items-center gap-[15px] font-[600] rounded-[7px]'>Darkmode<IoMoonSharp /></Link>
                        </div>
                        <div>
                            <Link href="/" className='bg-[#EFB24D] px-[29px] py-[11px] font-[600] rounded-[7px] ms-[10px] block'>Login</Link>
                        </div>

                    </div>

                </div>
            </header>
        </>
    )
}
