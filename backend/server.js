require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware сначала
app.use(cors());
app.use(express.json());

// Роуты
const authRoutes = require('./routes/auth.routes');
const hallRoutes = require('./routes/hall.routes');
const bookingRoutes = require('./routes/booking.routes');
const adminRoutes = require('./routes/admin.routes');

app.use('/auth', authRoutes);
app.use('/hall', hallRoutes);
app.use('/booking', bookingRoutes);
app.use('/admin', adminRoutes);

// Корневой маршрут
app.get('/', (req, res) => {
    res.send('всё на мози 😎');
});

// Запуск сервера
const PORT = process.env.PORT || 2020;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on PORT = ${PORT} 🚀`);
});
