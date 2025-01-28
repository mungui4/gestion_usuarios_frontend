// Update.jsx
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateUser } from '../../services/usersService';
import styles from "../../assets/styles/Register.module.css";

export const Update = () => { //Actualiza los datos de los prefiles (tanto "user" como "admin")
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();
  const profile = location.state;  // Los datos del perfil enviados desde el componente Profile
  const token = localStorage.getItem("token");  // Obttiene el token de localstorage

  useEffect(() => {
    if (profile) {
      setValue('nombre', profile.name);
      setValue('apellido', profile.last_name);
      setValue('direccion', profile.address);
      setValue('email', profile.email);
      setValue('phone', profile.phone);
    }
  }, [profile, setValue]);

  const onSubmitForm = async (data) => {
    try {
      const userData = {
        name: data.nombre,
        last_name: data.apellido,
        address: data.direccion,
        email: data.email,
        phone: data.phone,
      };

      // Validar que el token exista
      if (!token) {
        setError('No se encontró el token de autenticación');
        return;
      }

      //Solicitud de actualización
      const response = await updateUser(profile.id, userData, token); 
      alert(`${response.message}`); 
      navigate('/profile');  // Redirecciona a Profile
    } catch (error) {
      setError(error.message);  // Mostrar error si la solicitud falla
    }
  };

  return (
    <div className={`container-fluid mt-5 ${styles.containerCustom}`}>
      <form onSubmit={handleSubmit(onSubmitForm)} className={`${styles.formCustom} border p-4 rounded shadow container-fluid`}>
        <h2 className={`${styles.title} mb-4`}>Actualizar Información</h2>

        {error && <p className={`${styles.pCustom} text-danger`}>{error}</p>} 

        <div className="mb-3">
          <label htmlFor="nombre" className={`form-label ${styles.label}`}>Nombre</label>
          <input
            type="text"
            className={`form-control ${styles.input}`}
            id="nombre"
            placeholder="Ingresa tu nombre"
            {...register('nombre', { required: true })}  
          />
          {errors?.nombre?.type === 'required' && <p className={`${styles.pCustom}`}>Este campo es requerido</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="apellido" className={`form-label ${styles.label}`}>Apellido</label>
          <input
            type="text"
            className={`form-control ${styles.input}`}
            id="apellido"
            placeholder="Ingresa tu apellido"
            {...register('apellido', { required: true })}
          />
          {errors?.apellido?.type === 'required' && <p className={`${styles.pCustom}`}>Este campo es requerido</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="direccion" className={`form-label ${styles.label}`}>Dirección</label>
          <input
            type="text"
            className={`form-control ${styles.input}`}
            id="direccion"
            placeholder="Ingresa tu dirección"
            {...register('direccion', { required: true })}
          />
          {errors?.direccion?.type === 'required' && <p className={`${styles.pCustom}`}>Este campo es requerido</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className={`form-label ${styles.label}`}>Correo electrónico</label>
          <input
            type="email"
            className={`form-control ${styles.input}`}
            id="email"
            placeholder="Ingresa tu correo electrónico"
            {...register('email', { required: true })}
          />
          {errors?.email?.type === 'required' && <p className={`${styles.pCustom}`}>Este campo es requerido</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className={`form-label ${styles.label}`}>Teléfono</label>
          <input
            type="text"
            className={`form-control ${styles.input}`}
            id="phone"
            placeholder="Ingresa tu número de teléfono"
            {...register('phone', { required: true })}
          />
          {errors?.phone?.type === 'required' && <p className={`${styles.pCustom}`}>Este campo es requerido</p>}
        </div>

        <button type="submit" className={`btn btn-primary w-100 ${styles.button}`}>
          Actualizar
        </button>
      </form>
    </div>
  );
};
