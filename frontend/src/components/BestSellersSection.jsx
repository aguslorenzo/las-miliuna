import { ProductCard } from "./ProductCard";
import { BEST_SELLERS } from "../data/bestSellers";

export function BestSellersSection() {
  return (
    <section className="w-full py-12 bg-white px-4 md:px-8">
      <div className="w-full max-w-7xl mx-auto">
        
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