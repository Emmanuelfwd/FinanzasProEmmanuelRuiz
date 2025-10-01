/* ==================== USUARIOS ==================== */
export async function getUsuarios() {
  try {
    const response = await fetch("http://localhost:3001/usuarios");
    return await response.json();
  } catch (error) {
    console.error("Error al obtener usuarios", error);
    throw error;
  }
}

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

export async function eliminarUsuario(id) {
  try {
    await fetch(`http://localhost:3001/usuarios/${id}`, { method: "DELETE" });
  } catch (error) {
    console.error("Error al eliminar usuario", error);
    throw error;
  }
}

export async function actualizarUsuario(usuario) {
  try {
    const response = await fetch(`http://localhost:3001/usuarios/${usuario.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario)
    });
    return await response.json();
  } catch (error) {
    console.error("Error al actualizar usuario", error);
    throw error;
  }
}

/* ==================== TRANSACCIONES ==================== */
export async function getTransacciones() {
  try {
    const response = await fetch("http://localhost:3001/transacciones");
    return await response.json();
  } catch (error) {
    console.error("Error al obtener transacciones", error);
    throw error;
  }
}

export async function getTransaccionesPorUsuario(usuarioId) {
  try {
    const response = await fetch(
      `http://localhost:3001/transacciones?usuarioId=${encodeURIComponent(usuarioId)}`
    );
    return await response.json();
  } catch (error) {
    console.error("Error al obtener transacciones del usuario", error);
    throw error;
  }
}

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

export async function eliminarTransaccion(id) {
  try {
    await fetch(`http://localhost:3001/transacciones/${id}`, { method: "DELETE" });
  } catch (error) {
    console.error("Error al eliminar transacción", error);
    throw error;
  }
}

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

/* ==================== GRAFICAS ==================== */
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

export async function getGastosPorCategoria(usuarioId) {
  try {
    const transacciones = await getTransaccionesPorUsuario(usuarioId);
    const gastos = transacciones.filter((t) => t.tipo === "gasto");
    const agrupado = {};
    gastos.forEach((g) => {
      const desc = g.descripcion || "Sin descripción";
      agrupado[desc] = (agrupado[desc] || 0) + Number(g.monto || 0);
    });
    return Object.keys(agrupado).map((k) => ({ name: k, value: agrupado[k] }));
  } catch (error) {
    console.error("Error al obtener gastos por categoría", error);
    throw error;
  }
}

/* ==================== GASTOS TIPO ==================== */
export async function getGastosTipo() {
  try {
    const response = await fetch("http://localhost:3001/gastosTipo");
    return await response.json();
  } catch (error) {
    console.error("Error al obtener tipos de gasto", error);
    throw error;
  }
}

export async function agregarGastoTipo(item) {
  try {
    const response = await fetch("http://localhost:3001/gastosTipo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item)
    });
    return await response.json();
  } catch (error) {
    console.error("Error al agregar gasto tipo", error);
    throw error;
  }
}

// ===== NUEVA FUNCIÓN: AGREGAR GASTO TIPO CON ID ÚNICO SUMANDO 2 =====
export async function agregarGastoTipoSeguro(nombre) {
  try {
    const gastosExistentes = await getGastosTipo();

    // Tomamos el último elemento y le sumamos 2
    const lastId = gastosExistentes.length
      ? gastosExistentes[gastosExistentes.length - 1].id
      : 0;

    const nuevoGasto = { id: lastId + 1, nombre };
    return await agregarGastoTipo(nuevoGasto);
  } catch (error) {
    console.error("Error al agregar gasto tipo seguro", error);
    throw error;
  }
}

export async function eliminarGastoTipo(id) {
  try {
    await fetch(`http://localhost:3001/gastosTipo/${id}`, { method: "DELETE" });
  } catch (error) {
    console.error("Error al eliminar gasto tipo", error);
    throw error;
  }
}
