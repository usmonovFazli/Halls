import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';

function HomePage() {
  const [showBackground, setShowBackground] = useState(false);
  const [showMain, setShowMain] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setShowBackground(true), 1500); // Появление картинки
    setTimeout(() => setShowMain(true), 3000);       // Появление main
  }, []);

  return (
    <div className={`home-page-container ${showBackground ? 'show-bg' : ''}`}>
      <header>
        <div className="shortName">GV</div>
        <div className="fullName">
          {'Grand Venues'.split('').map((char, i) => (
            <span key={i} style={{ animationDelay: `${i * 0.1}s` }}>{char}</span>
          ))}
        </div>
      </header>
      
      {showMain && (
        <main className="fade-in">
          <h1>Добро пожаловать в GV</h1>
          <p>
            Мы предоставляем лучшие банкетные залы для ваших особенных мероприятий — от свадеб до корпоративов.
          </p>
          <button onClick={() => navigate('/Dashboard')}>Перейти к залам</button>
        </main>
      )}
    </div>
  );
}

export default HomePage;
