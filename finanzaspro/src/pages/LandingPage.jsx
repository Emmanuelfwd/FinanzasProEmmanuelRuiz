import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LandingPage = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { delay, duration: 0.6 } })
  };

  return (
    <div className="landing-page-root">
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom py-2 landing-navbar">
        <div className="container">
          <div className="d-flex align-items-center w-100">
            <div className="navbar-left">
              <small className="text-muted">Financial Dashboard Mockup</small>
            </div>

            <div className="mx-auto text-center">
              <Link to="/" className="navbar-brand fw-bold mb-0 landing-brand">FinanzasApp</Link>
            </div>

            <div className="ms-auto d-flex gap-2 align-items-center">
              <Link to="/about" className="btn btn-link text-dark small">Acerca de</Link>
              <Link to="/login" className="btn btn-outline-dark btn-sm">Iniciar Sesión</Link>
            </div>
          </div>
        </div>
      </nav>

      <header className="hero-section">
        <div className="container">
          <motion.div className="hero-inner text-center" initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <motion.h1 className="hero-title mb-3" initial={{ scale: 0.98 }} animate={{ scale: 1 }} transition={{ duration: 0.6 }}>
              Control financiero simple y efectivo
            </motion.h1>

            <motion.p className="hero-subtitle text-muted mb-4" custom={0.1} variants={fadeUp}>
              Lleva el control de tus gastos e ingresos de manera sencilla y ordenada.
            </motion.p>

            <motion.div className="d-flex justify-content-center gap-3" custom={0.2} variants={fadeUp}>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link to="/register" className="btn btn-primary btn-lg rounded-pill px-4 hero-cta">Comenzar Ahora</Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link to="/about" className="btn btn-outline-secondary btn-lg rounded-pill px-4">Saber Más</Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </header>

      <section className="container">
        <motion.div className="mission-card mx-auto mt-n5" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.15}>
          <div className="card shadow-sm p-4 text-center">
            <h4 className="mb-2">Nuestra Misión</h4>
            <p className="text-muted mb-0 fst-italic">
              Crear una app financiera accesible para todos, que te dé un punto de apoyo simple para llevar tu control económico diario.
            </p>
          </div>
        </motion.div>
      </section>

      <section className="container mt-4">
        <motion.div className="contact-card mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.28}>
          <div className="card shadow-sm p-3 text-center">
            <div className="small text-muted mb-1">Contáctanos</div>
            <div className="fw-bold">¿Tienes preguntas o comentarios?</div>
            <a href="mailto:finanzasapp@gmail.com" className="d-block mt-2">finanzasapp@gmail.com</a>
          </div>
        </motion.div>
      </section>

      <footer className="footer mt-5 pt-5 border-top">
        <div className="container">
          <div className="row gy-3">
            <div className="col-md-6">
              <h6 className="fw-bold">About Us</h6>
              <p className="text-muted small mb-0">Somos una aplicación diseñada para ayudarte a organizar tu dinero de forma simple y rápida.</p>
            </div>

            <div className="col-md-6">
              <h6 className="fw-bold">Información</h6>
              <p className="text-muted small mb-0">Tu seguridad financiera es nuestra prioridad. Controla ingresos y gastos sin complicaciones.</p>
            </div>
          </div>

          <div className="text-center small text-muted mt-4">© {new Date().getFullYear()} FinanzasApp. Todos los derechos reservados.</div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
