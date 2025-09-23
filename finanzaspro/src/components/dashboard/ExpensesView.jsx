import React from 'react';
import { useFinanzas } from '../../contexts/FinanceContext';
import { servicioFinanzas } from '../../services/financeService';
import { toast } from 'sonner';

const ExpensesView = () => {
  const { obtenerGastosOrdenados, eliminarTransaccion } = useFinanzas();
  const gastos = obtenerGastosOrdenados();

  const handleDelete = async (id) => {
    const ok = window.confirm('¿Eliminar esta transacción?');
    if (!ok) return;
    const res = await eliminarTransaccion(id);
    if (res && res.success) {
      toast.success('Transacción eliminada');
    } else {
      toast.error(res.error || 'Error al eliminar');
    }
  };

  return (
    <div>
      <h3>Gastos</h3>
      {gastos.length === 0 ? (
        <p className="text-muted">No hay gastos registrados.</p>
      ) : (
        <ul className="list-group">
          {gastos.map(g => (
            <li key={g.id} className="list-group-item d-flex justify-content-between align-items-start">
              <div>
                <div className="fw-bold">{g.description || 'Sin descripción'}</div>
                <small className="text-muted">{g.category || 'Otros'} — {new Date(g.date).toLocaleString()}</small>
              </div>
              <div className="text-end">
                <div className="fw-bold">{servicioFinanzas.formatearMoneda(g.amount)}</div>
                <button className="btn btn-sm btn-outline-danger mt-2" onClick={() => handleDelete(g.id)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpensesView;
