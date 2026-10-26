import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaWhatsapp, FaInstagram, FaFacebookF } from "react-icons/fa";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/gsap";
import Magnetic from "./ui/Magnetic";
import RollText from "./ui/RollText";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=59343755230&text=Hola%20necesito%20más%20información%20sobre%20los%20planes";

const navItems = [
  { id: "inicio", label: "Inicio", href: "/" },
  { id: "nosotros", label: "Nosotros", href: "/nosotros" },
  { id: "planes", label: "Planes", href: "/planes" },
  { id: "documentos", label: "Documentos", href: "/documentos" },
];

// Secciones de la página de inicio que se resaltan al hacer scroll
const homeSections = ["nosotros", "planes"];

// La animación de entrada solo se reproduce en la primera carga
let introPlayed = false;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const headerRef = useRef(null);
  const barRef = useRef(null);
  const menuRef = useRef(null);
  const menuTl = useRef(null);

  // Estado según el scroll: fondo, ocultar/mostrar y sección activa
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      const hero = document.getElementById("inicio");
      setOverDark(isHome && !!hero && hero.getBoundingClientRect().bottom > 80);
      setHidden(y > 300 && y > lastY);
      lastY = y;

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

  // Entrada inicial + barra de progreso de lectura
  useGSAP(
    () => {
      if (!introPlayed && !prefersReducedMotion()) {
        gsap.from("[data-nav-item]", {
          yPercent: -120,
          opacity: 0,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.06,
          delay: 0.2,
        });
      }
      introPlayed = true;

      gsap.fromTo(
        barRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
        }
      );
    },
    { scope: headerRef, dependencies: [location.pathname], revertOnUpdate: true }
  );

  // Ocultar al bajar, mostrar al subir
  useGSAP(
    () => {
      gsap.to(headerRef.current, {
        yPercent: hidden && !isMenuOpen ? -100 : 0,
        duration: 0.6,
        ease: "power3.out",
      });
    },
    { dependencies: [hidden, isMenuOpen] }
  );

  // Línea de tiempo del menú móvil
  useGSAP(
    () => {
      const tl = gsap.timeline({ paused: true });
      tl.set(menuRef.current, { visibility: "visible" })
        .fromTo(
          menuRef.current,
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "expo.inOut" }
        )
        .fromTo(
          "[data-menu-link]",
          { yPercent: 110 },
          { yPercent: 0, duration: 0.9, ease: "expo.out", stagger: 0.06 },
          "-=0.35"
        )
        .fromTo(
          "[data-menu-fade]",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.05 },
          "-=0.6"
        );
      menuTl.current = tl;
    },
    { scope: menuRef }
  );

  useEffect(() => {
    const tl = menuTl.current;
    if (!tl) return;
    if (isMenuOpen) {
      tl.timeScale(1).play();
      document.body.style.overflow = "hidden";
    } else {
      tl.timeScale(1.6).reverse();
      document.body.style.overflow = "";
    }
    const onKey = (e) => e.key === "Escape" && setIsMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMenuOpen]);

  // Cerrar el menú al cambiar de página
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

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

  const light = overDark && !isMenuOpen; // texto claro sobre el parallax

  return (
    <>
      <header ref={headerRef} className="fixed inset-x-0 top-0 z-50">
        <div
          className={`transition-[background-color,border-color,backdrop-filter] duration-500 border-b ${
            light || isMenuOpen
              ? "bg-transparent border-transparent"
              : scrolled || !isHome
                ? "bg-paper/80 backdrop-blur-xl border-line"
                : "bg-paper border-line"
          }`}
        >
          <nav
            aria-label="Navegación principal"
            className="mx-auto flex h-16 md:h-20 max-w-7xl items-center justify-between px-5 md:px-8"
          >
            {/* Logo */}
            <Link
              to="/"
              data-nav-item
              onClick={() => isHome && window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center"
              aria-label="Red Nueva Conexión - Inicio"
            >
              <img src="/images/logo.png" alt="Red Nueva Conexión" className="h-9 md:h-11 w-auto" />
            </Link>

            {/* Enlaces escritorio */}
            <ul className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const active = isActive(item);
                return (
                  <li key={item.id} data-nav-item>
                    <button
                      onClick={() => handleNavClick(item)}
                      aria-current={active ? "page" : undefined}
                      className={`group relative flex items-center gap-2 px-4 py-2 text-[15px] font-medium transition-colors duration-300 ${
                        light
                          ? active ? "text-white" : "text-white/70 hover:text-white"
                          : active ? "text-ink" : "text-stone-500 hover:text-ink"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full bg-accent transition-all duration-500 ${
                          active ? "scale-100 opacity-100" : "scale-0 opacity-0"
                        }`}
                      />
                      <RollText>{item.label}</RollText>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Acciones */}
            <div className="flex items-center gap-3">
              <div data-nav-item className="hidden md:block">
                <Magnetic>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-300 ${
                      light
                        ? "bg-white text-ink hover:bg-accent hover:text-white"
                        : "bg-ink text-white hover:bg-accent"
                    }`}
                  >
                    <FaWhatsapp className="h-4 w-4" />
                    <RollText>Contactar</RollText>
                  </a>
                </Magnetic>
              </div>

              {/* Botón menú móvil */}
              <button
                data-nav-item
                onClick={() => setIsMenuOpen((v) => !v)}
                aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                className={`md:hidden flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300 ${
                  isMenuOpen ? "bg-white" : light ? "bg-white/15 backdrop-blur" : "bg-ink"
                }`}
              >
                <span className="relative block h-3 w-5">
                  <span
                    className={`absolute left-0 h-[1.5px] w-5 transition-all duration-500 ${
                      isMenuOpen ? "top-1.5 rotate-45 bg-ink" : "top-0 bg-white"
                    }`}
                  />
                  <span
                    className={`absolute left-0 h-[1.5px] w-5 transition-all duration-500 ${
                      isMenuOpen ? "top-1.5 -rotate-45 bg-ink" : "top-3 bg-white"
                    }`}
                  />
                </span>
              </button>
            </div>
          </nav>

          {/* Progreso de lectura */}
          <div
            ref={barRef}
            className="h-px w-full origin-left bg-accent"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </header>

      {/* Menú móvil a pantalla completa */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        aria-hidden={!isMenuOpen}
        className="invisible fixed inset-0 z-40 flex flex-col bg-ink px-6 pb-8 pt-24 text-white md:hidden"
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
      >
        <p data-menu-fade className="mb-6 text-xs uppercase tracking-[0.3em] text-stone-500">
          Menú
        </p>
        <ul className="flex-1 space-y-1">
          {navItems.map((item, i) => {
            const active = isActive(item);
            return (
              <li key={item.id} className="overflow-hidden border-b border-white/10">
                <button
                  data-menu-link
                  onClick={() => handleNavClick(item)}
                  tabIndex={isMenuOpen ? 0 : -1}
                  className="flex w-full items-baseline gap-4 py-4 text-left"
                >
                  <span className="font-display text-sm text-stone-500">0{i + 1}</span>
                  <span
                    className={`font-display text-5xl font-semibold tracking-tight ${
                      active ? "text-accent" : "text-white"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="space-y-6">
          <a
            data-menu-fade
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={isMenuOpen ? 0 : -1}
            className="flex items-center justify-between rounded-full bg-accent px-6 py-4 font-semibold"
          >
            Escríbenos por WhatsApp
            <FaWhatsapp className="h-5 w-5" />
          </a>
          <div data-menu-fade className="flex items-center justify-between text-sm text-stone-400">
            <a href="tel:+59343755230" tabIndex={isMenuOpen ? 0 : -1}>
              04-375-5230
            </a>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/rednuevaconexion.ec/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                tabIndex={isMenuOpen ? 0 : -1}
                className="hover:text-white"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/rednuevaconexion"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                tabIndex={isMenuOpen ? 0 : -1}
                className="hover:text-white"
              >
                <FaFacebookF className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
