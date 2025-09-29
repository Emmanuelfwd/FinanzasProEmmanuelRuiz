import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TrendingUp, PieChart, Shield, Smartphone } from "lucide-react";
import Footer from "../components/Footer";

const LandingPage = () => {
  const features = [
    {
      icon: <TrendingUp size={48} className="text-primary" />,
      title: "Seguimiento de Gastos",
      description: "Monitorea tus gastos en tiempo real y mantén el control de tu presupuesto."
    },
    {
      icon: <PieChart size={48} className="text-success" />,
      title: "Análisis Visual",
      description: "Visualiza tus datos financieros con gráficos interactivos y fáciles de entender."
    },
    {
      icon: <Shield size={48} className="text-warning" />,
      title: "Seguro y Confiable",
      description: "Tus datos están protegidos con las mejores prácticas de seguridad."
    },
    {
      icon: <Smartphone size={48} className="text-info" />,
      title: "Diseño Responsivo",
      description: "Accede a tu información desde cualquier dispositivo, en cualquier momento."
    }
  ];

  return (
    <div className="landing-page">
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            FinanzasPro
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">Acerca de</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Iniciar Sesión</Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-outline-light ms-2" to="/register">
                  Registrarse
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <motion.section
        className="hero-section text-white text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container py-5">
          <motion.h1
            className="hero-title fw-bold mb-3"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Controla tus <span className="text-warning">Finanzas</span> como un Pro
          </motion.h1>
          <motion.p
            className="hero-subtitle lead mb-4"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Mantén un seguimiento completo de tus ingresos y gastos. Visualiza tu progreso financiero y toma decisiones inteligentes.
          </motion.p>
          <motion.div
            className="d-flex gap-3 justify-content-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Link to="/register" className="btn btn-warning btn-lg px-4">
              Comenzar Gratis
            </Link>
            <Link to="/about" className="btn btn-outline-light btn-lg px-4">
              Saber Más
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* FEATURES */}
      <section className="py-5 bg-light">
        <div className="container">
          <motion.div
            className="text-center mb-5"
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="fw-bold text-primary mb-3">¿Por qué elegir FinanzasPro?</h2>
            <p className="lead text-muted">Herramientas diseñadas para simplificar tu gestión financiera</p>
          </motion.div>
          <div className="row g-4">
            {features.map((f, i) => (
              <div key={i} className="col-md-6 col-lg-3">
                <motion.div
                  className="card h-100 text-center p-4 shadow-sm feature-card"
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="mb-3">{f.icon}</div>
                  <h5 className="fw-bold">{f.title}</h5>
                  <p className="text-muted">{f.description}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <motion.section
        className="py-5 bg-primary text-white text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container">
          <h2 className="fw-bold mb-3">¿Listo para tomar control de tus finanzas?</h2>
          <p className="lead mb-4">
            Únete a miles de usuarios que ya gestionan sus finanzas de manera inteligente.
          </p>
          <Link to="/register" className="btn btn-warning btn-lg px-5">
            Empezar Ahora - Es Gratis
          </Link>
        </div>
      </motion.section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default LandingPage;
