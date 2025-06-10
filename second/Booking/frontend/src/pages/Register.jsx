// src/pages/Register.jsx
import React, { useState } from 'react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    username: '',
    password: '',
    role: 'user',
  });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/auth/register', form);
      navigate('/login');
    } catch (err) {
      alert('Ошибка регистрации');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Регистрация</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="first_name" placeholder="Имя" onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
        <input name="last_name" placeholder="Фамилия" onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        <input name="phone" placeholder="Телефон" onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        <input name="username" placeholder="Username" onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
        <input name="password" type="password" placeholder="Пароль" onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full">Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default Register;
