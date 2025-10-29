import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import {
  FaRocket,
  FaHeadset,
  FaChartLine,
  FaShieldAlt,
  FaAward,
  FaUsers,
  FaGlobeAmericas,
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

  // Refs para animaciones al hacer scroll
  const featuresRef = useRef(null);
  const servicesRef = useRef(null);
  const advantagesRef = useRef(null);
  const statsRef = useRef(null);
  const ctaRef = useRef(null);

  // Hooks para detectar cuando los elementos están en vista
  const featuresInView = useInView(featuresRef, { once: true, threshold: 0.2 });
  const servicesInView = useInView(servicesRef, { once: true, threshold: 0.2 });
  const advantagesInView = useInView(advantagesRef, {
    once: true,
    threshold: 0.2,
  });
  const statsInView = useInView(statsRef, { once: true, threshold: 0.3 });
  const ctaInView = useInView(ctaRef, { once: true, threshold: 0.3 });

  // Controls para las animaciones
  const featuresControls = useAnimation();
  const servicesControls = useAnimation();
  const advantagesControls = useAnimation();
  const statsControls = useAnimation();
  const ctaControls = useAnimation();

  // Efectos para activar animaciones cuando los elementos entran en vista
  useEffect(() => {
    if (featuresInView) featuresControls.start("visible");
  }, [featuresInView, featuresControls]);

  useEffect(() => {
    if (servicesInView) servicesControls.start("visible");
  }, [servicesInView, servicesControls]);

  useEffect(() => {
    if (advantagesInView) advantagesControls.start("visible");
  }, [advantagesInView, advantagesControls]);

  useEffect(() => {
    if (statsInView) statsControls.start("visible");
  }, [statsInView, statsControls]);

  useEffect(() => {
    if (ctaInView) ctaControls.start("visible");
  }, [ctaInView, ctaControls]);

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

  // Variantes de animación
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.8,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      rotateX: -10,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  const statsVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.6,
      },
    },
  };

  const fadeInUp = {
    hidden: {
      opacity: 0,
      y: 60,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const slideInLeft = {
    hidden: {
      opacity: 0,
      x: -100,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const slideInRight = {
    hidden: {
      opacity: 0,
      x: 100,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Características principales
  const features = [
    {
      icon: <FaTachometerAlt className="w-8 h-8" />,
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
          {/* Encabezado con animación */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center px-6 py-3 bg-orange-500/20 rounded-full border border-orange-400/30 mb-8"
            >
              <FaCrown className="w-5 h-5 text-orange-400 mr-2" />
              <span className="text-orange-300 font-semibold">
                Líderes en Conectividad Digital
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Descubre por qué{" "}
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                RNC
              </span>{" "}
              es diferente
            </motion.h1>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "8rem" }}
              transition={{ delay: 0.8, duration: 1 }}
              className="h-1.5 bg-gradient-to-r from-orange-500 to-amber-500 mx-auto mb-8 rounded-full shadow-lg shadow-orange-500/30"
            ></motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed font-light"
            >
              No somos solo un proveedor de internet. Somos tu{" "}
              <span className="text-orange-300 font-semibold">
                socio estratégico
              </span>{" "}
              en conectividad, con tecnología de punta y un{" "}
              <span className="text-amber-300 font-semibold">
                compromiso real
              </span>{" "}
              con tu satisfacción.
            </motion.p>
          </motion.div>

          {/* Características Principales con animaciones al scroll */}
          <div ref={featuresRef} className="mb-20">
            <motion.div
              initial="hidden"
              animate={featuresControls}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                Características que nos hacen{" "}
                <span className="text-orange-400">únicos</span>
              </h2>
              <p className="text-xl text-blue-200 max-w-2xl mx-auto">
                Tecnología de vanguardia combinada con servicio excepcional
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={featuresControls}
              variants={containerVariants}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className="group bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:border-orange-400/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20"
                >
                  <div className="flex items-start space-x-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}
                    >
                      <div className="text-white">{feature.icon}</div>
                    </motion.div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <motion.h3
                          whileHover={{ color: "#fdba74" }}
                          className="text-2xl font-bold text-white transition-colors duration-300"
                        >
                          {feature.title}
                        </motion.h3>
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg"
                        >
                          {feature.metric}
                        </motion.span>
                      </div>

                      <p className="text-blue-100 mb-4 leading-relaxed">
                        {feature.description}
                      </p>

                      <motion.div className="space-y-2">
                        {feature.benefits.map((benefit, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + idx * 0.1 }}
                            className="flex items-center text-blue-200 text-sm"
                          >
                            <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                            {benefit}
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Servicios Adicionales con animaciones al scroll */}
          <div ref={servicesRef} className="mb-20">
            <motion.div
              initial="hidden"
              animate={servicesControls}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Servicios <span className="text-amber-400">Premium</span>{" "}
                Incluidos
              </h2>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={servicesControls}
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.05,
                    y: -10,
                    transition: { type: "spring", stiffness: 300 },
                  }}
                  className="group bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-orange-400/50 transition-all duration-300 text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  >
                    <div className="text-white">{service.icon}</div>
                  </motion.div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-300 transition-colors duration-300">
                    {service.title}
                  </h3>

                  <p className="text-blue-100 text-sm mb-3 leading-relaxed">
                    {service.description}
                  </p>

                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="inline-block bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-sm font-semibold border border-orange-400/30"
                  >
                    {service.highlight}
                  </motion.span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Ventajas Exclusivas con animaciones al scroll */}
          <div ref={advantagesRef} className="mb-20">
            <motion.div
              initial="hidden"
              animate={advantagesControls}
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Ventajas <span className="text-green-400">Exclusivas</span>{" "}
                  RNC
                </h2>
                <p className="text-blue-200 text-lg">
                  Beneficios que solo nosotros ofrecemos
                </p>
              </div>

              <motion.div
                initial="hidden"
                animate={advantagesControls}
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {advantages.map((advantage, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.02,
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      transition: { duration: 0.2 },
                    }}
                    className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 transition-all duration-300 group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-xl flex items-center justify-center transition-transform duration-300"
                    >
                      <div className="text-orange-400">{advantage.icon}</div>
                    </motion.div>
                    <span className="text-blue-100 font-medium flex-1">
                      {advantage.text}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Llamada a la acción con animaciones al scroll */}
          <div ref={ctaRef} className="mb-16">
            <motion.div
              initial="hidden"
              animate={ctaControls}
              variants={fadeInUp}
              className="text-center bg-gradient-to-r from-orange-500/20 to-amber-500/20 backdrop-blur-xl rounded-3xl p-12 border border-orange-400/30 hover:border-orange-400/50 transition-all duration-500"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex justify-center mb-6"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-orange-500/40">
                  <FaRocket className="w-10 h-10 text-white" />
                </div>
              </motion.div>

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

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              >
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(249, 115, 22, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleContratar}
                  className="group relative bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-5 px-12 rounded-2xl text-lg transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center space-x-3">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <FaRocket className="w-5 h-5" />
                    </motion.div>
                    <span>Contratar Ahora</span>
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.8 }}
                  ></motion.div>
                </motion.button>

                <motion.button
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleConocerPlanes}
                  className="group relative bg-transparent hover:bg-white/10 text-white font-bold py-5 px-12 rounded-2xl text-lg border-2 border-orange-400/50 hover:border-orange-400 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center space-x-3">
                    <FaUserCheck className="w-5 h-5" />
                    <span>Ver Planes Detallados</span>
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/10 to-transparent transform -skew-x-12"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.8 }}
                  ></motion.div>
                </motion.button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap justify-center gap-6 mt-8 text-blue-200 text-sm"
              >
                {[
                  "Sin costos de instalación",
                  "Garantía 30 días",
                  "Soporte 24/7",
                  "Equipos incluidos",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-center space-x-2"
                  >
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Estadísticas con animaciones al scroll */}
          <div ref={statsRef} className="mb-20">
            <motion.div
              initial="hidden"
              animate={statsControls}
              variants={containerVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
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
                  icon: <FaTachometerAlt className="w-6 h-6" />,
                  color: "text-amber-400",
                  description: "Máximo rendimiento",
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={statsVariants}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                    transition: { type: "spring", stiffness: 300 },
                  }}
                  className="text-center group"
                >
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-orange-400/50 transition-all duration-300 h-full">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className={`w-14 h-14 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-xl flex items-center justify-center mb-4 mx-auto transition-transform duration-300 ${stat.color}`}
                    >
                      {stat.icon}
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      className={`text-3xl md:text-4xl font-bold mb-2 ${stat.color} font-mono`}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-blue-200 text-sm font-semibold uppercase tracking-wide mb-1">
                      {stat.label}
                    </div>
                    <div className="text-blue-300 text-xs">
                      {stat.description}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nosotros;
