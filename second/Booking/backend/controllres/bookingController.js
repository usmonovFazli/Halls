// controllers/bookingController.js
const bookingModel = require('../models/bookingModel');
const hallModel = require('../models/hallModel');

exports.createBooking = async (req, res) => {
  const { hall_id, booking_date, guest_count, full_name, phone } = req.body;
  const user_id = req.user.id;

  try {
    const hall = await hallModel.getHallById(hall_id);
    if (!hall) {
      return res.status(404).json({ message: 'Тойхона не найдена' });
    }

    const booking = await bookingModel.createBooking({
      user_id,
      hall_id,
      booking_date,
      guest_count,
      full_name,
      phone
    });

    res.status(201).json({ message: 'Бронирование создано', booking });
  } catch (err) {
    console.error('Ошибка создания бронирования:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

exports.getUserBookings = async (req, res) => {
  const { id, role } = req.user;

  try {
    const bookings = await bookingModel.getBookings({ user_id: id, role });
    res.json(bookings);
  } catch (err) {
    console.error('Ошибка получения бронирований:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

exports.getBookingById = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await bookingModel.getBookingById(id);
    if (!booking) {
      return res.status(404).json({ message: 'Бронирование не найдено' });
    }

    res.json(booking);
  } catch (err) {
    console.error('Ошибка получения бронирования:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

exports.cancelBooking = async (req, res) => {
  const { id } = req.params;
  const { id: user_id, role } = req.user;

  try {
    const booking = await bookingModel.getBookingById(id);
    if (!booking) {
      return res.status(404).json({ message: 'Бронирование не найдено' });
    }

    if (role !== 'admin' && booking.user_id !== user_id) {
      return res.status(403).json({ message: 'Нет прав на удаление' });
    }

    await bookingModel.deleteBooking(id);
    res.json({ message: 'Бронирование отменено' });
  } catch (err) {
    console.error('Ошибка отмены бронирования:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};
