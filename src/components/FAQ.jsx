import { useRef, useState } from "react";
import { FaQuestionCircle, FaPlus, FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import useReveal from "../hooks/useReveal";
import SectionTitle from "./ui/SectionTitle";

const faqs = [
  {
    q: "¿Qué significa que el internet sea simétrico?",
    a: "Que tienes la misma velocidad para subir y para bajar información. Si contratas 100 Mbps, descargas y subes a 100 Mbps. Es clave para videollamadas, clases virtuales, transmitir en vivo y respaldar archivos en la nube.",
  },
  {
    q: "¿Cuánto tarda la instalación?",
    a: "Una vez confirmada la cobertura en tu dirección, instalamos en menos de 48 horas con técnicos certificados.",
  },
  {
    q: "¿La instalación tiene costo?",
    a: "No. La instalación es sin costo y el equipo WiFi está incluido en todos los planes.",
  },
  {
    q: "¿Tengo que firmar un contrato de permanencia?",
    a: "No manejamos contratos forzosos. Te quedas con nosotros porque el servicio funciona.",
  },
  {
    q: "¿Quiénes pueden acceder a los planes Tercera Edad y Discapacidad?",
    a: "Son planes con tarifa preferencial dirigidos a personas adultas mayores y personas con discapacidad, conforme a la normativa ecuatoriana vigente. Aplican requisitos: escríbenos y te indicamos la documentación necesaria.",
  },
  {
    q: "¿Qué velocidad necesito?",
    a: "Depende de cuántas personas y dispositivos usan internet a la vez. Para 1–3 dispositivos el Plan Home Básico es suficiente; para teletrabajo y streaming recomendamos el Intermedio; y para gaming u hogares muy conectados, el Avanzado. Usa nuestra calculadora de velocidad para comparar.",
  },
  {
    q: "¿Cómo compruebo la velocidad de mi conexión?",
    a: "Conecta tu equipo por cable al router (o acércate al WiFi) y usa el Test de velocidad que encuentras en el menú superior y en el pie de página.",
  },
];

const FAQ = () => {
  const scope = useRef(null);
  const [open, setOpen] = useState(0);
  useReveal(scope);

  return (
    <section ref={scope} id="faq" className="bg-paper text-ink">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:px-8 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionTitle
            eyebrow="Preguntas frecuentes"
            icon={FaQuestionCircle}
            title="Resolvemos *tus dudas"
            subtitle="Todo lo que necesitas saber antes de contratar tu internet de fibra óptica."
          />
          <div data-reveal className="mt-10 rounded-3xl bg-navy p-7 text-white">
            <p className="font-display text-xl font-bold">¿No encuentras tu respuesta?</p>
            <p className="mt-2 text-blue-100/70">Escríbenos y te respondemos en horario de atención.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://wa.me/59343755230"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-amber-500 px-5 py-3 text-sm font-bold"
              >
                <FaWhatsapp className="h-4 w-4" /> WhatsApp
              </a>
              <a href="tel:+59343755230" className="flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-bold hover:bg-white/10">
                <FaPhoneAlt className="h-3.5 w-3.5" /> 04-375-5230
              </a>
            </div>
          </div>
        </div>

        <ul className="space-y-3 lg:col-span-7">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <li
                key={f.q}
                data-reveal
                className={`overflow-hidden rounded-2xl border bg-white transition-[border-color,box-shadow] duration-300 ${
                  isOpen ? "border-accent/40 shadow-xl shadow-navy/5" : "border-stone-200"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left font-display text-lg font-bold"
                >
                  {f.q}
                  <span
                    className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full transition-all duration-500 ${
                      isOpen ? "rotate-45 bg-accent text-white" : "bg-stone-100 text-ink"
                    }`}
                  >
                    <FaPlus className="h-3.5 w-3.5" />
                  </span>
                </button>
                <div
                  id={`faq-${i}`}
                  role="region"
                  className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 leading-relaxed text-stone-600">{f.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default FAQ;
