import React from "react";

const ExpensesView = ({ transacciones = [], onDelete }) => {
  const gastos = transacciones.filter((t) => t.tipo === "gasto");

  return (
    <div className="card shadow-sm p-3">
      <h6>Gastos Recientes</h6>
      {gastos.length === 0 ? <p className="text-muted">No hay gastos registrados.</p> : (
        <ul className="list-group list-group-flush">
          {gastos.slice(0, 6).map((g) => (
            <li key={g.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <div className="fw-bold">{g.descripcion || "Sin descripción"}</div>
                <small className="text-muted">{g.categoria} • {new Date(g.fecha).toLocaleDateString()}</small>
              </div>
              <div className="text-end">
                <div className="text-danger fw-bold">₡{g.monto}</div>
                <button className="btn btn-sm btn-outline-danger mt-2" onClick={() => onDelete && onDelete(g.id)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpensesView;
