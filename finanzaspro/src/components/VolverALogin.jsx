import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const VolverALogin = () => {
  return (
    <motion.div
      className="position-fixed bottom-4 end-4"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.5 }}
      style={{ zIndex: 1050 }}
    >
      <Link to="/login" className="btn btn-warning btn-lg shadow-lg">
        Volver al Login
      </Link>
    </motion.div>
  );
};

export default VolverALogin;
