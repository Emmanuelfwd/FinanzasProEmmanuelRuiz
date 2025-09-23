const TRANSACCIONES_KEY = 'finance_app_transactions';

export const CATEGORIAS_GASTOS = [
  'facturas',
  'servicios',
  'ocio',
  'otros'
];

const inicializarTransacciones = () => {
  const existentes = localStorage.getItem(TRANSACCIONES_KEY);
  if (!existentes) {
    const demoTransacciones = [
      { id: '1', userId: '1', type: 'income', amount: 500000, description: 'Salario', category: '', date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
      { id: '2', userId: '1', type: 'expense', amount: 45000, description: 'Factura de electricidad', category: 'facturas', date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
      { id: '3', userId: '1', type: 'expense', amount: 25000, description: 'Internet', category: 'servicios', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
      { id: '4', userId: '1', type: 'expense', amount: 15000, description: 'Cine', category: 'ocio', date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() }
    ];
    localStorage.setItem(TRANSACCIONES_KEY, JSON.stringify(demoTransacciones));
  }
};

const obtenerTransaccionesStorage = () => {
  inicializarTransacciones();
  const tx = localStorage.getItem(TRANSACCIONES_KEY);
  return tx ? JSON.parse(tx) : [];
};

const guardarTransaccionesStorage = (transacciones) => {
  localStorage.setItem(TRANSACCIONES_KEY, JSON.stringify(transacciones));
};

export const servicioFinanzas = {
  async obtenerTransacciones(userId) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const all = obtenerTransaccionesStorage();
    return all.filter(t => t.userId === userId);
  },

  async agregarTransaccion(transaccion) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const transacciones = obtenerTransaccionesStorage();
    transacciones.push(transaccion);
    guardarTransaccionesStorage(transacciones);
    return transaccion;
  },

  async actualizarTransaccion(transactionId, datosActualizados) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const transacciones = obtenerTransaccionesStorage();
    const index = transacciones.findIndex(t => t.id === transactionId);
    if (index === -1) throw new Error('Transacción no encontrada');
    transacciones[index] = { ...transacciones[index], ...datosActualizados };
    guardarTransaccionesStorage(transacciones);
    return transacciones[index];
  },

  async eliminarTransaccion(transactionId) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const transacciones = obtenerTransaccionesStorage();
    const filtradas = transacciones.filter(t => t.id !== transactionId);
    guardarTransaccionesStorage(filtradas);
    return true;
  },

  formatearMoneda(amount) {
    return new Intl.NumberFormat('es-CR', {
      style: 'currency',
      currency: 'CRC',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  },

  estadoBalance(balance) {
    if (balance > 10000) return 'positivo';
    if (balance > 0) return 'advertencia';
    return 'negativo';
  }
};
