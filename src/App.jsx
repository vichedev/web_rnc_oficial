import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Nosotros from "./components/Nosotros";
import Planes from "./components/Planes";
import Documentos from "./components/Documentos";
import Footer from "./components/Footer";
import CookieConsent from "./components/CookieConsent";
import "./styles/globals.css";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "./lib/gsap";

// Componente que maneja el scroll automático
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    // Recalcular posiciones de las animaciones de scroll en la nueva página
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]); // Se ejecuta cada vez que cambia la ruta

  return null;
}

// Componente Home que agrupa todo el contenido de la página principal
function Home() {
  return (
    <>
      <Hero />
      <Nosotros overlap />
      <Planes />
    </>
  );
}

// Layout principal que incluye Navbar y Footer en todas las páginas
function MainLayout({ children }) {
  const mainRef = useRef(null);

  // Transición suave al entrar a cada página (solo opacidad para no
  // afectar elementos fijos ni el parallax)
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.fromTo(mainRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power2.out", clearProps: "opacity" });
  });

  return (
    <>
      <Navbar />
      <main ref={mainRef}>{children}</main>
      <Footer />
      <CookieConsent />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <ScrollToTop /> {/* Componente que maneja el scroll */}
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            }
          />
          <Route
            path="/nosotros"
            element={
              <MainLayout>
                <Nosotros />
              </MainLayout>
            }
          />
          <Route
            path="/planes"
            element={
              <MainLayout>
                <Planes />
              </MainLayout>
            }
          />
          <Route
            path="/documentos"
            element={
              <MainLayout>
                <Documentos />
              </MainLayout>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
