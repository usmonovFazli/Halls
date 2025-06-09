import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './styles/global.css';
import './styles/variables.css';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard'; // Импорт твоей страницы
import NotFound from './pages/NotFound';
import ApiTestPage from './pages/ApiTestPage';
import HallPage from './pages/HallsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Dashboard" element={<Dashboard />} /> {/* вот этот маршрут */}
        <Route path="*" element={<NotFound/>}/>
        <Route path="/HallPage" element={<HallPage/>}/>
        <Route path="/api-test" element={<ApiTestPage />} />
      </Routes>
    </Router>
  );
}

export default App;
