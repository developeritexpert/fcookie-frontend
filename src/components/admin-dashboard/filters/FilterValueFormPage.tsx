// components/admin-dashboard/filters/FilterValueFormPage.tsx

"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "sonner";
import axiosWrapper from "@/utils/api";
import { FILTER_GROUP_API, FILTER_VALUE_API } from "@/utils/apiUrl";
import { FilterValueSchema } from "@/components/schemas/filterSchema";
import { FilterValue, FilterValueFormValues, FilterGroup } from "@/types/filter/filter";
import { useAuthStore } from "@/components/store/useAuthStore";

interface FilterValueFormPageProps {
  mode: "add" | "edit";
  valueId?: string;
}

interface Option {
  value: string;
  label: string;
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

export default function FilterValueFormPage({ mode, valueId }: FilterValueFormPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = useAuthStore.getState().getToken();

  const groupIdFromQuery = searchParams.get('groupId');

  const [isLoading, setIsLoading] = useState(mode === "edit");
  const [filterValue, setFilterValue] = useState<FilterValue | null>(null);
const [filterGroups, setFilterGroups] = useState<FilterGroup[]>([]);
const [selectedGroup, setSelectedGroup] = useState<FilterGroup | null>(null);


const initialValues: FilterValueFormValues = {
  groupId:
    (filterValue
      ? typeof filterValue.groupId === "object"
        ? filterValue.groupId._id
        : filterValue.groupId
      : groupIdFromQuery) || "",

    label: filterValue?.label || "",
    valueKey: filterValue?.valueKey || "",
    status: filterValue?.status || "ACTIVE",
    order: filterValue?.order || 0,
  };

  useEffect(() => {
    fetchFilterGroups();
    if (mode === "edit" && valueId) {
      fetchFilterValue();
    }
  }, [mode, valueId]);

  useEffect(() => {
    let resolvedGroupId = "";

    if (mode === "edit" && filterValue) {
      resolvedGroupId =
        typeof filterValue.groupId === "object"
          ? filterValue.groupId._id
          : filterValue.groupId;
    } else if (groupIdFromQuery) {
      resolvedGroupId = groupIdFromQuery;
    }

    if (resolvedGroupId && filterGroups.length > 0) {
      const found = filterGroups.find((g) => g._id === resolvedGroupId);
      setSelectedGroup(found || null);
    }
  }, [filterGroups, filterValue, groupIdFromQuery]);


  const fetchFilterGroups = async () => {
    try {
      const response: any = await axiosWrapper(
        "get",
        FILTER_GROUP_API.GET_ALL,
        { limit: 100, status: 'ACTIVE' },
        token ?? undefined
      );

      if (response?.result !== "error") {
        const data = response?.data || response;
        setFilterGroups(data?.data || []);
      }
    } catch (error: any) {
      console.error("Failed to fetch filter groups:", error);
    }
  };

  const fetchFilterValue = async () => {
    try {
      setIsLoading(true);
      const response: any = await axiosWrapper(
        "get",
        FILTER_VALUE_API.GET_BY_ID(valueId!),
        {},
        token ?? undefined
      );

      if (response?.result === "error") {
        toast.error(response?.desc || "Failed to fetch filter value");
        router.push("/admin/filters");
        return;
      }

      const data = response?.data || response;
      
      setFilterValue(data);
      
      // Set selected group from the filter value
      if (data?.groupId) {
        const groupId = typeof data.groupId === 'object' ? data.groupId._id : data.groupId;
        const group = filterGroups.find(g => g._id === groupId);
        if (group) {
          setSelectedGroup(group);
        }
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to fetch filter value");
      router.push("/admin/filters");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (values: FilterValueFormValues, { setSubmitting }: any) => {
    try {
      const payload = {
        groupId: values.groupId,
        label: values.label.trim(),
        valueKey: values.valueKey.trim(),
        status: values.status,
        order: values.order || 0,
      };

      let response: ApiResponse;

      if (mode === "add") {
        response = await axiosWrapper(
          "post",
          FILTER_VALUE_API.CREATE,
          payload,
          token ?? undefined
        ) as ApiResponse;
      } else {
        response = await axiosWrapper(
          "put",
          FILTER_VALUE_API.UPDATE(valueId!),
          payload,
          token ?? undefined
        ) as ApiResponse;
      }

      if (response?.result === "error") {
        toast.error(response?.desc || `Failed to ${mode} filter value`);
        return;
      }

      toast.success(mode === "add" ? "Filter value created!" : "Filter value updated!");
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

  const handleRemoveFilterValue = async () => {
    if (!confirm("Are you sure you want to delete this filter value?")) return;

    try {
      const response: any = await axiosWrapper(
        "delete",
        FILTER_VALUE_API.DELETE(valueId!),
        {},
        token ?? undefined
      );

      if (response?.result === "error") {
        toast.error(response?.desc || "Failed to delete filter value");
        return;
      }

      toast.success("Filter value deleted successfully");
      router.push("/admin/filters");
    } catch (error: any) {
      toast.error(error?.message || "Failed to delete filter value");
    }
  };

  // Generate valueKey from label
  const generateValueKey = (label: string) => {
    return label.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
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
              {mode === "add" ? "Add New Filter Value" : "Edit Filter Value"}
            </h1>
            <p className="text-[#F7F8F8B2]">
              {mode === "add"
                ? "Create a new filter value option"
                : "Update filter value information"}
            </p>
          </div>
        </div>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={FilterValueSchema}
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
                      <path d="M9 11L12 14L22 4" stroke="#4DCE94" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="#F7F8F870" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      {values.label || "Filter Value Label"}
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="bg-[#F7F8F80A] px-2 py-0.5 rounded text-xs text-[#F7F8F870]">
                        {values.valueKey || "value-key"}
                      </code>
                      {selectedGroup && (
                        <span className="text-xs text-[#4DCE94]">
                          → {selectedGroup.name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="border border-[#F7F8F81A] p-[20px] rounded-[7px] bg-[#F7F8F80A] mb-8">
              <div className="text-lg font-semibold mb-4">Filter Value Information</div>

              <div className="space-y-6">
                {/* Filter Group Selection */}
                <div>
                  <label className="block text-sm font-medium text-[#F7F8F8B2] mb-2">
                    Filter Group *
                  </label>
                  <Field
                    as="select"
                    name="groupId"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      setFieldValue('groupId', e.target.value);
                      const group = filterGroups.find(g => g._id === e.target.value);
                      setSelectedGroup(group || null);
                    }}
                    className="w-full border border-[#F7F8F81C] hover:bg-[#F7F8F80A] duration-300 bg-transparent rounded-[7px] text-[#F7F8F8] text-sm px-4 py-3 focus-visible:outline-0 focus-visible:border focus-visible:border-[#ffffff80]"
                  >
                    <option value="" className="bg-[#1a1a1a]">Select a filter group</option>
                    {filterGroups.map((group) => (
                      <option key={group._id} value={group._id} className="bg-[#1a1a1a]">
                        {group.name} ({group.type})
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="groupId"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                {/* Selected Group Info */}
                {selectedGroup && (
                  <div className="border border-[#4DCE9430] bg-[#4DCE9410] rounded-[7px] p-4">
                    <div className="flex items-center gap-3">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke="#4DCE94" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <div>
                        <p className="text-[#4DCE94] font-medium">{selectedGroup.name}</p>
                        <p className="text-xs text-[#F7F8F8B2]">
                          Type: {selectedGroup.type} | Slug: {selectedGroup.slug}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Label */}
                <div>
                  <label className="block text-sm font-medium text-[#F7F8F8B2] mb-2">
                    Label *
                  </label>
                  <Field
                    type="text"
                    name="label"
                    placeholder="e.g., Red, Small, $0-$50"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const newLabel = e.target.value;
                      setFieldValue('label', newLabel);
                      // Auto-generate valueKey if it's empty or matches the previous auto-generated value
                      if (!values.valueKey || values.valueKey === generateValueKey(values.label)) {
                        setFieldValue('valueKey', generateValueKey(newLabel));
                      }
                    }}
                    className="w-full border border-[#F7F8F81C] hover:bg-[#F7F8F80A] duration-300 bg-transparent rounded-[7px] text-[#F7F8F8] text-sm px-4 py-3 placeholder:text-[#F7F8F8B2] focus-visible:outline-0 focus-visible:border focus-visible:border-[#ffffff80]"
                  />
                  <ErrorMessage
                    name="label"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                {/* Value Key */}
                <div>
                  <label className="block text-sm font-medium text-[#F7F8F8B2] mb-2">
                    Value Key *
                  </label>
                  <Field
                    type="text"
                    name="valueKey"
                    placeholder="e.g., red, small, 0-50"
                    className="w-full border border-[#F7F8F81C] hover:bg-[#F7F8F80A] duration-300 bg-transparent rounded-[7px] text-[#F7F8F8] text-sm px-4 py-3 placeholder:text-[#F7F8F8B2] focus-visible:outline-0 focus-visible:border focus-visible:border-[#ffffff80]"
                  />
                  <p className="text-xs text-[#F7F8F870] mt-1">
                    Used in URL and API queries. Auto-generated from label.
                  </p>
                  <ErrorMessage
                    name="valueKey"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    "Create Filter Value"
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
                  onClick={handleRemoveFilterValue}
                  className="border border-[#FF6B6B] text-[#fff] duration-400 bg-[#FF6B6B] rounded-[7px] font-semibold md:px-6 px-3 py-3 text-sm hover:bg-[#FF6B6B25] hover:text-[#FF6B6B] transition-colors"
                >
                  Remove Filter Value
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}