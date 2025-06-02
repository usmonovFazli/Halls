import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = token ? JSON.parse(atob(token.split('.')[1])) : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <h2>🏛 FitHall</h2>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Главная</Link>
        <Link to="/halls" style={styles.link}>Залы</Link>
        {user && (
          <>
            <Link to={`/bookings/${user.id}`} style={styles.link}>Бронирования</Link>
            {(user.role === 'admin' || user.role === 'owner') && (
              <Link to="/admin" style={styles.link}>Админка</Link>
            )}
          </>
        )}
      </div>

      <div>
        {user ? (
          <button onClick={handleLogout} style={styles.button}>Выйти</button>
        ) : (
          <button onClick={() => navigate('/login')} style={styles.button}>Войти</button>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 30px',
    backgroundColor: '#1e1e2f',
    color: 'white',
  },
  links: {
    display: 'flex',
    gap: '20px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
  },
  button: {
    padding: '6px 12px',
    backgroundColor: '#ff5555',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
  }
};

export default Navbar;
