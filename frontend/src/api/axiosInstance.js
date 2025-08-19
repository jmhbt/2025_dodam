import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`, // ← 너의 백엔드 주소 (포트 포함)
});

// JWT 토큰이 있을 경우 Authorization 헤더에 자동 추가
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
