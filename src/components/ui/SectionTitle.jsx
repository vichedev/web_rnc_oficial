import SplitWords from "./SplitWords";
import { plain } from "../../utils/text";

/**
 * Encabezado de sección: etiqueta + título animado + subtítulo.
 * En el título, las palabras con "*" se pintan con el degradado naranja.
 */
const SectionTitle = ({
  eyebrow,
  icon: Icon,
  title,
  subtitle,
  dark = false,
  center = false,
  as = "h2",
  className = "",
}) => {
  const Tag = as;
  return (
  <div className={`${center ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
    {eyebrow && (
      <span
        data-reveal
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] ${
          dark
            ? "border-brand-light/30 bg-brand/10 text-brand-light"
            : "border-accent/20 bg-accent/10 text-accent-dark"
        }`}
      >
        {Icon ? <Icon className="h-3.5 w-3.5" /> : <span className="h-1.5 w-1.5 rounded-full bg-current" />}
        {eyebrow}
      </span>
    )}
    <Tag
      data-split
      aria-label={plain(title)}
      className={`mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.02] ${
        dark ? "text-white" : "text-ink"
      }`}
    >
      <SplitWords text={title} accentClass="text-gradient-brand" />
    </Tag>
    {subtitle && (
      <p
        data-reveal
        className={`mt-5 text-lg leading-relaxed ${center ? "mx-auto" : ""} max-w-2xl ${
          dark ? "text-blue-100/75" : "text-stone-600"
        }`}
      >
        {subtitle}
      </p>
    )}
  </div>
  );
};

export default SectionTitle;
