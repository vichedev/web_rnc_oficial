/**
 * Divide un texto en palabras para animarlas con GSAP.
 * Las palabras que empiezan con "*" se pintan con el color de acento.
 */
const SplitWords = ({ text, accentClass = "text-accent" }) => (
  <>
    {text.split(" ").map((raw, i, arr) => {
      const accent = raw.startsWith("*");
      const word = accent ? raw.slice(1) : raw;
      return (
        <span key={i} className="split-word" aria-hidden="true">
          <span className={accent ? accentClass : undefined}>
            {word}
            {i < arr.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      );
    })}
  </>
);

export default SplitWords;
