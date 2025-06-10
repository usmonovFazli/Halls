// src/pages/MyHalls.jsx
import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import HallCard from '../components/HallCard';

const MyHalls = () => {
  const [halls, setHalls] = useState([]);

  useEffect(() => {
    axios.get('/halls/my')
      .then(res => setHalls(res.data))
      .catch(err => console.error('Ошибка получения залов:', err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Мои банкетные залы</h2>
      {halls.length === 0 ? (
        <p>Вы ещё не добавили зал.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {halls.map(hall => <HallCard key={hall.id} hall={hall} />)}
        </div>
      )}
    </div>
  );
};

export default MyHalls;
