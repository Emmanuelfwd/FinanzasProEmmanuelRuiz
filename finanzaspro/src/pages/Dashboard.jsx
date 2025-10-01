import React, { useEffect, useState } from "react";
import {
  getTransaccionesPorUsuario,
  getDatosMensuales,
  getGastosPorCategoria,
  eliminarTransaccion
} from "../services/Services";
import ChartsView from "../components/dashboard/ChartsView";
import ExpensesView from "../components/dashboard/ExpensesView";
import HistoryView from "../components/dashboard/HistoryView";
import AddTransactionModal from "../components/dashboard/AddTransactionModal";
import EditTransactionModal from "../components/dashboard/EditTransactionModal";
import DashboardHome from "../components/dashboard/DashboardHome";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Dashboard = () => {
  const [transacciones, setTransacciones] = useState([]);
  const [datosMensuales, setDatosMensuales] = useState([]);
  const [gastosCategoria, setGastosCategoria] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

  useEffect(() => {
    if (!usuario) {
      navigate("/login");
      return;
    }
    cargarDatos();
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
    const ok = window.confirm("¿Eliminar esta transacción?");
    if (!ok) return;
    try {
      await eliminarTransaccion(id);
      toast.success("Transacción eliminada");
      cargarDatos();
    } catch (error) {
      toast.error("Error al eliminar");
    }
  };

  const handleEditar = (item) => {
    setEditData(item);
    setShowEditModal(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("usuarioActivo");
    navigate("/login");
  };

  return (
    <div className="dashboard container py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">Hola, {usuario?.nombre}</h2>
        <div>
          {usuario?.userType === "admin" && (
            <Link to="/admin" className="btn btn-warning me-2 shadow-sm">
              Panel Admin
            </Link>
          )}
          <Link to="/" className="btn btn-outline-secondary me-2">
            Inicio
          </Link>
          <button className="btn btn-danger shadow-sm" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Acciones */}
      <div className="mb-4">
        <button
          className="btn btn-primary me-2 shadow-sm"
          onClick={() => setShowAddModal(true)}
        >
          + Agregar Transacción
        </button>
        <button className="btn btn-outline-primary shadow-sm" onClick={cargarDatos}>
          ⟳ Actualizar
        </button>
      </div>

      {/* Contador Balance */}
      <DashboardHome transacciones={transacciones} />

      {/* Dashboard contenido */}
      <div className="row g-4 mt-3">
        <div className="col-lg-8">
          <ChartsView
            datosMensuales={datosMensuales}
            gastosCategoria={gastosCategoria}
          />
        </div>
        <div className="col-lg-4">
          <ExpensesView
            transacciones={transacciones}
            onDelete={handleEliminar}
            onEdit={handleEditar}
          />
        </div>
      </div>

      <div className="mt-4">
        <HistoryView
          transacciones={transacciones}
          onDelete={handleEliminar}
          onEdit={handleEditar}
        />
      </div>

      {/* Modales */}
      <AddTransactionModal
        show={showAddModal}
        onHide={() => {
          setShowAddModal(false);
          cargarDatos();
        }}
      />

      <EditTransactionModal
        show={showEditModal}
        data={editData}
        onHide={(updated) => {
          setShowEditModal(false);
          setEditData(null);
          if (updated) cargarDatos();
        }}
      />
    </div>
  );
};

export default Dashboard;
