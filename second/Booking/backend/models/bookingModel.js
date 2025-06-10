// models/bookingModel.js
const db = require('../config/db');

// Создание бронирования
exports.createBooking = async ({ user_id, hall_id, booking_date, guest_count, full_name, phone }) => {
  const result = await db.query(
    `INSERT INTO bookings (user_id, hall_id, booking_date, guest_count, full_name, phone)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [user_id, hall_id, booking_date, guest_count, full_name, phone]
  );
  return result.rows[0];
};

// Получить бронирования пользователя (или все, если admin)
exports.getBookings = async ({ user_id, role }) => {
  const query = role === 'admin'
    ? 'SELECT * FROM bookings ORDER BY booking_date DESC'
    : 'SELECT * FROM bookings WHERE user_id = $1 ORDER BY booking_date DESC';

  const result = await db.query(query, role === 'admin' ? [] : [user_id]);
  return result.rows;
};

// Получить одно бронирование
exports.getBookingById = async (id) => {
  const result = await db.query('SELECT * FROM bookings WHERE id = $1', [id]);
  return result.rows[0];
};

// Отмена бронирования
exports.deleteBooking = async (id) => {
  await db.query('DELETE FROM bookings WHERE id = $1', [id]);
};
