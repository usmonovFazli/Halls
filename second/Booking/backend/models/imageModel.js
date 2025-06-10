// models/imageModel.js
const db = require('../config/db');

// Добавить одно изображение
exports.addImage = async (hall_id, image_url) => {
  const result = await db.query(
    `INSERT INTO hall_images (hall_id, image_url) 
     VALUES ($1, $2) RETURNING *`,
    [hall_id, image_url]
  );
  return result.rows[0];
};

// Добавить сразу несколько изображений
exports.addImages = async (hall_id, image_urls) => {
  const values = image_urls.map((url, idx) => `($1, $${idx + 2})`).join(', ');
  const result = await db.query(
    `INSERT INTO hall_images (hall_id, image_url) VALUES ${values} RETURNING *`,
    [hall_id, ...image_urls]
  );
  return result.rows;
};

// Получить все изображения по hall_id
exports.getImagesByHallId = async (hall_id) => {
  const result = await db.query(
    `SELECT * FROM hall_images WHERE hall_id = $1`,
    [hall_id]
  );
  return result.rows;
};

// Удалить одно изображение
exports.deleteImage = async (id) => {
  await db.query(`DELETE FROM hall_images WHERE id = $1`, [id]);
};

// Удалить все изображения зала
exports.deleteImagesByHallId = async (hall_id) => {
  await db.query(`DELETE FROM hall_images WHERE hall_id = $1`, [hall_id]);
};
