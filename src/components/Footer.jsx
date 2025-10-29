import React from "react";
import {
  FaInstagram,
  FaFacebook,
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaTachometerAlt,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-orange-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Logo and Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <img
                src="/images/logo.png"
                alt="Red Nueva Conexión Logo"
                className="h-16 w-auto"
              />
            </div>
            <p className="text-orange-100 mb-6 text-lg leading-relaxed italic">
              "Queremos que cada conexión sea sinónimo de confianza, innovación
              y cercanía."
            </p>

            {/* Speed Test */}
            <div className="mb-6">
              <a
                href="https://www.speedtest.net/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <FaTachometerAlt className="w-5 h-5" />
                <span className="font-semibold">Test de Velocidad</span>
              </a>
            </div>

            {/* Social Media - Solo Instagram y WhatsApp */}
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/rednuevaconexion.ec/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white p-3 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/rednuevaconexion"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-3 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/+59343755230"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-3 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
              >
                <FaWhatsapp className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Enlaces de Interés ARCOTEL */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-orange-400 flex items-center">
              <div className="w-2 h-6 bg-orange-500 rounded-full mr-3"></div>
              Normativas ARCOTEL
            </h3>
            <ul className="space-y-3">
              {[
                {
                  name: "Ley Orgánica de Telecomunicaciones",
                  href: "/Documents/1ley_organica_de_telecomunicaciones2.pdf",
                  target: "_blank",
                },
                {
                  name: "Reglamento Servicios Telecom",
                  href: "/Documents/3REGLAMENTO-PARA-LA-PRESTACION-DE-SERVICIOS-DE-TELECOMUNICACIONES12.pdf",
                  target: "_blank",
                },
                {
                  name: "Parámetros de Calidad",
                  href: "/Documents/5PARAMETROS DE CALIDAD_GOBRAVCORPSA.pdf",
                  target: "_blank",
                },
                {
                  name: "Calidad de Servicio QOS",
                  href: "/Documents/6qos sva 4.pdf",
                  target: "_blank",
                },
                {
                  name: "Sitio Oficial ARCOTEL",
                  href: "https://www.arcotel.gob.ec",
                  external: true,
                  target: "_blank",
                },
                {
                  name: "Sitio Oficial MINTEL",
                  href: "https://www.telecomunicaciones.gob.ec/",
                  external: true,
                  target: "_blank",
                },
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    target={link.target || "_self"}
                    rel="noopener noreferrer"
                    className="text-orange-100 hover:text-orange-300 transition-all duration-300 flex items-center group"
                  >
                    <div className="w-2 h-2 bg-orange-400 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></div>
                    <span className="group-hover:translate-x-1 transition-transform duration-300 text-sm">
                      {link.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Zona de Clientes */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-orange-400 flex items-center">
              <div className="w-2 h-6 bg-orange-500 rounded-full mr-3"></div>
              Zona de Clientes
            </h3>
            <ul className="space-y-3">
              {[
                {
                  name: "Consejos de Seguridad",
                  href: "/Documents/13Consejos_de_seguridad 2.pdf",
                },
                {
                  name: "Control Parental",
                  href: "/Documents/14control parental 2.pdf",
                },
                {
                  name: "Política Internet Segura",
                  href: "/Documents/12política_publica_internet_segura 4.pdf",
                },
                {
                  name: "Ley Discapacidades",
                  href: "/Documents/9ley_organica_discapacidades 1.pdf",
                },
                {
                  name: "Ley Adulto Mayor",
                  href: "/Documents/10LEY ORGANICA DE LAS PERSONAS ADULTOS MAYORES (2) 2.pdf",
                },
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-100 hover:text-orange-300 transition-all duration-300 flex items-center group"
                  >
                    <div className="w-2 h-2 bg-orange-400 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></div>
                    <span className="group-hover:translate-x-1 transition-transform duration-300 text-sm">
                      {item.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-orange-400 flex items-center">
              <div className="w-2 h-6 bg-orange-500 rounded-full mr-3"></div>
              Contáctanos
            </h3>
            <div className="space-y-4">
              {/* WhatsApp */}
              <a
                href="https://wa.me/+59343755230"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-orange-100 hover:text-green-400 transition-all duration-300 group"
              >
                <div className="bg-green-500 group-hover:bg-green-400 p-2 rounded-lg transition-colors duration-300">
                  <FaWhatsapp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold">WhatsApp</div>
                  <div className="text-sm">+593 4-375-5230</div>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:info@rednuevaconexion.ec"
                className="flex items-center space-x-3 text-orange-100 hover:text-orange-300 transition-all duration-300 group"
              >
                <div className="bg-orange-500 group-hover:bg-orange-400 p-2 rounded-lg transition-colors duration-300">
                  <FaEnvelope className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold">Email</div>
                  <div className="text-sm">info@rednuevaconexion.ec</div>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+59343755230"
                className="flex items-center space-x-3 text-orange-100 hover:text-blue-400 transition-all duration-300 group"
              >
                <div className="bg-blue-500 group-hover:bg-blue-400 p-2 rounded-lg transition-colors duration-300">
                  <FaPhone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold">Teléfono</div>
                  <div className="text-sm">+593 4-375-5230</div>
                </div>
              </a>

              {/* Address */}
              <div className="flex items-start space-x-3 text-orange-100 group">
                <div className="bg-purple-500 p-2 rounded-lg mt-1">
                  <FaMapMarkerAlt className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold">Dirección</div>
                  <div className="text-sm">Ecuador, Puebloviejo</div>
                </div>
              </div>
            </div>

            {/* Horario de Atención */}
            <div className="mt-6 p-4 bg-white/10 rounded-xl border border-white/20">
              <h4 className="font-semibold text-orange-300 mb-2">
                Horario de Atención
              </h4>
              <div className="text-sm text-orange-100 space-y-1">
                <div>Lunes a Viernes: 8:00 - 18:00</div>
                <div>Sábados: 9:00 - 13:00</div>
                <div>Soporte 24/7 para emergencias</div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className="border-t border-orange-600/50 pt-8 pb-6">
          {/* Main Footer Content */}
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0 mb-6">
            {/* Copyright Section */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start space-x-2 mb-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                <p className="text-orange-100 font-semibold text-lg">
                  Red Nueva Conexión
                </p>
              </div>
              <p className="text-orange-200/90 text-sm">
                © {currentYear} Todos los derechos reservados.
              </p>
            </div>

            {/* Regulatory Badge */}
            <div className="bg-orange-500/20 backdrop-blur-sm border border-orange-500/30 rounded-xl px-4 py-3">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <svg
                    className="w-4 h-4 text-orange-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  <span className="text-orange-200 font-medium text-sm">
                    REGULADO POR
                  </span>
                </div>
                <p className="text-orange-200/80 text-xs leading-tight">
                  ARCOTEL • MINTEL
                </p>
              </div>
            </div>

            {/* Contact Quick Info */}
            <div className="text-center lg:text-right">
              <p className="text-orange-100 font-medium mb-1">
                ¿Necesitas ayuda?
              </p>
              <p className="text-orange-200/90 text-sm">+593 4375 5230</p>
            </div>
          </div>

          {/* Regulatory Detailed Info */}
          <div className="bg-orange-500/10 backdrop-blur-sm rounded-lg p-4 mb-4 border border-orange-500/20">
            <p className="text-orange-200 text-center text-sm leading-relaxed">
              Cumpliendo con todos los requisitos establecidos por la
              <span className="text-orange-300 font-semibold">
                {" "}
                Agencia de Regulación y Control de las Telecomunicaciones
                (ARCOTEL){" "}
              </span>
              y el
              <span className="text-orange-300 font-semibold">
                {" "}
                Ministerio de Telecomunicaciones (MINTEL)
              </span>
              para la prestación de servicios de telecomunicaciones en Ecuador.
            </p>
          </div>

          {/* Powered By Section */}
          <div className="flex flex-col items-center space-y-3">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-orange-400/50 to-transparent"></div>
            <div className="flex items-center space-x-3">
              <span className="text-orange-200/70 text-xs font-light">
                DESARROLLADO POR
              </span>
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <span className="text-white font-bold text-sm tracking-wide">
                  INIGUALITYSOFT
                </span>
              </div>
              <span className="text-orange-200/70 text-xs font-light">
                TECHNOLOGY
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
