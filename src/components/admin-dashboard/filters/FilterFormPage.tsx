// components/admin-dashboard/filters/FilterFormPage.tsx

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "sonner";
import axiosWrapper from "@/utils/api";
import { FILTER_GROUP_API, FILTER_VALUE_API } from "@/utils/apiUrl";
import { FilterGroupSchema } from "@/components/schemas/filterSchema";
import { FilterGroup, FilterGroupFormValues, FilterValue } from "@/types/filter/filter";
import { useAuthStore } from "@/components/store/useAuthStore";

interface FilterFormPageProps {
  mode: "add" | "edit";
  filterId?: string;
}

interface Option {
  value: string;
  label: string;
}

const statusOptions: Option[] = [
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
];
const typeOptions: Option[] = [
  { value: "single", label: "Single Select" },
  { value: "multi", label: "Multi Select" },
];


type ApiResponse = {
  result?: string;
  desc?: string;
  data?: any;
  message?: string;
};

export default function FilterFormPage({ mode, filterId }: FilterFormPageProps) {
  const router = useRouter();
  const token = useAuthStore.getState().getToken();

  const [isLoading, setIsLoading] = useState(mode === "edit");
  const [filterGroup, setFilterGroup] = useState<FilterGroup | null>(null);
  const [filterValues, setFilterValues] = useState<FilterValue[]>([]);
  const [newValues, setNewValues] = useState<{ label: string; valueKey: string }[]>([]);

  const initialValues: FilterGroupFormValues = {
    name: filterGroup?.name || "",
    slug: filterGroup?.slug || "",
    type: filterGroup?.type || "single", // Default to 'single' as per backend enum
    required: filterGroup?.required || false,
    status: filterGroup?.status || "ACTIVE",
    protected: filterGroup?.protected || false,
    order: filterGroup?.order || 0,
  };

  useEffect(() => {
    if (mode === "edit" && filterId) {
      fetchFilterGroup();
      fetchFilterValues();
    }
  }, [mode, filterId]);

  const fetchFilterGroup = async () => {
    try {
      setIsLoading(true);
      const response: any = await axiosWrapper(
        "get",
        FILTER_GROUP_API.GET_BY_ID(filterId!),
        {},
        token ?? undefined
      );

      if (response?.result === "error") {
        toast.error(response?.desc || "Failed to fetch filter group");
        router.push("/admin/filters");
        return;
      }

      const data = response?.data || response;
      console.log("Fetched filter group data:", data);

      // FIX: convert all object ids to string & validate fields
      const normalized = {
        ...data,
        _id: data?._id?.toString(),
        status: data?.status || "ACTIVE",
        type: data?.type || "single",
        required: Boolean(data?.required),
        protected: Boolean(data?.protected),
        order: Number(data?.order ?? 0),
      };
      setFilterGroup(normalized);
    } catch (error: any) {
      toast.error(error?.message || "Failed to fetch filter group");
      router.push("/admin/filters");
    } finally {
      setIsLoading(false);
    }
  };


  const fetchFilterValues = async () => {
    try {
      const response: any = await axiosWrapper(
        "get",
        FILTER_VALUE_API.GET_ALL,
        { groupId: filterId, limit: 100, sortBy: 'order', order: 'asc' },
        token ?? undefined
      );
      console.log("Fetched filter values response:", response);
      if (response?.result !== "error") {
        const data = response?.data || response;
        const rawValues = data?.data || [];

        const normalizedValues = rawValues.map((item: any) => ({
          ...item,
          groupId: item.groupId?._id?.toString() ?? item.groupId,
          _id: item._id?.toString(),
          label: item.label || "",
          valueKey: item.valueKey || ""
        }));

        setFilterValues(normalizedValues);

      }
    } catch (error: any) {
      console.error("Failed to fetch filter values:", error);
    }
  };

  const handleSubmit = async (values: FilterGroupFormValues, { setSubmitting }: any) => {
    try {
      const payload = {
        name: values.name.trim(),
        type: values.type, // Always send 'single' as default type
        required: values.required,
        status: values.status,
        protected: values.protected,
        order: values.order || 0,
      };

      if (values.slug?.trim()) {
        (payload as any).slug = values.slug.trim();
      }

      let response: ApiResponse;
      let groupId = filterId;

      if (mode === "add") {
        response = await axiosWrapper(
          "post",
          FILTER_GROUP_API.CREATE,
          payload,
          token ?? undefined
        ) as ApiResponse;
        
        if (response?.data?._id) {
          groupId = response.data._id;
        }
      } else {
        response = await axiosWrapper(
          "put",
          FILTER_GROUP_API.UPDATE(filterId!),
          payload,
          token ?? undefined
        ) as ApiResponse;
      }

      if (response?.result === "error") {
        toast.error(response?.desc || `Failed to ${mode} filter group`);
        return;
      }

      // Create new values if any
      if (newValues.length > 0 && groupId) {
        for (const value of newValues) {
          if (value.label.trim() && value.valueKey.trim()) {
            await axiosWrapper(
              "post",
              FILTER_VALUE_API.CREATE,
              {
                groupId,
                label: value.label.trim(),
                valueKey: value.valueKey.trim(),
                status: 'ACTIVE',
                order: filterValues.length + newValues.indexOf(value)
              },
              token ?? undefined
            );
          }
        }
      }

      toast.success(mode === "add" ? "Filter group created!" : "Filter group updated!");
      router.push("/admin/filters");
    } catch (error: any) {
      toast.error(error?.desc || error?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push("/admin/filters");
  };

  const handleRemoveFilterGroup = async () => {
    if (!confirm("Are you sure you want to delete this filter group? All associated values will also be deleted.")) return;

    try {
      const response: any = await axiosWrapper(
        "delete",
        FILTER_GROUP_API.DELETE(filterId!),
        {},
        token ?? undefined
      );

      if (response?.result === "error") {
        toast.error(response?.desc || "Failed to delete filter group");
        return;
      }

      toast.success("Filter group deleted successfully");
      router.push("/admin/filters");
    } catch (error: any) {
      toast.error(error?.message || "Failed to delete filter group");
    }
  };

  const addNewValue = () => {
    setNewValues([...newValues, { label: '', valueKey: '' }]);
  };

  const updateNewValue = (index: number, field: 'label' | 'valueKey', value: string) => {
    const updated = [...newValues];
    updated[index][field] = value;
    
    // Auto-generate valueKey from label if valueKey is empty
    if (field === 'label') {
      updated[index].valueKey = value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }
    
    setNewValues(updated);
  };

  const removeNewValue = (index: number) => {
    setNewValues(newValues.filter((_, i) => i !== index));
  };

  // Skeleton Loading
  if (isLoading) {
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
        <div className="border border-[#F7F8F81A] p-[20px] rounded-[7px] bg-[#F7F8F80A]">
          <div className="h-6 bg-[#ffffff20] rounded w-40 mb-6"></div>
          <div className="space-y-6">
            {Array.from({ length: 4 }).map((_, i) => (
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

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link
            href="/admin/filters"
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
              {mode === "add" ? "Add New Filter Group" : "Edit Filter Group"}
            </h1>
            <p className="text-[#F7F8F8B2]">
              {mode === "add"
                ? "Create a new filter group for your products"
                : "Update filter group information"}
            </p>
          </div>
        </div>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={FilterGroupSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            {/* Preview Card */}
            <div className="mb-8">
              <div className="border border-[#F7F8F81A] bg-[#F7F8F80A] rounded-[7px] p-[20px]">
                <div className="flex items-center gap-4">
                  <div className="border border-[#F7F8F81C] rounded-[7px] p-4 bg-[#F7F8F80A]">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                      <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke="#F7F8F870" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      {values.name || "Filter Group Name"}
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-[#4A90D9] text-white">
                        Checkbox Filter
                      </span>
                      {values.required && (
                        <span className="text-xs text-[#FF6B6B]">Required</span>
                      )}
                      {filterGroup?.slug && (
                        <code className="bg-[#F7F8F80A] px-2 py-0.5 rounded text-xs text-[#F7F8F870]">
                          {filterGroup.slug}
                        </code>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="border border-[#F7F8F81A] p-[20px] rounded-[7px] bg-[#F7F8F80A] mb-8">
              <div className="text-lg font-semibold mb-4">Filter Group Information</div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-[#F7F8F8B2] mb-2">
                    Group Name *
                  </label>
                  <Field
                    type="text"
                    name="name"
                    placeholder="e.g., Color, Size, Brand"
                    className="w-full border border-[#F7F8F81C] hover:bg-[#F7F8F80A] duration-300 bg-transparent rounded-[7px] text-[#F7F8F8] text-sm px-4 py-3 placeholder:text-[#F7F8F8B2] focus-visible:outline-0 focus-visible:border focus-visible:border-[#ffffff80]"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-sm font-medium text-[#F7F8F8B2] mb-2">
                    Slug (auto-generated if empty)
                  </label>
                  <Field
                    type="text"
                    name="slug"
                    placeholder="e.g., color, size, brand"
                    className="w-full border border-[#F7F8F81C] hover:bg-[#F7F8F80A] duration-300 bg-transparent rounded-[7px] text-[#F7F8F8] text-sm px-4 py-3 placeholder:text-[#F7F8F8B2] focus-visible:outline-0 focus-visible:border focus-visible:border-[#ffffff80]"
                  />
                  <ErrorMessage
                    name="slug"
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
                </div>
                {/* Type */}
                <div>
                  <label className="block text-sm font-medium text-[#F7F8F8B2] mb-2">
                    Filter Type *
                  </label>
                  <div className="flex gap-4">
                    {typeOptions.map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-center gap-2 cursor-pointer border rounded-[7px] px-4 py-3 transition-colors ${
                          values.type === option.value
                            ? "border-[#4DCE94] bg-[#4DCE9420]"
                            : "border-[#F7F8F81C] bg-[#F7F8F80A] hover:bg-[#F7F8F815]"
                        }`}
                      >
                        <Field
                          type="radio"
                          name="type"
                          value={option.value}
                          className="hidden"
                        />
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            values.type === option.value
                              ? "border-[#4DCE94]"
                              : "border-[#F7F8F870]"
                          }`}
                        >
                          {values.type === option.value && (
                            <div className="w-2 h-2 rounded-full bg-[#4DCE94]" />
                          )}
                        </div>
                        <span
                          className={
                            values.type === option.value
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
                    name="type"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>


                {/* Order */}
                {/* <div>
                  <label className="block text-sm font-medium text-[#F7F8F8B2] mb-2">
                    Display Order
                  </label>
                  <Field
                    type="number"
                    name="order"
                    min="0"
                    placeholder="0"
                    className="w-full border border-[#F7F8F81C] hover:bg-[#F7F8F80A] duration-300 bg-transparent rounded-[7px] text-[#F7F8F8] text-sm px-4 py-3 placeholder:text-[#F7F8F8B2] focus-visible:outline-0 focus-visible:border focus-visible:border-[#ffffff80]"
                  />
                  <p className="text-xs text-[#F7F8F870] mt-1">Lower numbers appear first</p>
                </div> */}

                {/* Toggles */}
                <div className="space-y-4 md:col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Required Toggle */}
                    <label className="flex items-center justify-between cursor-pointer border border-[#F7F8F81C] rounded-[7px] px-4 py-3 hover:bg-[#F7F8F80A] transition-colors">
                      <div>
                        <span className="text-[#F7F8F8]">Required Filter</span>
                        <p className="text-xs text-[#F7F8F870]">User must select a value</p>
                      </div>
                      <div
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          values.required ? "bg-[#4DCE94]" : "bg-[#F7F8F81C]"
                        }`}
                        onClick={() => setFieldValue("required", !values.required)}
                      >
                        <div
                          className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                            values.required ? "translate-x-7" : "translate-x-1"
                          }`}
                        />
                      </div>
                    </label>

                    {/* Protected Toggle */}
                    <label className="flex items-center justify-between cursor-pointer border border-[#F7F8F81C] rounded-[7px] px-4 py-3 hover:bg-[#F7F8F80A] transition-colors">
                      <div>
                        <span className="text-[#F7F8F8]">Protected</span>
                        <p className="text-xs text-[#F7F8F870]">Cannot be deleted</p>
                      </div>
                      <div
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          values.protected ? "bg-[#E67E22]" : "bg-[#F7F8F81C]"
                        }`}
                        onClick={() => setFieldValue("protected", !values.protected)}
                      >
                        <div
                          className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                            values.protected ? "translate-x-7" : "translate-x-1"
                          }`}
                        />
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Values Section */}
            <div className="border border-[#F7F8F81A] p-[20px] rounded-[7px] bg-[#F7F8F80A] mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-lg font-semibold">Filter Values</div>
                  <p className="text-sm text-[#F7F8F870]">Add checkbox options that users can select</p>
                </div>
                <button
                  type="button"
                  onClick={addNewValue}
                  className="flex gap-1 items-center text-[#4DCE94] text-sm hover:underline"
                >
                  <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
                    <path d="M7.5 0.5V14.5M0.5 7.5H14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Add Value
                </button>
              </div>

              {/* Existing Values (Edit Mode) */}
              {mode === 'edit' && filterValues.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm text-[#F7F8F8B2] mb-2">Existing Values:</p>
                  <div className="space-y-2">
                    {filterValues.map((value) => (
                      <div
                        key={value._id}
                        className="flex items-center justify-between bg-[#F7F8F81C] rounded-[7px] px-4 py-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 border-2 border-[#F7F8F870] rounded"></div>
                          <div>
                            <span className="text-white">{value.label}</span>
                            <span className="text-[#F7F8F870] text-sm ml-2">({value.valueKey})</span>
                          </div>
                        </div>
                        <Link
                          href={`/admin/filters/values/edit/${value._id}`}
                          className="text-[#4DCE94] text-sm hover:underline"
                        >
                          Edit
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New Values */}
              {newValues.length > 0 && (
                <div className="space-y-3">
                  <p className="text-sm text-[#F7F8F8B2]">New Values:</p>
                  {newValues.map((value, index) => (
                    <div key={index} className="flex gap-3 items-start">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={value.label}
                          onChange={(e) => updateNewValue(index, 'label', e.target.value)}
                          placeholder="Label (e.g., Red, Small, Nike)"
                          className="w-full border border-[#F7F8F81C] hover:bg-[#F7F8F80A] duration-300 bg-transparent rounded-[7px] text-[#F7F8F8] text-sm px-4 py-3 placeholder:text-[#F7F8F8B2] focus-visible:outline-0 focus-visible:border focus-visible:border-[#ffffff80]"
                        />
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          value={value.valueKey}
                          onChange={(e) => updateNewValue(index, 'valueKey', e.target.value)}
                          placeholder="Value Key (auto-generated)"
                          className="w-full border border-[#F7F8F81C] hover:bg-[#F7F8F80A] duration-300 bg-transparent rounded-[7px] text-[#F7F8F8] text-sm px-4 py-3 placeholder:text-[#F7F8F8B2] focus-visible:outline-0 focus-visible:border focus-visible:border-[#ffffff80]"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeNewValue(index)}
                        className="border border-[#FF6B6B] text-[#FF6B6B] rounded-[7px] p-3 hover:bg-[#FF6B6B20] transition-colors"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {filterValues.length === 0 && newValues.length === 0 && (
                <div className="text-center py-8 text-[#F7F8F870]">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="mx-auto mb-3 opacity-50">
                    <path d="M12 6V12M12 12V18M12 12H18M12 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <p>No filter values yet. Click "Add Value" to create checkbox options.</p>
                </div>
              )}
            </div>

            {/* Info Banner */}
            <div className="border border-[#4DCE9430] bg-[#4DCE9410] rounded-[7px] p-4 mb-8">
              <div className="flex items-start gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="mt-0.5">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#4DCE94" strokeWidth="2"/>
                  <path d="M12 16V12M12 8H12.01" stroke="#4DCE94" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <div>
                  <p className="text-[#4DCE94] font-medium mb-1">How Filters Work</p>
                  <p className="text-[#F7F8F8B2] text-sm">
                    Each filter group appears as a section on the frontend with checkboxes. 
                    Users can select one or more values to filter products. The display order 
                    determines where this filter appears in the sidebar.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center flex-wrap justify-between gap-[20px]">
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
                    "Create Filter Group"
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

              {mode === "edit" && !filterGroup?.protected && (
                <button
                  type="button"
                  onClick={handleRemoveFilterGroup}
                  className="border border-[#FF6B6B] text-[#fff] duration-400 bg-[#FF6B6B] rounded-[7px] font-semibold md:px-6 px-3 py-3 text-sm hover:bg-[#FF6B6B25] hover:text-[#FF6B6B] transition-colors"
                >
                  Remove Filter Group
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}