import React, { useEffect, useState } from "react";
import {
  getTransaccionesPorUsuario,
  getDatosMensuales,
  getGastosPorCategoria,
  eliminarTransaccion,
} from "../services/Services";
import ChartsView from "../components/dashboard/ChartsView";
import ExpensesView from "../components/dashboard/ExpensesView";
import HistoryView from "../components/dashboard/HistoryView";
import AddTransactionModal from "../components/dashboard/AddTransactionModal";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  DollarSign,
  PlusCircle,
  RefreshCw,
  LogOut,
} from "lucide-react";

const Dashboard = () => {
  const [transacciones, setTransacciones] = useState([]);
  const [datosMensuales, setDatosMensuales] = useState([]);
  const [gastosCategoria, setGastosCategoria] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

  useEffect(() => {
    if (!usuario) {
      navigate("/login");
      return;
    }
    cargarDatos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cargarDatos = async () => {
    try {
      const tx = await getTransaccionesPorUsuario(usuario.id);
      setTransacciones(tx);
      const monthly = await getDatosMensuales(usuario.id);
      setDatosMensuales(monthly);
      const byCat = await getGastosPorCategoria(usuario.id);
      setGastosCategoria(byCat);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEliminar = async (id) => {
    const ok = window.confirm("Eliminar esta transacción?");
    if (!ok) return;
    try {
      await eliminarTransaccion(id);
      toast.success("Transacción eliminada");
      cargarDatos();
    } catch (error) {
      toast.error("Error al eliminar");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("usuarioActivo");
    navigate("/login");
  };

  // Calcular resumen
  const ingresos = transacciones
    .filter((t) => t.tipo === "ingreso")
    .reduce((sum, t) => sum + t.monto, 0);
  const gastos = transacciones
    .filter((t) => t.tipo === "gasto")
    .reduce((sum, t) => sum + t.monto, 0);
  const balance = ingresos - gastos;

  return (
    <div className="dashboard container py-4">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">
          Bienvenido, {usuario?.nombre}
        </h2>
        <div className="d-flex gap-2">
          <Link to="/" className="btn btn-outline-secondary btn-sm">
            Inicio
          </Link>
          <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
            <LogOut size={16} className="me-1" /> Cerrar Sesión
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <motion.div
            className="card stat-card shadow-sm border-0"
            whileHover={{ scale: 1.02 }}
          >
            <div className="card-body d-flex align-items-center">
              <ArrowUpCircle size={40} className="text-success me-3" />
              <div>
                <h6 className="text-muted mb-1">Ingresos</h6>
                <h4 className="fw-bold">₡{ingresos.toLocaleString()}</h4>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="col-md-4">
          <motion.div
            className="card stat-card shadow-sm border-0"
            whileHover={{ scale: 1.02 }}
          >
            <div className="card-body d-flex align-items-center">
              <ArrowDownCircle size={40} className="text-danger me-3" />
              <div>
                <h6 className="text-muted mb-1">Gastos</h6>
                <h4 className="fw-bold">₡{gastos.toLocaleString()}</h4>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="col-md-4">
          <motion.div
            className="card stat-card shadow-sm border-0"
            whileHover={{ scale: 1.02 }}
          >
            <div className="card-body d-flex align-items-center">
              <DollarSign size={40} className="text-primary me-3" />
              <div>
                <h6 className="text-muted mb-1">Balance</h6>
                <h4
                  className={`fw-bold ${
                    balance >= 0 ? "text-success" : "text-danger"
                  }`}
                >
                  ₡{balance.toLocaleString()}
                </h4>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* BOTONES */}
      <div className="mb-4 d-flex gap-2">
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <PlusCircle size={16} className="me-1" /> Agregar Transacción
        </button>
        <button className="btn btn-secondary" onClick={cargarDatos}>
          <RefreshCw size={16} className="me-1" /> Actualizar
        </button>
      </div>

      {/* CHARTS + EXPENSES */}
      <div className="row g-4">
        <div className="col-lg-8">
          <motion.div
            className="card shadow-sm border-0 p-3 h-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <ChartsView
              datosMensuales={datosMensuales}
              gastosCategoria={gastosCategoria}
            />
          </motion.div>
        </div>
        <div className="col-lg-4">
          <motion.div
            className="card shadow-sm border-0 p-3 h-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <ExpensesView
              transacciones={transacciones}
              onDelete={handleEliminar}
            />
          </motion.div>
        </div>
      </div>

      {/* HISTORIAL */}
      <motion.div
        className="card shadow-sm border-0 mt-4 p-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <HistoryView transacciones={transacciones} />
      </motion.div>

      {/* MODAL */}
      <AddTransactionModal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          cargarDatos();
        }}
      />
    </div>
  );
};

export default Dashboard;
