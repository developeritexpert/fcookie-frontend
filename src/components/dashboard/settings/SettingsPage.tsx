"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import CustomDropdown from '@/components/layout/DashboardCustomDropdown';

interface Option {
  value: string;
  label: string;
}

function SettingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "info@johndoe.com",
    phone: "(+00)987 654-3210",
    role: "participate",
    location: "Leeds, United Kingdom"
  });

  const [formData, setFormData] = useState({ ...userData });

  const roleOptions: Option[] = [
    { value: "participate", label: "Participate" },
    { value: "admin", label: "Admin" },
    { value: "organizer", label: "Organizer" },
    { value: "moderator", label: "Moderator" },
    { value: "viewer", label: "Viewer" }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
    setFormData({ ...userData });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({ ...userData });
  };

  const handleSave = () => {
    setUserData({ ...formData });
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoleChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      role: value
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Skeleton Loading Component
  const SkeletonLoader = () => (
    <div className="space-y-5 animate-pulse">
      {/* Profile Skeleton */}
      <div className='bg-[#F7F8F80A] border border-[#F7F8F81A] rounded-[7px] sm:p-5 p-6 flex items-center gap-6'>
        <div className='relative'>
          <div className='w-[100px] md:w-[120px] h-[100px] md:h-[120px] bg-[#F7F8F81A] rounded-full'></div>
          <div className='bg-[#F7F8F82A] p-1 h-[25px] w-[25px] rounded-full absolute right-1 bottom-1'></div>
        </div>
        <div className="space-y-3 flex-1">
          <div className="h-6 bg-[#F7F8F81A] rounded w-1/2"></div>
          <div className="h-4 bg-[#F7F8F81A] rounded w-1/4"></div>
          <div className="h-4 bg-[#F7F8F81A] rounded w-1/3"></div>
        </div>
      </div>
      
      {/* Personal Information Skeleton */}
      <div className='bg-[#F7F8F80A] border border-[#F7F8F81A] rounded-[7px]'>
        <div className='sm:p-5 p-6 border-b border-[#F7F8F81C] flex items-center justify-between'>
          <div className="h-7 bg-[#F7F8F81A] rounded w-1/3"></div>
          <div className="h-9 bg-[#F7F8F81A] rounded w-24"></div>
        </div>
        <div className='sm:p-5 p-6 text-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12'>
          {[...Array(5)].map((_, i) => (
            <div key={i} className='space-y-2'>
              <div className="h-4 bg-[#F7F8F81A] rounded w-1/2"></div>
              <div className="h-8 bg-[#F7F8F81A] rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Account Security & Wallets Skeleton */}
      <div className='flex flex-col md:flex-row gap-5 items-stretch'>
        <div className='bg-[#F7F8F80A] border border-[#F7F8F81A] rounded-[7px] basis-[50%] lg:basis-[60%]'>
          <div className='sm:p-5 p-6 border-b border-[#F7F8F81C]'>
            <div className="h-7 bg-[#F7F8F81A] rounded w-1/2"></div>
          </div>
          <div className='sm:p-5 p-6 space-y-4'>
            <div className="h-12 bg-[#F7F8F81A] rounded w-full"></div>
            <div className="h-12 bg-[#F7F8F81A] rounded w-full"></div>
            <div className="h-12 bg-gradient-to-b from-[#F7F8F81A] to-[#F7F8F81C] rounded w-full"></div>
          </div>
        </div>
        
        <div className='bg-[#F7F8F80A] border border-[#F7F8F81A] rounded-[7px] basis-[50%] lg:basis-[40%]'>
          <div className='sm:p-5 p-6 border-b border-[#F7F8F81C]'>
            <div className="h-7 bg-[#F7F8F81A] rounded w-1/4"></div>
          </div>
          <div className='sm:p-5 p-6 space-y-6'>
            <div className='flex gap-4 items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div className='bg-[#F7F8F81A] rounded-full p-3'></div>
                <div className="space-y-2">
                  <div className="h-4 bg-[#F7F8F81A] rounded w-24"></div>
                  <div className="h-4 bg-[#F7F8F81A] rounded w-16"></div>
                </div>
              </div>
              <div className='flex gap-2 items-center'>
                <div className="h-3 bg-[#F7F8F81A] rounded w-20"></div>
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 bg-[#F7F8F81A] rounded-full"></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="h-10 bg-[#F7F8F81A] rounded w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return <SkeletonLoader />;
  }

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
          <h2 className='text-lg md:text-xl font-semibold'>{userData.firstName} {userData.lastName}</h2>
          <p className='text-sm md:text-base'>{roleOptions.find(opt => opt.value === userData.role)?.label}</p>
          <p className='text-sm md:text-base'>{userData.location}</p>
        </div>
      </div>
      
      <div className='bg-[#F7F8F80A] border border-[#F7F8F81A] rounded-[7px]'>
        <div className='sm:p-5 p-6 border-b border-[#F7F8F81C] flex items-center justify-between gap-5'>
          <h3 className='font-semibold text-lg md:text-xl'>Personal Information</h3>
          {!isEditing ? (
            <button 
              onClick={handleEditClick}
              className='flex items-center gap-2 bg-gradient-to-r from-[#75DA5B] to-[#4DCE94] rounded-[7px] text-black font-semibold px-5 py-2 text-sm'
            >
              <Image 
                src="/icons/edit.png" 
                alt="Edit" 
                width={12} 
                height={12} 
                className='w-3' 
              />
              Edit
            </button>
          ) : (
            <div className='flex gap-3'>
              <button 
                onClick={handleCancel}
                className='bg-[#F7F8F80F] rounded-[7px] text-white font-semibold px-5 py-2 text-sm'
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className='flex items-center gap-2 bg-gradient-to-r from-[#75DA5B] to-[#4DCE94] rounded-[7px] text-black font-semibold px-5 py-2 text-sm'
              >
                Update
              </button>
            </div>
          )}
        </div>
        <div className='sm:p-5 p-6 text-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12'>
          <div className='space-y-1'>
            <p className='text-[#F7F8F8B3]'>First Name</p>
            {isEditing ? (
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className='w-full text-sm border border-[#FFFFFF1C] bg-transparent text-white rounded-[7px] py-2 px-3 focus-visible:outline-0 focus-visible:border focus-visible:border-[#ffffff80] duration-300'
              />
            ) : (
              <p className='font-semibold text-sm border border-[#FFFFFF00] text-white rounded-[7px] py-2 '>{userData.firstName}</p>
            )}
          </div>
          <div className='space-y-1'>
            <p className='text-[#F7F8F8B3]'>Last Name</p>
            {isEditing ? (
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className='w-full text-sm border border-[#FFFFFF1C] bg-transparent text-white rounded-[7px] py-2 px-3 focus-visible:outline-0 focus-visible:border focus-visible:border-[#ffffff80] duration-300'
              />
            ) : (
              <p className='font-semibold text-sm border border-[#FFFFFF00] text-white rounded-[7px] py-2 '>{userData.lastName}</p>
            )}
          </div>
          <div className='space-y-1'>
            <p className='text-[#F7F8F8B3]'>Email Address</p>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className='w-full text-sm border border-[#FFFFFF1C] bg-transparent text-white rounded-[7px] py-2 px-3 focus-visible:outline-0 focus-visible:border focus-visible:border-[#ffffff80] duration-300'
              />
            ) : (
              <p className='font-semibold text-sm border border-[#FFFFFF00] text-white rounded-[7px] py-2 '>{userData.email}</p>
            )}
          </div>
          <div className='space-y-1'>
            <p className='text-[#F7F8F8B3]'>Phone Number</p>
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className='w-full text-sm border border-[#FFFFFF1C] bg-transparent text-white rounded-[7px] py-2 px-3 focus-visible:outline-0 focus-visible:border focus-visible:border-[#ffffff80] duration-300'
              />
            ) : (
              <p className='font-semibold text-sm border border-[#FFFFFF00] text-white rounded-[7px] py-2 '>{userData.phone}</p>
            )}
          </div>
          <div className='space-y-1'>
            <p className='text-[#F7F8F8B3]'>User Role</p>
            {isEditing ? (
              <div className="pt-1">
                <CustomDropdown
                  options={roleOptions}
                  value={formData.role}
                  onChange={handleRoleChange}
                  placeholder="Select Role"
                />
              </div>
            ) : (
              <p className='font-semibold text-sm border border-[#FFFFFF00] text-white rounded-[7px] py-2 '>{roleOptions.find(opt => opt.value === userData.role)?.label}</p>
            )}
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
              <div className='mb-4 relative'>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className='w-full text-sm border border-[#FFFFFF1C] bg-transparent placeholder:text-[#F7F8F8] rounded-[7px] py-4 px-4 pr-12 focus-visible:outline-0 focus-visible:border focus-visible:border-[#ffffff80] duration-300'
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className='absolute right-4 top-1/2 transform -translate-y-1/2 text-[#F7F8F8B3] hover:text-[#F7F8F8] transition-colors'
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z" fill="currentColor"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 7C14.76 7 17 9.24 17 12C17 12.65 16.87 13.26 16.64 13.83L19.56 16.75C21.07 15.49 22.26 13.86 22.99 12C21.26 7.61 16.99 4.5 11.99 4.5C10.59 4.5 9.25 4.75 8.01 5.2L10.17 7.36C10.74 7.13 11.35 7 12 7ZM2 4.27L4.28 6.55L4.74 7.01C3.08 8.3 1.78 10.02 1 12C2.73 16.39 7 19.5 12 19.5C13.55 19.5 15.03 19.2 16.38 18.66L16.8 19.08L19.73 22/L21 20.73L3.27 3L2 4.27ZM7.53 9.8L9.08 11.35C9.03 11.56 9 11.78 9 12C9 13.66 10.34 15 12 15C12.22 15 12.44 14.97 12.65 14.92L14.2 16.47C13.53 16.8 12.79 17 12 17C9.24 17 7 14.76 7 12C7 11.21 7.2 10.47 7.53 9.8ZM11.84 9.02L14.99 12.17L15.01 12.01C15.01 10.35 13.67 9.01 12.01 9.01L11.84 9.02Z" fill="currentColor"/>
                    </svg>
                  )}
                </button>
              </div>
              <div className='mb-4 relative'>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className='w-full text-sm border border-[#FFFFFF1C] bg-transparent placeholder:text-[#F7F8F8] rounded-[7px] py-4 px-4 pr-12 focus-visible:outline-0 focus-visible:border focus-visible:border-[#ffffff80] duration-300'
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className='absolute right-4 top-1/2 transform -translate-y-1/2 text-[#F7F8F8B3] hover:text-[#F7F8F8] transition-colors'
                >
                  {showConfirmPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z" fill="currentColor"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 7C14.76 7 17 9.24 17 12C17 12.65 16.87 13.26 16.64 13.83L19.56 16.75C21.07 15.49 22.26 13.86 22.99 12C21.26 7.61 16.99 4.5 11.99 4.5C10.59 4.5 9.25 4.75 8.01 5.2L10.17 7.36C10.74 7.13 11.35 7 12 7ZM2 4.27L4.28 6.55L4.74 7.01C3.08 8.3 1.78 10.02 1 12C2.73 16.39 7 19.5 12 19.5C13.55 19.5 15.03 19.2 16.38 18.66L16.8 19.08L19.73 22/L21 20.73L3.27 3L2 4.27ZM7.53 9.8L9.08 11.35C9.03 11.56 9 11.78 9 12C9 13.66 10.34 15 12 15C12.22 15 12.44 14.97 12.65 14.92L14.2 16.47C13.53 16.8 12.79 17 12 17C9.24 17 7 14.76 7 12C7 11.21 7.2 10.47 7.53 9.8ZM11.84 9.02L14.99 12.17L15.01 12.01C15.01 10.35 13.67 9.01 12.01 9.01L11.84 9.02Z" fill="currentColor"/>
                    </svg>
                  )}
                </button>
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
                <p className='text-[#75DA5AB] text-xs'>(default wallet)</p>
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