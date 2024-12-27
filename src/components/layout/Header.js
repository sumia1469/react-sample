import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Header = ({ onLogout }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My Application
        </Typography>
        <Button color="inherit" onClick={onLogout}>
          로그아웃
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;