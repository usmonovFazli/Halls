// controllers/adminController.js
const hallModel = require('../models/hallModel');

// Получить все залы со статусом "pending"
exports.getPendingHalls = async (req, res) => {
  try {
    const pendingHalls = await hallModel.getAllHalls({ status: 'pending' });
    res.json(pendingHalls);
  } catch (err) {
    console.error('Ошибка при получении заявок:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Одобрить тойхону (status: approved)
exports.approveHall = async (req, res) => {
  const { id } = req.params;

  try {
    const updated = await hallModel.updateHall(id, { status: 'approved' });
    if (!updated) {
      return res.status(404).json({ message: 'Тойхона не найдена' });
    }

    res.json({ message: 'Тойхона одобрена', hall: updated });
  } catch (err) {
    console.error('Ошибка при одобрении:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Удалить зал (например, если отказ)
exports.rejectHall = async (req, res) => {
  const { id } = req.params;

  try {
    const hall = await hallModel.getHallById(id);
    if (!hall) {
      return res.status(404).json({ message: 'Тойхона не найдена' });
    }

    await hallModel.deleteHall(id);
    res.json({ message: 'Тойхона удалена' });
  } catch (err) {
    console.error('Ошибка при удалении тойхоны:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// (Опционально) Получить статистику по залам и бронированиям
exports.getStats = async (req, res) => {
  try {
    const { rows: hallCount } = await db.query('SELECT COUNT(*) FROM halls');
    const { rows: bookingCount } = await db.query('SELECT COUNT(*) FROM bookings');

    res.json({
      totalHalls: parseInt(hallCount[0].count, 10),
      totalBookings: parseInt(bookingCount[0].count, 10),
    });
  } catch (err) {
    console.error('Ошибка при получении статистики:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};
