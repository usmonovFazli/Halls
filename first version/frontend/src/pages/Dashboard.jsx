// pages/Dashboard.jsx
import React from 'react';
import HallList from '../components/Halls/HallList';

function Dashboard() {
  return (
    <div style={{ padding: '1rem' }}>
      <h1>👋 Добро пожаловать в админ-панель</h1>
      <h2>📋 Список залов:</h2>
      <HallList />
    </div>
  );
}

export default Dashboard;
