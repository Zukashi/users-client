import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import { login as axiosLogin, logout as axiosLogout, checkAuthStatus as axiosAuthStatus } from '../services/authService';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    isAuthenticating: boolean
}
interface AuthProviderProps {
    children: ReactNode;
}
const AuthContext = createContext<AuthContextType>(null!);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(true);
    useEffect(() => {
        const verifyToken = async () => {
                const isAuthenticated = await axiosAuthStatus()
                setIsAuthenticated(isAuthenticated ? true : false)
                setIsAuthenticating(false);
        };

        verifyToken();
    }, []);


    const login = async (email: string, password: string) => {
        try {
            await axiosLogin(email, password);
            setIsAuthenticated(true);
        } catch (error) {
            throw new Error("Login failed");
        }
    };

    const logout = async () => {
        try {
            await axiosLogout();
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Logout failed:', error);
            throw error;
        }
    };
    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, isAuthenticating }}>
            {children}
        </AuthContext.Provider>
    );
};
