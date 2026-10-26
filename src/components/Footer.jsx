import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaArrowRight,
  FaTachometerAlt,
} from "react-icons/fa";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/gsap";
import useReveal from "../hooks/useReveal";
import SplitWords from "./ui/SplitWords";
import Magnetic from "./ui/Magnetic";
import { openCookieSettings } from "../utils/cookies";

const WHATSAPP_URL = "https://wa.me/59343755230";

const columns = [
  {
    title: "Navegación",
    links: [
      { name: "Inicio", to: "/" },
      { name: "Nosotros", to: "/nosotros" },
      { name: "Planes", to: "/planes" },
      { name: "Documentos", to: "/documentos" },
    ],
  },
  {
    title: "Normativas ARCOTEL",
    links: [
      { name: "Ley Orgánica de Telecomunicaciones", href: "/Documents/1ley_organica_de_telecomunicaciones2.pdf" },
      { name: "Reglamento Servicios Telecom", href: "/Documents/3REGLAMENTO-PARA-LA-PRESTACION-DE-SERVICIOS-DE-TELECOMUNICACIONES12.pdf" },
      { name: "Parámetros de Calidad", href: "/Documents/5PARAMETROS DE CALIDAD_GOBRAVCORPSA.pdf" },
      { name: "Calidad de Servicio QoS", href: "/Documents/6qos sva 4.pdf" },
      { name: "Sitio oficial ARCOTEL", href: "https://www.arcotel.gob.ec" },
      { name: "Sitio oficial MINTEL", href: "https://www.telecomunicaciones.gob.ec/" },
    ],
  },
  {
    title: "Zona de clientes",
    links: [
      { name: "Consejos de seguridad", href: "/Documents/13Consejos_de_seguridad 2.pdf" },
      { name: "Control parental", href: "/Documents/14control parental 2.pdf" },
      { name: "Política Internet Segura", href: "/Documents/12política_publica_internet_segura 4.pdf" },
      { name: "Ley de Discapacidades", href: "/Documents/9ley_organica_discapacidades 1.pdf" },
      { name: "Ley Adulto Mayor", href: "/Documents/10LEY ORGANICA DE LAS PERSONAS ADULTOS MAYORES (2) 2.pdf" },
    ],
  },
];

const linkClass =
  "link-underline pb-0.5 text-stone-400 transition-colors duration-300 hover:text-white";

