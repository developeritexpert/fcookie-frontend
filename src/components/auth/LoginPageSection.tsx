"use client";

import Image from "next/image";
import Link from "next/link";

export default function LoginPageSection() {
  return (
    <>
      <section className="min-h-[calc(100vh-130px)] py-[50px] px-[20px] md:px-[30px] lg:px-[50px] flex items-center justify-center relative">
        <div className="mx-auto max-w-[1000px]">
          <div className="flex md:flex-row flex-col-reverse gap-[50px] items-center pb-[150px]">
            <div className="basis-[50%]">
              <Image
                src="/img/login-img.png"
                alt="Login"
                height={400}
                width={400}
                className="w-full"
              />
            </div>

            <div className="basis-[50%]">
              <form>
                <h1 className="font-semibold text-[30px] md:text-[40px] lg:text-[50px] leading-[1.2]">
                  Welcome back!
                </h1>
                <p className="mb-[20px]">
                  Sign in to access your collection, track your portfolio, and
                  explore new drops.
                </p>

                {/* Email */}
                <div className="mb-[15px]">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full text-sm border border-[#FFFFFF1C] bg-[#FFFFFF0A] rounded-[7px] py-[15px] px-[15px] focus-visible:outline-none focus-visible:border focus-visible:border-[#ffffff80] duration-300"
                  />
                </div>

                {/* Password */}
                <div className="mb-[15px]">
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full text-sm border border-[#FFFFFF1C] bg-[#FFFFFF0A] rounded-[7px] py-[15px] px-[15px] focus-visible:outline-none focus-visible:border focus-visible:border-[#ffffff80] duration-300"
                  />
                </div>

                {/* Remember + Forgot */}
                <div className="flex justify-between items-center mb-[20px] text-sm">
                  <label className="flex items-center gap-[5px] relative cursor-pointer">
                    <input type="checkbox" className="peer hidden" />
                    <div
                      className="h-4 w-4 border border-[#FFFFFF1C] duration-300 peer-checked:border-[#FFFFFF80] 
                      rounded-[5px] flex items-center justify-center transition"
                    ></div>

                    <svg
                      className="hidden peer-checked:block w-3 h-3 text-white absolute left-0.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    Remember me
                  </label>

                  <p className="cursor-pointer">Forgot Password?</p>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="bg-gradient-to-b from-[#75DA5B] to-[#4DCE94] w-full cursor-pointer py-[15px] text-[#000] mb-[10px] font-semibold px-[30px] rounded-[7px]"
                >
                  Login
                </button>

                {/* Register Link */}
                <p className="text-center text-sm">
                  Don’t have an account?{" "}
                  <Link href="/register" className="font-semibold">
                    Create one
                  </Link>
                </p>
              </form>
            </div>
          </div>

          {/* Footer Bottom Bar */}
          <div className="border-t border-[#FFFFFF24] py-[30px] absolute bottom-0 right-0 left-0 max-w-[1000px] mx-auto">
            <p className="text-center">
              © 2025 Fcookie. All Rights Reserved
            </p>
          </div>
        </div>
      </section>

      {/* Background Glow */}
      <div className="absolute top-[-50%] bottom-[30%] right-0 left-0 rounded-[50%] z-[-1] bg-[#EFB24D] opacity-[0.30] blur-[754px] pointer-events-none"></div>
    </>
  );
}
