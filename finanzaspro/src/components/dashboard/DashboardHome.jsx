import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

const DashboardHome = ({ transacciones = [] }) => {
  const ingresos = transacciones
    .filter((t) => t.tipo === "ingreso")
    .reduce((acc, t) => acc + Number(t.monto || 0), 0);

  const gastos = transacciones
    .filter((t) => t.tipo === "gasto")
    .reduce((acc, t) => acc + Number(t.monto || 0), 0);

  const balance = ingresos - gastos;

  const formatCurrency = (value) => {
    const n = Number(value) || 0;
    const abs = Math.abs(Math.round(n));
    const formatted = abs.toLocaleString("es-CR");
    return (n < 0 ? "-₡" : "₡") + formatted;
  };

  const getStatus = () => {
    if (balance < 0) return { color: "text-danger", icon: <TrendingDown size={28} /> };
    if (balance < 10000) return { color: "text-warning", icon: <AlertTriangle size={28} /> };
    return { color: "text-success", icon: <TrendingUp size={28} /> };
  };

  const { color, icon } = getStatus();

  return (
    <motion.div
      className="card balance-card mb-4 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="card-body text-center">
        <div className="d-flex justify-content-center align-items-center gap-2 mb-2">
          {icon}
          <h5 className="mb-0">Balance Actual</h5>
        </div>
        <motion.div
          key={balance}
          className={`balance-amount ${color}`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {formatCurrency(balance)}
        </motion.div>
        <p className="mb-0 mt-2 small">
          Ingresos: <strong className="text-success">{formatCurrency(ingresos)}</strong> |{" "}
          Gastos: <strong className="text-danger">{formatCurrency(gastos)}</strong>
        </p>
      </div>
    </motion.div>
  );
};

export default DashboardHome;
