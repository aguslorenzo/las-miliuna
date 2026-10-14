import { ProductCard } from "./ProductCard";

// Datos de prueba
const BEST_SELLERS = [
  {
    id: 1,
    name: "Jarrón Artesanal",
    vendor: "Cerámicas Ana",
    price: "4500",
    image: "https://http2.mlstatic.com/D_NQ_NP_638499-MLA101587088317_122025-O.webp",
    tag: "Más Vendido",
  },
  {
    id: 2,
    name: "Manta Tejida Nido",
    vendor: "Textiles del Valle",
    price: "68000",
    image: "https://d22fxaf9t8d39k.cloudfront.net/857f839ea13d459b1de087588dd91a0bb4baa6bed1ca00a767c0edcfa9ae18bd201619.jpg",
    tag: "Nuevo",
  },
  {
    id: 3,
    name: "Vela Soja & Botánica",
    vendor: "Aromas Botanicals",
    price: "22.00",
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=400",
    tag: "Más Vendido",
  },
  {
    id: 4,
    name: "Cuadro Botánico Madera",
    vendor: "Estudio Deco",
    price: "55.00",
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
          {BEST_SELLERS.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={(item) => handleAddToCart(item)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}