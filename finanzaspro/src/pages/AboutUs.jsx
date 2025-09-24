import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";

const AcercaDe = () => {
  // Animación base
  const cardAnim = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 }
    })
  };

  return (
    <div className="container py-5">
      {/* Botón volver */}
      <div className="mb-4">
        <Link to="/" className="btn btn-outline-secondary">
          ← Volver
        </Link>
      </div>

      <h2 className="text-center mb-5">Acerca de Nosotros</h2>

      {/* Tarjetas (2x2 en pantallas medianas, 1 en móvil) */}
      <div className="row g-4 mb-5">
        {[
          { titulo: "Nuestra Historia", texto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
          { titulo: "Nuestra Misión", texto: "En FinanzasPro ayudamos a las personas a tomar el control de sus finanzas personales de manera fácil y segura." },
          { titulo: "Nuestra Visión", texto: "Ser la aplicación más confiable para el manejo de finanzas personales en Latinoamérica." },
          { titulo: "Nuestros Valores", texto: "Actuamos con ética, transparencia y responsabilidad, siempre enfocados en mejorar la vida de nuestros usuarios." }
        ].map((card, i) => (
          <div className="col-md-6" key={i}>
            <motion.div
              className="card h-100 shadow-sm p-3"
              custom={i}
              variants={cardAnim}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(0,0,0,0.2)" }}
            >
              <h5 className="card-title">{card.titulo}</h5>
              <p className="card-text text-muted">{card.texto}</p>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Formulario */}
      <motion.div
        className="card shadow-sm mb-5"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <div className="card-body">
          <h4 className="mb-4">Formulario de Contacto</h4>
          <form>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Nombre Completo</label>
                <input type="text" className="form-control" placeholder="Tu nombre..." />
              </div>
              <div className="col-md-6">
                <label className="form-label">Correo Electrónico</label>
                <input type="email" className="form-control" placeholder="tucorreo@email.com" />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Mensaje</label>
              <textarea className="form-control" rows="4" placeholder="Escribe tu mensaje aquí..."></textarea>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="btn btn-dark"
            >
              Enviar Mensaje
            </motion.button>
          </form>
        </div>
      </motion.div>

      {/* Info y redes */}
      <div className="row g-4">
        <div className="col-md-6">
          <motion.div
            className="card shadow-sm p-3 h-100"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h5>Información de Contacto</h5>
            <p><Mail size={18} className="me-2" /> soporte@finanzaspro.com</p>
            <p><Phone size={18} className="me-2" /> +506 7890 1234</p>
            <p><MapPin size={18} className="me-2" /> San José, Costa Rica</p>
          </motion.div>
        </div>

        <div className="col-md-6">
          <motion.div
            className="card shadow-sm p-3 h-100 text-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h5>Síguenos en Redes Sociales</h5>
            <div className="d-flex justify-content-center gap-3 mt-3">
              <motion.a whileHover={{ scale: 1.2 }} href="#" className="btn btn-outline-dark rounded-circle">
                <Facebook />
              </motion.a>
              <motion.a whileHover={{ scale: 1.2 }} href="#" className="btn btn-outline-dark rounded-circle">
                <Twitter />
              </motion.a>
              <motion.a whileHover={{ scale: 1.2 }} href="#" className="btn btn-outline-dark rounded-circle">
                <Instagram />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AcercaDe;
