import React, { useContext, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Body from "./components/layout/Body";
import { AuthContext } from "./components/auth/AuthContext";

const MainLayout = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);
  const [menuData, setMenuData] = useState([]);
  const [isLnbOpen, setIsLnbOpen] = useState(true);

  const handleLogout = async () => {
    try {
      await axios.post(
        "/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      setIsAuthenticated(false);
      navigate("/login");
    } catch (error) {
      console.error("로그아웃 처리 중 오류:", error);
      setIsAuthenticated(false);
      navigate("/login");
    }
  };

  const toggleLnb = () => {
    setIsLnbOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await axios.get("/api/menu");
        setMenuData(response.data);
      } catch (error) {
        console.error("메뉴 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchMenuData();
  }, []);

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header onLogout={handleLogout} menuData={menuData} toggleLnb={toggleLnb} />
      <Box sx={{ flexGrow: 1, display: "flex", overflow: "hidden" }}>
        <Body menuData={menuData} isLnbOpen={isLnbOpen} />
      </Box>
      <Footer />
    </Box>
  );
};

export default MainLayout;