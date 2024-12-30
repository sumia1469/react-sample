const mongoose = require('mongoose');

const bmCodeGrpSchema = new mongoose.Schema(
  {
    grp_cd: { type: String, required: true, unique: true },
    grp_nm: { type: String, required: false },
    sort_order : { type: Number, required: false },
    is_use: { type: String, enum: ['Y', 'N'], required: false },
    note: { type: String, required: false },
  },
  { timestamps: true }
);

const BmCodeGrp = mongoose.model('BmCodeGrp', bmCodeGrpSchema);
module.exports = BmCodeGrp;