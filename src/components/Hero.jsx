import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/gsap";

/*
 * Hero "Red Nueva Conexión" — mismo concepto del parallax original
 * (túnel, cables, logo y partículas) convertido en una escena cinematográfica:
 *  1. Preloader con contador mientras cargan las capas.
 *  2. Intro: el túnel se enfoca, los cables entran y el título aparece letra a letra.
 *  3. Mouse: cada capa se desplaza según su profundidad (parallax 3D real).
 * Al hacer scroll no hay animación: la página baja de forma normal.
 * La versión original sigue disponible en HeroClassic.jsx.
 */

const IMAGES = {
  tunnel: "/images/layer-1.webp",
  cables: "/images/layer-2.webp",
  logo: "/images/layer-5.webp",
  bokeh: "/images/layer-6.webp",
};

const TITLE = ["Red", "Nueva", "Conexión"];

// Recortes del PNG de cables para separar el cable superior del inferior
const CLIP_TOP = "polygon(0% 0%, 100% 0%, 100% 52%, 0% 44%)";
const CLIP_BOTTOM = "polygon(0% 44%, 100% 52%, 100% 100%, 0% 100%)";

// Desvanecen los extremos de cada cable para que nunca se vea el corte de la imagen
const fade = (a, b) => ({
  maskImage: `linear-gradient(${a}, transparent 0%, #000 16%), linear-gradient(${b}, transparent 0%, #000 14%)`,
  WebkitMaskImage: `linear-gradient(${a}, transparent 0%, #000 16%), linear-gradient(${b}, transparent 0%, #000 14%)`,
  maskComposite: "intersect",
  WebkitMaskComposite: "source-in",
});
const CABLE_TOP_STYLE = { clipPath: CLIP_TOP, ...fade("to left", "to bottom") };
const CABLE_BOTTOM_STYLE = { clipPath: CLIP_BOTTOM, ...fade("to right", "to top") };

// La intro larga (con preloader) solo se reproduce la primera vez
let introPlayed = false;

/** Precarga las capas y devuelve el progreso (0 a 1). */
const usePreload = (urls) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let loaded = 0;
    let alive = true;
    urls.forEach((src) => {
      const img = new Image();
      const done = () => {
        loaded += 1;
        if (alive) setProgress(loaded / urls.length);
      };
      img.onload = done;
      img.onerror = done;
      img.src = src;
    });
    return () => {
      alive = false;
    };
  }, [urls]);
  return progress;
};

/** Partículas "warp" que salen disparadas desde el centro del túnel. */
const WarpField = ({ speed }) => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || prefersReducedMotion()) return;
    const ctx = canvas.getContext("2d");
    const colors = ["251,146,60", "253,186,116", "96,165,250", "255,255,255"];
    const count = window.innerWidth < 768 ? 90 : 220;
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const reset = (s, initial = false) => {
      s.x = (Math.random() * 2 - 1) * w;
      s.y = (Math.random() * 2 - 1) * h;
      s.z = initial ? Math.random() * w : w;
      s.pz = s.z;
      s.c = colors[Math.floor(Math.random() * colors.length)];
    };

    resize();
    const stars = Array.from({ length: count }, () => {
      const s = {};
      reset(s, true);
      return s;
    });

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden) return;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      const cx = w / 2;
      const cy = h / 2;
      const fov = w * 0.5;
      const v = (speed.current.intro + speed.current.scroll) * w * 0.0035;

      for (const s of stars) {
        s.pz = s.z;
        s.z -= v;
        if (s.z < 1) {
          reset(s);
          continue;
        }
        const sx = cx + (s.x / s.z) * fov;
        const sy = cy + (s.y / s.z) * fov;
        if (sx < 0 || sx > w || sy < 0 || sy > h) {
          reset(s);
          continue;
        }
        const px = cx + (s.x / s.pz) * fov;
        const py = cy + (s.y / s.pz) * fov;
        const depth = 1 - s.z / w;
        ctx.strokeStyle = `rgba(${s.c},${depth * 0.85})`;
        ctx.lineWidth = depth * 2.2;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();
      }
    };
    frame();

    // Pausar cuando el hero no está en pantalla
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [speed]);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
};

/** Capa de la escena: el contenedor interno se desplaza con el mouse según su profundidad. */
const Layer = ({ name, depth, children, className = "" }) => (
  <div data-layer={name} className={`absolute inset-0 ${className}`}>
    <div data-depth={depth} className="absolute -inset-[5%]">
      {children}
    </div>
  </div>
);

