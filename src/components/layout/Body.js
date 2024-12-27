import React, { useState } from "react";
import { Grid } from "@mui/material";
import LNB from "./LNB";
import MDIContents from "./MDIContents";

const Body = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <Grid container sx={{ height: "100%" }}>
      <Grid item>
        <LNB onMenuClick={handleMenuClick} />
      </Grid>
      <Grid item xs>
        <MDIContents activeMenu={activeMenu} />
      </Grid>
    </Grid>
  );
};

export default Body;