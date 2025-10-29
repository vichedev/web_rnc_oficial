import { useState, useEffect } from 'react';

const Planes = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const planes = [
    {
      id: 1,
      nombre: "PLAN HOME - BÁSICO",
      velocidad: "50 MB",
      caracteristicas: ["Simétrico", "Compartición 2:1", "WIFI Incluido"],
      descripcion: "Ideal para estudiantes y navegación básica",
      precio: "$20.00",
      incluye: "Incluye Impuestos",
      imagen: "/images/refe.jpg",
      color: "blue",
      popular: false,
    },
    {
      id: 2,
      nombre: "PLAN INTERMEDIO",
      velocidad: "75 MB",
      caracteristicas: ["Simétrico", "WIFI Incluido", "Conexión estable"],
      descripcion: "Perfecto para teletrabajo y streaming",
      precio: "$35.00",
      incluye: "Incluye Impuestos",
      imagen: "/images/refe.jpg",
      color: "green",
      popular: true,
    },
    {
      id: 3,
      nombre: "PLAN AVANZADO",
      velocidad: "100 MB",
      caracteristicas: ["Simétrico", "WIFI Incluido", "Baja latencia"],
      descripcion: "Excelente para gaming y hogares conectados",
      precio: "$50.00",
      incluye: "Incluye Impuestos",
      imagen: "/images/refe.jpg",
      color: "purple",
      popular: false,
    },
    {
      id: 4,
      nombre: "PLAN CORPORATIVO",
      velocidad: "200 MB",
      caracteristicas: ["Simétrico", "WIFI Incluido", "Soporte prioritario"],
      descripcion: "Soluciones empresariales para tu oficina",
      precio: "$300.00",
      incluye: "Incluye Impuestos",
      imagen: "/images/refe.jpg",
      color: "orange",
      popular: false,
    },
    {
      id: 5,
      nombre: "PLAN TERCERA EDAD",
      velocidad: "50 MB",
      caracteristicas: ["Simétrico", "Compartición 2:1", "WIFI Incluido"],
      descripcion: "Pensado para nuestros adultos mayores",
      precio: "$10.00",
      incluye: "Incluye Impuestos *Aplica restricciones",
      imagen: "/images/refe.jpg",
      color: "teal",
      popular: false,
    },
    {
      id: 6,
      nombre: "PLAN DISCAPACIDAD",
      velocidad: "50 MB",
      caracteristicas: ["Simétrico", "Compartición 1:1", "WIFI Incluido"],
      descripcion: "Accesibilidad digital para todos",
      precio: "$15.00",
      incluye: "Incluye Impuestos *Aplica restricciones",
      imagen: "/images/refe.jpg",
      color: "indigo",
      popular: false,
    },
  ];

  // Componente de partículas animadas
  const FloatingParticles = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Partículas pequeñas */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-200/40 to-purple-200/40 animate-float"
            style={{
              width: `${Math.random() * 15 + 5}px`,
              height: `${Math.random() * 15 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${Math.random() * 25 + 15}s`,
            }}
          />
        ))}
        {/* Partículas medianas */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i + 20}
            className="absolute rounded-full bg-gradient-to-r from-blue-300/30 to-purple-300/30 animate-float-slow"
            style={{
              width: `${Math.random() * 25 + 10}px`,
              height: `${Math.random() * 25 + 10}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${Math.random() * 30 + 20}s`,
            }}
          />
        ))}
        {/* Partículas grandes */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i + 32}
            className="absolute rounded-full bg-gradient-to-r from-blue-100/20 to-purple-100/20 animate-float-slower"
            style={{
              width: `${Math.random() * 40 + 20}px`,
              height: `${Math.random() * 40 + 20}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 40 + 30}s`,
            }}
          />
        ))}
      </div>
    );
  };

  // Patrón de conexión de red
  const NetworkPattern = () => {
    return (
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="w-full h-full" 
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, currentColor 1px, transparent 1px),
              radial-gradient(circle at 75% 75%, currentColor 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            backgroundPosition: '0 0, 25px 25px'
          }}
        ></div>
      </div>
    );
  };

  const handleWhatsAppClick = (planNombre) => {
    const message = `¡Hola! Estoy interesado en el ${planNombre} de RNC. ¿Podrían darme más información?`;
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = "+59343755230";
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
      "_blank"
    );
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: "from-blue-500 to-blue-600 border-blue-200",
      green: "from-green-500 to-green-600 border-green-200",
      purple: "from-purple-500 to-purple-600 border-purple-200",
      orange: "from-orange-500 to-orange-600 border-orange-200",
      teal: "from-teal-500 to-teal-600 border-teal-200",
      indigo: "from-indigo-500 to-indigo-600 border-indigo-200",
    };
    return colors[color] || colors.blue;
  };

  const openImageModal = (plan) => {
    setSelectedImage({
      src: plan.imagen,
      alt: plan.nombre,
      title: plan.nombre
    });
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <div
      id="planes"
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 pt-20 relative overflow-hidden"
    >
      {/* Fondo con partículas animadas */}
      <FloatingParticles />
      <NetworkPattern />
      
      {/* Patrón de grid sutil */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        {/* Encabezado Mejorado */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
            </svg>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            NUESTROS <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">PLANES</span>
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Descubre la perfecta conexión para tu hogar o negocio. Velocidad
            simétrica garantizada y soporte técnico especializado.
          </p>
        </div>

        {/* Grid de Planes Mejorado */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {planes.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100/80 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                plan.popular ? "ring-2 ring-blue-500/50 ring-opacity-50" : ""
              } group`}
            >
              {/* Badge Popular Mejorado */}
              {plan.popular && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full text-sm font-bold z-10 shadow-lg flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  MÁS POPULAR
                </div>
              )}

              {/* Imagen con efectos mejorados */}
              <div 
                className="h-48 overflow-hidden cursor-pointer relative bg-gradient-to-br from-gray-100 to-gray-200"
                onClick={() => openImageModal(plan)}
              >
                <img
                  src={plan.imagen}
                  alt={plan.nombre}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay de gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                
                {/* Efecto de conexión animada */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-white">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold drop-shadow-lg">Conexión Activa</span>
                  </div>
                </div>

                {/* Overlay de información al hacer hover */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m0 0l3-3m-3 3L7 13" />
                    </svg>
                    <span className="text-sm font-semibold">Ver detalles</span>
                  </div>
                </div>
              </div>

              {/* Contenido Mejorado */}
              <div className="p-6">
                {/* Nombre y Velocidad */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {plan.nombre}
                  </h3>
                  <div
                    className={`inline-block bg-gradient-to-r ${getColorClasses(
                      plan.color
                    )} text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg`}
                  >
                    ⚡ {plan.velocidad} SIMÉTRICO
                  </div>
                </div>

                {/* Descripción */}
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {plan.descripcion}
                </p>

                {/* Características Mejoradas */}
                <ul className="space-y-3 mb-6">
                  {plan.caracteristicas.map((caracteristica, index) => (
                    <li key={index} className="flex items-center text-gray-700 group/item">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 group-hover/item:scale-110 transition-transform duration-200">
                        <svg
                          className="w-3 h-3 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">{caracteristica}</span>
                    </li>
                  ))}
                </ul>

                {/* Precio Mejorado */}
                <div className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200/50">
                  <div className="text-3xl font-bold text-gray-800 mb-1">
                    {plan.precio}
                    <span className="text-sm font-normal text-gray-500">/mes</span>
                  </div>
                  <div className="text-sm text-gray-500">{plan.incluye}</div>
                </div>

                {/* Botón WhatsApp Mejorado */}
                <button
                  onClick={() => handleWhatsAppClick(plan.nombre)}
                  className={`w-full bg-gradient-to-r ${getColorClasses(
                    plan.color
                  )} hover:shadow-xl text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 group/btn shadow-lg`}
                >
                  <svg
                    className="w-5 h-5 group-hover/btn:scale-110 transition-transform duration-200"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893-.001-3.189-1.262-6.187-3.55-8.444" />
                  </svg>
                  <span className="group-hover/btn:translate-x-1 transition-transform duration-200">
                    Consultar por WhatsApp
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Nota adicional Mejorada */}
        <div className="text-center mt-12 bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/80 shadow-lg">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <p className="text-gray-600 text-lg">
            💡 <strong>¿No encuentras lo que buscas?</strong> Contáctanos para
            un plan personalizado según tus necesidades específicas.
          </p>
        </div>
      </div>

      {/* Modal para imagen ampliada */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeImageModal}
        >
          <div className="relative max-w-4xl max-h-full">
            {/* Botón cerrar mejorado */}
            <button
              onClick={closeImageModal}
              className="absolute -top-16 right-0 text-white hover:text-gray-300 transition-colors duration-200 bg-black/50 rounded-full p-3 backdrop-blur-sm"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Imagen */}
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-auto max-h-[80vh] object-contain rounded-xl shadow-2xl"
            />
            
            {/* Título mejorado */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm text-white p-4 rounded-xl">
              <h3 className="text-lg font-semibold">{selectedImage.title}</h3>
            </div>
          </div>
        </div>
      )}

      {/* Estilos para las animaciones de partículas */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg) translateX(0);
          }
          33% {
            transform: translateY(-30px) rotate(120deg) translateX(10px);
          }
          66% {
            transform: translateY(15px) rotate(240deg) translateX(-5px);
          }
        }
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0) rotate(0deg) translateX(0);
          }
          33% {
            transform: translateY(-20px) rotate(90deg) translateX(15px);
          }
          66% {
            transform: translateY(10px) rotate(180deg) translateX(-10px);
          }
        }
        @keyframes float-slower {
          0%, 100% {
            transform: translateY(0) rotate(0deg) translateX(0);
          }
          50% {
            transform: translateY(-15px) rotate(60deg) translateX(8px);
          }
        }
        .animate-float {
          animation: float 20s infinite linear;
        }
        .animate-float-slow {
          animation: float-slow 30s infinite linear;
        }
        .animate-float-slower {
          animation: float-slower 40s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default Planes;