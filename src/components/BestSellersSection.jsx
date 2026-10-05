import { ShoppingBag, Heart } from "lucide-react";

// Datos de prueba
const PRODUCTS = [
  {
    id: 1,
    name: "Jarrón Artesanal",
    vendor: "Cerámicas Ana",
    price: "$4500",
    image: "https://http2.mlstatic.com/D_NQ_NP_638499-MLA101587088317_122025-O.webp",
    tag: "Más Vendido",
  },
  {
    id: 2,
    name: "Manta Tejida Nido",
    vendor: "Textiles del Valle",
    price: "$68000",
    image: "https://d22fxaf9t8d39k.cloudfront.net/857f839ea13d459b1de087588dd91a0bb4baa6bed1ca00a767c0edcfa9ae18bd201619.jpg",
    tag: "Nuevo",
  },
  {
    id: 3,
    name: "Vela Soja & Botánica",
    vendor: "Aromas Botanicals",
    price: "$22.00",
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=400",
    tag: "Más Vendido",
  },
  {
    id: 4,
    name: "Cuadro Botánico Madera",
    vendor: "Estudio Deco",
    price: "$55.00",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=400",
  },
];

export function BestSellersSection() {
  return (
    <section className="w-full py-12 bg-white px-4 md:px-8">
      <div className="w-full max-w-7xl mx-auto">
        
        {/* Encabezado de la sección: Título a la izquierda, "Ver todos" a la derecha */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-600 tracking-tight">
              Los más vendidos
            </h2>
            <p className="text-sm text-neutral-300 mt-1">
              Las piezas favoritas creadas por emprendedores locales
            </p>
          </div>

          <a
            href="/catalogo"
            className="text-sm font-semibold text-primary-500 hover:text-primary-600 underline-offset-4 hover:underline transition-colors"
          >
            Ver todos &rarr;
          </a>
        </div>

        {/* Grid de Productos (1 col en mobile chico, 2 en mobile grande, 4 en desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-2xl border border-neutral-100 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              {/* Top: Imagen + Badges */}
              <div className="relative aspect-square w-full bg-neutral-100 overflow-hidden">
                {/* Imagen del producto con efecto Zoom en Hover */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Badge flotante (si tiene etiqueta) */}
                {product.tag && (
                  <span className="absolute top-3 left-3 bg-primary-100 text-primary-600 text-xs font-bold px-2.5 py-1 rounded-full border border-primary-200 shadow-xs">
                    {product.tag}
                  </span>
                )}

                {/* Botón de Guardar a Favoritos (opcional) */}
                <button
                  aria-label="Agregar a favoritos"
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-md text-neutral-400 hover:text-primary-500 hover:bg-white transition-colors shadow-xs"
                >
                  <Heart className="w-4 h-4" />
                </button>
              </div>

              {/* Middle: Información del producto */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-medium text-secondary-purple-400">
                    por {product.vendor}
                  </span>
                  <h3 className="font-semibold text-base text-neutral-600 mt-0.5 group-hover:text-primary-500 transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                </div>

                <div className="mt-3">
                  <span className="text-lg font-bold text-neutral-600">
                    {product.price}
                  </span>
                </div>
              </div>

              {/* Bottom: Botón Agregar al Carrito */}
              <div className="p-4 pt-0">
                <button className="w-full py-2.5 px-4 bg-primary-400 hover:bg-primary-500 active:bg-primary-600 text-white font-semibold text-sm rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-xs group-hover:shadow-md cursor-pointer">
                  <ShoppingBag className="w-4 h-4" />
                  Agregar al Carrito
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}