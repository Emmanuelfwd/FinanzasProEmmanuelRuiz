import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProveedorAutenticacion } from './contexts/AuthContext';
import { ProveedorFinanzas } from './contexts/FinanceContext';
import { RutaProtegida } from './components/ProtectedRoute';
import { Toaster } from 'sonner';

// Páginas (default exports)
import PaginaInicio from './pages/LandingPage';
import SobreNosotros from './pages/AboutUs';
import IniciarSesion from './pages/Login';
import Registrarse from './pages/Register';
import Panel from './pages/Dashboard';

// Estilos
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './styles/custom.css';

function App() {
  return (
    <div className="App">
      <ProveedorAutenticacion>
        <ProveedorFinanzas>
          <Router>
            <Routes>
              <Route path="/" element={<PaginaInicio />} />
              <Route path="/about" element={<SobreNosotros />} />
              <Route path="/login" element={<IniciarSesion />} />
              <Route path="/register" element={<Registrarse />} />
              <Route
                path="/dashboard/*"
                element={
                  <RutaProtegida>
                    <Panel />
                  </RutaProtegida>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
          <Toaster position="top-right" />
        </ProveedorFinanzas>
      </ProveedorAutenticacion>
    </div>
  );
}

export default App;