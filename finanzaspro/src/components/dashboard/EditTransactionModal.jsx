import React, { useState, useEffect } from "react";
import { actualizarTransaccion } from "../../services/Services";
import { toast } from "sonner";

const EditTransactionModal = ({ show, onHide, data }) => {
  const [form, setForm] = useState({ monto: "", tipo: "" });

  useEffect(() => {
    if (data) {
      setForm({ monto: data.monto, tipo: data.tipo });
    }
  }, [data]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await actualizarTransaccion({ ...data, ...form, monto: Number(form.monto) });
      toast.success("Transacción actualizada");
      onHide(true); 
    } catch (error) {
      toast.error("Error al actualizar");
    }
  };

  if (!show) return null;

  return (
    <div className="modal d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Editar Transacción</h5>
              <button type="button" className="btn-close" onClick={() => onHide(false)}></button>
            </div>
            <div className="modal-body">
              <label className="form-label">Monto</label>
              <input
                type="number"
                name="monto"
                className="form-control mb-3"
                value={form.monto}
                onChange={handleChange}
              />
              <label className="form-label">Tipo</label>
              <select
                name="tipo"
                className="form-select"
                value={form.tipo}
                onChange={handleChange}
              >
                <option value="gasto">Gasto</option>
                <option value="ingreso">Ingreso</option>
              </select>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => onHide(false)}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTransactionModal;
