import { useMemo, useRef, useState } from "react";
import {
  FaFilm,
  FaGamepad,
  FaTv,
  FaCloudUploadAlt,
  FaVideo,
  FaTachometerAlt,
} from "react-icons/fa";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "../lib/gsap";
import useReveal from "../hooks/useReveal";
import SectionTitle from "./ui/SectionTitle";
import planes from "../data/planes";

const MAX = 200;

const tasks = [
  { icon: FaFilm, label: "Descargar una película HD", size: 4, unit: "4 GB" },
  { icon: FaTv, label: "Descargar una temporada de serie", size: 20, unit: "20 GB" },
  { icon: FaGamepad, label: "Descargar un videojuego", size: 60, unit: "60 GB" },
  { icon: FaCloudUploadAlt, label: "Subir 200 fotos a la nube", size: 1, unit: "1 GB" },
];

// Tiempo teórico en segundos: GB → megabits / Mbps
const seconds = (gb, mbps) => (gb * 8000) / mbps;

const formatTime = (s) => {
  if (s < 60) return `${Math.round(s)} s`;
  const m = Math.floor(s / 60);
  const rest = Math.round(s % 60);
  if (m < 60) return rest ? `${m} min ${rest} s` : `${m} min`;
  const h = Math.floor(m / 60);
  return `${h} h ${m % 60} min`;
};

// Arco del velocímetro (semicírculo)
const R = 120;
const ARC = Math.PI * R;

