import React, { useState } from "react";
import { Grid, Box } from "@mui/material";
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
        <Box
          sx={{
            marginLeft: isLnbOpen ? '20px' : '20px', // LNB가 열리고 닫힐 때 MDIContents의 마진 조절
            transition: 'margin-left 0.3s', // 애니메이션 효과 추가
            height: '100%',
            overflow: 'hidden'
          }}
        >
          <MDIContents activeMenu={activeMenu} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Body;