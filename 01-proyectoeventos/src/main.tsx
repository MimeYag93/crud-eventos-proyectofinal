import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";             // tus estilos Tailwind
import "leaflet/dist/leaflet.css"; // los estilos de Leaflet

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);