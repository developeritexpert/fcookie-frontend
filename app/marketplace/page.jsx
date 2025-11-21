import React from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Link from 'next/link'
import FilterPage from '../components/layout/Market-filter-sec'
import Discover from '../components/layout/Discover-more'
import ProductsFilter from '../components/layout/Market-filter-sec'

export default function

  () {
  return (
    <div>

      <Header />

      {/* Banner  */}
      <div className='px-[20px] md:px-[30px] lg:px-[60px] m-auto pb-[20px] md:pb-[50px] lg:pb-[105px] relative'>
        <div className="absolute  -z-0 top-[-181px] left-0 right-0 bottom-0 bg-[#EFB24D29] blur-[754px] "></div>
        <div className="bg-[url('/img/market-bann-img.png')]  bg-cover bg-center  max-w-[1800px] w-full h-[250px] sm:h-[300px]  md:h-[420px] lg:h-[642px] relative filter  brightness-110 rounded-[10px] md:rounded-[15px] lg:rounded-[25px] ">
          <div className='absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.1),rgba(0,0,0,0.1)),linear-gradient(180deg,rgba(255,255,255,0)_43.69%,rgba(255,255,255,0.99)_100%)]   dark:bg-[linear-gradient(180deg,rgba(0,0,0,0)_43.69%,rgba(0,0,0,0.94)_100%),linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2))] rounded-[10px] md:rounded-[15px] lg:rounded-[25px] '></div>
          <div className='flex flex-col text-white   absolute  top-[25px] left-[20px] sm:top-[30px] sm:left-[30px] sm:bottom-auto  md:top-auto md:left-[40px] md:bottom-[33px]  lg:left-[80px] xl:left-[180px] '>
            <h1 className='text-[26px] sm:text-[28px] md:text-[35px] lg:text-[50px] font-semibold  mb-[8px]'>Start Building Your Collection</h1>
            <p className=' text-[18px] md:text-[20px] leading-[27px]  max-w-[650px]' >
              Discover, collect, and trade digital packs and rare items. Your next find is waiting.
            </p>
          </div>

        </div>
      </div>
     <ProductsFilter/>
      <Discover />
      <Footer />

    </div>
  )
}
