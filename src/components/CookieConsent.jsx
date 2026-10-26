import { useEffect, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/gsap";
import { OPEN_COOKIE_SETTINGS } from "../utils/cookies";

const STORAGE_KEY = "rnc-cookie-consent";

const categories = [
  {
    key: "necessary",
    title: "Necesarias",
    description:
      "Permiten que el sitio funcione: navegación, seguridad y guardar tus preferencias.",
    locked: true,
  },
  {
    key: "analytics",
    title: "Analíticas",
    description: "Nos ayudan a entender cómo usas la web para mejorarla.",
  },
  {
    key: "marketing",
    title: "Marketing",
    description: "Sirven para mostrarte promociones y planes relevantes.",
  },
];

const readConsent = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const saveConsent = (prefs) => {
  const data = { ...prefs, necessary: true, date: new Date().toISOString() };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Si el navegador bloquea el almacenamiento, solo aplica en esta visita
  }
  window.dispatchEvent(new CustomEvent("cookie-consent-change", { detail: data }));
  return data;
};

// Galleta minimalista de trazo fino
const CookieIcon = ({ className = "" }) => (
  <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
    <path
      d="M28 17.5A12 12 0 1 1 14.5 4a4 4 0 0 0 4.5 4.5 4 4 0 0 0 4.5 4.5 4 4 0 0 0 4.5 4.5Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <circle cx="11" cy="13" r="1.6" fill="currentColor" />
    <circle cx="17" cy="20" r="1.8" fill="#f97316" />
    <circle cx="10.5" cy="21" r="1.2" fill="currentColor" />
    <circle cx="22" cy="23" r="1.2" fill="currentColor" />
  </svg>
);

