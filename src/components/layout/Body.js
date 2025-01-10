import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import LNB from "./LNB";
import MDIContents from "./MDIContents";

const Body = ({ menuData, isLnbOpen }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [key, setKey] = useState(0); // 추가: 강제 업데이트를 위한 키 값

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  // 추가: activeMenu 값이 변경될 때마다 키 값을 증가시켜 강제 업데이트
  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [activeMenu]);

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
          <MDIContents key={key} activeMenu={activeMenu}/>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Body;