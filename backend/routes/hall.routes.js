const express = require('express');
const router = express.Router();
// const { uploadHallImages } = require('../controllers/halls');
const upload = require('../middleware/upload');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

const {
    createHall,
    getAllHalls,
    getHallById,
    updateHall,
    deletHall,
    uploadHallImages,
    deleteHallImage
} = require('../controllers/hall.controller');

router.post('/newHall', createHall); //новый пользователь 
router.get('/halls', getAllHalls);
router.get('/halls/:id', getHallById);
router.put('/update/:id', updateHall);
router.delete('/delet/:id', deletHall);
router.post('/:id/images', authenticateToken,
    authorizeRoles('admin', 'owner'),
    upload.array('images', 5),
    uploadHallImages
);
router.delete(
    '/images/:imageId',
    authenticateToken,
    authorizeRoles('admin', 'owner'),
    deleteHallImage
);


module.exports = router;