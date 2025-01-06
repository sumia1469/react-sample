import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get("/api/auth/checkAuth", { withCredentials: true });
                setIsAuthenticated(response.status === 200);
            } catch {
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false); // 로딩 완료
            }
        };
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};