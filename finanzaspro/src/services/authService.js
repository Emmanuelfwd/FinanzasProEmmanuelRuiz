const USUARIOS_KEY = 'finance_app_users';

const inicializarUsuarios = () => {
  const existentes = localStorage.getItem(USUARIOS_KEY);
  if (!existentes) {
    const usuariosDemo = [
      { id: '1', name: 'Usuario Demo', email: 'demo@finanzas.com', password: 'demo123' }
    ];
    localStorage.setItem(USUARIOS_KEY, JSON.stringify(usuariosDemo));
  }
};

const obtenerUsuarios = () => {
  inicializarUsuarios();
  const usuarios = localStorage.getItem(USUARIOS_KEY);
  return usuarios ? JSON.parse(usuarios) : [];
};

const guardarUsuarios = (usuarios) => {
  localStorage.setItem(USUARIOS_KEY, JSON.stringify(usuarios));
};

const generarToken = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export const servicioAutenticacion = {
  async iniciarSesion(email, password) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const usuarios = obtenerUsuarios();
    const usuario = usuarios.find(u => u.email === email && u.password === password);
    if (usuario) {
      const token = generarToken();
      const userResponse = { id: usuario.id, name: usuario.name, email: usuario.email };
      return { success: true, data: { user: userResponse, token } };
    } else {
      return { success: false, error: 'Credenciales inválidas' };
    }
  },

  async registrar(userData) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const usuarios = obtenerUsuarios();
    const existe = usuarios.find(u => u.email === userData.email);
    if (existe) return { success: false, error: 'El email ya está registrado' };

    const nuevoUsuario = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      password: userData.password
    };

    usuarios.push(nuevoUsuario);
    guardarUsuarios(usuarios);

    const token = generarToken();
    const userResponse = { id: nuevoUsuario.id, name: nuevoUsuario.name, email: nuevoUsuario.email };

    return { success: true, data: { user: userResponse, token } };
  },

  async validarToken(token) {
    return !!token;
  }
};