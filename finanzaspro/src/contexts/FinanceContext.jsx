import React, { createContext, useContext, useState, useEffect } from 'react';
import { servicioFinanzas } from '../services/financeService';
import { useAutenticacion } from './AuthContext';

const FinanzasContext = createContext();

export const useFinanzas = () => {
  const contexto = useContext(FinanzasContext);
  if (!contexto) {
    throw new Error('useFinanzas debe usarse dentro de ProveedorFinanzas');
  }
  return contexto;
};

export const ProveedorFinanzas = ({ children }) => {
  const { usuario } = useAutenticacion();
  const [transacciones, setTransacciones] = useState([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (usuario) {
      cargarTransacciones();
    } else {
      setTransacciones([]);
    }
  }, [usuario]);

  const cargarTransacciones = async () => {
    if (!usuario) return;
    setCargando(true);
    try {
      const data = await servicioFinanzas.obtenerTransacciones(usuario.id);
      setTransacciones(data);
    } catch (error) {
      console.error('Error loading transactions:', error);
    } finally {
      setCargando(false);
    }
  };

  const agregarTransaccion = async (datosTransaccion) => {
    if (!usuario) return { success: false, error: 'Usuario no autenticado' };
    try {
      const nuevaTransaccion = {
        ...datosTransaccion,
        userId: usuario.id,
        id: Date.now().toString(),
        date: new Date().toISOString()
      };
      await servicioFinanzas.agregarTransaccion(nuevaTransaccion);
      setTransacciones(prev => [nuevaTransaccion, ...prev]);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Error al agregar transacción' };
    }
  };

  const eliminarTransaccion = async (transactionId) => {
    try {
      await servicioFinanzas.eliminarTransaccion(transactionId);
      setTransacciones(prev => prev.filter(t => t.id !== transactionId));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Error al eliminar transacción' };
    }
  };

  const actualizarTransaccion = async (transactionId, datosActualizados) => {
    try {
      const transaccionActualizada = await servicioFinanzas.actualizarTransaccion(transactionId, datosActualizados);
      setTransacciones(prev =>
        prev.map(t => t.id === transactionId ? transaccionActualizada : t)
      );
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Error al actualizar transacción' };
    }
  };

  const obtenerBalance = () => {
    const ingresos = transacciones
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
    const gastos = transacciones
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
    return ingresos - gastos;
  };

  const obtenerIngresosTotales = () => {
    return transacciones
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
  };

  const obtenerGastosTotales = () => {
    return transacciones
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
  };

  const obtenerGastosPorCategoria = () => {
    const gastos = transacciones.filter(t => t.type === 'expense');
    const categorias = {};
    gastos.forEach(gasto => {
      const categoria = gasto.category || 'otros';
      categorias[categoria] = (categorias[categoria] || 0) + parseFloat(gasto.amount || 0);
    });
    return Object.entries(categorias).map(([name, value]) => ({ name, value }));
  };

  const obtenerDatosMensuales = () => {
    const monthlyData = {};
    transacciones.forEach(transaction => {
      const date = new Date(transaction.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (!monthlyData[monthKey]) monthlyData[monthKey] = { income: 0, expenses: 0 };
      if (transaction.type === 'income') monthlyData[monthKey].income += parseFloat(transaction.amount || 0);
      else monthlyData[monthKey].expenses += parseFloat(transaction.amount || 0);
    });
    return Object.entries(monthlyData)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, data]) => ({
        month,
        ingresos: data.income,
        gastos: data.expenses,
        balance: data.income - data.expenses
      }));
  };

  const obtenerTransaccionesRecientes = (limit = 5) => {
    return [...transacciones].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, limit);
  };

  const obtenerGastosOrdenados = () => {
    return transacciones
      .filter(t => t.type === 'expense')
      .sort((a, b) => parseFloat(b.amount || 0) - parseFloat(a.amount || 0));
  };

  const value = {
    transacciones,
    cargando,
    agregarTransaccion,
    eliminarTransaccion,
    actualizarTransaccion,
    cargarTransacciones,
    obtenerBalance,
    obtenerIngresosTotales,
    obtenerGastosTotales,
    obtenerGastosPorCategoria,
    obtenerDatosMensuales,
    obtenerTransaccionesRecientes,
    obtenerGastosOrdenados
  };

  return (
    <FinanzasContext.Provider value={value}>
      {children}
    </FinanzasContext.Provider>
  );
};