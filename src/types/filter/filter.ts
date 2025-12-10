// types/filter/filter.ts
export interface FilterValue {
  _id: string;  // make required
  groupId: string | { _id: string; name?: string; slug?: string };
  label: string;
  valueKey: string;
  archived: boolean;
  status: "ACTIVE" | "INACTIVE";
  order: number;
  createdAt: string;
  updatedAt: string;
}


export interface FilterGroup {
  _id: string;
  name: string;
  slug: string;
  type: 'single' | 'multi' | 'number' | 'text'; // Updated to match backend enum
  required: boolean;
  archived: boolean;
  status: 'ACTIVE' | 'INACTIVE';
  protected: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
  values?: FilterValue[];
}

export interface FilterGroupFormValues {
  name: string;
  slug?: string;
  type: 'single' | 'multi' | 'number' | 'text'; // Updated to match backend enum
  required: boolean;
  status: 'ACTIVE' | 'INACTIVE';
  protected: boolean;
  order?: number;
}

export interface FilterValueFormValues {
  groupId: string;
  label: string;
  valueKey: string;
  status: 'ACTIVE' | 'INACTIVE';
  order?: number;
}

export interface FilterGroupListResponse {
  data: FilterGroup[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface FilterValueListResponse {
  data: FilterValue[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}