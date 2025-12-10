// src/components/skeleton-loading/PageSkeletons.tsx
import { Skeleton } from "./Skeleton";

// 1. Settings Page Skeleton
export function SettingsPageSkeleton() {
  return (
    <div className="space-y-5">
      {/* Profile Skeleton */}
      <div className='bg-[#F7F8F80A] border border-[#F7F8F81A] rounded-[7px] sm:p-5 p-6 flex items-center gap-6'>
        <div className='relative'>
          <Skeleton variant="circle" className="w-[100px] md:w-[120px] h-[100px] md:h-[120px]" />
          <Skeleton variant="circle" className="h-[25px] w-[25px] absolute right-1 bottom-1" />
        </div>
        <div className="space-y-3 flex-1">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      </div>
      
      {/* Personal Information Skeleton */}
      <div className='bg-[#F7F8F80A] border border-[#F7F8F81A] rounded-[7px]'>
        <div className='sm:p-5 p-6 border-b border-[#F7F8F81C] flex items-center justify-between'>
          <Skeleton className="h-7 w-1/3" />
          <Skeleton className="h-9 w-24" />
        </div>
        <div className='sm:p-5 p-6 text-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12'>
          {[...Array(5)].map((_, i) => (
            <div key={i} className='space-y-2'>
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-8 w-full" />
            </div>
          ))}
        </div>
      </div>
      
      {/* Account Security & Wallets Skeleton */}
      <div className='flex flex-col md:flex-row gap-5 items-stretch'>
        <div className='bg-[#F7F8F80A] border border-[#F7F8F81A] rounded-[7px] basis-[50%] lg:basis-[60%]'>
          <div className='sm:p-5 p-6 border-b border-[#F7F8F81C]'>
            <Skeleton className="h-7 w-1/2" />
          </div>
          <div className='sm:p-5 p-6 space-y-4'>
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton variant="button" className="h-12 w-full" />
          </div>
        </div>
        
        <div className='bg-[#F7F8F80A] border border-[#F7F8F81A] rounded-[7px] basis-[50%] lg:basis-[40%]'>
          <div className='sm:p-5 p-6 border-b border-[#F7F8F81C]'>
            <Skeleton className="h-7 w-1/4" />
          </div>
          <div className='sm:p-5 p-6 space-y-6'>
            <div className='flex gap-4 items-center justify-between'>
              <div className='flex items-center gap-3'>
                <Skeleton variant="circle" className="w-14 h-14" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
              <div className='flex gap-2 items-center'>
                <Skeleton className="h-3 w-20" />
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} variant="circle" className="w-1.5 h-1.5" />
                  ))}
                </div>
              </div>
            </div>
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. Dashboard Page Skeleton
export function DashboardPageSkeleton() {
  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-[10px] sm:gap-[20px] mb-[25px]">
        <Skeleton className="h-10 w-32" />
        <div className="relative min-w-[250px]">
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
      
      <div className='flex md:flex-row flex-col gap-[25px] items-stretch'>
        {[...Array(3)].map((_, i) => (
          <div key={i} className='border-[#F7F8F81C] border bg-[#F7F8F805] rounded-[7px] p-[20px] lg:p-[30px] flex items-center lg:flex-row md:flex-col flex-row gap-[20px] justify-between basis-[33%]'>
            <div className='flex flex-col lg:items-start md:items-center items-start'>
              <Skeleton className="h-12 w-48 mb-3" />
              <Skeleton className="h-8 w-24" />
            </div>
            <Skeleton variant="circle" className="w-16 h-16" />
          </div>
        ))}
      </div>
      
      <div className="mt-[20px]">
        <div className="bg-[#F7F8F80A] border border-[#F7F8F81A] rounded-[7px] p-5">
          <Skeleton className="h-8 w-48 mb-4" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    </div>
  );
}

