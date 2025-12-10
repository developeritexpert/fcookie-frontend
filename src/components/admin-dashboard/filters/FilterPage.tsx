// components/admin-dashboard/filters/FilterPage.tsx

"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { toast } from "sonner";
import axiosWrapper from "@/utils/api";
import { FILTER_GROUP_API, FILTER_VALUE_API } from "@/utils/apiUrl";
import { FilterGroup, FilterValue } from "@/types/filter/filter";
import { useAuthStore } from "@/components/store/useAuthStore";
import React from "react";
interface Option {
  value: string;
  label: string;
}

const statusOptions: Option[] = [
  { value: "all", label: "All Status" },
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
];

// Updated to match backend FILTER_TYPE enum
const typeOptions: Option[] = [
  { value: "all", label: "All Types" },
  { value: "single", label: "Single" },
  { value: "multi", label: "Multi" },
  { value: "number", label: "Number" },
  { value: "text", label: "Text" },
];

export default function FilterPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [filterGroups, setFilterGroups] = useState<FilterGroup[]>([]);
  const [filterValues, setFilterValues] = useState<Record<string, FilterValue[]>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [loadingValues, setLoadingValues] = useState<Set<string>>(new Set());
  const token = useAuthStore.getState().getToken();
  
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isDeletingValue, setIsDeletingValue] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isUpdatingOrder, setIsUpdatingOrder] = useState(false);
  const [draggedItem, setDraggedItem] = useState<{ id: string; type: 'group' | 'value'; groupId?: string } | null>(null);
  const [dragOverItem, setDragOverItem] = useState<{ id: string; type: 'group' | 'value'; groupId?: string } | null>(null);

  const fetchFilterGroups = useCallback(async () => {
    try {
      setIsLoading(true);

      // Build params - use 'name' for search since backend might expect specific field
      const params: Record<string, any> = {
        page: pagination.page,
        limit: pagination.limit,
        sortBy: 'order',
        order: 'asc',
      };

      // Add search term - try both 'search' and 'name' params
      if (searchTerm.trim()) {
        params.search = searchTerm.trim();
        // Also try name filter if backend uses that
        params.name = searchTerm.trim();
      }

      // Add status filter
      if (statusFilter !== "all") {
        params.status = statusFilter;
      }

      // Add type filter
      if (typeFilter !== "all") {
        params.type = typeFilter;
      }

      const response: any = await axiosWrapper(
        "get",
        FILTER_GROUP_API.GET_ALL,
        params,
        token ?? undefined
      );

      if (response?.result === "error") {
        toast.error(response?.desc || "Failed to fetch filter groups");
        return;
      }

      const data = response?.data || response;
      setFilterGroups(data?.data || []);
      setPagination((prev) => ({
        ...prev,
        total: data?.pagination?.total || 0,
        totalPages: data?.pagination?.totalPages || 0,
      }));
    } catch (error: any) {
      toast.error(error?.message || "Failed to fetch filter groups");
    } finally {
      setIsLoading(false);
    }
  }, [pagination.page, pagination.limit, searchTerm, statusFilter, typeFilter, token]);

  const fetchFilterValues = async (groupId: string) => {
    try {
      setLoadingValues(prev => new Set(prev).add(groupId));
      
      const params: any = {
        groupId,
        limit: 100,
        sortBy: 'order',
        order: 'asc',
      };

      const response: any = await axiosWrapper(
        "get",
        FILTER_VALUE_API.GET_ALL,
        params,
        token ?? undefined
      );

      if (response?.result === "error") {
        toast.error(response?.desc || "Failed to fetch filter values");
        return;
      }

      const data = response?.data || response;
      setFilterValues(prev => ({
        ...prev,
        [groupId]: data?.data || []
      }));
    } catch (error: any) {
      toast.error(error?.message || "Failed to fetch filter values");
    } finally {
      setLoadingValues(prev => {
        const newSet = new Set(prev);
        newSet.delete(groupId);
        return newSet;
      });
    }
  };

  // Fetch on mount and when filters change (except search)
  useEffect(() => {
    fetchFilterGroups();
  }, [pagination.page, pagination.limit, statusFilter, typeFilter]);

  // Debounced search
  useEffect(() => {
    setIsSearching(true);
    const delayDebounceFn = setTimeout(() => {
      // Reset to page 1 when searching
      if (pagination.page !== 1) {
        setPagination((prev) => ({ ...prev, page: 1 }));
      } else {
        fetchFilterGroups().finally(() => setIsSearching(false));
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // Refetch when page changes to 1 due to search
  useEffect(() => {
    if (pagination.page === 1 && isSearching) {
      fetchFilterGroups().finally(() => setIsSearching(false));
    }
  }, [pagination.page]);

  const toggleExpand = async (groupId: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
      if (!filterValues[groupId]) {
        await fetchFilterValues(groupId);
      }
    }
    setExpandedGroups(newExpanded);
  };

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

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "single":
        return "bg-[#4A90D9] text-white";
      case "multi":
        return "bg-[#9B59B6] text-white";
      case "number":
        return "bg-[#E67E22] text-white";
      case "text":
        return "bg-[#27AE60] text-white";
      default:
        return "bg-[#F7F8F81C] text-[#F7F8F8B2]";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type.toLowerCase()) {
      case "single":
        return "Single";
      case "multi":
        return "Multi";
      case "number":
        return "Number";
      case "text":
        return "Text";
      default:
        return type;
    }
  };

  const handleRemoveGroup = async (id: string) => {
    if (!confirm("Are you sure you want to delete this filter group? All associated values will also be deleted.")) return;

    try {
      setIsDeleting(id);
      const response: any = await axiosWrapper(
        "delete",
        FILTER_GROUP_API.DELETE(id),
        {},
        token ?? undefined
      );

      if (response?.result === "error") {
        toast.error(response?.desc || "Failed to delete filter group");
        return;
      }

      toast.success("Filter group deleted successfully");
      fetchFilterGroups();
    } catch (error: any) {
      toast.error(error?.message || "Failed to delete filter group");
    } finally {
      setIsDeleting(null);
    }
  };

  const handleRemoveValue = async (id: string, groupId: string) => {
    if (!confirm("Are you sure you want to delete this filter value?")) return;

    try {
      setIsDeletingValue(id);
      const response: any = await axiosWrapper(
        "delete",
        FILTER_VALUE_API.DELETE(id),
        {},
        token ?? undefined
      );

      if (response?.result === "error") {
        toast.error(response?.desc || "Failed to delete filter value");
        return;
      }

      toast.success("Filter value deleted successfully");
      fetchFilterValues(groupId);
    } catch (error: any) {
      toast.error(error?.message || "Failed to delete filter value");
    } finally {
      setIsDeletingValue(null);
    }
  };

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, id: string, type: 'group' | 'value', groupId?: string) => {
    setDraggedItem({ id, type, groupId });
    e.dataTransfer.effectAllowed = 'move';
    // Add visual feedback
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '0.5';
    }
  };

  const handleDragOver = (e: React.DragEvent, id: string, type: 'group' | 'value', groupId?: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    if (draggedItem?.type === type && (type === 'group' || draggedItem?.groupId === groupId)) {
      if (dragOverItem?.id !== id) {
        setDragOverItem({ id, type, groupId });
      }
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent, targetId: string, type: 'group' | 'value', groupId?: string) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem.id === targetId || draggedItem.type !== type) {
      setDraggedItem(null);
      setDragOverItem(null);
      return;
    }

    if (type === 'group') {
      await reorderGroups(draggedItem.id, targetId);
    } else if (type === 'value' && groupId && draggedItem.groupId === groupId) {
      await reorderValues(draggedItem.id, targetId, groupId);
    }

    setDraggedItem(null);
    setDragOverItem(null);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    // Reset opacity
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '1';
    }
    setDraggedItem(null);
    setDragOverItem(null);
  };

  // Reorder filter groups
  const reorderGroups = async (draggedId: string, targetId: string) => {
    const newGroups = [...filterGroups];
    const draggedIndex = newGroups.findIndex(g => g._id === draggedId);
    const targetIndex = newGroups.findIndex(g => g._id === targetId);
    
    if (draggedIndex === -1 || targetIndex === -1) return;

    // Remove dragged item and insert at target position
    const [draggedGroup] = newGroups.splice(draggedIndex, 1);
    newGroups.splice(targetIndex, 0, draggedGroup);
    
    // Update local state with new order values
    const updatedGroups = newGroups.map((group, index) => ({
      ...group,
      order: index
    }));
    
    setFilterGroups(updatedGroups);
    setIsUpdatingOrder(true);

    // Update all affected items in backend
    try {
      // Update the dragged item's order
      const response = await axiosWrapper(
        "put",
        FILTER_GROUP_API.UPDATE(draggedId),
        { order: targetIndex },
        token ?? undefined
      );

      if ((response as any)?.result === "error") {
        throw new Error((response as any)?.desc || "Failed to update order");
      }

      // Optionally update other affected items
      // This ensures consistency if backend doesn't auto-adjust
      const updatePromises = updatedGroups
        .filter((g, idx) => {
          const originalIdx = filterGroups.findIndex(og => og._id === g._id);
          return originalIdx !== idx && g._id !== draggedId;
        })
        .map(group => 
          axiosWrapper(
            "put",
            FILTER_GROUP_API.UPDATE(group._id),
            { order: group.order },
            token ?? undefined
          )
        );

      await Promise.all(updatePromises);
      
      toast.success("Order updated successfully");
      
      // Refetch to ensure consistency
      await fetchFilterGroups();
    } catch (error: any) {
      toast.error(error?.message || "Failed to update order");
      // Revert on error
      await fetchFilterGroups();
    } finally {
      setIsUpdatingOrder(false);
    }
  };

  // Reorder filter values within a group
  const reorderValues = async (draggedId: string, targetId: string, groupId: string) => {
    const values = [...(filterValues[groupId] || [])];
    const draggedIndex = values.findIndex(v => v._id === draggedId);
    const targetIndex = values.findIndex(v => v._id === targetId);
    
    if (draggedIndex === -1 || targetIndex === -1) return;

    // Remove dragged item and insert at target position
    const [draggedValue] = values.splice(draggedIndex, 1);
    values.splice(targetIndex, 0, draggedValue);
    
    // Update local state with new order values
    const updatedValues = values.map((value, index) => ({
      ...value,
      order: index
    }));
    
    setFilterValues(prev => ({
      ...prev,
      [groupId]: updatedValues
    }));
    
    setIsUpdatingOrder(true);

    try {
      // Update the dragged item's order
      const response = await axiosWrapper(
        "put",
        FILTER_VALUE_API.UPDATE(draggedId),
        { order: targetIndex },
        token ?? undefined
      );

      if ((response as any)?.result === "error") {
        throw new Error((response as any)?.desc || "Failed to update order");
      }

      // Update other affected items
      const updatePromises = updatedValues
        .filter((v, idx) => {
          const originalIdx = (filterValues[groupId] || []).findIndex(ov => ov._id === v._id);
          return originalIdx !== idx && v._id !== draggedId;
        })
        .map(value => 
          axiosWrapper(
            "put",
            FILTER_VALUE_API.UPDATE(value._id),
            { order: value.order },
            token ?? undefined
          )
        );

      await Promise.all(updatePromises);
      
      toast.success("Order updated successfully");
      
      // Refetch to ensure consistency
      await fetchFilterValues(groupId);
    } catch (error: any) {
      toast.error(error?.message || "Failed to update order");
      // Revert on error
      await fetchFilterValues(groupId);
    } finally {
      setIsUpdatingOrder(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({ ...prev, page: newPage }));
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-[25px]">
        <h1 className="text-2xl font-bold text-white mb-2">Filters</h1>
        <p className="text-[#F7F8F8B2]">Manage your product filters and their options</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-[10px] sm:gap-[20px] mb-[25px]">
        <div className="flex flex-col sm:flex-row gap-[10px] w-full sm:w-auto">
          {/* Search Input */}
          <div className="relative min-w-[250px]">
            <input
              type="text"
              placeholder="Search by name..."
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
            {isSearching && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <svg className="animate-spin h-4 w-4 text-[#4DCE94]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            )}
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPagination(prev => ({ ...prev, page: 1 }));
            }}
            className="border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] text-[#F7F8F8B2] text-sm px-4 py-[10px] focus-visible:outline-0 focus-visible:border focus-visible:border-[#ffffff80] duration-300"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value} className="bg-[#1a1a1a]">
                {option.label}
              </option>
            ))}
          </select>

          {/* Type Filter */}
          {/* <select
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value);
              setPagination(prev => ({ ...prev, page: 1 }));
            }}
            className="border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] text-[#F7F8F8B2] text-sm px-4 py-[10px] focus-visible:outline-0 focus-visible:border focus-visible:border-[#ffffff80] duration-300"
          >
            {typeOptions.map((option) => (
              <option key={option.value} value={option.value} className="bg-[#1a1a1a]">
                {option.label}
              </option>
            ))}
          </select> */}
        </div>

        <div>
          <Link
            href="/admin/filters/add"
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
            Add Filter Group
          </Link>
        </div>
      </div>

      {/* Info Banner */}
      <div className="border border-[#4DCE9430] bg-[#4DCE9410] rounded-[7px] p-4 mb-[25px]">
        <div className="flex items-start gap-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-0.5">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#4DCE94" strokeWidth="2"/>
            <path d="M12 16V12M12 8H12.01" stroke="#4DCE94" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <div>
            <p className="text-[#4DCE94] font-medium mb-1">Drag & Drop Ordering</p>
            <p className="text-[#F7F8F8B2] text-sm">
              Drag the rows to reorder filter groups. The order will be reflected on the frontend filter section. 
              Expand a group to manage and reorder its values.
            </p>
          </div>
        </div>
      </div>

      {/* Loading overlay for order updates */}
      {isUpdatingOrder && (
        <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center">
          <div className="bg-[#1a1a1a] rounded-lg p-4 flex items-center gap-3">
            <svg className="animate-spin h-5 w-5 text-[#4DCE94]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-white">Updating order...</span>
          </div>
        </div>
      )}

      {/* Filter Groups Table */}
      <div className="w-full overflow-x-auto rounded-[7px]">
        <table className="lg:w-full text-sm rounded-[7px]">
          <thead>
            <tr className="bg-[#fff] text-[#000] font-medium text-left">
              <th className="py-[18px] px-[15px] border border-[#0000001C] w-[50px]"></th>
              <th className="py-[18px] px-[15px] border border-[#0000001C] min-w-[200px]">
                Name
              </th>
              <th className="py-[18px] px-[15px] border border-[#0000001C] min-w-[150px]">
                Slug
              </th>
              {/* <th className="py-[18px] px-[15px] border border-[#0000001C] min-w-[100px]">
                Type
              </th> */}
              <th className="py-[18px] px-[15px] border border-[#0000001C] min-w-[100px]">
                Required
              </th>
              <th className="py-[18px] px-[15px] border border-[#0000001C] min-w-[100px]">
                Status
              </th>
              <th className="py-[18px] px-[15px] border border-[#0000001C] min-w-[80px]">
                Order
              </th>
              <th className="py-[18px] px-[15px] border border-[#0000001C] min-w-[180px]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {(isLoading || isSearching) ? (
              <>
                {Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse bg-[#F7F8F81C]">
                    <td className="py-[20px] px-[15px] border border-[#F7F8F81C]">
                      <div className="h-4 bg-[#ffffff20] rounded w-6"></div>
                    </td>
                    <td className="py-[20px] px-[15px] border border-[#F7F8F81C]">
                      <div className="h-4 bg-[#ffffff20] rounded w-1/2"></div>
                    </td>
                    <td className="py-[20px] px-[15px] border border-[#F7F8F81C]">
                      <div className="h-4 bg-[#ffffff20] rounded w-1/3"></div>
                    </td>
                    <td className="py-[20px] px-[15px] border border-[#F7F8F81C]">
                      <div className="h-4 bg-[#ffffff20] rounded w-16"></div>
                    </td>
                    <td className="py-[20px] px-[15px] border border-[#F7F8F81C]">
                      <div className="h-4 bg-[#ffffff20] rounded w-12"></div>
                    </td>
                    <td className="py-[20px] px-[15px] border border-[#F7F8F81C]">
                      <div className="h-4 bg-[#ffffff20] rounded w-16"></div>
                    </td>
                    <td className="py-[20px] px-[15px] border border-[#F7F8F81C]">
                      <div className="h-4 bg-[#ffffff20] rounded w-8"></div>
                    </td>
                    <td className="py-[20px] px-[15px] border border-[#F7F8F81C]">
                      <div className="h-4 bg-[#ffffff20] rounded w-24"></div>
                    </td>
                  </tr>
                ))}
              </>
            ) : filterGroups.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="py-[40px] px-[15px] text-center text-[#F7F8F8B2] bg-[#F7F8F81C]"
                >
                  {searchTerm ? `No filter groups found for "${searchTerm}"` : "No filter groups found"}
                </td>
              </tr>
            ) : (
              filterGroups.map((group) => (
                <React.Fragment key={group._id}>
                  <tr
                    draggable
                    onDragStart={(e) => handleDragStart(e, group._id, 'group')}
                    onDragOver={(e) => handleDragOver(e, group._id, 'group')}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, group._id, 'group')}
                    onDragEnd={handleDragEnd}
                    className={`text-[#F7F8F8B2] bg-[#F7F8F81C] hover:bg-[#F7F8F82A] transition-all cursor-move ${
                      dragOverItem?.id === group._id && dragOverItem?.type === 'group' 
                        ? 'border-t-2 border-[#4DCE94] bg-[#4DCE9410]' 
                        : ''
                    } ${draggedItem?.id === group._id ? 'opacity-50' : ''}`}
                  >
                    {/* Drag Handle & Expand */}
                    <td className="py-[10px] px-[15px] border border-[#F7F8F81C]">
                      <div className="flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="cursor-grab text-[#F7F8F870] hover:text-white transition-colors">
                          <path d="M8 6H8.01M8 12H8.01M8 18H8.01M16 6H16.01M16 12H16.01M16 18H16.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExpand(group._id);
                          }}
                          className="p-1 hover:bg-[#F7F8F820] rounded transition-colors"
                        >
                          <svg 
                            width="16" 
                            height="16" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            className={`transition-transform duration-200 ${expandedGroups.has(group._id) ? 'rotate-90' : ''}`}
                          >
                            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </td>

                    <td className="py-[10px] px-[15px] border border-[#F7F8F81C]">
                      <span className="font-medium text-white">{group.name}</span>
                      {group.protected && (
                        <span className="ml-2 px-2 py-0.5 bg-[#E67E2220] text-[#E67E22] text-xs rounded">
                          Protected
                        </span>
                      )}
                    </td>

                    <td className="py-[10px] px-[15px] border border-[#F7F8F81C]">
                      <code className="bg-[#F7F8F80A] px-2 py-1 rounded text-xs">{group.slug}</code>
                    </td>

                    {/* <td className="py-[10px] px-[15px] border border-[#F7F8F81C]">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(group.type)}`}>
                        {getTypeLabel(group.type)}
                      </span>
                    </td> */}

                    <td className="py-[10px] px-[15px] border border-[#F7F8F81C]">
                      {group.required ? (
                        <span className="text-[#75DA5B]">Yes</span>
                      ) : (
                        <span className="text-[#F7F8F870]">No</span>
                      )}
                    </td>

                    <td className="py-[10px] px-[15px] border border-[#F7F8F81C]">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(group.status)}`}>
                        {group.status}
                      </span>
                    </td>

                    <td className="py-[10px] px-[15px] border border-[#F7F8F81C] text-center">
                      <span className="bg-[#F7F8F80A] px-2 py-1 rounded text-xs">
                        {group.order+1}
                      </span>
                    </td>

                    <td className="py-[10px] px-[15px] border border-[#F7F8F81C]">
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/filters/edit/${group._id}`}
                          className="border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] py-[6px] px-[15px] text-xs whitespace-nowrap hover:bg-[#F7F8F815] transition-colors cursor-pointer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Edit
                        </Link>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveGroup(group._id);
                          }}
                          disabled={isDeleting === group._id || group.protected}
                          className="border border-[#F7F8F81C] bg-[#F7F8F80A] rounded-[7px] py-[6px] px-[15px] text-xs whitespace-nowrap hover:bg-[#FF6B6B25] hover:border-[#FF6B6B] hover:text-[#FF6B6B] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isDeleting === group._id ? "Removing..." : "Remove"}
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Expanded Filter Values */}
                  {expandedGroups.has(group._id) && (
                    <tr key={`${group._id}-expanded`}>
                      <td colSpan={8} className="p-0">
                        <div className="bg-[#0a0a0a] border-l-4 border-[#4DCE94] ml-4">
                          <div className="p-4">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="text-sm font-medium text-white">
                                Filter Values ({filterValues[group._id]?.length || 0})
                              </h4>
                              <Link
                                href={`/admin/filters/values/add?groupId=${group._id}`}
                                className="flex gap-1 items-center text-[#4DCE94] text-xs hover:underline"
                              >
                                <svg width="12" height="12" viewBox="0 0 15 15" fill="none">
                                  <path d="M7.5 0.5V14.5M0.5 7.5H14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                                Add Value
                              </Link>
                            </div>

                            {loadingValues.has(group._id) ? (
                              <div className="space-y-2">
                                {Array.from({ length: 3 }).map((_, i) => (
                                  <div key={i} className="animate-pulse bg-[#F7F8F81C] rounded p-3 flex justify-between">
                                    <div className="h-4 bg-[#ffffff20] rounded w-1/4"></div>
                                    <div className="h-4 bg-[#ffffff20] rounded w-16"></div>
                                  </div>
                                ))}
                              </div>
                            ) : (filterValues[group._id]?.length || 0) === 0 ? (
                              <p className="text-[#F7F8F870] text-sm py-4 text-center">
                                No values added yet. Click "Add Value" to create filter options.
                              </p>
                            ) : (
                              <div className="space-y-2">
                                {filterValues[group._id]?.map((value) => (
                                  <div
                                    key={value._id}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, value._id, 'value', group._id)}
                                    onDragOver={(e) => handleDragOver(e, value._id, 'value', group._id)}
                                    onDragLeave={handleDragLeave}
                                    onDrop={(e) => handleDrop(e, value._id, 'value', group._id)}
                                    onDragEnd={handleDragEnd}
                                    className={`bg-[#F7F8F81C] rounded p-3 flex items-center justify-between cursor-move hover:bg-[#F7F8F82A] transition-all ${
                                      dragOverItem?.id === value._id && dragOverItem?.type === 'value' 
                                        ? 'border-t-2 border-[#4DCE94] bg-[#4DCE9410]' 
                                        : ''
                                    } ${draggedItem?.id === value._id ? 'opacity-50' : ''}`}
                                  >
                                    <div className="flex items-center gap-3">
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="cursor-grab text-[#F7F8F870] hover:text-white transition-colors">
                                        <path d="M8 6H8.01M8 12H8.01M8 18H8.01M16 6H16.01M16 12H16.01M16 18H16.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                      </svg>
                                      <div className="w-4 h-4 border-2 border-[#F7F8F870] rounded"></div>
                                      <div>
                                        <span className="text-white text-sm">{value.label}</span>
                                        <span className="text-[#F7F8F870] text-xs ml-2">({value.valueKey})</span>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                      <span className={`text-xs ${getStatusColor(value.status)}`}>
                                        {value.status}
                                      </span>
                                      <span className="text-[#F7F8F870] text-xs bg-[#F7F8F80A] px-2 py-0.5 rounded">
                                        {value.order+1}
                                      </span>
                                      <div className="flex gap-2">
                                        <Link
                                          href={`/admin/filters/values/edit/${value._id}`}
                                          className="text-[#F7F8F8B2] hover:text-white text-xs"
                                        >
                                          Edit
                                        </Link>
                                        <button
                                          onClick={() => handleRemoveValue(value._id, group._id)}
                                          disabled={isDeletingValue === value._id}
                                          className="text-[#FF6B6B] hover:text-[#FF8888] text-xs disabled:opacity-50"
                                        >
                                          {isDeletingValue === value._id ? "..." : "Remove"}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!isLoading && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-[#F7F8F8B2]">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
            {pagination.total} filter groups
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