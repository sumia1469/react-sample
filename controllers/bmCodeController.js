const BmCode = require('../models/BmCode');
const BmCodeGrp = require('../models/BmCodeGrp');

// Create new bm_code_grp
const createBmCodeGrp = async (req, res) => {
  try {
    const newCodeGrp = new BmCodeGrp(req.body);
    await newCodeGrp.save();
    res.status(201).json(newCodeGrp);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating bm_code_grp', error: err.message });
  }
};

// Get bm_code_grp by GRP_CD
const getBmCodeGrpById = async (req, res) => {
  try {
    const codeGrp = await BmCodeGrp.findOne({ GRP_CD: req.params.GRP_CD });
    if (!codeGrp) {
      return res.status(404).json({ message: 'Code group not found' });
    }
    res.json(codeGrp);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching bm_code_grp', error: err.message });
  }
};

// Create new bm_code
const createBmCode = async (req, res) => {
  try {
    const newCode = new BmCode(req.body);
    await newCode.save();
    res.status(201).json(newCode);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating bm_code', error: err.message });
  }
};

// Get bm_code by com_cd
const getBmCodeById = async (req, res) => {
  try {
    const code = await BmCode.findOne({ com_cd: req.params.com_cd });
    if (!code) {
      return res.status(404).json({ message: 'Code not found' });
    }
    res.json(code);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching bm_code', error: err.message });
  }
};

// Update bm_code
const updateBmCode = async (req, res) => {
  try {
    const updatedCode = await BmCode.findOneAndUpdate(
      { com_cd: req.params.com_cd },
      req.body,
      { new: true }
    );
    if (!updatedCode) {
      return res.status(404).json({ message: 'Code not found' });
    }
    res.json(updatedCode);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating bm_code', error: err.message });
  }
};

// Delete bm_code
const deleteBmCode = async (req, res) => {
  try {
    const deletedCode = await BmCode.findOneAndDelete({ com_cd: req.params.com_cd });
    if (!deletedCode) {
      return res.status(404).json({ message: 'Code not found' });
    }
    res.json({ message: 'Code deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting bm_code', error: err.message });
  }
};

module.exports = {
  createBmCodeGrp,
  getBmCodeGrpById,
  createBmCode,
  getBmCodeById,
  updateBmCode,
  deleteBmCode,
};
