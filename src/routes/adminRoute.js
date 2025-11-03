const express = require('express');
const adminCont = require('../controllers/adminCont')
const { checkAdmin } = require('../middleWares/authMiddleWare');

const router = express.Router();

router.get('/dashboard', checkAdmin, adminCont.getAdminDashboardPage)
router.post('/add-transcation', adminCont.AddTranscations)

module.exports = router