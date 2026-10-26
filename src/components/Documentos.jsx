import { useMemo, useRef, useState } from "react";
import { FaSearch, FaArrowRight, FaDownload, FaTimes, FaFolderOpen, FaFilePdf, FaBalanceScale, FaShieldAlt } from "react-icons/fa";
import documentosData from "../data/documents";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/gsap";
import useReveal from "../hooks/useReveal";
import SectionTitle from "./ui/SectionTitle";

const normalize = (text) =>
  text.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

const Documentos = () => {
  const scope = useRef(null);
  const listRef = useRef(null);
  const [categoria, setCategoria] = useState("Todos");
  const [query, setQuery] = useState("");

  useReveal(scope);

  const categorias = useMemo(() => {
    const counts = documentosData.reduce((acc, d) => {
      acc[d.categoria] = (acc[d.categoria] || 0) + 1;
      return acc;
    }, {});
    return [["Todos", documentosData.length], ...Object.entries(counts)];
  }, []);

  const filtrados = useMemo(() => {
    const q = normalize(query.trim());
    return documentosData.filter(
      (d) =>
        (categoria === "Todos" || d.categoria === categoria) &&
        (!q || normalize(`${d.title} ${d.description}`).includes(q))
    );
  }, [categoria, query]);

  // Las filas entran en cascada al cargar y al filtrar
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        "[data-doc-row]",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.035,
          clearProps: "transform",
          scrollTrigger: { trigger: listRef.current, start: "top 90%", once: true },
        }
      );
    },
    { scope: listRef, dependencies: [categoria, query], revertOnUpdate: true }
  );

  const title = "Centro de *documentos";

  return (
    <section id="documentos" ref={scope} className="min-h-screen bg-paper text-ink">
      {/* Cabecera */}
      <div className="relative overflow-hidden bg-navy text-white">
        <div className="pointer-events-none absolute inset-0 bg-tech-grid [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
        <div className="pointer-events-none absolute -right-32 -top-32 h-[26rem] w-[26rem] rounded-full bg-brand/35 blur-[130px]" />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-accent/20 blur-[110px]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 pt-36 pb-20 md:px-8 md:pt-44 lg:grid-cols-12 lg:items-end">
          <SectionTitle
            dark
            as="h1"
            eyebrow="Transparencia"
            icon={FaFolderOpen}
            title={title}
            subtitle="Toda nuestra documentación legal, normativa y técnica en un solo lugar. Consulta o descarga lo que necesites."
            className="lg:col-span-8"
          />
          <ul data-reveal className="grid grid-cols-3 gap-3 lg:col-span-4">
            {[
              { icon: FaFilePdf, value: documentosData.length, label: "Documentos" },
              { icon: FaBalanceScale, value: categorias.length - 1, label: "Categorías" },
              { icon: FaShieldAlt, value: "ARCOTEL", label: "Normativa" },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <li key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <Icon className="h-4 w-4 text-accent" />
                  <p className="mt-3 font-display text-xl font-bold">{s.value}</p>
                  <p className="text-xs text-blue-100/60">{s.label}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 md:px-8 pb-24 md:pb-32">
        {/* Buscador y filtros */}
        <div data-reveal className="mt-12 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {categorias.map(([nombre, total]) => {
              const active = categoria === nombre;
              return (
                <button
                  key={nombre}
                  onClick={() => setCategoria(nombre)}
                  aria-pressed={active}
                  className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    active
                      ? "border-transparent bg-gradient-to-r from-accent to-amber-500 text-white shadow-lg shadow-accent/25"
                      : "border-line bg-white text-stone-600 hover:border-stone-400 hover:text-ink"
                  }`}
                >
                  {nombre}
                  <span className={`text-xs ${active ? "text-white/80" : "text-stone-400"}`}>{total}</span>
                </button>
              );
            })}
          </div>

          <label className="relative block w-full lg:w-80">
            <span className="sr-only">Buscar documento</span>
            <FaSearch className="pointer-events-none absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-stone-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar documento…"
              className="w-full rounded-full border border-line bg-white py-3 pl-11 pr-10 text-sm outline-none transition-colors placeholder:text-stone-400 focus:border-ink"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Limpiar búsqueda"
                className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-stone-400 hover:bg-sand hover:text-ink"
              >
                <FaTimes className="h-3 w-3" />
              </button>
            )}
          </label>
        </div>

        <p className="mt-10 text-sm text-stone-500" aria-live="polite">
          {filtrados.length} documento{filtrados.length !== 1 ? "s" : ""}
        </p>

        {/* Lista */}
        <ul ref={listRef} className="mt-4 border-t border-ink">
          {filtrados.map((doc, i) => (
            <li key={doc.id} data-doc-row className="group border-b border-line">
              <div className="grid grid-cols-12 items-center gap-4 py-6 md:py-7 transition-[padding] duration-500 md:group-hover:px-4">
                <span className="col-span-2 md:col-span-1 font-display text-sm text-stone-400">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <a
                  href={doc.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="col-span-10 md:col-span-6"
                >
                  <h3 className="font-display text-lg md:text-xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-accent">
                    {doc.title}
                  </h3>
                  <p className="mt-1 text-sm text-stone-500 line-clamp-1">{doc.description}</p>
                </a>

                <div className="col-span-12 col-start-3 md:col-span-3 md:col-start-auto flex items-center gap-3 text-sm">
                  <span className="rounded-full bg-sand px-3 py-1 text-stone-600">{doc.categoria}</span>
                  <span className="text-stone-400">{doc.tamaño}</span>
                </div>

                <div className="col-span-12 col-start-3 md:col-span-2 md:col-start-auto flex items-center gap-2 md:justify-end">
                  <a
                    href={doc.pdfUrl}
                    download
                    aria-label={`Descargar ${doc.title}`}
                    title="Descargar"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-stone-600 transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-white"
                  >
                    <FaDownload className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href={doc.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Ver ${doc.title}`}
                    title="Ver"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white transition-all duration-500 group-hover:-rotate-45 group-hover:bg-accent"
                  >
                    <FaArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {filtrados.length === 0 && (
          <div className="py-20 text-center">
            <p className="font-display text-3xl font-semibold tracking-tight">
              Sin resultados
            </p>
            <p className="mt-2 text-stone-500">
              Prueba con otra palabra o revisa todas las categorías.
            </p>
            <button
              onClick={() => {
                setQuery("");
                setCategoria("Todos");
              }}
              className="mt-6 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent"
            >
              Ver todos los documentos
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Documentos;
