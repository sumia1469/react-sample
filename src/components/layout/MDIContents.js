import React, { useState } from "react";
import { Tabs, Tab, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const MDIContents = () => {
  const [tabs, setTabs] = useState([{ id: 0, label: "홈", content: "홈 화면" }]);
  const [currentTab, setCurrentTab] = useState(0);

  const addTab = (menu) => {
    const existingTab = tabs.find((tab) => tab.id === menu.menuId);
    if (!existingTab) {
      const newTab = {
        id: menu.menuId,
        label: menu.menuNm,
        content: menu.srcPath || `${menu.menuNm} 콘텐츠`,
      };
      setTabs([...tabs, newTab]);
      setCurrentTab(tabs.length);
    } else {
      setCurrentTab(tabs.findIndex((tab) => tab.id === menu.menuId));
    }
  };

  const closeTab = (id) => {
    const updatedTabs = tabs.filter((tab) => tab.id !== id);
    setTabs(updatedTabs);
    setCurrentTab(updatedTabs.length > 0 ? updatedTabs.length - 1 : 0);
  };

  return (
    <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
      <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)} variant="scrollable">
        {tabs.map((tab, index) => (
          <Tab
            key={tab.id}
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {tab.label}
                <IconButton size="small" onClick={() => closeTab(tab.id)}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            }
          />
        ))}
      </Tabs>
      <Box sx={{ p: 2 }}>{tabs[currentTab]?.content || "콘텐츠 없음"}</Box>
    </Box>
  );
};

export default MDIContents;