import React from "react";

const ExpensesView = ({ transacciones = [], onDelete, onEdit }) => {
  
  const gastos = transacciones.filter((t) => t.tipo === "gasto").slice(-5).reverse();

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title">Últimos Gastos</h5>
        {gastos.length === 0 && <p className="text-muted">No hay gastos registrados</p>}
        <ul className="list-group list-group-flush">
          {gastos.map((g) => (
            <li key={g.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{g.descripcion}</strong>
                <div className="small text-muted">{new Date(g.fecha).toLocaleDateString()}</div>
              </div>
              <div className="d-flex align-items-center gap-2">
                <span className="fw-bold text-danger">₡{Number(g.monto).toLocaleString("es-CR")}</span>
                <button className="btn btn-sm btn-outline-primary" onClick={() => onEdit(g)}>
                  Editar
                </button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(g.id)}>
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExpensesView;
