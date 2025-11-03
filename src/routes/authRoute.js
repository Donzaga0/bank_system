const express = require('express');
const authCont = require('../controllers/authCont');

const router = express.Router(); 

router.post('/register-admin', authCont.registerAdmin);
router.get('/login-admin', authCont.getAdminLoginPage);
router.post('/login-admin', authCont.loginAdmin);

module.exports = router;