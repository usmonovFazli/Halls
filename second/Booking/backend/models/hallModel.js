// models/hallModel.js
const db = require('../config/db');

// Создание тойхоны
exports.createHall = async ({ owner_id, name, district, address, capacity, price_per_seat, phone }) => {
  const result = await db.query(
    `INSERT INTO halls (owner_id, name, district, address, capacity, price_per_seat, phone)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [owner_id, name, district, address, capacity, price_per_seat, phone]
  );
  return result.rows[0];
};

// Получение всех тойхон с необязательными фильтрами
exports.getAllHalls = async ({ district, status }) => {
  let query = 'SELECT * FROM halls WHERE 1=1';
  const params = [];

  if (district) {
    params.push(district);
    query += ` AND district = $${params.length}`;
  }

  if (status) {
    params.push(status);
    query += ` AND status = $${params.length}`;
  }

  query += ' ORDER BY created_at DESC';

  const result = await db.query(query, params);
  return result.rows;
};

// Получение тойхоны по ID
exports.getHallById = async (id) => {
  const result = await db.query('SELECT * FROM halls WHERE id = $1', [id]);
  return result.rows[0];
};

// Обновление тойхоны
exports.updateHall = async (id, data) => {
  const fields = [];
  const values = [];

  Object.entries(data).forEach(([key, value], index) => {
    fields.push(`${key} = $${index + 1}`);
    values.push(value);
  });

  values.push(id); // последний параметр — id

  const result = await db.query(
    `UPDATE halls SET ${fields.join(', ')} WHERE id = $${values.length} RETURNING *`,
    values
  );
  return result.rows[0];
};

// Удаление тойхоны
exports.deleteHall = async (id) => {
  await db.query('DELETE FROM halls WHERE id = $1', [id]);
};
