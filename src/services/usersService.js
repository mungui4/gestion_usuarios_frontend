export const fetchPerfil = async (token) => { // Solicitud para obtener al info del perfil (envía token)
  if (!token) {
    console.log('No hay token disponible');
    return { error: 'No hay token disponible', data: null };
  }

  try {
    const response = await fetch('http://127.0.0.1:8000/api/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    if (response.status === 401) {
      console.log('Token no válido o expirado');
      return { error: 'Token no válido o expirado', data: null };

    }

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${await response.text()}`);
    }

    const data = await response.json();
    return { error: null, data };
  } catch (error) {
    console.error('Error:', error);
    return { error: error.message, data: null };
  }
};


export const registerUser = async (userData) => { //Solicitud para registrar un usuario (solo  de rol "user")
  try {
    const response = await fetch('http://127.0.0.1:8000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (response.status === 201) {
      const data = await response.json();
      return data
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Hubo un problema al registrar el usuario');
    }
  } catch (error) {
    throw new Error('Hubo un error en la solicitud:', error);
  }
};



export const updateUser = async (id, userData, token) => { //Solicitud para actualizar los datos de un suario(ya sea con rool "user" o "admin")
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/update/${id}`, { //envia el id del usuario
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Hubo un problema al actualizar el usuario');
    }
  } catch (error) {
    throw new Error('Hubo un error en la solicitud:', error);
  };
};

export const deleteUser = async (id, token) => { //Solicitud para eliminar un usuario
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });
  } catch (error) {
    throw new Error('Hubo un error en la solicitud:', error);
  }
}

export const fetchUsersByDates = async (date1, date2, token) => { //Solicitud para obtener los usuarios registrados en un rango de fechas
  const url = `http://127.0.0.1:8000/api/users/by-dates?git lodate1=${date1}&date2=${date2}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Error al obtener los datos");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Hubo un error en la solicitud:", error);
  }
};


