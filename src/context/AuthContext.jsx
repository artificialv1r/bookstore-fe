import { jwtDecode } from 'jwt-decode';
import React, { createContext, useContext, useEffect, useState } from 'react';

let globalLogout = null;
export const getGlobalLogout = () => globalLogout;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setIsAuthenticated(true);

                const role = decoded.role;
                setRole(role);
            } catch (err) {
                console.error('Invalid token');
                setIsAuthenticated(false);
                setRole(null);
            }
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        const decoded = jwtDecode(token);

        setIsAuthenticated(true);

        const role = decoded.role;
        setRole(role);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setRole(null);
    };

    globalLogout = logout;

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, role }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);