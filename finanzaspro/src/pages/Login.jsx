import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { validarLogin } from "../services/Services";
import { toast } from "sonner";

const IniciarSesion = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    try {
      const usuario = await validarLogin(email, password);
      if (usuario) {
        localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
        toast.success("¡Bienvenido de vuelta!");
        navigate("/dashboard");
      } else {
        toast.error("Credenciales incorrectas");
      }
    } catch (error) {
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
              className="auth-card card shadow-sm"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="auth-header text-center p-3 border-bottom">
                <h2 className="mb-0 fw-bold text-primary">
                  <LogIn className="me-2" size={24} />
                  Iniciar Sesión
                </h2>
                <p className="text-muted small mb-0 mt-1">
                  Accede a tu cuenta FinanzasPro
                </p>
              </div>

              <div className="auth-body card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Correo Electrónico</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="Tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={cargando}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {cargando ? "Ingresando..." : "Entrar"}
                  </motion.button>
                </form>

                <div className="text-center mt-3 small">
                  ¿No tienes cuenta?{" "}
                  <Link to="/register" className="text-primary text-decoration-none">
                    Regístrate
                  </Link>
                </div>

                <div className="text-center mt-2">
                  <Link to="/" className="text-muted small text-decoration-none">
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

export default IniciarSesion;