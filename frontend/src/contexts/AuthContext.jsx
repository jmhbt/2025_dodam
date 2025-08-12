import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    // 1) axios 기본 헤더
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // 2) 내 프로필 로드
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/me`)
      .then(res => setUser(res.data))
      .catch(() => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
      });
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
