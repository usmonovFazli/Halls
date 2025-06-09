import React, { useEffect, useState } from 'react';
import { fetchHalls } from '../../api/hall';
import styles from './HallCard.module.css';

const HallList = () => {
  const [halls, setHalls] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHalls()
      .then(data => setHalls(data))
      .catch(err => setError(err.message || 'Ошибка загрузки залов'));
  }, []);

  const handleBooking = (hallId) => {
    // 👇 Пока просто вывод в консоль — потом подключим форму/страницу брони
    console.log(`Забронировать зал с ID: ${hallId}`);
  };

  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>📋 Список залов</h2>
      {halls.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Залы не найдены.</p>
      ) : (
        <div className={styles.cardContainer}>
          {halls.map(hall => (
            <div key={hall.id} className={styles.card}>
              <img src={hall.image_url || 'https://via.placeholder.com/400x200?text=Зал'} alt={hall.name} />
              <div className={styles.cardContent}>
                <h3>{hall.name}</h3>
                <p><strong>Вместимость:</strong> {hall.capacity}</p>
                <p><strong>Цена за место:</strong> {hall.price_per_seat} сум</p>
                <p><strong>Контакт:</strong> {hall.phone}</p>
                <button
                  className={styles.button}
                  onClick={() => handleBooking(hall.id)}
                >
                  Забронировать
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HallList;
