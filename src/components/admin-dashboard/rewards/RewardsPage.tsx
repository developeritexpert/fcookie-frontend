"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { RewardsPageSkeleton } from "@/components/skeleton-loading/PageSkeletons";

interface Reward {
  id: number;
  rewardName: string;
  type: string;   
  value: number;
  probability: string;
  expiryDays: number;
  status: string;
}

const rewardsData: Reward[] = [
  { id: 1, rewardName: "Gift Code", type: "Prize Code", value: 1.0, probability: "0%", expiryDays: 99, status: "Active" },
  { id: 2, rewardName: "Iced Coffee", type: "Apple Card", value: 0.0, probability: "18%", expiryDays: 30, status: "Inactive" },
  { id: 3, rewardName: "Ice Cream", type: "Apple Card", value: 0.0, probability: "0%", expiryDays: 7, status: "Active" },
  { id: 4, rewardName: "RP Reward", type: "Coupon", value: 150, probability: "20%", expiryDays: 90, status: "Active" },
  { id: 5, rewardName: "Apple Gift Thing", type: "Collectible", value: 2, probability: "7%", expiryDays: 7, status: "Active" },
  { id: 6, rewardName: "Frosty", type: "Collectible", value: 123, probability: "10%", expiryDays: 90, status: "Inactive" },
];


