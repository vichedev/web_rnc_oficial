import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebookF,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaTachometerAlt,
  FaShieldAlt,
  FaHome,
  FaUsers,
  FaWifi,
  FaMapMarkedAlt,
  FaFileAlt,
  FaArrowRight,
} from "react-icons/fa";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/gsap";
import Magnetic from "./ui/Magnetic";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=59343755230&text=Hola%2C%20quiero%20contratar%20internet%20con%20RNC";
const SPEEDTEST_URL = "https://www.speedtest.net/";

const navItems = [
  { id: "inicio", label: "Inicio", href: "/", icon: FaHome },
  { id: "nosotros", label: "Nosotros", href: "/nosotros", icon: FaUsers },
  { id: "planes", label: "Planes", href: "/planes", icon: FaWifi },
  { id: "cobertura", label: "Cobertura", href: "/", section: true, icon: FaMapMarkedAlt },
  { id: "documentos", label: "Documentos", href: "/documentos", icon: FaFileAlt },
];

// Secciones de la página de inicio que se resaltan al hacer scroll
const homeSections = ["nosotros", "planes", "cobertura"];

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
  const linksRef = useRef(null);
  const pillRef = useRef(null);
  const menuRef = useRef(null);
  const menuTl = useRef(null);

  // Estado según el scroll
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      const hero = document.getElementById("inicio");
      setOverDark(isHome && !!hero && hero.getBoundingClientRect().bottom > 90);
      setHidden(y > 400 && y > lastY);
      lastY = y;

      if (isHome) {
        let current = "inicio";
        for (const id of homeSections) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= 160) current = id;
        }
        setActiveSection(current);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const isActive = (item) => {
    if (isHome) return activeSection === item.id;
    return !item.section && location.pathname === item.href;
  };
  const activeId = navItems.find(isActive)?.id;

  // Indicador deslizante bajo el enlace activo
  useLayoutEffect(() => {
    const place = (animate) => {
      const el = linksRef.current?.querySelector(`[data-link="${activeId}"]`);
      const pill = pillRef.current;
      if (!pill) return;
      if (!el) {
        gsap.to(pill, { opacity: 0, duration: 0.3 });
        return;
      }
      // Medir respecto a la barra (offsetLeft falla mientras los enlaces se animan)
      const x = el.getBoundingClientRect().left - linksRef.current.getBoundingClientRect().left;
      gsap.to(pill, {
        x,
        width: el.offsetWidth,
        opacity: 1,
        duration: animate && !prefersReducedMotion() ? 0.55 : 0,
        ease: "expo.out",
        overwrite: true,
      });
    };
    place(true);
    const onResize = () => place(false);
    const ro = new ResizeObserver(onResize);
    if (linksRef.current) ro.observe(linksRef.current);
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(onResize);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [activeId]);

  // Entrada inicial + barra de progreso
  useGSAP(
    () => {
      if (!introPlayed && !prefersReducedMotion()) {
        gsap.from("[data-nav-item]", {
          y: -30,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
          stagger: 0.05,
          delay: 0.2,
        });
      }
      introPlayed = true;
      gsap.fromTo(
        barRef.current,
        { scaleX: 0 },
        { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } }
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

  // Menú móvil
  useGSAP(
    () => {
      const tl = gsap.timeline({ paused: true });
      tl.set(menuRef.current, { visibility: "visible" })
        .fromTo(
          menuRef.current,
          { clipPath: "circle(0% at 100% 0%)" },
          { clipPath: "circle(150% at 100% 0%)", duration: 0.9, ease: "expo.inOut" }
        )
        .fromTo("[data-menu-link]", { yPercent: 110 }, { yPercent: 0, duration: 0.8, ease: "expo.out", stagger: 0.05 }, "-=0.4")
        .fromTo("[data-menu-fade]", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.05 }, "-=0.5");
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

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleNavClick = (item) => {
    setIsMenuOpen(false);
    if (item.id === "inicio") {
      if (!isHome) navigate("/");
      else window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (isHome && homeSections.includes(item.id)) {
      document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (item.section) {
      // Ir al inicio y bajar a la sección
      navigate("/", { state: { scrollTo: item.id } });
      return;
    }
    navigate(item.href);
  };

  const light = overDark && !isMenuOpen;
  const solid = !light && !isMenuOpen;

  return (
    <>
      <header ref={headerRef} className="fixed inset-x-0 top-0 z-50">
        {/* Barra superior informativa */}
        <div
          className={`hidden lg:block overflow-hidden transition-[max-height,opacity] duration-500 ${
            scrolled || isMenuOpen ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
          } ${light ? "bg-navy/40 backdrop-blur-md" : "bg-navy"}`}
        >
          <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-8 text-[12.5px] text-blue-100/80">
            <div className="flex items-center gap-6">
              <a href="tel:+59343755230" className="flex items-center gap-2 transition-colors hover:text-white">
                <FaPhoneAlt className="h-3 w-3 text-accent" /> 04-375-5230
              </a>
              <a href="mailto:info@rednuevaconexion.ec" className="flex items-center gap-2 transition-colors hover:text-white">
                <FaEnvelope className="h-3 w-3 text-accent" /> info@rednuevaconexion.ec
              </a>
              <span className="flex items-center gap-2">
                <FaClock className="h-3 w-3 text-accent" /> Lun–Vie 8:00–18:00 · Sáb 9:00–13:00
              </span>
            </div>
            <div className="flex items-center gap-5">
              <span className="flex items-center gap-2">
                <FaShieldAlt className="h-3 w-3 text-brand-light" /> Regulado por ARCOTEL
              </span>
              <a
                href={SPEEDTEST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-white"
              >
                <FaTachometerAlt className="h-3 w-3 text-accent" /> Test de velocidad
              </a>
              <span className="h-4 w-px bg-white/15" />
              <a href="https://www.instagram.com/rednuevaconexion.ec/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white">
                <FaInstagram className="h-3.5 w-3.5" />
              </a>
              <a href="https://www.facebook.com/rednuevaconexion" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-white">
                <FaFacebookF className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Barra principal */}
        <div
          className={`relative transition-[background-color,box-shadow,border-color] duration-500 border-b ${
            solid
              ? "bg-white/90 backdrop-blur-xl border-stone-200/70 shadow-[0_10px_30px_-15px_rgba(5,15,44,0.25)]"
              : "bg-transparent border-transparent"
          }`}
        >
          <nav
            aria-label="Navegación principal"
            className={`mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8 transition-[height] duration-500 ${
              scrolled ? "h-16" : "h-[4.5rem] md:h-20"
            }`}
          >
            <Link
              to="/"
              data-nav-item
              onClick={() => isHome && window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center"
              aria-label="Red Nueva Conexión - Inicio"
            >
              <img
                src="/images/logo.png"
                alt="Red Nueva Conexión"
                className={`w-auto transition-all duration-500 ${scrolled ? "h-10" : "h-11 md:h-12"}`}
              />
            </Link>

            {/* Enlaces escritorio */}
            <ul
              ref={linksRef}
              className={`relative hidden lg:flex items-center rounded-full p-1.5 transition-colors duration-500 ${
                light ? "bg-white/10 ring-1 ring-white/15 backdrop-blur-md" : "bg-stone-100 ring-1 ring-stone-200"
              }`}
            >
              <span
                ref={pillRef}
                aria-hidden="true"
                className="absolute left-0 top-1.5 bottom-1.5 rounded-full bg-gradient-to-r from-accent to-amber-500 shadow-lg shadow-accent/30"
                style={{ width: 0, opacity: 0 }}
              />
              {navItems.map((item) => {
                const active = isActive(item);
                return (
                  <li key={item.id} data-nav-item>
                    <button
                      data-link={item.id}
                      onClick={() => handleNavClick(item)}
                      aria-current={active ? "page" : undefined}
                      className={`relative z-10 rounded-full px-4 xl:px-5 py-2 text-[14.5px] font-semibold transition-colors duration-300 ${
                        active
                          ? "text-white"
                          : light
                            ? "text-white/80 hover:text-white"
                            : "text-stone-600 hover:text-ink"
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Acciones */}
            <div className="flex items-center gap-2.5">
              <a
                data-nav-item
                href={SPEEDTEST_URL}
                target="_blank"
                rel="noopener noreferrer"
                title="Test de velocidad"
                className={`hidden md:flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors duration-300 ${
                  light
                    ? "border-white/25 text-white hover:bg-white hover:text-ink"
                    : "border-stone-300 text-ink hover:border-brand hover:text-brand"
                }`}
              >
                <FaTachometerAlt className="h-4 w-4" />
                <span className="hidden xl:inline">Test de velocidad</span>
              </a>
              <div data-nav-item className="hidden sm:block">
                <Magnetic>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-accent to-amber-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-accent/30 transition-shadow duration-300 hover:shadow-accent/50"
                  >
                    <span className="absolute inset-0 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                    <FaWhatsapp className="relative h-4 w-4" />
                    <span className="relative">Contratar</span>
                  </a>
                </Magnetic>
              </div>

              <button
                data-nav-item
                onClick={() => setIsMenuOpen((v) => !v)}
                aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                className={`lg:hidden flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300 ${
                  isMenuOpen ? "bg-white" : light ? "bg-white/15 backdrop-blur" : "bg-navy"
                }`}
              >
                <span className="relative block h-3 w-5">
                  <span
                    className={`absolute left-0 h-[2px] w-5 rounded transition-all duration-500 ${
                      isMenuOpen ? "top-1.5 rotate-45 bg-ink" : "top-0 bg-white"
                    }`}
                  />
                  <span
                    className={`absolute left-0 h-[2px] rounded transition-all duration-500 ${
                      isMenuOpen ? "top-1.5 w-5 -rotate-45 bg-ink" : "top-3 w-3.5 bg-white"
                    }`}
                  />
                </span>
              </button>
            </div>
          </nav>

          <div
            ref={barRef}
            className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-accent via-amber-400 to-brand-light"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </header>

      {/* Menú móvil */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        aria-hidden={!isMenuOpen}
        className="invisible fixed inset-0 z-40 flex flex-col overflow-y-auto bg-navy px-6 pb-8 pt-24 text-white lg:hidden"
        style={{ clipPath: "circle(0% at 100% 0%)" }}
      >
        <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-60" />
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent/30 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-brand/40 blur-[100px]" />

        <ul className="relative flex-1 space-y-1">
          {navItems.map((item, i) => {
            const Icon = item.icon;
            const active = isActive(item);
            return (
              <li key={item.id} className="overflow-hidden border-b border-white/10">
                <button
                  data-menu-link
                  onClick={() => handleNavClick(item)}
                  tabIndex={isMenuOpen ? 0 : -1}
                  className="flex w-full items-center gap-4 py-4 text-left"
                >
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                      active ? "bg-gradient-to-br from-accent to-amber-500" : "bg-white/10"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className={`flex-1 font-display text-3xl font-bold ${active ? "text-gradient-brand" : ""}`}>
                    {item.label}
                  </span>
                  <span className="text-xs text-blue-200/50">0{i + 1}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="relative mt-8 space-y-3">
          <a
            data-menu-fade
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={isMenuOpen ? 0 : -1}
            className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-accent to-amber-500 px-6 py-4 font-bold shadow-lg shadow-accent/30"
          >
            <span className="flex items-center gap-3">
              <FaWhatsapp className="h-5 w-5" /> Contratar por WhatsApp
            </span>
            <FaArrowRight className="h-4 w-4" />
          </a>
          <div data-menu-fade className="grid grid-cols-2 gap-3 text-sm">
            <a href="tel:+59343755230" tabIndex={isMenuOpen ? 0 : -1} className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3">
              <FaPhoneAlt className="h-3.5 w-3.5 text-accent" /> Llamar
            </a>
            <a href={SPEEDTEST_URL} target="_blank" rel="noopener noreferrer" tabIndex={isMenuOpen ? 0 : -1} className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3">
              <FaTachometerAlt className="h-3.5 w-3.5 text-accent" /> Test velocidad
            </a>
          </div>
          <div data-menu-fade className="flex items-center justify-between pt-2 text-xs text-blue-100/60">
            <span>Lun–Vie 8:00–18:00 · Sáb 9:00–13:00</span>
            <div className="flex gap-3 text-white">
              <a href="https://www.instagram.com/rednuevaconexion.ec/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" tabIndex={isMenuOpen ? 0 : -1}>
                <FaInstagram className="h-5 w-5" />
              </a>
              <a href="https://www.facebook.com/rednuevaconexion" target="_blank" rel="noopener noreferrer" aria-label="Facebook" tabIndex={isMenuOpen ? 0 : -1}>
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
