const mongoose = require('mongoose');

const bmCodeSchema = new mongoose.Schema(
  {
    grp_cd: { type: String, required: true },
    com_cd: { type: String, required: true, unique: true },
    com_nm: { type: String, required: false },
    sort_order: { type: Number, required: false },
    is_use: { type: String, enum: ['Y', 'N'], required: false },
    attr_value1: { type: String, required: false },
    attr_value2: { type: String, required: false },
    attr_value3: { type: String, required: false },
    note: { type: String, required: false },
  },
  { timestamps: true }
);

const BmCode = mongoose.model('BmCode', bmCodeSchema);
module.exports = BmCode;
