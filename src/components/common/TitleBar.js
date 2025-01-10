import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Star, StarBorder, Refresh } from "@mui/icons-material";
import axios from "axios";

const TitleBar = ({ title, menuId, isFavorite, toggleFavorite, handleRefresh }) => {
  const [breadcrumb, setBreadcrumb] = useState("");
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get("/api/menu");
        setMenus(response.data);
      } catch (error) {
        console.error("메뉴 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchMenus();
  }, []);

  useEffect(() => {
    const generateBreadcrumb = (menus, menuId) => {
      const path = [];
      let currentMenu = findMenuById(menus, menuId);

      while (currentMenu) {
        path.unshift(currentMenu.menuNm);
        currentMenu = findMenuById(menus, currentMenu.topMenuId);
      }

      setBreadcrumb(path.join(" > "));
    };

    const findMenuById = (menus, menuId) => {
      for (const menu of menus) {
        if (menu.menuId === menuId) {
          return menu;
        }
        if (menu.children) {
          const found = findMenuById(menu.children, menuId);
          if (found) {
            return found;
          }
        }
      }
      return null;
    };

    if (menus.length > 0 && menuId) {
      generateBreadcrumb(menus, menuId);
    }
  }, [menus, menuId]);

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
      <Typography variant="h4">{title}</Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography variant="body1">{breadcrumb}</Typography>
        <IconButton onClick={toggleFavorite} color="primary">
          {isFavorite ? <Star /> : <StarBorder />}
        </IconButton>
        <IconButton onClick={handleRefresh} color="primary">
          <Refresh />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TitleBar;