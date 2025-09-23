import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, PieChart, Shield, Smartphone } from 'lucide-react';
import Footer from '../components/Footer';

const PaginaInicio = () => {
  const features = [
    {
      icon: <TrendingUp size={48} />,
      title: 'Seguimiento de Gastos',
      description: 'Monitorea tus gastos en tiempo real y mantén el control de tu presupuesto.'
    },
    {
      icon: <PieChart size={48} />,
      title: 'Análisis Visual',
      description: 'Visualiza tus datos financieros con gráficos interactivos y fáciles de entender.'
    },
    {
      icon: <Shield size={48} />,
      title: 'Seguro y Confiable',
      description: 'Tus datos están protegidos con las mejores prácticas de seguridad.'
    },
    {
      icon: <Smartphone size={48} />,
      title: 'Diseño Responsivo',
      description: 'Accede a tu información desde cualquier dispositivo.'
    }
  ];

  return (
    <div className="landing-page">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">FinanzasPro</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><Link className="nav-link" to="/">Inicio</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/about">Acerca de</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/login">Iniciar Sesión</Link></li>
              <li className="nav-item"><Link className="btn btn-outline-light ms-2" to="/register">Registrarse</Link></li>
            </ul>
          </div>
        </div>
      </nav>

      <motion.section
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{ paddingTop: '6rem' }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <motion.div className="hero-content" initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
                <h1 className="hero-title">Controla tus <span className="text-warning">Finanzas</span> como un Pro</h1>
                <p className="hero-subtitle">Mantén un seguimiento completo de tus ingresos y gastos. Visualiza tu progreso financiero y toma decisiones inteligentes.</p>
                <div className="d-flex gap-3 justify-content-center">
                  <Link to="/register" className="btn btn-warning btn-lg px-4">Comenzar Gratis</Link>
                  <Link to="/about" className="btn btn-outline-light btn-lg px-4">Saber Más</Link>
                </div>
              </motion.div>
            </div>

            <div className="col-lg-6">
              <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }} className="text-center">
                <div className="hero-image-placeholder bg-white bg-opacity-10 rounded-3 p-5">
                  <TrendingUp size={120} className="text-warning mb-3" />
                  <h4>Dashboard Interactivo</h4>
                  <p className="text-white-50">Visualiza tus datos financieros de manera clara y comprensible</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      <section className="py-5 bg-light">
        <div className="container">
          <motion.div className="text-center mb-5" initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="display-5 fw-bold text-primary mb-3">¿Por qué elegir FinanzasPro?</h2>
            <p className="lead text-muted">Herramientas diseñadas para simplificar tu gestión financiera</p>
          </motion.div>

          <div className="row g-4">
            {features.map((f, i) => (
              <div key={i} className="col-md-6 col-lg-3">
                <motion.div className="feature-card card h-100 text-center p-4" initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.1, duration: 0.6 }} viewport={{ once: true }} whileHover={{ scale: 1.05 }}>
                  <div className="text-primary mb-3">{f.icon}</div>
                  <h5 className="card-title">{f.title}</h5>
                  <p className="card-text text-muted">{f.description}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <motion.section className="py-5 bg-primary text-white" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
        <div className="container text-center">
          <h2 className="display-6 fw-bold mb-3">¿Listo para tomar control de tus finanzas?</h2>
          <p className="lead mb-4">Únete a miles de usuarios que ya están gestionando sus finanzas de manera inteligente.</p>
          <Link to="/register" className="btn btn-warning btn-lg px-5">Empezar Ahora - Es Gratis</Link>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default PaginaInicio;
