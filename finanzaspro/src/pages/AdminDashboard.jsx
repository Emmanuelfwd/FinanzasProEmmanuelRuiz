import React, { useEffect, useState } from "react";
import { getGastosTipo, agregarGastoTipo, eliminarGastoTipo, getUsuarios, eliminarUsuario, actualizarUsuario } from "../services/Services";
import GastosTipoForm from "../components/admin/GastosTipoForm";
import GastosTipoList from "../components/admin/GastosTipoList";
import UsuariosList from "../components/admin/UsuariosList";
import { Link } from "react-router-dom";
import { toast } from "sonner";

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

  const handleAddGastoTipo = (gasto) => {
  // gasto = { id: 1, nombre: "Transporte" }
  setGastosTipo(prev => [...prev, gasto]);
};

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
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Panel de Administración</h2>
        <Link to="/" className="btn btn-outline-secondary">Volver</Link>
      </div>

      <div className="row g-4">
        <div className="col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Agregar Tipo de Gasto</h5>
              <GastosTipoForm onAdd={handleAddGastoTipo} />
            </div>
          </div>
          <GastosTipoList items={gastosTipo} onDelete={handleDeleteGastoTipo} />
        </div>

        <div className="col-lg-6">
          <UsuariosList usuarios={usuarios} onDelete={handleDeleteUsuario} onUpdate={handleUpdateUsuario} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
