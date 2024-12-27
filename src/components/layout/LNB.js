import React, { useState, useEffect } from "react";
import { Drawer, List, ListItem, ListItemText, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import axios from "axios";

const LNB = ({ onMenuClick }) => {
  const [menus, setMenus] = useState([]);
  const [openItems, setOpenItems] = useState({});

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/menu");
        setMenus(response.data);
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };

    fetchMenus();
  }, []);

  const toggleOpen = (id) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderMenu = (items) =>
    items.map((menu) => (
      <React.Fragment key={menu.menuId}>
        <ListItem button onClick={() => (menu.children.length ? toggleOpen(menu.menuId) : onMenuClick(menu))}>
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
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" , top:"64px"},
      }}
    >
      <List>{renderMenu(menus)}</List>
    </Drawer>
  );
};

export default LNB;