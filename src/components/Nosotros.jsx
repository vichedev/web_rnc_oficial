import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaWhatsapp,
  FaBolt,
  FaExchangeAlt,
  FaWifi,
  FaInfinity,
  FaShieldAlt,
  FaMapMarkedAlt,
  FaUsers,
  FaChartLine,
  FaTachometerAlt,
  FaCheck,
  FaTimes,
  FaGamepad,
  FaFilm,
  FaLaptopHouse,
  FaGraduationCap,
  FaVideo,
  FaHome,
  FaBuilding,
  FaSchool,
  FaTools,
  FaHandshake,
  FaClock,
  FaAward,
  FaLightbulb,
} from "react-icons/fa";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "../lib/gsap";
import useReveal from "../hooks/useReveal";
import SectionTitle from "./ui/SectionTitle";
import Magnetic from "./ui/Magnetic";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=59343755230&text=Hola%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20RNC";

const stats = [
  { value: 500, suffix: "+", label: "Clientes conectados", icon: FaUsers },
  { value: 99.9, decimals: 1, suffix: "%", label: "Disponibilidad de red", icon: FaChartLine },
  { value: 15, suffix: " ms", label: "Latencia promedio", icon: FaTachometerAlt },
  { value: 50, suffix: "+", label: "Zonas con cobertura", icon: FaMapMarkedAlt },
];

const features = [
  {
    icon: FaBolt,
    title: "Fibra óptica",
    text: "Red de fibra óptica de última generación que lleva la señal por luz: más rápida y estable que el cobre o la antena.",
    color: "from-accent to-amber-500",
  },
  {
    icon: FaExchangeAlt,
    title: "100% simétrico",
    text: "La misma velocidad para subir y bajar. Ideal para videollamadas, subir archivos, transmitir en vivo y trabajar en la nube.",
    color: "from-brand to-brand-light",
  },
  {
    icon: FaWifi,
    title: "WiFi incluido",
    text: "Todos los planes incluyen el equipo WiFi para que conectes todos tus dispositivos desde el primer día.",
    color: "from-sky-500 to-cyan-400",
  },
  {
    icon: FaInfinity,
    title: "Data ilimitada",
    text: "Navega, descarga y mira series sin límites de consumo ni reducción de velocidad a fin de mes.",
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    icon: FaShieldAlt,
    title: "Navegación segura",
    text: "Firewall integrado y herramientas de control parental para proteger a toda la familia en internet.",
    color: "from-emerald-500 to-teal-400",
  },
  {
    icon: FaMapMarkedAlt,
    title: "Cobertura urbana y rural",
    text: "Llegamos donde otros no llegan: más de 50 zonas en Puebloviejo y sus alrededores, y seguimos creciendo.",
    color: "from-rose-500 to-orange-400",
  },
];

const comparison = [
  { label: "Velocidad de subida igual a la de bajada", rnc: true, other: false },
  { label: "Estable con lluvia y mal clima", rnc: true, other: false },
  { label: "Sin interferencias eléctricas", rnc: true, other: false },
  { label: "Latencia baja para gaming y videollamadas", rnc: true, other: false },
  { label: "Preparada para futuras velocidades", rnc: true, other: false },
];

const uses = [
  { icon: FaGamepad, text: "Gaming en línea" },
  { icon: FaFilm, text: "Streaming 4K" },
  { icon: FaLaptopHouse, text: "Teletrabajo" },
  { icon: FaGraduationCap, text: "Clases virtuales" },
  { icon: FaVideo, text: "Videollamadas" },
  { icon: FaLightbulb, text: "Hogar inteligente" },
];

const included = [
  { icon: FaTools, title: "Instalación sin costo" },
  { icon: FaWifi, title: "Equipo WiFi incluido" },
  { icon: FaClock, title: "Instalación en 48 h" },
  { icon: FaHandshake, title: "Sin contratos forzosos" },
  { icon: FaAward, title: "Garantía de 30 días" },
];

