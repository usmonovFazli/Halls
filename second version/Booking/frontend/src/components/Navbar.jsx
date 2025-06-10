import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">To’yxona</Link>
      <div className="space-x-4">
        {user ? (
          <>
            <span className="text-sm">👤 {user.username} ({user.role})</span>
            <button onClick={handleLogout} className="hover:underline">Выйти</button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Вход</Link>
            <Link to="/register" className="hover:underline">Регистрация</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
