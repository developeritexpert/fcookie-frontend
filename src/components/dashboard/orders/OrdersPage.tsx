"use client";
import { useState, useEffect } from "react";
import { OrdersPageSkeleton } from "@/components/skeleton-loading/PageSkeletons";
import CustomDropdown from "@/components/layout/DashboardCustomDropdown";

interface Option {
  value: string;
  label: string;
}

interface TableDataItem {
  id: number;
  item: string;
  orderId: string;
  date: string;
  amount: string;
  status: 'Delivered' | 'Processing' | 'In Transit' | 'Cancelled';
  action: string;
}

function OrdersPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState<string>("all");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <OrdersPageSkeleton />;
  }

  const options: Option[] = [
    { value: "all", label: "All" },
    { value: "delivered", label: "Delivered" },
    { value: "processing", label: "Processing" },
    { value: "intransit", label: "In Transit" },
    { value: "cancelled", label: "Cancelled" }
  ];

  const tableData: TableDataItem[] = [
    { id: 1, item: "Cosmo Cookie Pack #14", orderId: "#FC-00882", date: "Jul 16, 2025", amount: "$1,200", status: "Delivered", action: "View Details" },
    { id: 2, item: "Pixel Stadium Pack #03", orderId: "#FC-00857", date: "Jul 30, 2025", amount: "$750", status: "In Transit", action: "Track Shipment" },
    { id: 3, item: "Rare Trainer Token", orderId: "#FC-00890", date: "Aug 15, 2025", amount: "$2,000", status: "Processing", action: "View Details" },
    { id: 4, item: "Nixon Arena Pack #07", orderId: "#FC-00871", date: "Aug 25, 2025", amount: "$1,800", status: "Delivered", action: "View Details" },
    { id: 5, item: "Bismarcki Card Shard", orderId: "#FC-00948", date: "Sep 05, 2025", amount: "$3,500", status: "Delivered", action: "View Details" },
    { id: 6, item: "Galaxy Church Cookie #102", orderId: "#FC-00811", date: "Sep 15, 2025", amount: "$1,000", status: "Cancelled", action: "View Details" },
    { id: 7, item: "Power Trainer Box #01", orderId: "#FC-00792", date: "Sep 25, 2025", amount: "$2,500", status: "Delivered", action: "View Details" },
    { id: 8, item: "Retro Series Pack #05", orderId: "#FC-00785", date: "Oct 06, 2025", amount: "$1,650", status: "In Transit", action: "Track Shipment" },
    { id: 9, item: "Champion Badge Token", orderId: "#FC-00721", date: "Oct 15, 2025", amount: "$2,200", status: "Processing", action: "View Details" },
    { id: 10, item: "Lunar Halo Pack #68", orderId: "#FC-00899", date: "Oct 20, 2025", amount: "$4,000", status: "Delivered", action: "View Details" }
  ];

  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'text-[#75DA5B]';
      case 'processing': return 'text-[#FFCD5C]';
      case 'in transit': return 'text-[#4DA4FF]';
      case 'cancelled': return 'text-[#FF6B6B]';
      default: return 'text-[#F7F8F8B2]';
    }
  };

  const getActionButton = (status: string, action: string)=> {
    const baseClasses = 'border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] py-[6px] px-[15px] text-xs whitespace-nowrap hover:bg-[#F7F8F815] transition-colors';
    
    return (
      <button className={baseClasses}>
        {action}
      </button>
    );
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-[10px] sm:gap-[20px] mb-[25px]">
        <div>
          <CustomDropdown
            options={options}
            value={selected}
            onChange={setSelected}
            placeholder="Select Filter"
          />
        </div>
        <div className="relative min-w-[250px]">
          <input
            type="text"
            placeholder="Search..."
            className="w-full border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] text-[#F7F8F8B2] text-sm pl-[30px] px-4 py-[10px] placeholder:text-[#F7F8F8B2] focus-visible:outline-0  focus-visible:border focus-visible:border-[#ffffff80] duration-300"
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
      
      <div className='w-full overflow-x-auto rounded-[7px]'>
        <table className='lg:w-full text-sm rounded-[7px]'>
          <thead>
            <tr className='bg-[#fff] text-[#000] font-medium text-left'>
              <th className='py-[18px] px-[15px] border border-[#0000001C] min-w-[150px]'>Item</th>
              <th className='py-[18px] px-[15px] border border-[#0000001C] min-w-[120px] md:min-w-[150px]'>Order ID</th>
              <th className='py-[18px] px-[15px] border border-[#0000001C] min-w-[120px] md:min-w-[150px]'>Date</th>
              <th className='py-[18px] px-[15px] border border-[#0000001C] min-w-[100px] md:min-w-[150px]'>Amount</th>
              <th className='py-[18px] px-[15px] border border-[#0000001C] min-w-[120px] md:min-w-[150px]'>Status</th>
              <th className='py-[18px] px-[15px] border border-[#0000001C] min-w-[150px]'>Action</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item) => (
              <tr key={item.id} className='text-[#F7F8F8B2] bg-[#F7F8F81C] hover:bg-[#F7F8F82A] transition-colors'>
                <td className='py-[15px] px-[15px] border border-[#F7F8F81C]'>{item.item}</td>
                <td className='py-[15px] px-[15px] border border-[#F7F8F81C]'>{item.orderId}</td>
                <td className='py-[15px] px-[15px] border border-[#F7F8F81C]'>{item.date}</td>
                <td className='py-[15px] px-[15px] border border-[#F7F8F81C]'>{item.amount}</td>
                <td className='py-[15px] px-[15px] border border-[#F7F8F81C]'>
                  <span className={getStatusColor(item.status)}>
                    {item.status}
                  </span>
                </td>
                <td className='py-[15px] px-[15px] border border-[#F7F8F81C]'>
                  {getActionButton(item.status, item.action)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrdersPage;