import React from "react";
import { motion } from "framer-motion";

const HistoryView = ({ transacciones }) => {
  return (
    <div>
      <motion.h5
        className="fw-bold mb-3 text-secondary"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        Historial de Transacciones
      </motion.h5>
      <ul className="list-group small">
        {transacciones.length === 0 && (
          <li className="list-group-item text-muted">No hay transacciones</li>
        )}
        {transacciones.slice(-10).reverse().map((t) => (
          <li
            key={t.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <span className="fw-bold">{t.descripcion}</span>
              <div className="text-muted small">
                {new Date(t.fecha).toLocaleString()}
              </div>
            </div>
            <span
              className={`fw-bold ${
                t.tipo === "ingreso" ? "text-success" : "text-danger"
              }`}
            >
              {t.tipo === "ingreso" ? "+" : "-"}₡{t.monto.toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryView;
