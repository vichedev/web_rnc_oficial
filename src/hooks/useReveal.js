import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "../lib/gsap";

const format = (value, decimals) =>
  value.toLocaleString("es-EC", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

/**
 * Animaciones de scroll reutilizables dentro de `scope`:
 *  - [data-split]   títulos divididos en palabras (<SplitWords />) que suben
 *  - [data-reveal]  elementos que aparecen en cascada
 *  - [data-counter] números que cuentan hasta su valor (data-decimals opcional)
 *  - [data-line]    líneas finas que se dibujan de izquierda a derecha
 *  - [data-speed]   desplazamiento suave tipo parallax (ej. data-speed="0.15")
 */
export default function useReveal(scope, dependencies = []) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const all = (sel) => Array.from(root.querySelectorAll(sel));

      if (prefersReducedMotion()) {
        gsap.set(all("[data-reveal]"), { opacity: 1 });
        return;
      }

      all("[data-split]").forEach((el) => {
        gsap.fromTo(
          el.querySelectorAll(".split-word > span"),
          { yPercent: 115 },
          {
            yPercent: 0,
            duration: 1.2,
            ease: "expo.out",
            stagger: 0.045,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });

      const reveals = all("[data-reveal]");
      if (reveals.length) {
        ScrollTrigger.batch(reveals, {
          start: "top 92%",
          once: true,
          onEnter: (batch) =>
            gsap.fromTo(
              batch,
              { opacity: 0, y: 40 },
              { opacity: 1, y: 0, stagger: 0.08, duration: 1, overwrite: true }
            ),
        });
      }

      all("[data-counter]").forEach((el) => {
        const end = parseFloat(el.dataset.counter);
        const decimals = Number(el.dataset.decimals || 0);
        const counter = { value: 0 };
        el.textContent = format(0, decimals);
        gsap.to(counter, {
          value: end,
          duration: 2.2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
          onUpdate: () => (el.textContent = format(counter.value, decimals)),
        });
      });

      all("[data-line]").forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: "left center",
            duration: 1.4,
            ease: "expo.inOut",
            scrollTrigger: { trigger: el, start: "top 94%", once: true },
          }
        );
      });

      all("[data-speed]").forEach((el) => {
        gsap.to(el, {
          yPercent: () => parseFloat(el.dataset.speed) * -100,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope, dependencies, revertOnUpdate: true }
  );
}
