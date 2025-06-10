// controllers/hallController.js
const hallModel = require('../models/hallModel');

// Создание новой тойхоны (только для владельцев)
exports.createHall = async (req, res) => {
  const { name, district, address, capacity, price_per_seat, phone } = req.body;
  const owner_id = req.user.id;

  try {
    const newHall = await hallModel.createHall({
      owner_id,
      name,
      district,
      address,
      capacity,
      price_per_seat,
      phone,
    });

    res.status(201).json({ message: 'Тойхона создана', hall: newHall });
  } catch (err) {
    console.error('Ошибка при создании зала:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Получение всех залов (для главной страницы, можно с фильтром)
exports.getAllHalls = async (req, res) => {
  const { district, status } = req.query;

  try {
    const halls = await hallModel.getAllHalls({ district, status });
    res.json(halls);
  } catch (err) {
    console.error('Ошибка получения залов:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Получение одного зала по ID
exports.getHallById = async (req, res) => {
  const { id } = req.params;

  try {
    const hall = await hallModel.getHallById(id);
    if (!hall) {
      return res.status(404).json({ message: 'Зал не найден' });
    }
    res.json(hall);
  } catch (err) {
    console.error('Ошибка получения зала:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Обновление зала (только владелец или админ)
exports.updateHall = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const userRole = req.user.role;
  const dataToUpdate = req.body;

  try {
    const hall = await hallModel.getHallById(id);
    if (!hall) {
      return res.status(404).json({ message: 'Зал не найден' });
    }

    if (hall.owner_id !== userId && userRole !== 'admin') {
      return res.status(403).json({ message: 'Нет прав на редактирование' });
    }

    const updatedHall = await hallModel.updateHall(id, dataToUpdate);
    res.json({ message: 'Зал обновлён', hall: updatedHall });
  } catch (err) {
    console.error('Ошибка обновления зала:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Удаление зала (только владелец или админ)
exports.deleteHall = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const userRole = req.user.role;

  try {
    const hall = await hallModel.getHallById(id);
    if (!hall) {
      return res.status(404).json({ message: 'Зал не найден' });
    }

    if (hall.owner_id !== userId && userRole !== 'admin') {
      return res.status(403).json({ message: 'Нет прав на удаление' });
    }

    await hallModel.deleteHall(id);
    res.json({ message: 'Зал удалён' });
  } catch (err) {
    console.error('Ошибка удаления зала:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};
