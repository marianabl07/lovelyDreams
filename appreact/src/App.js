import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from './components/AdminPages';
import Index from './components/index';
import Login from './components/login';
import Logup from './components/logup';
import HomePage from './components/HomePages';
import 'bootstrap';


function App() {
  return (
    <Router>
      <Routes>
         <Route path="" exact element={<Index/>} />
         <Route path="login" element={<Login/>} />
         <Route path="logup" element={<Logup/>} />
         <Route path="homepage" element={<HomePage/>} />
         <Route path="adminpage" element={<AdminPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