/** Diagrama de fibra: pulsos de luz que viajan desde la central a los hogares. */
const FiberDiagram = () => {
  const ref = useRef(null);
  const ends = [
    { y: 70, icon: FaHome, label: "Hogares", top: "17.5%" },
    { y: 170, icon: FaBuilding, label: "Negocios", top: "42.5%" },
    { y: 270, icon: FaSchool, label: "Escuelas", top: "67.5%" },
    { y: 350, icon: FaLaptopHouse, label: "Teletrabajo", top: "87.5%" },
  ];

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray("[data-pulse]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { strokeDashoffset: 112 },
          { strokeDashoffset: -12, duration: 2.2, ease: "none", repeat: -1, delay: i * 0.45 }
        );
      });
      gsap.to("[data-core]", { scale: 1.15, opacity: 0.5, duration: 1.4, yoyo: true, repeat: -1, ease: "sine.inOut", transformOrigin: "center" });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className="relative aspect-[3/2] w-full">
      <svg viewBox="0 0 600 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="pulse" x1="0" x2="1">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0" />
            <stop offset="60%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>
        {ends.map((e, i) => {
          const d = `M70 200 C 260 200, 300 ${e.y}, 500 ${e.y}`;
          return (
            <g key={i}>
              <path d={d} fill="none" stroke="rgba(91,155,255,0.25)" strokeWidth="2" />
              <path
                data-pulse
                d={d}
                fill="none"
                stroke="url(#pulse)"
                strokeWidth="3.5"
                strokeLinecap="round"
                pathLength="100"
                strokeDasharray="12 100"
                strokeDashoffset="112"
                style={{ filter: "drop-shadow(0 0 6px rgba(249,115,22,0.9))" }}
              />
            </g>
          );
        })}
        <circle data-core cx="70" cy="200" r="46" fill="rgba(31,107,255,0.35)" />
        <circle cx="70" cy="200" r="32" fill="#0a1d4f" stroke="#5b9bff" strokeWidth="2" />
      </svg>

      <div className="absolute left-[11.6%] top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <img src="/images/logo.png" alt="" className="w-[11vw] max-w-[78px] min-w-[44px]" />
      </div>
      {ends.map((e) => {
        const Icon = e.icon;
        return (
          <div
            key={e.label}
            className="absolute right-0 flex -translate-y-1/2 items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-xs sm:text-sm font-semibold text-white backdrop-blur-md"
            style={{ top: e.top }}
          >
            <Icon className="h-3.5 w-3.5 text-accent" />
            {e.label}
          </div>
        );
      })}
    </div>
  );
};

/** Cinta infinita de usos que se acelera con el scroll. */
const UsesMarquee = () => {
  const ref = useRef(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const loop = gsap.to("[data-marquee-track]", { xPercent: -50, repeat: -1, duration: 35, ease: "none" });
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 300, 6);
          gsap.to(loop, { timeScale: boost, duration: 0.2, overwrite: true });
          gsap.to(loop, { timeScale: 1, duration: 1.2, delay: 0.2 });
        },
      });
    },
    { scope: ref }
  );
  const items = [...uses, ...uses];
  return (
    <div ref={ref} className="relative z-10 overflow-hidden bg-gradient-to-r from-accent via-orange-500 to-amber-500 py-6 -rotate-1 scale-[1.02] shadow-xl shadow-accent/20" aria-label="Usos de tu conexión">
      <div data-marquee-track className="flex w-max">
        {items.map((u, i) => {
          const Icon = u.icon;
          return (
            <span
              key={i}
              aria-hidden={i >= uses.length}
              className="flex items-center gap-4 pr-12 font-display text-2xl md:text-4xl font-bold uppercase tracking-tight text-white whitespace-nowrap"
            >
              <Icon className="h-6 w-6 md:h-8 md:w-8 text-navy/70" />
              {u.text}
              <span className="text-navy/40">✦</span>
            </span>
          );
        })}
      </div>
    </div>
  );
};

