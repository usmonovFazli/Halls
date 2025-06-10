// server.js
const app = require('./app');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3223;

app.get('/note', (req, res) => {
  res.json({ message: 'всё на мози 😎', status: 'ok' });
});


app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});
