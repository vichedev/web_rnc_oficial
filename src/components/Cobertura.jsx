import { useRef, useState } from "react";
import { FaMapMarkedAlt, FaMapMarkerAlt, FaWhatsapp, FaHome, FaBuilding } from "react-icons/fa";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/gsap";
import useReveal from "../hooks/useReveal";
import SectionTitle from "./ui/SectionTitle";

// Puntos decorativos del radar (posiciones fijas para que no cambien en cada render)
const nodes = [
  [22, 30], [35, 18], [64, 22], [78, 38], [70, 66], [52, 80], [28, 70], [16, 52],
  [44, 40], [58, 52], [40, 60], [84, 58], [60, 34], [30, 44], [48, 26], [72, 80],
];

const Radar = () => {
  const ref = useRef(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.to("[data-sweep]", { rotation: 360, duration: 6, repeat: -1, ease: "none", transformOrigin: "50% 50%" });
      gsap.fromTo(
        "[data-ring]",
        { scale: 0.2, opacity: 0.9 },
        { scale: 1, opacity: 0, duration: 3.6, repeat: -1, ease: "power1.out", stagger: { each: 1.2, repeat: -1 } }
      );
      gsap.fromTo(
        "[data-node]",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(3)",
          stagger: { each: 0.08, from: "center" },
          scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
        }
      );
      gsap.to("[data-node]", { opacity: 0.35, duration: 1.2, yoyo: true, repeat: -1, ease: "sine.inOut", stagger: { each: 0.25, from: "random" }, delay: 1.5 });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className="relative mx-auto aspect-square w-full max-w-md">
      <div className="absolute inset-0 rounded-full border border-brand-light/25 bg-[radial-gradient(circle,rgba(31,107,255,0.25)_0%,rgba(5,15,44,0)_70%)]" />
      <div className="absolute inset-[16%] rounded-full border border-brand-light/20" />
      <div className="absolute inset-[33%] rounded-full border border-brand-light/20" />
      <div className="absolute left-1/2 top-0 h-full w-px bg-brand-light/15" />
      <div className="absolute top-1/2 left-0 h-px w-full bg-brand-light/15" />
      {[0, 1, 2].map((i) => (
        <span key={i} data-ring className="absolute inset-0 rounded-full border-2 border-accent/60 opacity-0" />
      ))}
      <div
        data-sweep
        className="absolute inset-0 rounded-full"
        style={{ background: "conic-gradient(from 0deg, rgba(249,115,22,0.45), rgba(249,115,22,0) 70deg, transparent 360deg)" }}
      />
      {nodes.map(([x, y], i) => (
        <span
          key={i}
          data-node
          className={`absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${
            i % 4 === 0 ? "bg-brand-light shadow-[0_0_12px_#5b9bff]" : "bg-accent shadow-[0_0_12px_#f97316]"
          }`}
          style={{ left: `${x}%`, top: `${y}%` }}
        />
      ))}
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-accent to-amber-500 text-white shadow-[0_0_40px_rgba(249,115,22,0.7)]">
          <FaMapMarkerAlt className="h-6 w-6" />
        </span>
        <span className="mt-2 rounded-full bg-white px-3 py-1 text-xs font-bold text-navy shadow-lg">Puebloviejo</span>
      </div>
    </div>
  );
};

const Cobertura = () => {
  const scope = useRef(null);
  const [form, setForm] = useState({ nombre: "", sector: "", tipo: "Hogar" });
  useReveal(scope);

  const submit = (e) => {
    e.preventDefault();
    const msg = `¡Hola! Soy ${form.nombre || "un cliente interesado"}. Quiero saber si tienen cobertura en ${
      form.sector
    } para internet de ${form.tipo.toLowerCase()}.`;
    window.open(`https://wa.me/59343755230?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  };

  const input =
    "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3.5 text-white placeholder:text-blue-100/40 outline-none transition-colors focus:border-accent focus:bg-white/10";

  return (
    <section ref={scope} id="cobertura" className="relative overflow-hidden bg-navy text-white">
      <div className="pointer-events-none absolute inset-0 bg-tech-grid [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="pointer-events-none absolute right-0 top-0 h-[28rem] w-[28rem] rounded-full bg-brand/30 blur-[140px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 py-24 md:px-8 md:py-32 lg:grid-cols-2">
        <div>
          <SectionTitle
            dark
            eyebrow="Cobertura"
            icon={FaMapMarkedAlt}
            title="¿Llegamos a *tu zona?"
            subtitle="Tenemos cobertura en más de 50 zonas urbanas y rurales de Puebloviejo y sus alrededores, y seguimos expandiendo la red. Consulta en segundos."
          />

          <form data-reveal onSubmit={submit} className="mt-10 space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur md:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-blue-100/80">Tu nombre</span>
                <input
                  className={input}
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  placeholder="Ej. María López"
                  autoComplete="name"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-blue-100/80">Sector o barrio *</span>
                <input
                  required
                  className={input}
                  value={form.sector}
                  onChange={(e) => setForm({ ...form, sector: e.target.value })}
                  placeholder="Ej. Centro, San Juan…"
                />
              </label>
            </div>
            <fieldset>
              <legend className="mb-2 text-sm font-semibold text-blue-100/80">Tipo de servicio</legend>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { v: "Hogar", icon: FaHome },
                  { v: "Negocio", icon: FaBuilding },
                ].map(({ v, icon }) => {
                  const Icon = icon;
                  return (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setForm({ ...form, tipo: v })}
                    aria-pressed={form.tipo === v}
                    className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 font-semibold transition-all ${
                      form.tipo === v
                        ? "border-accent bg-accent/15 text-white"
                        : "border-white/15 text-blue-100/70 hover:border-white/40"
                    }`}
                  >
                    <Icon className="h-4 w-4" /> {v}
                  </button>
                  );
                })}
              </div>
            </fieldset>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-amber-500 py-4 font-bold shadow-lg shadow-accent/30 transition-transform hover:-translate-y-0.5"
            >
              <FaWhatsapp className="h-5 w-5" /> Consultar cobertura por WhatsApp
            </button>
          </form>
        </div>

        <div data-reveal className="relative">
          <Radar />
          <div className="mt-8 flex flex-wrap justify-center gap-5 text-sm text-blue-100/80">
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_10px_#f97316]" /> Zonas con servicio
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-brand-light shadow-[0_0_10px_#5b9bff]" /> En expansión
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cobertura;
