import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard'; // Импорт твоей страницы

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* вот этот маршрут */}
      </Routes>
    </Router>
  );
}

export default App;
