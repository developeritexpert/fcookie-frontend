"use client"
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
export default function ExploreCate() {

    const explore = [
        { title: "Pokémon", image: "/img/explore-img1.png", link: "/pokemon" },
        { title: "Baseball", image: "/img/explore-img2.png", link: "/baseball" },
        { title: "Basketball", image: "/img/explore-img3.png", link: "/basketball" },
        { title: "Football", image: "/img/explore-img4.png", link: "/football" },
        { title: "Hockey", image: "/img/explore-img5.png", link: "/hockey" },
        { title: "Marvel Cards", image: "/img/explore-img6.png", link: "/marvel" },
        { title: "Soccer", image: "/img/explore-img7.png", link: "/soccer" },
        { title: "VeeFriends Cards", image: "/img/explore-img8.png", link: "/veefriends" },
        { title: "One Piece Cards", image: "/img/explore-img9.png", link: "/one-piece" },
        { title: "Other Cards", image: "/img/explore-img10.png", link: "/other-cards" }
    ];
    return (
        <div className='pt-[30px] lg:pt-[50px] pb-[30px] lg:pb-[43px] px-[20px] md:px-[30px] lg:px-[50px] '>
            <div className='container'>
                <h3 className="text-[32px] font-semibold text-left  mb-[13px]">Explore categories</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4  gap-4">
                    {explore.map((products, index) => (
                        <Link href={products.link} key={index}>
                            <div className="py-[9px] px-[10px] bg-white dark:bg-[#0D0D0D] flex gap-[20px] rounded-[10px] cursor-pointer border border-[#E6E6E6] dark:border-[#1E1E1E]">
                                <div className="bg-white  p-[13px] rounded-[10px] flex items-center justify-center object-contain">
                                    <Image
                                        src={products.image}
                                        alt={products.title}
                                        width={45}
                                        height={45}
                                        className='max-w-[45px]'
                                    />
                                </div>
                                <p className="text-black dark:text-white text-[16px] font-normal flex items-center ">{products.title}</p>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </div>
    )
}
