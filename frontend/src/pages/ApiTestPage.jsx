import React, { useState } from 'react';
import { fetchHalls } from '../api/hall';
import { getAllBookings } from '../api/booking';
import { getAllUsersByAdmin } from '../api/admin';

function ApiTestPage() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const testApi = async (apiFunc, label = '') => {
    setError(null);
    setResult(`Запрос: ${label}...`);

    try {
      const data = await apiFunc();
      setResult(data);
    } catch (err) {
      setError(err.message || 'Ошибка при вызове API');
      setResult(null);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🧪 API Test Page</h2>

      <button onClick={() => testApi(fetchHalls, 'fetchHalls')}>📦 Получить залы</button>
      <button onClick={() => testApi(getAllBookings, 'getAllBookings')}>📑 Получить брони</button>
      <button onClick={() => testApi(getAllUsersByAdmin, 'getAllUsersByAdmin')}>👥 Получить пользователей</button>

      <div style={{ marginTop: '1rem' }}>
        {error && <p style={{ color: 'red' }}>❌ Ошибка: {error}</p>}
        {result && (
          <pre style={{ background: '#f0f0f0', padding: '1rem', borderRadius: '8px' }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}

export default ApiTestPage;
