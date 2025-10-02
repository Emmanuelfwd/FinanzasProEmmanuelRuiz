import React from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";

const ChartsView = ({ datosMensuales = [], gastosCategoria = [] }) => {
  const COLORS = ["#007bff", "#28a745", "#ffc107", "#dc3545", "#6f42c1", "#20c997"];

  
  const datosMostrar = datosMensuales.map((d) => ({ ...d, mesLabel: d.mes }));

  return (
    <div>
      <h5 className="mb-3">Gráficos</h5>

      <div className="card mb-4 shadow-sm p-3">
        <h6>Tendencia Mensual</h6>
        {datosMostrar.length === 0 ? <p className="text-muted">No hay datos mensuales.</p> : (
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={datosMostrar}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mesLabel" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="ingresos" stroke="#28a745" name="Ingresos" />
                <Line type="monotone" dataKey="gastos" stroke="#dc3545" name="Gastos" />
                <Line type="monotone" dataKey="balance" stroke="#007bff" name="Balance" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <div className="card shadow-sm p-3">
        <h6>Gastos por Categoría</h6>
        {gastosCategoria.length === 0 ? <p className="text-muted">No hay gastos por categoría.</p> : (
          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={gastosCategoria} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {gastosCategoria.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}
                   />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartsView;
