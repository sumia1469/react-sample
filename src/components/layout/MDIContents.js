import React, { useState, useEffect } from "react";
import { Tabs, Tab, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import DynamicComponentLoader from "./DynamicComponentLoader";

const MDIContents = ({ activeMenu }) => {
  const [tabs, setTabs] = useState([{ id: "home", label: "홈", content: "홈 콘텐츠" }]);
  const [currentTab, setCurrentTab] = useState("home");

  // 메뉴 클릭 시 탭 추가 또는 해당 탭 활성화
  useEffect(() => {
    if (activeMenu) {
      const existingTab = tabs.find((tab) => tab.id === activeMenu.menuId);

      if (existingTab) {
        // 이미 열려 있는 탭으로 이동
        setCurrentTab(existingTab.id);
      } else {
        // 새 탭 추가
        setTabs((prevTabs) => [
          ...prevTabs,
          {
            id: activeMenu.menuId,
            label: activeMenu.menuNm,
            content: <DynamicComponentLoader srcPath={activeMenu.srcPath} menuId={activeMenu.menuId} onRefresh={refreshTab}/>, // 동적 컴포넌트 로드 및 메뉴 ID 전달
          },
        ]);
        setCurrentTab(activeMenu.menuId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeMenu]);

  // 탭 닫기
  const closeTab = (id) => {
    setTabs((prevTabs) => {
      const filteredTabs = prevTabs.filter((tab) => tab.id !== id);

      // 현재 탭이 닫힌 경우
      if (currentTab === id) {
        // 닫힌 탭이 마지막 탭이면 이전 탭으로 이동
        if (filteredTabs.length > 0) {
          const index = prevTabs.findIndex((tab) => tab.id === id);
          const newCurrentTab = index > 0 ? filteredTabs[index - 1].id : filteredTabs[0].id;
          setCurrentTab(newCurrentTab);
        } else {
          // 모든 탭이 닫힌 경우 홈으로 이동
          setCurrentTab("home");
        }
      }

      return filteredTabs;
    });
  };

  // 전체 탭 닫기
  const closeAllTabs = () => {
    setTabs([{ id: "home", label: "홈", content: "홈 콘텐츠" }]);
    setCurrentTab("home");
  };

  // 새로고침
  const refreshTab = (id) => {
    setTabs((prevTabs) => {
      const updatedTabs = prevTabs.map((tab) => {
        if (tab.id === id) {
          return {
            ...tab,
            content: <DynamicComponentLoader srcPath={activeMenu.srcPath} menuId={activeMenu.menuId} key={Date.now()} onRefresh={refreshTab}/>, // 새로고침 시 컴포넌트 다시 로드
          };
        }
        return tab;
      });
      return updatedTabs;
    });
  };

  return (
    <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Tabs
          value={currentTab}
          onChange={(e, newValue) => setCurrentTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ flexGrow: 1 }}
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
                        closeTab(tab.id); // 탭 닫기
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
        <IconButton
          size="small"
          onClick={closeAllTabs}
          sx={{ ml: 2 }}
          title="모든 탭 닫기"
        >
          <ClearAllIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box sx={{ p: 2 }}>
        {tabs.find((tab) => tab.id === currentTab)?.content || "콘텐츠 없음"}
      </Box>
    </Box>
  );
};

export default MDIContents;