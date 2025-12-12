"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from 'next/link';
import { IoChevronDown } from "react-icons/io5";
import { CgLayoutGridSmall } from "react-icons/cg";
import { BsArrowsAngleExpand } from "react-icons/bs";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import axiosWrapper from "@/utils/api";
import { ASSET_API, CATEGORY_API } from "@/utils/apiUrl";
import { useAuthStore } from "@/components/store/useAuthStore";
import PriceRangeFilter from "./PriceRangeFilter";
// ============================================
// TYPESCRIPT INTERFACES
// ============================================

interface Category {
  _id: string;
  name: string;
  slug: string;
}

interface FilterValue {
  valueId: string;
  label: string;
  count: number;
}

interface FilterGroup {
  _id: string;
  groupName: string;
  groupSlug: string;
  values: FilterValue[];
}

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  listing_price?: number;
  images: string[];
  thumbnail_url?: string;
  categoryId: string;
  status: string;
  visibility: string;
  createdAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface PriceRange {
  minPrice: number;
  maxPrice: number;
}

interface SelectedFilters {
  [groupId: string]: string[];
}

type CardType = {
  title: string;
  price: string;
  image: string;
};

// ============================================
// FILTER DROPDOWN COMPONENT
// ============================================

interface FilterDropdownProps {
  title: string;
  children: React.ReactNode;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ title, children }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="w-full bg-transparent border-b border-[#E6E6E6] dark:border-[#343434] py-[20px] md:py-[30px] !m-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left text-black dark:text-white"
      >
        <span className="text-[18px] md:text-[20px] font-medium">{title}</span>
        <IoChevronDown className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="mt-1 pl-1">{children}</div>}
    </div>
  );
};

// ============================================
// SORTING OPTIONS
// ============================================

const sortOptions = [
  { id: 1, label: "Default Sorting", value: "default" },
  { id: 2, label: "Price: Low to High", value: "low-to-high" },
  { id: 3, label: "Price: High to Low", value: "high-to-low" },
  { id: 4, label: "Newest", value: "newest" },
];

// ============================================
// MAIN COMPONENT
// ============================================

