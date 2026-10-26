import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  FaWhatsapp,
  FaCheck,
  FaArrowRight,
  FaTimes,
  FaSearchPlus,
  FaExchangeAlt,
  FaWifi,
  FaStar,
  FaTools,
  FaInfinity,
  FaHandshake,
} from "react-icons/fa";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/gsap";
import useReveal from "../hooks/useReveal";
import SectionTitle from "./ui/SectionTitle";
import planes from "../data/planes";

const tabs = ["Todos", "Hogar", "Empresa", "Social"];

const perks = [
  { icon: FaTools, text: "Instalación sin costo" },
  { icon: FaWifi, text: "Equipo WiFi incluido" },
  { icon: FaInfinity, text: "Data ilimitada" },
  { icon: FaHandshake, text: "Sin contratos forzosos" },
];

const whatsappLink = (nombre) =>
  `https://wa.me/59343755230?text=${encodeURIComponent(
    `¡Hola! Quiero contratar el Plan ${nombre} de RNC. ¿Me pueden dar más información?`
  )}`;

/** Tarjeta de plan con el afiche como protagonista e inclinación 3D. */
const PlanCard = ({ plan, onPreview }) => {
  const ref = useRef(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion() || !window.matchMedia("(hover: hover)").matches) return;
      const rx = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3.out" });
      const ry = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3.out" });
      const move = (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry(px * 8);
        rx(-py * 8);
        el.style.setProperty("--x", `${e.clientX - r.left}px`);
        el.style.setProperty("--y", `${e.clientY - r.top}px`);
      };
      const leave = () => {
        rx(0);
        ry(0);
      };
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
      return () => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      };
    },
    { scope: ref }
  );

  return (
    <div data-plan-card className="[perspective:1200px]">
      <article
        ref={ref}
        className={`group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border bg-navy-2/60 backdrop-blur-sm transition-[border-color,box-shadow] duration-500 [transform-style:preserve-3d] ${
          plan.popular
            ? "border-accent/70 shadow-[0_0_0_1px_rgba(249,115,22,0.4),0_30px_80px_-20px_rgba(249,115,22,0.45)]"
            : "border-white/10 hover:border-brand-light/40 hover:shadow-[0_30px_80px_-25px_rgba(31,107,255,0.5)]"
        }`}
      >
        {/* Brillo que sigue al cursor */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(500px circle at var(--x,50%) var(--y,50%), rgba(255,255,255,0.10), transparent 45%)",
          }}
        />

        {/* Afiche */}
        <button
          type="button"
          onClick={() => onPreview(plan)}
          aria-label={`Ampliar afiche del Plan ${plan.nombre}`}
          className="relative block overflow-hidden"
        >
          <img
            src={plan.imagen}
            alt={`Afiche del Plan ${plan.nombre}: ${plan.velocidad} Mbps por $${plan.precio} al mes`}
            loading="lazy"
            decoding="async"
            className="aspect-square w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.07]"
          />
          <span className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-navy-2/50 to-transparent" />
          <span className="absolute left-4 top-4 rounded-full bg-navy/70 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
            {plan.tipo}
          </span>
          {plan.popular && (
            <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-accent to-amber-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg">
              <FaStar className="h-3 w-3" /> Más popular
            </span>
          )}
          <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <span className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-navy shadow-lg">
              <FaSearchPlus className="h-3.5 w-3.5" /> Ver afiche
            </span>
          </span>
        </button>

        {/* Información */}
        <div className="relative flex flex-1 flex-col px-6 pt-6 pb-6 text-white">
          <div className="flex items-end justify-between gap-3">
            <div>
              <h3 className="font-display text-2xl font-bold">Plan {plan.nombre}</h3>
              <p className="mt-1 text-sm text-blue-100/70">{plan.descripcion}</p>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <span className="font-display text-5xl font-bold leading-none tracking-tighter">
              {plan.velocidad}
            </span>
            <span className="text-sm leading-tight">
              <span className="block font-bold">Mbps</span>
              <span className="flex items-center gap-1 whitespace-nowrap text-blue-100/70">
                <FaExchangeAlt className="h-3 w-3 text-accent" /> simétrico
              </span>
            </span>
            <span className="ml-auto text-right text-xs text-blue-100/60">
              Ideal para
              <span className="block text-sm font-semibold text-white">{plan.ideal}</span>
            </span>
          </div>

          <ul className="mt-5 flex flex-wrap gap-2">
            {plan.caracteristicas.map((c) => (
              <li key={c} className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium">
                <FaCheck className="h-2.5 w-2.5 text-emerald-300" /> {c}
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-7">
            <div className="flex items-end justify-between">
              <div>
                <span className="font-display text-4xl font-bold">${plan.precio}</span>
                <span className="text-blue-100/70">.00 /mes</span>
                <p className="mt-0.5 text-xs text-blue-100/50">{plan.incluye}</p>
              </div>
            </div>
            <a
              href={whatsappLink(plan.nombre)}
              target="_blank"
              rel="noopener noreferrer"
              className={`group/btn relative mt-5 flex items-center justify-center gap-2 overflow-hidden rounded-2xl py-4 font-bold transition-all duration-300 ${
                plan.popular
                  ? "bg-gradient-to-r from-accent to-amber-500 text-white shadow-lg shadow-accent/40"
                  : "bg-white text-navy hover:bg-gradient-to-r hover:from-accent hover:to-amber-500 hover:text-white"
              }`}
            >
              <FaWhatsapp className="h-5 w-5" />
              Contratar plan
              <FaArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </a>
          </div>
        </div>
      </article>
    </div>
  );
};

const Planes = () => {
  const scope = useRef(null);
  const gridRef = useRef(null);
  const tabsRef = useRef(null);
  const indicatorRef = useRef(null);
  const modalRef = useRef(null);
  const [tab, setTab] = useState("Todos");
  const [preview, setPreview] = useState(null);

  useReveal(scope);

  const visibles = tab === "Todos" ? planes : planes.filter((p) => p.tipo === tab);

  // Indicador deslizante de las pestañas
  useLayoutEffect(() => {
    const place = (animate) => {
      const active = tabsRef.current?.querySelector(`[data-tab="${tab}"]`);
      if (!active) return;
      const x = active.getBoundingClientRect().left - tabsRef.current.getBoundingClientRect().left;
      gsap.to(indicatorRef.current, {
        x,
        width: active.offsetWidth,
        duration: animate && !prefersReducedMotion() ? 0.6 : 0,
        ease: "expo.out",
        overwrite: true,
      });
    };
    place(true);
    const onResize = () => place(false);
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [tab]);

  // Entrada de las tarjetas
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        "[data-plan-card]",
        { opacity: 0, y: 80, rotateX: -12 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.1,
          clearProps: "transform",
          scrollTrigger: { trigger: gridRef.current, start: "top 85%", once: true },
        }
      );
    },
    { scope: gridRef, dependencies: [tab], revertOnUpdate: true }
  );

  // Modal del afiche
  useGSAP(
    () => {
      if (!preview) return;
      gsap.fromTo("[data-modal-bg]", { opacity: 0 }, { opacity: 1, duration: 0.4 });
      gsap.fromTo(
        "[data-modal-img]",
        { opacity: 0, y: 40, scale: 0.9, rotate: -2 },
        { opacity: 1, y: 0, scale: 1, rotate: 0, duration: 0.8, ease: "expo.out" }
      );
    },
    { scope: modalRef, dependencies: [preview] }
  );

  const closePreview = () => {
    gsap.to(modalRef.current, { opacity: 0, duration: 0.3, onComplete: () => setPreview(null) });
  };

  useEffect(() => {
    if (!preview) return;
    const onKey = (e) => e.key === "Escape" && closePreview();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [preview]);

  return (
    <section id="planes" ref={scope} className="relative overflow-hidden bg-navy text-white">
      <div className="pointer-events-none absolute inset-0 bg-tech-grid [mask-image:linear-gradient(to_bottom,black,transparent_60%)]" />
      <div className="pointer-events-none absolute -left-40 top-20 h-[30rem] w-[30rem] rounded-full bg-brand/30 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 top-[40%] h-[30rem] w-[30rem] rounded-full bg-accent/20 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-5 pt-32 pb-24 md:px-8 md:pt-36 md:pb-32">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle
            dark
            eyebrow="Planes de internet"
            icon={FaWifi}
            title="Elige la velocidad *perfecta para ti"
            subtitle="Fibra óptica simétrica para tu hogar o negocio. Precios claros, con impuestos incluidos y sin sorpresas."
          />
          <ul data-reveal className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-blue-100/80 lg:mb-2">
            {perks.map((p) => {
              const Icon = p.icon;
              return (
                <li key={p.text} className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-accent" /> {p.text}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Pestañas */}
        <div data-reveal className="mt-12 overflow-x-auto pb-1">
          <div
            ref={tabsRef}
            role="tablist"
            aria-label="Filtrar planes"
            className="relative inline-flex rounded-full border border-white/10 bg-white/5 p-1.5 backdrop-blur"
          >
            <span
              ref={indicatorRef}
              aria-hidden="true"
              className="absolute left-0 top-1.5 bottom-1.5 rounded-full bg-gradient-to-r from-accent to-amber-500 shadow-lg shadow-accent/30"
              style={{ width: 0 }}
            />
            {tabs.map((t) => (
              <button
                key={t}
                data-tab={t}
                role="tab"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className={`relative z-10 whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-semibold transition-colors duration-500 ${
                  tab === t ? "text-white" : "text-blue-100/70 hover:text-white"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Tarjetas */}
        <div ref={gridRef} className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibles.map((plan) => (
            <PlanCard key={plan.id} plan={plan} onPreview={setPreview} />
          ))}
        </div>

        <p data-reveal className="mt-8 text-center text-xs text-blue-100/50">
          Los planes Tercera Edad y Discapacidad tienen tarifa preferencial conforme a la Ley Orgánica de
          las Personas Adultas Mayores y la Ley Orgánica de Discapacidades. Aplican requisitos.
        </p>

        {/* Plan a medida */}
        <a
          data-reveal
          href={whatsappLink("a medida")}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative mt-14 flex flex-col gap-6 overflow-hidden rounded-[2rem] bg-gradient-to-r from-brand to-brand-light p-8 md:flex-row md:items-center md:justify-between md:p-12"
        >
          <span className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-white/20 blur-3xl" />
          <div className="relative">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/80">¿Necesitas algo especial?</p>
            <p className="mt-2 font-display text-3xl md:text-4xl font-bold">Armamos un plan a tu medida</p>
            <p className="mt-2 max-w-xl text-white/80">
              Para empresas, eventos o necesidades específicas. Cuéntanos qué necesitas y te enviamos una propuesta.
            </p>
          </div>
          <span className="relative flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-white text-brand transition-transform duration-500 group-hover:-rotate-45 group-hover:scale-110">
            <FaArrowRight className="h-5 w-5" />
          </span>
        </a>
      </div>

      {/* Modal del afiche */}
      {preview && (
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Afiche del Plan ${preview.nombre}`}
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
        >
          <div data-modal-bg className="absolute inset-0 bg-navy/90 backdrop-blur-md" onClick={closePreview} />
          <div data-modal-img className="relative flex max-w-3xl flex-col items-center">
            <img
              src={preview.imagen}
              alt={`Afiche del Plan ${preview.nombre}`}
              className="max-h-[78vh] w-auto rounded-3xl object-contain shadow-2xl"
            />
            <a
              href={whatsappLink(preview.nombre)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-amber-500 px-6 py-3 font-bold text-white shadow-lg shadow-accent/40"
            >
              <FaWhatsapp className="h-5 w-5" /> Contratar Plan {preview.nombre}
            </a>
            <button
              onClick={closePreview}
              aria-label="Cerrar"
              className="absolute -top-3 -right-3 flex h-11 w-11 items-center justify-center rounded-full bg-white text-navy shadow-lg transition-colors hover:bg-accent hover:text-white"
            >
              <FaTimes className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Planes;
