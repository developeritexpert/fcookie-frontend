// components/admin-dashboard/assets/AssetPage.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import axiosWrapper from "@/utils/api";
import { ASSET_API, CATEGORY_API } from "@/utils/apiUrl";
import { Asset, AssetListResponse } from "@/types/asset/asset";
import { Category } from "@/types/category/category";
import { useAuthStore } from "@/components/store/useAuthStore";

interface Option {
  value: string;
  label: string;
}

const statusOptions: Option[] = [
  { value: "all", label: "All Status" },
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
  { value: "ARCHIVED", label: "Archied" },
];

const visibilityOptions: Option[] = [
  { value: "all", label: "All Visibility" },
  { value: "PUBLIC", label: "Public" },
  { value: "PRIVATE", label: "Private" },
  { value: "DRAFT", label: "Draft" },
];

const sortOptions: Option[] = [
  { value: "createdAt", label: "Date Created" },
  { value: "name", label: "Name" },
  { value: "price", label: "Price" },
  { value: "views_count", label: "Views" },
];

export default function AssetPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [visibilityFilter, setVisibilityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const token = useAuthStore.getState().getToken();
  
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const fetchCategories = async () => {
    try {
      const response: any = await axiosWrapper(
        "get",
        CATEGORY_API.GET_ALL_CATEGORIES,
        { limit: 100 },
        token ?? undefined
      );
      const data = response?.data || response;
      setCategories(data?.data || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const fetchAssets = async () => {
    try {
      setIsLoading(true);

      const params: any = {
        page: pagination.page,
        limit: pagination.limit,
        search: searchTerm || undefined,
        status: statusFilter !== "all" ? statusFilter : undefined,
        visibility: visibilityFilter !== "all" ? visibilityFilter : undefined,
        categoryId: categoryFilter || undefined,
        sortBy: sortBy,
        order: sortOrder,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
      };

      const response: any = await axiosWrapper(
        "get",
        ASSET_API.GET_ALL_ASSETS,
        params,
        token ?? undefined
      );

      if (response?.result === "error") {
        toast.error(response?.desc || "Failed to fetch assets");
        return;
      }

      const data = response?.data || response;
      setAssets(data?.data || []);
      setPagination((prev) => ({
        ...prev,
        total: data?.pagination?.total || 0,
        totalPages: data?.pagination?.totalPages || 0,
      }));
    } catch (error: any) {
      toast.error(error?.message || "Failed to fetch assets");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setIsLoading(true); 
    fetchAssets();
  }, [pagination.page, pagination.limit, statusFilter, visibilityFilter, categoryFilter, sortBy, sortOrder, minPrice, maxPrice]);

  useEffect(() => {
    setIsSearching(true);

    const delayDebounceFn = setTimeout(() => {
      if (pagination.page === 1) {
        fetchAssets().finally(() => setIsSearching(false));
      } else {
        setPagination((prev) => ({ ...prev, page: 1 }));
        setIsSearching(false);
      }
    }, 600);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

const getStatusColor = (status: string | undefined | null) => {
  const value = (status ?? "").toUpperCase(); // prevent undefined error

  switch (value) {
    case "ACTIVE":
      return "text-[#75DA5B] bg-[#75DA5B20]";
    case "INACTIVE":
      return "text-[#FF6B6B] bg-[#FF6B6B20]";
    case "ARCHIVED":
      return "text-[#FFB547] bg-[#FFB54720]";
    default:
      return "text-[#F7F8F8B2] bg-[#F7F8F820]";
  }
};

const getVisibilityColor = (visibility: string | undefined | null) => {
  const value = (visibility ?? "").toUpperCase(); // prevent undefined error

  switch (value) {
    case "PUBLIC":
      return "text-[#4DCE94] bg-[#4DCE9420]";
    case "PRIVATE":
      return "text-[#FF9F43] bg-[#FF9F4320]";
    case "DRAFT":
      return "text-[#A78BFA] bg-[#A78BFA20]";
    default:
      return "text-[#F7F8F8B2] bg-[#F7F8F820]";
  }
};

  const formatPrice = (price: number, currency: string) => {
    const symbols: Record<string, string> = {
      USD: "$",
      EUR: "€",
      GBP: "£",
    };
    return `${symbols[currency] || "$"}${price.toLocaleString()}`;
  };

  const handleRemove = async (id: string) => {
    if (!confirm("Are you sure you want to delete this asset?")) return;

    try {
      setIsDeleting(id);
      const response: any = await axiosWrapper(
        "delete",
        ASSET_API.DELETE_ASSET(id),
        {},
        token ?? undefined
      );

      if (response?.result === "error") {
        toast.error(response?.desc || "Failed to delete asset");
        return;
      }

      toast.success("Asset deleted successfully");
      fetchAssets();
    } catch (error: any) {
      toast.error(error?.message || "Failed to delete asset");
    } finally {
      setIsDeleting(null);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({ ...prev, page: newPage }));
    }
  };

  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setVisibilityFilter("all");
    setCategoryFilter("");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("createdAt");
    setSortOrder("desc");
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-[25px]">
        <h1 className="text-2xl font-bold text-white mb-2">Assets</h1>
        <p className="text-[#F7F8F8B2]">Manage your product assets and cards</p>
      </div>

      {/* Search and Actions */}
      <div className="flex flex-col gap-[15px] mb-[25px]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-[10px] sm:gap-[20px]">
          <div className="flex flex-col sm:flex-row gap-[10px] w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative min-w-[250px]">
              <input
                type="text"
                placeholder="Search assets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] text-[#F7F8F8B2] text-sm pl-[30px] px-4 py-[10px] placeholder:text-[#F7F8F8B2] focus-visible:outline-0 focus-visible:border focus-visible:border-[#ffffff80] duration-300"
              />
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

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] text-[#F7F8F8B2] text-sm px-4 py-[10px] focus-visible:outline-0 focus-visible:border focus-visible:border-[#ffffff80] duration-300"
            >
              <option value="" className="bg-[#1a1a1a]">All Categories</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id} className="bg-[#1a1a1a]">
                  {cat.name}
                </option>
              ))}
            </select>

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

            {/* Toggle Filters Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`border rounded-[7px] px-4 py-[10px] text-sm transition-colors ${
                showFilters
                  ? "border-[#4DCE94] bg-[#4DCE9420] text-[#4DCE94]"
                  : "border-[#F7F8F81C] bg-[#F7F8F80A] text-[#F7F8F8B2] hover:bg-[#F7F8F815]"
              }`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="inline mr-2"
              >
                <path
                  d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Filters
            </button>
          </div>

          <div className="flex gap-[10px]">
            {/* Reset Filters */}
            <button
              onClick={resetFilters}
              className="border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] text-[#F7F8F8B2] text-sm px-4 py-[10px] hover:bg-[#F7F8F815] transition-colors"
            >
              Reset
            </button>

            {/* Add Asset */}
            <Link
              href="/admin/assets/add"
              className="flex gap-[5px] items-center bg-gradient-to-r from-[#75DA5B] to-[#4DCE94] rounded-[7px] text-black font-semibold px-[20px] py-[10px] text-sm hover:opacity-90 transition-opacity"
            >
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
              Add Asset
            </Link>
          </div>
        </div>

        {/* Extended Filters */}
        {showFilters && (
          <div className="border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] p-[15px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[15px]">
              {/* Visibility Filter */}
              <div>
                <label className="block text-xs text-[#F7F8F8B2] mb-2">Visibility</label>
                <select
                  value={visibilityFilter}
                  onChange={(e) => setVisibilityFilter(e.target.value)}
                  className="w-full border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] text-[#F7F8F8B2] text-sm px-4 py-[10px] focus-visible:outline-0"
                >
                  {visibilityOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-[#1a1a1a]">
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-xs text-[#F7F8F8B2] mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] text-[#F7F8F8B2] text-sm px-4 py-[10px] focus-visible:outline-0"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-[#1a1a1a]">
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-xs text-[#F7F8F8B2] mb-2">Min Price</label>
                <input
                  type="number"
                  placeholder="0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] text-[#F7F8F8B2] text-sm px-4 py-[10px] focus-visible:outline-0"
                />
              </div>

              <div>
                <label className="block text-xs text-[#F7F8F8B2] mb-2">Max Price</label>
                <input
                  type="number"
                  placeholder="10000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] text-[#F7F8F8B2] text-sm px-4 py-[10px] focus-visible:outline-0"
                />
              </div>

              {/* Sort Order */}
              <div>
                <label className="block text-xs text-[#F7F8F8B2] mb-2">Order</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSortOrder("desc")}
                    className={`flex-1 border rounded-[7px] py-[10px] px-4 text-sm transition-colors ${
                      sortOrder === "desc"
                        ? "border-[#4DCE94] bg-[#4DCE9420] text-[#4DCE94]"
                        : "border-[#F7F8F81C] bg-[#F7F8F80A] text-[#F7F8F8B2]"
                    }`}
                  >
                    Descending
                  </button>
                  <button
                    onClick={() => setSortOrder("asc")}
                    className={`flex-1 border rounded-[7px] py-[10px] px-4 text-sm transition-colors ${
                      sortOrder === "asc"
                        ? "border-[#4DCE94] bg-[#4DCE9420] text-[#4DCE94]"
                        : "border-[#F7F8F81C] bg-[#F7F8F80A] text-[#F7F8F8B2]"
                    }`}
                  >
                    Ascending
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-[15px] mb-[25px]">
        <div className="border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] p-[15px]">
          <p className="text-xs text-[#F7F8F8B2] mb-1">Total Assets</p>
          <p className="text-xl font-bold text-white">{pagination.total}</p>
        </div>
        <div className="border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] p-[15px]">
          <p className="text-xs text-[#F7F8F8B2] mb-1">Active</p>
          <p className="text-xl font-bold text-[#75DA5B]">
            {assets.filter(a => a.status === 'ACTIVE').length}
          </p>
        </div>
        <div className="border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] p-[15px]">
          <p className="text-xs text-[#F7F8F8B2] mb-1">Inactive</p>
          <p className="text-xl font-bold text-[#75DA5B]">
            {assets.filter(a => a.status === 'INACTIVE').length}
          </p>
        </div>
        <div className="border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] p-[15px]">
          <p className="text-xs text-[#F7F8F8B2] mb-1">Archived</p>
          <p className="text-xl font-bold text-[#FFB547]">
            {assets.filter(a => a.status === 'ARCHIVED').length}
          </p>
        </div>
      
      </div>

      {/* Asset Table */}
      <div className="w-full overflow-x-auto rounded-[7px]">
        <table className="lg:w-full text-sm rounded-[7px]">
          <thead>
            <tr className="bg-[#fff] text-[#000] font-medium text-left">
              <th className="py-[18px] px-[15px] border border-[#0000001C] min-w-[280px]">
                Asset
              </th>
              <th className="py-[18px] px-[15px] border border-[#0000001C] min-w-[120px]">
                Category
              </th>
              <th className="py-[18px] px-[15px] border border-[#0000001C] min-w-[100px]">
                Price
              </th>
              <th className="py-[18px] px-[15px] border border-[#0000001C] min-w-[80px]">
                Qty
              </th>
              <th className="py-[18px] px-[15px] border border-[#0000001C] min-w-[100px]">
                Status
              </th>
              <th className="py-[18px] px-[15px] border border-[#0000001C] min-w-[100px]">
                Visibility
              </th>
              <th className="py-[18px] px-[15px] border border-[#0000001C] min-w-[120px]">
                Stats
              </th>
              <th className="py-[18px] px-[15px] border border-[#0000001C] min-w-[120px]">
                Created
              </th>
              <th className="py-[18px] px-[15px] border border-[#0000001C] min-w-[150px]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading || isSearching ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="animate-pulse bg-[#F7F8F81C]">
                  {Array.from({ length: 9 }).map((_, j) => (
                    <td key={j} className="py-[20px] px-[15px] border border-[#F7F8F81C]">
                      <div className="h-4 bg-[#ffffff20] rounded w-3/4"></div>
                    </td>
                  ))}
                </tr>
              ))
            ) : assets.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="py-[40px] px-[15px] text-center text-[#F7F8F8B2] bg-[#F7F8F81C]"
                >
                  No assets found
                </td>
              </tr>
            ) : (
              assets.map((asset) => (
                <tr
                  key={asset._id}
                  className="text-[#F7F8F8B2] bg-[#F7F8F81C] hover:bg-[#F7F8F82A] transition-colors"
                >
                  {/* Asset Info */}
                  <td className="py-[10px] px-[15px] border border-[#F7F8F81C]">
                    <div className="flex items-center gap-3">
                      {asset.thumbnail_url || asset.images?.[0] ? (
                        <div className="border border-[#F7F8F81C] rounded-[7px] p-1 bg-[#F7F8F80A]">
                          <img
                            src={asset.thumbnail_url || asset.images[0]}
                            alt={asset.name}
                            className="w-12 h-12 rounded-[5px] object-cover"
                          />
                        </div>
                      ) : (
                        <div className="border border-[#F7F8F81C] rounded-[7px] p-1 bg-[#F7F8F80A] w-14 h-14 flex items-center justify-center">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19Z" fill="#F7F8F870"/>
                            <path d="M14.14 11.86L11.14 15.73L9 13.14L6 17H18L14.14 11.86Z" fill="#F7F8F870"/>
                          </svg>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-white truncate max-w-[180px]">
                          {asset.name}
                        </p>
                        <code className="text-xs text-[#F7F8F870] bg-[#F7F8F80A] px-1 rounded">
                          {asset.slug}
                        </code>
                        {asset.grading?.grade && (
                          <span className="ml-2 text-xs text-[#4DCE94] bg-[#4DCE9420] px-2 py-0.5 rounded">
                            {asset.grading.grader} {asset.grading.grade}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-[10px] px-[15px] border border-[#F7F8F81C]">
                    {typeof asset.categoryId === 'object' 
                      ? asset.categoryId.name 
                      : categories.find(c => c._id === asset.categoryId)?.name || '-'}
                  </td>

                    {/* Price */}
                    <td className="py-[10px] px-[15px] border border-[#F7F8F81C]">
                    <div>
                        {/* Listing Price (Discounted Price) */}
                        <p className="font-semibold text-white">
                        {formatPrice(asset.listing_price || asset.price, asset.currency)}
                        </p>

                        {/* Original Price (Show only if discounted) */}
                        {asset.listing_price && asset.listing_price < asset.price && (
                        <p className="text-xs text-[#F7F8F870] line-through">
                            {formatPrice(asset.price, asset.currency)}
                        </p>
                        )}
                    </div>
                    </td>


                  {/* Quantity */}
                  <td className="py-[10px] px-[15px] border border-[#F7F8F81C]">
                    <span className={asset.quantity === 0 ? "text-[#FF6B6B]" : ""}>
                      {asset.quantity}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-[10px] px-[15px] border border-[#F7F8F81C]">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(asset.status)}`}>
                      {asset.status}
                    </span>
                  </td>

                  {/* Visibility */}
                  <td className="py-[10px] px-[15px] border border-[#F7F8F81C]">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getVisibilityColor(asset.visibility)}`}>
                      {asset.visibility}
                    </span>
                  </td>

                  {/* Stats */}
                  <td className="py-[10px] px-[15px] border border-[#F7F8F81C]">
                    <div className="flex items-center gap-3 text-xs">
                      <span title="Views" className="flex items-center gap-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                          <path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12Z" stroke="#F7F8F870" strokeWidth="2"/>
                          <circle cx="12" cy="12" r="3" stroke="#F7F8F870" strokeWidth="2"/>
                        </svg>
                        {asset.views_count}
                      </span>
                      <span title="Likes" className="flex items-center gap-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke="#FF6B6B" strokeWidth="2"/>
                        </svg>
                        {asset.likes_count}
                      </span>
                      <span title="Offers" className="flex items-center gap-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="#4DCE94" strokeWidth="2"/>
                        </svg>
                        {asset.offer_count}
                      </span>
                    </div>
                  </td>

                  {/* Created */}
                  <td className="py-[10px] px-[15px] border border-[#F7F8F81C]">
                    {new Date(asset.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>

                  {/* Actions */}
                  <td className="py-[10px] px-[15px] border border-[#F7F8F81C]">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/assets/${asset._id}`}
                        className="border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] py-[6px] px-[10px] text-xs hover:bg-[#F7F8F815] transition-colors"
                        title="View"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12Z" stroke="currentColor" strokeWidth="2"/>
                          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      </Link>
                      <Link
                        href={`/admin/assets/edit/${asset._id}`}
                        className="border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] py-[6px] px-[10px] text-xs hover:bg-[#F7F8F815] transition-colors"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleRemove(asset._id)}
                        disabled={isDeleting === asset._id}
                        className="border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] py-[6px] px-[10px] text-xs hover:bg-[#FF6B6B25] hover:border-[#FF6B6B] hover:text-[#FF6B6B] transition-colors disabled:opacity-50"
                      >
                        {isDeleting === asset._id ? "..." : "Del"}
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
        <div className="flex items-center justify-between mt-6 flex-wrap gap-4">
          <div className="text-sm text-[#F7F8F8B2]">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
            {pagination.total} assets
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