import React from 'react'
export default function SimilarProducts() {
      const relatedProducts = [
    {
      title: "2023 Panini Prizm Zion Williamson Concourse Ball White Pink Prizm",
      price: "$34.00",
      image: "/img/market-card1.png",
    },
    {
      title: "2021 Panini Chronicles Optic Spalding Beige Gold",
      price: "$50.00",
      image: "/img/market-card2.png",
    },
    {
      title: "2007 Topps Select Rookie Norm Purple Pulse Foil Patch",
      price: "$299.99",
      image: "/img/market-card3.png",
    },
    {
      title: "2020 Panini Prizm Lebron Summer",
      price: "$75",
      image: "/img/market-card4.png",
    },
  ];
  return (
    <div>
            {/* Similar Products Section */}

      <div className="pt-[30px] pb-[30px]  sm:pt-[40px] sm:pb-[40px]   md:pt-[70px] md:pb-[80px]   lg:pt-[86px] lg:pb-[100px]  px-[20px] md:px-[30px] lg:px-[50px] relative">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#EFB24D14] to-[rgba(239,178,77,0)] pointer-events-none"></div>
        <div className="container relative z-10">

          <div className="flex items-center justify-center mb-[25px] sm:mb-[40px]">
            <h2 className="text-[32px] text-black dark:text-white font-semibold">Similar listings</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 xl:grid-cols-4 gap-6 ">
            {relatedProducts.map((item, index) => (
              <div
                key={index}
                className="group bg-transparent dark:bg-[#0D0D0D] border border-[#E6E6E6] dark:border-[#343434] rounded-2xl p-6 hover:border-[#EFB24D] hover:shadow-lg hover:shadow-[#EFB24D]/20 transition-all cursor-pointer"
              >
                <div className="w-full h-[180px] sm:h-[240px] flex items-center justify-center mb-6  rounded-xl overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform"
                  />
                </div>

                <div>
                  <h4 className="text-[16px] font-medium text-black dark:text-white mb-2 line-clamp-2 min-h-[40px]">
                    {item.title}
                  </h4>
                  <p className="text-[15px] font-normal text-[#6C6C6C]">
                    {item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
