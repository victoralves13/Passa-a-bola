const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const apiUrl = (endpoint) => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  if (API_BASE_URL) return `${API_BASE_URL}/api/${cleanEndpoint}`;
  return `/api/${cleanEndpoint}`;
};

export const apiFetch = async (endpoint, options = {}) => {
  return fetch(apiUrl(endpoint), options);
};
