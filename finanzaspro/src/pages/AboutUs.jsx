import React from "react";
import { motion } from "framer-motion";
import VolverALogin from "../components/VolverALogin";

const SobreNosotros = () => {
  return (
    
    <div className="container py-5">
         <VolverALogin />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-5"
      >
        <h1 className="display-4">Acerca de FinanzasPro</h1>
        <p className="lead text-muted">
          Nuestro objetivo es ayudarte a tomar el control de tus finanzas de una manera simple y clara.
        </p>
      </motion.div>

      <div className="row">
        <div className="col-md-4">
          <motion.div
            className="card shadow-sm h-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="card-body">
              <h5 className="card-title">📊 Control Financiero</h5>
              <p className="card-text">
                Monitorea tus ingresos y gastos en tiempo real para mantener un balance saludable.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="col-md-4">
          <motion.div
            className="card shadow-sm h-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="card-body">
              <h5 className="card-title">💡 Simplicidad</h5>
              <p className="card-text">
                Una interfaz intuitiva y amigable para que cualquier persona pueda usarla sin complicaciones.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="col-md-4">
          <motion.div
            className="card shadow-sm h-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="card-body">
              <h5 className="card-title">🔒 Seguridad</h5>
              <p className="card-text">
                Tus datos permanecen seguros en tu navegador; solo tú tienes acceso a ellos.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
     
    </div>
    
  );
  
};

export default SobreNosotros;
