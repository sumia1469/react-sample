import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import Loading from "../common/Loading";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useContext(AuthContext);

    // 로딩 중일 때 로딩 화면 표시
    if (isLoading) {
        return <Loading />;
    }

    // 인증되지 않은 경우 로그인 화면으로 리다이렉트
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
