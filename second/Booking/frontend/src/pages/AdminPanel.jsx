// src/pages/AdminPanel.jsx
import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';

const AdminPanel = () => {
  const [pendingHalls, setPendingHalls] = useState([]);

  const fetchPending = () => {
    axios.get('/admin/pending-halls')
      .then(res => setPendingHalls(res.data))
      .catch(err => console.error('Ошибка загрузки:', err));
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const approveHall = (id) => {
    axios.post(`/admin/approve-hall/${id}`)
      .then(() => fetchPending())
      .catch(err => alert('Ошибка при подтверждении зала'));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Залы на модерации</h2>
      {pendingHalls.length === 0 ? (
        <p>Все залы проверены ✅</p>
      ) : (
        <ul className="space-y-4">
          {pendingHalls.map(hall => (
            <li key={hall.id} className="border p-3 rounded">
              <div><strong>{hall.name}</strong> ({hall.district})</div>
              <div>{hall.address}</div>
              <button
                onClick={() => approveHall(hall.id)}
                className="mt-2 bg-green-600 text-white py-1 px-3 rounded"
              >
                Одобрить
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminPanel;