const Toggle = ({ checked, onChange, disabled, label }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    disabled={disabled}
    onClick={() => onChange(!checked)}
    className={`relative h-6 w-10 flex-shrink-0 rounded-full transition-colors duration-300 ${
      checked ? "bg-ink" : "bg-line"
    } ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
  >
    <span
      className={`absolute top-1 left-1 h-4 w-4 rounded-full transition-all duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] ${
        checked ? "translate-x-4 bg-accent" : "translate-x-0 bg-white"
      }`}
    />
  </button>
);

const CookieConsent = () => {
  const [consent, setConsent] = useState(() => readConsent());
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [prefs, setPrefs] = useState({
    necessary: true,
    analytics: consent?.analytics ?? false,
    marketing: consent?.marketing ?? false,
  });
  const bannerRef = useRef(null);
  const modalRef = useRef(null);

  // Mostrar el aviso tras un pequeño retraso si aún no hay decisión
  useEffect(() => {
    if (consent) return;
    const t = setTimeout(() => setShowBanner(true), 1500);
    return () => clearTimeout(t);
  }, [consent]);

  // Abrir las preferencias desde fuera (footer)
  useEffect(() => {
    const open = () => {
      const current = readConsent();
      setPrefs({
        necessary: true,
        analytics: current?.analytics ?? false,
        marketing: current?.marketing ?? false,
      });
      setShowBanner(false);
      setShowSettings(true);
    };
    window.addEventListener(OPEN_COOKIE_SETTINGS, open);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS, open);
  }, []);

  useEffect(() => {
    if (!showSettings) return;
    const onKey = (e) => e.key === "Escape" && closeSettings();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // Entrada del aviso
  useGSAP(
    () => {
      if (!showBanner || prefersReducedMotion()) return;
      gsap
        .timeline()
        .fromTo(bannerRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "expo.out" })
        .fromTo("[data-cookie-icon]", { rotate: -120, scale: 0 }, { rotate: 0, scale: 1, duration: 0.9, ease: "back.out(2)" }, "-=0.6")
        .fromTo("[data-cookie-fade]", { opacity: 0, y: 10 }, { opacity: 1, y: 0, stagger: 0.06, duration: 0.5 }, "-=0.6");
    },
    { scope: bannerRef, dependencies: [showBanner] }
  );

  // Entrada del panel de preferencias
  useGSAP(
    () => {
      if (!showSettings || prefersReducedMotion()) return;
      gsap.fromTo("[data-cookie-bg]", { opacity: 0 }, { opacity: 1, duration: 0.4 });
      gsap.fromTo("[data-cookie-panel]", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "expo.out" });
      gsap.fromTo("[data-cookie-row]", { opacity: 0, x: -16 }, { opacity: 1, x: 0, stagger: 0.07, duration: 0.6, delay: 0.2 });
    },
    { scope: modalRef, dependencies: [showSettings] }
  );

  const animateOut = (el, done) => {
    if (!el || prefersReducedMotion()) return done();
    gsap.to(el, { opacity: 0, y: 30, duration: 0.35, ease: "power2.in", onComplete: done });
  };

  const closeSettings = () => animateOut(modalRef.current, () => setShowSettings(false));

  const finish = (data) => {
    setConsent(saveConsent(data));
    const el = showSettings ? modalRef.current : bannerRef.current;
    animateOut(el, () => {
      setShowBanner(false);
      setShowSettings(false);
    });
  };

  const acceptAll = () => finish({ analytics: true, marketing: true });
  const rejectOptional = () => finish({ analytics: false, marketing: false });

  return (
    <>
      {showBanner && !showSettings && (
        <div
          ref={bannerRef}
          role="region"
          aria-label="Aviso de cookies"
          className="fixed bottom-4 left-4 right-4 z-[70] sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-sm"
        >
          <div className="rounded-3xl border border-line bg-paper/95 p-6 text-ink shadow-[0_30px_80px_-20px_rgba(12,10,9,0.35)] backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <span data-cookie-icon className="flex h-11 w-11 items-center justify-center rounded-full bg-sand">
                <CookieIcon className="h-6 w-6" />
              </span>
              <h2 data-cookie-fade className="font-display text-lg font-semibold tracking-tight">
                Usamos cookies
              </h2>
            </div>
            <p data-cookie-fade className="mt-4 text-sm leading-relaxed text-stone-600">
              Nos ayudan a que la web funcione, a entender cómo la usas y a
              mostrarte planes que te interesen. Tú decides.
            </p>
            <div data-cookie-fade className="mt-6 flex gap-2">
              <button
                onClick={rejectOptional}
                className="flex-1 rounded-full border border-line px-4 py-3 text-sm font-semibold transition-colors hover:border-ink"
              >
                Solo necesarias
              </button>
              <button
                onClick={acceptAll}
                className="flex-1 rounded-full bg-ink px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent"
              >
                Aceptar
              </button>
            </div>
            <button
              data-cookie-fade
              onClick={() => setShowSettings(true)}
              className="link-underline mt-4 pb-0.5 text-xs font-medium text-stone-500 hover:text-ink"
            >
              Personalizar preferencias
            </button>
          </div>
        </div>
      )}

      {showSettings && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-4"
        >
          <div data-cookie-bg className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={closeSettings} />
          <div
            data-cookie-panel
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-settings-title"
            className="relative flex max-h-[90vh] w-full flex-col overflow-hidden rounded-t-3xl bg-paper text-ink sm:max-w-lg sm:rounded-3xl"
          >
            <div className="flex items-start justify-between gap-4 p-6 md:p-8 pb-2 md:pb-2">
              <div>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sand">
                  <CookieIcon className="h-6 w-6" />
                </span>
                <h2 id="cookie-settings-title" className="mt-5 font-display text-3xl font-semibold tracking-tight">
                  Preferencias de cookies
                </h2>
                <p className="mt-2 text-sm text-stone-500">
                  Elige qué permites. Puedes cambiarlo cuando quieras desde el pie de página.
                </p>
              </div>
              <button
                onClick={closeSettings}
                aria-label="Cerrar"
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-line transition-colors hover:border-ink"
              >
                <FaTimes className="h-3.5 w-3.5" />
              </button>
            </div>

            <ul className="flex-1 overflow-y-auto px-6 md:px-8 py-4">
              {categories.map((cat) => (
                <li key={cat.key} data-cookie-row className="flex items-start gap-4 border-b border-line py-5 last:border-b-0">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{cat.title}</h3>
                      {cat.locked && (
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">
                          Siempre activas
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-stone-500">{cat.description}</p>
                  </div>
                  <Toggle
                    label={cat.title}
                    checked={prefs[cat.key]}
                    disabled={cat.locked}
                    onChange={(v) => setPrefs((p) => ({ ...p, [cat.key]: v }))}
                  />
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-3 gap-2 border-t border-line p-4 md:p-6">
              <button
                onClick={rejectOptional}
                className="rounded-full border border-line px-3 py-3 text-sm font-semibold transition-colors hover:border-ink"
              >
                Rechazar
              </button>
              <button
                onClick={() => finish(prefs)}
                className="rounded-full border border-ink px-3 py-3 text-sm font-semibold transition-colors hover:bg-sand"
              >
                Guardar
              </button>
              <button
                onClick={acceptAll}
                className="rounded-full bg-ink px-3 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent"
              >
                Aceptar todo
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;
