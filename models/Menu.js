const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema({
  menuId: { type: String, required: true, unique: true }, // 필수
  menuNm: { type: String, required: true }, // 필수
  menuLvl: { type: Number, required: true }, // 필수
  outptSeq: { type: Number },
  pgmId: { type: String },
  useYn: { type: String, required: true }, // 필수
  topMenuId: { type: String, required: true }, // 필수
  srcPath: { type: String },
});

module.exports = mongoose.model("Menu", MenuSchema);
