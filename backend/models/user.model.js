const pool = require('../config/db');

// Добавить пользователя
const createUser = async (user) => {
  const { full_name, phone, username, password, role = 'user'} = user;

  const result = await pool.query(
    `INSERT INTO users (full_name, phone, username, password, role)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [full_name, phone, username, password, role]
  );

  return result.rows[0];
};

// Найти пользователя по username
const findUserByUsername = async (username) => {
  const result = await pool.query(
    `SELECT * FROM users WHERE username = $1`,
    [username]
  );

  return result.rows[0];
};

module.exports = {
  createUser,
  findUserByUsername,
};
