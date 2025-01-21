import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';
import SnakePage from './Pages/SnakePage/SnakePage';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/snake" element={<SnakePage/>} />
    </Routes>
  </Router>
);

export default App;
