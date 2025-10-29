import { useState, useEffect } from "react";
import documentosData from "../data/documents";

const Documentos = () => {
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");

  // Obtener categorías únicas
  const categorias = [
    "Todos",
    ...new Set(documentosData.map((doc) => doc.categoria)),
  ];

  // Filtrar documentos por categoría
  const documentosFiltrados =
    categoriaActiva === "Todos"
      ? documentosData
      : documentosData.filter((doc) => doc.categoria === categoriaActiva);

  const getColorCategoria = (categoria) => {
    const colores = {
      Legal: "from-blue-500 to-blue-600",
      Calidad: "from-green-500 to-green-600",
      Servicios: "from-purple-500 to-purple-600",
      Social: "from-pink-500 to-pink-600",
      Seguridad: "from-red-500 to-red-600",
      Técnico: "from-orange-500 to-orange-600",
      Referencia: "from-indigo-500 to-indigo-600",
    };
    return colores[categoria] || "from-gray-500 to-gray-600";
  };

  // Imágenes de fondo para las cards
  const getBackgroundImage = (categoria) => {
    const images = {
      Legal: "/Documents/img_icon/Reglamento.jpg",
      Calidad: "/Documents/img_icon/parametros.jpg",
      Servicios:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      Social:
        "https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      Seguridad:
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      Técnico: "/Documents/img_icon/tecnico.jpg",
      Referencia:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    };
    return (
      images[categoria] ||
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    );
  };

  const getIconoCategoria = (categoria) => {
    const iconos = {
      Legal: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      Calidad: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      Servicios: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      Social: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      Seguridad: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
      Técnico: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      Referencia: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
          />
        </svg>
      ),
    };
    return iconos[categoria] || iconos.Legal;
  };

  const handleDownload = (pdfUrl, title, event) => {
    event.preventDefault();
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = `${title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = (pdfUrl, event) => {
    event.preventDefault();
    window.open(pdfUrl, "_blank", "noopener,noreferrer");
  };

  // Componente de partículas animadas
  const FloatingParticles = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-600/30 to-purple-500/30 animate-float"
            style={{
              width: `${Math.random() * 40 + 20}px`,
              height: `${Math.random() * 20 + 10}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${Math.random() * 20 + 20}s`,
            }}
          />
        ))}
        {[...Array(10)].map((_, i) => (
          <div
            key={i + 15}
            className="absolute rounded-full bg-gradient-to-r from-blue-100/40 to-purple-100/40 animate-float"
            style={{
              width: `${Math.random() * 30 + 15}px`,
              height: `${Math.random() * 30 + 15}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${Math.random() * 25 + 25}s`,
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div
      id="documentos"
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 pt-20 relative overflow-hidden"
    >
      {/* Partículas flotantes de fondo */}
      <FloatingParticles />

      {/* Patrón de grid sutil */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        {/* Encabezado Mejorado */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Centro de{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Documentos
            </span>
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Accede a toda nuestra documentación legal, normativa y técnica.
            Encuentra fácilmente los documentos que necesitas para conocer más
            sobre nuestros servicios.
          </p>
        </div>

        {/* Filtros por categoría */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categorias.map((categoria) => (
              <button
                key={categoria}
                onClick={() => setCategoriaActiva(categoria)}
                className={`px-5 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 border ${
                  categoriaActiva === categoria
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105 border-transparent"
                    : "bg-white/70 text-gray-700 shadow-md hover:shadow-lg border-gray-200/80 hover:scale-105 hover:border-blue-200"
                } backdrop-blur-sm`}
              >
                {categoria === "Todos" ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  getIconoCategoria(categoria)
                )}
                {categoria}
              </button>
            ))}
          </div>
        </div>

        {/* Contador de resultados */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/80 shadow-sm">
            <span className="text-gray-600">
              Mostrando{" "}
              <span className="font-bold text-blue-600">
                {documentosFiltrados.length}
              </span>{" "}
              documento{documentosFiltrados.length !== 1 ? "s" : ""}
            </span>
            {categoriaActiva !== "Todos" && (
              <span className="flex items-center gap-1 text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                {getIconoCategoria(categoriaActiva)}
                {categoriaActiva}
              </span>
            )}
          </div>
        </div>

        {/* Grid de Documentos con Imágenes de Fondo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {documentosFiltrados.map((documento) => (
            <div
              key={documento.id}
              className="group bg-white rounded-2xl shadow-xl border border-gray-100/80 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 backdrop-blur-sm"
            >
              {/* Header con imagen de fondo */}
              <div
                className="relative h-48 overflow-hidden bg-cover bg-center"
                style={{
                  backgroundImage: `url(${getBackgroundImage(
                    documento.categoria
                  )})`,
                }}
              >
                {/* Overlay gradiente */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${getColorCategoria(
                    documento.categoria
                  )} opacity-80`}
                ></div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300"></div>

                {/* Icono del documento */}
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 transform group-hover:scale-110 transition-transform duration-500">
                    <div className="bg-white rounded-xl p-4 shadow-lg">
                      {getIconoCategoria(documento.categoria)}
                    </div>
                  </div>
                </div>

                {/* Badge categoría */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-2 rounded-full text-sm font-semibold flex items-center gap-2 border border-white/30">
                    {getIconoCategoria(documento.categoria)}
                    {documento.categoria}
                  </span>
                </div>

                {/* Tamaño y fecha */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                  <span className="bg-black/40 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                    {documento.tamaño}
                  </span>
                  {documento.fecha && (
                    <span className="bg-black/40 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm">
                      {documento.fecha}
                    </span>
                  )}
                </div>
              </div>

              {/* Contenido */}
              <div className="p-6 bg-white/90 backdrop-blur-sm">
                {/* Título */}
                <h3 className="font-bold text-gray-800 text-lg mb-3 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                  {documento.title}
                </h3>

                {/* Descripción */}
                <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
                  {documento.descripcion}
                </p>

                {/* Botones de acción */}
                <div className="flex gap-3">
                  <button
                    onClick={(e) => handleView(documento.pdfUrl, e)}
                    className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm border border-gray-200 hover:border-gray-300 hover:scale-105 group/btn"
                  >
                    <svg
                      className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    Ver
                  </button>
                  <button
                    onClick={(e) =>
                      handleDownload(documento.pdfUrl, documento.title, e)
                    }
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm shadow-lg hover:shadow-xl transform hover:scale-105 group/btn"
                  >
                    <svg
                      className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Descargar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mensaje si no hay documentos */}
        {documentosFiltrados.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-3">
              No se encontraron documentos
            </h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              No hay documentos en la categoría "{categoriaActiva}". Prueba con
              "Todos" para ver todos los documentos.
            </p>
            <button
              onClick={() => setCategoriaActiva("Todos")}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Mostrar todos los documentos
            </button>
          </div>
        )}

        {/* Sección de ayuda mejorada */}
        <div className="mt-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-center text-white relative overflow-hidden">
          {/* Elementos decorativos de fondo */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>

          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4">
              ¿Necesitas ayuda con algún documento?
            </h3>
            <p className="text-blue-100 mb-6 max-w-xl mx-auto text-lg leading-relaxed">
              Nuestro equipo de soporte está disponible para resolver tus dudas
              sobre documentación legal, técnica o cualquier consulta
              relacionada.
            </p>
            <button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg">
              Contactar Soporte
            </button>
          </div>
        </div>
      </div>

      {/* Estilos para la animación de partículas */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(120deg);
          }
          66% {
            transform: translateY(10px) rotate(240deg);
          }
        }
        .animate-float {
          animation: float 20s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default Documentos;
