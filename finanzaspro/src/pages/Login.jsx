import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validarLogin } from "../services/Services";
import { toast } from "sonner";

const IniciarSesion = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    try {
      const usuario = await validarLogin(email, password);
      if (usuario) {
        // Guardamos usuario activo en localStorage
        localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
        toast.success("Inicio de sesión correcto");
        navigate("/dashboard");
      } else {
        toast.error("Credenciales incorrectas");
      }
    } catch (err) {
      toast.error("Error de conexión");
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h3 className="mb-3">Iniciar Sesión</h3>
          <form onSubmit={handleSubmit}>
            <input type="email" className="form-control mb-3" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" className="form-control mb-3" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button className="btn btn-primary w-100" type="submit" disabled={cargando}>{cargando ? "Ingresando..." : "Entrar"}</button>
          </form>
          <p className="mt-3 small">¿No tienes cuenta? <Link to="/register">Regístrate</Link></p>
        </div>
      </div>
    </div>
  );
};

export default IniciarSesion;