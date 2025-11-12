const express = require('express');
const adminCont = require('../controllers/adminCont')
const { checkAdmin } = require('../middleWares/authMiddleWare');

const router = express.Router();

router.get('/dashboard', checkAdmin, adminCont.getAdminDashboardPage);
router.get('/add-transcation', checkAdmin, adminCont.getAddTransPage);
router.post('/add-transcation', adminCont.AddTranscations); 
router.get('/manage-transcation', checkAdmin, adminCont.getManageTransPage); 
router.post('/transactions/:id/delete', adminCont.deleteTransaction);
router.post('/update-balance', checkAdmin, adminCont.AddBalance);

module.exports = router