import React, { useEffect, useState } from 'react';
import { fetchHalls } from '../../api/endpoints';

const HallList = () => {
  const [halls, setHalls] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHalls()
      .then(data => setHalls(data))
      .catch(err => setError(err.message || 'Ошибка загрузки залов'));
  }, []);

  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div>
      <h2>Список залов</h2>
      {halls.length === 0 ? <p>Залы не найдены.</p> : (
        <ul>
          {halls.map(hall => (
            <li key={hall.id}>
              {hall.name} — Вместимость: {hall.capacity}
              <br />
              {hall.price_per_seat}
              <br />
              {hall.phone}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HallList;
