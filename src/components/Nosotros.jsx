import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaRocket,
  FaWifi,
  FaHeadset,
  FaChartLine,
  FaShieldAlt,
  FaAward,
  FaUsers,
  FaGlobeAmericas,
  FaBold,
  FaInfinity,
  FaUserCheck,
  FaNetworkWired,
  FaTachometerAlt,
  FaCrown,
  FaLightbulb,
  FaHandshake,
  FaClock,
} from "react-icons/fa";

const Nosotros = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    clients: 0,
    uptime: 0,
    support: 0,
    latency: 0,
  });

  useEffect(() => {
    setIsVisible(true);

    const animateStats = () => {
      let clients = 0;
      let uptime = 0;
      const clientsTarget = 10000;
      const uptimeTarget = 99.9;

      const interval = setInterval(() => {
        if (clients < clientsTarget) {
          clients += Math.ceil(clientsTarget / 50);
          if (clients > clientsTarget) clients = clientsTarget;
        }

        if (uptime < uptimeTarget) {
          uptime += uptimeTarget / 30;
          if (uptime > uptimeTarget) uptime = uptimeTarget;
        }

        setAnimatedStats({
          clients,
          uptime: parseFloat(uptime.toFixed(1)),
          support: "24/7",
          latency: "15ms",
        });

        if (clients >= clientsTarget && uptime >= uptimeTarget) {
          clearInterval(interval);
        }
      }, 50);
    };

    setTimeout(animateStats, 1000);
  }, []);

  const handleContratar = () => {
    navigate("/planes");
  };

  const handleConocerPlanes = () => {
    navigate("/planes");
  };

  // Características principales
  const features = [
    {
      icon: <FaBold className="w-8 h-8" />,
      title: "Velocidad Extrema",
      description:
        "Fibra óptica simétrica hasta 1 Gbps para streaming 4K, gaming competitivo y teletrabajo sin interrupciones",
      metric: "1 Gbps",
      color: "from-orange-500 to-red-500",
      benefits: [
        "Streaming 4K/8K sin buffering",
        "Gaming con latencia mínima",
        "Descargas ultra rápidas",
      ],
    },
    {
      icon: <FaInfinity className="w-8 h-8" />,
      title: "Data Ilimitada",
      description:
        "Navega, descarga y transmite sin límites. Sin restricciones de consumo mensual ni throttling",
      metric: "∞ GB",
      color: "from-purple-500 to-pink-500",
      benefits: [
        "Sin límites de consumo",
        "Sin reducción de velocidad",
        "Todo incluido",
      ],
    },
    {
      icon: <FaShieldAlt className="w-8 h-8" />,
      title: "Seguridad Avanzada",
      description:
        "Protección total 24/7 con firewall integrado, antivirus y control parental incluido",
      metric: "100% Seguro",
      color: "from-green-500 to-emerald-500",
      benefits: [
        "Firewall integrado",
        "Protección antivirus",
        "Control parental",
      ],
    },
    {
      icon: <FaGlobeAmericas className="w-8 h-8" />,
      title: "Cobertura Extendida",
      description:
        "Llegamos donde otros no llegan. Más de 50 zonas cubiertas con tecnología de última generación",
      metric: "50+ Zonas",
      color: "from-blue-500 to-cyan-500",
      benefits: ["Área metropolitana", "Zonas rurales", "Expansión continua"],
    },
  ];

  // Servicios adicionales
  const services = [
    {
      icon: <FaHeadset className="w-7 h-7" />,
      title: "Soporte Premium 24/7",
      description:
        "Expertos disponibles las 24 horas con tiempo de respuesta promedio menor a 15 minutos",
      highlight: "< 15min respuesta",
    },
    {
      icon: <FaAward className="w-7 h-7" />,
      title: "Garantía Certificada",
      description:
        "Calidad premium garantizada con certificación de satisfacción del cliente y reembolso de 30 días",
      highlight: "5★ Rating",
    },
    {
      icon: <FaNetworkWired className="w-7 h-7" />,
      title: "Infraestructura Sólida",
      description:
        "Tecnología de última generación con redundancia total y 99.9% de uptime garantizado",
      highlight: "99.9% Uptime",
    },
    {
      icon: <FaTachometerAlt className="w-7 h-7" />,
      title: "Instalación Express",
      description:
        "Instalación en menos de 48 horas con técnicos certificados y equipos de última generación",
      highlight: "48h instalación",
    },
  ];

  // Ventajas exclusivas
  const advantages = [
    {
      icon: <FaUsers className="w-6 h-6" />,
      text: "Atención personalizada con ejecutivo dedicado",
    },
    {
      icon: <FaChartLine className="w-6 h-6" />,
      text: "Escalabilidad garantizada sin costos ocultos",
    },
    {
      icon: <FaHandshake className="w-6 h-6" />,
      text: "Sin contratos forzosos - libertad total",
    },
    {
      icon: <FaClock className="w-6 h-6" />,
      text: "Actualizaciones gratuitas de equipos",
    },
    {
      icon: <FaLightbulb className="w-6 h-6" />,
      text: "Asesoramiento técnico especializado",
    },
    {
      icon: <FaCrown className="w-6 h-6" />,
      text: "Acceso prioritario a nuevas tecnologías",
    },
  ];

  return (
    <div id="nosotros" className="min-h-screen relative">
      {/* Fondo con imagen original */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 40, 80, 0.8)), url("https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80")',
        }}
      ></div>

      {/* Contenido principal */}
      <div className="relative pt-28 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Encabezado */}
          <div
            className={`text-center mb-20 transition-all duration-1000 transform ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="inline-flex items-center px-6 py-3 bg-orange-500/20 rounded-full border border-orange-400/30 mb-8">
              <FaCrown className="w-5 h-5 text-orange-400 mr-2" />
              <span className="text-orange-300 font-semibold">
                Líderes en Conectividad Digital
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Descubre por qué{" "}
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                RNC
              </span>{" "}
              es diferente
            </h1>

            <div className="w-32 h-1.5 bg-gradient-to-r from-orange-500 to-amber-500 mx-auto mb-8 rounded-full shadow-lg shadow-orange-500/30"></div>

            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed font-light">
              No somos solo un proveedor de internet. Somos tu{" "}
              <span className="text-orange-300 font-semibold">
                socio estratégico
              </span>{" "}
              en conectividad, con tecnología de punta y un{" "}
              <span className="text-amber-300 font-semibold">
                compromiso real
              </span>{" "}
              con tu satisfacción.
            </p>
          </div>

          {/* Características Principales */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Características que nos hacen{" "}
                <span className="text-orange-400">únicos</span>
              </h2>
              <p className="text-xl text-blue-200 max-w-2xl mx-auto">
                Tecnología de vanguardia combinada con servicio excepcional
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`group bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:border-orange-400/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start space-x-6">
                    {/* Icono */}
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg flex-shrink-0`}
                    >
                      <div className="text-white">{feature.icon}</div>
                    </div>

                    {/* Contenido */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-2xl font-bold text-white group-hover:text-orange-300 transition-colors duration-300">
                          {feature.title}
                        </h3>
                        <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg">
                          {feature.metric}
                        </span>
                      </div>

                      <p className="text-blue-100 mb-4 leading-relaxed">
                        {feature.description}
                      </p>

                      <div className="space-y-2">
                        {feature.benefits.map((benefit, idx) => (
                          <div
                            key={idx}
                            className="flex items-center text-blue-200 text-sm"
                          >
                            <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Servicios Adicionales */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Servicios <span className="text-amber-400">Premium</span>{" "}
                Incluidos
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="group bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-orange-400/50 transition-all duration-300 transform hover:scale-105 text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:scale-110 transition-all duration-300">
                    <div className="text-white">{service.icon}</div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-300 transition-colors duration-300">
                    {service.title}
                  </h3>

                  <p className="text-blue-100 text-sm mb-3 leading-relaxed">
                    {service.description}
                  </p>

                  <span className="inline-block bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-sm font-semibold border border-orange-400/30">
                    {service.highlight}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Ventajas Exclusivas */}
          <div className="mb-20">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Ventajas <span className="text-green-400">Exclusivas</span>{" "}
                  RNC
                </h2>
                <p className="text-blue-200 text-lg">
                  Beneficios que solo nosotros ofrecemos
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {advantages.map((advantage, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <div className="text-orange-400">{advantage.icon}</div>
                    </div>
                    <span className="text-blue-100 font-medium flex-1">
                      {advantage.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Llamada a la acción */}
          <div
            className={`text-center bg-gradient-to-r from-orange-500/20 to-amber-500/20 backdrop-blur-xl rounded-3xl p-12 border border-orange-400/30 hover:border-orange-400/50 transition-all duration-500 mb-16 ${
              isVisible ? "opacity-100" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-500 rounded-3xl flex items-center justify-center transform hover:scale-110 transition-transform duration-300 shadow-2xl shadow-orange-500/40">
                <FaRocket className="w-10 h-10 text-white" />
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              ¿Listo para experimentar la verdadera velocidad?
            </h2>

            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed font-light">
              Únete a los{" "}
              <span className="text-orange-300 font-semibold">
                +10,000 clientes satisfechos
              </span>{" "}
              que ya disfrutan de nuestra conectividad de alta velocidad.
              <span className="text-amber-300 font-semibold">
                {" "}
                Sin contratos forzosos
              </span>{" "}
              y con{" "}
              <span className="text-green-300 font-semibold">
                garantía de satisfacción
              </span>
              .
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={handleContratar}
                className="group relative bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-5 px-12 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/40 overflow-hidden"
              >
                <span className="relative z-10 flex items-center space-x-3">
                  <FaRocket className="w-5 h-5 group-hover:animate-bounce" />
                  <span>Contratar Ahora</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </button>

              <button
                onClick={handleConocerPlanes}
                className="group relative bg-transparent hover:bg-white/10 text-white font-bold py-5 px-12 rounded-2xl text-lg border-2 border-orange-400/50 hover:border-orange-400 transition-all duration-300 transform hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10 flex items-center space-x-3">
                  <FaUserCheck className="w-5 h-5" />
                  <span>Ver Planes Detallados</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 mt-8 text-blue-200 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Sin costos de instalación</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Garantía 30 días</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Soporte 24/7</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Equipos incluidos</span>
              </div>
            </div>
          </div>

          {/* Estadísticas */}
          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-6 ${
              isVisible ? "opacity-100" : "opacity-0 translate-y-10"
            } transition-all duration-1000 delay-700`}
          >
            {[
              {
                value: `${animatedStats.clients.toLocaleString()}+`,
                label: "Clientes Satisfechos",
                icon: <FaUsers className="w-6 h-6" />,
                color: "text-orange-400",
                description: "Confían en nosotros",
              },
              {
                value: `${animatedStats.uptime}%`,
                label: "Uptime Garantizado",
                icon: <FaChartLine className="w-6 h-6" />,
                color: "text-green-400",
                description: "Máxima estabilidad",
              },
              {
                value: animatedStats.support,
                label: "Soporte Técnico",
                icon: <FaHeadset className="w-6 h-6" />,
                color: "text-blue-400",
                description: "Disponibilidad total",
              },
              {
                value: animatedStats.latency,
                label: "Latencia Promedio",
                icon: <FaBold className="w-6 h-6" />,
                color: "text-amber-400",
                description: "Máximo rendimiento",
              },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-orange-400/50 transition-all duration-300 transform group-hover:scale-105 group-hover:-translate-y-1 h-full">
                  <div
                    className={`w-14 h-14 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 ${stat.color}`}
                  >
                    {stat.icon}
                  </div>
                  <div
                    className={`text-3xl md:text-4xl font-bold mb-2 ${stat.color} font-mono`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-blue-200 text-sm font-semibold uppercase tracking-wide mb-1">
                    {stat.label}
                  </div>
                  <div className="text-blue-300 text-xs">
                    {stat.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nosotros;
