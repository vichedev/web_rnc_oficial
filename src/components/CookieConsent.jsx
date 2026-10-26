import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaTimes, FaShieldAlt, FaChartBar, FaBullhorn, FaCheck } from "react-icons/fa";

import { OPEN_COOKIE_SETTINGS } from "../utils/cookies";

const STORAGE_KEY = "rnc-cookie-consent";

const categories = [
  {
    key: "necessary",
    title: "Necesarias",
    description:
      "Permiten que el sitio funcione correctamente: navegación, seguridad y guardar tus preferencias.",
    icon: FaShieldAlt,
    locked: true,
  },
  {
    key: "analytics",
    title: "Analíticas",
    description:
      "Nos ayudan a entender cómo usas la web para mejorar su contenido y rendimiento.",
    icon: FaChartBar,
  },
  {
    key: "marketing",
    title: "Marketing",
    description:
      "Se usan para mostrarte promociones y planes relevantes en otras plataformas.",
    icon: FaBullhorn,
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

// Galleta ilustrada en SVG
const CookieIcon = ({ className = "" }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
    <path
      d="M58 34a26 26 0 1 1-28-28 8 8 0 0 0 9 9 8 8 0 0 0 10 10 8 8 0 0 0 9 9z"
      fill="#f59e0b"
    />
    <path
      d="M58 34a26 26 0 0 1-49 12 26 26 0 0 0 45-18 8 8 0 0 0 4 6z"
      fill="#d97706"
      opacity="0.6"
    />
    <circle cx="22" cy="24" r="4" fill="#7c2d12" />
    <circle cx="34" cy="38" r="4.5" fill="#7c2d12" />
    <circle cx="20" cy="42" r="3" fill="#7c2d12" />
    <circle cx="44" cy="46" r="3" fill="#7c2d12" />
    <circle cx="30" cy="20" r="1.6" fill="#fde68a" />
    <circle cx="40" cy="30" r="1.6" fill="#fde68a" />
    <circle cx="26" cy="50" r="1.6" fill="#fde68a" />
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
    className={`relative h-6 w-11 flex-shrink-0 rounded-full transition-colors duration-300 ${
      checked ? "bg-gradient-to-r from-orange-500 to-orange-600" : "bg-gray-300"
    } ${disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
  >
    <motion.span
      layout
      transition={{ type: "spring", stiffness: 500, damping: 32 }}
      className={`absolute top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow ${
        checked ? "right-0.5" : "left-0.5"
      }`}
    >
      {checked && <FaCheck className="h-2.5 w-2.5 text-orange-500" />}
    </motion.span>
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

  // Mostrar el aviso tras un pequeño retraso si aún no hay decisión
  useEffect(() => {
    if (consent) return;
    const t = setTimeout(() => setShowBanner(true), 1200);
    return () => clearTimeout(t);
  }, [consent]);

  // Permitir abrir las preferencias desde fuera
  useEffect(() => {
    const open = () => {
      const current = readConsent();
      setPrefs({
        necessary: true,
        analytics: current?.analytics ?? false,
        marketing: current?.marketing ?? false,
      });
      setShowSettings(true);
    };
    window.addEventListener(OPEN_COOKIE_SETTINGS, open);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS, open);
  }, []);

  // Cerrar el modal con Escape
  useEffect(() => {
    if (!showSettings) return;
    const onKey = (e) => e.key === "Escape" && setShowSettings(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showSettings]);

  const finish = (data) => {
    setConsent(saveConsent(data));
    setShowBanner(false);
    setShowSettings(false);
  };

  const acceptAll = () => finish({ analytics: true, marketing: true });
  const rejectOptional = () => finish({ analytics: false, marketing: false });
  const savePrefs = () => finish(prefs);

  return (
    <>
      {/* Aviso inicial */}
      <AnimatePresence>
        {showBanner && !showSettings && (
          <motion.div
            role="region"
            aria-label="Aviso de cookies"
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="fixed bottom-4 left-4 right-4 z-[70] sm:left-6 sm:right-auto sm:bottom-6 sm:max-w-md"
          >
            <div className="relative overflow-hidden rounded-3xl border border-orange-100 bg-white/95 p-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.45)] backdrop-blur-xl">
              {/* Decoración */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-orange-200/60 to-amber-100/40 blur-2xl" />

              <div className="relative flex items-start gap-4">
                <motion.div
                  animate={{ rotate: [0, -12, 10, -6, 0] }}
                  transition={{ duration: 1.6, delay: 0.4, repeat: Infinity, repeatDelay: 4 }}
                  className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-50 to-orange-100 ring-1 ring-orange-200"
                >
                  <CookieIcon className="h-11 w-11 drop-shadow" />
                </motion.div>
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-gray-900">
                    ¿Te apetece una cookie?
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">
                    Usamos cookies para que la web funcione bien, entender cómo
                    la usas y mostrarte planes que te interesen. Tú decides.
                  </p>
                </div>
              </div>

              <div className="relative mt-5 grid grid-cols-2 gap-2">
                <button
                  onClick={rejectOptional}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:border-orange-300 hover:text-orange-600"
                >
                  Solo necesarias
                </button>
                <button
                  onClick={acceptAll}
                  className="rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/30 transition-transform hover:-translate-y-0.5"
                >
                  Aceptar todas
                </button>
              </div>
              <button
                onClick={() => setShowSettings(true)}
                className="relative mt-3 w-full text-center text-sm font-semibold text-orange-600 underline-offset-4 hover:underline"
              >
                Personalizar preferencias
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de preferencias */}
      <AnimatePresence>
        {showSettings && (
          <div className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-4">
            <motion.div
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSettings(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="cookie-settings-title"
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 80 }}
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
              className="relative flex max-h-[90vh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:max-w-lg sm:rounded-3xl"
            >
              <div className="relative bg-gradient-to-br from-orange-500 to-orange-600 px-6 pb-6 pt-6 text-white">
                <div className="pointer-events-none absolute -right-6 -bottom-8 opacity-25">
                  <CookieIcon className="h-32 w-32" />
                </div>
                <button
                  onClick={() => setShowSettings(false)}
                  aria-label="Cerrar"
                  className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 transition-colors hover:bg-white/30"
                >
                  <FaTimes className="h-4 w-4" />
                </button>
                <h2 id="cookie-settings-title" className="text-2xl font-bold">
                  Preferencias de cookies
                </h2>
                <p className="mt-1 max-w-sm text-sm text-orange-50">
                  Elige qué cookies permites. Puedes cambiarlo cuando quieras
                  desde el pie de página.
                </p>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto p-6">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <div
                      key={cat.key}
                      className={`flex items-start gap-4 rounded-2xl border p-4 transition-colors ${
                        prefs[cat.key]
                          ? "border-orange-200 bg-orange-50/60"
                          : "border-gray-200 bg-white"
                      }`}
                    >
                      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900">{cat.title}</h3>
                          {cat.locked && (
                            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gray-500">
                              Siempre activas
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm leading-relaxed text-gray-600">
                          {cat.description}
                        </p>
                      </div>
                      <Toggle
                        label={cat.title}
                        checked={prefs[cat.key]}
                        disabled={cat.locked}
                        onChange={(v) => setPrefs((p) => ({ ...p, [cat.key]: v }))}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 gap-2 border-t border-gray-100 bg-gray-50 p-4 sm:grid-cols-3">
                <button
                  onClick={rejectOptional}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:border-orange-300 hover:text-orange-600"
                >
                  Rechazar
                </button>
                <button
                  onClick={savePrefs}
                  className="rounded-xl border border-orange-300 bg-white px-4 py-3 text-sm font-semibold text-orange-600 transition-colors hover:bg-orange-50"
                >
                  Guardar
                </button>
                <button
                  onClick={acceptAll}
                  className="rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/30"
                >
                  Aceptar todas
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CookieConsent;
