import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAdminAPI, getUserAPI } from '../Api/e-commerceApi';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const role = localStorage.getItem('role');
    if(token && !user) {

      const apiCall = role === 'admin' ? getAdminAPI : getUserAPI;
      console.log('User Details:', user);
      apiCall(token).then((response) => {
        console.log('User Data:', response.data);
        setUser(response.data.authenticateUser);
      }).catch((error) => {
        console.log('Error fetching user data:', error);
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');

      })
    }
  }, [token]);

  const login = (token, userData) => {
    setUser(userData);
    localStorage.setItem('role', userData.role);
    localStorage.setItem('token', token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role')
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
