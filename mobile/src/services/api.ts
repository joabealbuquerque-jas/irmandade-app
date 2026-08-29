import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();
        const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
          refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data;
        setAuthToken(accessToken);
        setRefreshToken(newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        clearAuthTokens();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Funções de armazenamento de tokens
let authToken: string | null = null;
let refreshTokenValue: string | null = null;

export const setAuthToken = (token: string) => {
  authToken = token;
};

export const setRefreshToken = (token: string) => {
  refreshTokenValue = token;
};

export const getAuthToken = () => authToken;

export const getRefreshToken = () => refreshTokenValue;

export const clearAuthTokens = () => {
  authToken = null;
  refreshTokenValue = null;
};

// Serviços de autenticação
export const authService = {
  register: async (data: {
    name: string;
    username: string;
    email: string;
    cpf: string;
    phone?: string;
    password: string;
    congregation?: string;
    role?: string;
    baptism_date?: string;
    city?: string;
    state?: string;
  }) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  logout: async () => {
    const refreshToken = getRefreshToken();
    await api.post('/auth/logout', { refreshToken });
    clearAuthTokens();
  },

  refreshToken: async () => {
    const refreshToken = getRefreshToken();
    const response = await api.post('/auth/refresh-token', { refreshToken });
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },

  updateProfile: async (id: number, data: any) => {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  },

  searchUsers: async (query: string) => {
    const response = await api.get(`/users/search?q=${query}`);
    return response.data;
  },
};

export const postService = {
  getFeed: async (limit = 50, offset = 0) => {
    const response = await api.get(`/posts?limit=${limit}&offset=${offset}`);
    return response.data;
  },

  createPost: async (data: {
    content: string;
    type?: string;
    media_urls?: string[];
    link_url?: string;
    poll_options?: string[];
    is_story?: boolean;
  }) => {
    const response = await api.post('/posts', data);
    return response.data;
  },

  likePost: async (postId: number, type: 'like' | 'prayer' = 'like') => {
    const response = await api.post(`/posts/${postId}/like`, { type });
    return response.data;
  },

  getComments: async (postId: number, limit = 20, offset = 0) => {
    const response = await api.get(`/posts/${postId}/comments?limit=${limit}&offset=${offset}`);
    return response.data;
  },

  addComment: async (postId: number, content: string, parent_id?: number) => {
    const response = await api.post(`/posts/${postId}/comments`, { content, parent_id });
    return response.data;
  },
};

export default api;
