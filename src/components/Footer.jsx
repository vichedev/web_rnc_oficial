import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaArrowRight,
  FaTachometerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaShieldAlt,
  FaLandmark,
  FaBolt,
  FaCookieBite,
  FaChevronRight,
} from "react-icons/fa";
import useReveal from "../hooks/useReveal";
import Magnetic from "./ui/Magnetic";
import { openCookieSettings } from "../utils/cookies";

const WHATSAPP_URL =
  "https://wa.me/59343755230?text=" + encodeURIComponent("¡Hola! Quiero contratar internet con RNC.");

const columns = [
  {
    title: "Navegación",
    links: [
      { name: "Inicio", to: "/" },
      { name: "Nosotros", to: "/nosotros" },
      { name: "Planes de internet", to: "/planes" },
      { name: "Centro de documentos", to: "/documentos" },
    ],
  },
  {
    title: "Normativas ARCOTEL",
    links: [
      { name: "Ley Orgánica de Telecomunicaciones", href: "/Documents/1ley_organica_de_telecomunicaciones2.pdf" },
      { name: "Reglamento de Servicios Telecom", href: "/Documents/3REGLAMENTO-PARA-LA-PRESTACION-DE-SERVICIOS-DE-TELECOMUNICACIONES12.pdf" },
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
      { name: "Ley del Adulto Mayor", href: "/Documents/10LEY ORGANICA DE LAS PERSONAS ADULTOS MAYORES (2) 2.pdf" },
    ],
  },
];

const contacts = [
  { icon: FaWhatsapp, label: "WhatsApp", value: "+593 4-375-5230", href: "https://wa.me/59343755230", color: "from-emerald-500 to-green-400" },
  { icon: FaPhoneAlt, label: "Teléfono", value: "04-375-5230", href: "tel:+59343755230", color: "from-brand to-brand-light" },
  { icon: FaEnvelope, label: "Correo", value: "info@rednuevaconexion.ec", href: "mailto:info@rednuevaconexion.ec", color: "from-accent to-amber-500" },
  { icon: FaMapMarkerAlt, label: "Ubicación", value: "Puebloviejo, Los Ríos, Ecuador", href: "https://www.google.com/maps/search/?api=1&query=Puebloviejo%2C+Los+R%C3%ADos%2C+Ecuador", color: "from-violet-500 to-fuchsia-500" },
];

const badges = [
  { icon: FaShieldAlt, title: "Regulado por ARCOTEL", text: "Agencia de Regulación y Control de las Telecomunicaciones" },
  { icon: FaLandmark, title: "Normativa MINTEL", text: "Ministerio de Telecomunicaciones del Ecuador" },
  { icon: FaBolt, title: "Fibra óptica", text: "Red 100% simétrica" },
];

const socials = [
  { href: "https://www.instagram.com/rednuevaconexion.ec/", label: "Instagram", icon: <FaInstagram className="h-4 w-4" />, hover: "hover:bg-gradient-to-br hover:from-pink-500 hover:to-purple-600" },
  { href: "https://www.facebook.com/rednuevaconexion", label: "Facebook", icon: <FaFacebookF className="h-4 w-4" />, hover: "hover:bg-[#1877f2]" },
  { href: "https://wa.me/59343755230", label: "WhatsApp", icon: <FaWhatsapp className="h-4 w-4" />, hover: "hover:bg-[#25d366]" },
];