const SpeedCalc = () => {
  const scope = useRef(null);
  const gaugeRef = useRef(null);
  const speeds = useMemo(() => [...new Set(planes.map((p) => p.velocidad))].sort((a, b) => a - b), []);
  const [speed, setSpeed] = useState(75);
  const [visible, setVisible] = useState(false);
  const readout = useRef({ value: 0 });
  const plansAtSpeed = planes.filter((p) => p.velocidad === speed).map((p) => p.nombre);

  useReveal(scope);

  // Empieza a animar cuando el velocímetro entra en pantalla
  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: gaugeRef.current,
        start: "top 85%",
        once: true,
        onEnter: () => setVisible(true),
      });
    },
    { scope }
  );

  // Aguja, arco, número y barras siguen a la velocidad elegida
  useGSAP(
    () => {
      if (!visible) return;
      const d = prefersReducedMotion() ? 0 : 1.2;
      const ratio = speed / MAX;
      const opts = { duration: d, overwrite: "auto" };

      gsap.to("[data-needle]", { ...opts, rotation: -90 + ratio * 180, svgOrigin: "150 150", ease: "elastic.out(1, 0.6)" });
      gsap.to("[data-arc]", { ...opts, strokeDashoffset: ARC * (1 - ratio), ease: "expo.out" });
      gsap.to(readout.current, {
        ...opts,
        value: speed,
        ease: "expo.out",
        onUpdate: () => {
          const el = scope.current?.querySelector("[data-readout]");
          if (el) el.textContent = Math.round(readout.current.value);
        },
      });
      scope.current.querySelectorAll("[data-bar]").forEach((bar) => {
        gsap.to(bar, { ...opts, scaleX: parseFloat(bar.dataset.bar), ease: "expo.out" });
      });
    },
    { scope, dependencies: [speed, visible] }
  );

  return (
    <section ref={scope} id="calculadora" className="relative overflow-hidden bg-white text-ink">
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-70 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <SectionTitle
          center
          eyebrow="Calculadora de velocidad"
          icon={FaTachometerAlt}
          title="¿Qué puedes hacer con *cada plan?"
          subtitle="Elige una velocidad y descubre cuánto tardas en descargar tus cosas favoritas y cuántas pantallas puedes conectar a la vez."
        />

        {/* Selector */}
        <div data-reveal className="mt-12 flex flex-wrap justify-center gap-3">
          {speeds.map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              aria-pressed={speed === s}
              className={`rounded-2xl border px-6 py-3 font-display text-lg font-bold transition-all duration-300 ${
                speed === s
                  ? "border-transparent bg-navy text-white shadow-xl shadow-navy/25 scale-105"
                  : "border-stone-200 bg-white text-stone-600 hover:border-brand hover:text-brand"
              }`}
            >
              {s} <span className="text-sm font-semibold opacity-70">Mbps</span>
            </button>
          ))}
        </div>

        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-5">
          {/* Velocímetro */}
          <div
            ref={gaugeRef}
            data-reveal
            className="relative flex flex-col items-center justify-center overflow-hidden rounded-[2rem] bg-navy px-6 py-10 text-white lg:col-span-2"
          >
            <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-70" />
            <div className="pointer-events-none absolute -bottom-20 h-60 w-60 rounded-full bg-accent/30 blur-[90px]" />
            <svg viewBox="0 0 300 175" className="relative w-full max-w-sm" aria-hidden="true">
              <defs>
                <linearGradient id="gauge" x1="0" x2="1">
                  <stop offset="0%" stopColor="#5b9bff" />
                  <stop offset="55%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
              </defs>
              <path d="M30 150 A120 120 0 0 1 270 150" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="18" strokeLinecap="round" />
              <path
                data-arc
                d="M30 150 A120 120 0 0 1 270 150"
                fill="none"
                stroke="url(#gauge)"
                strokeWidth="18"
                strokeLinecap="round"
                strokeDasharray={ARC}
                strokeDashoffset={ARC}
                style={{ filter: "drop-shadow(0 0 10px rgba(249,115,22,0.6))" }}
              />
              {[0, 50, 100, 150, 200].map((v) => {
                const a = Math.PI - (v / MAX) * Math.PI;
                const x = 150 + Math.cos(a) * 92;
                const y = 150 - Math.sin(a) * 92;
                return (
                  <text key={v} x={x} y={y} fill="rgba(219,234,254,0.55)" fontSize="11" textAnchor="middle" dominantBaseline="middle">
                    {v}
                  </text>
                );
              })}
              <g data-needle transform="rotate(-90 150 150)">
                <line x1="150" y1="150" x2="150" y2="52" stroke="white" strokeWidth="4" strokeLinecap="round" />
              </g>
              <circle cx="150" cy="150" r="10" fill="#f97316" stroke="white" strokeWidth="3" />
            </svg>
            <p className="relative -mt-2 font-display text-6xl font-bold tracking-tight">
              <span data-readout>0</span>
              <span className="ml-2 text-xl text-blue-100/70">Mbps</span>
            </p>
            <p className="relative mt-2 text-sm text-blue-100/70">
              Subida y bajada · {plansAtSpeed.map((n) => `Plan ${n}`).join(" · ")}
            </p>
          </div>

          {/* Resultados */}
          <div data-reveal className="flex flex-col gap-4 rounded-[2rem] border border-stone-200 bg-white p-6 shadow-xl shadow-navy/5 md:p-8 lg:col-span-3">
            {tasks.map((t) => {
              const Icon = t.icon;
              const time = seconds(t.size, speed);
              // Escala logarítmica respecto a la tarea más lenta en el plan más lento
              const worst = seconds(Math.max(...tasks.map((x) => x.size)), speeds[0]);
              const ratio = Math.log1p(time) / Math.log1p(worst);
              return (
                <div key={t.label}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-3 text-sm sm:text-base font-semibold">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent">
                        <Icon className="h-4 w-4" />
                      </span>
                      {t.label}
                      <span className="hidden sm:inline text-xs font-normal text-stone-400">({t.unit})</span>
                    </span>
                    <span className="whitespace-nowrap font-display text-base sm:text-lg font-bold text-navy">{formatTime(time)}</span>
                  </div>
                  <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-stone-100">
                    <div
                      data-bar={Math.max(ratio, 0.04)}
                      className="h-full origin-left rounded-full bg-gradient-to-r from-brand via-accent to-amber-400"
                      style={{ transform: "scaleX(0)" }}
                    />
                  </div>
                </div>
              );
            })}

            <div className="mt-2 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-gradient-to-br from-accent to-amber-500 p-5 text-white">
                <FaTv className="h-5 w-5 opacity-80" />
                <p className="mt-3 font-display text-3xl font-bold">{Math.floor(speed / 25)}</p>
                <p className="text-sm text-white/85">pantallas en 4K a la vez</p>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-brand to-brand-light p-5 text-white">
                <FaVideo className="h-5 w-5 opacity-80" />
                <p className="mt-3 font-display text-3xl font-bold">{Math.floor(speed / 4)}</p>
                <p className="text-sm text-white/85">videollamadas HD simultáneas</p>
              </div>
            </div>
            <p className="text-xs text-stone-400">
              Tiempos y capacidades teóricos a la velocidad contratada. Pueden variar según el equipo, el WiFi y el servidor de origen.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpeedCalc;
