"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "sonner";
import axiosWrapper from "@/utils/api";
import { CATEGORY_API } from "@/utils/apiUrl";
import { CategorySchema } from "@/components/schemas/categorySchema";
import { Category, CategoryFormValues } from "@/types/category/category";
import { CategoryEditPageSkeleton } from "@/components/skeleton-loading/PageSkeletons";
import { useAuthStore } from "@/components/store/useAuthStore";

interface Option {
  value: string;
  label: string;
}

interface CategoryFormPageProps {
  mode: "add" | "edit";
  categoryId?: string;
}

const statusOptions: Option[] = [
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
];

type ApiResponse = {
  result?: string;
  desc?: string;
  data?: any;
  message?: string;
};

export default function CategoryFormPage({ mode, categoryId }: CategoryFormPageProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(mode === "edit");
  const [category, setCategory] = useState<Category | null>(null);
  const [dragActive, setDragActive] = useState(false);
    const token = useAuthStore.getState().getToken();
  // For file handling
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const initialValues: CategoryFormValues = {
    name: category?.name || "",
    description: category?.description || "",
    icon: category?.icon || "",
    status: category?.status || "ACTIVE",
  };

  useEffect(() => {
    if (mode === "edit" && categoryId) {
      fetchCategory();
    }
  }, [mode, categoryId]);

  // Set preview URL when category is loaded (for edit mode)
  useEffect(() => {
    if (category?.icon) {
      setPreviewUrl(category.icon);
    }
  }, [category]);

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const fetchCategory = async () => {
    try {
      setIsLoading(true);
      const response: any = await axiosWrapper(
        "get",
        CATEGORY_API.GET_CATEGORY_BY_ID(categoryId!),
        {},
        token??undefined
      );

      if (response?.result === "error") {
        toast.error(response?.desc || "Failed to fetch category");
        router.push("/admin/categories");
        return;
      }

      const data = response?.data || response;
      setCategory(data);
    } catch (error: any) {
      toast.error(error?.message || "Failed to fetch category");
      router.push("/admin/categories");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle file selection
  const handleFileSelect = (file: File) => {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (PNG, JPG, GIF, SVG)");
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("File size must be less than 5MB");
      return;
    }

    // Revoke old preview URL if exists
    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    // Set selected file and create preview
    setSelectedFile(file);
    const newPreviewUrl = URL.createObjectURL(file);
    setPreviewUrl(newPreviewUrl);
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  // Handle drag events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  // Handle remove image
  const handleRemoveImage = (setFieldValue: any) => {
    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setFieldValue("icon", "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle click on upload area
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };


const handleSubmit = async (values: CategoryFormValues, { setSubmitting }: any) => {
  try {
    const formData = new FormData();

    formData.append("name", values.name.trim());
    formData.append("status", values.status);

    if (values.description?.trim()) {
      formData.append("description", values.description.trim());
    }

    if (selectedFile instanceof File) {
      formData.append("icon", selectedFile);
    }

    let response: ApiResponse;

    if (mode === "add") {
      response = await axiosWrapper(
        "post",
        CATEGORY_API.CREATE_CATEGORY,
        formData,
        token ?? undefined,
        true
      ) as ApiResponse;
    } else {
      response = await axiosWrapper(
        "put",
        CATEGORY_API.UPDATE_CATEGORY(categoryId!),
        formData,
        token ?? undefined,
        true
      ) as ApiResponse;
    }

    if (response?.result === "error") {
      toast.error(response?.desc || `Failed to ${mode} category`);
      return;
    }

    toast.success(mode === "add" ? "Category created!" : "Category updated!");

    router.push("/admin/categories");

  } catch (error: any) {
    toast.error(error?.desc || error?.message || "Something went wrong");
  } finally {
    setSubmitting(false);
  }
};


  const handleCancel = () => {
    router.push("/admin/categories");
  };

  const handleRemoveCategory = async () => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      const response: any = await axiosWrapper(
        "delete",
        CATEGORY_API.DELETE_CATEGORY(categoryId!)
      );

      if (response?.result === "error") {
        toast.error(response?.desc || "Failed to delete category");
        return;
      }

      toast.success("Category deleted successfully");
      router.push("/admin/categories");
    } catch (error: any) {
      toast.error(error?.message || "Failed to delete category");
    }
  };

  // Show skeleton while loading
  if (isLoading) {
    return <CategoryEditPageSkeleton />;
  }

  return (
    <div className="min-h-screen">
      <div className="">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href="/admin/categories"
              className="border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] p-2 hover:bg-[#F7F8F815] transition-colors"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
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
              <h1 className="text-2xl font-bold text-white">
                {mode === "add" ? "Add New Category" : "Edit Category"}
              </h1>
              <p className="text-[#F7F8F8B2]">
                {mode === "add"
                  ? "Create a new category for your products"
                  : "Update category information"}
              </p>
            </div>
          </div>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={CategorySchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form>
              {/* Category Preview Card */}
              <div className="mb-8">
                <div className="border border-[#F7F8F81A] bg-[#F7F8F80A] rounded-[7px] p-[20px] flex gap-[20px] items-center">
                  <div className="relative border border-[#F7F8F81C] rounded-[7px] py-[15px] px-[20px] bg-[#F7F8F80A]">
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Category Icon"
                        className="w-[40px] lg:w-[60px] h-[40px] lg:h-[60px] object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="w-[40px] lg:w-[60px] h-[40px] lg:h-[60px] flex items-center justify-center">
                        <svg
                          width="40"
                          height="40"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4 4H10V10H4V4Z"
                            stroke="#F7F8F870"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M14 4H20V10H14V4Z"
                            stroke="#F7F8F870"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M4 14H10V20H4V14Z"
                            stroke="#F7F8F870"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M14 14H20V20H14V14Z"
                            stroke="#F7F8F870"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div>
                    <h2 className="text-[16px] md:text-[18px] lg:text-[20px] leading-[1.2] font-semibold max-w-[400px] mb-[5px]">
                      {values.name || "Category Name"}
                    </h2>
                    {category?.slug && (
                      <p className="text-sm text-[#F7F8F870]">
                        Slug:{" "}
                        <code className="bg-[#F7F8F80A] px-2 py-0.5 rounded">
                          {category.slug}
                        </code>
                      </p>
                    )}
                    {mode === "edit" && category?.createdAt && (
                      <p className="text-sm text-[#F7F8F870] mt-1">
                        Created:{" "}
                        {new Date(category.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Icon Upload Section */}
              <div className="border border-[#F7F8F81C] rounded-[7px] p-[20px] bg-[#F7F8F80A] mb-8">
                <h3 className="text-lg font-semibold mb-4">Category Icon</h3>

                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {previewUrl ? (
                  // Image Preview with Change/Remove options
                  <div className="border border-[#F7F8F81C] rounded-[7px] p-4 bg-[#F7F8F80A]">
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="relative border border-[#F7F8F81C] rounded-[7px] p-3 bg-[#F7F8F80A]">
                        <img
                          src={previewUrl}
                          alt="Category Icon"
                          className="w-20 h-20 object-contain rounded-[7px]"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[#F7F8F8] mb-1">
                          {selectedFile?.name || "Current image"}
                        </p>
                        {selectedFile && (
                          <p className="text-xs text-[#F7F8F870]">
                            Size: {(selectedFile.size / 1024).toFixed(2)} KB
                          </p>
                        )}
                        {!selectedFile && category?.icon && (
                          <p className="text-xs text-[#F7F8F870] truncate max-w-[300px]">
                            {category.icon}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={handleUploadClick}
                          className="border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] py-[8px] px-[15px] text-sm hover:bg-[#F7F8F815] transition-colors"
                        >
                          Change
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(setFieldValue)}
                          className="border border-[#FF6B6B] bg-[#FF6B6B20] rounded-[7px] py-[8px] px-[15px] text-sm text-[#FF6B6B] hover:bg-[#FF6B6B30] transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Upload Area with Drag & Drop
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={handleUploadClick}
                    className={`
                      cursor-pointer border-2 border-dashed rounded-[7px] p-[30px] transition-all duration-300
                      ${dragActive
                        ? "border-[#4DCE94] bg-[#4DCE9415]"
                        : "border-[#F7F8F81C] bg-[#F7F8F80A] hover:bg-[#F7F8F80E] hover:border-[#F7F8F830]"
                      }
                    `}
                  >
                    <div className="flex flex-col items-center justify-center gap-[15px]">
                      <div className="border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] py-[8px] px-[20px]">
                        <span className="text-[#F7F8F8B2] text-sm">Select To Upload</span>
                      </div>

                      {/* Upload Icon */}
                      <div className="p-2">
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                            stroke="#F7F8F8"
                            strokeOpacity="0.7"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M17 8L12 3L7 8"
                            stroke="#F7F8F8"
                            strokeOpacity="0.7"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 3V15"
                            stroke="#F7F8F8"
                            strokeOpacity="0.7"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>

                      <p className="text-[#F7F8F8B2] text-sm">
                        or drag your image here
                      </p>

                      <p className="text-xs text-[#F7F8F870]">
                        PNG, JPG, GIF, SVG (max. 5MB)
                      </p>
                    </div>
                  </div>
                )}

                <ErrorMessage
                  name="icon"
                  component="div"
                  className="text-red-500 text-xs mt-2"
                />
              </div>

              {/* Form Fields */}
              <div className="border border-[#F7F8F81A] p-[20px] rounded-[7px] bg-[#F7F8F80A]">
                <div className="text-lg font-semibold mb-4">Category Information</div>

                <div className="space-y-6">
                  {/* Category Name */}
                  <div>
                    <label className="block text-sm font-medium text-[#F7F8F8B2] mb-2">
                      Category Name *
                    </label>
                    <Field
                      type="text"
                      name="name"
                      placeholder="Enter category name"
                      className="w-full border border-[#F7F8F81C] hover:bg-[#F7F8F80A] duration-300 bg-transparent rounded-[7px] text-[#F7F8F8] text-sm px-4 py-3 placeholder:text-[#F7F8F8B2] focus-visible:outline-0 focus-visible:border focus-visible:border-[#ffffff80]"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-sm font-medium text-[#F7F8F8B2] mb-2">
                      Status *
                    </label>
                    <div className="flex gap-4">
                      {statusOptions.map((option) => (
                        <label
                          key={option.value}
                          className={`flex items-center gap-2 cursor-pointer border rounded-[7px] px-4 py-3 transition-colors ${
                            values.status === option.value
                              ? "border-[#4DCE94] bg-[#4DCE9420]"
                              : "border-[#F7F8F81C] bg-[#F7F8F80A] hover:bg-[#F7F8F815]"
                          }`}
                        >
                          <Field
                            type="radio"
                            name="status"
                            value={option.value}
                            className="hidden"
                          />
                          <div
                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                              values.status === option.value
                                ? "border-[#4DCE94]"
                                : "border-[#F7F8F870]"
                            }`}
                          >
                            {values.status === option.value && (
                              <div className="w-2 h-2 rounded-full bg-[#4DCE94]" />
                            )}
                          </div>
                          <span
                            className={
                              values.status === option.value
                                ? "text-[#4DCE94]"
                                : "text-[#F7F8F8B2]"
                            }
                          >
                            {option.label}
                          </span>
                        </label>
                      ))}
                    </div>
                    <ErrorMessage
                      name="status"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
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
                      placeholder="Enter category description (optional)"
                      className="w-full border border-[#F7F8F81C] hover:bg-[#F7F8F80A] duration-300 bg-transparent rounded-[7px] text-[#F7F8F8] text-sm px-4 py-3 placeholder:text-[#F7F8F8B2] focus-visible:outline-0 focus-visible:border focus-visible:border-[#ffffff80] resize-none"
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center flex-wrap justify-between gap-[20px] pt-4">
                    <div className="flex items-center flex-wrap gap-[20px]">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex gap-2 items-center bg-gradient-to-r from-[#75DA5B] to-[#4DCE94] rounded-[7px] text-black font-semibold md:px-6 px-3 py-3 text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                            {mode === "add" ? "Creating..." : "Saving..."}
                          </>
                        ) : mode === "add" ? (
                          "Create Category"
                        ) : (
                          "Save Changes"
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={handleCancel}
                        className="border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] font-semibold md:px-6 px-3 py-3 text-sm hover:bg-[#F7F8F815] transition-colors"
                      >
                        Cancel
                      </button>
                    </div>

                    {mode === "edit" && (
                      <button
                        type="button"
                        onClick={handleRemoveCategory}
                        className="border border-[#FF6B6B] text-[#fff] duration-400 bg-[#FF6B6B] rounded-[7px] font-semibold md:px-6 px-3 py-3 text-sm hover:bg-[#FF6B6B25] hover:text-[#FF6B6B] transition-colors"
                      >
                        Remove Category
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}