// 3. Orders Page Skeleton
export function OrdersPageSkeleton() {
  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-[10px] sm:gap-[20px] mb-[25px]">
        <Skeleton className="h-10 w-32" />
        <div className="relative min-w-[250px]">
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
      
      <div className='w-full overflow-hidden rounded-[7px]'>
        {/* Table Header */}
        <div className='bg-[#fff] h-14 grid grid-cols-6 gap-4 p-4 rounded-t-[7px]'>
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-6" />
          ))}
        </div>
        
        {/* Table Rows */}
        {[...Array(8)].map((_, rowIndex) => (
          <div key={rowIndex} className='h-16 bg-[#F7F8F81C] grid grid-cols-6 gap-4 p-4 border-t border-[#F7F8F81C]'>
            {[...Array(6)].map((_, colIndex) => (
              <Skeleton key={colIndex} className="h-4" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// 4. Spin Rewards Page Skeleton
export function SpinRewardsPageSkeleton() {
  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-[10px] sm:gap-[20px] mb-[25px]">
        <Skeleton className="h-10 w-32" />
        <div className="flex flex-col-reverse md:flex-row md:items-center gap-[20px] items-stretch">
          <Skeleton className="h-10 w-32" />
          <div className="relative min-w-[250px]">
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
      
      <div className="flex justify-center">
        <Skeleton variant="circle" className="w-64 h-64" />
      </div>
      
      <div className='w-full overflow-hidden rounded-[7px]'>
        {/* Table Header */}
        <div className='bg-[#fff] h-14 grid grid-cols-4 gap-4 p-4 rounded-t-[7px]'>
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-6" />
          ))}
        </div>
        
        {/* Table Rows */}
        {[...Array(5)].map((_, rowIndex) => (
          <div key={rowIndex} className='h-16 bg-[#F7F8F81C] grid grid-cols-4 gap-4 p-4 border-t border-[#F7F8F81C]'>
            {[...Array(4)].map((_, colIndex) => (
              <Skeleton key={colIndex} className="h-4" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// 5. Products Page Skeleton
export function ProductsPageSkeleton() {
  return (
    <div className="space-y-5">
      {/* Search and Add Product Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-[10px] sm:gap-[20px] mb-[25px]">
        <div className="relative min-w-[250px] flex-1">
          <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton variant="button" className="h-10 w-32" />
      </div>
      
      {/* Products Table Skeleton */}
      <div className='w-full overflow-hidden rounded-[7px]'>
        {/* Table Header */}
        <div className='bg-[#fff] h-14 grid grid-cols-6 gap-4 p-4 rounded-t-[7px]'>
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-6" />
          ))}
        </div>
        
        {/* Table Rows with product images */}
        {[...Array(8)].map((_, rowIndex) => (
          <div key={rowIndex} className='h-20 bg-[#F7F8F81C] grid grid-cols-6 gap-4 p-4 border-t border-[#F7F8F81C]'>
            {/* Product Name with image */}
            <div className="flex items-center gap-3 col-span-2">
              <Skeleton className="w-12 h-12" />
              <Skeleton className="h-4 flex-1" />
            </div>
            
            {/* Other columns */}
            {[...Array(5)].map((_, colIndex) => (
              <Skeleton key={colIndex} className="h-4" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// 6. Product Edit Page Skeleton
export function ProductEditPageSkeleton() {
  return (
    <div className="space-y-5">
      {/* Main Product Image Section */}
      <div className="border border-[#F7F8F81A] bg-[#F7F8F80A] rounded-[7px] p-5 flex gap-4 items-center">
        <Skeleton className="w-16 h-16" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      </div>

      {/* File Upload Section */}
      <div className="border border-[#F7F8F81C] rounded-[7px] p-5 bg-[#F7F8F80A]">
        <Skeleton className="h-7 w-32 mb-4" />
        <div className="flex flex-col items-center justify-center gap-4 border border-dashed border-[#F7F8F81C] rounded-[7px] p-8 bg-[#F7F8F80A]">
          <Skeleton className="h-8 w-32" />
          <Skeleton variant="circle" className="w-10 h-10" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>

      {/* Basic Information Form */}
      <div className="border border-[#F7F8F81A] p-5 rounded-[7px] bg-[#F7F8F80A]">
        <Skeleton className="h-7 w-40 mb-6" />
        
        <div className="space-y-6">
          {/* Product Title and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>

          {/* Base Price and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>

          {/* Visibility and Owned By */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>

          {/* Description */}
          <Skeleton className="h-40 w-full" />

          {/* Action Buttons */}
          <div className="flex items-center flex-wrap justify-between gap-4 pt-4">
            <div className="flex items-center gap-4">
              <Skeleton variant="button" className="h-12 w-32" />
              <Skeleton className="h-12 w-24" />
            </div>
            <Skeleton variant="button" className="h-12 w-32" />
          </div>
        </div>
      </div>
    </div>
  );
}

// 7. Reward Edit Page Skeleton
export function RewardEditPageSkeleton() {
  return (
    <div className="border border-[#F7F8F81A] bg-[#F7F8F80A] rounded-[7px] p-5 space-y-8">
      {/* Header */}
      <div>
        <Skeleton className="h-9 w-48 mb-6" />
        
        <div className="space-y-6">
          {/* Reward Name and Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>

          {/* Value and Probability */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>

          {/* Expiry and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>

      {/* Reward Icon/Image Section */}
      <div>
        <Skeleton className="h-7 w-48 mb-4" />
        <div className="flex flex-col items-center justify-center gap-4 border border-dashed border-[#F7F8F81C] rounded-[7px] p-8 bg-[#F7F8F80A]">
          <Skeleton className="h-8 w-32" />
          <Skeleton variant="circle" className="w-10 h-10" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>

      {/* Description */}
      <Skeleton className="h-40 w-full" />

      {/* Action Buttons */}
      <div className="flex items-center flex-wrap justify-between gap-4 pt-4">
        <div className="flex items-center gap-4">
          <Skeleton variant="button" className="h-12 w-32" />
          <Skeleton className="h-12 w-24" />
        </div>
        <Skeleton variant="button" className="h-12 w-32" />
      </div>
    </div>
  );
}

// 8. Rewards Page Skeleton
export function RewardsPageSkeleton() {
  return (
    <div className="space-y-5">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-[#F7F8F80A] border border-[#F7F8F81C] rounded-[7px] p-5">
            <div className="flex items-center justify-between">
              <div className="space-y-3 flex-1">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-9 w-24" />
              </div>
              <Skeleton variant="circle" className="w-12 h-12" />
            </div>
          </div>
        ))}
      </div>

      {/* Rewards Table */}
      <div className='w-full overflow-hidden rounded-[7px]'>
        {/* Table Header */}
        <div className='bg-[#fff] h-14 grid grid-cols-7 gap-4 p-4 rounded-t-[7px]'>
          {[...Array(7)].map((_, i) => (
            <Skeleton key={i} className="h-6" />
          ))}
        </div>
        
        {/* Table Rows */}
        {[...Array(6)].map((_, rowIndex) => (
          <div key={rowIndex} className='h-16 bg-[#F7F8F81C] grid grid-cols-7 gap-4 p-4 border-t border-[#F7F8F81C]'>
            {[...Array(7)].map((_, colIndex) => (
              <Skeleton key={colIndex} className="h-4" />
            ))}
          </div>
        ))}
      </div>

      {/* Add Reward Button */}
      <div className="pt-4">
        <Skeleton variant="button" className="h-10 w-32" />
      </div>
    </div>
  );
}

// Categories Page Skeleton
export function CategoriesPageSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Header */}
      <div className="mb-[25px]">
        <div className="h-8 bg-[#F7F8F81C] rounded w-48 mb-2"></div>
        <div className="h-4 bg-[#F7F8F81C] rounded w-64"></div>
      </div>

      {/* Search and Add */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-[10px] sm:gap-[20px] mb-[25px]">
        <div className="flex gap-[10px]">
          <div className="h-10 bg-[#F7F8F81C] rounded-[7px] w-[250px]"></div>
          <div className="h-10 bg-[#F7F8F81C] rounded-[7px] w-[120px]"></div>
        </div>
        <div className="h-10 bg-[#F7F8F81C] rounded-[7px] w-[140px]"></div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto rounded-[7px]">
        <div className="h-14 bg-[#F7F8F82A] rounded-t-[7px] mb-1"></div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-[#F7F8F81C] mb-1"></div>
        ))}
      </div>
    </div>
  );
}

// Category Edit Page Skeleton
export function CategoryEditPageSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-10 w-10 bg-[#F7F8F81C] rounded-[7px]"></div>
          <div>
            <div className="h-8 bg-[#F7F8F81C] rounded w-48 mb-2"></div>
            <div className="h-4 bg-[#F7F8F81C] rounded w-64"></div>
          </div>
        </div>
      </div>

      {/* Preview Card */}
      <div className="border border-[#F7F8F81A] bg-[#F7F8F80A] rounded-[7px] p-[20px] flex gap-[20px] items-center mb-8">
        <div className="h-20 w-20 bg-[#F7F8F81C] rounded-[7px]"></div>
        <div>
          <div className="h-6 bg-[#F7F8F81C] rounded w-48 mb-2"></div>
          <div className="h-4 bg-[#F7F8F81C] rounded w-32"></div>
        </div>
      </div>

      {/* Form */}
      <div className="border border-[#F7F8F81A] p-[20px] rounded-[7px] bg-[#F7F8F80A]">
        <div className="h-6 bg-[#F7F8F81C] rounded w-48 mb-6"></div>
        <div className="space-y-6">
          <div className="h-12 bg-[#F7F8F81C] rounded-[7px]"></div>
          <div className="h-12 bg-[#F7F8F81C] rounded-[7px]"></div>
          <div className="flex gap-4">
            <div className="h-12 bg-[#F7F8F81C] rounded-[7px] w-32"></div>
            <div className="h-12 bg-[#F7F8F81C] rounded-[7px] w-32"></div>
          </div>
          <div className="h-32 bg-[#F7F8F81C] rounded-[7px]"></div>
          <div className="flex gap-4">
            <div className="h-12 bg-[#F7F8F81C] rounded-[7px] w-40"></div>
            <div className="h-12 bg-[#F7F8F81C] rounded-[7px] w-24"></div>
          </div>
        </div>
      </div>
    </div>
  );
}