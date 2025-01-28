import React, { useEffect, useState, useContext } from 'react';
import styles from "../../assets/styles/Profile.module.css";
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../../context/TokenContext';
import { fetchPerfil } from '../../services/usersService';

export const Profile = () => { //Muestra los datos del usuario tanto admin como user
  const { token } = useContext(TokenContext);
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    id: '',
    name: '',
    last_name: '',
    role: '',
    address: '',
    email: '',
    phone: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const userEdit = () => { //Envía los datos al form y url Update
    navigate(`/update/${profile.id}`, { state: profile }); 
  };

  useEffect(() => { //Redirecciona al Login al no existir token
    const cargarPerfil = async () => {
      if (!token) {
        navigate('/login');
        return;
      }

      const { error, data } = await fetchPerfil(token); //Llamada a la funcion para obtener los datos

      if (error) { //Estable un error si no es posible obtener los datos
        setError(error);
        setLoading(false);
        return;
      }

      setProfile({ //Establece los datos obtenidos
        id: data.id, 
        name: data.name,
        last_name: data.last_name,
        role: data.role,
        address: data.address,
        email: data.email,
        phone: data.phone,
      });
      setLoading(false);
    };

    cargarPerfil();
  }, [token, navigate]);

  if (loading) return <div className={styles.loading}>Cargando sus datos...</div>;
  if (error) return <div className={styles.error}>Error! : {error}</div>;

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <h1 className={styles.profileName}>{profile.name}</h1>
        <p className={styles.profileRole}>{profile.role}</p>
      </div>

      <div className={styles.profileInfo}>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Dirección: </span>
          <span className={styles.infoValue}>{profile.address}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Email: </span>
          <span className={styles.infoValue}>{profile.email}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Teléfono: </span>
          <span className={styles.infoValue}>{profile.phone}</span>
        </div>
      </div>

      <button
        className={`${styles.editButton} btn btn-primary`}
        onClick={userEdit}
      >
        Editar Información
      </button>
    </div>
  );
};
