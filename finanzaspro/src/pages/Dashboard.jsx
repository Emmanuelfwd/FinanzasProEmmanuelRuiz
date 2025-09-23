import React, { useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAutenticacion } from "../contexts/AuthContext";
import { useFinanzas } from "../contexts/FinanceContext";

// Componentes del dashboard
import DashboardHome from "../components/dashboard/DashboardHome";
import ExpensesView from "../components/dashboard/ExpensesView";
import ChartsView from "../components/dashboard/ChartsView";
import HistoryView from "../components/dashboard/HistoryView";
import AddTransactionModal from "../components/dashboard/AddTransactionModal";

const Dashboard = () => {
  const { usuario, cerrarSesion } = useAutenticacion();
  const [mostrarModal, setMostrarModal] = useState(false);

  if (!usuario) return <Navigate to="/login" replace />;

  return (
    <div className="dashboard-container">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/dashboard">
            FinanzasPro
          </Link>
          <button
            className="btn btn-outline-light ms-auto"
            onClick={cerrarSesion}
          >
            Cerrar Sesión
          </button>
        </div>
      </nav>

      <div className="container mt-4">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3 mb-4">
            <div className="list-group">
              <Link
                to="/dashboard"
                className="list-group-item list-group-item-action"
              >
                Inicio
              </Link>
              <Link
                to="/dashboard/expenses"
                className="list-group-item list-group-item-action"
              >
                Gastos
              </Link>
              <Link
                to="/dashboard/charts"
                className="list-group-item list-group-item-action"
              >
                Gráficos
              </Link>
              <Link
                to="/dashboard/history"
                className="list-group-item list-group-item-action"
              >
                Historial
              </Link>
            </div>
            <button
              className="btn btn-success w-100 mt-3"
              onClick={() => setMostrarModal(true)}
            >
              + Agregar Transacción
            </button>
          </div>

          {/* Contenido principal */}
          <div className="col-md-9">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Routes>
                <Route path="/" element={<DashboardHome />} />
                <Route path="expenses" element={<ExpensesView />} />
                <Route path="charts" element={<ChartsView />} />
                <Route path="history" element={<HistoryView />} />
              </Routes>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AddTransactionModal
        show={mostrarModal}
        onHide={() => setMostrarModal(false)}
      />
    </div>
  );
};

export default Dashboard;
