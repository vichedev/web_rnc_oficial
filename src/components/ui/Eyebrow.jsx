/** Etiqueta pequeña de sección: (01) ── NOMBRE */
const Eyebrow = ({ index, children, dark = false, className = "" }) => (
  <div data-reveal className={`flex items-center gap-4 ${className}`}>
    <span className={`font-display text-sm ${dark ? "text-stone-500" : "text-stone-400"}`}>
      ({index})
    </span>
    <span className={`h-px w-10 ${dark ? "bg-white/20" : "bg-line"}`} />
    <span
      className={`text-xs font-semibold uppercase tracking-[0.25em] ${
        dark ? "text-stone-300" : "text-stone-500"
      }`}
    >
      {children}
    </span>
  </div>
);

export default Eyebrow;
