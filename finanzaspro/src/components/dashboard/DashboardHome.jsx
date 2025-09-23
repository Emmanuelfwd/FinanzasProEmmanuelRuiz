import React from "react";
import { useFinanzas } from "../../contexts/FinanceContext";
import { servicioFinanzas } from "../../services/financeService";

const DashboardHome = () => {
  const { obtenerBalance, obtenerIngresosTotales, obtenerGastosTotales } = useFinanzas();

  const balance = obtenerBalance();
  const ingresos = obtenerIngresosTotales();
  const gastos = obtenerGastosTotales();

  return (
    <div>
      <h2>Resumen Financiero</h2>
      <ul className="list-group">
        <li className="list-group-item">
          <strong>Balance:</strong> {servicioFinanzas.formatearMoneda(balance)}
        </li>
        <li className="list-group-item">
          <strong>Ingresos:</strong> {servicioFinanzas.formatearMoneda(ingresos)}
        </li>
        <li className="list-group-item">
          <strong>Gastos:</strong> {servicioFinanzas.formatearMoneda(gastos)}
        </li>
      </ul>
    </div>
  );
};

export default DashboardHome;
