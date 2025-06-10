// models/userModel.js
const db = require('../config/db');

exports.findByUsername = async (username) => {
  const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
  return result.rows[0];
};

exports.createUser = async (userData) => {
  const { first_name, last_name, username, password_hash, phone, role } = userData;

  const result = await db.query(
    `INSERT INTO users (first_name, last_name, username, password_hash, phone, role)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, first_name, last_name, username, phone, role`,
    [first_name, last_name, username, password_hash, phone, role]
  );

  return result.rows[0];
};
