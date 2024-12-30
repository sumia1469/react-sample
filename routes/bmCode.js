const express = require('express');
const {
  createBmCodeGrp,
  getBmCodeGrpById,
  createBmCode,
  getBmCodeById,
  updateBmCode,
  deleteBmCode,
} = require('../controllers/bmCodeController');
const router = express.Router();

// BM Code Group Routes
router.post('/bmCodeGrp', createBmCodeGrp); // Create new bm_code_grp
router.get('/bmCodeGrp/:grp_cd', getBmCodeGrpById); // Get bm_code_grp by GRP_CD

// BM Code Routes
router.post('/bmCode', createBmCode); // Create new bm_code
router.get('/bmCode/:com_cd', getBmCodeById); // Get bm_code by COM_CD
router.put('/bmCode/:com_cd', updateBmCode); // Update bm_code
router.delete('/bmCode/:com_cd', deleteBmCode); // Delete bm_code

module.exports = router;