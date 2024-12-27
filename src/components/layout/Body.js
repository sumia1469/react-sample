import React, { useState } from "react";
import {
  Grid,
  Box,
  Tabs,
  Tab,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Body = () => {
  const [tabs, setTabs] = useState([{ id: 0, label: "홈" }]);
  const [currentTab, setCurrentTab] = useState(0);

  // 메뉴 클릭 시 탭 추가
  const handleAddTab = (label) => {
    const existingTab = tabs.find((tab) => tab.label === label);
    if (!existingTab) {
      const newTabId = tabs.length > 0 ? tabs[tabs.length - 1].id + 1 : 0;
      setTabs([...tabs, { id: newTabId, label }]);
      setCurrentTab(newTabId);
    } else {
      setCurrentTab(existingTab.id);
    }
  };

  // 탭 변경 핸들러
  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  // 탭 닫기 핸들러
  const handleCloseTab = (id) => {
    const updatedTabs = tabs.filter((tab) => tab.id !== id);
    setTabs(updatedTabs);

    // 닫힌 탭이 현재 활성화된 탭일 경우, 이전 또는 첫 번째 탭으로 이동
    if (currentTab === id) {
      const newCurrentTab = updatedTabs.length > 0 ? updatedTabs[updatedTabs.length - 1].id : 0;
      setCurrentTab(newCurrentTab);
    }
  };

  return (
    <Grid container sx={{ flexGrow: 1 }}>
      {/* LNB (Left Navigation Bar) */}
      <Grid item xs={2}>
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
          }}
        >
          <List>
            {["메뉴 1", "메뉴 2", "메뉴 3"].map((menu, index) => (
              <ListItem button key={index} onClick={() => handleAddTab(menu)}>
                <ListItemText primary={menu} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Grid>

      {/* MDI 영역 */}
      <Grid item xs={10} sx={{ display: "flex", flexDirection: "column" }}>
        {/* 동적 탭 영역 */}
        <Tabs
          value={currentTab}
          onChange={handleChangeTab}
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {tab.label}
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation(); // 탭 클릭 이벤트와 겹치지 않도록 막음
                      handleCloseTab(tab.id);
                    }}
                    sx={{ ml: 1 }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              }
              onClick={() => setCurrentTab(tab.id)}
            />
          ))}
        </Tabs>

        {/* 탭 콘텐츠 렌더링 */}
        <Box sx={{ flexGrow: 1, p: 2 }}>
          {tabs[currentTab]?.label === "홈" && (
            <Typography>홈 화면 콘텐츠</Typography>
          )}
          {tabs[currentTab]?.label === "메뉴 1" && (
            <Typography>메뉴 1의 콘텐츠</Typography>
          )}
          {tabs[currentTab]?.label === "메뉴 2" && (
            <Typography>메뉴 2의 콘텐츠</Typography>
          )}
          {tabs[currentTab]?.label === "메뉴 3" && (
            <Typography>메뉴 3의 콘텐츠</Typography>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Body;