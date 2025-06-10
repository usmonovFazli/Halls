// src/pages/Dashboard.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return <div>Загрузка...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Добро пожаловать, {user.first_name || user.username}!</h1>
      <p className="mb-4">Роль: <strong>{user.role}</strong></p>

      <div className="space-y-4">
        <Link to="/my-bookings" className="block bg-blue-600 text-white py-2 px-4 rounded">Мои бронирования</Link>
        {user.role === 'owner' && (
          <Link to="/my-halls" className="block bg-green-600 text-white py-2 px-4 rounded">Мои залы</Link>
        )}
        {user.role === 'admin' && (
          <Link to="/admin-panel" className="block bg-red-600 text-white py-2 px-4 rounded">Панель администратора</Link>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
