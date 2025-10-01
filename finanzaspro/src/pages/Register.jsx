import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registrarUsuario } from "../services/Services";
import { toast } from "sonner";

const Registrarse = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    try {
      const nuevo = { id: crypto.randomUUID(), nombre, email, password,userType: "normal" };
      await registrarUsuario(nuevo);
      toast.success("Usuario registrado. Inicia sesión.");
      navigate("/login");
    } catch (error) {
      toast.error("Error al registrar");
      console.error(error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h3 className="mb-3">Crear Cuenta</h3>
          <form onSubmit={handleSubmit}>
            <input className="form-control mb-3" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            <input className="form-control mb-3" type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input className="form-control mb-3" type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button className="btn btn-success w-100" type="submit" disabled={cargando}>{cargando ? "Registrando..." : "Registrarse"}</button>
          </form>
          <p className="mt-3 small">¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Registrarse;
