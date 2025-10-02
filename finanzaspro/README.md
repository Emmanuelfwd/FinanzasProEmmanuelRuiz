# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# 📊 FinanzasPro

**FinanzasPro** es una aplicación web para la **gestión de finanzas personales**, que permite a los usuarios registrar, visualizar y administrar sus ingresos y gastos de manera sencilla e intuitiva.  

Incluye un **panel de usuario** con gráficas interactivas, historial de transacciones y balance en tiempo real, además de un **panel de administración** para gestionar usuarios y categorías de gastos.

---

## Características principales

- ✅ Registro e inicio de sesión de usuarios (con roles `admin` y `normal`).  
- ✅ Dashboard con:
  - Balance actual (ingresos - gastos).
  - Gráficos de tendencias mensuales.
  - Gastos agrupados por categoría.
  - Historial y últimos gastos.  
- ✅ Administración:
  - CRUD de usuarios.
  - CRUD de tipos de gasto.  
- ✅ Interfaz moderna con **React + Bootstrap + Framer Motion**.  
- ✅ Backend simulado con **JSON-Server**.  

---

##  Tecnologías utilizadas

- [React](https://react.dev/) (con Hooks y React Router).  
- [Bootstrap 5](https://getbootstrap.com/) para estilos responsivos.  
- [Framer Motion](https://www.framer.com/motion/) para animaciones.  
- [Lucide-React](https://lucide.dev/) para íconos.  
- [Recharts](https://recharts.org/) para gráficas.  
- [Sonner](https://sonner.emilkowal.ski/) para notificaciones.  
- [JSON Server](https://github.com/typicode/json-server) como base de datos mock.  

---

##  Estructura del proyecto

finanzaspro/
│── src/
│ ├── components/ # Componentes reutilizables (dashboard, admin, auth, etc.)
│ ├── pages/ # Páginas principales (Login, Register, Dashboard, etc.)
│ ├── services/ # Servicios (usuarios, transacciones, gastos tipo, etc.)
│ ├── styles/ # Estilos personalizados (custom.css)
│ ├── App.jsx # Configuración principal
│ ├── main.jsx # Punto de entrada
│ └── Routes/ # Rutas protegidas y públicas
│
│── db.json # Base de datos mock para JSON-Server
│── package.json

## Instalación y configuración

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tuusuario/finanzaspro.git
   cd finanzaspro

2. **Instalar dependencias**

npm install

3. **Levantar el backend (JSON Server)**

npx json-server --watch db.json --port 3001

4. **Levantar la aplicación**

npm run dev

**Usuarios de prueba (db.json)**

**Admin**

Email: ruizemmanuel78@gmail.com

Password: 2

**Usuario normal**

Email: pedro@pe.com

Password: 2