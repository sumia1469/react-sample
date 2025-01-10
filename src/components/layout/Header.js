import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useUser } from "../contexts/UserContext";

const Header = ({ onLogout, menuData, toggleLnb, onThemeChange }) => {
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
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleLnb}>
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" sx={{ marginRight: 2 }}>
              My Application
            </Typography>
            {topLevelMenus.map((menu) => (
              <Button key={menu.menuId} color="inherit">
                {menu.menuNm}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
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