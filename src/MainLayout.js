import React, { useContext } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Body from "./components/layout/Body";
import { AuthContext } from "./components/auth/AuthContext";

const MainLayout = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext); // 인증 상태 업데이트

  const handleLogout = async () => {
    try {
      await axios.post(
        "/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      // 로그아웃 후 인증 상태 업데이트 및 리다이렉트
      setIsAuthenticated(false);
      navigate("/login");
    } catch (error) {
      console.error("로그아웃 처리 중 오류:", error);

      // 로그아웃 실패 시에도 인증 상태 초기화
      setIsAuthenticated(false);
      navigate("/login");
    }
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <Header onLogout={handleLogout} />

      {/* Body: Header 아래에 LNB와 MDI 배치 */}
      <Box sx={{ flexGrow: 1, display: "flex", overflow: "hidden" }}>
        <Body />
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default MainLayout;
