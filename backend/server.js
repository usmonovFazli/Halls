require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();


const authRoutes = require('./routes/auth.routes');
const hallRoutes = require('./routes/hall.routes');
const bookingRoutes = require('./routes/booking.routes');



app.use(express.json());
app.use('/auth', authRoutes);
app.use('/hall', hallRoutes);
app.use('/booking', bookingRoutes);
app.use(cors());


app.get('/' , (req , res) => {
    res.send('всё на мози 😎')
});


const PORT =process.env.PORT || 2020 ;
app.listen(PORT , () => {
    console.log(`🚀 server is work on PORT = ${PORT} 🚀`);
});