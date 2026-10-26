import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FaWhatsapp, FaCheck, FaArrowRight, FaTimes, FaImage } from "react-icons/fa";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/gsap";
import useReveal from "../hooks/useReveal";
import SplitWords from "./ui/SplitWords";
import { plain } from "../utils/text";
import Eyebrow from "./ui/Eyebrow";

const planes = [
  {
    id: 1,
    nombre: "Home Básico",
    tipo: "Hogar",
    velocidad: 50,
    caracteristicas: ["Simétrico", "Compartición 2:1", "WiFi incluido"],
    descripcion: "Ideal para estudiantes y navegación básica.",
    precio: "20",
    incluye: "Incluye impuestos",
    imagen: "/images/planes/plan1.png",
  },
  {
    id: 2,
    nombre: "Intermedio",
    tipo: "Hogar",
    velocidad: 75,
    caracteristicas: ["Simétrico", "WiFi incluido", "Conexión estable"],
    descripcion: "Perfecto para teletrabajo y streaming.",
    precio: "35",
    incluye: "Incluye impuestos",
    imagen: "/images/planes/plan2.png",
    popular: true,
  },
  {
    id: 3,
    nombre: "Avanzado",
    tipo: "Hogar",
    velocidad: 100,
    caracteristicas: ["Simétrico", "WiFi incluido", "Baja latencia"],
    descripcion: "Excelente para gaming y hogares conectados.",
    precio: "50",
    incluye: "Incluye impuestos",
    imagen: "/images/planes/plan3.png",
  },
  {
    id: 4,
    nombre: "Corporativo",
    tipo: "Empresa",
    velocidad: 200,
    caracteristicas: ["Simétrico", "WiFi incluido", "Alta estabilidad"],
    descripcion: "Soluciones empresariales para tu oficina.",
    precio: "300",
    incluye: "Incluye impuestos",
    imagen: "/images/planes/plan4.png",
  },
  {
    id: 5,
    nombre: "Tercera Edad",
    tipo: "Social",
    velocidad: 50,
    caracteristicas: ["Simétrico", "Compartición 2:1", "WiFi incluido"],
    descripcion: "Pensado para nuestros adultos mayores.",
    precio: "10",
    incluye: "Incluye impuestos · Aplican restricciones",
    imagen: "/images/planes/plan5.png",
  },
  {
    id: 6,
    nombre: "Discapacidad",
    tipo: "Social",
    velocidad: 50,
    caracteristicas: ["Simétrico", "Compartición 1:1", "WiFi incluido"],
    descripcion: "Accesibilidad digital para todos.",
    precio: "15",
    incluye: "Incluye impuestos · Aplican restricciones",
    imagen: "/images/planes/plan6.png",
  },
];

const tabs = ["Todos", "Hogar", "Empresa", "Social"];

const whatsappLink = (nombre) =>
  `https://wa.me/59343755230?text=${encodeURIComponent(
    `¡Hola! Estoy interesado en el Plan ${nombre} de RNC. ¿Podrían darme más información?`
  )}`;

