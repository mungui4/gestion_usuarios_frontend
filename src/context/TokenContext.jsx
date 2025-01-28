import { createContext, useState, useEffect } from "react";

export const TokenContext = createContext(); //Creación del contexto

export const TokenProvider = ({ children }) => { //creacion del proveedor
    const [token, setToken] = useState(() => localStorage.getItem("token") || null); 
    const [role, setRole] = useState(() => localStorage.getItem("role") || null);

    useEffect(() => {  //Estableciendo el contexto en el local storage
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);

    useEffect(() => {
        if (role) {
            localStorage.setItem("role", role);
        } else {
            localStorage.removeItem("role");
        }
    }, [role]);

    const refreshToken = async () => { //Llamada a la función para refrescar el token 
        try {
            const response = await fetch('http://127.0.0.1:8000/api/refresh-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setToken(data.token);
                if (data.role) {
                    setRole(data.role);
                }
            } else {
                console.error("Error al refrescar el token.");
            }
        } catch (error) {
            console.error("Error en la solicitud de refresh-token", error);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            refreshToken();
        }, 780000); //Establecimiento de la recurencia de la ejecución (13minutos)

        return () => clearInterval(interval);
    }, [token]);

    return (
        <TokenContext.Provider value={{ token, setToken, role, setRole, refreshToken }}>
            {children}
        </TokenContext.Provider>
    );
};
