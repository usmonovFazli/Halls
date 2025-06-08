import { useEffect, useState } from 'react';
import axios from 'axios';
// import './Dashboard.css'; // если нужен отдельный стиль

function Dashboard() {
  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/hall') // убедись, что axios настроен с базовым URL
      .then((res) => {
        setHalls(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Ошибка при загрузке залов:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Добро пожаловать в Панель управления</h1>
      {loading ? (
        <p>Загрузка залов...</p>
      ) : halls.length === 0 ? (
        <p>Залы пока не добавлены.</p>
      ) : (
        <div className="hall-list">
          {halls.map((hall) => (
            <div key={hall.id} className="hall-card">
              <h3>{hall.name}</h3>
              <p>Вместимость: {hall.capacity}</p>
              <p>Цена: {hall.price} сум</p>
              {/* можно добавить фото или кнопки брони */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
