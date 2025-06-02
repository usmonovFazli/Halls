// src/App.jsx
import './App.css';
import Navbar from './components/Shared/Navbar';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {'./pages/AuthPage.jsx'}
      </Routes>
    </>
  );
}

export default App

