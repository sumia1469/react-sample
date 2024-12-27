const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema({
  menuId: { type: String, required: true },
  menuNm: { type: String, required: true },
  menuLvl: { type: Number, required: true },
  outptSeq: { type: Number },
  menuTypCd: { type: String },
  subMenuId: { type: String },
  pgmId: { type: String },
  useYn: { type: String },
  topMenuId: { type: String, required: true },
  srcPath : { type: String },
});

module.exports = mongoose.model("Menu", MenuSchema);
