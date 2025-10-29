const Planes = () => {
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

  return (
    <div
      id="planes"
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20"
    >
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            NUESTROS <span className="text-blue-600">PLANES</span>
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre la perfecta conexión para tu hogar o negocio. Velocidad
            simétrica garantizada y soporte técnico especializado.
          </p>
        </div>

        {/* Grid de Planes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {planes.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                plan.popular ? "ring-2 ring-blue-500 ring-opacity-50" : ""
              }`}
            >
              {/* Badge Popular */}
              {plan.popular && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-1 rounded-full text-sm font-bold z-10">
                  ⭐ MÁS POPULAR
                </div>
              )}

              {/* Imagen */}
              <div className="h-48 overflow-hidden">
                <img
                  src={plan.imagen}
                  alt={plan.nombre}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div
                  className={`absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-black/50 to-transparent`}
                ></div>
              </div>

              {/* Contenido */}
              <div className="p-6">
                {/* Nombre y Velocidad */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {plan.nombre}
                  </h3>
                  <div
                    className={`inline-block bg-gradient-to-r ${getColorClasses(
                      plan.color
                    )} text-white px-4 py-1 rounded-full text-sm font-semibold`}
                  >
                    {plan.velocidad} SIMÉTRICO
                  </div>
                </div>

                {/* Descripción */}
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {plan.descripcion}
                </p>

                {/* Características */}
                <ul className="space-y-2 mb-6">
                  {plan.caracteristicas.map((caracteristica, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <svg
                        className="w-5 h-5 text-green-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {caracteristica}
                    </li>
                  ))}
                </ul>

                {/* Precio */}
                <div className="mb-6">
                  <div className="text-3xl font-bold text-gray-800 mb-1">
                    {plan.precio}
                  </div>
                  <div className="text-sm text-gray-500">{plan.incluye}</div>
                </div>

                {/* Botón WhatsApp */}
                <button
                  onClick={() => handleWhatsAppClick(plan.nombre)}
                  className={`w-full bg-gradient-to-r ${getColorClasses(
                    plan.color
                  )} hover:opacity-90 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893-.001-3.189-1.262-6.187-3.55-8.444" />
                  </svg>
                  <span>Consultar por WhatsApp</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Nota adicional */}
        <div className="text-center mt-12 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
          <p className="text-gray-600">
            💡 <strong>¿No encuentras lo que buscas?</strong> Contáctanos para
            un plan personalizado según tus necesidades específicas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Planes;
