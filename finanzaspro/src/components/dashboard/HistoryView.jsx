import React from "react";

const HistoryView = ({ transacciones = [] }) => {
  const recientes = [...transacciones].sort((a, b) => new Date(b.fecha) - new Date(a.fecha)).slice(0, 10);

  return (
    <div className="card shadow-sm p-3">
      <h6>Historial</h6>
      {recientes.length === 0 ? <p className="text-muted">Aún no hay transacciones.</p> : (
        <ul className="list-group list-group-flush">
          {recientes.map((t) => (
            <li key={t.id} className="list-group-item d-flex justify-content-between">
              <div>{t.descripcion || (t.tipo === "ingreso" ? "Ingreso" : "Gasto")}</div>
              <div className={t.tipo === "ingreso" ? "text-success" : "text-danger"}>{t.tipo === "ingreso" ? "+" : "-"}₡{t.monto}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HistoryView;
