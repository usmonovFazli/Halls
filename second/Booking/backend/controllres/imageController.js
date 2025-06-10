// controllers/imageController.js
const imageModel = require('../models/imageModel');
const hallModel = require('../models/hallModel');

// Загрузка одного или нескольких фото
exports.uploadImages = async (req, res) => {
  const { hall_id } = req.body;
  const userId = req.user.id;
  const role = req.user.role;

  try {
    const hall = await hallModel.getHallById(hall_id);
    if (!hall) {
      return res.status(404).json({ message: 'Тойхона не найдена' });
    }

    // Проверка прав: либо владелец, либо админ
    if (role !== 'admin' && hall.owner_id !== userId) {
      return res.status(403).json({ message: 'Нет доступа для загрузки фото' });
    }

    const files = req.files; // multer files
    if (!files || files.length === 0) {
      return res.status(400).json({ message: 'Файлы не загружены' });
    }

    const imageUrls = files.map(file => `/uploads/${file.filename}`);
    const uploadedImages = await imageModel.addImages(hall_id, imageUrls);

    res.status(201).json({ message: 'Фото загружены', images: uploadedImages });
  } catch (err) {
    console.error('Ошибка загрузки фото:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Получить все изображения по hall_id
exports.getImagesByHall = async (req, res) => {
  const { hall_id } = req.params;

  try {
    const images = await imageModel.getImagesByHallId(hall_id);
    res.json(images);
  } catch (err) {
    console.error('Ошибка получения изображений:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Удалить одно изображение
exports.deleteImage = async (req, res) => {
  const { id } = req.params;
  const role = req.user.role;

  try {
    if (role !== 'admin') {
      return res.status(403).json({ message: 'Только админ может удалять фото' });
    }

    await imageModel.deleteImage(id);
    res.json({ message: 'Фото удалено' });
  } catch (err) {
    console.error('Ошибка удаления фото:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};
