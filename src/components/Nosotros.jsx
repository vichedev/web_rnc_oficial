import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaWhatsapp,
  FaAward,
  FaNetworkWired,
  FaBolt,
} from "react-icons/fa";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "../lib/gsap";
import useReveal from "../hooks/useReveal";
import SplitWords from "./ui/SplitWords";
import { plain } from "../utils/text";
import Magnetic from "./ui/Magnetic";
import RollText from "./ui/RollText";
import Eyebrow from "./ui/Eyebrow";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=59343755230&text=Hola%20necesito%20más%20información%20sobre%20los%20planes";

const stats = [
  { value: 500, suffix: "+", label: "Clientes satisfechos" },
  { value: 99.9, decimals: 1, suffix: "%", label: "Uptime garantizado" },
  { value: 15, suffix: " ms", label: "Latencia promedio" },
  { value: 50, suffix: "+", label: "Zonas cubiertas" },
];

const features = [
  {
    title: "Velocidad extrema",
    description:
      "Fibra óptica simétrica para streaming 4K, gaming competitivo y teletrabajo sin interrupciones.",
    metric: "1 Gbps",
    tags: ["Streaming 4K/8K", "Latencia mínima", "Descargas rápidas"],
  },
  {
    title: "Data ilimitada",
    description:
      "Navega, descarga y transmite sin límites. Sin restricciones de consumo mensual ni reducción de velocidad.",
    metric: "∞",
    tags: ["Sin límites", "Sin throttling", "Todo incluido"],
  },
  {
    title: "Seguridad avanzada",
    description:
      "Protección permanente con firewall integrado, antivirus y control parental incluido.",
    metric: "100%",
    tags: ["Firewall", "Antivirus", "Control parental"],
  },
  {
    title: "Cobertura extendida",
    description:
      "Llegamos donde otros no llegan, con tecnología de última generación en zonas urbanas y rurales.",
    metric: "50+",
    tags: ["Zona urbana", "Zona rural", "Expansión continua"],
  },
];

const services = [
  {
    icon: FaAward,
    title: "Garantía certificada",
    description:
      "Calidad garantizada con certificación de satisfacción del cliente y reembolso de 30 días.",
    highlight: "30 días",
  },
  {
    icon: FaNetworkWired,
    title: "Infraestructura sólida",
    description:
      "Tecnología de última generación con redundancia total y 99.9% de disponibilidad.",
    highlight: "99.9% uptime",
  },
  {
    icon: FaBolt,
    title: "Instalación express",
    description:
      "Instalación en menos de 48 horas con técnicos certificados y equipos nuevos.",
    highlight: "48 h",
  },
];

const advantages = [
  "Atención personalizada",
  "Sin costos ocultos",
  "Sin contratos forzosos",
  "Equipos actualizados gratis",
  "Asesoramiento especializado",
  "Acceso prioritario a nuevas tecnologías",
];

