import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from "../../assets/styles/Navbar.module.css";
import { TokenContext } from '../../context/TokenContext';
import { logout } from '../../services/authService';
import { LoginIcon, SignUpIcon, ProfileIcon, StatisticsIcon, LogOutIcon, RegisterIcon } from '../../assets/icons/icons';


export const Navbar = () => { //Componete Navabar
  const { token, setToken } = useContext(TokenContext); //Definición del contexto
  const { role, setRole } = useContext(TokenContext);
  const navigate = useNavigate();


  const handleLogout = () => { //Llamada a la función para cerara sesi+on
    logout(token, setToken, navigate);
  };

  return (
    <>
      <nav className={`navbar navbar-expand-lg ${styles.bgGradient} fixed-top`}>
        <div className="container">
          {token ? (<><Link to="/profile" className={`nav-link ${styles.navLink} ${styles.hoverLink}`} type="button">
            <ProfileIcon /> Perfil
          </Link></>) : <a className={`navbar-brand ${styles.navbarBrand}`} href="login">
            <RegisterIcon /> Gestión de Usuarios
          </a>}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                {!token ? (<><Link to="/login" className={`nav-link ${styles.navLink} ${styles.hoverLink}`} type="button">
                  <LoginIcon /> Iniciar Sesión
                </Link></>) : ""}
              </li>
              <li className="nav-item">
                {!token ? (<><Link to="/register" className={`nav-link ${styles.navLink} ${styles.hoverLink}`} type="button">
                  <SignUpIcon /> Registrarse
                </Link></>) : ""}
              </li>
              <li className="nav-item">
                {role == "admin" && token ? (<><Link to="#" className={`nav-link ${styles.navLink} ${styles.hoverLink}`} type="button">
                  <StatisticsIcon /> Estadísticas
                </Link></>) : ""}
              </li>
              <li className="nav-item">
                {token ? (<><button
                  className={`btn nav-link ${styles.navLink} ${styles.hoverLink}`}
                  type="button"
                  onClick={handleLogout}
                >
                  <LogOutIcon /> Cerrar Sesión
                </button></>) : ""}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
