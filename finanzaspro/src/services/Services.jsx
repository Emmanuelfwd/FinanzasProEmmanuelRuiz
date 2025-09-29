/* Servicios de la API (json-server) */
/* Usa las rutas exactamente como json-server expone: /usuarios y /transacciones */

/* ==================== USUARIOS ==================== */

/* Obtener todos los usuarios */
export async function getUsuarios() {
  try {
    const response = await fetch("http://localhost:3001/usuarios", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    return await response.json();
  } catch (error) {
    console.error("Error al obtener usuarios", error);
    throw error;
  }
}

/* Registrar usuario */
export async function registrarUsuario(usuario) {
  try {
    const response = await fetch("http://localhost:3001/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario)
    });
    return await response.json();
  } catch (error) {
    console.error("Error al registrar usuario", error);
    throw error;
  }
}

/* Validar login: devuelve el usuario encontrado o null */
export async function validarLogin(email, password) {
  try {
    const response = await fetch(
      `http://localhost:3001/usuarios?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
    );
    const usuarios = await response.json();
    return usuarios.length > 0 ? usuarios[0] : null;
  } catch (error) {
    console.error("Error al validar login", error);
    throw error;
  }
}

/* ==================== TRANSACCIONES ==================== */

/* Obtener todas las transacciones */
export async function getTransacciones() {
  try {
    const response = await fetch("http://localhost:3001/transacciones", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    return await response.json();
  } catch (error) {
    console.error("Error al obtener transacciones", error);
    throw error;
  }
}

/* Obtener transacciones por usuario */
export async function getTransaccionesPorUsuario(usuarioId) {
  try {
    const response = await fetch(
      `http://localhost:3001/transacciones?usuarioId=${encodeURIComponent(usuarioId)}`,
      { method: "GET", headers: { "Content-Type": "application/json" } }
    );
    return await response.json();
  } catch (error) {
    console.error("Error al obtener transacciones del usuario", error);
    throw error;
  }
}

/* Agregar transacción */
export async function agregarTransaccion(transaccion) {
  try {
    const response = await fetch("http://localhost:3001/transacciones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transaccion)
    });
    return await response.json();
  } catch (error) {
    console.error("Error al agregar transacción", error);
    throw error;
  }
}

/* Eliminar transacción */
export async function eliminarTransaccion(id) {
  try {
    await fetch(`http://localhost:3001/transacciones/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error al eliminar transacción", error);
    throw error;
  }
}

/* Actualizar transacción */
export async function actualizarTransaccion(transaccion) {
  try {
    const response = await fetch(`http://localhost:3001/transacciones/${transaccion.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transaccion)
    });
    return await response.json();
  } catch (error) {
    console.error("Error al actualizar transacción", error);
    throw error;
  }
}

/* ==================== GRÁFICAS ==================== */

/* Datos de ingresos/gastos por mes (devuelve array de { mes, ingresos, gastos, balance }) */
export async function getDatosMensuales(usuarioId) {
  try {
    const transacciones = await getTransaccionesPorUsuario(usuarioId);
    const agrupado = {};

    transacciones.forEach((t) => {
      const date = new Date(t.fecha);
      const mesKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      if (!agrupado[mesKey]) agrupado[mesKey] = { mes: mesKey, ingresos: 0, gastos: 0 };
      if (t.tipo === "ingreso") agrupado[mesKey].ingresos += Number(t.monto || 0);
      else agrupado[mesKey].gastos += Number(t.monto || 0);
    });

    return Object.values(agrupado)
      .sort((a, b) => a.mes.localeCompare(b.mes))
      .map((m) => ({ ...m, balance: m.ingresos - m.gastos }));
  } catch (error) {
    console.error("Error al calcular datos mensuales", error);
    throw error;
  }
}

/* Gastos por categoría (devuelve array de { name, value }) */
export async function getGastosPorCategoria(usuarioId) {
  try {
    const transacciones = await getTransaccionesPorUsuario(usuarioId);
    const gastos = transacciones.filter((t) => t.tipo === "gasto");
    const agrupado = {};
    gastos.forEach((g) => {
      const cat = g.categoria || "Otros";
      agrupado[cat] = (agrupado[cat] || 0) + Number(g.monto || 0);
    });
    return Object.keys(agrupado).map((k) => ({ name: k, value: agrupado[k] }));
  } catch (error) {
    console.error("Error al obtener gastos por categoría", error);
    throw error;
  }
}
export async function getGastosTipo() {
  try {
    const response = await fetch("http://localhost:3001/gastosTipo", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
     console.log(response);
    return await response.json();
   
    
  } catch (error) {
    console.error("Error al obtener tipos de gasto", error);
    throw error;
  }
}