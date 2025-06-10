const express = require('express');
const router = express.Router();


const { districts , getAllUsersByAdmin} = require('../controllers/admin.controller');

router.post('/createDistrict', districts);
router.get('/allUsers', getAllUsersByAdmin)


module.exports = router;