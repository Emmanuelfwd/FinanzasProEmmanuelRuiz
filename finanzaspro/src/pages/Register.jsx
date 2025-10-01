import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { UserPlus, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { getUsuarios, registrarUsuario } from "../services/Services";

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const usuarios = await getUsuarios();
      const existe = usuarios.find((u) => u.email === email);
      if (existe) {
        toast.error("Este correo ya está registrado");
        setLoading(false);
        return;
      }

      const nuevoUsuario = {
        id: crypto.randomUUID(),
        nombre,
        email,
        password,
        userType: "normal"
      };

      await registrarUsuario(nuevoUsuario);
      toast.success("Usuario registrado. Inicia sesión.");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Error al registrar");
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
          <UserPlus size={40} className="mb-2" />
          <h3 className="mb-0">Crear Cuenta</h3>
          <p className="small text-white-50 mb-0">Empieza a controlar tus finanzas</p>
        </div>

        <div className="auth-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre completo</label>
              <input
                type="text"
                className="form-control"
                placeholder="Tu nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Correo</label>
              <input
                type="email"
                className="form-control"
                placeholder="tu@correo.com"
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
                  placeholder="Mínimo 6 caracteres"
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
              {loading ? "Registrando..." : "Registrarse"}
            </motion.button>
          </form>

          <p className="text-center mt-3 small mb-0">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="text-primary fw-bold">
              Inicia sesión
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
