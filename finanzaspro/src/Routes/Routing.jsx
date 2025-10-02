import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import AdminDashboard from "../pages/AdminDashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import LandingPage from "../pages/LandingPage";
import AcercaDe from "../pages/AboutUs";
import '../styles/custom.css';

const DashboardWrapper = () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
  if (!usuario) return <Navigate to="/login" />;
  return usuario.userType === "admin" ? <AdminDashboard /> : <Dashboard />;
};

const Routing = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/about" element={<AcercaDe />} />
    <Route path="/register" element={<Register />} />
    <Route path="/dashboard" element={<DashboardWrapper />} />
    <Route path="/admin" element={<DashboardWrapper />} />
  </Routes>
);

export default Routing;
