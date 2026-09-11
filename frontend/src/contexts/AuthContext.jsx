import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiUrl } from '../config/api';

const AuthContext = createContext();

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuthContext deve ser usado dentro de AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const userData = localStorage.getItem('userData');
        if (token && userData) {
          try {
            const parsedUser = JSON.parse(userData);
            if (parsedUser && parsedUser.id && parsedUser.email) {
              const response = await fetch(apiUrl('auth/verify'), { headers: { Authorization: `Bearer ${token}` } });
              if (response.ok) setUser((await response.json()).user);
              else { localStorage.removeItem('authToken'); localStorage.removeItem('userData'); setUser(null); }
            } else { localStorage.removeItem('authToken'); localStorage.removeItem('userData'); }
          } catch { localStorage.removeItem('authToken'); localStorage.removeItem('userData'); }
        }
      } catch { localStorage.removeItem('authToken'); localStorage.removeItem('userData'); }
      finally { setLoading(false); }
    };
    checkAuth();
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      setLoading(true); setError(null);
      const response = await fetch(apiUrl('auth/login'), {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password })
      });
      if (!response.ok) {
        let message = 'Email ou senha incorretos';
        try { message = (await response.json()).error || message; } catch {}
        throw new Error(message);
      }
      const data = await response.json();
      if (!data.token || !data.user) throw new Error('Resposta inválida do servidor');
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userData', JSON.stringify(data.user));
      setUser(data.user); setLoading(false);
      return { success: true };
    } catch (err) {
      setError(err.message || 'Erro ao fazer login. Tente novamente.'); setLoading(false); throw err;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        try { await fetch(apiUrl('auth/logout'), { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }); } catch {}
      }
    } finally {
      localStorage.removeItem('authToken'); localStorage.removeItem('userData'); setUser(null); setError(null);
    }
  }, []);

  const authenticatedFetch = useCallback(async (url, options = {}) => {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('Usuário não autenticado');
    const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, ...options.headers };
    const response = await fetch(apiUrl(url), { ...options, headers });
    if (response.status === 401) logout();
    return response;
  }, [logout]);

  const value = { user, loading, error, isAuthenticated: !!user, login, logout, setError, authenticatedFetch };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
