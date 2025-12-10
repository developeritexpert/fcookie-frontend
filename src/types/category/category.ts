export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
}

export interface CategoryFormValues {
  name: string;
  description: string;
  icon: string;
  status: string;
}

export interface CategoryPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CategoryListResponse {
  data: Category[];
  pagination: CategoryPagination;
}