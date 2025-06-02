// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, findUserByUsername } = require('../models/user.model');

const register = async (req, res) => {
  try {
    const { full_name, phone, username, password, role = 'user'} = req.body;

    const existingUser = await findUserByUsername(username);
    if (existingUser) return res.status(400).json({ message: 'Username already taken' });

    // const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser({
      full_name,
      phone,
      username,
      password,
      role,
    });

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await findUserByUsername(username);

    if (!user) return res.status(404).json({ message: 'User not found' });

    // const valid = await bcrypt.compare(password, user.password);
    const valid = await password === user.password
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'myverysecretkey',
      { expiresIn: '1d' }
    );

    res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  register,
  login,
};
