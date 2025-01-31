// components/Register.js

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../../assets/styles/Register.module.css";
import { registerUser } from '../../services/usersService';
import { useContext, useEffect } from 'react';
import { TokenContext } from '../../context/TokenContext';
import { useNavigate } from 'react-router-dom';

export const Register = () => { //Registros de usuarios (solo para rol "user")
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm(); //Manejo de form
  const [error, setError] = useState(null);
  const { token } = useContext(TokenContext);
  const navigate = useNavigate();

  useEffect(() => { //Redirecciona al peril si ya ha iniciado sesión
    if (token) {
      navigate('/profile');
      return;
    }
  }, []);

  const onSubmitForm = async (data) => { 
    try {
      const userData = {
        name: data.nombre,
        last_name: data.apellido,
        address: data.direccion,
        email: data.email,
        phone: data.phone,
        password: data.password,
      };

      const response = await registerUser(userData); //Llamada al servicio que envia los datos

      alert(`${response.message}`);
      reset();
    } catch (error) {
      setError(error.message);
    }
  };

  return ( //Formulario con validaciones
    <div className={`container-fluid mt-5 ${styles.containerCustom}`}>
      <form onSubmit={handleSubmit(onSubmitForm)} className={`${styles.formCustom} border p-4 rounded shadow container-fluid`}>
        <h2 className={`${styles.title} mb-4`}>Registro de Usuario</h2>

        {error && <p className={`${styles.pCustom} text-danger`}>{error}</p>}

        <div className="mb-3">
          <label htmlFor="nombre" className={`form-label ${styles.label}`}>Nombre</label>
          <input
            type="text"
            className={`form-control ${styles.input}`}
            id="nombre"
            placeholder="Ingresa tu nombre"
            {...register("nombre", { required: true })}
          />
          {errors?.nombre?.type === "required" && <p className={`${styles.pCustom}`}>Este campo es requerido</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="apellido" className={`form-label ${styles.label}`}>Apellido</label>
          <input
            type="text"
            className={`form-control ${styles.input}`}
            id="apellido"
            placeholder="Ingresa tu apellido"
            {...register("apellido", { required: true })}
          />
          {errors?.apellido?.type === "required" && <p className={`${styles.pCustom}`}>Este campo es requerido</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="direccion" className={`form-label ${styles.label}`}>Dirección</label>
          <input
            type="text"
            className={`form-control ${styles.input}`}
            id="direccion"
            placeholder="Ingresa tu dirección"
            {...register("direccion", { required: true })}
          />
          {errors?.direccion?.type === "required" && <p className={`${styles.pCustom}`}>Este campo es requerido</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className={`form-label ${styles.label}`}>Correo Electrónico</label>
          <input
            type="email"
            className={`form-control ${styles.input}`}
            id="email"
            placeholder="usuario@correo.com"
            {...register("email", {
              required: { value: true, message: "Por favor introduce un correo" },
              pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Por favor ingrese un correo válido" },
            })}
          />
          {errors.email && <p className={`${styles.pCustom}`}>{errors.email.message}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="telefono" className={`form-label ${styles.label}`}>Teléfono</label>
          <input
            type="tel"
            className={`form-control ${styles.input}`}
            id="telefono"
            placeholder="2458-2555"
            {...register("phone", {
              required: { value: true, message: "Por favor introduce un número de teléfono" },
              pattern: { value: /^\+?[0-9\s\-]{8,15}$/, message: "Por favor ingrese un número de teléfono válido" },
            })}
          />
          {errors.phone && <p className={`${styles.pCustom}`}>{errors.phone.message}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className={`form-label ${styles.label}`}>Contraseña</label>
          <input
            type="password"
            className={`form-control ${styles.input}`}
            id="password"
            placeholder="********"
            {...register("password", {
              required: { value: true, message: "Debes introducir una contraseña" },
              minLength: { value: 8, message: "La contraseña debe tener al menos 8 caracteres" },
            })}
          />
          {errors.password && <p className={`${styles.pCustom}`}>{errors.password.message}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPassword" className={`form-label ${styles.label}`}>Confirmar Contraseña</label>
          <input
            type="password"
            className={`form-control ${styles.input}`}
            id="confirmPassword"
            placeholder="********"
            {...register("confirmPassword", {
              required: { value: true, message: "La confirmación de la contraseña es necesaria" },
              validate: value => value === watch("password") || "Las contraseñas no coinciden",
            })}
          />
          {errors.confirmPassword && <p className={`${styles.pCustom}`}>{errors.confirmPassword.message}</p>}
        </div>

        <button type="submit" className={`btn btn-primary w-100 ${styles.button}`}>
          Registrar
        </button>
      </form>
    </div>
  );
};
