"use client";
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'


export default function ContactForm() {
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    const options = ["General Inquiry", "Support", "Feedback"];


    return (
        <div className='pt-[30px] pb-[20px] sm:pt-[40px] sm:pb-[40px] md:pt-[50px] md:pb-[60px] lg:pt-[80px] xl:pb-[100px] px-[20px] md:px-[30px] lg:px-[50px] relative'>
            <div className="absolute top-[-100px] sm:top-[-150px]  md:top-[-225px] lg:top-[-200px] left-0  bg-[#EFB24D]/30 blur-[150px] -z-10 h-[108px] w-[108px] md:h-[208px] md:w-[208px] lg:h-[308px] lg:w-[308px]"></div>
            <div className="absolute inset-0 top-[-100px] bg-[#EFB24D29] blur-[724px] -z-10 h-[60%]"></div>

            <div className="max-w-[1118px] mx-auto" data-aos="fade-up">
                <div className="  grid grid-cols-1 md:grid-cols-2 gap-[20px] sm:gap-[35px] md:gap-0 ">

                    {/* LEFT SIDE */}
                    <div>
                        <h2 className="text-[28px] md:text-[32px] lg:text-[50px] font-semibold mb-[19px] md:mb-[15px]">Contact Us</h2>

                        <div className="text-[16px] font-medium">

                            <div>
                                <Link href="/" className='flex  items-start gap-[11px] mb-[20px]  md:mb-[30px]'>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="22"
                                        viewBox="0 0 18 22"
                                        className="fill-black dark:fill-white transition-colors duration-300 md:mt-2"
                                    >
                                        <path d="M1.8231 13.64L8.20605 21.6262C8.2991 21.7424 8.41933 21.8366 8.55732 21.9014C8.69532 21.9663 8.84733 22 9.00143 22C9.15553 22 9.30753 21.9663 9.44553 21.9014C9.58352 21.8366 9.70376 21.7424 9.7968 21.6262L16.1798 13.64C17.1893 12.3772 17.8063 10.8732 17.9613 9.29705C18.1164 7.7209 17.8033 6.13511 17.0574 4.71796C16.3114 3.30081 15.1621 2.10848 13.7387 1.27501C12.3153 0.441552 10.6743 0 9 0C7.32573 0 5.68466 0.441552 4.26127 1.27501C2.83788 2.10848 1.6886 3.30081 0.942649 4.71796C0.196695 6.13511 -0.116362 7.7209 0.0386723 9.29705C0.193706 10.8732 0.810684 12.3772 1.82024 13.64H1.8231ZM9.00143 4.01233C9.91766 4.01233 10.8133 4.26921 11.5751 4.75047C12.337 5.23174 12.9307 5.91579 13.2814 6.71611C13.632 7.51643 13.7237 8.39708 13.545 9.2467C13.3662 10.0963 12.925 10.8767 12.2771 11.4893C11.6293 12.1018 10.8038 12.519 9.90519 12.688C9.00657 12.857 8.07511 12.7702 7.22862 12.4387C6.38213 12.1072 5.65862 11.5458 5.14959 10.8256C4.64056 10.1053 4.36887 9.25848 4.36887 8.39222C4.37037 7.23104 4.85893 6.11783 5.72738 5.29675C6.59582 4.47567 7.77326 4.01376 9.00143 4.01233Z" />
                                    </svg>


                                    <p className='flex gap-[6px] flex-wrap md:flex-nowrap md:gap-0 flex-row md:flex-col'>
                                        <span>San Francisco</span>
                                        <span>1200 Market St,</span>
                                        <span>Suite 450</span>
                                    </p>
                                </Link>
                            </div>

                            <div>
                                <Link href="/" className='flex items-center gap-[11px] mb-[20px] md:mb-[25px]'>
                                    <svg
                                        width="18"
                                        height="13"
                                        viewBox="0 0 18 13"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="fill-black dark:fill-white transition-colors duration-300">
                                        <path d="M15.9612 11.5708L16.9383 12.6444C16.6692 12.781 16.3719 12.8533 16.0705 12.8565H1.92832C1.627 12.8533 1.32968 12.781 1.06049 12.6444L2.03759 11.5708L6.65319 6.4924L7.84885 7.42449C8.16222 7.725 8.57846 7.89537 9.01236 7.90018C9.41895 7.89858 9.80946 7.74269 10.1052 7.46306L11.3458 6.49238L15.9612 11.5708ZM8.67807 6.44756C8.90948 6.65326 9.08948 6.65326 9.27588 6.4797L15.9485 1.28565L17.1571 0.340688C16.838 0.11972 16.4588 0.000802248 16.0707 0H1.92848C1.54038 0.000803483 1.1611 0.119726 0.842114 0.340688L2.05705 1.28565L8.67807 6.44756ZM5.63754 5.70188L1.28565 2.31413L0.0899958 1.38204C0.0337479 1.55882 0.00321311 1.74282 0 1.92843V10.928C0 11.1988 0.059461 11.4664 0.173563 11.7123L1.28564 10.4844L5.63754 5.70188ZM17.9091 1.38208L12.3678 5.70188L16.7133 10.4845L17.8254 11.7123C17.9395 11.4664 17.9989 11.1989 17.9989 10.9281V1.92849C17.9957 1.74288 17.9653 1.55884 17.9091 1.38208Z" />
                                    </svg>
                                    <p>info@fcookie.com</p>
                                </Link>
                            </div>

                            <div>
                                <Link href="tel:+12094389789" className='flex gap-[11px]'>
                                    <svg
                                        width="19"
                                        height="19"
                                        viewBox="0 0 19 19"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="fill-black dark:fill-white transition-colors duration-300">
                                        <path d="M16.3126 17.1967C15.9515 17.748 15.3242 18.0711 14.6589 18.0331C13.9936 17.9951 13.1382 17.9 12.5489 17.748C9.9257 17.0636 7.20747 15.4289 4.90742 13.1289C2.60738 10.8288 0.972626 8.11057 0.288314 5.48738C0.136245 4.89811 0.0602105 4.06173 0.00318451 3.39643C-0.0348328 2.75014 0.269315 2.12286 0.820566 1.76169L3.15863 0.20298C3.7669 -0.196202 4.58428 0.0128861 4.90742 0.65918L6.80829 4.32786C7.07441 4.84109 6.94135 5.48739 6.48514 5.84855L4.77436 7.17916C5.45867 8.45274 6.10496 9.4792 7.35953 10.7148C8.51906 11.8743 9.52652 12.5586 10.8381 13.2619L12.1877 11.5321C12.5489 11.0759 13.1952 10.9239 13.7084 11.209L17.3961 13.1098C18.0424 13.433 18.2515 14.2504 17.8523 14.8587L16.3126 17.1967Z" />
                                    </svg>
                                    <p > +1 (209) 438-9789</p>
                                </Link>
                            </div>

                        </div>
                    </div>

                    {/* RIGHT SIDE FORM */}
                    <div className=" w-full mx-auto bg-[#FFFFFF0A]  border border-[#E6E6E6] dark:border-transparent rounded-2xl  ">

                        <div className="text-[16px] sm:text-[18px] md:text-[20px] px-[15px]  py-[20px] sm:px-[25px] lg:pt-[30px] lg:pb-[25px] lg:px-[35px] font-medium border-b border-[#E6E6E6] dark:border-[#FFFFFF1C]">
                            <h2>
                                Tell us how we can help you
                            </h2>
                        </div>


                        <form className=" px-[15px]  pt-[20px] pb-[30px]  sm:px-[25px]  lg:pt-[30px] lg:pb-[42px] lg:px-[35px] space-y-[22px]">

                            {/* First Row */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px] ">
                                <div>
                                    <label className="form-label text-[12px] font-normal text-[#6C6C6C]">First Name</label>
                                    <input type="text" className=" outline-0 p-2 sm:p-3 form-input bg-transparent border border-[#E6E6E6] dark:border-[#FFFFFF1C] min-h-[35px] sm:min-h-[50px] rounded-[5px] w-full" />
                                </div>

                                <div>
                                    <label className="form-label text-[12px] font-normal text-[#6C6C6C]">Last Name</label>
                                    <input type="text" className="  outline-0 p-2 sm:p-3 form-input bg-transparent border border-[#E6E6E6] dark:border-[#FFFFFF1C] min-h-[35px] sm:min-h-[50px] rounded-[5px] w-full" />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="form-label text-[12px] font-normal text-[#6C6C6C]">Email Address*</label>
                                <input type="email" className="  outline-0 p-2 sm:p-3 form-input bg-transparent border border-[#E6E6E6] dark:border-[#FFFFFF1C] min-h-[35px] sm:min-h-[50px] rounded-[5px] w-full" />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="form-label text-[12px] font-normal text-[#6C6C6C]">Phone Number*</label>
                                <input type="text" className="  outline-0 p-2 sm:p-3 form-input bg-transparent border border-[#E6E6E6] dark:border-[#FFFFFF1C] min-h-[35px] sm:min-h-[50px] rounded-[5px] w-full" />
                            </div>


                            {/* Dropdown */}
                            <div ref={dropdownRef}>
                                <label className="form-label text-[12px] font-normal text-[#6C6C6C]">
                                    How can we help?
                                </label>

                                <div className="relative">

                                    {/* INPUT AREA */}
                                    <div
                                        onClick={() => setOpen(!open)}
                                        className="form-input h-[50px] flex items-center cursor-pointer px-[10px] border border-[#E6E6E6] dark:border-[#FFFFFF1C] rounded-[5px]"
                                    >
                                        <span className={value ? "text-black dark:text-white" : "text-white/30"}>
                                            {value || ""}
                                        </span>

                                        {/* Arrow */}
                                        <svg
                                            width="15"
                                            height="6"
                                            viewBox="0 0 12 8"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={`fill-black stroke-black dark:fill-white dark:stroke-white transition-all duration-300 
                                              absolute right-3 top-1/2 -translate-y-1/2 ${open ? "rotate-180" : ""}`}>
                                            <path d="M11.749 0.992188L11.748 0.991211C11.742 1.15632 11.6785 1.31337 11.5684 1.43652L11.5693 1.4375L6.53223 7.16113C6.46576 7.23738 6.38308 7.29894 6.29102 7.34082C6.199 7.38265 6.09913 7.4043 5.99805 7.4043C5.89696 7.40429 5.7971 7.38266 5.70508 7.34082C5.61302 7.29894 5.53032 7.23834 5.46387 7.16211L5.46484 7.16113L0.426758 1.4375C0.365304 1.36764 0.318209 1.28627 0.288086 1.19824C0.257969 1.11015 0.245153 1.01674 0.250977 0.923828C0.256874 0.83076 0.281202 0.739001 0.322266 0.655273C0.363325 0.571599 0.42127 0.497153 0.491211 0.435546C0.56115 0.373985 0.642304 0.326039 0.730469 0.295898C0.81861 0.265791 0.911928 0.253894 1.00488 0.259765C1.09789 0.265658 1.18878 0.290038 1.27246 0.331054C1.35619 0.372118 1.43152 0.429045 1.49316 0.499023L5.99707 5.61621L10.5029 0.499023L10.5039 0.5C10.5946 0.393443 10.714 0.315619 10.8486 0.277344C10.9851 0.238557 11.13 0.241516 11.2646 0.286133C11.3993 0.330832 11.5182 0.414674 11.6045 0.527344C11.6908 0.640143 11.7411 0.77714 11.749 0.918945C11.7502 0.942898 11.7502 0.968235 11.749 0.992188Z" strokeWidth="0.5" />
                                        </svg>
                                    </div>

                                    {/* DROPDOWN MENU */}
                                    {open && (
                                        <div className="absolute left-0 top-[54px] w-full bg-white dark:bg-[#16130D] border border-[#E6E6E6] dark:border-[#FFFFFF1C] rounded-md overflow-hidden z-20">
                                            {options.map((opt) => (
                                                <div
                                                    key={opt}
                                                    onClick={() => {
                                                        setValue(opt);
                                                        setOpen(false);
                                                    }}
                                                    className="px-4 py-3 text-black dark:text-white hover:bg-white/10 cursor-pointer transition"
                                                >
                                                    {opt}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                </div>
                            </div>

                            {/* Textarea */}
                            <div>
                                <label className="form-label text-[12px] font-normal text-[#6C6C6C]">Message</label>
                                <textarea className=" outline-0 p-3 form-input  bg-transparent border border-[#E6E6E6] dark:border-[#FFFFFF1C] min-h-[80px] md:min-h-[140px] rounded-[5px] w-full"></textarea>
                            </div>

                            {/* BUTTON */}
                            <button
                                type="submit"
                                className="bg-[#EFB24D] text-black text-[16px] font-normal px-[27px] py-[12px]
                                   hover:bg-[#e4b455] transition w-full sm:w-auto mt-[30px] rounded-[7px]">
                                Submit Form
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