export default function ProductsFilter() {
  const token = useAuthStore.getState().getToken();
  
  // State
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [dynamicFilters, setDynamicFilters] = useState<FilterGroup[]>([]);
  const [priceRange, setPriceRange] = useState<PriceRange>({ minPrice: 0, maxPrice: 10000 });
  
  const [loading, setLoading] = useState<boolean>(false);
  const [filtersLoading, setFiltersLoading] = useState<boolean>(false);
  
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({});
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 24,
    total: 0,
    totalPages: 0
  });
  
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [viewType, setViewType] = useState<'grid' | 'small-grid'>('grid');
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [sidebarHidden, setSidebarHidden] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);
  const [openView, setOpenView] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Product | null>(null); 

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response:any = await axiosWrapper(
          'get',
          CATEGORY_API.GET_ALL_CATEGORIES,
          { limit: 100 },
          token ?? undefined
        );
        const data = response?.data || response;
        setCategories((data as any)?.data || []);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };
    fetchCategories();
  }, [token]);

  // Fetch Dynamic Filters
  useEffect(() => {
    const fetchFilters = async () => {
      setFiltersLoading(true);
      try {
        const params = selectedCategory ? { categoryId: selectedCategory } : {};
        const url = `${ASSET_API.GET_AVAILABLE_FILTERS}`;
        
        const response:any = await axiosWrapper('get', url, params, token ?? undefined);
        const data = response?.data || response;
        
        console.log('Filters response:', data);
        
        setDynamicFilters((data as any)?.filters || []);
        setPriceRange((data as any)?.priceRange || { minPrice: 0, maxPrice: 10000 });
      } catch (err) {
        console.error('Failed to fetch filters:', err);
      } finally {
        setFiltersLoading(false);
      }
    };
    fetchFilters();
  }, [selectedCategory, token]);

  // Handle sorting option change
  const handleSortChange = (option: typeof sortOptions[0]) => {
    setSelectedSort(option);
    
    // Update sortBy and order based on selected option
    switch(option.value) {
      case 'default':
        setSortBy('createdAt');
        setOrder('desc');
        break;
      case 'low-to-high':
        setSortBy('listing_price');
        setOrder('asc');
        break;
      case 'high-to-low':
        setSortBy('listing_price');
        setOrder('desc');
        break;
      case 'newest':
        setSortBy('createdAt');
        setOrder('desc');
        break;
      default:
        setSortBy('createdAt');
        setOrder('desc');
    }
    
    // Reset to page 1 when sorting changes
    setPagination(prev => ({ ...prev, page: 1 }));
    setIsOpen(false);
  };

  // Debounced Product Fetch
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 300);
    return () => clearTimeout(timer);
  }, [selectedFilters, selectedCategory, minPrice, maxPrice, searchTerm, pagination.page, sortBy, order]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params: Record<string, any> = {
        page: pagination.page,
        limit: pagination.limit,
        sortBy,
        order
      };

      if (selectedCategory) params.categoryId = selectedCategory;
      if (searchTerm) params.search = searchTerm;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;
      
      if (Object.keys(selectedFilters).length > 0) {
        const filtersArray: Array<{ groupId: string; valueId: string }> = [];
        Object.entries(selectedFilters).forEach(([groupId, valueIds]) => {
          valueIds.forEach((valueId: string) => {
            filtersArray.push({ groupId, valueId });
          });
        });
        params.filters = JSON.stringify(filtersArray);
      }

      const response:any = await axiosWrapper('get', ASSET_API.GET_ALL_ASSETS, params, token ?? undefined);
      const data = response?.data || response;
      
      setProducts((data as any)?.data || []);
      setPagination((data as any)?.pagination || pagination);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (groupId: string, valueId: string, checked: boolean) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev };
      if (checked) {
        if (!newFilters[groupId]) newFilters[groupId] = [];
        if (!newFilters[groupId].includes(valueId)) newFilters[groupId].push(valueId);
      } else {
        if (newFilters[groupId]) {
          newFilters[groupId] = newFilters[groupId].filter((id: string) => id !== valueId);
          if (newFilters[groupId].length === 0) delete newFilters[groupId];
        }
      }
      return newFilters;
    });
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const clearFilters = () => {
    setSelectedFilters({});
    setSelectedCategory('');
    setMinPrice('');
    setMaxPrice('');
    setSearchTerm('');
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  // Sidebar visibility
  useEffect(() => {
    if (openFilter) {
      setSidebarHidden(false);
    } else {
      const timer = setTimeout(() => setSidebarHidden(true), 200);
      return () => clearTimeout(timer);
    }
  }, [openFilter]);

  // Dropdown outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Body overflow for modals
  useEffect(() => {
    if (openView || showAuthModal || showOfferModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [openView, showAuthModal, showOfferModal]);

  // Escape key handler for modals
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (openView) {
          setOpenView(false);
          setSelectedCard(null);
        }
        if (showAuthModal) setShowAuthModal(false);
        if (showOfferModal) setShowOfferModal(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [openView, showAuthModal, showOfferModal]);

  return (
    <div className="text-white pt-[16px] px-[20px] md:px-[30px] lg:px-[50px] relative">
      <div className="absolute top-[100px] sm:top-[150px] md:top-[325px] lg:top-[300px] left-0 bg-[#EFB24D]/20 blur-[150px] -z-10 h-[108px] w-[108px] md:h-[208px] md:w-[208px] lg:h-[308px] lg:w-[308px]"></div>
      <div className="absolute bottom-[-5%] right-0 bg-[#75DA5B]/20 blur-[150px] -z-10 h-[108px] w-[108px] md:h-[208px] md:w-[208px] lg:h-[308px] lg:w-[308px]"></div>
      
      <div className="container">
        <div className="flex md:gap-4 lg:gap-8">
          
          {/* SIDEBAR */}
          <aside className={`pb-[30px] md:pb-[50px] transition-all duration-300 linear overflow-hidden transform
            ${sidebarHidden ? "hidden" : ""}
            ${openFilter ? "w-[25%] translate-x-0 opacity-100 pointer-events-auto border-r border-[#E6E6E6] dark:border-[#343434] me-[15px] pe-[15px] lg:pe-[30px] lg:me-[30px]" : "w-0 -translate-x-full opacity-0 pointer-events-none"}`}>
            
            <div className="sticky top-0">
              <h2 className="text-[24px] md:text-[28px] lg:text-[32px] font-semibold text-left mb-[13px] text-black dark:text-white">
                Filter By:
              </h2>


           
              {/* Price Range */}
              <FilterDropdown title="Price">
                <PriceRangeFilter
                  onPriceChange={(min, max) => {
                    setMinPrice(min !== null ? String(min) : "");
                    setMaxPrice(max !== null ? String(max) : "");

                    // Reset page when filter changes
                    setPagination((prev) => ({ ...prev, page: 1 }));
                  }}
                />
              </FilterDropdown>



              {/* Category Dropdown */}
              <FilterDropdown title="Category">
                <div className="flex flex-col mt-[10px] gap-3">

                  {/* "All" Option */}
                  <label className="flex items-center justify-between cursor-pointer text-black dark:text-white">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedCategory === ""}
                        onChange={() => {
                          setSelectedCategory("");
                          setSelectedFilters({});
                          setPagination((prev) => ({ ...prev, page: 1 }));
                        }}
                        className="w-[22px] h-[22px] appearance-none border border-[#E6E6E6] dark:border-[#ffffff1a]
                        rounded-sm bg-transparent relative cursor-pointer checked:bg-black dark:checked:bg-white
                        checked:after:content-[''] checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 
                        checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 checked:after:w-[5px] 
                        checked:after:h-[10px] checked:after:border-r-2 checked:after:border-b-2 
                        checked:after:border-white dark:checked:after:border-black after:rotate-45"
                      />
                      <span className="text-[16px] font-normal">All</span>
                    </div>
                  </label>

                  {/* Category List */}
                  {categories.map((c) => (
                    <label
                      key={c._id}
                      className="flex items-center justify-between cursor-pointer text-black dark:text-white"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedCategory === c._id}
                          onChange={() => {
                            setSelectedCategory(c._id);
                            setSelectedFilters({});
                            setPagination((prev) => ({ ...prev, page: 1 }));
                          }}
                          className="w-[22px] h-[22px] appearance-none border border-[#E6E6E6] dark:border-[#ffffff1a]
                          rounded-sm bg-transparent relative cursor-pointer checked:bg-black dark:checked:bg-white
                          checked:after:content-[''] checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 
                          checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 checked:after:w-[5px] 
                          checked:after:h-[10px] checked:after:border-r-2 checked:after:border-b-2 
                          checked:after:border-white dark:checked:after:border-black after:rotate-45"
                        />
                        <span className="text-[16px] font-normal">{c.name}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </FilterDropdown>



              {/* Dynamic Filters */}
              {filtersLoading ? (
                <div className="py-4">
                  <p className="text-black dark:text-white">Loading filters...</p>
                </div>
              ) : dynamicFilters.length > 0 ? (
                dynamicFilters.map(filterGroup => (
                  <FilterDropdown key={filterGroup._id} title={filterGroup.groupName}>
                    <div className="flex flex-col mt-[10px] gap-2">
                      {filterGroup.values.map(value => (
                        <label key={value.valueId} className="flex items-center justify-between cursor-pointer text-black dark:text-white">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={selectedFilters[filterGroup._id]?.includes(value.valueId) || false}
                              onChange={(e) => handleFilterChange(filterGroup._id, value.valueId, e.target.checked)}
                              className="w-[22px] h-[22px] appearance-none border border-[#E6E6E6] dark:border-[#ffffff1a]
                                rounded-sm bg-transparent relative cursor-pointer checked:bg-black dark:checked:bg-white
                                checked:after:content-[''] checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2
                                checked:after:-translate-y-1/2 checked:after:w-[5px] checked:after:h-[10px] checked:after:border-r-2 checked:after:border-b-2
                                checked:after:border-white dark:checked:after:border-black after:rotate-45"
                            />
                            <span className="text-[16px] font-normal">{value.label}</span>
                          </div>
                          <span className="text-[16px] font-normal">({value.count})</span>
                        </label>
                      ))}
                    </div>
                  </FilterDropdown>
                ))
              ) : null}

              <button onClick={clearFilters} className="mt-[50px] py-[14px] px-[33px] text-[16px] font-normal bg-[#EFB24D] text-black rounded-md font-semibold hover:bg-[#dca345] transition">
                Clear Filters
              </button>
            </div>
          </aside>

          {/* MOBILE SIDEBAR BUTTON */}
          <div className="relative md:hidden">
            <button onClick={() => setSidebarOpen(true)} className="fixed left-4 bottom-4 z-30 bg-white dark:bg-[#0D0D0D] text-black dark:text-white px-6 py-2 rounded-md shadow-lg border border-[#E6E6E6] dark:border-[#343434] flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="2" className="w-4 h-4 stroke-black dark:stroke-white">
                <path d="M3 4h18M6 12h12M10 20h4" />
              </svg>
              Filters
            </button>
          </div>

          {/* PRODUCTS GRID */}
          <main className={`pb-[50px] md:pb-[80px] lg:pb-[120px] transition-all duration-300 ease-in-out transform origin-right ${openFilter ? "w-[75%] mr-auto h-auto" : "w-[100%] h-auto mr-0"}`}>
            <div className="w-full">
              
              {/* TOP BAR */}
              <div className="flex flex-col flex-wrap sm:flex-row sm:items-center gap-5 justify-between w-full py-4">
                <div className="flex flex-wrap items-center gap-2">
                  <button onClick={() => setOpenFilter(prev => !prev)} className="hidden md:flex items-center gap-2 h-[46px] px-[30px] border border-[#E6E6E6] dark:border-[#343434] bg-transparent text-black dark:text-white rounded-[5px] text-[14px] font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="2" className="w-4 h-4 stroke-black dark:stroke-white">
                      <path d="M3 4h18M6 12h12M10 20h4" />
                    </svg>
                    Filters
                  </button>

                  <button onClick={() => setViewType("grid")} className={`p-2 border rounded-[1px] h-[46px] w-[46px] flex justify-center items-center ${viewType === "grid" ? "bg-white border-[#E6E6E6]" : "bg-[#0D0D0D] border-[#E6E6E6] dark:border-[#343434]"}`}>
                    <svg width="19" height="19" viewBox="0 0 19 19" fill="currentColor" className={`${viewType === "grid" ? "text-black" : "text-white"}`}>
                      <path d="M3.27586 0C1.47031 0 0 1.47031 0 3.27586V15.7241C0 17.5297 1.47031 19 3.27586 19H15.7241C17.5297 19 19 17.5297 19 15.7241V3.27586C19 1.47031 17.5297 0 15.7241 0H3.27586ZM3.27586 1.31034H8.84876V1.33594V8.84487H1.64186C1.5203 8.84487 1.41281 8.8807 1.31428 8.937V3.27599C1.31428 2.19213 2.19594 1.31047 3.27979 1.31047L3.27586 1.31034ZM1.31034 15.7241V10.0631C1.40888 10.1194 1.51637 10.1553 1.63793 10.1553H8.84483V17.6642V17.6898H3.27193C2.18808 17.6898 1.30641 16.8081 1.30641 15.7243L1.31034 15.7241ZM15.7241 17.6897H10.1512V17.6641V10.1551H17.6857V15.7241C17.6857 16.8079 16.8041 17.6896 15.7202 17.6896L15.7241 17.6897ZM17.6897 3.27586V8.84483H10.1552V1.3359V1.3103H15.7281C16.8119 1.3103 17.6936 2.19197 17.6936 3.27582L17.6897 3.27586Z" />
                    </svg>
                  </button>

                  <button onClick={() => setViewType("small-grid")} className={`p-2 border rounded-[1px] h-[46px] w-[46px] flex justify-center items-center ${viewType === "small-grid" ? "bg-white border-[#E6E6E6]" : "bg-[#0D0D0D] border-[#E6E6E6] dark:border-[#343434]"}`}>
                    <CgLayoutGridSmall className={`${viewType === "small-grid" ? "text-black" : "text-white"} w-8 h-8`} />
                  </button>

                  {/* Sorting Dropdown */}
                  <div className="relative w-[220px]" ref={dropdownRef}>
                    <div 
                      className="flex justify-between items-center cursor-pointer px-[19px] h-[46px] border border-[#E6E6E6] dark:border-[#343434] bg-white dark:bg-transparent text-black dark:text-white rounded text-[14px] font-medium" 
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      {selectedSort.label}
                      <IoChevronDown className={`${isOpen ? "rotate-180" : ""} transition-transform`} />
                    </div>
                    {isOpen && (
                      <div className="absolute top-full left-0 w-full mt-1 border border-[#E6E6E6] dark:border-[#343434] bg-white dark:bg-[#0D0D0D] rounded shadow-md z-50">
                        {sortOptions.map((option) => (
                          <div 
                            key={option.id} 
                            onClick={() => handleSortChange(option)} 
                            className="px-4 py-2 cursor-pointer text-black dark:text-white text-[14px] hover:bg-[#F5F5F5] dark:hover:bg-[#1A1A1A]"
                          >
                            {option.label}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-[18px] font-medium text-black dark:text-white">
                  Showing <span>{products.length}</span> of {pagination.total} Products
                </p>
              </div>

              {/* PRODUCTS GRID */}
              {loading ? (
                <div className="text-center py-20 text-black dark:text-white">
                  <p>Loading products...</p>
                </div>
              ) : products.length > 0 ? (
                <div className={`grid gap-[20px] transition-all duration-300 ${viewType === "grid" ? (openFilter ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4") : (openFilter ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-[7px] sm:gap-[10px] md:gap-[15px]" : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-[7px] sm:gap-[10px] md:gap-[15px]")}`}>
                  {products.map((product) => (
                    <article key={product._id} className="border rounded-[8px] sm:rounded-[14px] flex flex-col p-[15px] border-[#E6E6E6] dark:border-[#1E1E1E] bg-transparent dark:bg-[#0D0D0D] hover:shadow-lg transition-shadow duration-300 hover:shadow-[#EFB24D]/20 h-full relative cursor-pointer group">
                      
                      {/* VIEWPORT BUTTON - FIXED */}
                      <button 
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          setSelectedCard(product);
                          setOpenView(true);
                        }} 
                        className="absolute top-[15px] right-[15px] w-8 h-8 flex items-center justify-center cursor-pointer transition z-10" 
                        aria-label="Open viewport"
                      >
                        <BsArrowsAngleExpand className="text-black dark:text-white opacity-70 group-hover:opacity-100 transition w-5 h-5" />
                      </button>

                      <div className={`flex items-center justify-center rounded-[4px] ${viewType === "small-grid" ? "h-[140px]" : "h-[180px]"}`}>
                        <Image 
                          src={product.thumbnail_url || product.images?.[0] || '/placeholder.png'} 
                          alt={product.name} 
                          width={120} 
                          height={180} 
                          className="h-full object-contain group-hover:scale-105 transition-transform" 
                        />
                      </div>
                      <h4 className="text-[14px] sm:text-[16px] font-medium text-black dark:text-white mt-[20px] mb-[10px]">
                        {product.name}
                      </h4>
                      <p className="text-[15px] font-normal opacity-70 mt-auto text-[#6C6C6C]">
                        ${product.listing_price || product.price}
                      </p>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 text-black dark:text-white">
                  <p>No products found</p>
                </div>
              )}
            </div>

            {/* PAGINATION */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-center mt-[40px] md:mt-[70px] lg:mt-[100px]">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setPagination(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))} 
                    disabled={pagination.page === 1} 
                    className="group w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] lg:w-[50px] lg:h-[50px] rounded-full border border-[#E6E6E6] dark:border-[#343434] hover:border-[#75DA5B] hover:bg-[#75DA5B] text-[#6C6C6C] hover:text-white flex items-center justify-center disabled:opacity-50 text-sm px-2"
                  >
                    Prev
                  </button>
                  {[...Array(Math.min(pagination.totalPages, 5))].map((_, i) => (
                    <button 
                      key={i} 
                      onClick={() => setPagination(prev => ({ ...prev, page: i + 1 }))} 
                      className={`w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] text-[18px] font-normal lg:w-[50px] lg:h-[50px] rounded-full border ${pagination.page === i + 1 ? 'bg-[#75DA5B] text-white border-[#75DA5B]' : 'border-[#E6E6E6] dark:border-[#343434] text-[#6C6C6C] hover:border-[#75DA5B]'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button 
                    onClick={() => setPagination(prev => ({ ...prev, page: Math.min(prev.totalPages, prev.page + 1) }))} 
                    disabled={pagination.page === pagination.totalPages} 
                    className="group w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] lg:w-[50px] lg:h-[50px] rounded-full border border-[#E6E6E6] dark:border-[#343434] hover:border-[#75DA5B] hover:bg-[#75DA5B] text-[#6C6C6C] hover:text-white flex items-center justify-center disabled:opacity-50 text-sm px-2"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* QUICK VIEW MODAL */}
      {openView && selectedCard && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/80 z-[9998]"
            onClick={() => {
              setOpenView(false);
              setSelectedCard(null);
            }}
          />
          
          {/* Modal Content */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <div 
              className="relative w-full max-w-[900px] bg-white dark:bg-[#0D0D0D] text-black dark:text-white rounded-xl overflow-hidden shadow-xl flex flex-col lg:flex-row transition max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Close Button */}
              <button
                onClick={() => {
                  setOpenView(false);
                  setSelectedCard(null);
                }}
                className="absolute top-4 right-4 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 z-10 text-2xl font-bold"
              >
                ✕
              </button>

              {/* Image Section */}
              <div className="w-full lg:w-1/2 bg-white dark:bg-[#111] flex items-center justify-center p-6 overflow-hidden">
                <div className="relative w-full h-[350px] lg:h-[500px]">
                  <Image
                    src={selectedCard.thumbnail_url || selectedCard.images?.[0] || '/placeholder.png'}
                    alt={selectedCard.name}
                    fill
                    className="object-contain"
                    priority
                    sizes="(max-width: 900px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* Content Section */}
              <div className="w-full lg:w-1/2 p-6 space-y-4 overflow-y-auto">
                <h1 className="text-xl pr-[20px] font-semibold leading-snug">
                  {selectedCard.name}
                </h1>

                {/* Price & Actions */}
                <div className="border border-[#E6E6E6] dark:border-white/10 p-4 rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">
                      ${selectedCard.listing_price || selectedCard.price}
                    </span>
                    <span className="text-sm text-gray-400">
                      {new Date(selectedCard.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-[15px]">
                    <button
                      onClick={() => {
                        setOpenView(false);
                        setShowAuthModal(true);
                      }}
                      className="px-3 py-[10px] w-full min-w-[130px] rounded-md bg-[#EFB24D] border border-[#EFB24D] transition-all hover:opacity-90 text-black font-semibold"
                    >
                      Buy Now
                    </button>

                    <button
                      onClick={() => {
                        setOpenView(false);
                        setShowOfferModal(true);
                      }}
                      className="px-3 py-[10px] w-full min-w-[130px] rounded-md border border-[#E6E6E6] dark:border-[#FFFFFF0A] hover:bg-[#EFB24D] hover:border-[#EFB24D] text-black dark:text-white hover:text-black transition-all font-semibold"
                    >
                      Make an Offer
                    </button>
                  </div>
                </div>

                {/* Full Page Link */}
                <div className="mt-[20px]">
                  <Link href={`/product/${selectedCard.slug}`} onClick={() => setOpenView(false)}>
                    <p className="w-[fit-content] rounded-md px-[24px] py-[12px] border border-[#E6E6E6] flex items-center gap-2 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                      <FaArrowUpRightFromSquare /> Open Full Page
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* AUTH MODAL */}
      {showAuthModal && (
        <>
          <div 
            className="fixed inset-0 bg-black/80 z-[9998]"
            onClick={() => setShowAuthModal(false)}
          />
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#0f0f0f] text-black dark:text-white border border-[#E6E6E6] dark:border-[#1a1a1a] rounded-2xl p-8 max-w-md w-full relative">
              <button
                onClick={() => setShowAuthModal(false)}
                className="absolute top-4 right-4 transition text-2xl font-bold"
              >
                ✕
              </button>

              <h2 className="text-2xl font-bold mb-6">Login to Continue</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full dark:bg-[#1a1a1a] border border-[#E6E6E6] dark:border-[#252525] rounded-lg px-4 py-3 placeholder-gray-500 focus:outline-none focus:border-[#EFB24D]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full dark:bg-[#1a1a1a] border border-[#E6E6E6] dark:border-[#252525] rounded-lg px-4 py-3 placeholder-gray-500 focus:outline-none focus:border-[#EFB24D]"
                  />
                </div>

                <button className="w-full bg-[#EFB24D] hover:bg-[#d97706] text-black py-3 rounded-lg font-semibold transition">
                  Login
                </button>

                <p className="text-center text-sm text-gray-400">
                  Don&apos;t have an account? <a href="#" className="text-[#EFB24D] hover:underline">Sign up</a>
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* OFFER MODAL */}
      {showOfferModal && (
        <>
          <div 
            className="fixed inset-0 bg-black/80 z-[9998]"
            onClick={() => setShowOfferModal(false)}
          />
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#0f0f0f] border border-[#E6E6E6] dark:border-[#1a1a1a] text-black dark:text-white rounded-2xl p-8 max-w-md w-full relative">
              <button
                onClick={() => setShowOfferModal(false)}
                className="absolute top-4 right-4 transition text-2xl font-bold"
              >
                ✕
              </button>

              <h2 className="text-2xl font-bold mb-6">Make an Offer</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Your Offer</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full bg-white dark:bg-[#1a1a1a] border border-[#E6E6E6] dark:border-[#252525] rounded-lg pl-8 pr-4 py-3 placeholder-gray-500 focus:outline-none focus:border-[#EFB24D]"
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    Listed price: ${selectedCard?.listing_price || selectedCard?.price}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message (Optional)</label>
                  <textarea
                    placeholder="Add a message to the seller..."
                    rows={4}
                    className="w-full bg-white dark:bg-[#1a1a1a] border border-[#E6E6E6] dark:border-[#252525] rounded-lg px-4 py-3 placeholder-gray-500 focus:outline-none focus:border-[#EFB24D] resize-none"
                  />
                </div>

                <button className="w-full bg-[#EFB24D] hover:bg-[#d97706] text-black py-3 rounded-lg font-semibold transition">
                  Submit Offer
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}