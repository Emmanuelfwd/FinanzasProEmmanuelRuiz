import React from 'react';
import { useFinanzas } from '../../contexts/FinanceContext';
import { servicioFinanzas } from '../../services/financeService';

const HistoryView = () => {
  const { obtenerTransaccionesRecientes } = useFinanzas();
  const recientes = obtenerTransaccionesRecientes(10);

  return (
    <div>
      <h3>Historial de Transacciones</h3>
      {recientes.length === 0 ? (
        <p className="text-muted">Aún no hay transacciones.</p>
      ) : (
        <ul className="list-group">
          {recientes.map(t => (
            <li key={t.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <div className="fw-bold">{t.description || (t.type === 'income' ? 'Ingreso' : 'Gasto')}</div>
                <small className="text-muted">{t.category || 'Sin categoria'} • {new Date(t.date).toLocaleString()}</small>
              </div>
              <div className={t.type === 'income' ? 'text-success fw-bold' : 'text-danger fw-bold'}>
                {servicioFinanzas.formatearMoneda(t.amount)}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HistoryView;
