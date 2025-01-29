import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Register } from './pages/register/Register';
import { Navbar } from './components/Navbar/Navbar';
import { Login } from './pages/login/Login';
import { Profile } from './pages/profile/Profile';
import { Update } from './pages/update/Update';
import { TokenProvider } from './context/TokenContext';
import Statistics from './pages/statistics/Statistics';

function App() {
  return (
    <BrowserRouter> {/* Establece las rutas en su ambito de aplicación */}
    <TokenProvider> {/* Establece el provider */}
      <Navbar />

      <div className="container">
        <Routes> {/* Establece las rutas y componente o vistas disponibles */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/statistics" element={<Statistics/>} />
        </Routes>
      </div>
      </TokenProvider>
    </BrowserRouter>
  );
}

export default App;
