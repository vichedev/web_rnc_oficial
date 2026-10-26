/** Texto que "rueda" hacia arriba al pasar el cursor por el elemento padre (.group). */
const RollText = ({ children }) => (
  <span className="relative inline-flex overflow-hidden">
    <span className="transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:-translate-y-full">
      {children}
    </span>
    <span
      aria-hidden="true"
      className="absolute left-0 top-full transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:-translate-y-full"
    >
      {children}
    </span>
  </span>
);

export default RollText;
