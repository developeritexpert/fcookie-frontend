"use client";
import React from 'react';
import Image from "next/image";
import Link from "next/link";

const footerData = {
    contact: {
        phone: "+1 (206) 438-9789",
        email: "info@fcookie.com",
    },
    quickLinks: [
        { title: "Home", link: "/" },
        { title: "About", link: "/about" },
        { title: "Marketplace", link: "/marketplace" },
    ],
    helpLinks: [
        { title: "Contact Us", link: "/contact" },
        { title: "Terms of Service", link: "/terms" },
        { title: "Privacy", link: "/privacy" },
    ],
    subscribe: {
        title: "Subscribe Us",
        description:"Subscribe for exclusive insights, trends, and tips delivered to your inbox.",
    },

};

export default function Footer() {
    return (
      <footer className="dark:bg-[#000000] dark:text-white pt-[40px] md:pt-[50px] pb-[30px] lg:pt-[110px] lg:pb-[44px] px-[20px] md:px-[30px] lg:px-[50px] border-t border-[#000000]/6 dark:border-[#FFFFFF66]">

    <div className="container mx-auto  pb-[30px] md:pb-[50px] lg:pb-[110px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* Column 1 */}
        <div>
            <Image
                src="/img/header-logo.png"
                alt="fcookie"
                width={200}
                height={200}
                className="mb-4 w-full h-full  max-w-[180px] max-h-[51px] lg:max-w-[204px] lg:max-h-[61px] xl:w-full xl:max-w-[264px] xl:max-h-[71px]"
            />

            <div className="text-[20px] font-normal leading-[32px] dark:text-[#F7F8F8]">
                <p>{footerData.contact.phone}</p>
                <p>{footerData.contact.email}</p>
            </div>
        </div>

        {/* Column 2 */}
        <div className='mt-[30px] md:mt-0 '>
            <h3 className="mb-[11px] font-semibold text-[24px] leading-[32px] dark:text-white">
                Quick Links
            </h3>

            <ul>
                {footerData.quickLinks.map((item, i) => (
                    <li key={i}>
                        <Link 
                            href={item.link}
                            className="text-[18px] leading-[45px] font-normal text-[#000000]/70 dark:text-[#f7f8f8]/70"
                        >
                            {item.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>

        {/* Column 3 */}
        <div className='mt-[30px] lg:mt-0'>
            <h3 className="mb-[11px] font-semibold text-[24px] leading-[32px] dark:text-white">
                Help
            </h3>

            <ul>
                {footerData.helpLinks.map((item, i) => (
                    <li key={i}>
                        <Link 
                            href={item.link}
                            className="text-[18px] leading-[45px] font-normal text-[#000000]/70 dark:text-[#f7f8f8]/70"
                        >
                            {item.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>

        {/* Column 4 */}
        <div className='mt-[30px] lg:mt-0'>
            <Link href="/your-link">
                <Image
                    src="/img/foorter-msg.png"
                    alt=""
                    width={54}
                    height={54}
                    className="invert dark:invert-0 cursor-pointer mb-[31px]"
                />
            </Link>

            <h3 className="mb-[7px] text-[22px] font-bold">
                {footerData.subscribe.title}
            </h3>

            <p className="text-[16px] leading-[23px] font-normal text-[#000000]/70 dark:text-[#f7f8f8]/70 mb-[20px]">
                {footerData.subscribe.description}
            </p>

            <div className="flex gap-2 bg-white px-[22px] py-[18px] rounded-[5px]">
                <input
                    type="email"
                    placeholder="Enter Email Address"
                    className="bg-white dark:text-black rounded-md w-full"
                />
                <button className="bg-white dark:text-black rounded-md font-semibold hover:bg-gray-200">
                    SUBSCRIBE
                </button>
            </div>
        </div>

    </div>

    <div className="container pt-[30px] md:pt-[45px] border-t  border-black/6 dark:border-white/6">
        <p className="text-center text-[#000000]/70 dark:text-[#f7f8f8]/70 text-[20px]">
            © 2025 Fcookie. All Rights Reserved
        </p>
    </div>

</footer>

    );
}
