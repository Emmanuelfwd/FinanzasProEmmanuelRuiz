import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { useAutenticacion } from "../contexts/AuthContext";
import { toast } from "sonner";

const Registrarse = () => {
  const [formData, setFormData] = useState({ nombre: "", email: "", password: "" });
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [cargando, setCargando] = useState(false);

  const { registrar } = useAutenticacion();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    try {
      const resultado = await registrar({
        name: formData.nombre,
        email: formData.email,
        password: formData.password,
      });
      if (resultado.success) {
        toast.success("¡Registro exitoso!");
        navigate("/dashboard");
      } else {
        toast.error(resultado.error || "Error al registrarse");
      }
    } catch (err) {
      toast.error("Error de conexión");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <motion.div
              className="auth-card card"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="auth-header">
                <h2 className="mb-0">
                  <UserPlus className="me-2" size={24} />
                  Crear Cuenta
                </h2>
                <p className="mb-0 mt-2 opacity-75">
                  Regístrate para comenzar a usar FinanzasPro
                </p>
              </div>

              <div className="auth-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo Electrónico</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <div className="input-group">
                      <input
                        type={mostrarPassword ? "text" : "password"}
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Tu contraseña"
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setMostrarPassword(!mostrarPassword)}
                      >
                        {mostrarPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    className="btn btn-primary w-100 mb-3"
                    disabled={cargando}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {cargando ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        ></span>
                        Registrando...
                      </>
                    ) : (
                      "Registrarse"
                    )}
                  </motion.button>
                </form>

                <div className="text-center">
                  <p className="text-muted mb-0">
                    ¿Ya tienes cuenta?{" "}
                    <Link
                      to="/login"
                      className="text-primary text-decoration-none"
                    >
                      Inicia sesión aquí
                    </Link>
                  </p>
                </div>

                <div className="text-center mt-3">
                  <Link to="/" className="text-muted text-decoration-none">
                    ← Volver al inicio
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registrarse;
