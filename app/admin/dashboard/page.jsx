"use client"
import CustomSelect from "@/app/Components/layout/CustomSelect";
import { useState } from "react";
import Image from 'next/image'
import AdminDashboardPerformanceInsights from "../components/AdminDashboardPerformanceInsights";

function page() {
  const [selected, setSelected] = useState({
    label: "All",
    value: "all"
  });

  const options = [
    { value: "all", label: "All" },
    { value: "option1", label: "Option 1" },
    { value: "processing", label: "Option 2" },
    { value: "intransit", label: "Option 3" },
    { value: "cancelled", label: "Canelle" }
  ];
  return (
    <>
      <div>
        <div className="flex flex-col sm:flex-row itmes-center justify-between gap-[10px] sm:gap-[20px] mb-[25px]">
          <div>
            <CustomSelect
              options={options}
              value={selected}
              onChange={setSelected}
            />
          </div>
          <div className="relative min-w-[250px]">
            <input
              type="text"
              placeholder="Search..."
              className="w-full border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] text-[#F7F8F8B2] text-sm pl-[30px] px-4 py-[10px] placeholder:text-[#F7F8F8B2] focus-visible:outline-none"
            />
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"
              className="w-[15px] absolute left-[10px] top-1/2 -translate-y-1/2"
            >
              <path d="M11.7073 11.7073C12.3033 11.1112 12.7761 10.4037 13.0986 9.62491C13.4212 8.84617 13.5872 8.01152 13.5872 7.16862C13.5872 6.32571 13.4212 5.49106 13.0986 4.71232C12.7761 3.93358 12.3033 3.22599 11.7073 2.62997C11.1112 2.03395 10.4037 1.56115 9.62491 1.23859C8.84617 0.916022 8.01152 0.75 7.16862 0.75C6.32571 0.75 5.49106 0.916022 4.71232 1.23859C3.93358 1.56115 3.22599 2.03395 2.62997 2.62997C1.42624 3.83369 0.75 5.46629 0.75 7.16862C0.75 8.87094 1.42624 10.5035 2.62997 11.7073C3.83369 12.911 5.46629 13.5872 7.16862 13.5872C8.87094 13.5872 10.5035 12.911 11.7073 11.7073ZM11.7073 11.7073L15.75 15.75" stroke="#F7F8F8" strokeOpacity="0.7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <div className='flex md:flex-row flex-col gap-[25px] items-stretch'>
          <div className='border-[#F7F8F81C] border bg-[#F7F8F805] rounded-[7px] p-[20px] lg:p-[30px] flex items-center lg:flex-row md:flex-col flex-row gap-[10px] md:gap-[20px] justify-between basis-[33%]'>
            <div className='flex flex-col lg:items-start md:items-center items-start'>
              <h3 className='font-semibold mb-[10px] lg:mb-[15px] text-[15px] md:text-[17px] text-left md:text-center lg:text-left'>Active Users</h3>
              <span className='text-[#EFB24D] text-xl font-bold'>12,430</span>
              <span>↑ Up 8% vs last month</span>
            </div>
            <div>
              <Image src="/img/graph2.png" alt="Collectibles" width={150} height={150} className='w-[60px] lg:w-[150px]' />
            </div>
          </div>
          <div className='border-[#F7F8F81C] border bg-[#F7F8F805] rounded-[7px] p-[20px] lg:p-[30px] flex items-center lg:flex-row md:flex-col flex-row gap-[10px] md:gap-[20px] justify-between basis-[33%]'>
            <div className='flex flex-col lg:items-start md:items-center items-start'>
              <h3 className='font-semibold mb-[10px] lg:mb-[15px] text-[15px] md:text-[17px] text-left md:text-center lg:text-left'>Total Revenue</h3>
              <span className='text-[#EFB24D] text-xl font-bold'>$245,870</span>
              <span>Growth steady this week</span>
            </div>
            <div>
              <Image src="/img/graph2.png" alt="Collectibles" width={150} height={150} className='w-[60px] lg:w-[150px]' />
            </div>
          </div>
          <div className='border-[#F7F8F81C] border bg-[#F7F8F805] rounded-[7px] p-[20px] lg:p-[30px] flex items-center lg:flex-row md:flex-col flex-row gap-[10px] md:gap-[20px] justify-between basis-[33%]'>
            <div className='flex flex-col lg:items-start md:items-center items-start'>
              <h3 className='font-semibold mb-[10px] lg:mb-[15px] text-[15px] md:text-[17px] text-left md:text-center lg:text-left'>Conversion Rate</h3>
              <span className='text-[#EFB24D] text-xl font-bold'>4.7%</span>
              <span>Improved by 0.6%</span>
            </div>
            <div>
              <Image src="/img/graph2.png" alt="Collectibles" width={150} height={150} className='w-[60px] lg:w-[150px]' />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[20px]">
        <AdminDashboardPerformanceInsights/>
      </div>
    </>
  )
}

export default page