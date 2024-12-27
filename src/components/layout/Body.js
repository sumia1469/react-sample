import React from "react";
import { Grid } from "@mui/material";
import LNB from "./LNB";
import MDIContents from "./MDIContents";

const Body = () => {
  const handleMenuClick = (menu) => {
    console.log("Menu clicked:", menu);
  };

  return (
    <Grid container sx={{ height: "100%" }}>
      <Grid item>
        <LNB onMenuClick={handleMenuClick} />
      </Grid>
      <Grid item xs>
        <MDIContents />
      </Grid>
    </Grid>
  );
};

export default Body;