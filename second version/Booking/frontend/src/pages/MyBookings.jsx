// src/pages/MyBookings.jsx
import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get('/bookings/my')
      .then(res => setBookings(res.data))
      .catch(err => console.error('Ошибка получения бронирований:', err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Мои бронирования</h2>
      {bookings.length === 0 ? (
        <p>Бронирований пока нет.</p>
      ) : (
        <ul className="space-y-3">
          {bookings.map(b => (
            <li key={b.id} className="border p-3 rounded">
              <div><strong>Зал:</strong> {b.hall_name}</div>
              <div><strong>Дата:</strong> {b.booking_date}</div>
              <div><strong>Гостей:</strong> {b.guest_count}</div>
              <div><strong>Статус:</strong> {b.status}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBookings;
