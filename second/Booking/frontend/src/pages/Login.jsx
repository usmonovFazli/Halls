// pages/Login.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const success = await login(form.username, form.password);

    if (success) navigate('/Home');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Вход</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" name="username" placeholder="Username" required onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        <input type="password" name="password" placeholder="Пароль" required onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Войти</button>
      </form>
      <button onClick={() => navigate('./register')}>Register</button>
    </div>
  );
};
ф
export default Login;
