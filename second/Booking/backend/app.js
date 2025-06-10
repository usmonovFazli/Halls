// app.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json()); // Для JSON
app.use(express.urlencoded({ extended: true })); // Для form-data
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads')); // Доступ к изображениям

// Маршруты
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/halls', require('./routes/hallRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes')) ;
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/images', require('./routes/imageRoutes'));

app.get('/', (req, res) => {
  res.json({ message: 'всё на мози 😎', status: 'ok' });
});

// 404
app.use((req, res, next) => {
  res.status(404).json({ message: 'Маршрут не найден' });
});

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error('Ошибка:', err);
  res.status(500).json({ message: 'Внутренняя ошибка сервера' });
});

// Защита от пустого JSON
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('Невалидный JSON');
    return res.status(400).json({ message: 'Невалидный JSON в запросе' });
  }
  next(err);
});



module.exports = app;
