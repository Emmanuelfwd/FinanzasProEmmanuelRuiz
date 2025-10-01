import React from "react";

const HistoryView = ({ transacciones = [], onDelete, onEdit }) => {
  if (transacciones.length === 0) {
    return (
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Historial</h5>
          <p className="text-muted">No hay transacciones</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title">Historial de Transacciones</h5>
        <ul className="list-group list-group-flush">
          {transacciones
            .slice()
            .reverse()
            .map((t) => (
              <li key={t.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{t.descripcion}</strong> —{" "}
                  <span className={t.tipo === "ingreso" ? "text-success" : "text-danger"}>
                    {t.tipo}
                  </span>
                  <div className="small text-muted">{new Date(t.fecha).toLocaleDateString()}</div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span className="fw-bold">
                    ₡{Number(t.monto).toLocaleString("es-CR")}
                  </span>
                  <button className="btn btn-sm btn-outline-primary" onClick={() => onEdit(t)}>
                    Editar
                  </button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(t.id)}>
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

export default HistoryView;
