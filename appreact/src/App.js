import logo from './logo.svg';
import './App.css';
import 'bootstrap';
import AdminPage from './components/AdminPages';
import Index from './components';
import Login from './components/login';
import Logup from './components/logup';
import HomePage from './components/HomePages';
import ApiPokemon from './api/ApiPokemon';

function App() {
  return (
    <div>
      <HomePage></HomePage>
    </div>
  );
}

export default App;
