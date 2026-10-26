import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaWhatsapp,
  FaHome,
  FaUsers,
  FaWifi,
  FaFileAlt,
  FaInstagram,
  FaFacebook,
  FaPhoneAlt,
  FaTimes,
  FaArrowRight,
} from "react-icons/fa";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=59343755230&text=Hola%20necesito%20más%20información%20sobre%20los%20planes";

const navItems = [
  { id: "inicio", label: "Inicio", href: "/", icon: FaHome },
  { id: "nosotros", label: "Nosotros", href: "/nosotros", icon: FaUsers },
  { id: "planes", label: "Planes", href: "/planes", icon: FaWifi },
  { id: "documentos", label: "Documentos", href: "/documentos", icon: FaFileAlt },
];

// Secciones de la página de inicio que se pueden resaltar al hacer scroll
const homeSections = ["nosotros", "planes"];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("inicio");
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  // Estado del scroll: sombra, barra de progreso y sección activa
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 20);
      setProgress(max > 0 ? Math.min(y / max, 1) : 0);

      if (isHome) {
        let current = "inicio";
        for (const id of homeSections) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= 140) current = id;
        }
        setActiveSection(current);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // Cerrar el menú al cambiar de página
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Bloquear scroll del body y cerrar con Escape cuando el menú móvil está abierto
  useEffect(() => {
    if (!isMenuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setIsMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isMenuOpen]);

  const isActive = (item) =>
    isHome ? activeSection === item.id : location.pathname === item.href;

  const handleNavClick = (item) => {
    setIsMenuOpen(false);

    if (item.href === "/") {
      if (!isHome) navigate("/");
      else window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (isHome && homeSections.includes(item.id)) {
      document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(item.href);
    }
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 sm:px-4 pt-3">
        <nav
          aria-label="Navegación principal"
          className={`relative mx-auto max-w-7xl rounded-2xl border transition-all duration-500 ${
            scrolled
              ? "bg-white/85 backdrop-blur-xl border-white/60 shadow-[0_10px_40px_-12px_rgba(249,115,22,0.35)]"
              : "bg-white/95 backdrop-blur-md border-orange-100 shadow-lg"
          }`}
        >
          <div
            className={`flex items-center justify-between px-4 sm:px-6 transition-all duration-500 ${
              scrolled ? "h-16" : "h-[4.5rem]"
            }`}
          >
            {/* Logo */}
            <Link
              to="/"
              onClick={() => isHome && window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex-shrink-0"
              aria-label="Red Nueva Conexión - Inicio"
            >
              <img
                src="/images/logo.png"
                alt="Logo Red Nueva Conexión"
                className={`w-auto transition-all duration-500 hover:scale-105 ${
                  scrolled ? "h-10" : "h-12"
                }`}
              />
            </Link>

            {/* Menú escritorio */}
            <div className="hidden md:flex items-center gap-1 rounded-full bg-orange-50/70 p-1.5 ring-1 ring-orange-100">
              {navItems.map((item) => {
                const active = isActive(item);
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item)}
                    aria-current={active ? "page" : undefined}
                    className={`relative rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-300 ${
                      active ? "text-white" : "text-gray-700 hover:text-orange-600"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 shadow-md shadow-orange-500/30"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Acciones escritorio */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="tel:+59343755230"
                className="hidden lg:flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                  <FaPhoneAlt className="h-3.5 w-3.5" />
                </span>
                04-375-5230
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-500/40"
              >
                <span className="absolute inset-0 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                <span className="relative z-10 flex items-center gap-2">
                  <FaWhatsapp className="h-5 w-5" />
                  Contactar
                </span>
              </a>
            </div>

            {/* Botón menú móvil */}
            <button
              className="md:hidden flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30 transition-transform active:scale-95"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={isMenuOpen}
            >
              <span className="flex flex-col gap-1.5">
                <span className="block h-0.5 w-5 rounded bg-white" />
                <span className="block h-0.5 w-3.5 rounded bg-white self-end" />
                <span className="block h-0.5 w-5 rounded bg-white" />
              </span>
            </button>
          </div>

          {/* Barra de progreso de lectura */}
          <div className="pointer-events-none absolute inset-x-4 bottom-0 h-0.5 overflow-hidden rounded-full">
            <div
              className="h-full origin-left bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400 transition-transform duration-150"
              style={{ transform: `scaleX(${progress})` }}
            />
          </div>
        </nav>
      </header>

      {/* Menú móvil (panel lateral) */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-[60] md:hidden">
            <motion.div
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="Menú de navegación"
              className="absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-white shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
            >
              <div className="flex items-center justify-between border-b border-orange-100 px-6 py-5">
                <img src="/images/logo.png" alt="Red Nueva Conexión" className="h-10 w-auto" />
                <button
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Cerrar menú"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-orange-600 transition-colors hover:bg-orange-100"
                >
                  <FaTimes className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-6">
                <p className="px-3 pb-3 text-xs font-bold uppercase tracking-widest text-gray-400">
                  Menú
                </p>
                <ul className="space-y-2">
                  {navItems.map((item, i) => {
                    const Icon = item.icon;
                    const active = isActive(item);
                    return (
                      <motion.li
                        key={item.id}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.08 + i * 0.06 }}
                      >
                        <button
                          onClick={() => handleNavClick(item)}
                          aria-current={active ? "page" : undefined}
                          className={`group flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 text-left font-semibold transition-all ${
                            active
                              ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25"
                              : "text-gray-700 hover:bg-orange-50"
                          }`}
                        >
                          <span
                            className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                              active ? "bg-white/20" : "bg-orange-100 text-orange-600"
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                          </span>
                          <span className="flex-1">{item.label}</span>
                          <FaArrowRight
                            className={`h-3.5 w-3.5 transition-transform group-hover:translate-x-1 ${
                              active ? "opacity-100" : "opacity-30"
                            }`}
                          />
                        </button>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>

              <div className="space-y-4 border-t border-orange-100 bg-orange-50/50 px-6 py-6">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 py-4 font-bold text-white shadow-lg shadow-orange-500/30 transition-transform active:scale-[0.98]"
                >
                  <FaWhatsapp className="h-5 w-5" />
                  Contactar por WhatsApp
                </a>
                <div className="flex items-center justify-between">
                  <a
                    href="tel:+59343755230"
                    className="flex items-center gap-2 text-sm font-medium text-gray-600"
                  >
                    <FaPhoneAlt className="h-3.5 w-3.5 text-orange-500" />
                    04-375-5230
                  </a>
                  <div className="flex gap-2">
                    <a
                      href="https://www.instagram.com/rednuevaconexion.ec/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-pink-600 shadow-sm ring-1 ring-orange-100"
                    >
                      <FaInstagram className="h-4 w-4" />
                    </a>
                    <a
                      href="https://www.facebook.com/rednuevaconexion"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm ring-1 ring-orange-100"
                    >
                      <FaFacebook className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
