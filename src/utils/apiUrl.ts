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


