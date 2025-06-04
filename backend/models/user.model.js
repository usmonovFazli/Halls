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


const findDistrictsByName = async (name) => {
  const result = await pool.query(
    `SELECT * FROM districts WHERE name = $1`,
    [name]
  );

  return result.rows[0]
};


const createDistrict = async (name) => {
  // Проверка на наличие
  const exists = await pool.query(
    `SELECT * FROM districts WHERE name = $1`,
    [name]
  );

  if (exists.rows.length > 0) {
    throw new Error(`District "${name}" already exists`);
  }

  const result = await pool.query(
    `INSERT INTO districts (name)
     VALUES ($1) RETURNING *`,
    [name]
  );

  return result.rows[0];
};





module.exports = {
  createUser,
  findUserByUsername,
  createDistrict,
  findDistrictsByName
};
