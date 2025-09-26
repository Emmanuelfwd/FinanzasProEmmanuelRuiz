import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";

const AcercaDe = () => {
  const cardAnim = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.18, duration: 0.6 } })
  };

  const tarjetas = [
    { titulo: "Nuestra Historia", texto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    { titulo: "Nuestra Misión", texto: "En FinanzasPro ayudamos a las personas a tomar el control de sus finanzas personales de manera fácil y segura." },
    { titulo: "Nuestra Visión", texto: "Ser la aplicación más confiable para el manejo de finanzas personales en Latinoamérica." },
    { titulo: "Nuestros Valores", texto: "Actuamos con ética, transparencia y responsabilidad, siempre enfocados en mejorar la vida de nuestros usuarios." }
  ];

  return (
    <div className="container py-5">
      <div className="mb-4"><Link to="/" className="btn btn-outline-secondary">← Volver</Link></div>
      <h2 className="text-center mb-5">Acerca de Nosotros</h2>

      <div className="row g-4 mb-5">
        {tarjetas.map((card, i) => (
          <div className="col-md-6" key={i}>
            <motion.div
              className="card h-100 shadow-sm p-3"
              custom={i}
              variants={cardAnim}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.04, boxShadow: "0 10px 28px rgba(0,0,0,0.12)" }}
            >
              <h5 className="card-title">{card.titulo}</h5>
              <p className="card-text text-muted">{card.texto}</p>
            </motion.div>
          </div>
        ))}
      </div>

      <motion.div className="card shadow-sm mb-5" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
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
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} type="submit" className="btn btn-dark">Enviar Mensaje</motion.button>
          </form>
        </div>
      </motion.div>

      <div className="row g-4">
        <div className="col-md-6">
          <motion.div className="card shadow-sm p-3 h-100" initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h5>Información de Contacto</h5>
            <p className="mb-1"><Mail size={16} className="me-2" /> soporte@finanzaspro.com</p>
            <p className="mb-1"><Phone size={16} className="me-2" /> +506 7890 1234</p>
            <p><MapPin size={16} className="me-2" /> San José, Costa Rica</p>
          </motion.div>
        </div>

        <div className="col-md-6">
          <motion.div className="card shadow-sm p-3 h-100 text-center" initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h5>Síguenos en Redes Sociales</h5>
            <div className="d-flex justify-content-center gap-3 mt-3">
              <motion.a whileHover={{ scale: 1.15 }} href="#" className="btn btn-outline-dark rounded-circle p-2"><Facebook /></motion.a>
              <motion.a whileHover={{ scale: 1.15 }} href="#" className="btn btn-outline-dark rounded-circle p-2"><Twitter /></motion.a>
              <motion.a whileHover={{ scale: 1.15 }} href="#" className="btn btn-outline-dark rounded-circle p-2"><Instagram /></motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AcercaDe;
