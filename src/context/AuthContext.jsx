import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserFromStorage = () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };
    loadUserFromStorage();
  }, []);

  const login = async (email, senha) => {
    try {
      const response = await api.post('/auth/login', { email, senha });
      const { token: responseToken, usuario } = response.data;

      localStorage.setItem('token', responseToken);
      localStorage.setItem('user', JSON.stringify(usuario));

      setToken(responseToken);
      setUser(usuario);
      return true;
    } catch (error) {
      console.error('Erro no login:', error);
      alert('E-mail ou senha incorretos!');
      return false;
    }
  };

  const register = async (nome, email, senha) => {
    try {
      await api.post('/auth/register', { nome, email, senha });
      alert('Cadastro realizado com sucesso! Faça o login.');
      return true;
    } catch (error) {
      console.error('Erro no registro:', error);
      const errorMsg = error.response?.data?.message || "Erro ao cadastrar.";
      alert(errorMsg);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
        user,
        token,
        login,
        register,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};