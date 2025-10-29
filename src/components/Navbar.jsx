import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { id: "inicio", label: "Inicio", href: "/" },
    { id: "nosotros", label: "Nosotros", href: "/nosotros" },
    { id: "planes", label: "Planes", href: "/planes" },
    { id: "documentos", label: "Documentos", href: "/documentos" },
  ];

  const handleNavClick = (item) => {
    setIsMenuOpen(false);

    if (item.href === "/") {
      // Si es Inicio y estamos en otra página, navegar a home
      if (location.pathname !== "/") {
        navigate("/");
      } else {
        // Si ya estamos en home, scroll al top
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else if (
      location.pathname === "/" &&
      (item.id === "nosotros" || item.id === "planes")
    ) {
      // Scroll suave a la sección en la página principal
      const element = document.getElementById(item.id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Navegar a otras páginas
      navigate(item.href);
    }
  };

  return (
    <nav className="bg-white fixed w-full top-0 z-50 py-4 shadow-lg border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="/images/logo.png"
              alt="Logo Red Nueva Conexión"
              className="h-12 w-auto transform hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`relative px-6 py-3 font-semibold transition-all duration-500 group ${
                  isActiveLink(item.href)
                    ? "text-orange-600"
                    : "text-gray-700 hover:text-orange-500"
                }`}
              >
                <span className="relative z-10">{item.label}</span>

                {/* Efecto hover background */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-500 opacity-0 group-hover:opacity-100"></div>

                {/* Efecto borde animado */}
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-600 transform -translate-x-1/2 transition-all duration-500 group-hover:w-3/4"></div>

                {/* Punto activo */}
                {isActiveLink(item.href) && (
                  <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-orange-500 rounded-full transform -translate-x-1/2 translate-y-1 animate-pulse"></div>
                )}
              </button>
            ))}
            {/* Botón Contactar - Destacado */}

            <a
              href="https://api.whatsapp.com/send?phone=59343755230&text=Hola%20necesito%20más%20información%20sobre%20los%20planes"
              target="_blank"
              rel="noopener noreferrer"
              className="relative px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl transition-all duration-500 hover:from-orange-600 hover:to-orange-700 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/30 group overflow-hidden"
            >
              {/* Efecto de brillo */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              <span className="relative z-10 flex items-center space-x-2">
                <FaWhatsapp className="w-5 h-5 group-hover:animate-bounce" />
                <span>Contactar</span>
              </span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white p-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="relative w-6 h-6">
              <span
                className={`absolute left-0 w-6 h-0.5 bg-white transition-all duration-300 ${
                  isMenuOpen ? "top-3 rotate-45" : "top-2"
                }`}
              ></span>
              <span
                className={`absolute left-0 w-6 h-0.5 bg-white transition-all duration-300 ${
                  isMenuOpen ? "top-3 -rotate-45" : "top-4"
                }`}
              ></span>
              <span
                className={`absolute left-0 w-6 h-0.5 bg-white transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : "top-6"
                }`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-500 overflow-hidden ${
            isMenuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white rounded-2xl p-6 border border-orange-200 shadow-2xl">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`px-4 py-4 font-semibold rounded-xl transition-all duration-300 border-l-4 text-left ${
                    isActiveLink(item.href)
                      ? "bg-orange-50 text-orange-600 border-orange-500"
                      : "text-gray-700 hover:bg-orange-50 hover:text-orange-500 border-transparent hover:border-orange-300"
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <a
                href="https://api.whatsapp.com/send?phone=59343755230&text=Hola%20necesito%20más%20información%20sobre%20los%20planes"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 text-center flex items-center justify-center space-x-2 mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaWhatsapp className="w-5 h-5" />
                <span>Contactar por WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
