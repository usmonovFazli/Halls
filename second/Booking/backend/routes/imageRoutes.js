// routes/imageRoutes.js
const express = require('express');
const router = express.Router();
const imageController = require('../controllres/imageController');
const auth = require('../middlewares/authMiddleware');
const permit = require('../middlewares/roleMiddleware');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

router.post(
  '/',
  auth,
  upload.array('images', 5),
  imageController.uploadImages
);

router.get('/:hall_id', imageController.getImagesByHall);
router.delete('/:id', auth, permit('admin'), imageController.deleteImage);

module.exports = router;
