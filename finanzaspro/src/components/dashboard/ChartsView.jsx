import React from 'react';
import { useFinanzas } from '../../contexts/FinanceContext';
import { servicioFinanzas } from '../../services/financeService';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

const ChartsView = () => {
  const { obtenerDatosMensuales, obtenerGastosPorCategoria } = useFinanzas();
  const monthly = obtenerDatosMensuales();
  const gastosPorCategoria = obtenerGastosPorCategoria();
  const COLORS = ['#007bff', '#28a745', '#ffc107', '#dc3545', '#6f42c1', '#20c997'];

  const tooltipFormatter = (value) => servicioFinanzas.formatearMoneda(value);

  return (
    <div>
      <h3>Gráficos</h3>

      <div className="mb-4">
        <h5>Tendencia Mensual</h5>
        {monthly.length === 0 ? (
          <p className="text-muted">No hay datos mensuales para mostrar.</p>
        ) : (
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={monthly}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={tooltipFormatter} labelFormatter={label => `Mes: ${label}`} />
                <Legend />
                <Line type="monotone" dataKey="ingresos" stroke="#28a745" name="Ingresos" />
                <Line type="monotone" dataKey="gastos" stroke="#dc3545" name="Gastos" />
                <Line type="monotone" dataKey="balance" stroke="#007bff" name="Balance" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <div>
        <h5>Gastos por Categoría</h5>
        {gastosPorCategoria.length === 0 ? (
          <p className="text-muted">No hay gastos por categoría.</p>
        ) : (
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={gastosPorCategoria} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {gastosPorCategoria.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip formatter={(value) => servicioFinanzas.formatearMoneda(value)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartsView;
