import { useState } from "react";
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
      Legal: "bg-blue-500 text-white",
      Calidad: "bg-green-500 text-white",
      Servicios: "bg-purple-500 text-white",
      Social: "bg-pink-500 text-white",
      Seguridad: "bg-red-500 text-white",
      Técnico: "bg-orange-500 text-white",
      Referencia: "bg-indigo-500 text-white",
    };
    return colores[categoria] || "bg-gray-500 text-white";
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

  return (
    <div
      id="documentos"
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20"
    >
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Documentos <span className="text-blue-600">Legales</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Accede a toda la documentación legal, normativa y técnica que regula
            nuestros servicios de telecomunicaciones.
          </p>
        </div>

        {/* Filtros por categoría */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              onClick={() => setCategoriaActiva(categoria)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                categoriaActiva === categoria
                  ? "bg-blue-600 text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 shadow-md hover:shadow-lg border border-gray-200 hover:scale-105"
              }`}
            >
              {categoria}
            </button>
          ))}
        </div>

        {/* Grid de Documentos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documentosFiltrados.map((documento) => (
            <div
              key={documento.id}
              className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              {/* Header con imagen mejorada */}
              <div className="relative h-40 bg-gradient-to-br from-blue-400 to-blue-600 overflow-hidden">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300"></div>

                {/* Imagen del documento */}
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div className="bg-white/90 rounded-lg p-4 transform group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={documento.imageUrl}
                      alt="Icono documento"
                      className="w-12 h-12 object-contain"
                      onError={(e) => {
                        e.target.src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'%3E%3C/path%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                </div>

                {/* Badge categoría */}
                <div className="absolute top-3 left-3">
                  <span
                    className={`${getColorCategoria(
                      documento.categoria
                    )} px-3 py-1 rounded-full text-xs font-semibold`}
                  >
                    {documento.categoria}
                  </span>
                </div>

                {/* Tamaño */}
                <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                  {documento.tamaño}
                </div>
              </div>

              {/* Contenido */}
              <div className="p-5">
                {/* Título */}
                <h3 className="font-bold text-gray-800 text-base mb-2 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                  {documento.title}
                </h3>

                {/* Descripción */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {documento.descripcion}
                </p>

                {/* Botones de acción */}
                <div className="flex gap-2">
                  <button
                    onClick={(e) => handleView(documento.pdfUrl, e)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm"
                  >
                    <svg
                      className="w-4 h-4"
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
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm"
                  >
                    <svg
                      className="w-4 h-4"
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
          <div className="text-center py-12">
            <div className="text-gray-400 text-4xl mb-3">📄</div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              No hay documentos en esta categoría
            </h3>
            <p className="text-gray-500">
              Intenta con otra categoría o vuelve a "Todos"
            </p>
          </div>
        )}

        {/* Información adicional */}
        <div className="mt-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-center text-white">
          <h3 className="text-xl font-bold mb-3">
            ¿Necesitas ayuda con algún documento?
          </h3>
          <p className="text-blue-100 mb-4 max-w-xl mx-auto text-sm">
            Si tienes dudas sobre algún documento legal o necesitas asesoría,
            nuestro equipo está para ayudarte.
          </p>
          <button className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-2 px-6 rounded-lg transition-all duration-200 transform hover:scale-105">
            Contactar Soporte
          </button>
        </div>
      </div>
    </div>
  );
};

export default Documentos;
