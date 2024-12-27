import React, { useState } from "react";
import { Tabs, Tab, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const MDIContents = ({ activeMenu }) => {
  const [tabs, setTabs] = useState([{ id: "home", label: "홈", content: "홈 콘텐츠" }]);
  const [currentTab, setCurrentTab] = useState("home");

  // 탭 추가
  React.useEffect(() => {
    if (activeMenu && !tabs.some((tab) => tab.id === activeMenu.menuId)) {
      setTabs((prevTabs) => [
        ...prevTabs,
        {
          id: activeMenu.menuId,
          label: activeMenu.menuNm,
          content: activeMenu.srcPath || `${activeMenu.menuNm} 콘텐츠`,
        },
      ]);
      setCurrentTab(activeMenu.menuId);
    }
  }, [activeMenu, tabs]);

  // 탭 닫기
  const closeTab = (id) => {
    const filteredTabs = tabs.filter((tab) => tab.id !== id);
    setTabs(filteredTabs);

    // 현재 탭이 닫혔다면, 다른 탭으로 이동
    if (currentTab === id && filteredTabs.length > 0) {
      setCurrentTab(filteredTabs[filteredTabs.length - 1].id);
    } else if (filteredTabs.length === 0) {
      setCurrentTab("home");
    }
  };

  return (
    <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
      {/* 탭 영역 */}
      <Tabs
        value={currentTab}
        onChange={(e, newValue) => setCurrentTab(newValue)}
        variant="scrollable"
        scrollButtons="auto"
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            value={tab.id}
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {tab.label}
                {tab.id !== "home" && (
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      closeTab(tab.id);
                    }}
                    sx={{ ml: 1 }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>
            }
          />
        ))}
      </Tabs>

      {/* 콘텐츠 영역 */}
      <Box sx={{ p: 2 }}>
        {tabs.find((tab) => tab.id === currentTab)?.content || "콘텐츠 없음"}
      </Box>
    </Box>
  );
};

export default MDIContents;