import React from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Body from "./components/layout/Body";

const MainLayout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // 백엔드로 로그아웃 요청
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 토큰 삭제
      localStorage.removeItem("token");

      // 로그인 화면으로 이동
      navigate("/login");
    } catch (error) {
      console.error("로그아웃 처리 중 오류:", error);
      // 로그아웃 실패 시에도 클라이언트 토큰을 제거하고 리디렉션
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <Header onLogout={handleLogout} />

      {/* Body */}
      <Box sx={{ flexGrow: 1 }}>
        <Body />
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default MainLayout;