import React from "react";
import { Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Body from "./components/layout/Body";

const MainLayout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
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

      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("로그아웃 처리 중 오류:", error);
      localStorage.removeItem("token");
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