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

        {/* Bottom Bar */}
        <div className="border-t border-orange-700 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p className="text-orange-200">
                © {currentYear}{" "}
                <span className="text-orange-400 font-bold">
                  Red Nueva Conexión
                </span>
                . Todos los derechos reservados.
              </p>
            </div>

            {/* Regulatory Info */}
            <div className="text-center">
              <p className="text-orange-200 text-sm">
                Cumpliendo con los requisitos de la Agencia de Regulación y
                Control de las Telecomunicaciones (ARCOTEL) y el Ministerio de
                Telecomunicaciones (MINTEL).
              </p>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="mt-8 flex justify-center space-x-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
          <div
            className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-3 h-3 bg-orange-300 rounded-full animate-pulse"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
