import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h5>FinanzasPro</h5>
            <p className="text-muted">Tu aliado para mantener un control completo de tus finanzas personales.</p>
          </div>
          <div className="col-md-4 mb-4">
            <h6>Enlaces</h6>
            <ul className="footer-links">
              <li><a href="/">Inicio</a></li>
              <li><a href="/about">Acerca de</a></li>
              <li><a href="/login">Iniciar Sesión</a></li>
            </ul>
          </div>
          <div className="col-md-4 mb-4">
            <h6>Contacto</h6>
            <ul className="footer-links">
              <li>Email: info@finanzaspro.com</li>
              <li>Teléfono: +506 2222-3333</li>
              <li>Costa Rica</li>
            </ul>
          </div>
        </div>
        <hr className="my-4" />
        <div className="row align-items-center">
          <div className="col-md-6">
            <small className="text-muted">© 2025 FinanzasPro. Todos los derechos reservados.</small>
          </div>
          <div className="col-md-6 text-md-end">
            <small className="text-muted">Hecho con ❤️ en Costa Rica</small>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