const Marquee = () => {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const loop = gsap.to("[data-marquee-track]", {
        xPercent: -50,
        repeat: -1,
        duration: 40,
        ease: "none",
      });
      // La cinta se acelera con la velocidad del scroll
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

  const items = [...advantages, ...advantages];
  return (
    <div ref={ref} className="overflow-hidden border-y border-line bg-paper py-8" aria-label="Ventajas RNC">
      <div data-marquee-track className="flex w-max">
        {items.map((text, i) => (
          <span
            key={i}
            aria-hidden={i >= advantages.length}
            className="flex items-center gap-10 pr-10 font-display text-3xl md:text-5xl font-medium tracking-tight text-ink whitespace-nowrap"
          >
            {text}
            <span className="text-accent text-2xl md:text-3xl">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};

const Nosotros = ({ overlap = false }) => {
  const navigate = useNavigate();
  const scope = useRef(null);
  useReveal(scope);

  const title = "Conectamos *personas, no solo dispositivos.";
  const ctaTitle = "¿Listo para la *verdadera velocidad?";

  return (
    <section
      id="nosotros"
      ref={scope}
      className={`bg-paper text-ink ${
        overlap
          ? "relative z-10 -mt-[6vh] rounded-t-[2rem] md:rounded-t-[3rem] shadow-[0_-30px_80px_-20px_rgba(0,0,0,0.6)]"
          : ""
      }`}
    >
      {/* Introducción */}
      <div className="mx-auto max-w-7xl px-5 md:px-8 pt-32 md:pt-40 pb-20 md:pb-28">
        <Eyebrow index="01">Nosotros</Eyebrow>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <h2
            data-split
            aria-label={plain(title)}
            className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold leading-[0.95] lg:col-span-8"
          >
            <SplitWords text={title} />
          </h2>
          <div className="lg:col-span-4 lg:pt-4 flex flex-col justify-end gap-8">
            <p data-reveal className="text-lg leading-relaxed text-stone-600">
              No somos solo un proveedor de internet. Somos tu socio en
              conectividad, con tecnología de punta y un compromiso real con tu
              satisfacción.
            </p>
            <div data-reveal>
              <button
                onClick={() => navigate("/planes")}
                className="group inline-flex items-center gap-3 font-semibold text-ink"
              >
                <span className="link-underline pb-1">Conoce nuestros planes</span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line transition-all duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                  <FaArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-rotate-45" />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="mt-20 md:mt-28">
          <div data-line className="h-px bg-line" />
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                data-reveal
                className={`py-8 md:py-10 ${i % 2 === 1 ? "pl-6 md:pl-10 border-l border-line" : ""} ${
                  i >= 2 ? "border-t lg:border-t-0 border-line" : ""
                } ${i === 2 ? "lg:pl-10 lg:border-l" : ""}`}
              >
                <dt className="text-sm text-stone-500">{s.label}</dt>
                <dd className="mt-3 font-display text-4xl md:text-6xl font-semibold tracking-tight">
                  <span data-counter={s.value} data-decimals={s.decimals || 0}>
                    {s.value.toLocaleString("es-EC", {
                      minimumFractionDigits: s.decimals || 0,
                    })}
                  </span>
                  <span className="text-accent">{s.suffix}</span>
                </dd>
              </div>
            ))}
          </dl>
          <div data-line className="h-px bg-line" />
        </div>
      </div>

      {/* Características */}
      <div className="mx-auto max-w-7xl px-5 md:px-8 pb-24 md:pb-32">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h3
            data-split
            aria-label="Lo que nos hace únicos"
            className="font-display text-3xl md:text-5xl font-semibold"
          >
            <SplitWords text="Lo que nos hace *únicos" />
          </h3>
          <p data-reveal className="max-w-sm text-stone-500">
            Tecnología de vanguardia combinada con un servicio cercano.
          </p>
        </div>

        <ul className="border-t border-line">
          {features.map((f, i) => (
            <li
              key={f.title}
              data-reveal
              className="group relative overflow-hidden border-b border-line"
            >
              {/* Relleno que sube al pasar el cursor */}
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-y-100" />
              <div className="relative grid grid-cols-12 items-center gap-4 px-2 py-8 md:px-6 md:py-10 transition-colors duration-500 group-hover:text-white">
                <span className="col-span-2 md:col-span-1 font-display text-sm text-stone-400 group-hover:text-stone-500">
                  0{i + 1}
                </span>
                <div className="col-span-10 md:col-span-5">
                  <h4 className="font-display text-2xl md:text-4xl font-semibold tracking-tight">
                    {f.title}
                  </h4>
                </div>
                <div className="col-span-12 md:col-span-4 md:col-start-7 col-start-3">
                  <p className="text-stone-500 group-hover:text-stone-300 transition-colors duration-500">
                    {f.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {f.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-line px-3 py-1 text-xs text-stone-500 transition-colors duration-500 group-hover:border-white/20 group-hover:text-stone-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="hidden md:block md:col-span-2 text-right font-display text-3xl font-semibold text-accent">
                  {f.metric}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Ventajas en movimiento */}
      <Marquee />

      {/* Servicios incluidos */}
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-24 md:py-32">
        <Eyebrow index="02">Incluido en todos los planes</Eyebrow>
        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <article
                key={s.title}
                data-reveal
                className="group flex flex-col bg-paper p-8 md:p-10 transition-colors duration-500 hover:bg-white"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sand text-ink transition-all duration-500 group-hover:bg-accent group-hover:text-white group-hover:rotate-[360deg]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-display text-sm font-semibold text-accent">
                    {s.highlight}
                  </span>
                </div>
                <h4 className="mt-16 font-display text-2xl font-semibold tracking-tight">
                  {s.title}
                </h4>
                <p className="mt-3 text-stone-500 leading-relaxed">{s.description}</p>
              </article>
            );
          })}
        </div>
      </div>

      {/* Llamada a la acción */}
      <div className="px-3 md:px-5 pb-3 md:pb-5">
        <div className="relative overflow-hidden rounded-[2rem] bg-ink px-6 py-20 md:px-16 md:py-28 text-white">
          <div
            data-speed="0.15"
            className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-accent/25 blur-[120px]"
          />
          <div className="relative mx-auto max-w-5xl text-center">
            <Eyebrow index="→" dark className="justify-center">
              Empieza hoy
            </Eyebrow>
            <h3
              data-split
              aria-label={plain(ctaTitle)}
              className="mt-8 font-display text-4xl sm:text-6xl md:text-7xl font-semibold leading-[1]"
            >
              <SplitWords text={ctaTitle} />
            </h3>
            <p data-reveal className="mx-auto mt-8 max-w-xl text-lg text-stone-400">
              Únete a más de 500 clientes que ya disfrutan de nuestra
              conectividad. Sin contratos forzosos y con garantía de satisfacción.
            </p>
            <div data-reveal className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Magnetic>
                <button
                  onClick={() => navigate("/planes")}
                  className="group flex items-center gap-3 rounded-full bg-accent px-8 py-4 font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-ink"
                >
                  <RollText>Ver planes</RollText>
                  <FaArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />
                </button>
              </Magnetic>
              <Magnetic>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-full border border-white/20 px-8 py-4 font-semibold transition-colors duration-300 hover:border-white"
                >
                  <FaWhatsapp className="h-4 w-4" />
                  <RollText>Escríbenos</RollText>
                </a>
              </Magnetic>
            </div>
            <ul data-reveal className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-stone-500">
              {["Sin costos de instalación", "Garantía 30 días", "Equipos incluidos"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-accent" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Nosotros;
