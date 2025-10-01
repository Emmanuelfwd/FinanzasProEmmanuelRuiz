import React, { useEffect, useState } from "react";
import {
  getGastosTipo,
  eliminarGastoTipo,
  getUsuarios,
  eliminarUsuario,
  actualizarUsuario
} from "../services/Services";
import GastosTipoForm from "../components/admin/GastosTipoForm";
import GastosTipoList from "../components/admin/GastosTipoList";
import UsuariosList from "../components/admin/UsuariosList";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Settings } from "lucide-react";

const AdminDashboard = () => {
  const [gastosTipo, setGastosTipo] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const cargarDatos = async () => {
    setGastosTipo(await getGastosTipo());
    setUsuarios(await getUsuarios());
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleDeleteGastoTipo = async (id) => {
    await eliminarGastoTipo(id);
    toast.success("Tipo de gasto eliminado");
    cargarDatos();
  };

  const handleDeleteUsuario = async (id) => {
    await eliminarUsuario(id);
    toast.success("Usuario eliminado");
    cargarDatos();
  };

  const handleUpdateUsuario = async (usuario) => {
    await actualizarUsuario(usuario);
    toast.success("Usuario actualizado");
    cargarDatos();
  };

  return (
    <div className="dashboard container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary d-flex align-items-center gap-2">
          <Settings /> Panel de Administración
        </h2>
        <Link to="/" className="btn btn-outline-secondary shadow-sm">
          ← Volver
        </Link>
      </div>

      <div className="row g-4">
        <motion.div
          className="col-lg-6"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="card shadow-sm stats-card">
            <div className="card-body">
              <h5 className="card-title">Tipos de Gastos</h5>
              <GastosTipoForm onAdd={cargarDatos} />
              <GastosTipoList gastosTipo={gastosTipo} onDelete={handleDeleteGastoTipo} />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="col-lg-6"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <UsuariosList
            usuarios={usuarios}
            onDelete={handleDeleteUsuario}
            onUpdate={handleUpdateUsuario}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