const Hero = () => {
  const root = useRef(null);
  const loaderRef = useRef(null);
  const countRef = useRef(null);
  const loaderInnerRef = useRef(null);
  const speed = useRef({ intro: 1, scroll: 0 });
  const [urls] = useState(() => Object.values(IMAGES));
  const progress = usePreload(urls);
  const ready = progress >= 1;
  const [skipLoader] = useState(() => introPlayed);

  // Contador del preloader mientras cargan las imágenes
  const counter = useRef({ value: 0 });
  useGSAP(
    () => {
      if (skipLoader) return;
      gsap.to(counter.current, {
        value: progress * 90,
        duration: 0.6,
        ease: "power2.out",
        onUpdate: () => {
          if (countRef.current)
            countRef.current.textContent = String(Math.round(counter.current.value)).padStart(3, "0");
        },
      });
    },
    { dependencies: [progress] }
  );

  // Intro + parallax con el mouse (al hacer scroll la página baja normal)
  useGSAP(
    () => {
      if (!ready) return;
      const q = gsap.utils.selector(root);
      const reduce = prefersReducedMotion();

      if (reduce) {
        gsap.set(loaderRef.current, { autoAlpha: 0 });
        return;
      }

      gsap.set(q("[data-layer='cable-top']"), { xPercent: 4, yPercent: -5 });
      gsap.set(q("[data-layer='cable-bottom']"), { xPercent: -4, yPercent: 7 });

      // ---------- 1. Intro ----------
      const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
      if (!skipLoader) {
        intro
          .to(counter.current, {
            value: 100,
            duration: 0.5,
            ease: "power2.inOut",
            onUpdate: () => {
              if (countRef.current)
                countRef.current.textContent = String(Math.round(counter.current.value)).padStart(3, "0");
            },
          })
          .to(loaderInnerRef.current, { yPercent: -100, opacity: 0, duration: 0.6, ease: "power3.in" })
          .to(loaderRef.current, { clipPath: "inset(0% 0% 100% 0%)", duration: 1.1, ease: "expo.inOut" }, "-=0.15")
          .set(loaderRef.current, { autoAlpha: 0 });
      }
      intro
        .from(q("[data-intro='tunnel']"), { scale: 1.8, filter: "blur(24px) brightness(0.2)", duration: 2.4 }, skipLoader ? 0 : "-=0.8")
        .from(q("[data-intro='cable-top']"), { xPercent: 45, yPercent: -25, opacity: 0, duration: 2 }, "<0.35")
        .from(q("[data-intro='cable-bottom']"), { xPercent: -45, yPercent: 25, opacity: 0, duration: 2 }, "<")
        .from(q("[data-intro='logo']"), { scale: 0.2, rotate: -120, opacity: 0, duration: 1.8, ease: "back.out(1.3)" }, "<0.3")
        .from(q("[data-intro='bokeh']"), { opacity: 0, scale: 1.4, duration: 2 }, "<")
        .from(q("[data-char]"), { yPercent: 130, rotateX: -90, opacity: 0, stagger: 0.035, duration: 1.3 }, "<0.25")
        .from(q("[data-hero-fade]"), { opacity: 0, y: 24, stagger: 0.1, duration: 1.2 }, "<0.5")
        .fromTo(speed.current, { intro: 14 }, { intro: 1, duration: 3, ease: "power2.out" }, skipLoader ? 0 : 1.4);
      introPlayed = true;

      const cleanups = [];

      // ---------- 2. Parallax con el mouse ----------
      if (window.matchMedia("(hover: hover)").matches) {
        const movers = q("[data-depth]").map((el) => ({
          depth: parseFloat(el.dataset.depth),
          x: gsap.quickTo(el, "x", { duration: 1.2, ease: "power3.out" }),
          y: gsap.quickTo(el, "y", { duration: 1.2, ease: "power3.out" }),
        }));
        const onMove = (e) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          movers.forEach((m) => {
            m.x(-nx * m.depth);
            m.y(-ny * m.depth);
          });
        };
        window.addEventListener("mousemove", onMove);
        cleanups.push(() => window.removeEventListener("mousemove", onMove));
      }

      return () => cleanups.forEach((fn) => fn());
    },
    { scope: root, dependencies: [ready] }
  );

  return (
    <section
      id="inicio"
      ref={root}
      aria-label="Red Nueva Conexión"
      className="relative h-[100svh] min-h-[560px] overflow-hidden bg-ink text-white"
    >
      <div className="absolute inset-0 overflow-hidden">
      <div data-scene className="absolute inset-0">
        {/* 1. Túnel */}
        <Layer name="tunnel" depth={14}>
          <img
            data-intro="tunnel"
            src={IMAGES.tunnel}
            alt=""
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </Layer>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(12,10,9,0.75)_100%)]" />

        {/* 2. Velocidad warp */}
        <WarpField speed={speed} />

        {/* 3. Cables (se separan del mismo PNG) */}
        <Layer name="cable-top" depth={40}>
          <img
            data-intro="cable-top"
            src={IMAGES.cables}
            alt=""
            decoding="async"
            className="h-full w-full object-cover"
            style={CABLE_TOP_STYLE}
          />
        </Layer>
        <Layer name="cable-bottom" depth={55}>
          <img
            data-intro="cable-bottom"
            src={IMAGES.cables}
            alt=""
            decoding="async"
            className="h-full w-full object-cover"
            style={CABLE_BOTTOM_STYLE}
          />
        </Layer>

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(12,10,9,0.7)_100%)]" />

        {/* 4. Logo e íconos */}
        <Layer name="logo" depth={70}>
          <div className="flex h-full w-full items-center justify-center pb-[7%]">
            <img
              data-intro="logo"
              src={IMAGES.logo}
              alt=""
              decoding="async"
              className="w-[190%] max-w-none sm:w-[110%] lg:w-[68%] drop-shadow-[0_0_40px_rgba(249,115,22,0.35)]"
            />
          </div>
        </Layer>

        {/* 5. Partículas frontales */}
        <Layer name="bokeh" depth={110} className="pointer-events-none">
          <img
            data-intro="bokeh"
            src={IMAGES.bokeh}
            alt=""
            decoding="async"
            className="h-full w-full object-cover opacity-50"
          />
        </Layer>
      </div>

      {/* Degradado inferior para leer el título */}
      <div
        data-hud
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-ink/90 via-ink/40 to-transparent"
      />

      {/* Título + detalles inferiores en una misma columna (nunca se superponen) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center gap-[clamp(1.25rem,4vh,3rem)] px-5 pb-[clamp(1.25rem,3.5vh,2rem)] md:px-8">
        {/* Título */}
        <div data-title className="w-full text-center [perspective:800px]">
          <h1
            aria-label="Red Nueva Conexión"
            className="font-[kamerik-3d] uppercase leading-[0.95] tracking-tight text-[min(13vw,9vh)] sm:text-[min(9vw,10vh)] lg:text-[min(6.4vw,11vh)] [text-shadow:0_6px_40px_rgba(0,0,0,0.55)]"
          >
            {TITLE.map((word, wi) => (
              <span key={word} aria-hidden="true" className="inline-block whitespace-nowrap">
                {word.split("").map((ch, ci) => (
                  <span key={ci} data-char className="inline-block will-change-transform">
                    {ch}
                  </span>
                ))}
                {wi < TITLE.length - 1 && <span className="inline-block">&nbsp;</span>}
              </span>
            ))}
          </h1>
          <p
            data-hero-fade
            className="mt-[clamp(0.5rem,1.6vh,1rem)] text-[11px] sm:text-sm font-semibold uppercase tracking-[0.45em] text-white/85"
          >
            Conectándote al mundo
          </p>
        </div>

        {/* Detalles de interfaz */}
        <div
          data-hud
          className="grid w-full grid-cols-1 md:grid-cols-3 items-end text-[11px] uppercase tracking-[0.25em] text-white/60"
        >
          <div data-hero-fade className="hidden md:block">
            <p className="text-white/90">01°33′S · 79°32′W</p>
            <p className="mt-1">Puebloviejo, Ecuador</p>
          </div>
          <div data-hero-fade className="flex flex-col items-center gap-3">
            <span className="text-white/85">Desliza para ver más</span>
            <span className="relative block h-8 w-px overflow-hidden bg-white/20">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-[scroll-hint_1.8s_ease-in-out_infinite] bg-accent" />
            </span>
          </div>
          <div data-hero-fade className="hidden md:block text-right">
            <p className="text-white/90">Fibra óptica</p>
            <p className="mt-1">100% simétrico</p>
          </div>
        </div>
      </div>
      </div>

      {/* Preloader (en un portal para quedar por encima de todo, incluido el nav) */}
      {!skipLoader &&
        createPortal(
          <div
            ref={loaderRef}
            aria-hidden={ready}
            className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink px-6 py-8 text-white md:px-10 md:py-10"
            style={{ clipPath: "inset(0% 0% 0% 0%)" }}
          >
            <div ref={loaderInnerRef} className="mt-auto flex items-end justify-between gap-6">
              <p className="max-w-[12rem] text-xs uppercase tracking-[0.3em] text-stone-500">
                Estableciendo conexión…
              </p>
              <p className="font-display text-[22vw] md:text-[12vw] font-semibold leading-[0.8] tracking-tighter">
                <span ref={countRef}>000</span>
                <span className="text-accent">%</span>
              </p>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
};

export default Hero;
