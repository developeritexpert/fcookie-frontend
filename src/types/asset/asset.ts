// types/asset/asset.ts
export interface AssetFilter {
  groupId: string;
  valueId: string;
}

export interface AssetAttribute {
  key: string;
  value: string;
}

export interface AssetGrading {
  grader?: string;
  grade?: string;
  cert_number?: string;
  population?: number;
}

export interface Asset {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  details?: string;
  meta_title?: string;
  meta_description?: string;
  categoryId: string | { _id: string; name: string; slug: string };
  filters: AssetFilter[];
  attributes: AssetAttribute[];
  grading?: AssetGrading;
  price: number;
  listing_price?: number;
  listing_time?: string;
  currency: 'USD' | 'EUR' | 'GBP';
  quantity: number;
  images: string[];
  thumbnail_url?: string;
  video_url?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'ARCHIVED' ;
  visibility: 'PUBLIC' | 'PRIVATE' | 'DRAFT';
  owner_id: string | { _id: string; name: string; email: string };
  reseller_id?: string;
  resell_price?: number;
  resell_time?: string;
  reseller_users?: string[];
  highest_offer_price: number;
  offer_count: number;
  views_count: number;
  likes_count: number;
  saved_count: number;
  createdAt: string;
  updatedAt: string;
}

export interface AssetFilter {
  groupId: string;
  valueId: string;
}


export interface AssetFormValues {
  name: string;
  description?: string;
  details?: string;
  meta_title?: string;
  meta_description?: string;
  categoryId: string;
  filters: AssetFilter[];
  attributes: AssetAttribute[];
  grading: AssetGrading;
  price: number;
  listing_price?: number;
  currency: string;
  quantity: number;
  status: string;
  visibility: string;
}
export interface AssetListResponse {
  data: Asset[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}