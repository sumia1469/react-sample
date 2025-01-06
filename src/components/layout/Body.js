import React, { useState } from "react";
import { Grid } from "@mui/material";
import LNB from "./LNB";
import MDIContents from "./MDIContents";

const Body = ({ menuData }) => {
  const [activeMenu, setActiveMenu] = useState(null);

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <Grid container sx={{ height: "100%" }}>
      {/* LNB: 메뉴 클릭 핸들러 전달 */}
      <Grid item>
        <LNB menus={menuData} onMenuClick={handleMenuClick} />
      </Grid>

      {/* MDIContents: 활성화된 메뉴 전달 */}
      <Grid item xs>
        <MDIContents activeMenu={activeMenu} />
      </Grid>
    </Grid>
  );
};

export default Body;