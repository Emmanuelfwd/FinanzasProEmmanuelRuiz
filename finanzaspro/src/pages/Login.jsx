import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { validarLogin } from "../services/Services";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // usar la función del servicio que ya existe
      const usuario = await validarLogin(email, password);
      if (usuario) {
        localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
        toast.success(`Bienvenido, ${usuario.nombre}`);
        navigate("/dashboard");
      } else {
        toast.error("Credenciales incorrectas");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <motion.div
        className="card auth-card"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="auth-header text-center">
          <LogIn size={40} className="mb-2" />
          <h3 className="mb-0">Iniciar Sesión</h3>
          <p className="small text-white-50 mb-0">Accede a tu cuenta de FinanzasPro</p>
        </div>

        <div className="auth-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Correo</label>
              <input
                type="email"
                className="form-control"
                placeholder="tu@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="●●●●●●"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label="Mostrar contraseña"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              className="btn btn-primary w-100 mt-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
            >
              {loading ? "Ingresando..." : "Entrar"}
            </motion.button>
          </form>

          <div className="text-center mt-3 small">
            ¿No tienes cuenta?{" "}
            <Link to="/register" className="text-primary fw-bold">
              Regístrate
            </Link>
          </div>

          <div className="text-center mt-2">
            <Link to="/" className="text-muted small">
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
