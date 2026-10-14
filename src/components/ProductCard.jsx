import { Heart, ShoppingBag } from "lucide-react";

export function ProductCard({ product, onAddToCart, onToggleFavorite }) {
  const { id, name, vendor, price, image, tag } = product;

  return (
    <div className="group relative bg-white rounded-2xl border border-neutral-100 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
      
      {/* Imagen + Tags + Favoritos */}
      <div className="relative aspect-square w-full bg-neutral-100 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {tag && (
          <span className="absolute top-3 left-3 bg-primary-100 text-primary-600 text-[11px] font-bold px-2.5 py-1 rounded-full border border-primary-200/60 shadow-xs">
            {tag}
          </span>
        )}

        <button
          onClick={() => onToggleFavorite && onToggleFavorite(id)}
          aria-label="Agregar a favoritos"
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-md text-neutral-400 hover:text-primary-500 hover:bg-white transition-colors shadow-xs cursor-pointer"
        >
          <Heart className="w-4 h-4" />
        </button>
      </div>

      {/* Información del Producto */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-xs font-medium text-neutral-400">
            por {vendor}
          </span>
          <h3 className="font-semibold text-sm text-neutral-600 mt-0.5 group-hover:text-primary-500 transition-colors line-clamp-1">
            {name}
          </h3>
        </div>

        <div className="mt-2">
          <span className="text-base font-bold text-neutral-600">
            ${typeof price === "number" ? price.toFixed(2) : price}
          </span>
        </div>
      </div>

      {/* Botón de Acción Principal */}
      <div className="p-4 pt-0">
        <button
          onClick={() => onAddToCart && onAddToCart(product)}
          className="font-heading w-full py-2.5 px-4 bg-primary-400 hover:bg-primary-500 active:bg-primary-600 text-white font-semibold text-xs rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-xs group-hover:shadow-md"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          Agregar al Carrito
        </button>
      </div>

    </div>
  );
}