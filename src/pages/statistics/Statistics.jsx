import { useContext, useEffect } from "react";
import { TokenContext } from '../../context/TokenContext';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { fetchUsersByDates, deleteUser } from "../../services/usersService";
import styles from "../../assets/styles/Statistics.module.css";

function Statistics() {
    const { token } = useContext(TokenContext);
     const { role} = useContext(TokenContext);
     const navigate = useNavigate();
    const currentYear = new Date().getFullYear();
    const [users, setUsers] = useState([]);
    const [date1, setDate1] = useState(currentYear + "-01-01");
    const [date2, setDate2] = useState(currentYear + "-01-31");

    const handleDateChange = async (e, dateType) => {
        const newDate = e.target.value;
    
        if (dateType === 'start') {
            setDate1(newDate);
        } else {
            setDate2(newDate);
        }
    
        // Validación de fechas
        const startDate = dateType === 'start' ? newDate : date1;
        const endDate = dateType === 'end' ? newDate : date2;
    
        if (new Date(startDate) > new Date(endDate)) {
            alert("La fecha de inicio no puede ser mayor que la fecha de fin.");
            return; // Detiene la ejecución si las fechas no son válidas
        }
    
        // Llamada a la API
        try {
            const response = await fetchUsersByDates(startDate, endDate, token);
            setUsers(response.data);
        } catch (error) {
            console.error("Error al obtener los usuarios:", error);
        }
    };
    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
            try {
                await deleteUser(id, token);
                const response = await fetchUsersByDates(date1, date2, token);
                setUsers(response.data);
            } catch (error) {
                console.error("Error al eliminar el usuario:", error);
            }
        }
    }

    useEffect(() => {
        const fetchInitialData = async () => {

            if (role !=="admin") { //Redirecciona al peril si no es administrador
                navigate('/profile');
                return;
              }
            try {
                const response = await fetchUsersByDates(date1, date2, token);
                setUsers(response.data);
            } catch (error) {
                console.error("Error al obtener los usuarios:", error);
            }
        };
        fetchInitialData();
    }, []);

    return (
        <div className={styles.containerCustom}>
            <div className={styles.statsContainer}>
                <h2 className={styles.title}>Estadísticas de Usuarios</h2>
                
                <div className={styles.dateContainer}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="date1" className={styles.label}>
                            Fecha Inicio:
                        </label>
                        <input
                            type="date"
                            id="date1"
                            className={styles.input}
                            value={date1}
                            onChange={(e) => handleDateChange(e, 'start')}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="date2" className={styles.label}>
                            Fecha Fin:
                        </label>
                        <input
                            type="date"
                            id="date2"
                            className={styles.input}
                            value={date2}
                            onChange={(e) => handleDateChange(e, 'end')}
                        />
                    </div>
                </div>

                <div className={styles.statsInfo}>
                    Usuarios registrados en este rango de fechas: {users.length}
                </div>

                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Email</th>
                                <th>Teléfono</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.name}</td>
                                        <td>{user.last_name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>
                                            <button 
                                                className={styles.deleteButton}
                                                onClick={() => handleDelete(user.id)}
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className={styles.emptyMessage}>
                                        No hay usuarios en este rango de fechas
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Statistics;