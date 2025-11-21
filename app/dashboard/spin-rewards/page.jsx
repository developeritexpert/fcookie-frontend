"use client"
import CustomSelect from "@/app/components/layout/CustomSelect";
import { useState } from "react";

function Page() {
    const [selected, setSelected] = useState({
        label: "All",
        value: "all"
    });

    const options = [
        { value: "all", label: "All" },
        { value: "delivered", label: "Delivered" },
        { value: "processing", label: "Processing" },
        { value: "intransit", label: "In Transit" },
        { value: "cancelled", label: "Cance   led" }
    ];

    const tableData = [
        { id: 1, rewards: "+250 Credits", dateTime: "Jan 18, 2025 — 3:21 PM", credits: "250", status: "✅ Added to Wallet" },
        { id: 2, rewards: "Mystery Pack (Tier 2)", dateTime: "Jan 17, 2025 — 6:40 PM", credits: "0", status: "🎁 Claimed"},
        { id: 3, rewards: "+25 Credits", dateTime: "Jan 17, 2025 — 12:14 PM", credits: "25", status: "✅ Added to Wallet" },
        { id: 4, rewards: "Spin Boost (x2 next spin)", dateTime: "Jan 16, 2025 — 9:05 PM", credits: "0", status: "⚡ Active" },
        { id: 5, rewards: "+500 Credits (Rare)", dateTime: "Jan 15, 2025 — 4:48 PM", credits: "500", status: "✅ Added to Wallet" },
        { id: 6, rewards: "+10 Credits", dateTime: "Jan 15, 2025 — 9:17 AM", credits: "10", status: "✅ Added to Wallet" },
        { id: 7, rewards: "Sticker Capsule", dateTime: "Jan 14, 2025 — 7:33 PM", credits: "0", status: "🎁 Claimed" },
        { id: 8, rewards: "+100 Credits", dateTime: "Jan 14, 2025 — 3:02 PM", credits: "100", status: "✅ Added to Wallet"},
        { id: 9, rewards: "Spin Again Token", dateTime: "Jan 13, 2025 — 8:19 PM", credits: "0", status: "♻ Added to Spins" },
        { id: 10, rewards: "No Reward (Try Again)", dateTime: "Jan 13, 2025 — 11:50 AM", credits: "0", status: "❗ Logged" }
    ];

     const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case '✅ added to wallet': return 'text-[#75DA5B]';
            case '🎁 claimed': return 'text-[#4DA4FF]';
            case '⚡ active': return 'text-[#FFCD5C]';
            case '♻ added to spins': return 'text-[#C88BFF]';
            case '❗ logged': return 'text-[#FF6B6B]';
            default: return 'text-[#F7F8F8B2]';
        }
    };

    return (
        <div>
            <div className="flex flex-col sm:flex-row itmes-center justify-between gap-[10px] sm:gap-[20px] mb-[25px]">
                <div>
                    <CustomSelect
                        options={options}
                        value={selected}
                        onChange={setSelected}
                    />
                </div>
                <div className="flex flex-col-reverse md:flex-row md:items-center gap-[20px] items-stretch">
                  <button className="self-center bg-gradient-to-r from-[#75DA5B] to-[#4DCE94] rounded-[7px] text-black font-semibold px-[20px] py-[10px] text-sm">Spin to Win</button>
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
            </div>
            <div className='w-full overflow-x-auto rounded-[7px]'>
                <table className='lg:w-full text-sm rounded-[7px]'>
                    <thead>
                        <tr className='bg-[#fff] text-[#000] font-medium text-left'>
                            <th className='py-[18px] px-[15px] border border-[#0000001C] min-w-[200px]'>Reward</th>
                            <th className='py-[18px] px-[15px] border border-[#0000001C] min-w-[150px] md:min-w-[200px]'>Date & Time</th>
                            <th className='py-[18px] px-[15px] border border-[#0000001C] min-w-[150px] md:min-w-[200px]'>Credits Earned</th>
                            <th className='py-[18px] px-[15px] border border-[#0000001C] min-w-[150px] md:min-w-[200px]'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((item) => (
                            <tr key={item.id} className='text-[#F7F8F8B2] bg-[#F7F8F81C] hover:bg-[#F7F8F82A] transition-colors '>
                                <td className='py-[15px] px-[15px] border border-[#F7F8F81C]'>{item.rewards}</td>
                                <td className='py-[15px] px-[15px] border border-[#F7F8F81C]'>{item.dateTime}</td>
                                <td className='py-[15px] px-[15px] border border-[#F7F8F81C]'>{item.credits}</td>
                                <td className='py-[15px] px-[15px] border border-[#F7F8F81C]'>
                                    <span className={getStatusColor(item.status)}>
                                        {item.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Page