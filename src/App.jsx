import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Nosotros from "./components/Nosotros";
import Planes from "./components/Planes";
import Documentos from "./components/Documentos";
import Footer from "./components/Footer";
import "./styles/globals.css";

// Componente que maneja el scroll automático
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // Se ejecuta cada vez que cambia la ruta

  return null;
}

// Componente Home que agrupa todo el contenido de la página principal
function Home() {
  return (
    <>
      <Hero />
      <Nosotros />
      <Planes />
    </>
  );
}

// Layout principal que incluye Navbar y Footer en todas las páginas
function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
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
