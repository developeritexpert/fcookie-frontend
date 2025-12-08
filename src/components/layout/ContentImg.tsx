"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContentImg() {
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const text =
    "Fcookie is a platform that lets people buy and sell shared ownership in digital collectible assets. We believe investing should be shaped by passion, identity, and community not just numbers on a chart.";

  useEffect(() => {
    const ctx = gsap.context(() => {
      const root = textRef.current;
      if (!root) return;

      const letters = root.querySelectorAll<HTMLElement>(".letter");
      if (!letters || letters.length === 0) return;

      gsap.fromTo(
        letters,
        { color: "#ffffff66", y: 8 },
        {
          color: "#ffffff",
          y: 0,
          stagger: 0.02,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "top bottom",
            scrub: 1,
          },
        }
      );
    }, textRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div className="pt-[30px] pb-[30px] lg:pt-[50px] lg:pb-[43px] relative">
      <div className="absolute -z-0 bottom-[-20%] right-0 h-[300px] w-[150px] md:h-[438px] md:w-[180px] lg:h-[538px] lg:w-[200px] bg-[#75DA5B4D] blur-[150px] md:blur-[180px] lg:blur-[200px] pointer-events-none"></div>

      <div className="px-[20px] md:px-[30px] lg:px-[50px] overflow-hidden">
        <div className="container">
          <div className="text-[22px] sm:text-[26px] md:text-[35px] lg:text-[40px] font-semibold leading-[30px] sm:leading-[40px] md:leading-[45px] lg:leading-[55px] text-center max-w-[1195px] m-auto mb-[50px] sm:mb-[87px]">
            <p ref={textRef} className="inline-block">
              {text.split("").map((char, i) => (
                <span
                  key={i}
                  className="letter inline-block text-[#FFFFFF66]"
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </p>
          </div>

          <div className="relative" data-aos="fade-up" data-aos-delay="100">
            <div className="absolute z-0 top-[-42%] sm:top-[-29%] md:top-[-30%] lg:top-[-26%] xl:top-[-24%] 2xl:top-[-22%] right-[-68%] w-[72%]">
              <h2 className="move-right font-bold text-[100px] sm:text-[130px] md:text-[170px] lg:text-[200px] xl:text-[260px] text-[#efb24d33] dark:text-[#FFFFFF0F] leading-[100%]">
                fcookie
              </h2>
            </div>

            <Image
              src="/img/cont-img1.webp"
              alt=""
              width={500}
              height={500}
              className="w-full h-full sm:max-h-[587px] rounded-[10px] md:rounded-[15px] lg:rounded-[25px] blur-0 image-render-pixel"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
