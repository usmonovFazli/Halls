// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import HallCard from '../components/HallCard';

const Home = () => {
  const [halls, setHalls] = useState([]);

  useEffect(() => {
    axios.get('/halls')
      .then(res => setHalls(res.data))
      .catch(err => console.error('Ошибка загрузки залов:', err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Доступные банкетные залы</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {halls.map(hall => <HallCard key={hall.id} hall={hall} />)}
      </div>
    </div>
  );
};

export default Home;
