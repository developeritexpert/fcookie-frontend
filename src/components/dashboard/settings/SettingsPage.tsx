import React from 'react';
import Image from 'next/image';

function SettingsPage() {
  return (
    <div className="space-y-5">
      <div className='bg-[#F7F8F80A] border border-[#F7F8F81A] rounded-[7px] sm:p-5 p-6 flex items-center gap-6'>
        <div className='relative'>
          <Image 
            src="/img/user.png" 
            alt="User" 
            width={150} 
            height={150} 
            className='w-[100px] md:w-[120px]' 
          />
          <button className='bg-[#F7F8F8] border-2 border-[#332B17] p-1 flex justify-center items-center h-[25px] w-[25px] rounded-full absolute right-1 bottom-1'>
            <Image 
              src="/icons/camera.png" 
              alt="Camera" 
              width={20} 
              height={20} 
              className='w-5' 
            />
          </button>
        </div>
        <div>
          <h2 className='text-lg md:text-xl font-semibold'>John Doe</h2>
          <p className='text-sm md:text-base'>Participate</p>
          <p className='text-sm md:text-base'>Leeds, United Kingdom</p>
        </div>
      </div>
      
      <div className='bg-[#F7F8F80A] border border-[#F7F8F81A] rounded-[7px]'>
        <div className='sm:p-5 p-6 border-b border-[#F7F8F81C] flex items-center justify-between gap-5'>
          <h3 className='font-semibold text-lg md:text-xl'>Personal Information</h3>
          <button className='flex items-center gap-2 bg-gradient-to-r from-[#75DA5B] to-[#4DCE94] rounded-[7px] text-black font-semibold px-5 py-2 text-sm'>
            <Image 
              src="/icons/edit.png" 
              alt="Edit" 
              width={12} 
              height={12} 
              className='w-3' 
            />
            Edit
          </button>
        </div>
        <div className='sm:p-5 p-6 text-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12'>
          <div className='space-y-1'>
            <p className='text-[#F7F8F8B3]'>First Name</p>
            <p className='font-semibold'>John</p>
          </div>
          <div className='space-y-1'>
            <p className='text-[#F7F8F8B3]'>Last Name</p>
            <p className='font-semibold'>Doe</p>
          </div>
          <div className='space-y-1'>
            <p className='text-[#F7F8F8B3]'>Email Address</p>
            <p className='font-semibold'>info@johndoe.com</p>
          </div>
          <div className='space-y-1'>
            <p className='text-[#F7F8F8B3]'>Phone Number</p>
            <p className='font-semibold'>(+00)987 654-3210</p>
          </div>
          <div className='space-y-1'>
            <p className='text-[#F7F8F8B3]'>User Role</p>
            <p className='font-semibold'>Participate</p>
          </div>
        </div>
      </div>
      
      <div className='flex flex-col md:flex-row gap-5 items-stretch'>
        <div className='bg-[#F7F8F80A] border border-[#F7F8F81A] rounded-[7px] basis-[50%] lg:basis-[60%]'>
          <div className='sm:p-5 p-6 border-b border-[#F7F8F81C]'>
            <h3 className='font-semibold text-lg md:text-xl'>Account Security</h3>
          </div>
          <div className='sm:p-5 p-6 text-sm'>
            <form>
              <div className='mb-4'>
                <input
                  type="password"
                  placeholder="Password"
                  className='w-full text-sm border border-[#FFFFFF1C] bg-transparent placeholder:text-[#F7F8F8] rounded-[7px] py-4 px-4 focus-visible:outline-0 focus-visible:border focus-visible:border-[#ffffff80] duration-300'
                />
              </div>
              <div className='mb-4'>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className='w-full text-sm border border-[#FFFFFF1C] bg-transparent placeholder:text-[#F7F8F8] rounded-[7px] py-4 px-4 focus-visible:outline-0 focus-visible:border focus-visible:border-[#ffffff80] duration-300'
                />
              </div>
              <button 
                type='submit' 
                className='bg-gradient-to-b from-[#75DA5B] to-[#4DCE94] w-full cursor-pointer py-4 text-black mb-3 font-semibold px-8 rounded-[7px]'
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
        
        <div className='bg-[#F7F8F80A] border border-[#F7F8F81A] rounded-[7px] basis-[50%] lg:basis-[40%]'>
          <div className='sm:p-5 p-6 border-b border-[#F7F8F81C]'>
            <h3 className='font-semibold text-lg md:text-xl'>Wallets</h3>
          </div>
          <div className='sm:p-5 p-6 flex flex-col justify-between gap-8'>
            <div className='flex gap-4 md:gap-8 items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div className='border border-[#343434] bg-[#0D0D0D] rounded-full p-3 flex justify-center items-center'>
                  <Image 
                    src="/icons/cookie.png" 
                    alt="Cookie" 
                    width={20} 
                    height={20} 
                    className='w-5' 
                  />
                </div>
                <div>
                  <p className='font-semibold md:text-base text-sm'>Fcookie wallet</p>
                  <p className='text-sm font-semibold'>$0.00</p>
                </div>
              </div>
              <div className='flex gap-2 md:gap-3 items-center'>
                <p className='text-[#75DA5B] text-xs'>(default wallet)</p>
                <svg width="24" height="6" viewBox="0 0 24 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="3" cy="3" r="3" fill="white" />
                  <circle cx="12" cy="3" r="3" fill="white" />
                  <circle cx="21" cy="3" r="3" fill="white" />
                </svg>
              </div>
            </div>
            <div>
              <button className='bg-[#F7F8F80F] rounded-[6px] py-2 px-8 w-full'>
                Link wallet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;