import React, { createContext, useContext, useState, useEffect } from 'react';
import { servicioAutenticacion } from '../services/authService';

const AutenticacionContext = createContext();

export const useAutenticacion = () => {
  const contexto = useContext(AutenticacionContext);
  if (!contexto) {
    throw new Error('useAutenticacion debe usarse dentro de ProveedorAutenticacion');
  }
  return contexto;
};

export const ProveedorAutenticacion = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const datosUsuario = localStorage.getItem('userData');

    if (token && datosUsuario) {
      try {
        setUsuario(JSON.parse(datosUsuario));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      }
    }
    setCargando(false);
  }, []);

  const iniciarSesion = async (email, password) => {
    try {
      const respuesta = await servicioAutenticacion.iniciarSesion(email, password);
      if (respuesta.success) {
        const { user, token } = respuesta.data;
        localStorage.setItem('authToken', token);
        localStorage.setItem('userData', JSON.stringify(user));
        setUsuario(user);
        return { success: true };
      } else {
        return { success: false, error: respuesta.error };
      }
    } catch (error) {
      return { success: false, error: 'Error de conexión' };
    }
  };

  const registrar = async (datosUsuario) => {
    try {
      const respuesta = await servicioAutenticacion.registrar(datosUsuario);
      if (respuesta.success) {
        const { user, token } = respuesta.data;
        localStorage.setItem('authToken', token);
        localStorage.setItem('userData', JSON.stringify(user));
        setUsuario(user);
        return { success: true };
      } else {
        return { success: false, error: respuesta.error };
      }
    } catch (error) {
      return { success: false, error: 'Error de conexión' };
    }
  };

  const cerrarSesion = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUsuario(null);
  };

  const estaAutenticado = () => {
    return !!localStorage.getItem('authToken');
  };

  const value = {
    usuario,
    iniciarSesion,
    registrar,
    cerrarSesion,
    estaAutenticado,
    cargando
  };

  return (
    <AutenticacionContext.Provider value={value}>
      {children}
    </AutenticacionContext.Provider>
  );
};