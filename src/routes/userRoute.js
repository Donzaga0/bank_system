const express = require('express');
const userCont = require('../controllers/userCont');

const router = express.Router();

router.get('/dashboard', userCont.getDashboardPage);
router.get('/home', userCont.getHomePage);

module.exports = router;