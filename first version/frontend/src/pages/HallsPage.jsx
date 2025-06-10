import React from 'react';
import HallList from '../components/Halls/HallList';
import { useNavigate } from 'react-router-dom';

const HallPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Панель управления</h1>
      <button onClick={() => navigate('/Dashboard')} >Перейти к залам</button>
      {/* Другие компоненты */}

      <section>
        <h2>Все залы</h2>
        <HallList />
      </section>

      
      {/* Другие компоненты */}
    </div>
  );
};

export default HallPage;
