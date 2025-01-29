import { useContext, useEffect } from "react"
import { TokenContext } from '../../context/TokenContext';
import { useState } from "react";
import { fetchUsersByDates, deleteUser } from "../../services/usersService";

function Stadistics() {

    const { token } = useContext(TokenContext);

    const currentYear = new Date().getFullYear();
    const [users, setUsers] = useState([]);
    const [date1, setDate1] = useState(currentYear + "-01-01");
    const [date2, setDate2] = useState(currentYear + "-01-31");

    const handleSubmit = async (e) => {
        if (e && e.preventDefault) e.preventDefault();
        if (!date1 || !date2) {
            alert("Por favor selecciona ambas fechas");
            return;
        }

        try {
            const response = await fetchUsersByDates(date1, date2, token);
            setUsers(response.data);
        } catch (error) {
            console.error("Error al obtener los usuarios:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteUser(id, token);
            await handleSubmit();
        } catch (error) {
            console.error("Error al eliminar el usuario:", error);
        }
    }

    useEffect(() => {
        handleSubmit();
    }, []);

    return (
        <div>
            <h2>Estadísticas de Usuarios</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="date1">Fecha Inicio:</label>
                    <input
                        type="date"
                        id="date1"
                        value={date1}
                        onChange={(e) => setDate1(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="date2">Fecha Fin:</label>
                    <input
                        type="date"
                        id="date2"
                        value={date2}
                        onChange={(e) => setDate2(e.target.value)}
                    />
                </div>
                <button type="submit">Buscar</button>
            </form>

            <h4>Usuarios registrados en este rango de fechas: {users.length}</h4>

            <table>
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
                                    <button onClick={() => handleDelete(user.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No hay usuarios en este rango de fechas</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Stadistics