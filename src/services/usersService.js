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
    throw new Error('Hubo un error en la solicitud');
  }
};



export const updateUser = async (id, userData, token) => { //Solicitud para actualizar los datos de un suario(ya sea con rool "user" o "admin")
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/update/${id}`, { //envia el id del usuario
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
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
    throw new Error('Hubo un error en la solicitud');
  }
};
