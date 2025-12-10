"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import axiosWrapper from "@/utils/api";
import { CATEGORY_API } from "@/utils/apiUrl";
import { Category, CategoryListResponse } from "@/types/category/category";
import { CategoriesPageSkeleton } from "@/components/skeleton-loading/PageSkeletons";
import { useAuthStore } from "@/components/store/useAuthStore";

interface Option {
  value: string;
  label: string;
}

const statusOptions: Option[] = [
  { value: "all", label: "All" },
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
];

export default function CategoryPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
    const token = useAuthStore.getState().getToken();
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
const [isDeleting, setIsDeleting] = useState<string | null>(null);
const [isSearching, setIsSearching] = useState(false);

const fetchCategories = async () => {
  try {
    setIsLoading(true);

    const params: any = {
      page: pagination.page,
      limit: pagination.limit,
      search: searchTerm || undefined,
      status: statusFilter !== "all" ? statusFilter : undefined,
    };

    const response: any = await axiosWrapper(
      "get",
      CATEGORY_API.GET_ALL_CATEGORIES,
      params,     // <-- FIX HERE
      token ?? undefined
    );

    if (response?.result === "error") {
      toast.error(response?.desc || "Failed to fetch categories");
      return;
    }

    const data = response?.data || response;
    setCategories(data?.data || []);
    setPagination((prev) => ({
      ...prev,
      total: data?.pagination?.total || 0,
      totalPages: data?.pagination?.totalPages || 0,
    }));
  } catch (error: any) {
    toast.error(error?.message || "Failed to fetch categories");
  } finally {
    setIsLoading(false);
  }
};



  useEffect(() => {
    fetchCategories();
  }, [pagination.page, pagination.limit, statusFilter]);

