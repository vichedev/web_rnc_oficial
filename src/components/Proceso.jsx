import { useRef } from "react";
import { FaListUl, FaWhatsapp, FaTools, FaRocket, FaRoute } from "react-icons/fa";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/gsap";
import useReveal from "../hooks/useReveal";
import SectionTitle from "./ui/SectionTitle";

const steps = [
  {
    icon: FaListUl,
    title: "Elige tu plan",
    text: "Compara velocidades y precios, y escoge el plan que mejor va contigo.",
  },
  {
    icon: FaWhatsapp,
    title: "Escríbenos",
    text: "Contáctanos por WhatsApp o llamada. Verificamos la cobertura en tu dirección.",
  },
  {
    icon: FaTools,
    title: "Instalamos en 48 h",
    text: "Técnicos certificados instalan la fibra y el equipo WiFi sin costo de instalación.",
  },
  {
    icon: FaRocket,
    title: "¡A navegar!",
    text: "Disfruta internet simétrico, estable y sin límites desde el primer día.",
  },
];

const Proceso = () => {
  const scope = useRef(null);
  useReveal(scope);

  // La línea de progreso se dibuja con el scroll y enciende cada paso
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: "[data-steps]", start: "top 75%", end: "bottom 55%", scrub: 0.6 },
      });
      tl.fromTo("[data-progress]", { scaleX: 0, scaleY: 0 }, { scaleX: 1, scaleY: 1, ease: "none", duration: 1 }, 0);
      gsap.utils.toArray("[data-step-dot]").forEach((dot, i, all) => {
        tl.fromTo(
          dot,
          { backgroundColor: "#e7e5e4", color: "#78716c", scale: 0.9 },
          { backgroundColor: "#f97316", color: "#ffffff", scale: 1, duration: 0.15, ease: "back.out(3)" },
          (i / Math.max(all.length - 1, 1)) * 0.9
        );
      });
    },
    { scope }
  );

  return (
    <section ref={scope} id="proceso" className="bg-paper text-ink">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <SectionTitle
          center
          eyebrow="Cómo contratar"
          icon={FaRoute}
          title="Conéctate en *4 pasos"
          subtitle="Contratar internet con nosotros es rápido y sin complicaciones."
        />

        <ol data-steps className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
          {/* Línea base + progreso (horizontal en escritorio, vertical en móvil) */}
          <span className="absolute left-7 top-7 bottom-7 w-[3px] rounded bg-stone-200 md:bottom-auto md:left-[12.5%] md:right-[12.5%] md:h-[3px] md:w-auto" />
          <span
            data-progress
            className="absolute left-7 top-7 bottom-7 w-[3px] origin-top rounded bg-gradient-to-b from-accent to-amber-400 md:bottom-auto md:left-[12.5%] md:right-[12.5%] md:h-[3px] md:w-auto md:origin-left md:bg-gradient-to-r"
          />
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <li key={s.title} data-reveal className="relative flex gap-5 md:flex-col md:items-center md:text-center">
                <span
                  data-step-dot
                  className="relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-accent text-white shadow-lg ring-8 ring-paper"
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Paso {i + 1}</span>
                  <h3 className="mt-1 font-display text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-stone-600 leading-relaxed">{s.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default Proceso;
