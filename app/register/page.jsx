import React from 'react'
import Header from '../Components/layout/Header'
import Image from 'next/image'
import Link from 'next/link'

function page() {
    return (
        <>
            <Header />
            <section className='min-h-[calc(100vh-130px)] py-[50px] px-[20px] md:px-[30px] lg:px-[50px] flex items-center justify-center relative'>
                <div className='mx-auto max-w-[1000px]'>
                    <div className='flex md:flex-row flex-col-reverse gap-[50px] items-center pb-[150px]'>
                        <div className='basis-[50%]'>
                            <Image src="/img/login-img.png" alt="Login" height={400} width={400} className='w-full' />
                        </div>
                        <div className='basis-[50%]'>
                            <form>
                                <h1 className='font-semibold text-[30px] md:text-[40px] lg:text-[50px] leading-[1.2]'>Register</h1>
                                <p className='mb-[20px]'>Sign up to access your collection, track your portfolio, and explore new drops.</p>
                                <div className='mb-[15px]'>
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        className='w-full text-sm border border-[#FFFFFF1C] bg-[#FFFFFF0A] rounded-[7px] py-[15px] px-[15px] focus-visible:outline-none focus-visible:border focus-visible:border-[#ffffff80] duration-300'
                                    />
                                </div>
                                <div className='mb-[15px]'>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className='w-full text-sm border border-[#FFFFFF1C] bg-[#FFFFFF0A] rounded-[7px] py-[15px] px-[15px] focus-visible:outline-none focus-visible:border focus-visible:border-[#ffffff80] duration-300'
                                    />
                                </div>
                                <div className='mb-[15px]'>
                                    <input
                                        type="tel"
                                        placeholder="Phone No."
                                        className='w-full text-sm border border-[#FFFFFF1C] bg-[#FFFFFF0A] rounded-[7px] py-[15px] px-[15px] focus-visible:outline-none focus-visible:border focus-visible:border-[#ffffff80] duration-300'
                                    />
                                </div>
                                <div className='mb-[15px]'>
                                    <input
                                        type="text"
                                        placeholder="Password"
                                        className='w-full text-sm border border-[#FFFFFF1C] bg-[#FFFFFF0A] rounded-[7px] py-[15px] px-[15px] focus-visible:outline-none focus-visible:border focus-visible:border-[#ffffff80] duration-300'
                                    />
                                </div>
                                <div className='flex justify-between items-center mb-[20px] text-sm'>
                                    <div>
                                        <label className='flex items-center gap-[5px] relative cursor-pointer'>
                                            <input
                                                type="checkbox"
                                                className='peer hidden'
                                            />
                                            <div className="h-4 w-4 border border-[#FFFFFF1C] duration-300 peer-checked:border-[#FFFFFF80] rounded-[5px] flex items-center justify-center
                                                transition">
                                            </div>
                                            <svg
                                                className="hidden peer-checked:block w-3 h-3 text-white absolute left-0.5"
                                                fill="none" stroke="currentColor" strokeWidth="3"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M5 13l4 4L19 7" />
                                            </svg>
                                            Remember me
                                        </label>
                                    </div>
                                    <div>
                                        <p>Forgot Password?</p>
                                    </div>
                                </div>
                                <button type='submit' className='bg-gradient-to-b from-[#75DA5B] to-[#4DCE94] cursor-pointer w-full py-[15px] text-[#000] mb-[10px] font-semibold px-[30px] rounded-[7px]'>Login</button>
                                <p className='text-center text-sm'>Already have an account? <Link href="/login" className='font-semibold'>Login</Link></p>
                            </form>
                        </div>
                    </div>
                    <div className='border-t border-[#FFFFFF24] py-[30px] absolute bottom-0 right-0 left-0 max-w-[1000px] mx-auto'>
                        <p className='text-center'>© 2025 Fcookie. All Rights Reserved</p>
                    </div>
                </div>
            </section>
            <div className='absolute top-0 bottom-0 right-0 left-0 rounded-[50%] bg-[#EFB24D]/16 blur-[754px] pointer-events-none'></div>
        </>
    )
}

export default page