// components/admin-dashboard/assets/AssetFormPage.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { toast } from "sonner";
import axiosWrapper from "@/utils/api";
import { ASSET_API, CATEGORY_API, FILTER_GROUP_API, FILTER_VALUE_API } from "@/utils/apiUrl";
import { AssetSchema } from "@/components/schemas/assetSchema";
import { Asset, AssetFormValues, AssetFilter } from "@/types/asset/asset";
import { Category } from "@/types/category/category";
import { FilterGroup, FilterValue } from "@/types/filter/filter";
import { useAuthStore } from "@/components/store/useAuthStore";

interface AssetFormPageProps {
  mode: "add" | "edit";
  assetId?: string;
}

const statusOptions = [
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
  { value: "ARCHIVED", label: "Archived" },
];

const visibilityOptions = [
  { value: "PUBLIC", label: "Public" },
  { value: "PRIVATE", label: "Private" },
];

const currencyOptions = [
  { value: "USD", label: "USD ($)" },
];

const graderOptions = [
  { value: "", label: "Select Grader" },
  { value: "PSA", label: "PSA" },
  { value: "BGS", label: "BGS" },
  { value: "SGC", label: "SGC" },
  { value: "CGC", label: "CGC" },
];

export default function AssetFormPage({ mode, assetId }: AssetFormPageProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(mode === "edit");
  const [asset, setAsset] = useState<Asset | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const token = useAuthStore.getState().getToken();

  // Filter Groups and Values
  const [filterGroups, setFilterGroups] = useState<FilterGroup[]>([]);
  const [filterValues, setFilterValues] = useState<Record<string, FilterValue[]>>({}); // groupId -> values
  const [loadingFilterValues, setLoadingFilterValues] = useState<Record<string, boolean>>({});
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  // File handling
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<"basic" | "media" | "filters" | "attributes" | "grading" | "seo">("basic");

  const initialValues: AssetFormValues = {
    name: asset?.name || "",
    description: asset?.description || "",
    details: asset?.details || "",
    meta_title: asset?.meta_title || "",
    meta_description: asset?.meta_description || "",
    categoryId: typeof asset?.categoryId === 'object' ? asset?.categoryId._id : asset?.categoryId || "",
    filters: asset?.filters || [],
    attributes: asset?.attributes || [],
    grading: {
      grader: asset?.grading?.grader || "",
      grade: asset?.grading?.grade || "",
      cert_number: asset?.grading?.cert_number || "",
      population: asset?.grading?.population || undefined,
    },
    price: asset?.price || 0,
    listing_price: asset?.listing_price || undefined,
    currency: asset?.currency || "USD",
    quantity: asset?.quantity || 1,
    status: asset?.status || "ACTIVE",
    visibility: asset?.visibility || "PUBLIC",
  };

  useEffect(() => {
    fetchCategories();
    fetchFilterGroups();
    if (mode === "edit" && assetId) {
      fetchAsset();
    }
  }, [mode, assetId]);

  useEffect(() => {
    if (asset?.images) {
      setExistingImages(asset.images);
    }
    if (asset?.thumbnail_url) {
      setThumbnailPreview(asset.thumbnail_url);
    }
    if (asset?.video_url) {
      setVideoPreview(asset.video_url);
    }
    // Load filter values for existing filters
    if (asset?.filters && asset.filters.length > 0) {
      const uniqueGroupIds = [...new Set(asset.filters.map(f => f.groupId))];
      uniqueGroupIds.forEach(groupId => {
        if (!filterValues[groupId]) {
          fetchFilterValuesForGroup(groupId);
        }
      });
      // Expand groups that have selected values
      setExpandedGroups(new Set(uniqueGroupIds));
    }
  }, [asset]);

  // Cleanup preview URLs
  useEffect(() => {
    return () => {
      previewUrls.forEach(url => {
        if (url.startsWith("blob:")) URL.revokeObjectURL(url);
      });
      if (thumbnailPreview?.startsWith("blob:")) URL.revokeObjectURL(thumbnailPreview);
      if (videoPreview?.startsWith("blob:")) URL.revokeObjectURL(videoPreview);
    };
  }, [previewUrls, thumbnailPreview, videoPreview]);

  const fetchCategories = async () => {
    try {
      const response: any = await axiosWrapper(
        "get",
        CATEGORY_API.GET_ALL_CATEGORIES,
        { limit: 100, status: "ACTIVE" },
        token ?? undefined
      );
      const data = response?.data || response;
      setCategories(data?.data || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const fetchFilterGroups = async () => {
    try {
      const response: any = await axiosWrapper(
        "get",
        FILTER_GROUP_API.GET_ALL,
        { limit: 100, status: "ACTIVE" },
        token ?? undefined
      );
      const data = response?.data || response;
      setFilterGroups(data?.data || data || []);
    } catch (error) {
      console.error("Failed to fetch filter groups:", error);
    }
  };

  const fetchFilterValuesForGroup = async (groupId: string) => {
    if (filterValues[groupId] || loadingFilterValues[groupId]) return;

    try {
      setLoadingFilterValues(prev => ({ ...prev, [groupId]: true }));
      const response: any = await axiosWrapper(
        "get",
        FILTER_VALUE_API.GET_ALL,
        { groupId, limit: 100, status: "ACTIVE" },
        token ?? undefined
      );
      const data = response?.data || response;
      setFilterValues(prev => ({
        ...prev,
        [groupId]: data?.data || data || []
      }));
    } catch (error) {
      console.error(`Failed to fetch filter values for group ${groupId}:`, error);
    } finally {
      setLoadingFilterValues(prev => ({ ...prev, [groupId]: false }));
    }
  };

  const fetchAsset = async () => {
    try {
      setIsLoading(true);
      const response: any = await axiosWrapper(
        "get",
        ASSET_API.GET_ASSET_BY_ID(assetId!),
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
    } catch (error: any) {
      toast.error(error?.message || "Failed to fetch asset");
      router.push("/admin/assets");
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle group expansion and load values
  const toggleGroupExpansion = (groupId: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
      // Fetch values when expanding
      fetchFilterValuesForGroup(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  // Check if a filter value is selected
  const isFilterValueSelected = (filters: AssetFilter[], groupId: string, valueId: string): boolean => {
    return filters.some(f => f.groupId === groupId && f.valueId === valueId);
  };

  // Get selected values for a group
  const getSelectedValuesForGroup = (filters: AssetFilter[], groupId: string): string[] => {
    return filters.filter(f => f.groupId === groupId).map(f => f.valueId);
  };

  // Toggle filter value selection
  const toggleFilterValue = (
    filters: AssetFilter[],
    setFieldValue: (field: string, value: any) => void,
    groupId: string,
    valueId: string
  ) => {
    const isSelected = isFilterValueSelected(filters, groupId, valueId);
    
    if (isSelected) {
      // Remove the filter
      const newFilters = filters.filter(f => !(f.groupId === groupId && f.valueId === valueId));
      setFieldValue("filters", newFilters);
    } else {
      // Add the filter
      const newFilters = [...filters, { groupId, valueId }];
      setFieldValue("filters", newFilters);
    }
  };

  // Remove all values for a group
  const removeAllGroupValues = (
    filters: AssetFilter[],
    setFieldValue: (field: string, value: any) => void,
    groupId: string
  ) => {
    const newFilters = filters.filter(f => f.groupId !== groupId);
    setFieldValue("filters", newFilters);
  };

  // Handle image selection
  const handleImagesSelect = (files: FileList | null) => {
    if (!files) return;

    const validFiles: File[] = [];
    const newPreviews: string[] = [];

    Array.from(files).forEach(file => {
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not an image`);
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`${file.name} exceeds 10MB limit`);
        return;
      }
      validFiles.push(file);
      newPreviews.push(URL.createObjectURL(file));
    });

    if (selectedImages.length + existingImages.length + validFiles.length > 12) {
      toast.error("Maximum 12 images allowed");
      return;
    }

    setSelectedImages(prev => [...prev, ...validFiles]);
    setPreviewUrls(prev => [...prev, ...newPreviews]);
  };

  const handleRemoveNewImage = (index: number) => {
    URL.revokeObjectURL(previewUrls[index]);
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleRemoveExistingImage = (index: number) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleThumbnailSelect = (file: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    if (thumbnailPreview?.startsWith("blob:")) URL.revokeObjectURL(thumbnailPreview);
    setThumbnailFile(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const handleVideoSelect = (file: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("video/")) {
      toast.error("Please select a video file");
      return;
    }
    if (file.size > 100 * 1024 * 1024) {
      toast.error("Video must be under 100MB");
      return;
    }
    if (videoPreview?.startsWith("blob:")) URL.revokeObjectURL(videoPreview);
    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
  };

  // Drag and drop
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleImagesSelect(e.dataTransfer.files);
  };

  const handleSubmit = async (values: AssetFormValues, { setSubmitting }: any) => {
    try {
      const formData = new FormData();

      // Basic fields
      formData.append("name", values.name.trim());
      formData.append("categoryId", values.categoryId);
      formData.append("price", String(values.price));
      formData.append("currency", values.currency);
      formData.append("quantity", String(values.quantity));
      formData.append("status", values.status);
      formData.append("visibility", values.visibility);

      if (values.description?.trim()) formData.append("description", values.description.trim());
      if (values.details?.trim()) formData.append("details", values.details.trim());
      if (values.meta_title?.trim()) formData.append("meta_title", values.meta_title.trim());
      if (values.meta_description?.trim()) formData.append("meta_description", values.meta_description.trim());
      if (values.listing_price) formData.append("listing_price", String(values.listing_price));

      // Attributes
      if (values.attributes.length > 0) {
        formData.append("attributes", JSON.stringify(values.attributes));
      }

      // Grading
      if (values.grading.grader || values.grading.grade) {
        formData.append("grading", JSON.stringify(values.grading));
      }

      // Filters
      if (values.filters.length > 0) {
        formData.append("filters", JSON.stringify(values.filters));
      }

      // Images
      selectedImages.forEach(file => {
        formData.append("images", file);
      });

      if (mode === "edit" && existingImages.length > 0) {
        formData.append("existingImages", JSON.stringify(existingImages));
      }

      // Thumbnail
      if (thumbnailFile) {
        formData.append("thumbnail", thumbnailFile);
      }

      // Video
      if (videoFile) {
        formData.append("video", videoFile);
      }

      let response: any;

      if (mode === "add") {
        response = await axiosWrapper(
          "post",
          ASSET_API.CREATE_ASSET,
          formData,
          token ?? undefined,
          true
        );
      } else {
        response = await axiosWrapper(
          "put",
          ASSET_API.UPDATE_ASSET(assetId!),
          formData,
          token ?? undefined,
          true
        );
      }

      if (response?.result === "error") {
        toast.error(response?.desc || `Failed to ${mode} asset`);
        return;
      }

      toast.success(mode === "add" ? "Asset created successfully!" : "Asset updated successfully!");
      router.push("/admin/assets");

    } catch (error: any) {
      toast.error(error?.desc || error?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => router.push("/admin/assets");

  const handleRemoveAsset = async () => {
    if (!confirm("Are you sure you want to delete this asset?")) return;

    try {
      const response: any = await axiosWrapper(
        "delete",
        ASSET_API.DELETE_ASSET(assetId!),
        {},
        token ?? undefined
      );

      if (response?.result === "error") {
        toast.error(response?.desc || "Failed to delete asset");
        return;
      }

      toast.success("Asset deleted successfully");
      router.push("/admin/assets");
    } catch (error: any) {
      toast.error(error?.message || "Failed to delete asset");
    }
  };

  // Get filter group name by ID
  const getFilterGroupName = (groupId: string): string => {
    const group = filterGroups.find(g => g._id === groupId);
    return group?.name || "Unknown Group";
  };

  // Get filter value name by ID
  const getFilterValueName = (groupId: string, valueId: string): string => {
    const values = filterValues[groupId] || [];
    const value = values.find(v => v._id === valueId);
    return value?.label || "Unknown Value";
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-[#ffffff20] rounded w-1/4"></div>
        <div className="h-64 bg-[#ffffff10] rounded"></div>
        <div className="h-96 bg-[#ffffff10] rounded"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link
            href="/admin/assets"
            className="border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] p-2 hover:bg-[#F7F8F815] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#F7F8F8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">
              {mode === "add" ? "Add New Asset" : "Edit Asset"}
            </h1>
            <p className="text-[#F7F8F8B2]">
              {mode === "add" ? "Create a new product asset" : "Update asset information"}
            </p>
          </div>
        </div>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={AssetSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            {/* Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {[
                { id: "basic", label: "Basic Info" },
                { id: "media", label: "Media" },
                { id: "filters", label: `Filters${values.filters.length > 0 ? ` (${values.filters.length})` : ''}` },
                { id: "attributes", label: "Attributes" },
                { id: "grading", label: "Grading" },
                { id: "seo", label: "SEO" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-[7px] text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-[#75DA5B] to-[#4DCE94] text-black"
                      : "border border-[#F7F8F81C] bg-[#F7F8F80A] text-[#F7F8F8B2] hover:bg-[#F7F8F815]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Basic Info Tab */}
            {activeTab === "basic" && (
              <div className="border border-[#F7F8F81A] p-[20px] rounded-[7px] bg-[#F7F8F80A] space-y-6">
                <h3 className="text-lg font-semibold">Basic Information</h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-[#F7F8F8B2] mb-2">
                      Asset Name *
                    </label>
                    <Field
                      type="text"
                      name="name"
                      placeholder="Enter asset name"
                      className="w-full border border-[#F7F8F81C] bg-transparent rounded-[7px] text-[#F7F8F8] text-sm px-4 py-3 placeholder:text-[#F7F8F8B2] focus-visible:outline-0 focus-visible:border-[#ffffff80] duration-300"
                    />
                    <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-[#F7F8F8B2] mb-2">
                      Category *
                    </label>
                    <Field
                      as="select"
                      name="categoryId"
                      className="w-full border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] text-[#F7F8F8B2] text-sm px-4 py-3 focus-visible:outline-0"
                    >
                      <option value="" className="bg-[#1a1a1a]">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat._id} className="bg-[#1a1a1a]">
                          {cat.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="categoryId" component="div" className="text-red-500 text-xs mt-1" />
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-sm font-medium text-[#F7F8F8B2] mb-2">
                      Price *
                    </label>
                    <div className="flex gap-2">
                      <Field
                        type="number"
                        name="price"
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        className="flex-1 border border-[#F7F8F81C] bg-transparent rounded-[7px] text-[#F7F8F8] text-sm px-4 py-3 focus-visible:outline-0 focus-visible:border-[#ffffff80]"
                      />
                      <Field
                        as="select"
                        name="currency"
                        className="w-24 border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] text-[#F7F8F8B2] text-sm px-2 py-3 focus-visible:outline-0"
                      >
                        {currencyOptions.map((opt) => (
                          <option key={opt.value} value={opt.value} className="bg-[#1a1a1a]">
                            {opt.label}
                          </option>
                        ))}
                      </Field>
                    </div>
                    <ErrorMessage name="price" component="div" className="text-red-500 text-xs mt-1" />
                  </div>

                  {/* Listing Price */}
                  <div>
                    <label className="block text-sm font-medium text-[#F7F8F8B2] mb-2">
                      Listing Price (Original)
                    </label>
                    <Field
                      type="number"
                      name="listing_price"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      className="w-full border border-[#F7F8F81C] bg-transparent rounded-[7px] text-[#F7F8F8] text-sm px-4 py-3 focus-visible:outline-0 focus-visible:border-[#ffffff80]"
                    />
                  </div>

                  {/* Quantity */}
                  <div>
                    <label className="block text-sm font-medium text-[#F7F8F8B2] mb-2">
                      Quantity *
                    </label>
                    <Field
                      type="number"
                      name="quantity"
                      min="0"
                      className="w-full border border-[#F7F8F81C] bg-transparent rounded-[7px] text-[#F7F8F8] text-sm px-4 py-3 focus-visible:outline-0 focus-visible:border-[#ffffff80]"
                    />
                    <ErrorMessage name="quantity" component="div" className="text-red-500 text-xs mt-1" />
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-sm font-medium text-[#F7F8F8B2] mb-2">
                      Status *
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {statusOptions.map((option) => (
                        <label
                          key={option.value}
                          className={`flex items-center gap-2 cursor-pointer border rounded-[7px] px-3 py-2 transition-colors ${
                            values.status === option.value
                              ? "border-[#4DCE94] bg-[#4DCE9420]"
                              : "border-[#F7F8F81C] bg-[#F7F8F80A] hover:bg-[#F7F8F815]"
                          }`}
                        >
                          <Field type="radio" name="status" value={option.value} className="hidden" />
                          <span className={values.status === option.value ? "text-[#4DCE94]" : "text-[#F7F8F8B2]"}>
                            {option.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Visibility */}
                  <div>
                    <label className="block text-sm font-medium text-[#F7F8F8B2] mb-2">
                      Visibility *
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {visibilityOptions.map((option) => (
                        <label
                          key={option.value}
                          className={`flex items-center gap-2 cursor-pointer border rounded-[7px] px-3 py-2 transition-colors ${
                            values.visibility === option.value
                              ? "border-[#4DCE94] bg-[#4DCE9420]"
                              : "border-[#F7F8F81C] bg-[#F7F8F80A] hover:bg-[#F7F8F815]"
                          }`}
                        >
                          <Field type="radio" name="visibility" value={option.value} className="hidden" />
                          <span className={values.visibility === option.value ? "text-[#4DCE94]" : "text-[#F7F8F8B2]"}>
                            {option.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-[#F7F8F8B2] mb-2">
                    Description
                  </label>
                  <Field
                    as="textarea"
                    name="description"
                    rows={4}
                    placeholder="Enter asset description"
                    className="w-full border border-[#F7F8F81C] bg-transparent rounded-[7px] text-[#F7F8F8] text-sm px-4 py-3 placeholder:text-[#F7F8F8B2] focus-visible:outline-0 focus-visible:border-[#ffffff80] resize-none"
                  />
                </div>

                {/* Details */}
                <div>
                  <label className="block text-sm font-medium text-[#F7F8F8B2] mb-2">
                    Details
                  </label>
                  <Field
                    as="textarea"
                    name="details"
                    rows={4}
                    placeholder="Enter detailed information"
                    className="w-full border border-[#F7F8F81C] bg-transparent rounded-[7px] text-[#F7F8F8] text-sm px-4 py-3 placeholder:text-[#F7F8F8B2] focus-visible:outline-0 focus-visible:border-[#ffffff80] resize-none"
                  />
                </div>
              </div>
            )}

            {/* Media Tab */}
            {activeTab === "media" && (
              <div className="border border-[#F7F8F81A] p-[20px] rounded-[7px] bg-[#F7F8F80A] space-y-6">
                <h3 className="text-lg font-semibold">Media</h3>

                {/* Images Upload */}
                <div>
                  <label className="block text-sm font-medium text-[#F7F8F8B2] mb-2">
                    Images (Max 12)
                  </label>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImagesSelect(e.target.files)}
                    className="hidden"
                  />

                  {/* Upload Area */}
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`cursor-pointer border-2 border-dashed rounded-[7px] p-[30px] transition-all ${
                      dragActive
                        ? "border-[#4DCE94] bg-[#4DCE9415]"
                        : "border-[#F7F8F81C] bg-[#F7F8F80A] hover:bg-[#F7F8F80E]"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                        <path d="M21 15V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V15" stroke="#F7F8F870" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M17 8L12 3L7 8" stroke="#F7F8F870" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 3V15" stroke="#F7F8F870" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <p className="text-sm text-[#F7F8F8B2]">Click or drag images here</p>
                      <p className="text-xs text-[#F7F8F870]">PNG, JPG, WEBP (max 10MB each)</p>
                    </div>
                  </div>

                  {/* Image Previews */}
                  {(existingImages.length > 0 || previewUrls.length > 0) && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mt-4">
                      {/* Existing Images */}
                      {existingImages.map((url, index) => (
                        <div key={`existing-${index}`} className="relative group">
                          <img
                            src={url}
                            alt={`Existing ${index + 1}`}
                            className="w-full h-24 object-cover rounded-[7px] border border-[#F7F8F81C]"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveExistingImage(index)}
                            className="absolute top-1 right-1 bg-[#FF6B6B] text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            ×
                          </button>
                          <span className="absolute bottom-1 left-1 bg-[#000000aa] text-[10px] text-white px-1 rounded">
                            Saved
                          </span>
                        </div>
                      ))}

                      {/* New Images */}
                      {previewUrls.map((url, index) => (
                        <div key={`new-${index}`} className="relative group">
                          <img
                            src={url}
                            alt={`New ${index + 1}`}
                            className="w-full h-24 object-cover rounded-[7px] border border-[#4DCE94]"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveNewImage(index)}
                            className="absolute top-1 right-1 bg-[#FF6B6B] text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            ×
                          </button>
                          <span className="absolute bottom-1 left-1 bg-[#4DCE94] text-[10px] text-black px-1 rounded">
                            New
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="text-xs text-[#F7F8F870] mt-2">
                    {existingImages.length + previewUrls.length} / 12 images
                  </p>
                </div>

                {/* Thumbnail Upload */}
                <div>
                  <label className="block text-sm font-medium text-[#F7F8F8B2] mb-2">
                    Thumbnail Image
                  </label>
                  
                  <input
                    ref={thumbnailInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleThumbnailSelect(e.target.files?.[0] || null)}
                    className="hidden"
                  />

                  {thumbnailPreview ? (
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={thumbnailPreview}
                          alt="Thumbnail"
                          className="w-32 h-32 object-cover rounded-[7px] border border-[#F7F8F81C]"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <button
                          type="button"
                          onClick={() => thumbnailInputRef.current?.click()}
                          className="border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] py-2 px-4 text-sm hover:bg-[#F7F8F815]"
                        >
                          Change
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (thumbnailPreview?.startsWith("blob:")) URL.revokeObjectURL(thumbnailPreview);
                            setThumbnailFile(null);
                            setThumbnailPreview(null);
                          }}
                          className="border border-[#FF6B6B] text-[#FF6B6B] rounded-[7px] py-2 px-4 text-sm hover:bg-[#FF6B6B20]"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => thumbnailInputRef.current?.click()}
                      className="border-2 border-dashed border-[#F7F8F81C] rounded-[7px] p-6 w-full hover:bg-[#F7F8F80A] transition-colors"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <rect x="3" y="3" width="18" height="18" rx="2" stroke="#F7F8F870" strokeWidth="2"/>
                          <circle cx="8.5" cy="8.5" r="1.5" fill="#F7F8F870"/>
                          <path d="M21 15L16 10L5 21" stroke="#F7F8F870" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="text-sm text-[#F7F8F8B2]">Upload Thumbnail</span>
                      </div>
                    </button>
                  )}
                </div>

                {/* Video Upload */}
                <div>
                  <label className="block text-sm font-medium text-[#F7F8F8B2] mb-2">
                    Video (Optional)
                  </label>
                  
                  <input
                    ref={videoInputRef}
                    type="file"
                    accept="video/*"
                    onChange={(e) => handleVideoSelect(e.target.files?.[0] || null)}
                    className="hidden"
                  />

                  {videoPreview ? (
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <video
                          src={videoPreview}
                          className="w-48 h-32 object-cover rounded-[7px] border border-[#F7F8F81C]"
                          controls
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <button
                          type="button"
                          onClick={() => videoInputRef.current?.click()}
                          className="border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] py-2 px-4 text-sm hover:bg-[#F7F8F815]"
                        >
                          Change
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (videoPreview?.startsWith("blob:")) URL.revokeObjectURL(videoPreview);
                            setVideoFile(null);
                            setVideoPreview(null);
                          }}
                          className="border border-[#FF6B6B] text-[#FF6B6B] rounded-[7px] py-2 px-4 text-sm hover:bg-[#FF6B6B20]"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => videoInputRef.current?.click()}
                      className="border-2 border-dashed border-[#F7F8F81C] rounded-[7px] p-6 w-full hover:bg-[#F7F8F80A] transition-colors"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M23 7L16 12L23 17V7Z" stroke="#F7F8F870" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <rect x="1" y="5" width="15" height="14" rx="2" stroke="#F7F8F870" strokeWidth="2"/>
                        </svg>
                        <span className="text-sm text-[#F7F8F8B2]">Upload Video (max 100MB)</span>
                      </div>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Filters Tab - NEW */}
            {activeTab === "filters" && (
              <div className="border border-[#F7F8F81A] p-[20px] rounded-[7px] bg-[#F7F8F80A] space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Product Filters</h3>
                    <p className="text-sm text-[#F7F8F8B2]">
                      Select filter groups and choose multiple values for each
                    </p>
                  </div>
                  {values.filters.length > 0 && (
                    <span className="bg-gradient-to-r from-[#75DA5B] to-[#4DCE94] text-black text-xs font-semibold px-3 py-1 rounded-full">
                      {values.filters.length} filter{values.filters.length > 1 ? 's' : ''} selected
                    </span>
                  )}
                </div>

                {/* Selected Filters Summary */}
                {values.filters.length > 0 && (
                  <div className="border border-[#4DCE9440] bg-[#4DCE9410] rounded-[7px] p-4">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-medium text-[#4DCE94]">Selected Filters</p>
                      <button
                        type="button"
                        onClick={() => setFieldValue("filters", [])}
                        className="text-xs text-[#FF6B6B] hover:underline"
                      >
                        Clear All
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {/* Group filters by groupId for display */}
                      {(() => {
                        const groupedFilters: Record<string, string[]> = {};
                        values.filters.forEach(f => {
                          if (!groupedFilters[f.groupId]) {
                            groupedFilters[f.groupId] = [];
                          }
                          groupedFilters[f.groupId].push(f.valueId);
                        });
                        
                        return Object.entries(groupedFilters).map(([groupId, valueIds]) => (
                          <div key={groupId} className="flex items-center gap-1 bg-[#F7F8F810] rounded-[7px] px-2 py-1">
                            <span className="text-xs text-[#F7F8F8B2]">
                              {getFilterGroupName(groupId)}:
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {valueIds.map(valueId => (
                                <span
                                  key={valueId}
                                  className="inline-flex items-center gap-1 bg-[#4DCE9430] text-[#4DCE94] text-xs px-2 py-0.5 rounded"
                                >
                                  {getFilterValueName(groupId, valueId)}
                                  <button
                                    type="button"
                                    onClick={() => toggleFilterValue(values.filters, setFieldValue, groupId, valueId)}
                                    className="hover:text-[#FF6B6B] transition-colors"
                                  >
                                    ×
                                  </button>
                                </span>
                              ))}
                            </div>
                          </div>
                        ));
                      })()}
                    </div>
                  </div>
                )}

                {/* Filter Groups List */}
                <div className="space-y-3">
                  {filterGroups.length === 0 ? (
                    <div className="text-center py-8 border border-[#F7F8F81C] rounded-[7px] bg-[#F7F8F805]">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="mx-auto mb-3">
                        <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke="#F7F8F870" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <p className="text-[#F7F8F8B2]">No filter groups available</p>
                      <p className="text-xs text-[#F7F8F870] mt-1">
                        Create filter groups in the Filters section first
                      </p>
                    </div>
                  ) : (
                    filterGroups.map((group) => {
                      const isExpanded = expandedGroups.has(group._id);
                      const selectedCount = getSelectedValuesForGroup(values.filters, group._id).length;
                      const groupValues = filterValues[group._id] || [];
                      const isLoadingValues = loadingFilterValues[group._id];

                      return (
                        <div
                          key={group._id}
                          className={`border rounded-[7px] overflow-hidden transition-all ${
                            selectedCount > 0
                              ? "border-[#4DCE9440] bg-[#4DCE9408]"
                              : "border-[#F7F8F81C] bg-[#F7F8F805]"
                          }`}
                        >
                          {/* Group Header */}
                          <button
                            type="button"
                            onClick={() => toggleGroupExpansion(group._id)}
                            className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#F7F8F810] transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                className={`transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
                              >
                                <path
                                  d="M9 18L15 12L9 6"
                                  stroke="#F7F8F8B2"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <span className="font-medium text-white">{group.name}</span>
                              {selectedCount > 0 && (
                                <span className="bg-[#4DCE94] text-black text-xs font-semibold px-2 py-0.5 rounded-full">
                                  {selectedCount}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              {group.name && (
                                <span className="text-xs text-[#F7F8F870] max-w-[200px] truncate hidden sm:block">
                                  {group.name}
                                </span>
                              )}
                              {selectedCount > 0 && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeAllGroupValues(values.filters, setFieldValue, group._id);
                                  }}
                                  className="text-xs text-[#FF6B6B] hover:underline px-2"
                                >
                                  Clear
                                </button>
                              )}
                            </div>
                          </button>

                          {/* Group Values */}
                          {isExpanded && (
                            <div className="border-t border-[#F7F8F81C] px-4 py-3">
                              {isLoadingValues ? (
                                <div className="flex items-center justify-center py-4">
                                  <svg className="animate-spin h-5 w-5 text-[#4DCE94]" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                  </svg>
                                  <span className="ml-2 text-sm text-[#F7F8F8B2]">Loading values...</span>
                                </div>
                              ) : groupValues.length === 0 ? (
                                <div className="text-center py-4">
                                  <p className="text-sm text-[#F7F8F870]">No values available for this filter</p>
                                </div>
                              ) : (
                                <div className="flex flex-wrap gap-2">
                                  {groupValues.map((value) => {
                                    const isSelected = isFilterValueSelected(values.filters, group._id, value._id);
                                    
                                    return (
                                      <button
                                        key={value._id}
                                        type="button"
                                        onClick={() => toggleFilterValue(values.filters, setFieldValue, group._id, value._id)}
                                        className={`px-3 py-1.5 rounded-[7px] text-sm transition-all ${
                                          isSelected
                                            ? "bg-gradient-to-r from-[#75DA5B] to-[#4DCE94] text-black font-medium"
                                            : "border border-[#F7F8F81C] bg-[#F7F8F80A] text-[#F7F8F8B2] hover:bg-[#F7F8F815] hover:border-[#F7F8F830]"
                                        }`}
                                      >
                                        <span className="flex items-center gap-1.5">
                                          {isSelected && (
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                                              <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                          )}
                                          {value.label}
                                        </span>
                                      </button>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Quick Actions */}
                {filterGroups.length > 0 && (
                  <div className="flex items-center justify-between pt-4 border-t border-[#F7F8F81C]">
                    <button
                      type="button"
                      onClick={() => {
                        // Expand all groups and load their values
                        const allGroupIds = new Set(filterGroups.map(g => g._id));
                        setExpandedGroups(allGroupIds);
                        filterGroups.forEach(g => fetchFilterValuesForGroup(g._id));
                      }}
                      className="text-sm text-[#4DCE94] hover:underline"
                    >
                      Expand All Groups
                    </button>
                    <button
                      type="button"
                      onClick={() => setExpandedGroups(new Set())}
                      className="text-sm text-[#F7F8F8B2] hover:underline"
                    >
                      Collapse All
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Attributes Tab */}
            {activeTab === "attributes" && (
              <div className="border border-[#F7F8F81A] p-[20px] rounded-[7px] bg-[#F7F8F80A] space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Product Attributes</h3>
                    <p className="text-sm text-[#F7F8F8B2]">Add custom key-value specifications</p>
                  </div>
                </div>

                <FieldArray name="attributes">
                  {({ push, remove }) => (
                    <div className="space-y-4">
                      {values.attributes.map((attr, index) => (
                        <div key={index} className="flex gap-3 items-start">
                          <div className="flex-1">
                            <Field
                              name={`attributes.${index}.key`}
                              placeholder="Key (e.g., Brand, Year)"
                              className="w-full border border-[#F7F8F81C] bg-transparent rounded-[7px] text-[#F7F8F8] text-sm px-4 py-3 placeholder:text-[#F7F8F870] focus-visible:outline-0 focus-visible:border-[#ffffff80]"
                            />
                            <ErrorMessage
                              name={`attributes.${index}.key`}
                              component="div"
                              className="text-red-500 text-xs mt-1"
                            />
                          </div>
                          <div className="flex-1">
                            <Field
                              name={`attributes.${index}.value`}
                              placeholder="Value (e.g., Panini, 2024)"
                              className="w-full border border-[#F7F8F81C] bg-transparent rounded-[7px] text-[#F7F8F8] text-sm px-4 py-3 placeholder:text-[#F7F8F870] focus-visible:outline-0 focus-visible:border-[#ffffff80]"
                            />
                            <ErrorMessage
                              name={`attributes.${index}.value`}
                              component="div"
                              className="text-red-500 text-xs mt-1"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="border border-[#FF6B6B] text-[#FF6B6B] rounded-[7px] p-3 hover:bg-[#FF6B6B20] transition-colors"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() => push({ key: "", value: "" })}
                        className="flex items-center gap-2 border border-[#4DCE94] text-[#4DCE94] rounded-[7px] px-4 py-2 text-sm hover:bg-[#4DCE9420] transition-colors"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Add Attribute
                      </button>

                      {/* Common Attributes Quick Add */}
                      <div className="border-t border-[#F7F8F81C] pt-4 mt-4">
                        <p className="text-sm text-[#F7F8F8B2] mb-3">Quick Add Common Attributes:</p>
                        <div className="flex flex-wrap gap-2">
                          {["Brand", "Year", "Card Number", "Team", "Player", "Set", "Parallel", "Serial Number"].map((attr) => (
                            <button
                              key={attr}
                              type="button"
                              onClick={() => {
                                if (!values.attributes.find(a => a.key === attr)) {
                                  push({ key: attr, value: "" });
                                }
                              }}
                              disabled={values.attributes.some(a => a.key === attr)}
                              className="border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] px-3 py-1.5 text-xs text-[#F7F8F8B2] hover:bg-[#F7F8F815] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              + {attr}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </FieldArray>
              </div>
            )}

            {/* Grading Tab */}
            {activeTab === "grading" && (
              <div className="border border-[#F7F8F81A] p-[20px] rounded-[7px] bg-[#F7F8F80A] space-y-6">
                <div>
                  <h3 className="text-lg font-semibold">Grading Information</h3>
                  <p className="text-sm text-[#F7F8F8B2]">Add professional grading details if applicable</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Grader */}
                  <div>
                    <label className="block text-sm font-medium text-[#F7F8F8B2] mb-2">
                      Grading Company
                    </label>
                    <Field
                      as="select"
                      name="grading.grader"
                      className="w-full border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] text-[#F7F8F8B2] text-sm px-4 py-3 focus-visible:outline-0"
                    >
                      {graderOptions.map((opt) => (
                        <option key={opt.value} value={opt.value} className="bg-[#1a1a1a]">
                          {opt.label}
                        </option>
                      ))}
                    </Field>
                  </div>

                  {/* Grade */}
                  <div>
                    <label className="block text-sm font-medium text-[#F7F8F8B2] mb-2">
                      Grade
                    </label>
                    <Field
                      type="text"
                      name="grading.grade"
                      placeholder="e.g., 10, 9.5, MINT 9"
                      className="w-full border border-[#F7F8F81C] bg-transparent rounded-[7px] text-[#F7F8F8] text-sm px-4 py-3 placeholder:text-[#F7F8F870] focus-visible:outline-0 focus-visible:border-[#ffffff80]"
                    />
                  </div>

                  {/* Certification Number */}
                  <div>
                    <label className="block text-sm font-medium text-[#F7F8F8B2] mb-2">
                      Certification Number
                    </label>
                    <Field
                      type="text"
                      name="grading.cert_number"
                      placeholder="e.g., 12345678"
                      className="w-full border border-[#F7F8F81C] bg-transparent rounded-[7px] text-[#F7F8F8] text-sm px-4 py-3 placeholder:text-[#F7F8F870] focus-visible:outline-0 focus-visible:border-[#ffffff80]"
                    />
                  </div>

                  {/* Population */}
                  <div>
                    <label className="block text-sm font-medium text-[#F7F8F8B2] mb-2">
                      Population
                    </label>
                    <Field
                      type="number"
                      name="grading.population"
                      placeholder="Population count"
                      min="0"
                      className="w-full border border-[#F7F8F81C] bg-transparent rounded-[7px] text-[#F7F8F8] text-sm px-4 py-3 placeholder:text-[#F7F8F870] focus-visible:outline-0 focus-visible:border-[#ffffff80]"
                    />
                  </div>
                </div>

                {/* Grading Preview */}
                {values.grading.grader && values.grading.grade && (
                  <div className="border border-[#4DCE9440] bg-[#4DCE9410] rounded-[7px] p-4">
                    <p className="text-sm text-[#F7F8F8B2] mb-2">Grade Preview:</p>
                    <div className="flex items-center gap-3">
                      <span className="bg-gradient-to-r from-[#75DA5B] to-[#4DCE94] text-black font-bold px-4 py-2 rounded-[7px]">
                        {values.grading.grader} {values.grading.grade}
                      </span>
                      {values.grading.cert_number && (
                        <span className="text-sm text-[#F7F8F870]">
                          Cert #{values.grading.cert_number}
                        </span>
                      )}
                      {values.grading.population && (
                        <span className="text-sm text-[#F7F8F870]">
                          Pop: {values.grading.population}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* SEO Tab */}
            {activeTab === "seo" && (
              <div className="border border-[#F7F8F81A] p-[20px] rounded-[7px] bg-[#F7F8F80A] space-y-6">
                <div>
                  <h3 className="text-lg font-semibold">SEO Settings</h3>
                  <p className="text-sm text-[#F7F8F8B2]">Optimize for search engines</p>
                </div>

                {/* Meta Title */}
                <div>
                  <label className="block text-sm font-medium text-[#F7F8F8B2] mb-2">
                    Meta Title
                    <span className="text-xs text-[#F7F8F870] ml-2">
                      ({values.meta_title?.length || 0}/60)
                    </span>
                  </label>
                  <Field
                    type="text"
                    name="meta_title"
                    placeholder="Enter meta title (auto-generated from name if empty)"
                    maxLength={60}
                    className="w-full border border-[#F7F8F81C] bg-transparent rounded-[7px] text-[#F7F8F8] text-sm px-4 py-3 placeholder:text-[#F7F8F870] focus-visible:outline-0 focus-visible:border-[#ffffff80]"
                  />
                  <ErrorMessage name="meta_title" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                {/* Meta Description */}
                <div>
                  <label className="block text-sm font-medium text-[#F7F8F8B2] mb-2">
                    Meta Description
                    <span className="text-xs text-[#F7F8F870] ml-2">
                      ({values.meta_description?.length || 0}/160)
                    </span>
                  </label>
                  <Field
                    as="textarea"
                    name="meta_description"
                    rows={3}
                    placeholder="Enter meta description (auto-generated from description if empty)"
                    maxLength={160}
                    className="w-full border border-[#F7F8F81C] bg-transparent rounded-[7px] text-[#F7F8F8] text-sm px-4 py-3 placeholder:text-[#F7F8F870] focus-visible:outline-0 focus-visible:border-[#ffffff80] resize-none"
                  />
                  <ErrorMessage name="meta_description" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                {/* SEO Preview */}
                <div className="border border-[#F7F8F81C] rounded-[7px] p-4 bg-[#F7F8F805]">
                  <p className="text-xs text-[#F7F8F870] mb-3">Search Preview:</p>
                  <div className="space-y-1">
                    <p className="text-[#8ab4f8] text-lg truncate">
                      {values.meta_title || values.name || "Asset Title"}
                    </p>
                    <p className="text-[#bdc1c6] text-sm">
                      www.yoursite.com/assets/{asset?.slug || "asset-slug"}
                    </p>
                    <p className="text-[#9aa0a6] text-sm line-clamp-2">
                      {values.meta_description || values.description || "Asset description will appear here..."}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center flex-wrap justify-between gap-[20px] mt-8 pt-6 border-t border-[#F7F8F81C]">
              <div className="flex items-center flex-wrap gap-[15px]">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex gap-2 items-center bg-gradient-to-r from-[#75DA5B] to-[#4DCE94] rounded-[7px] text-black font-semibold px-6 py-3 text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      {mode === "add" ? "Creating..." : "Saving..."}
                    </>
                  ) : mode === "add" ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Create Asset
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16L21 8V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M17 21V13H7V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7 3V8H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Save Changes
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  className="border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] font-semibold px-6 py-3 text-sm hover:bg-[#F7F8F815] transition-colors"
                >
                  Cancel
                </button>
              </div>

              {mode === "edit" && (
                <button
                  type="button"
                  onClick={handleRemoveAsset}
                  className="border border-[#FF6B6B] text-[#fff] bg-[#FF6B6B] rounded-[7px] font-semibold px-6 py-3 text-sm hover:bg-[#FF6B6B25] hover:text-[#FF6B6B] transition-colors"
                >
                  Delete Asset
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}