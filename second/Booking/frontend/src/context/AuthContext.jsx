// context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import * as authApi from '../api/authApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await authApi.getCurrentUser();
        setUser(userData);
      } catch (err) {
        console.error('Ошибка получения пользователя:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    const token = localStorage.getItem('token');
    if (token) fetchUser();
    else setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const data = await authApi.login({ username, password });
      sessionStorage.setItem('token', data.token);
      setUser(data.user);
      return true;
    } catch (err) {
      console.error('Ошибка входа:', err);
      return false;
    }
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
