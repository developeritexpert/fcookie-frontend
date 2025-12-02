"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";


export default function AboutFaq() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        { que: "Are these real cards?", ans: "Yes, these are physical trading cards securely stored in our facility." },
        { que: "Where are my cards stored?", ans: "Your cards are kept in a climate-controlled, secure vault with 24/7 monitoring." },
        { que: "Can I have my cards shipped to me?", ans: "Yes, you can request shipping at any time from your account dashboard." },
        { que: "How much are shipping fees?", ans: "Shipping fees depend on destination, carrier, and insurance options." },
    ];
    return (
        <div className='pt-[20px] pb-[30px] sm:py-[50px] md:py-[80px] lg:py-[120px] px-[20px] md:px-[30px] lg:px-[50px] relative overflow-hidden'>
            <div className='absolute z-0 bottom-[-30px] right-[-28%] w-[72%]'>
                <h2 className='move-right leading-none font-bold text-[100px] sm:text-[130px] md:text-[170px] lg:text-[200px] xl:text-[260px]  text-[#efb24d33] dark:text-[#FFFFFF0F] '>fcookie</h2>
            </div>

            <div className='container' data-aos="fade-up" data-aos-delay="100">
                <div className="w-full flex flex-col md:flex-row gap-[30px] lg:gap-[70px]  xl:gap-[100px]">
                    {/* LEFT SIDE TEXT */}
                    <div className="flex-1 ">
                        <h2 className='text-[26px] md:text-[28px] lg:text-[32px] xl:text-[50px] font-semibold'>
                            Discover more inside.
                        </h2>
                        <p className=' text-[18px] md:text-[20px] lg:text-[22px] font-normal md:max-w-[497px]'>
                            Here are answers to some of the most frequently asked questions.
                        </p>
                    </div>

                    {/* RIGHT SIDE IMAGE */}
                    <div className="flex-1 basis-[100px]   lg:basis-[200px] xl:basis-[250px]">


                        <div className="w-full space-y-[15px] md:space-y-[20px]  lg:space-y-[25px]">
                            {faqs.map((item, idx) => {
                                const isOpen = openIndex === idx;
                                return (
                                    <div
                                        key={item.que}
                                        className=" w-full rounded-lg border border-[#E6E6E6] dark:border-transparent bg-[#FFFFFF0A] text-[18px] md:text-[20px] lg:text-[24px] font-medium">
                                        <button
                                            className="w-full flex items-center justify-between px-[20px] py-[15px]  lg:px-[30px] lg:py-[25px] text-left "
                                            onClick={() => setOpenIndex(isOpen ? null : idx)}>
                                            <span>{item.que}</span>
                                            <span
                                                className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                                                    }`}>
                                                <ChevronDown className="h-6 w-6" />
                                            </span>
                                        </button>

                                        <div
                                            className={` px-[20px] lg:px-[30px]  transition-[max-height,opacity] duration-200 overflow-hidden ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                                                }`}>
                                            <p className="pb-[15px]">
                                                {item.ans}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className=" pt-[30px] sm:pt-[60px]  md:pt-[80px]   lg:pt-[120px]">
                    <h2 className="text-[32px] md:text-[40px] lg:text-[60px]  xl:text-[80px] mb-[15px] md:mb-[24px] font-bold text-center">Join the Action?</h2>
                    <div className="flex justify-center">
                        <Link
                            href="/marketplace"
                            className="inline-block  text-center px-[32px] py-[12px]
                                bg-[#EFB24D] text-black rounded-md
                                  font-normal text-[16px]">
                            Explore Marketplace
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}