const Nosotros = ({ overlap = false }) => {
  const navigate = useNavigate();
  const scope = useRef(null);
  useReveal(scope);

  return (
    <section
      id="nosotros"
      ref={scope}
      className={`overflow-hidden bg-paper text-ink ${
        overlap
          ? "relative z-10 -mt-[6vh] rounded-t-[2rem] md:rounded-t-[3rem] shadow-[0_-30px_80px_-20px_rgba(0,0,0,0.6)]"
          : ""
      }`}
    >
      {/* ---------- Quiénes somos ---------- */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 bg-dots [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pt-32 pb-20 md:px-8 md:pt-36 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionTitle
              eyebrow="Quiénes somos"
              icon={FaUsers}
              title="Conectamos *personas, no solo dispositivos."
              subtitle="Somos Red Nueva Conexión, proveedor de internet por fibra óptica en Puebloviejo, Ecuador. Llevamos internet simétrico, estable y a precio justo a hogares, negocios y zonas rurales."
            />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {["Fibra óptica hasta tu hogar", "Velocidad simétrica real", "Atención cercana y local", "Planes sociales con tarifa preferencial"].map((t) => (
                <li key={t} data-reveal className="flex items-center gap-3 font-medium text-stone-700">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent/15">
                    <FaCheck className="h-3 w-3 text-accent" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <div data-reveal className="mt-10 flex flex-wrap gap-3">
              <Magnetic>
                <button
                  onClick={() => navigate("/planes")}
                  className="group flex items-center gap-3 rounded-full bg-navy px-7 py-4 font-semibold text-white shadow-xl shadow-navy/20 transition-colors hover:bg-brand"
                >
                  Ver planes
                  <FaArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </Magnetic>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-full border border-stone-300 px-7 py-4 font-semibold transition-colors hover:border-accent hover:text-accent"
              >
                <FaWhatsapp className="h-4 w-4" />
                Escríbenos
              </a>
            </div>
          </div>

          {/* Imagen de marca con indicadores flotantes */}
          <div data-reveal className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-accent/30 via-transparent to-brand/40 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] shadow-2xl shadow-navy/30 ring-1 ring-black/5">
              <img
                src="/images/refe.jpg"
                alt="Personas disfrutando de internet: gaming, series, redes sociales y compras en línea"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div
              data-speed="0.12"
              className="absolute -left-4 top-10 sm:-left-10 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-xl backdrop-blur"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-amber-500 text-white">
                <FaUsers className="h-4 w-4" />
              </span>
              <span>
                <span className="block font-display text-xl font-bold leading-none">500+</span>
                <span className="text-xs text-stone-500">clientes conectados</span>
              </span>
            </div>
            <div
              data-speed="-0.1"
              className="absolute -right-3 bottom-16 sm:-right-8 flex items-center gap-3 rounded-2xl bg-navy px-4 py-3 text-white shadow-xl"
            >
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
              </span>
              <span>
                <span className="block text-sm font-bold leading-none">Red en línea</span>
                <span className="text-xs text-blue-100/70">99,9% de disponibilidad</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Estadísticas ---------- */}
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-navy px-6 py-10 md:px-12 md:py-14 text-white">
          <div className="pointer-events-none absolute inset-0 bg-tech-grid" />
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand/40 blur-[90px]" />
          <div className="pointer-events-none absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-accent/25 blur-[90px]" />
          <dl className="relative grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} data-reveal className="flex flex-col gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-accent ring-1 ring-white/15">
                    <Icon className="h-5 w-5" />
                  </span>
                  <dd className="font-display text-4xl md:text-5xl font-bold tracking-tight">
                    <span data-counter={s.value} data-decimals={s.decimals || 0}>
                      {s.value.toLocaleString("es-EC", { minimumFractionDigits: s.decimals || 0 })}
                    </span>
                    <span className="text-gradient-brand">{s.suffix}</span>
                  </dd>
                  <dt className="text-sm text-blue-100/70">{s.label}</dt>
                </div>
              );
            })}
          </dl>
        </div>
      </div>

      {/* ---------- Por qué elegirnos ---------- */}
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <SectionTitle
          center
          eyebrow="Por qué elegirnos"
          icon={FaAward}
          title="Internet que *sí cumple"
          subtitle="Todo lo que necesitas de un proveedor de internet, en un solo lugar."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <article
                key={f.title}
                data-reveal
                className="group relative overflow-hidden rounded-3xl border border-stone-200 bg-white p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-transparent hover:shadow-2xl hover:shadow-navy/10"
              >
                <span className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${f.color} origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100`} />
                <span className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${f.color} text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6`}>
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 font-display text-xl font-bold">{f.title}</h3>
                <p className="mt-2 leading-relaxed text-stone-600">{f.text}</p>
              </article>
            );
          })}
        </div>
      </div>

      {/* ---------- Usos ---------- */}
      <UsesMarquee />

      {/* ---------- Tecnología ---------- */}
      <div className="relative mt-[-1rem] bg-navy text-white">
        <div className="pointer-events-none absolute inset-0 bg-tech-grid [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-24 md:px-8 md:py-32 lg:grid-cols-2">
          <div>
            <SectionTitle
              dark
              eyebrow="Nuestra tecnología"
              icon={FaBolt}
              title="Fibra óptica *hasta tu hogar"
              subtitle="Con FTTH (Fiber To The Home) la fibra llega directo a tu casa. Los datos viajan como pulsos de luz, sin pérdidas por distancia ni interferencias."
            />
            <div data-reveal className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
              <div className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4 border-b border-white/10 px-5 py-3 text-xs font-bold uppercase tracking-wider text-blue-100/60">
                <span>Característica</span>
                <span className="w-16 text-center text-accent">RNC</span>
                <span className="w-16 text-center">Otros</span>
              </div>
              {comparison.map((c) => (
                <div key={c.label} className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4 border-b border-white/5 px-5 py-3.5 text-sm last:border-b-0">
                  <span className="text-blue-50/90">{c.label}</span>
                  <span className="flex w-16 justify-center">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-300">
                      <FaCheck className="h-3 w-3" />
                    </span>
                  </span>
                  <span className="flex w-16 justify-center">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-blue-100/40">
                      <FaTimes className="h-3 w-3" />
                    </span>
                  </span>
                </div>
              ))}
            </div>
            <p data-reveal className="mt-3 text-xs text-blue-100/40">
              Comparación frente a conexiones tradicionales por cobre (ADSL) o antena.
            </p>
          </div>
          <div data-reveal>
            <FiberDiagram />
          </div>
        </div>
      </div>

      {/* ---------- Incluido en todos los planes ---------- */}
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-24">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionTitle eyebrow="Sin letra pequeña" title="Incluido en *todos los planes" />
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {included.map((it) => {
            const Icon = it.icon;
            return (
              <li
                key={it.title}
                data-reveal
                className="flex items-center gap-4 rounded-2xl border border-stone-200 bg-white px-5 py-5 font-semibold transition-colors hover:border-accent/50"
              >
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Icon className="h-5 w-5" />
                </span>
                {it.title}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Nosotros;
