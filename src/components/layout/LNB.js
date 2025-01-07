import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemText, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const LNB = ({ menus, onMenuClick }) => {
  const [openItems, setOpenItems] = useState({});

  // 메뉴 열기/닫기 토글
  const toggleOpen = (id) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // 재귀적으로 메뉴 렌더링
  const renderMenu = (items) =>
    items.map((menu) => (
      <React.Fragment key={menu.menuId}>
        <ListItem
          button
          onClick={() => {
            if (menu.children.length > 0) {
              toggleOpen(menu.menuId);
            } else {
              onMenuClick(menu); // 메뉴 클릭 시 상위로 데이터 전달
            }
          }}
          sx={{
            cursor: "pointer", // 링크 포인터 추가
            "&:hover": {
              backgroundColor: "#f0f0f0", // 선택된 메뉴 배경색 (선택 사항)
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
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box", top: "64px" },
      }}
    >
      <List>{renderMenu(menus)}</List>
    </Drawer>
  );
};

export default LNB;
