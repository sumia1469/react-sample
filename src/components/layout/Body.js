import React, { useState } from "react";
import { Grid } from "@mui/material";
import LNB from "./LNB";
import MDIContents from "./MDIContents";

const Body = ({ menuData, isLnbOpen }) => {
  const [activeMenu, setActiveMenu] = useState(null);

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <Grid container sx={{ height: "100%" }}>
      <Grid item>
        <LNB menus={menuData} onMenuClick={handleMenuClick} isLnbOpen={isLnbOpen} />
      </Grid>
      <Grid item xs>
        <MDIContents activeMenu={activeMenu} />
      </Grid>
    </Grid>
  );
};

export default Body;