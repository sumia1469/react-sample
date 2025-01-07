import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useUser } from "../contexts/UserContext";

const Header = ({ onLogout, menuData, userName, userId, onThemeChange }) => {
  const { user } = useUser();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const topLevelMenus = menuData?.filter((menu) => menu.menuLvl === 1) || [];

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My Application
          </Typography>
          {/* 메뉴 버튼 - 좌측 정렬 */}
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            {topLevelMenus.map((menu) => (
              <Button key={menu.menuId} color="inherit">
                {menu.menuNm}
              </Button>
            ))}
          </Box>

          {/* 사용자 정보 및 설정 버튼 - 우측 정렬 */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body1" sx={{ marginRight: 2 }}>
              {user.userName} ({user.userId})
            </Typography>
            <Button color="inherit" onClick={handleDialogOpen}>
              설정
            </Button>
            <Button color="inherit" onClick={onLogout}>
              로그아웃
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* 설정 다이얼로그 */}
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>설정</DialogTitle>
        <DialogContent>
          <Typography variant="body1">사이트 스킨 설정</Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                onThemeChange("light");
                handleDialogClose();
              }}
            >
              Light Mode
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                onThemeChange("dark");
                handleDialogClose();
              }}
            >
              Dark Mode
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>닫기</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Header;
