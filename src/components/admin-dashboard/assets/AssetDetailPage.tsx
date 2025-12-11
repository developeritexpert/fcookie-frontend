// components/admin-dashboard/assets/AssetDetailPage.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import axiosWrapper from "@/utils/api";
import { ASSET_API, FILTER_GROUP_API, FILTER_VALUE_API } from "@/utils/apiUrl";
import { Asset, AssetFilter } from "@/types/asset/asset";
import { FilterGroup, FilterValue } from "@/types/filter/filter";
import { useAuthStore } from "@/components/store/useAuthStore";

interface AssetDetailPageProps {
  assetId: string;
}

interface FilterDisplayData {
  groupId: string;
  groupName: string;
  values: { valueId: string; valueName: string }[];
}

export default function AssetDetailPage({ assetId }: AssetDetailPageProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [asset, setAsset] = useState<Asset | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [filterDisplayData, setFilterDisplayData] = useState<FilterDisplayData[]>([]);
  const [isLoadingFilters, setIsLoadingFilters] = useState(false);
  const token = useAuthStore.getState().getToken();

  useEffect(() => {
    fetchAsset();
  }, [assetId]);

  useEffect(() => {
    if (asset?.filters && asset.filters.length > 0) {
      fetchFilterNames();
    }
  }, [asset]);

  const fetchAsset = async () => {
    try {
      setIsLoading(true);
      const response: any = await axiosWrapper(
        "get",
        ASSET_API.GET_ASSET_BY_ID(assetId),
        {},
        token ?? undefined
      );

      if (response?.result === "error") {
        toast.error(response?.desc || "Failed to fetch asset");
        router.push("/admin/assets");
        return;
      }

      const data = response?.data || response;
      setAsset(data);
      if (data?.images?.length > 0) {
        setSelectedImage(data.thumbnail_url || data.images[0]);
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to fetch asset");
      router.push("/admin/assets");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFilterNames = async () => {
    if (!asset?.filters || asset.filters.length === 0) return;

    setIsLoadingFilters(true);

    try {
      // Check if filters are already populated (objects with name/value)
      const firstFilter = asset.filters[0];
      const isPopulated = typeof firstFilter.groupId === 'object' && firstFilter.groupId !== null;

      if (isPopulated) {
        // Filters are already populated from backend
        const groupedFilters: Record<string, FilterDisplayData> = {};

        asset.filters.forEach((filter) => {
          const groupId = typeof filter.groupId === 'object' ? filter.groupId : filter.groupId;
          const groupName = typeof filter.groupId === 'object' ? (filter.groupId as any).name : 'Unknown';
          const valueId = typeof filter.valueId === 'object' ? filter.valueId : filter.valueId;
          const valueName = typeof filter.valueId === 'object' ? (filter.valueId as any).value : 'Unknown';

          if (!groupedFilters[groupId]) {
            groupedFilters[groupId] = {
              groupId,
              groupName,
              values: [],
            };
          }
          groupedFilters[groupId].values.push({ valueId, valueName });
        });

        setFilterDisplayData(Object.values(groupedFilters));
      } else {
        // Filters are not populated, need to fetch names
        // Get unique group IDs
        const uniqueGroupIds = [...new Set(asset.filters.map((f) => f.groupId as string))];

        // Fetch all filter groups
        const groupsResponse: any = await axiosWrapper(
          "get",
          FILTER_GROUP_API.GET_ALL,
          { limit: 100 },
          token ?? undefined
        );
        const allGroups: FilterGroup[] = groupsResponse?.data?.data || groupsResponse?.data || groupsResponse || [];

        // Create a map of groupId -> groupName
        const groupMap: Record<string, string> = {};
        allGroups.forEach((group) => {
          groupMap[group._id] = group.name;
        });

        // Fetch filter values for each group
        const valueMap: Record<string, string> = {};

        await Promise.all(
          uniqueGroupIds.map(async (groupId) => {
            try {
              const valuesResponse: any = await axiosWrapper(
                "get",
                FILTER_VALUE_API.GET_ALL,
                { groupId, limit: 100 },
                token ?? undefined
              );
              const values: FilterValue[] = valuesResponse?.data?.data || valuesResponse?.data || valuesResponse || [];
              values.forEach((v) => {
                valueMap[v._id] = v.label;
              });
            } catch (err) {
              console.error(`Failed to fetch values for group ${groupId}:`, err);
            }
          })
        );

        // Group filters by groupId
        const groupedFilters: Record<string, FilterDisplayData> = {};

        asset.filters.forEach((filter) => {
          const groupId = filter.groupId as string;
          const valueId = filter.valueId as string;
          const groupName = groupMap[groupId] || 'Unknown Group';
          const valueName = valueMap[valueId] || 'Unknown Value';

          if (!groupedFilters[groupId]) {
            groupedFilters[groupId] = {
              groupId,
              groupName,
              values: [],
            };
          }
          groupedFilters[groupId].values.push({ valueId, valueName });
        });

        setFilterDisplayData(Object.values(groupedFilters));
      }
    } catch (error) {
      console.error("Failed to fetch filter names:", error);
    } finally {
      setIsLoadingFilters(false);
    }
  };

  const formatPrice = (price: number, currency: string) => {
    const symbols: Record<string, string> = { USD: "$", EUR: "€", GBP: "£" };
    return `${symbols[currency] || "$"}${price.toLocaleString()}`;
  };

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
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

  const getVisibilityColor = (visibility: string) => {
    switch (visibility.toUpperCase()) {
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

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-[#ffffff20] rounded w-1/4"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-96 bg-[#ffffff10] rounded"></div>
          <div className="space-y-4">
            <div className="h-8 bg-[#ffffff20] rounded w-3/4"></div>
            <div className="h-4 bg-[#ffffff10] rounded w-1/2"></div>
            <div className="h-24 bg-[#ffffff10] rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="text-center py-12">
        <p className="text-[#F7F8F8B2]">Asset not found</p>
        <Link href="/admin/assets" className="text-[#4DCE94] hover:underline mt-4 inline-block">
          Back to Assets
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/assets"
              className="border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] p-2 hover:bg-[#F7F8F815] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M19 12H5M5 12L12 19M5 12L12 5"
                  stroke="#F7F8F8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">{asset.name}</h1>
              <p className="text-[#F7F8F8B2]">
                <code className="bg-[#F7F8F80A] px-2 py-0.5 rounded text-xs">{asset.slug}</code>
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link
              href={`/admin/assets/edit/${asset._id}`}
              className="flex items-center gap-2 bg-gradient-to-r from-[#75DA5B] to-[#4DCE94] rounded-[7px] text-black font-semibold px-4 py-2 text-sm hover:opacity-90"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Edit
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="border border-[#F7F8F81C] rounded-[7px] bg-[#F7F8F80A] p-4">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt={asset.name}
                className="w-full h-80 object-contain rounded-[7px]"
              />
            ) : (
              <div className="w-full h-80 flex items-center justify-center bg-[#F7F8F805] rounded-[7px]">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z"
                    stroke="#F7F8F870"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* Image Gallery */}
          {asset.images && asset.images.length > 0 && (
            <div className="grid grid-cols-6 gap-2">
              {asset.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`border rounded-[5px] overflow-hidden transition-all ${
                    selectedImage === img
                      ? "border-[#4DCE94] ring-2 ring-[#4DCE9440]"
                      : "border-[#F7F8F81C] hover:border-[#F7F8F840]"
                  }`}
                >
                  <img src={img} alt={`${asset.name} ${index + 1}`} className="w-full h-14 object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Video */}
          {asset.video_url && (
            <div className="border border-[#F7F8F81C] rounded-[7px] bg-[#F7F8F80A] p-4">
              <h4 className="text-sm font-medium text-[#F7F8F8B2] mb-3">Video</h4>
              <video src={asset.video_url} controls className="w-full rounded-[7px]" />
            </div>
          )}
        </div>

        {/* Right Column - Details */}
        <div className="space-y-6">
          {/* Price & Status */}
          <div className="border border-[#F7F8F81C] rounded-[7px] bg-[#F7F8F80A] p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-3xl font-bold text-white">{formatPrice(asset.price, asset.currency)}</p>
                {asset.listing_price && asset.listing_price !== asset.price && (
                  <p className="text-lg text-[#F7F8F870] line-through">
                    {formatPrice(asset.listing_price, asset.currency)}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2 items-end">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(asset.status)}`}>
                  {asset.status}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getVisibilityColor(asset.visibility)}`}>
                  {asset.visibility}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-[#F7F8F870]">Quantity</p>
                <p className="text-white font-medium">{asset.quantity}</p>
              </div>
              <div>
                <p className="text-[#F7F8F870]">Currency</p>
                <p className="text-white font-medium">{asset.currency}</p>
              </div>
            </div>
          </div>

          {/* Grading */}
          {asset.grading?.grader && (
            <div className="border border-[#4DCE9440] rounded-[7px] bg-[#4DCE9410] p-6">
              <h4 className="text-sm font-medium text-[#F7F8F8B2] mb-3">Grading</h4>
              <div className="flex items-center gap-4">
                <span className="bg-gradient-to-r from-[#75DA5B] to-[#4DCE94] text-black font-bold text-xl px-5 py-2 rounded-[7px]">
                  {asset.grading.grader} {asset.grading.grade}
                </span>
                <div className="text-sm">
                  {asset.grading.cert_number && (
                    <p className="text-[#F7F8F8B2]">
                      Cert: <span className="text-white">{asset.grading.cert_number}</span>
                    </p>
                  )}
                  {asset.grading.population && (
                    <p className="text-[#F7F8F8B2]">
                      Pop: <span className="text-white">{asset.grading.population}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Filters - UPDATED SECTION */}
          {asset.filters && asset.filters.length > 0 && (
            <div className="border border-[#F7F8F81C] rounded-[7px] bg-[#F7F8F80A] p-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-[#F7F8F8B2]">Filters</h4>
                <span className="text-xs text-[#F7F8F870]">
                  {asset.filters.length} filter{asset.filters.length > 1 ? "s" : ""} applied
                </span>
              </div>

              {isLoadingFilters ? (
                <div className="flex items-center gap-2 py-4">
                  <svg className="animate-spin h-4 w-4 text-[#4DCE94]" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span className="text-sm text-[#F7F8F8B2]">Loading filter details...</span>
                </div>
              ) : filterDisplayData.length > 0 ? (
                <div className="space-y-3">
                  {filterDisplayData.map((filterGroup) => (
                    <div
                      key={filterGroup.groupId}
                      className="flex items-start gap-3 bg-[#F7F8F805] rounded-[7px] p-3"
                    >
                      <span className="text-xs text-[#F7F8F870] min-w-[100px] font-medium">
                        {filterGroup.groupName}:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {filterGroup.values.map((val) => (
                          <span
                            key={val.valueId}
                            className="bg-[#4DCE9420] text-[#4DCE94] text-xs px-2.5 py-1 rounded-full font-medium"
                          >
                            {val.valueName}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[#F7F8F870]">No filter information available</p>
              )}
            </div>
          )}

          {/* Attributes */}
          {asset.attributes && asset.attributes.length > 0 && (
            <div className="border border-[#F7F8F81C] rounded-[7px] bg-[#F7F8F80A] p-6">
              <h4 className="text-sm font-medium text-[#F7F8F8B2] mb-3">Attributes</h4>
              <div className="grid grid-cols-2 gap-3">
                {asset.attributes.map((attr, index) => (
                  <div key={index} className="bg-[#F7F8F805] rounded-[5px] px-3 py-2">
                    <p className="text-xs text-[#F7F8F870]">{attr.key}</p>
                    <p className="text-sm text-white font-medium">{attr.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          {asset.description && (
            <div className="border border-[#F7F8F81C] rounded-[7px] bg-[#F7F8F80A] p-6">
              <h4 className="text-sm font-medium text-[#F7F8F8B2] mb-3">Description</h4>
              <p className="text-[#F7F8F8B2] text-sm whitespace-pre-wrap">{asset.description}</p>
            </div>
          )}

          {/* Details */}
          {asset.details && (
            <div className="border border-[#F7F8F81C] rounded-[7px] bg-[#F7F8F80A] p-6">
              <h4 className="text-sm font-medium text-[#F7F8F8B2] mb-3">Details</h4>
              <p className="text-[#F7F8F8B2] text-sm whitespace-pre-wrap">{asset.details}</p>
            </div>
          )}

          {/* Stats */}
          <div className="border border-[#F7F8F81C] rounded-[7px] bg-[#F7F8F80A] p-6">
            <h4 className="text-sm font-medium text-[#F7F8F8B2] mb-3">Statistics</h4>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{asset.views_count}</p>
                <p className="text-xs text-[#F7F8F870]">Views</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-[#FF6B6B]">{asset.likes_count}</p>
                <p className="text-xs text-[#F7F8F870]">Likes</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-[#FFB547]">{asset.saved_count}</p>
                <p className="text-xs text-[#F7F8F870]">Saved</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-[#4DCE94]">{asset.offer_count}</p>
                <p className="text-xs text-[#F7F8F870]">Offers</p>
              </div>
            </div>
            {asset.highest_offer_price > 0 && (
              <div className="mt-4 pt-4 border-t border-[#F7F8F81C]">
                <p className="text-sm text-[#F7F8F870]">Highest Offer</p>
                <p className="text-lg font-bold text-[#4DCE94]">
                  {formatPrice(asset.highest_offer_price, asset.currency)}
                </p>
              </div>
            )}
          </div>

          {/* Meta */}
          <div className="border border-[#F7F8F81C] rounded-[7px] bg-[#F7F8F80A] p-6">
            <h4 className="text-sm font-medium text-[#F7F8F8B2] mb-3">Metadata</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#F7F8F870]">Created</span>
                <span className="text-white">
                  {new Date(asset.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#F7F8F870]">Updated</span>
                <span className="text-white">
                  {new Date(asset.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#F7F8F870]">ID</span>
                <code className="text-white bg-[#F7F8F80A] px-2 py-0.5 rounded text-xs">{asset._id}</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}