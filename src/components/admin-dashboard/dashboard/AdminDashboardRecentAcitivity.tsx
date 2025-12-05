import React from 'react'
import Image from 'next/image';
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AdminDashboardRecentAcitivity() {
    const data = {
        labels: ['New Users', 'Returning Users'],
        datasets: [
            {
                data: [75, 25],
                backgroundColor: ["#75DA5B", "#75DA5B60"],
                hoverBackgroundColor: ['#75DA5BCC', '#75DA5B40'],
                borderWidth: 0,
                hoverOffset: 2,
                cutout: "70%",
            },
        ],
    };



    const options = {
        plugins: {
            legend: {
                display: true,
                position: 'right',
                labels: {
                    color: '#F7F8F8B2',
                    padding: 15,
                    usePointStyle: true, // IMPORTANT: This makes it use pointStyle
                    pointStyle: 'circle', // This makes it circular
                    boxWidth: 10, // Size of the circle
                    boxHeight: 10,
                    font: {
                        size: 12,
                    }
                }
            }
        }
    };

    const recent = [
        {
            icon: "/icons/recent-act-svg1.svg",
            title: "New Subscription Added",
            message: "John D. just subscribed to the Gold Plan.",
            time: "2 minutes ago",
        },
        {
            icon: "/icons/recent-act-svg2.svg",
            title: "Payment Received",
            message: "$249.00 payment via Stripe was successful.",
            time: "15 minutes ago",
        },
        {
            icon: "/icons/recent-act-svg3.svg",
            title: "Campaign Update",
            message: "Winter Wellness campaign launched",
            time: "1 hour ago",
        }
    ];
    return (
        <div>
            <div className='flex flex-col lg:flex-row gap-[27px]'>
                <div className='bg-[#F7F8F805] basis-[990px] border border-[#F7F8F81C] px-[30px] pt-[17px] pb-[32px] rounded-[7px]'>
                    <h4 className='text-[18px] md:text-[20px] lg:text-[24px] font-semibold mb-[25px]'>Recent Activity / Insights Panel</h4>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-[25px]">
                        {recent.map((item, index) => (
                            <div
                                key={index}
                                className=" border border-[#F7F8F81A] rounded-xl px-[25px] py-[23px] hover:border-[#2a2a2a] transition">
                                {/* ICON + TITLE */}
                                <Image
                                    src={item.icon}
                                    alt="recent icon"
                                    width={44}
                                    height={33}
                                    className="mb-[15px]"
                                />

                                <h3 className=" text-[18px] md:text-[20px] lg:text-[22px] font-semibold text-white mb-[8px]">
                                    {item.title}
                                </h3>


                                {/* MESSAGE */}
                                <p className="text-[#F7F8F8] font-normal mb-[5px]">
                                    {item.message}
                                </p>

                                {/* TIME */}
                                <p className="text-sm text-normal text-[#EFB24D] ">
                                    {item.time}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>

                <div className="flex-1 bg-[#F7F8F805] border border-[#F7F8F81C] h-full max-h-[fit-content] rounded-xl px-[30px] py-[21px] w-full  text-white">

                    <h2 className="text-[18px] md:text-[20px] lg:text-[24px] font-semibold mb-[25px] md:mb-[48px]">User Engagement</h2>

                    <div className='flex justify-center items-center'>
                        <div className=" flex justify-center items-center w-full max-w-[300px] h-full min-h-[260px]">
                            <Doughnut data={data} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
