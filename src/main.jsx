// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/globals.css";

// Manejo de errores global
window.addEventListener("error", (e) => {
  console.error("Error global:", e.error);
});

window.addEventListener("unhandledrejection", (e) => {
  console.error("Promise rechazada:", e.reason);
});

try {
  const root = createRoot(document.getElementById("root"));

  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} catch (error) {
  console.error("Error al renderizar la aplicación:", error);
  document.getElementById("root").innerHTML = `
    <div style="padding: 20px; text-align: center; color: white; background: #000;">
      <h1>Error al cargar la aplicación</h1>
      <p>Por favor, recarga la página.</p>
    </div>
  `;
}