export default function RewardsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const getStatusColor = (status: string) => {
    return status.toLowerCase() === "active" ? "text-[#75DA5B]" : "text-[#FF6B6B]";
  };

  const handleEdit = (id: number) => console.log("Edit reward:", id);
  const handleRemove = (id: number) => console.log("Remove reward:", id);

  // Show skeleton while loading
  if (isLoading) {
    return <RewardsPageSkeleton />;
  }

  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px] mb-[25px]">
        {/* Total Active Rewards */}
        <div className="bg-[#F7F8F80A] border border-[#F7F8F81C] rounded-[7px] p-[20px]">
          <div className="flex items-center justify-between mb-[10px]">
            <div className="flex flex-col justify-between gap-[20px]">
              <span className="text-[22px]">Total Active Rewards</span>
              <div className="text-[#EFB24D] text-3xl font-semibold">2,500+</div>
            </div>
            <div className="flex items-center justify-center">
             <Image
                src="/icons/total-rewards.png"
                alt="Total Rewards"
                width={150}
                height={150}
                className="w-[40px] lg:w-[60px]"
              />
            </div>
          </div>
        </div>

        {/* Average Reward Value */}
        <div className="bg-[#F7F8F80A] border border-[#F7F8F81C] rounded-[7px] p-[20px]">
          <div className="flex items-center justify-between mb-[10px]">
            <div className="flex flex-col justify-between gap-[20px]">
              <span className="text-[22px]">Average Reward Value</span>
              <div className="text-[#EFB24D] text-3xl font-semibold">$900</div>
            </div>
            <div className="flex items-center justify-center">
             <Image
                src="/icons/average-reward.png"
                alt="Average Rewards"
                width={150}
                height={150}
                className="w-[40px] lg:w-[60px]"
              />
            </div>
          </div>
        </div>

        {/* Users Used Reward (Last 7 Days) */}
        <div className="bg-[#F7F8F80A] border border-[#F7F8F81C] rounded-[7px] p-[20px]">
          <div className="flex items-center justify-between mb-[10px]">
            <div className="flex flex-col justify-between gap-[20px]">
              <span className="text-[22px]">Spins Used (Last 7 Days)</span>
              <div className="text-[#EFB24D] text-3xl font-semibold">300+</div>
            </div>
            <div className="flex items-center justify-center">
             <Image
                src="/icons/spins-used.png"
                alt="Spins Used"
                width={150}
                height={150}
                className="w-[40px] lg:w-[60px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-[25px]">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search rewards..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] text-[#F7F8F8B2] text-sm pl-[30px] px-4 py-[10px] placeholder:text-[#F7F8F8B2] focus-visible:outline-0 focus-visible:border focus-visible:border-[#ffffff80] duration-300"
          />
          <svg 
            width="17" 
            height="17" 
            viewBox="0 0 17 17" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-[15px] absolute left-[10px] top-1/2 -translate-y-1/2"
          >
            <path 
              d="M11.7073 11.7073C12.3033 11.1112 12.7761 10.4037 13.0986 9.62491C13.4212 8.84617 13.5872 8.01152 13.5872 7.16862C13.5872 6.32571 13.4212 5.49106 13.0986 4.71232C12.7761 3.93358 12.3033 3.22599 11.7073 2.62997C11.1112 2.03395 10.4037 1.56115 9.62491 1.23859C8.84617 0.916022 8.01152 0.75 7.16862 0.75C6.32571 0.75 5.49106 0.916022 4.71232 1.23859C3.93358 1.56115 3.22599 2.03395 2.62997 2.62997C1.42624 3.83369 0.75 5.46629 0.75 7.16862C0.75 8.87094 1.42624 10.5035 2.62997 11.7073C3.83369 12.911 5.46629 13.5872 7.16862 13.5872C8.87094 13.5872 10.5035 12.911 11.7073 11.7073ZM11.7073 11.7073L15.75 15.75" 
              stroke="#F7F8F8" 
              strokeOpacity="0.7" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </svg>
        </div>
      </div>

      {/* Rewards Table */}
      <div className="w-full overflow-x-auto rounded-[7px]">
        <table className="lg:w-full text-sm rounded-[7px]">
          <thead>
            <tr className="bg-[#fff] text-[#000] font-medium text-left">
              <th className="py-[18px] px-[15px] border border-[#0000001C] min-w-[180px]">Reward Name</th>
              <th className="py-[18px] px-[15px] border border-[#0000001C] min-w-[170px]">Type</th>
              <th className="py-[18px] px-[15px] border border-[#0000001C] min-w-[100px]">Value</th>
              <th className="py-[18px] px-[15px] border border-[#0000001C] min-w-[120px]">Probability (%)</th>
              <th className="py-[18px] px-[15px] border border-[#0000001C] min-w-[120px]">Expiry (Days)</th>
              <th className="py-[18px] px-[15px] border border-[#0000001C] min-w-[100px]">Status</th>
              <th className="py-[18px] px-[15px] border border-[#0000001C] min-w-[100px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {rewardsData.map((reward) => (
              <tr key={reward.id} className="text-[#F7F8F8B2] bg-[#F7F8F81C] hover:bg-[#F7F8F82A] transition-colors">
                <td className="py-[10px] px-[15px] border border-[#F7F8F81C]">{reward.rewardName}</td>
                <td className="py-[10px] px-[15px] border border-[#F7F8F81C]">{reward.type}</td>
                <td className="py-[10px] px-[15px] border border-[#F7F8F81C]">{reward.value}</td>
                <td className="py-[10px] px-[15px] border border-[#F7F8F81C]">{reward.probability}</td>
                <td className="py-[10px] px-[15px] border border-[#F7F8F81C]">{reward.expiryDays}</td>
                <td className="py-[10px] px-[15px] border border-[#F7F8F81C]">
                  <span className={getStatusColor(reward.status)}>{reward.status}</span>
                </td>
                <td className="py-[10px] px-[15px] border border-[#F7F8F81C]">
                  <div className="flex gap-2">
                    <Link href="/admin/reward-edit" onClick={() => handleEdit(reward.id)} className="block border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] py-[6px] px-[15px] text-xs whitespace-nowrap hover:bg-[#F7F8F815] transition-colors cursor-pointer">Edit</Link>
                    <button onClick={() => handleRemove(reward.id)} className="border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] py-[6px] px-[15px] text-xs whitespace-nowrap hover:bg-[#F7F8F815] transition-colors cursor-pointer">Remove</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-[20px] mt-[40px]">
         <button className="flex gap-[5px] items-center bg-gradient-to-r from-[#75DA5B] to-[#4DCE94] rounded-[7px] text-black font-semibold px-[20px] py-[10px] text-sm hover:opacity-90 transition-opacity">
            {/* Plus Icon */}
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.62402 0.255859C7.91001 0.284359 8.17878 0.411199 8.38379 0.616211C8.61821 0.850631 8.75 1.16848 8.75 1.5V6.25H13.5C13.8315 6.25 14.1494 6.38179 14.3838 6.61621C14.6182 6.85063 14.75 7.16848 14.75 7.5C14.75 7.83152 14.6182 8.14937 14.3838 8.38379C14.1494 8.61821 13.8315 8.75 13.5 8.75H8.75V13.5C8.75 13.8315 8.61821 14.1494 8.38379 14.3838C8.14937 14.6182 7.83152 14.75 7.5 14.75C7.16848 14.75 6.85063 14.6182 6.61621 14.3838C6.38179 14.1494 6.25 13.8315 6.25 13.5V8.75H1.5C1.16848 8.75 0.850631 8.61821 0.616211 8.38379C0.381791 8.14937 0.25 7.83152 0.25 7.5C0.25 7.16848 0.381791 6.85063 0.616211 6.61621C0.850631 6.38179 1.16848 6.25 1.5 6.25H6.25V1.5C6.25 1.16848 6.38179 0.850631 6.61621 0.616211C6.85063 0.38179 7.16848 0.25 7.5 0.25L7.62402 0.255859Z" fill="black" stroke="black" strokeWidth="0.5" />
            </svg>
            Add Rewards
          </button>
      </div>
    </div>
  );
}