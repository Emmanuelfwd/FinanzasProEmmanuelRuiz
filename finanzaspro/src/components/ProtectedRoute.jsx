import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAutenticacion } from '../contexts/AuthContext';

export const RutaProtegida = ({ children }) => {
  const { estaAutenticado, cargando } = useAutenticacion();

  if (cargando) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return estaAutenticado() ? children : <Navigate to="/login" replace />;
};
