// routes/hallRoutes.js
const express = require('express');
const router = express.Router();
const hallController = require('../controllres/hallController');
const auth = require('../middlewares/authMiddleware');
const permit = require('../middlewares/roleMiddleware');

// Только для owner или admin
router.post('/', auth, permit('owner', 'admin'), hallController.createHall);
router.get('/', hallController.getAllHalls);
router.get('/:id', hallController.getHallById);
router.put('/:id', auth, permit('owner', 'admin'), hallController.updateHall);
router.delete('/:id', auth, permit('owner', 'admin'), hallController.deleteHall);

module.exports = router;
