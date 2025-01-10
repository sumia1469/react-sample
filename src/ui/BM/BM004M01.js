import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import axios from "axios";
import TitleBar from "../../components/common/TitleBar"; // TitleBar 컴포넌트 임포트

const BM004M01 = () => {
  const [menus, setMenus] = useState([]);
  const [newMenu, setNewMenu] = useState({ menuId: "", menuNm: "", menuLvl: 1, topMenuId: "" });
  const [isFavorite, setIsFavorite] = useState(false);
  const [breadcrumb, setBreadcrumb] = useState("");

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get("/api/menu");
        setMenus(response.data);
        generateBreadcrumb(response.data, "001001004"); // 메뉴 ID를 사용하여 경로 생성
      } catch (error) {
        console.error("메뉴 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchMenus();
  }, []);

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

  const generateBreadcrumb = (menus, menuId) => {
    const path = [];
    let currentMenu = findMenuById(menus, menuId);

    while (currentMenu) {
      path.unshift(currentMenu.menuNm);
      currentMenu = findMenuById(menus, currentMenu.topMenuId);
    }

    setBreadcrumb(path.join(" > "));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMenu((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddMenu = async () => {
    try {
      const response = await axios.post("/api/menu", newMenu);
      setMenus([...menus, response.data.menu]);
      setNewMenu({ menuId: "", menuNm: "", menuLvl: 1, topMenuId: "" });
    } catch (error) {
      console.error("메뉴 추가 중 오류 발생:", error);
    }
  };

  const handleDeleteMenu = async (menuId) => {
    try {
      await axios.delete(`/api/menu/${menuId}`);
      setMenus(menus.filter((menu) => menu.menuId !== menuId));
    } catch (error) {
      console.error("메뉴 삭제 중 오류 발생:", error);
    }
  };

  const handleRefresh = () => {
    // 새로고침 로직
  };

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <TitleBar
        title="메뉴 관리"
        breadcrumb={breadcrumb}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
        handleRefresh={handleRefresh}
      />
      <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
        <TextField label="메뉴 ID" name="menuId" value={newMenu.menuId} onChange={handleInputChange} />
        <TextField label="메뉴 이름" name="menuNm" value={newMenu.menuNm} onChange={handleInputChange} />
        <TextField label="메뉴 레벨" name="menuLvl" type="number" value={newMenu.menuLvl} onChange={handleInputChange} />
        <TextField label="상위 메뉴 ID" name="topMenuId" value={newMenu.topMenuId} onChange={handleInputChange} />
        <Button variant="contained" color="primary" onClick={handleAddMenu} startIcon={<Add />}>
          추가
        </Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>메뉴 ID</TableCell>
            <TableCell>메뉴 이름</TableCell>
            <TableCell>메뉴 레벨</TableCell>
            <TableCell>상위 메뉴 ID</TableCell>
            <TableCell>액션</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {menus.map((menu) => (
            <TableRow key={menu.menuId}>
              <TableCell>{menu.menuId}</TableCell>
              <TableCell>{menu.menuNm}</TableCell>
              <TableCell>{menu.menuLvl}</TableCell>
              <TableCell>{menu.topMenuId}</TableCell>
              <TableCell>
                <IconButton color="primary">
                  <Edit />
                </IconButton>
                <IconButton color="secondary" onClick={() => handleDeleteMenu(menu.menuId)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default BM004M01;