import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const Header = ({ onLogout, menuData }) => {
  const topLevelMenus = menuData?.filter((menu) => menu.menuLvl === 1) || [];

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My Application
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", marginRight: 2 }}>
          {topLevelMenus.map((menu) => (
            <Button key={menu.menuId} color="inherit">
              {menu.menuNm}
            </Button>
          ))}
        </Box>
        <Button color="inherit" onClick={onLogout}>
          로그아웃
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;