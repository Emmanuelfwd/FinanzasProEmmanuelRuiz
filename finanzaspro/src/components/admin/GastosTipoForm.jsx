import React, { useState, useEffect } from "react";
import GastosTipoList from "./GastosTipoList";
import { getGastosTipo, agregarGastoTipoSeguro, eliminarGastoTipo } from "../../services/Services";

const GastosTipoForm = () => {
  const [gastosTipo, setGastosTipo] = useState([]);
  const [nombre, setNombre] = useState("");

  // Cargar los gastos tipo al montar
  useEffect(() => {
    const cargarGastos = async () => {
      try {
        const data = await getGastosTipo();
        setGastosTipo(data);
      } catch (error) {
        console.error("Error al cargar gastos tipo", error);
      }
    };
    cargarGastos();
  }, []);

  // Agregar un nuevo gasto tipo
  const handleAdd = async (nombre) => {
    try {
      const nuevo = await agregarGastoTipoSeguro(nombre);
      setGastosTipo((prev) => [...prev, nuevo]);
    } catch (error) {
      console.error("Error al agregar gasto tipo", error);
    }
  };

  // Eliminar gasto tipo
  const handleDelete = async (id) => {
    try {
      await eliminarGastoTipo(id);
      setGastosTipo((prev) => prev.filter((g) => g.id !== id));
    } catch (error) {
      console.error("Error al eliminar gasto tipo", error);
    }
  };

  // Submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;
    await handleAdd(nombre.trim());
    setNombre("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="d-flex mb-3">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Nombre del gasto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">Agregar</button>
      </form>

      <GastosTipoList gastosTipo={gastosTipo} onDelete={handleDelete} />
    </div>
  );
};

export default GastosTipoForm;
