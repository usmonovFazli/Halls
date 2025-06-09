const jwt = require('jsonwebtoken');
const { findDistrictsByName , createDistrict } = require('../models/user.model');
const pool = require('../config/db');


const districts = async (req, res) => {
    try {
        const { name } = req.body;

        const existingName = await findDistrictsByName(name);
        if (existingName) return res.status(400).json({ message: 'Dstrict name already taken ' });

        const newDistrict = await createDistrict(req.body.name);

        res.status(201).json({ message: 'User created successfully', user: newDistrict });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    };
};

const getAllUsersByAdmin = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM users`);
    res.status(200).json(result.rows); // возвращаем реальные данные пользователей
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports ={
    districts,
    getAllUsersByAdmin
}