useEffect(() => {
  setIsSearching(true); // instant skeleton

  const delayDebounceFn = setTimeout(() => {
    if (pagination.page === 1) {
      fetchCategories().finally(() => setIsSearching(false));
    } else {
      setPagination((prev) => ({ ...prev, page: 1 }));
      setIsSearching(false);
    }
  }, 600);

  return () => clearTimeout(delayDebounceFn);
}, [searchTerm]);


  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "ACTIVE":
        return "text-[#75DA5B]";
      case "INACTIVE":
        return "text-[#FF6B6B]";
      default:
        return "text-[#F7F8F8B2]";
    }
  };

  const handleRemove = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      setIsDeleting(id);
      const response: any = await axiosWrapper(
        "delete",
        CATEGORY_API.DELETE_CATEGORY(id),
        {},
        token??undefined,
      );

      if (response?.result === "error") {
        toast.error(response?.desc || "Failed to delete category");
        return;
      }

      toast.success("Category deleted successfully");
      fetchCategories();
    } catch (error: any) {
      toast.error(error?.message || "Failed to delete category");
    } finally {
      setIsDeleting(null);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({ ...prev, page: newPage }));
    }
  };

  // Show skeleton while loading

  return (
    <div>
      {/* Header */}
      <div className="mb-[25px]">
        <h1 className="text-2xl font-bold text-white mb-2">Categories</h1>
        <p className="text-[#F7F8F8B2]">Manage your product categories</p>
      </div>

      {/* Search and Add Category */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-[10px] sm:gap-[20px] mb-[25px]">
        <div className="flex flex-col sm:flex-row gap-[10px] w-full sm:w-auto">
          {/* Search Input */}
          <div className="relative min-w-[250px]">
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] text-[#F7F8F8B2] text-sm pl-[30px] px-4 py-[10px] placeholder:text-[#F7F8F8B2] focus-visible:outline-0 focus-visible:border focus-visible:border-[#ffffff80] duration-300"
            />
            {/* Search Icon */}
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

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] text-[#F7F8F8B2] text-sm px-4 py-[10px] focus-visible:outline-0 focus-visible:border focus-visible:border-[#ffffff80] duration-300"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value} className="bg-[#1a1a1a]">
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Link
            href="/admin/categories/add"
            className="flex gap-[5px] items-center bg-gradient-to-r from-[#75DA5B] to-[#4DCE94] rounded-[7px] text-black font-semibold px-[20px] py-[10px] text-sm hover:opacity-90 transition-opacity"
          >
            {/* Plus Icon */}
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.62402 0.255859C7.91001 0.284359 8.17878 0.411199 8.38379 0.616211C8.61821 0.850631 8.75 1.16848 8.75 1.5V6.25H13.5C13.8315 6.25 14.1494 6.38179 14.3838 6.61621C14.6182 6.85063 14.75 7.16848 14.75 7.5C14.75 7.83152 14.6182 8.14937 14.3838 8.38379C14.1494 8.61821 13.8315 8.75 13.5 8.75H8.75V13.5C8.75 13.8315 8.61821 14.1494 8.38379 14.3838C8.14937 14.6182 7.83152 14.75 7.5 14.75C7.16848 14.75 6.85063 14.6182 6.61621 14.3838C6.38179 14.1494 6.25 13.8315 6.25 13.5V8.75H1.5C1.16848 8.75 0.850631 8.61821 0.616211 8.38379C0.381791 8.14937 0.25 7.83152 0.25 7.5C0.25 7.16848 0.381791 6.85063 0.616211 6.61621C0.850631 6.38179 1.16848 6.25 1.5 6.25H6.25V1.5C6.25 1.16848 6.38179 0.850631 6.61621 0.616211C6.85063 0.38179 7.16848 0.25 7.5 0.25L7.62402 0.255859Z"
                fill="black"
                stroke="black"
                strokeWidth="0.5"
              />
            </svg>
            Add Category
          </Link>
        </div>
      </div>

      {/* Category Table */}
      <div className="w-full overflow-x-auto rounded-[7px]">
        <table className="lg:w-full text-sm rounded-[7px]">
          <thead>
            <tr className="bg-[#fff] text-[#000] font-medium text-left">
              <th className="py-[18px] px-[15px] border border-[#0000001C] min-w-[200px]">
                Name
              </th>
              <th className="py-[18px] px-[15px] border border-[#0000001C] min-w-[150px]">
                Slug
              </th>
              <th className="py-[18px] px-[15px] border border-[#0000001C] min-w-[250px]">
                Description
              </th>
              <th className="py-[18px] px-[15px] border border-[#0000001C] min-w-[100px]">
                Icon
              </th>
              <th className="py-[18px] px-[15px] border border-[#0000001C] min-w-[120px]">
                Status
              </th>
              <th className="py-[18px] px-[15px] border border-[#0000001C] min-w-[180px]">
                Created At
              </th>
              <th className="py-[18px] px-[15px] border border-[#0000001C] min-w-[150px]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {/* 🔹 Show table skeleton only while loading */}
            {(isLoading || isSearching) ? (
              <>
                {Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse bg-[#F7F8F81C]">
                    <td className="py-[20px] px-[15px] border border-[#F7F8F81C]">
                      <div className="h-4 bg-[#ffffff20] rounded w-1/2"></div>
                    </td>

                    <td className="py-[20px] px-[15px] border border-[#F7F8F81C]">
                      <div className="h-4 bg-[#ffffff20] rounded w-1/3"></div>
                    </td>

                    <td className="py-[20px] px-[15px] border border-[#F7F8F81C]">
                      <div className="h-4 bg-[#ffffff20] rounded w-2/3"></div>
                    </td>

                    <td className="py-[20px] px-[15px] border border-[#F7F8F81C]">
                      <div className="h-4 bg-[#ffffff20] rounded w-1/4"></div>
                    </td>

                    <td className="py-[20px] px-[15px] border border-[#F7F8F81C]">
                      <div className="h-4 bg-[#ffffff20] rounded w-1/4"></div>
                    </td>

                    <td className="py-[20px] px-[15px] border border-[#F7F8F81C]">
                      <div className="h-4 bg-[#ffffff20] rounded w-1/4"></div>
                    </td>

                    <td className="py-[20px] px-[15px] border border-[#F7F8F81C]">
                      <div className="h-4 bg-[#ffffff20] rounded w-1/4"></div>
                    </td>
                  </tr>
                ))}
              </>
            ) : categories.length === 0 ? (
              /* 🔹 No categories found */
              <tr>
                <td
                  colSpan={7}
                  className="py-[40px] px-[15px] text-center text-[#F7F8F8B2] bg-[#F7F8F81C]"
                >
                  No categories found
                </td>
              </tr>
            ) : (
              /* 🔹 Render categories list */
              categories.map((category) => (
                <tr
                  key={category._id}
                  className="text-[#F7F8F8B2] bg-[#F7F8F81C] hover:bg-[#F7F8F82A] transition-colors"
                >
                  <td className="py-[10px] px-[15px] border border-[#F7F8F81C]">
                    <div className="flex items-center gap-3">
                      {category.icon ? (
                        <div className="border border-[#F7F8F81C] rounded-[7px] p-2 bg-[#F7F8F80A]">
                          <img
                            src={category.icon}
                            alt={category.name}
                            className="w-8 h-8 rounded-[7px] object-contain"
                          />
                        </div>
                      ) : (
                        <div className="border border-[#F7F8F81C] rounded-[7px] p-2 bg-[#F7F8F80A] w-12 h-12 flex items-center justify-center">
                          <span className="text-xs text-[#F7F8F870]">N/A</span>
                        </div>
                      )}
                      <span className="font-medium text-white">{category.name}</span>
                    </div>
                  </td>

                  <td className="py-[10px] px-[15px] border border-[#F7F8F81C]">
                    <code className="bg-[#F7F8F80A] px-2 py-1 rounded text-xs">{category.slug}</code>
                  </td>

                  <td className="py-[10px] px-[15px] border border-[#F7F8F81C]">
                    <span className="line-clamp-2">{category.description || "-"}</span>
                  </td>

                  <td className="py-[10px] px-[15px] border border-[#F7F8F81C]">
                    {category.icon ? (
                      <a
                        href={category.icon}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#4DCE94] hover:underline text-xs"
                      >
                        View Icon
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="py-[10px] px-[15px] border border-[#F7F8F81C]">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        category.status
                      )}`}
                    >
                      {category.status}
                    </span>
                  </td>

                  <td className="py-[10px] px-[15px] border border-[#F7F8F81C]">
                    {new Date(category.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>

                  <td className="py-[10px] px-[15px] border border-[#F7F8F81C]">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/categories/edit/${category._id}`}
                        className="border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] py-[6px] px-[15px] text-xs whitespace-nowrap hover:bg-[#F7F8F815] transition-colors cursor-pointer"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleRemove(category._id)}
                        disabled={isDeleting === category._id}
                        className="border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] py-[6px] px-[15px] text-xs whitespace-nowrap hover:bg-[#FF6B6B25] hover:border-[#FF6B6B] hover:text-[#FF6B6B] transition-colors cursor-pointer disabled:opacity-50"
                      >
                        {isDeleting === category._id ? "Removing..." : "Remove"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-[#F7F8F8B2]">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
            {pagination.total} categories
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] py-[8px] px-[15px] text-sm hover:bg-[#F7F8F815] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
              .filter((page) => {
                return (
                  page === 1 ||
                  page === pagination.totalPages ||
                  Math.abs(page - pagination.page) <= 1
                );
              })
              .map((page, index, array) => (
                <div key={page} className="flex items-center">
                  {index > 0 && array[index - 1] !== page - 1 && (
                    <span className="px-2 text-[#F7F8F8B2]">...</span>
                  )}
                  <button
                    onClick={() => handlePageChange(page)}
                    className={`border rounded-[7px] py-[8px] px-[12px] text-sm transition-colors ${
                      pagination.page === page
                        ? "bg-gradient-to-r from-[#75DA5B] to-[#4DCE94] text-black border-transparent"
                        : "border-[#F7F8F81C] bg-[#F7F8F80A] hover:bg-[#F7F8F815]"
                    }`}
                  >
                    {page}
                  </button>
                </div>
              ))}
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
              className="border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] py-[8px] px-[15px] text-sm hover:bg-[#F7F8F815] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}