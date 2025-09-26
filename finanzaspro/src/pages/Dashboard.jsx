import React, { useEffect, useState } from "react";
import { getTransaccionesPorUsuario, getDatosMensuales, getGastosPorCategoria, getTransacciones, eliminarTransaccion } from "../services/Services";
import ChartsView from "../components/dashboard/ChartsView";
import ExpensesView from "../components/dashboard/ExpensesView";
import HistoryView from "../components/dashboard/HistoryView";
import AddTransactionModal from "../components/dashboard/AddTransactionModal";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

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
    } catch (err) {
      console.error(err);
    }
  };

  const handleEliminar = async (id) => {
    const ok = window.confirm("Eliminar esta transacción?");
    if (!ok) return;
    try {
      await eliminarTransaccion(id);
      toast.success("Transacción eliminada");
      cargarDatos();
    } catch (err) {
      toast.error("Error al eliminar");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("usuarioActivo");
    navigate("/login");
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Hola, {usuario?.nombre}</h2>
        <div>
          <Link to="/" className="btn btn-link me-2">Inicio</Link>
          <button className="btn btn-outline-danger" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      </div>

      <div className="mb-3">
        <button className="btn btn-primary me-2" onClick={() => setShowModal(true)}>Agregar Transacción</button>
        <button className="btn btn-secondary" onClick={cargarDatos}>Actualizar</button>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <ChartsView datosMensuales={datosMensuales} gastosCategoria={gastosCategoria} />
        </div>
        <div className="col-lg-4">
          <ExpensesView transacciones={transacciones} onDelete={handleEliminar} />
        </div>
      </div>

      <div className="mt-4">
        <HistoryView transacciones={transacciones} />
      </div>

      <AddTransactionModal show={showModal} onHide={() => { setShowModal(false); cargarDatos(); }} />
    </div>
  );
};

export default Dashboard;
