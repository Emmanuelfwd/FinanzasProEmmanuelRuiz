import React from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

const ExpensesView = ({ transacciones, onDelete }) => {
  const gastos = transacciones.filter((t) => t.tipo === "gasto");

  return (
    <div>
      <motion.h5
        className="fw-bold mb-3 text-danger"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        Gastos Destacados
      </motion.h5>
      <ul className="list-group small">
        {gastos.length === 0 && (
          <li className="list-group-item text-muted">No hay gastos</li>
        )}
        {gastos.slice(-5).reverse().map((g) => (
          <li
            key={g.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <span className="fw-bold">{g.descripcion}</span>
              <div className="text-muted small">
                {new Date(g.fecha).toLocaleDateString()}
              </div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <span className="fw-bold text-danger">
                -₡{g.monto.toLocaleString()}
              </span>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => onDelete(g.id)}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpensesView;
