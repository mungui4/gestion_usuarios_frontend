export const login = async (email, password) => { //Solicitud para ingresar, recibe los satos de autenticación
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      if (response.status === 200) {
        const data = await response.json();
        return { success: true, token: data.token, role: data.user.role };
      } else {
        const errorData = await response.json();
        return { success: false, error: errorData.error || 'Hubo un problema al iniciar sesión' };
      }
    } catch (error) {
      return { success: false, error: 'Hubo un error en la solicitud' };
    }
  };
  

  export const logout = async (token, setToken, navigate) => { //Solicitud que permite cerrar la sesión (en el backend borra los registros de sesión activa) 
    if (!token) {
      console.error('No hay token disponible para cerrar sesión');
      return;
    }
  
    try {
      const response = await fetch('http://127.0.0.1:8000/api/logout', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        setToken(null);
        navigate('/login');
      } else {
        console.error('Error al cerrar sesión:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  