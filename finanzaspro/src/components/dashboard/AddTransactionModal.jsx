import React, { useState, useEffect } from "react";
import { agregarTransaccion, getGastosTipo } from "../../services/Services";
import { toast } from "sonner";

const AddTransactionModal = ({ show, onHide }) => {
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo")) || null;

  const initialForm = {
    tipo: "gasto",
    monto: "",
    descripcion: "",
    categoria: ""
  };

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {

    if (show) {
      setForm(initialForm);
    }
  }, [show]);

  useEffect(() => {
    async function fetchCategorias() {
      try {
        const data = await getGastosTipo();
        setCategorias(data);
      } catch (error) {
        console.error("Error al cargar categorías", error);
      }
    }
    fetchCategorias();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!usuario) {
      toast.error("Usuario no autenticado");
      return;
    }
    if (!form.monto || isNaN(Number(form.monto))) {
      toast.error("Ingrese un monto válido");
      return;
    }

    setLoading(true);
    try {
      const nueva = {
        id: crypto.randomUUID(),
        usuarioId: usuario.id,
        tipo: form.tipo,
        monto: Number(form.monto),
        descripcion: form.descripcion,
        categoria: form.categoria,
        fecha: new Date().toISOString()
      };
      await agregarTransaccion(nueva);
      toast.success("Transacción agregada");
      onHide(); 
    } catch (error) {
      toast.error("Error al guardar");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      role="dialog"
      style={{ background: "rgba(0,0,0,0.35)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Agregar Transacción</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onHide}
              ></button>
            </div>
            <div className="modal-body">
              <label className="form-label">Tipo</label>
              <select
                name="tipo"
                value={form.tipo}
                onChange={handleChange}
                className="form-select mb-2"
              >
                <option value="gasto">Gasto</option>
                <option value="ingreso">Ingreso</option>
              </select>

              <input
                name="monto"
                value={form.monto}
                onChange={handleChange}
                className="form-control mb-2"
                placeholder="Monto (ej: 15000)"
              />

              <label className="form-label">Categoría</label>
              <select
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                className="form-select mb-2"
              >
                <option value="">Seleccione una categoría</option>
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.nombre.toLowerCase()}>
                    {cat.nombre}
                  </option>
                ))}
              </select>

              <label className="form-label">Comentarios Relacionados</label>
              <input
                name="categoria"
                value={form.categoria}
                onChange={handleChange}
                className="form-control mb-2"
                placeholder="(opcional)"
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onHide}
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTransactionModal;