const Footer = () => {
  const scope = useRef(null);
  const brandRef = useRef(null);
  const year = new Date().getFullYear();

  useReveal(scope);

  // La marca gigante sube letra por letra al llegar al final
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        "[data-brand-logo]",
        { yPercent: 40, scale: 0.7, rotate: -6, opacity: 0 },
        {
          yPercent: 0,
          scale: 1,
          rotate: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: brandRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 0.6,
          },
        }
      );
      gsap.fromTo(
        "[data-brand-glow]",
        { scale: 0.4, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: brandRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 0.6,
          },
        }
      );
      gsap.fromTo(
        "[data-brand-letter]",
        { yPercent: 100 },
        {
          yPercent: 0,
          ease: "none",
          stagger: 0.04,
          scrollTrigger: {
            trigger: brandRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 0.6,
          },
        }
      );
    },
    { scope: brandRef }
  );

  return (
    <footer ref={scope} className="bg-ink text-white">
      <div className="mx-auto max-w-7xl px-5 md:px-8 pt-24 md:pt-32">
        {/* Llamada principal */}
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p data-reveal className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-500">
              ¿Tienes preguntas?
            </p>
            <h2
              data-split
              aria-label="Hablemos."
              className="mt-6 font-display text-6xl sm:text-7xl md:text-9xl font-semibold leading-[0.9]"
            >
              <SplitWords text="Hablemos" />
              <span className="split-word" aria-hidden="true">
                <span className="text-accent">.</span>
              </span>
            </h2>
          </div>
          <div data-reveal>
            <Magnetic strength={0.4}>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-36 w-36 md:h-44 md:w-44 flex-col items-center justify-center gap-2 rounded-full bg-accent text-center font-semibold transition-colors duration-500 hover:bg-white hover:text-ink"
              >
                <FaWhatsapp className="h-7 w-7" />
                Escríbenos
              </a>
            </Magnetic>
          </div>
        </div>

        <div data-line className="mt-20 h-px bg-white/10" />

        {/* Columnas */}
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12">
          {columns.map((col, idx) => (
            <div key={col.title} data-reveal className={idx === 0 ? "lg:col-span-2" : "lg:col-span-3"}>
              <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
                {col.title}
              </h3>
              <ul className="space-y-3 text-sm">
                {col.links.map((l) => (
                  <li key={l.name}>
                    {l.to ? (
                      <Link to={l.to} className={linkClass}>
                        {l.name}
                      </Link>
                    ) : (
                      <a href={l.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                        {l.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div data-reveal className="lg:col-span-4">
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
              Contacto
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="tel:+59343755230" className="font-display text-2xl font-semibold tracking-tight hover:text-accent transition-colors">
                  +593 4-375-5230
                </a>
              </li>
              <li>
                <a href="mailto:info@rednuevaconexion.ec" className={linkClass}>
                  info@rednuevaconexion.ec
                </a>
              </li>
              <li className="text-stone-400">Puebloviejo, Ecuador</li>
            </ul>
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-6 text-sm">
              <div>
                <p className="text-stone-500">Lunes a viernes</p>
                <p className="mt-1">8:00 – 18:00</p>
              </div>
              <div>
                <p className="text-stone-500">Sábados</p>
                <p className="mt-1">9:00 – 13:00</p>
              </div>
            </div>
            <a
              href="https://www.speedtest.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-3 rounded-full border border-white/15 px-5 py-2.5 text-sm transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              <FaTachometerAlt className="h-4 w-4" />
              Test de velocidad
              <FaArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="flex flex-col gap-6 border-t border-white/10 py-8 text-xs text-stone-500 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <span>© {year} Red Nueva Conexión</span>
            <span className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-accent" />
              Regulado por ARCOTEL · MINTEL
            </span>
            <button type="button" onClick={openCookieSettings} className="link-underline pb-0.5 hover:text-white transition-colors">
              Preferencias de cookies
            </button>
          </div>
          <div className="flex items-center gap-6">
            <span>
              Desarrollado por <span className="font-semibold tracking-wide text-stone-300">INIGUALITYSOFT</span>
            </span>
            <div className="flex gap-2">
              {[
                { href: "https://www.instagram.com/rednuevaconexion.ec/", label: "Instagram", icon: <FaInstagram className="h-3.5 w-3.5" /> },
                { href: "https://www.facebook.com/rednuevaconexion", label: "Facebook", icon: <FaFacebookF className="h-3.5 w-3.5" /> },
                { href: WHATSAPP_URL, label: "WhatsApp", icon: <FaWhatsapp className="h-3.5 w-3.5" /> },
              ].map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-stone-300 transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-white"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cierre con el logo de RNC sobre la marca gigante */}
      <div ref={brandRef} className="relative flex justify-center px-3 pt-16 pb-[6vw] select-none">
        <p
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 flex justify-center overflow-hidden font-display font-semibold leading-[0.78] tracking-tighter text-white/[0.05] text-[27vw]"
        >
          {"RNC".split("").map((l, i) => (
            <span key={i} data-brand-letter className="inline-block">
              {l}
            </span>
          ))}
        </p>
        <span
          data-brand-glow
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 m-auto h-[34vw] max-h-[380px] w-[34vw] max-w-[380px] rounded-full bg-accent/20 blur-[80px]"
        />
        <img
          data-brand-logo
          src="/images/logo.png"
          alt="Red Nueva Conexión — Conectándote al mundo"
          loading="lazy"
          decoding="async"
          className="relative w-[70vw] max-w-[460px] drop-shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
        />
      </div>
    </footer>
  );
};

export default Footer;
