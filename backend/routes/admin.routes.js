const express = require('express');
const router = express.Router();


const { districts } = require('../controllers/admin.controller');

router.post('/createDistrict', districts);


module.exports = router;