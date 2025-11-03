const express = require('express');
const userCont = require('../controllers/userCont');

const router = express.Router();

router.get('/dashboard', userCont.getDashboardPage);

module.exports = router;