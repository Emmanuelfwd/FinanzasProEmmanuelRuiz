import React, { useState } from 'react';
import { useFinanzas } from '../../contexts/FinanceContext';
import { toast } from 'sonner';

const AddTransactionModal = ({ show, onHide }) => {
  const { agregarTransaccion } = useFinanzas();

  const [form, setForm] = useState({
    type: 'expense',
    amount: '',
    description: '',
    category: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.amount || isNaN(form.amount)) {
      toast.error('Ingrese un monto válido');
      return;
    }
    setLoading(true);
    try {
      const res = await agregarTransaccion({
        type: form.type,
        amount: Number(form.amount),
        description: form.description,
        category: form.category
      });
      if (res && res.success) {
        toast.success('Transacción agregada');
        setForm({ type: 'expense', amount: '', description: '', category: '' });
        onHide();
      } else {
        toast.error(res.error || 'No se pudo agregar la transacción');
      }
    } catch (err) {
      toast.error('Error al agregar transacción');
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="modal d-block" tabIndex="-1" role="dialog" style={{ background: 'rgba(0,0,0,0.4)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Agregar Transacción</h5>
              <button type="button" className="btn-close" aria-label="Cerrar" onClick={onHide}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Tipo</label>
                <select name="type" value={form.type} onChange={handleChange} className="form-select">
                  <option value="expense">Gasto</option>
                  <option value="income">Ingreso</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Monto</label>
                <input name="amount" value={form.amount} onChange={handleChange} className="form-control" placeholder="ej. 25000" />
              </div>

              <div className="mb-3">
                <label className="form-label">Descripción</label>
                <input name="description" value={form.description} onChange={handleChange} className="form-control" placeholder="Descripción" />
              </div>

              <div className="mb-3">
                <label className="form-label">Categoría</label>
                <input name="category" value={form.category} onChange={handleChange} className="form-control" placeholder="Categoría (opcional)" />
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onHide} disabled={loading}>Cancelar</button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Guardando...' : 'Agregar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTransactionModal;
