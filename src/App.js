import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import MainLayout from "./MainLayout";

const App = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {/* 초기 화면: 로그인 */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/main" /> : <Login />} />

        {/* 로그인 */}
        <Route path="/login" element={<Login />} />

        {/* 회원가입 */}
        <Route path="/register" element={<Register />} />

        {/* 메인 화면 */}
        <Route
          path="/main"
          element={isAuthenticated ? <MainLayout /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;