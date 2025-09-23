import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { useAutenticacion } from '../contexts/AuthContext';
import { toast } from 'sonner';

const IniciarSesion = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [cargando, setCargando] = useState(false);

  const { iniciarSesion } = useAutenticacion();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    try {
      const resultado = await iniciarSesion(formData.email, formData.password);
      if (resultado.success) {
        toast.success('¡Bienvenido de vuelta!');
        navigate('/dashboard');
      } else {
        toast.error(resultado.error || 'Error al iniciar sesión');
      }
    } catch (err) {
      toast.error('Error de conexión');
    } finally {
      setCargando(false);
    }
  };

  const handleDemo = async () => {
    setCargando(true);
    try {
      const resultado = await iniciarSesion('demo@finanzas.com', 'demo123');
      if (resultado.success) {
        toast.success('¡Ingresaste con la cuenta demo!');
        navigate('/dashboard');
      } else {
        toast.error('Error al acceder a la cuenta demo');
      }
    } catch (err) {
      toast.error('Error de conexión');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <motion.div className="auth-card card" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
              <div className="auth-header">
                <h2 className="mb-0">
                  <LogIn className="me-2" size={24} />
                  Iniciar Sesión
                </h2>
                <p className="mb-0 mt-2 opacity-75">Accede a tu cuenta FinanzasPro</p>
              </div>

              <div className="auth-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo Electrónico</label>
                    <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="tu@email.com"/>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <div className="input-group">
                      <input type={mostrarPassword ? 'text' : 'password'} className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required placeholder="Tu contraseña" />
                      <button type="button" className="btn btn-outline-secondary" onClick={() => setMostrarPassword(!mostrarPassword)}>
                        {mostrarPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <motion.button type="submit" className="btn btn-primary w-100 mb-3" disabled={cargando} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    {cargando ? (<><span className="spinner-border spinner-border-sm me-2" role="status"></span> Iniciando sesión...</>) : 'Iniciar Sesión'}
                  </motion.button>

                  <div className="text-center mb-3"><span className="text-muted">o</span></div>

                  <motion.button type="button" className="btn btn-outline-primary w-100 mb-3" onClick={handleDemo} disabled={cargando} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    Probar Cuenta Demo
                  </motion.button>
                </form>

                <div className="text-center">
                  <p className="text-muted mb-0">¿No tienes cuenta? <Link to="/register" className="text-primary text-decoration-none">Regístrate aquí</Link></p>
                </div>

                <div className="text-center mt-3"><Link to="/" className="text-muted text-decoration-none">← Volver al inicio</Link></div>
              </div>
            </motion.div>

            <motion.div className="card mt-4 bg-light border-0" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}>
              <div className="card-body text-center">
                <h6 className="card-title text-primary">💡 Cuenta Demo</h6>
                <p className="card-text small text-muted mb-2">Prueba la aplicación sin necesidad de registro:</p>
                <p className="card-text small"><strong>Email:</strong> demo@finanzas.com<br /><strong>Contraseña:</strong> demo123</p>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default IniciarSesion;
