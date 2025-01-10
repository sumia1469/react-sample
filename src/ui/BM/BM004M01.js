import React, { useState, useEffect } from "react";
import { Box, Button, Typography, TextField, Table, TableBody, TableCell, TableHead, TableRow, IconButton } from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import axios from "axios";

const MenuManagement = () => {
  const [menus, setMenus] = useState([]);
  const [newMenu, setNewMenu] = useState({ menuId: "", menuNm: "", menuLvl: 1, topMenuId: "000000000" });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMenu({ ...newMenu, [name]: value });
  };

  const handleAddMenu = async () => {
    try {
      const response = await axios.post("/api/menu", newMenu);
      setMenus([...menus, response.data.menu]);
      setNewMenu({ menuId: "", menuNm: "", menuLvl: 1, topMenuId: "000000000" });
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

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        메뉴 관리
      </Typography>
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

export default MenuManagement;