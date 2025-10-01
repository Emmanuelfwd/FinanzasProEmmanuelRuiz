// src/App.jsx
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routing from "./Routes/Routing";
import 'bootstrap/dist/css/bootstrap.min.css';  
import "./app.css"
import "../src/styles/custom.css"


function App() {
  return (
    <Router>
      <Routing />
    </Router>
  );
}

export default App;
