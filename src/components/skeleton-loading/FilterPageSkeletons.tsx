// components/skeleton-loading/FilterPageSkeletons.tsx

export function FilterPageSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Header */}
      <div className="mb-[25px]">
        <div className="h-8 bg-[#ffffff20] rounded w-32 mb-2"></div>
        <div className="h-4 bg-[#ffffff15] rounded w-64"></div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-[10px] sm:gap-[20px] mb-[25px]">
        <div className="flex flex-col sm:flex-row gap-[10px] w-full sm:w-auto">
          <div className="h-10 bg-[#ffffff10] rounded-[7px] w-[250px]"></div>
          <div className="h-10 bg-[#ffffff10] rounded-[7px] w-[150px]"></div>
          <div className="h-10 bg-[#ffffff10] rounded-[7px] w-[150px]"></div>
        </div>
        <div className="h-10 bg-[#ffffff20] rounded-[7px] w-[160px]"></div>
      </div>

      {/* Info Banner */}
      <div className="h-20 bg-[#ffffff08] rounded-[7px] mb-[25px]"></div>

      {/* Table */}
      <div className="w-full overflow-x-auto rounded-[7px]">
        <table className="lg:w-full text-sm rounded-[7px]">
          <thead>
            <tr className="bg-[#ffffff10]">
              {Array.from({ length: 8 }).map((_, i) => (
                <th key={i} className="py-[18px] px-[15px] border border-[#F7F8F81C]">
                  <div className="h-4 bg-[#ffffff20] rounded w-20"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="bg-[#F7F8F81C]">
                {Array.from({ length: 8 }).map((_, j) => (
                  <td key={j} className="py-[20px] px-[15px] border border-[#F7F8F81C]">
                    <div className="h-4 bg-[#ffffff15] rounded w-16"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function FilterFormSkeleton() {
  return (
    <div className="min-h-screen animate-pulse">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-10 bg-[#ffffff20] rounded-[7px]"></div>
          <div>
            <div className="h-8 bg-[#ffffff20] rounded w-48 mb-2"></div>
            <div className="h-4 bg-[#ffffff15] rounded w-64"></div>
          </div>
        </div>
      </div>

      {/* Preview Card */}
      <div className="border border-[#F7F8F81A] bg-[#F7F8F80A] rounded-[7px] p-[20px] mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-[#ffffff10] rounded-[7px]"></div>
          <div>
            <div className="h-6 bg-[#ffffff20] rounded w-40 mb-2"></div>
            <div className="h-4 bg-[#ffffff15] rounded w-32"></div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="border border-[#F7F8F81A] p-[20px] rounded-[7px] bg-[#F7F8F80A]">
        <div className="h-6 bg-[#ffffff20] rounded w-48 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i}>
              <div className="h-4 bg-[#ffffff15] rounded w-24 mb-2"></div>
              <div className="h-12 bg-[#ffffff10] rounded-[7px]"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}