"use client"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from "next/navigation";
import LanguageDropdown from "./LanguageDropdown"
import { FaMoon } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";

export default function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState<boolean>(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
  const [isAnimating, setIsAnimating] = useState<boolean>(false)
  const pathname = usePathname();
  const [isHeaderFixed, setIsHeaderFixed] = useState<boolean>(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState<boolean>(true)


  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY > 300) {
        setIsHeaderFixed(true);
        setIsHeaderVisible(true);
      } else {
        setIsHeaderFixed(false);
        setIsHeaderVisible(true);
      }
    };

    // Use requestAnimationFrame for smoother scroll handling
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      setIsAnimating(true)
      setTimeout(() => {
        setIsMobileMenuOpen(false)
        setIsAnimating(false)
      }, 300)
    } else {
      setIsMobileMenuOpen(true)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        !(event.target as HTMLElement).closest('.mobile-menu') &&
        !(event.target as HTMLElement).closest('.hamburger-btn')
      ) {
        toggleMobileMenu()
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMobileMenuOpen])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  if (!mounted) return null

  return (
    <>
      <header className={`w-full transition-all duration-500 ease-in-out 
            ${isHeaderFixed
          ? "fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-md my-[0px] shadow-lg"
          : "absolute left-0 right-0 top-0 z-40 bg-transparent my-[25px] px-[20px]"
        }
            ${!isHeaderVisible ? "-translate-y-full" : "translate-y-0"}
        `}>
        <div className="absolute inset-0 bg-[#EFB24D]/10 blur-[524px] -z-10 h-full w-full"></div>

        <div className={``}>

          <div className={`max-w-[1440px] mx-auto flex justify-between items-center border-[#EFB24D]/15 dark:border-[#444444] 
                ${isHeaderFixed ? 'rounded-[0] border-none px-[20px] md:px-[30px] lg:px-[50px] py-[20px]' : 'py-[16px] px-[16px] rounded-[11px] border'}`
          }>
            <div className='flex gap-[20px] lg:gap-[40px] xl:gap-[75px] items-center'>
              <Link href="/">
                <Image
                  src="/img/header-logo.png"
                  alt="Logo"
                  width={300}
                  height={35}
                  className='w-[120px] lg:w-[150px] transition-all duration-300'
                />
              </Link>

              <div className='hidden lg:flex items-center gap-[40px] xl:gap-[75px] text-black dark:text-[#F7F8F8]'>
                <div className='flex items-center hover:text-[#EFB24D] duration-300'>
                  <Link href="/">Home</Link>
                </div>
                <div className='flex items-center hover:text-[#EFB24D] duration-300'>
                  <Link href="/marketplace">Marketplace</Link>
                </div>
                <div className='flex items-center hover:text-[#EFB24D] duration-300'>
                  <Link href="/submit-my-collectibles">Submit my collectibles</Link>
                </div>
              </div>
            </div>

            <div className='hidden lg:flex lg:items-center gap-[10px]'>
              <LanguageDropdown />

              {/* Dark mode/light mode button */}
              <div>
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="bg-transparent dark:bg-[#FFFFFF0D] border border-[#EFB24D]/20 dark:border-[#FFFFFF0D]
  cursor-pointer px-[10px] py-[8px] text-sm flex items-center gap-[10px]
  font-semibold rounded-[7px] relative transition-all duration-300"
                >
                  <span>{theme === "dark" ? "Dark Mode" : "Light Mode"}</span>

                  <div className="bg-[#EFB24D]/20 dark:bg-[#FFFFFF12] w-[50px] h-[22px] rounded-[20px]
    relative flex items-center justify-between px-[5px]"
                  >
                    {theme === "light" && (
                      <IoSunnyOutline className="text-[#EFB24D] z-10 text-[14px]" />
                    )}

                    {theme === "dark" && (
                      <FaMoon className="text-[#EFB24D80] z-10 text-[14px] ml-auto" />
                    )}

                    <span
                      className={`w-[20px] h-[20px] bg-white dark:bg-[#00000066] rounded-full absolute top-[1px] transition-all duration-300
        ${theme === "dark" ? "right-[2px]" : "left-[2px]"}
      `}
                    />
                  </div>
                </button>

              </div>

              {pathname === "/login" ? (
                <div>
                  <Link
                    href="/register"
                    className="bg-[#EFB24D] border border-[#EFB24D] text-[#000] transition-all duration-300 ease-in-out hover:text-white hover:border hover:border-[#EFB24D] hover:bg-transparent px-[30px] py-[10px] font-semibold rounded-[7px] block"
                  >
                    Sign Up
                  </Link>
                </div>
              ) : pathname === "/register" ? (
                <div>
                  <Link
                    href="/login"
                    className="bg-[#EFB24D] border border-[#EFB24D] text-[#000] transition-all duration-300 ease-in-out hover:text-white hover:border hover:border-[#EFB24D] hover:bg-transparent px-[30px] py-[10px] font-semibold rounded-[7px] block"
                  >
                    Login
                  </Link>
                </div>
              ) : (
                <div>
                  <Link
                    href="/login"
                    className="bg-[#EFB24D] border border-[#EFB24D] text-[#000] transition-all duration-300 ease-in-out hover:text-white hover:border hover:border-[#EFB24D] hover:bg-transparent px-[30px] py-[10px] font-semibold rounded-[7px] block"
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>

            <div className="lg:hidden flex items-center gap-4">
              <LanguageDropdown />
              <button
                className="hamburger-btn bg-[#EFB24D0F] dark:bg-[#FFFFFF0D] p-3 rounded-[7px] transition-all duration-300"
                onClick={toggleMobileMenu}
              >
                <div className="w-6 h-6 flex flex-col justify-between">
                  <span className={`w-full h-0.5 bg-current rounded transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
                  <span className={`w-full h-0.5 bg-current rounded transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`w-full h-0.5 bg-current rounded transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay with Slide Animation */}
        <div className={`
            lg:hidden fixed inset-0 z-50 transition-all duration-300 ease-in-out
            ${isMobileMenuOpen || isAnimating ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
          `}>
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
              }`}
            onClick={toggleMobileMenu}
          />

          {/* Sidebar */}
          <div
            className={`
                mobile-menu fixed right-0 top-0 h-full max-w-full  w-80 bg-white dark:bg-[#0D0D0D] shadow-xl 
                transform transition-transform duration-300 ease-out
                ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
              `}
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-white dark:bg-[#0D0D0D]">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Menu</h2>
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg bg-white dark:bg-[#0D0D0D] hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 h-screen overflow-y-auto bg-white dark:bg-[#0D0D0D]">
              <nav className="space-y-6 mb-8">
                <Link
                  href="/"
                  className="block text-lg font-medium text-gray-900 dark:text-white hover:text-[#EFB24D] transition-colors duration-300"
                  onClick={toggleMobileMenu}
                >
                  Home
                </Link>
                <Link
                  href="/marketplace"
                  className="block text-lg font-medium text-gray-900 dark:text-white hover:text-[#EFB24D] transition-colors duration-300"
                  onClick={toggleMobileMenu}
                >
                  Marketplace
                </Link>
                <Link
                  href="/"
                  className="block text-lg font-medium text-gray-900 dark:text-white hover:text-[#EFB24D] transition-colors duration-300"
                  onClick={toggleMobileMenu}
                >
                  Submit my collectibles
                </Link>
              </nav>

              <div className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-6">
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="w-full bg-[#EFB24D0F] dark:bg-[#FFFFFF0D] border border-[#E6E6E6] dark:border-[#343434] cursor-pointer px-4 py-3 text-base flex items-center justify-between font-semibold rounded-[7px] transition-all duration-300 hover:bg-[#EFB24D1A] dark:hover:bg-[#FFFFFF1A]"
                >
                  <span>{theme === "dark" ? "Dark Mode" : "Light Mode"}</span>
                  <div className='bg-[#EFB24D1F] dark:bg-[#FFFFFF12] p-2 rounded-[7px]'>
                    {theme === "dark" ? (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-w-[15px] max-h-[15px] min-w-[15px] min-h-[15px] object-contain">
                        <path d="M2.13987 11.8589C3.56992 13.2827 5.4437 14 7.3232 14C10.3531 14 12.9509 12.1174 13.9832 9.71124V9.7055C14.0828 9.25556 13.7246 8.90902 13.3237 8.97604C13.2694 8.97604 13.1609 9.02262 13.1488 9.03411C10.8141 10.1018 8.02997 9.6117 6.20849 7.79152C4.39927 5.98289 3.90325 3.22828 4.94187 0.900101C4.94762 0.894357 4.94762 0.888613 4.95337 0.882869C5.21895 0.086386 4.47839 -0.151023 4.14194 0.089572C-0.337805 2.20519 -1.45766 8.25503 2.13987 11.8589Z" fill="white" />
                      </svg>
                    ) : (
                      <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-w-[15px] max-h-[15px] min-w-[15px] min-h-[15px] object-contain">
                        <path d="M7.50006 12.5053C7.18427 12.5053 6.93164 12.7579 6.93164 13.0737V14.4474C6.93164 14.7632 7.18427 15.0158 7.50006 15.0158C7.81585 15.0158 8.06848 14.7632 8.06848 14.4474V13.0737C8.06848 12.7421 7.81585 12.5053 7.50006 12.5053Z" fill="black" />
                        <path d="M3.17403 11.0368L2.19509 12.0158C1.97403 12.2368 1.97403 12.5842 2.19509 12.8053C2.30561 12.9158 2.44772 12.9632 2.58982 12.9632C2.73193 12.9632 2.87403 12.9158 2.98456 12.8053L3.96351 11.8263C4.18456 11.6053 4.18456 11.2579 3.96351 11.0368C3.74245 10.8158 3.39509 10.8158 3.17403 11.0368Z" fill="black" />
                        <path d="M2.49474 7.5C2.49474 7.18421 2.24211 6.93158 1.92632 6.93158H0.568421C0.252632 6.93158 0 7.18421 0 7.5C0 7.81579 0.252632 8.06842 0.568421 8.06842H1.94211C2.25789 8.06842 2.49474 7.81579 2.49474 7.5Z" fill="black" />
                        <path d="M3.17403 3.96316C3.28456 4.07368 3.42667 4.12105 3.56877 4.12105C3.71088 4.12105 3.85298 4.07368 3.96351 3.96316C4.18456 3.7421 4.18456 3.39474 3.96351 3.17368L2.98456 2.19474C2.76351 1.97368 2.41614 1.97368 2.19509 2.19474C1.97403 2.41579 1.97403 2.76316 2.19509 2.98421L3.17403 3.96316Z" fill="black" />
                        <path d="M7.50006 2.49474C7.81585 2.49474 8.06848 2.24211 8.06848 1.92632V0.568421C8.06848 0.252632 7.81585 0 7.50006 0C7.18427 0 6.93164 0.252632 6.93164 0.568421V1.94211C6.93164 2.25789 7.18427 2.49474 7.50006 2.49474Z" fill="black" />
                        <path d="M11.4316 4.13684C11.5737 4.13684 11.7158 4.08948 11.8264 3.97895L12.8053 3C13.0264 2.77895 13.0264 2.43158 12.8053 2.21053C12.5843 1.98948 12.2369 1.98948 12.0158 2.21053L11.0369 3.18948C10.8158 3.41053 10.8158 3.7579 11.0369 3.97895C11.1474 4.07369 11.2895 4.13684 11.4316 4.13684Z" fill="black" />
                        <path d="M14.4314 6.93158H13.0577C12.7419 6.93158 12.4893 7.18421 12.4893 7.5C12.4893 7.81579 12.7419 8.06842 13.0577 8.06842H14.4314C14.7472 8.06842 14.9998 7.81579 14.9998 7.5C14.9998 7.18421 14.7472 6.93158 14.4314 6.93158Z" fill="black" />
                        <path d="M11.8264 11.0368C11.6053 10.8158 11.2579 10.8158 11.0369 11.0368C10.8158 11.2579 10.8158 11.6053 11.0369 11.8263L12.0158 12.8053C12.1264 12.9158 12.2685 12.9632 12.4106 12.9632C12.5527 12.9632 12.6948 12.9158 12.8053 12.8053C13.0264 12.5842 13.0264 12.2368 12.8053 12.0158L11.8264 11.0368Z" fill="black" />
                        <path d="M7.50009 3.64737C5.36851 3.64737 3.64746 5.38421 3.64746 7.5C3.64746 9.63158 5.3843 11.3526 7.50009 11.3526C9.63167 11.3526 11.3527 9.61579 11.3527 7.5C11.3527 5.36842 9.63167 3.64737 7.50009 3.64737ZM7.50009 10.2316C6.00009 10.2316 4.76851 9 4.76851 7.5C4.76851 6 6.00009 4.76842 7.50009 4.76842C9.00009 4.76842 10.2317 6 10.2317 7.5C10.2317 9 9.00009 10.2316 7.50009 10.2316Z" fill="black" />
                      </svg>
                    )}
                  </div>
                </button>

                <Link
                  href="/login"
                  className="w-full border border-[#EFB24D] bg-[#EFB24D] text-[#000] px-4 py-3 font-semibold rounded-[7px] block text-center transition-all duration-300 ease-in-out hover:text-white hover:border hover:border-[#EFB24D] hover:bg-transparent"
                  onClick={toggleMobileMenu}
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}