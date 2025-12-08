// components/skeletons/SkeletonBlocks.tsx
import { Skeleton } from "@/components/skeleton-loading/Skeleton";

// 1. Card Skeleton
export function SkeletonCard({ count = 1, className = "" }: { count?: number; className?: string }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`bg-[#F7F8F80A] border border-[#F7F8F81A] rounded-[7px] p-5 space-y-4 ${className}`}
        >
          <Skeleton className="h-40 w-full" />
          <div className="space-y-2">
            <Skeleton variant="text" className="h-5 w-3/4" />
            <Skeleton variant="text" className="h-4 w-1/2" />
            <Skeleton variant="text" className="h-4 w-1/3" />
          </div>
          <Skeleton variant="button" className="h-10 w-full" />
        </div>
      ))}
    </>
  );
}

// 2. Table Skeleton
export function SkeletonTable({
  rows = 5,
  columns = 4,
  withHeader = true,
}: {
  rows?: number;
  columns?: number;
  withHeader?: boolean;
}) {
  return (
    <div className="w-full overflow-hidden rounded-[7px]">
      {withHeader && (
        <div className="bg-white h-14 grid grid-cols-4 gap-4 p-4 rounded-t-[7px]">
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton key={`header-${i}`} className="h-6" />
          ))}
        </div>
      )}
      
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="h-16 bg-[#F7F8F81C] grid grid-cols-4 gap-4 p-4 border-t border-[#F7F8F81C] last:rounded-b-[7px]"
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton
              key={`row-${rowIndex}-col-${colIndex}`}
              className="h-4"
            />
          ))}
        </div>
      ))}
    </div>
  );
}

// 3. Input Field Skeleton
export function SkeletonInput({ count = 1, label = true }: { count?: number; label?: boolean }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-2">
          {label && <Skeleton className="h-4 w-1/2" />}
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
    </>
  );
}

// 4. Profile Card Skeleton
export function SkeletonProfile() {
  return (
    <div className="bg-[#F7F8F80A] border border-[#F7F8F81A] rounded-[7px] p-6 flex items-center gap-6">
      <div className="relative">
        <Skeleton variant="circle" className="w-24 h-24" />
        <Skeleton variant="circle" className="w-6 h-6 absolute right-0 bottom-0" />
      </div>
      <div className="space-y-3 flex-1">
        <Skeleton className="h-7 w-1/2" />
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-5 w-1/4" />
      </div>
    </div>
  );
}

// 5. Stats Card Skeleton
export function SkeletonStatsCard({ count = 3 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="border-[#F7F8F81C] border bg-[#F7F8F805] rounded-[7px] p-[20px] lg:p-[30px] flex items-center lg:flex-row md:flex-col flex-row gap-[20px] justify-between basis-[33%]"
        >
          <div className="flex flex-col lg:items-start md:items-center items-start">
            <Skeleton className="h-12 w-48 mb-3" />
            <Skeleton className="h-8 w-24" />
          </div>
          <Skeleton variant="circle" className="w-16 h-16" />
        </div>
      ))}
    </>
  );
}