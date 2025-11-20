import React from 'react'
import Image from 'next/image'

function Page() {
  return (
    <>
      <div className='bg-[#F7F8F80A] border border-[#F7F8F81A] rounded-[7px] mb-[20px] sm:p-[20px] p-[25px] p-[15px] flex items-center gap-[25px]'>
        <div className='relative'>
          <Image src="/img/user.png" alt="User" width={150} height={150} className='w-[100px] md:w-[120px]' />
          <button className='bg-[#F7F8F8] border-2 border-[#332B17] p-1 lex justify-center items-center h-[25px] w-[25px] rounded-full absolute right-[5px] bottom-[5px]'>
            <Image src="/icons/camera.png" alt="Camera" width={20} height={20} className='w-[20px]' />
          </button>
        </div>
        <div>
          <h2 className='text-[17px] md:text-[20px] font-semibold'>John Doe</h2>
          <p className='text-sm md:text-base'>Participate</p>
          <p className='text-sm md:text-base'>Leeds, United Kingdom</p>
        </div>
      </div>
      <div className='bg-[#F7F8F80A] border border-[#F7F8F81A] rounded-[7px] mb-[20px]'>
        <div className='sm:p-[20px] p-[25px] p-[15px] border-b border-[#F7F8F81C] flex items-center justify-between gap-[20px]'>
          <h3 className='font-semibold text-[18px] md:text-[20px]'>Personal Information</h3>
          <button className='flex items-center gap-[5px] bg-gradient-to-r from-[#75DA5B] to-[#4DCE94] rounded-[7px] text-black font-semibold px-[20px] py-[8px] text-sm'>
            <Image src="/icons/edit.png" alt="Edit" width={10} height={10} className='w-[12px]' />
            Edit
          </button>
        </div>
        <div className='sm:p-[20px] p-[25px] p-[15px] text-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[25px] sm:gap-[30px] lg:gap-[50px]'>
          <div className='space-y-[5px]'>
            <p className='text-[#F7F8F8B3]'>First Name</p>
            <p className='font-semibold'>John</p>
          </div>
          <div className='space-y-[5px]'>
            <p className='text-[#F7F8F8B3]'>Last Name</p>
            <p className='font-semibold'>Doe</p>
          </div>
          <div className='space-y-[5px]'>
            <p className='text-[#F7F8F8B3]'>Email Address</p>
            <p className='font-semibold'>info@johndoe.com</p>
          </div>
          <div className='space-y-[5px]'>
            <p className='text-[#F7F8F8B3]'>Phone Number</p>
            <p className='font-semibold'>(+00)987 654-3210</p>
          </div>
          <div className='space-y-[5px]'>
            <p className='text-[#F7F8F8B3]'>User Role</p>
            <p className='font-semibold'>Participate</p>
          </div>
        </div>
      </div>
      <div className='flex flex-col md:flex-row gap-[20px] items-stretch'>
        <div className='bg-[#F7F8F80A] border border-[#F7F8F81A] rounded-[7px] basis-[50%] lg:basis-[60%]'>
          <div className='sm:p-[20px] p-[25px] p-[15px] border-b border-[#F7F8F81C]'>
            <h3 className='font-semibold text-[18px] md:text-[20px]'>Account Security</h3>
          </div>
          <div className='sm:p-[20px] p-[25px] p-[15px] text-sm'>
            <form>
              <div className='mb-[15px]'>
                <input
                  type="password"
                  placeholder="Password"
                  className='w-full text-sm border border-[#FFFFFF1C] bg-transparent placeholder:text-[#F7F8F8] rounded-[7px] py-[15px] px-[15px] focus-visible:outline-none focus-visible:border focus-visible:border-[#ffffff80] duration-300'
                />
              </div>
              <div className='mb-[15px]'>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className='w-full text-sm border border-[#FFFFFF1C] bg-transparent placeholder:text-[#F7F8F8] rounded-[7px] py-[15px] px-[15px] focus-visible:outline-none focus-visible:border focus-visible:border-[#ffffff80] duration-300'
                />
              </div>
              <button type='submit' className='bg-gradient-to-b from-[#75DA5B] to-[#4DCE94] w-full cursor-pointer py-[15px] text-[#000] mb-[10px] font-semibold px-[30px] rounded-[7px]'>Save Changes</button>
            </form>
          </div>
        </div>
        <div className='bg-[#F7F8F80A] border border-[#F7F8F81A] rounded-[7px] basis-[50%] lg:basis-[40%]'>
          <div className='sm:p-[20px] p-[25px] p-[15px] border-b border-[#F7F8F81C]'>
            <h3 className='font-semibold text-[18px] md:text-[20px]'>Wallets</h3>
          </div>
          <div className='sm:p-[20px] p-[25px] p-[15px] flex flex-col justify-between gap-[30px]'>
            <div className='flex gap-[15px] md:gap-[30px] items-center justify-between'>
              <div className='flex items-center gap-[10px]'>
                <div className='border border-[#343434] bg-[#0D0D0D] rounded-full p-[10px] flex justify-center items-center'>
                  <Image src="/icons/cookie.png" alt="Cookie" width={50} height={50} className='w-[20px]' />
                </div>
                <div className=''>
                  <p className='font-semibold md:text-base text-sm'>Fcookie wallet</p>
                  <p className='text-sm font-semibold'>$0.00</p>
                </div>
              </div>
              <div className='flex gap-[5px] md:gap-[10px] items-center'>
                <p className='text-[#75DA5B] text-xs'>(default wallet)</p>
                <svg width="24" height="6" viewBox="0 0 24 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="3" cy="3" r="3" fill="white" />
                  <circle cx="12" cy="3" r="3" fill="white" />
                  <circle cx="21" cy="3" r="3" fill="white" />
                </svg>
              </div>
            </div>
            <div>
                <button className='bg-[#F7F8F80F] rounded-[6px] py-[5px] px-[30px] w-full'>Link wallet</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page