const Footer = () => {
  const scope = useRef(null);
  const year = new Date().getFullYear();

  useReveal(scope);

  return (
    <footer ref={scope} className="relative overflow-hidden bg-navy text-white">
      <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
      <div className="pointer-events-none absolute -left-40 top-40 h-[30rem] w-[30rem] rounded-full bg-brand/25 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 bottom-40 h-[30rem] w-[30rem] rounded-full bg-accent/15 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-5 pt-20 md:px-8 md:pt-24">
        {/* Llamada a la acción */}
        <div
          data-reveal
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-accent via-orange-500 to-amber-500 p-8 shadow-2xl shadow-accent/20 md:p-14"
        >
          <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-40" />
          <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-white/25 blur-3xl" />
          <img
            src="/images/logo.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -bottom-16 hidden w-[340px] rotate-[-8deg] opacity-20 md:block"
          />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-white/80">Conéctate hoy</p>
              <h2 className="mt-3 font-display text-4xl md:text-6xl font-bold leading-[1.02]">
                Conéctate a todo lo que te gusta.
              </h2>
              <p className="mt-4 text-lg text-white/85">
                Fibra óptica simétrica, instalación sin costo en 48 horas y sin contratos forzosos.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Magnetic>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 whitespace-nowrap rounded-full bg-navy px-8 py-4 font-bold text-white shadow-xl transition-colors hover:bg-white hover:text-navy"
                >
                  <FaWhatsapp className="h-5 w-5" /> Contratar ahora
                </a>
              </Magnetic>
              <Link
                to="/planes"
                className="group flex items-center justify-center gap-3 whitespace-nowrap rounded-full border-2 border-white/70 px-8 py-4 font-bold transition-colors hover:bg-white hover:text-accent"
              >
                Ver planes
                <FaArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="grid gap-12 py-16 md:py-20 lg:grid-cols-12">
          {/* Marca */}
          <div data-reveal className="lg:col-span-4">
            <img src="/images/logo.png" alt="Red Nueva Conexión — Conectándote al mundo" className="w-56 drop-shadow-[0_10px_30px_rgba(31,107,255,0.35)]" />
            <p className="mt-6 max-w-sm leading-relaxed text-blue-100/70">
              “Queremos que cada conexión sea sinónimo de confianza, innovación y cercanía.” Internet por fibra
              óptica para hogares y negocios de Puebloviejo.
            </p>
            <div className="mt-6 flex gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={`flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-transparent ${s.hover}`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
            <a
              href="https://www.speedtest.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-5 py-3.5 transition-colors hover:border-accent"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-amber-500">
                <FaTachometerAlt className="h-4 w-4" />
              </span>
              <span>
                <span className="block font-bold">Test de velocidad</span>
                <span className="text-xs text-blue-100/60">Mide tu conexión ahora</span>
              </span>
              <FaArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Enlaces */}
          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            {columns.map((col) => (
              <div key={col.title} data-reveal>
                <h3 className="mb-5 flex items-center gap-2 font-display text-lg font-bold">
                  <span className="h-5 w-1 rounded-full bg-gradient-to-b from-accent to-amber-400" />
                  {col.title}
                </h3>
                <ul className="space-y-3 text-sm">
                  {col.links.map((l) => {
                    const cls =
                      "group flex items-start gap-2 text-blue-100/70 transition-colors hover:text-white";
                    const inner = (
                      <>
                        <FaChevronRight className="mt-1 h-2.5 w-2.5 flex-shrink-0 text-accent transition-transform group-hover:translate-x-1" />
                        {l.name}
                      </>
                    );
                    return (
                      <li key={l.name}>
                        {l.to ? (
                          <Link to={l.to} className={cls}>
                            {inner}
                          </Link>
                        ) : (
                          <a href={l.href} target="_blank" rel="noopener noreferrer" className={cls}>
                            {inner}
                          </a>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contacto */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {contacts.map((c) => {
            const Icon = c.icon;
            return (
              <a
                key={c.label}
                data-reveal
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/10"
              >
                <span className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${c.color} shadow-lg`}>
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs uppercase tracking-wider text-blue-100/50">{c.label}</span>
                  <span className="block break-words text-sm font-semibold">{c.value}</span>
                </span>
              </a>
            );
          })}
          <div data-reveal className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-cyan-400 shadow-lg">
              <FaClock className="h-5 w-5" />
            </span>
            <span className="text-sm">
              <span className="block text-xs uppercase tracking-wider text-blue-100/50">Horario</span>
              <span className="block font-semibold">Lun–Vie 8:00–18:00</span>
              <span className="block font-semibold">Sáb 9:00–13:00</span>
            </span>
          </div>
        </div>

        {/* Entes de control */}
        <div className="mt-12 grid gap-4 rounded-3xl border border-white/10 bg-gradient-to-r from-white/[0.04] to-white/[0.08] p-6 md:grid-cols-3">
          {badges.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.title} data-reveal className="flex items-center gap-4">
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-brand-light/30 bg-brand/15 text-brand-light">
                  <Icon className="h-4 w-4" />
                </span>
                <span>
                  <span className="block font-bold">{b.title}</span>
                  <span className="text-xs text-blue-100/60">{b.text}</span>
                </span>
              </div>
            );
          })}
        </div>

        {/* Barra inferior */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 pb-10 text-sm text-blue-100/60 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>© {year} Red Nueva Conexión. Todos los derechos reservados.</span>
            <button
              type="button"
              onClick={openCookieSettings}
              className="flex items-center gap-2 transition-colors hover:text-white"
            >
              <FaCookieBite className="h-3.5 w-3.5 text-accent" /> Preferencias de cookies
            </button>
          </div>
          <span className="flex flex-wrap items-center gap-2">
            Desarrollado por
            <a
              href="https://inigualitysoft.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-bold tracking-wider text-white transition-colors hover:border-accent hover:text-accent"
            >
              INIGUALITYSOFT
            </a>
            y
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-bold tracking-wider text-white">
              JhonnVic Tech
            </span>
          </span>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
