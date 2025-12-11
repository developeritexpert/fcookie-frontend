const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
const API_BASE = `${BASE_URL}/api`;


// here are base api:::::
const AUTH_API_BASE = `${API_BASE}/auth`;
export const USER_API_BASE = `${API_BASE}/users`;
const ADMIN_API_BASE = `${API_BASE}/admins`;

export const API_URL = {
    // Auth URLs
    LOGIN_USER: `${AUTH_API_BASE}/login`,
    REGISTER_USER: `${AUTH_API_BASE}/register`,
    LOGOUT_USER: `${AUTH_API_BASE}/logout`,

};


// Category API URLs
const CATEGORY_API_BASE = `${API_BASE}/category`;

export const CATEGORY_API = {
  GET_ALL_CATEGORIES: `${CATEGORY_API_BASE}/`,
  CREATE_CATEGORY: `${CATEGORY_API_BASE}/`,
  GET_CATEGORY_BY_ID: (id: string) => `${CATEGORY_API_BASE}/${id}`,
  UPDATE_CATEGORY: (id: string) => `${CATEGORY_API_BASE}/${id}`,
  DELETE_CATEGORY: (id: string) => `${CATEGORY_API_BASE}/${id}`,
};

// utils/apiUrl.ts (add these to your existing file)
const FILTER_GROUP_API_BASE = `${API_BASE}/filter-groups`;

export const FILTER_GROUP_API = {
  GET_ALL: `${FILTER_GROUP_API_BASE}`,
  GET_BY_ID: (id: string) => `${FILTER_GROUP_API_BASE}/${id}`,
  CREATE: `${FILTER_GROUP_API_BASE}`,
  UPDATE: (id: string) => `${FILTER_GROUP_API_BASE}/${id}`,
  DELETE: (id: string) => `${FILTER_GROUP_API_BASE}/${id}`,
};

const FILTER_VALUE_API_BASE = `${API_BASE}/filter-values`;
export const FILTER_VALUE_API = {
  GET_ALL: `${FILTER_VALUE_API_BASE}`,
  GET_BY_ID: (id: string) => `${FILTER_VALUE_API_BASE}/${id}`,
  CREATE: `${FILTER_VALUE_API_BASE}`,
  UPDATE: (id: string) => `${FILTER_VALUE_API_BASE}/${id}`,
  DELETE: (id: string) => `${FILTER_VALUE_API_BASE}/${id}`,
};

// Asset API URLs
const ASSET_API_BASE = `${API_BASE}/asset`;

export const ASSET_API = {
  GET_ALL_ASSETS: `${ASSET_API_BASE}/`,
  CREATE_ASSET: `${ASSET_API_BASE}/`,
  GET_ASSET_BY_ID: (id: string) => `${ASSET_API_BASE}/${id}`,
  UPDATE_ASSET: (id: string) => `${ASSET_API_BASE}/${id}`,
  DELETE_ASSET: (id: string) => `${ASSET_API_BASE}/${id}`,
};