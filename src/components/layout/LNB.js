import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemText, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const LNB = ({ menus, onMenuClick, isLnbOpen }) => {
  const [openItems, setOpenItems] = useState({});

  const toggleOpen = (id) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleMenuClick = (menu) => {
    if (menu.children.length > 0) {
      toggleOpen(menu.menuId);
    } else {
      onMenuClick(menu);
    }
  };

  const renderMenu = (items) =>
    items.map((menu) => (
      <React.Fragment key={menu.menuId}>
        <ListItem
          button
          onClick={() => handleMenuClick(menu)}
          sx={{
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          }}
        >
          <ListItemText primary={menu.menuNm} />
          {menu.children.length > 0 && (openItems[menu.menuId] ? <ExpandLess /> : <ExpandMore />)}
        </ListItem>
        {menu.children.length > 0 && (
          <Collapse in={openItems[menu.menuId]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: 4 }}>
              {renderMenu(menu.children)}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    ));

  return (
    <Drawer
      variant="persistent"
      open={isLnbOpen}
      sx={{
        width: isLnbOpen ? 240 : 0, // LNB가 열리고 닫힐 때 너비 조절
        transition: 'width 0.3s', // 애니메이션 효과 추가
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box", top: "64px" },
      }}
    >
      <List>{renderMenu(menus)}</List>
    </Drawer>
  );
};

export default LNB;