const express = require("express");
const router = express.Router();
const Menu = require("../models/Menu"); // 메뉴 모델

// 메뉴 데이터 가져오기
router.get("/", async (req, res) => {
    try {
      // 모든 메뉴 가져오기
      const menus = await Menu.find({ useYn: "Y" }).sort({ outptSeq: 1 });
  
      // 메뉴 계층 구조 생성
      const menuTree = buildMenuTree(menus);
  
      res.json(menuTree);
    } catch (err) {
      res.status(500).json({ message: "Error fetching menus", error: err.message });
    }
  });
  
  // 계층 구조 생성 함수
  const buildMenuTree = (menus, topMenuId = "000000000") => {
    return menus
      .filter((menu) => menu.topMenuId === topMenuId)
      .map((menu) => ({
        ...menu._doc, // Mongoose에서 반환된 문서를 JavaScript 객체로 변환
        children: buildMenuTree(menus, menu.menuId),
      }));
  };

  // 메뉴 등록
  router.post("/", async (req, res) => {
    const { menuId, menuNm, menuLvl, topMenuId } = req.body;
  
    // 필수 필드 검증
    if (!menuId || !menuNm || !menuLvl || !topMenuId) {
      return res.status(400).json({
        message: "Missing required fields",
        requiredFields: ["menuId", "menuNm", "menuLvl", "topMenuId"],
      });
    }
  
    try {
      const newMenu = new Menu(req.body);
      await newMenu.save();
      res.status(201).json({ message: "Menu created successfully", menu: newMenu });
    } catch (err) {
      res.status(500).json({ message: "Error creating menu", error: err.message });
    }
  });
  
  module.exports = router;