import React from 'react';
import styles from "../../assets/styles/Register.module.css";
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { TokenContext } from '../../context/TokenContext';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';

export const Login = () => { //Establece la vista de login
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { setToken } = useContext(TokenContext);
  const { setRole } = useContext(TokenContext);

  const navigate = useNavigate();

  const onSubmitForm = async (data) => { //Envío de los datos de form
    const { email, password } = data;

    const { success, token, role, error } = await login(email, password);

    if (success) { //Si el log fue exitoso se asigna los contextos
      setToken(token);
      setRole(role)
      reset();
      navigate('/profile');
    } else {
      alert(error);
    }
  };

  return (
    <div className={`container-fluid mt-5 ${styles.containerCustom}`}>
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className={`${styles.formCustom} border p-4 rounded shadow container-fluid`}
      >
        <h2 className={`${styles.title} mb-4`}>Iniciar Sesión</h2>

        <div className="mb-3">
          <label htmlFor="email" className={`form-label ${styles.label}`}>
            Correo Electrónico
          </label>
          <input
            type="email"
            className={`form-control ${styles.input}`}
            id="email"
            placeholder="usuario@correo.com"
            {...register('email', {
              required: { value: true, message: 'Por favor introduce un correo' },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Por favor ingrese un correo válido',
              },
            })}
          />
          {errors.email && <p className={`${styles.pCustom}`}>{errors.email.message}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className={`form-label ${styles.label}`}>
            Contraseña
          </label>
          <input
            type="password"
            className={`form-control ${styles.input}`}
            id="password"
            placeholder="********"
            {...register('password', {
              required: { value: true, message: 'Debes introducir una contraseña' },
              minLength: { value: 8, message: 'La contraseña debe tener al menos 8 caracteres' },
            })}
          />
          {errors.password && <p className={`${styles.pCustom}`}>{errors.password.message}</p>}
        </div>

        <button type="submit" className={`btn btn-primary w-100 ${styles.button}`}>
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};
