import React from 'react'
import Image from 'next/image'

function page() {
  return (
    <>
      <div>
        <div>
          <div>

          </div>
          <div>

          </div>
        </div>
        <div className='flex gap-[25px] items-stretch'>
          <div className='border-[#F7F8F81C] border bg-[#F7F8F805] rounded-[7px] p-[30px] flex items-center gap-[20px] justify-between basis-[33%]'>
              <div>
                  <h3 className='font-semibold mb-[15px] text-[18px]'>Number of Collectibles Owned</h3>
                  <span className='text-[#EFB24D] text-xl font-bold'>2500 +</span>
              </div>
              <div>
                  <Image src="/icons/collectibles.png" alt="Collectibles" width={150} height={150} className='w-[80px]' />
              </div>
          </div>
          <div className='border-[#F7F8F81C] border bg-[#F7F8F805] rounded-[7px] p-[30px] flex items-center gap-[20px] justify-between basis-[33%]'>
              <div>
                  <h3 className='font-semibold mb-[15px] text-[18px]'>Total Rewards Earned (Spin Credits)</h3>
                  <span className='text-[#EFB24D] text-xl font-bold'>2500 +</span>
              </div>
              <div>
                  <Image src="/icons/rewards.png" alt="Collectibles" width={150} height={150} className='w-[80px]' />
              </div>
          </div>
          <div className='border-[#F7F8F81C] border bg-[#F7F8F805] rounded-[7px] p-[30px] flex items-center gap-[20px] justify-between basis-[33%]'>
              <div>
                  <h3 className='font-semibold mb-[15px] text-[18px]'>Last Activity Timestamp</h3>
                  <span className='text-[#EFB24D] text-xl font-bold'>2500 +</span>
              </div>
              <div>
                  <Image src="/icons/timestamp.png" alt="Collectibles" width={150} height={150} className='w-[80px]' />
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default page