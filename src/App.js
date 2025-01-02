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
      const result = await checkAuthentication();
      setAuthState({ isAuthenticated: result.isAuthenticated, loading: false });
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