// Tarjeta con brillo que sigue al cursor
const PlanCard = ({ plan, onPreview }) => {
  const dark = plan.popular;
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <article
      data-plan-card
      onMouseMove={onMove}
      className={`group relative flex flex-col overflow-hidden rounded-3xl border p-7 md:p-8 transition-[transform,border-color] duration-500 hover:-translate-y-1.5 ${
        dark ? "bg-ink text-white border-ink" : "bg-white border-line hover:border-stone-300"
      }`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at var(--x, 50%) var(--y, 50%), ${
            dark ? "rgba(249,115,22,0.22)" : "rgba(249,115,22,0.09)"
          }, transparent 60%)`,
        }}
      />

      <div className="relative flex items-center justify-between">
        <span className={`text-xs font-semibold uppercase tracking-[0.2em] ${dark ? "text-stone-400" : "text-stone-500"}`}>
          {plan.tipo}
        </span>
        {plan.popular && (
          <span className="rounded-full bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
            Más popular
          </span>
        )}
      </div>

      <h3 className="relative mt-6 font-display text-2xl font-semibold tracking-tight">
        Plan {plan.nombre}
      </h3>
      <p className={`relative mt-2 text-sm ${dark ? "text-stone-400" : "text-stone-500"}`}>
        {plan.descripcion}
      </p>

      <div className="relative mt-8 flex items-end gap-2">
        <span className="font-display text-7xl font-semibold leading-none tracking-tighter">
          {plan.velocidad}
        </span>
        <span className="pb-1.5 text-sm leading-tight">
          <span className="block font-semibold">Mbps</span>
          <span className={dark ? "text-stone-400" : "text-stone-500"}>simétrico</span>
        </span>
      </div>

      <ul className={`relative mt-8 space-y-3 border-t pt-6 ${dark ? "border-white/10" : "border-line"}`}>
        {plan.caracteristicas.map((c) => (
          <li key={c} className="flex items-center gap-3 text-sm">
            <span className={`flex h-5 w-5 items-center justify-center rounded-full ${dark ? "bg-white/10" : "bg-sand"}`}>
              <FaCheck className="h-2.5 w-2.5 text-accent" />
            </span>
            {c}
          </li>
        ))}
      </ul>

      <div className="relative mt-auto pt-10">
        <div className="flex items-baseline gap-1">
          <span className="font-display text-4xl font-semibold tracking-tight">${plan.precio}</span>
          <span className={`text-sm ${dark ? "text-stone-400" : "text-stone-500"}`}>.00 / mes</span>
        </div>
        <p className={`mt-1 text-xs ${dark ? "text-stone-500" : "text-stone-400"}`}>{plan.incluye}</p>

        <div className="mt-6 flex items-center gap-2">
          <a
            href={whatsappLink(plan.nombre)}
            target="_blank"
            rel="noopener noreferrer"
            className={`group/btn flex flex-1 items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold transition-colors duration-300 ${
              dark ? "bg-accent text-white hover:bg-white hover:text-ink" : "bg-ink text-white hover:bg-accent"
            }`}
          >
            <FaWhatsapp className="h-4 w-4" />
            Consultar
          </a>
          <button
            onClick={() => onPreview(plan)}
            aria-label={`Ver afiche del Plan ${plan.nombre}`}
            title="Ver afiche"
            className={`flex h-12 w-12 items-center justify-center rounded-full border transition-colors duration-300 ${
              dark ? "border-white/15 hover:border-white" : "border-line hover:border-ink"
            }`}
          >
            <FaImage className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
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
      gsap.to(indicatorRef.current, {
        x: active.offsetLeft,
        width: active.offsetWidth,
        duration: animate && !prefersReducedMotion() ? 0.6 : 0,
        ease: "expo.out",
      });
    };
    place(true);
    const onResize = () => place(false);
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [tab]);

  // Entrada de las tarjetas (al hacer scroll y al cambiar de pestaña)
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        "[data-plan-card]",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "expo.out",
          stagger: 0.08,
          clearProps: "transform",
          scrollTrigger: { trigger: gridRef.current, start: "top 85%", once: true },
        }
      );
    },
    { scope: gridRef, dependencies: [tab], revertOnUpdate: true }
  );

  // Animación del modal del afiche
  useGSAP(
    () => {
      if (!preview) return;
      gsap.fromTo("[data-modal-bg]", { opacity: 0 }, { opacity: 1, duration: 0.4 });
      gsap.fromTo(
        "[data-modal-img]",
        { opacity: 0, y: 40, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "expo.out", delay: 0.05 }
      );
    },
    { scope: modalRef, dependencies: [preview] }
  );

  const closePreview = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => setPreview(null),
    });
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

  const title = "Internet simétrico para *cada momento.";

  return (
    <section id="planes" ref={scope} className="bg-sand text-ink">
      <div className="mx-auto max-w-7xl px-5 md:px-8 pt-32 md:pt-40 pb-24 md:pb-32">
        <Eyebrow index="03">Planes</Eyebrow>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2
            data-split
            aria-label={plain(title)}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[0.95] lg:col-span-8"
          >
            <SplitWords text={title} />
          </h2>
          <p data-reveal className="text-lg leading-relaxed text-stone-600 lg:col-span-4">
            Velocidad simétrica garantizada para tu hogar o negocio. Precios
            claros, sin sorpresas.
          </p>
        </div>

        {/* Pestañas */}
        <div data-reveal className="mt-14 overflow-x-auto">
          <div
            ref={tabsRef}
            role="tablist"
            aria-label="Filtrar planes"
            className="relative inline-flex rounded-full border border-line bg-white p-1"
          >
            <span
              ref={indicatorRef}
              aria-hidden="true"
              className="absolute left-0 top-1 bottom-1 rounded-full bg-ink"
              style={{ width: 0 }}
            />
            {tabs.map((t) => (
              <button
                key={t}
                data-tab={t}
                role="tab"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className={`relative z-10 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-500 ${
                  tab === t ? "text-white" : "text-stone-500 hover:text-ink"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Tarjetas */}
        <div ref={gridRef} className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visibles.map((plan) => (
            <PlanCard key={plan.id} plan={plan} onPreview={setPreview} />
          ))}
        </div>

        {/* Plan a medida */}
        <a
          data-reveal
          href={whatsappLink("a medida")}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-16 flex flex-col gap-6 border-t border-line pt-10 md:flex-row md:items-center md:justify-between"
        >
          <p className="font-display text-2xl md:text-4xl font-semibold tracking-tight">
            ¿No encuentras lo que buscas?{" "}
            <span className="text-stone-400 transition-colors duration-500 group-hover:text-accent">
              Armamos un plan a tu medida.
            </span>
          </p>
          <span className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-ink text-white transition-all duration-500 group-hover:bg-accent group-hover:-rotate-45">
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
          <div
            data-modal-bg
            className="absolute inset-0 bg-ink/90 backdrop-blur-sm"
            onClick={closePreview}
          />
          <div data-modal-img className="relative max-w-3xl">
            <img
              src={preview.imagen}
              alt={`Afiche del Plan ${preview.nombre}`}
              className="max-h-[82vh] w-auto rounded-2xl object-contain"
            />
            <button
              onClick={closePreview}
              aria-label="Cerrar"
              className="absolute -top-3 -right-3 flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink shadow-lg transition-colors hover:bg-accent hover:text-white"
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
