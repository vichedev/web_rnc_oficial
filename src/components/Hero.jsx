import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/gsap";

/*
 * Hero "Red Nueva Conexión" — mismo concepto del parallax original
 * (túnel, cables, logo y partículas) convertido en una escena cinematográfica:
 *  1. Preloader con contador mientras cargan las capas.
 *  2. Intro: el túnel se enfoca, los cables entran y el título aparece letra a letra.
 *  3. Scroll: la escena se fija, viajamos por el túnel, los cables se conectan
 *     y estalla un destello de "conexión establecida".
 *  4. Mouse: cada capa se desplaza según su profundidad (parallax 3D real).
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

/** Capa de la escena: el contenedor externo se anima con el scroll y el interno con el mouse. */
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

  // Intro + escena con scroll + parallax con el mouse
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

      // ---------- 2. Escena fija con scroll ----------
      const scene = gsap.timeline({
        defaults: { ease: "none", duration: 1 },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=200%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
      scene
        .to(q("[data-layer='tunnel']"), { scale: 2.7, rotate: 30, ease: "power1.inOut", duration: 1.25 }, 0)
        .to(q("[data-layer='cable-top']"), { xPercent: 24, yPercent: 20, ease: "power1.in", duration: 0.78 }, 0)
        .to(q("[data-layer='cable-bottom']"), { xPercent: -8, yPercent: -24, ease: "power1.in", duration: 0.78 }, 0)
        .to(q("[data-layer='bokeh']"), { scale: 2.2, opacity: 0, ease: "power1.in", duration: 0.7 }, 0)
        .to(q("[data-layer='logo']"), { scale: 1.45 }, 0)
        .to(q("[data-title]"), { yPercent: -60, opacity: 0, filter: "blur(14px)", ease: "power1.in", duration: 0.4 }, 0)
        .to(q("[data-hud]"), { opacity: 0, duration: 0.2 }, 0)
        .to(speed.current, { scroll: 10, ease: "power2.in", duration: 0.8 }, 0)
        // ¡Conexión! — destello, onda expansiva y aparición del logo
        .fromTo(q("[data-flash]"), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1.6, duration: 0.08, ease: "power2.out" }, 0.74)
        .to(q("[data-layer='logo']"), { opacity: 0, duration: 0.06 }, 0.77)
        .to(q("[data-scene]"), { opacity: 0.22, duration: 0.4, ease: "power1.inOut" }, 0.7)
        .fromTo(
          q("[data-ring]"),
          { scale: 0.2, opacity: 1 },
          // immediateRender: false → no se ve nada hasta que llega la explosión
          { scale: 4.5, opacity: 0, duration: 0.12, ease: "power2.out", stagger: 0.03, immediateRender: false },
          0.78
        )
        .fromTo(
          q("[data-finale-glow]"),
          { opacity: 0, scale: 0.4 },
          { opacity: 1, scale: 1, duration: 0.16, ease: "power2.out" },
          0.8
        )
        .fromTo(
          q("[data-finale-logo]"),
          { opacity: 0, scale: 0.55, y: 30, filter: "blur(18px)" },
          { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", duration: 0.16, ease: "back.out(1.6)" },
          0.8
        )
        .to(q("[data-flash]"), { opacity: 0, duration: 0.14 }, 0.84)
        .to(speed.current, { scroll: 1.5, duration: 0.2 }, 0.8)
        .fromTo(q("[data-connected]"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.08, ease: "power2.out" }, 0.9)
        // Pausa para disfrutar el logo antes de continuar
        .to({}, { duration: 0.25 }, 1);

      // ---------- 3. Salida suave hacia la siguiente sección ----------
      const next = document.getElementById("nosotros");
      if (next) {
        gsap.fromTo(
          q("[data-stage]"),
          { scale: 1, yPercent: 0, opacity: 1, borderRadius: 0 },
          {
            scale: 0.88,
            yPercent: 38,
            opacity: 0.3,
            borderRadius: 40,
            ease: "none",
            scrollTrigger: { trigger: next, start: "top bottom", end: "top top", scrub: true },
          }
        );
      }

      // ---------- 4. Parallax con el mouse ----------
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
        return () => window.removeEventListener("mousemove", onMove);
      }
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
      <div data-stage className="absolute inset-0 origin-top overflow-hidden will-change-transform">
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

      {/* Destello de conexión */}
      <div
        data-flash
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[120vmax] w-[120vmax] -ml-[60vmax] -mt-[60vmax] rounded-full opacity-0 mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(253,186,116,0.85) 8%, rgba(249,115,22,0.55) 22%, rgba(59,130,246,0.18) 42%, transparent 62%)",
        }}
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
            <span className="text-white/85">Desliza para conectar</span>
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

      {/* Final de la escena: logo de Red Nueva Conexión */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 pt-10">
        {[0, 1].map((i) => (
          <span
            key={i}
            data-ring
            aria-hidden="true"
            className="absolute h-[34vmin] w-[34vmin] rounded-full border-2 border-accent/80 opacity-0 shadow-[0_0_40px_rgba(249,115,22,0.6)]"
          />
        ))}
        <span
          data-finale-glow
          aria-hidden="true"
          className="absolute h-[70vmin] w-[70vmin] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.45)_0%,rgba(59,130,246,0.15)_45%,transparent_70%)] opacity-0"
        />
        <img
          data-finale-logo
          src="/images/logo.png"
          alt="Red Nueva Conexión — Conectándote al mundo"
          decoding="async"
          className="relative w-[min(82vw,88vh,620px)] opacity-0 drop-shadow-[0_25px_60px_rgba(0,0,0,0.65)]"
        />
        <div data-connected className="relative mt-[clamp(1.25rem,4vh,2.5rem)] opacity-0">
          <span className="flex items-center gap-3 rounded-full border border-white/20 bg-ink/50 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Conexión establecida
          </span>
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
