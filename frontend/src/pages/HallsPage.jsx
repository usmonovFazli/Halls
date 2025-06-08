import React from 'react';
import HallList from '../components/Halls/HallList';

const Dashboard = () => {
  return (
    <div>
      <h1>Панель управления</h1>
      
      {/* Другие компоненты */}

      <section>
        <h2>Все залы</h2>
        <HallList />
      </section>

      {/* Другие компоненты */}
    </div>
  );
};

export default Dashboard;
