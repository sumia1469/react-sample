import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import MainLayout from "./MainLayout";
import { checkAuthentication } from "./utils/auth";

const App = () => {
  const [authState, setAuthState] = useState({ isAuthenticated: false, loading: true });

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const result = await checkAuthentication();
        console.log("Authentication result:", result);
        setAuthState({ isAuthenticated: result.isAuthenticated, loading: false });
      } catch (error) {
        console.error(error);
        setAuthState({ isAuthenticated: false, loading: false }); // 에러 시 기본값 설정
      }
    };
    verifyAuth();
  }, []);

  if (authState.loading) {
    return <div>Loading...</div>; // 로딩 상태 표시
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={authState.isAuthenticated ? <Navigate to="/main" /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/main"
          element={authState.isAuthenticated ? <MainLayout /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;