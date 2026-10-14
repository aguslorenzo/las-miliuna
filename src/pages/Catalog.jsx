import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { TopBanner } from "../components/TopBanner";
import {
  ShoppingBag,
  Heart,
  Filter,
  X,
  Trash2,
  Plus,
  Minus,
} from "lucide-react";

// Lista de Emprendedores
const VENDORS = [
  "Cerámicas Ana",
  "Velas Luz",
  "Tejidos Deco",
  "Jabones Mara",
  "Bordados Sol",
  "Cueros León",
];

// Productos de muestra
const PRODUCTS = [
  {
    id: 1,
    name: "Jarrón Artesanal",
    vendor: "Cerámicas Ana",
    price: 45.0,
    image:
      "https://d22fxaf9t8d39k.cloudfront.net/f22d2110410615994cd2f86dab2e47ac54dc70bdac2b30ca8c86ca03550b8fa268793.jpg",
    tag: "Más Vendido",
  },
  {
    id: 2,
    name: "Cojín Bordado",
    vendor: "Tejidos Deco",
    price: 38.0,
    image:
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 3,
    name: "Vela Aromática",
    vendor: "Velas Luz",
    price: 24.0,
    image:
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=400",
    tag: "Nuevo",
  },
  {
    id: 4,
    name: "Taza Cerámica Rústica",
    vendor: "Cerámicas Ana",
    price: 25.0,
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 5,
    name: "Set Jabones Naturales",
    vendor: "Jabones Mara",
    price: 18.0,
    image:
      "https://images.unsplash.com/photo-1607006344380-b6775a0824a7?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 6,
    name: "Cartuchera de Cuero",
    vendor: "Cueros León",
    price: 29.0,
    image:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=400",
  },
];

export function Catalog() {
  const [selectedVendors, setSelectedVendors] = useState(["Cerámicas Ana"]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); // Controla el carrito lateral derecho

  // Items del carrito
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Jarrón Artesanal",
      vendor: "Cerámicas Ana",
      price: 45.0,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?auto=format&fit=crop&q=80&w=100",
    },
    {
      id: 2,
      name: "Cojín Bordado",
      vendor: "Tejidos Deco",
      price: 38.0,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=100",
    },
    {
      id: 3,
      name: "Vela Aromática",
      vendor: "Velas Luz",
      price: 24.0,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=100",
    },
  ]);

  const toggleVendor = (vendor) => {
    setSelectedVendors((prev) =>
      prev.includes(vendor)
        ? prev.filter((v) => v !== vendor)
        : [...prev, vendor],
    );
  };

  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      }),
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shipping = cartItems.length > 0 ? 8.0 : 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen flex flex-col bg-neutral-100/30 font-sans relative overflow-x-hidden">
      <TopBanner />
      {/* Navbar que activa/desactiva el carrito */}
      <Navbar onOpenCart={() => setIsCartOpen(true)} />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Toggle Filtro Mobile */}
        <div className="lg:hidden flex items-center justify-between mb-6 pb-4 border-b border-neutral-100">
          <h1 className="font-heading text-xl font-bold text-neutral-600">
            Catálogo
          </h1>
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-100 rounded-xl text-xs font-semibold text-neutral-600 shadow-xs"
          >
            <Filter className="w-4 h-4 text-primary-400" />
            Filtros
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ================= 1. SIDEBAR DE FILTROS IZQUIERDA (3 COLS) ================= */}
          <aside className="lg:col-span-3 hidden lg:block">
            <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-xs space-y-6 sticky top-24">
              <div>
                <h3 className="text-xs font-bold text-neutral-600 uppercase tracking-wider mb-1">
                  Filtrar por Vendedor
                </h3>
                <p className="text-[11px] text-neutral-300 font-medium mb-4">
                  Emprendedores Locales
                </p>

                <div className="space-y-3">
                  {VENDORS.map((vendor) => {
                    const isChecked = selectedVendors.includes(vendor);
                    return (
                      <label
                        key={vendor}
                        className="flex items-center gap-3 cursor-pointer group select-none"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleVendor(vendor)}
                          className="w-4 h-4 rounded border-neutral-200 text-primary-400 focus:ring-primary-100 cursor-pointer accent-primary-400"
                        />
                        <span
                          className={`text-xs transition-colors ${isChecked ? "font-bold text-neutral-600" : "text-neutral-400 group-hover:text-neutral-600"}`}
                        >
                          {vendor}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={() => setSelectedVendors([])}
                className="w-full py-2.5 px-4 bg-neutral-100/60 hover:bg-neutral-100 text-neutral-500 hover:text-neutral-600 font-medium text-xs rounded-xl border border-neutral-200/60 transition-all cursor-pointer"
              >
                Limpiar filtros
              </button>
            </div>
          </aside>

          {/* ================= 2. GRILLA PRINCIPAL DE PRODUCTOS (9 COLS) ================= */}
          <section className="lg:col-span-9">
            <div className="hidden lg:flex items-center justify-between mb-6">
              <h1 className="font-heading text-2xl font-bold text-neutral-600 tracking-tight">
                Catálogo de Productos
              </h1>
              <span className="text-xs text-neutral-300 font-medium">
                Mostrando {PRODUCTS.length} productos
              </span>
            </div>

            {/* Configurado en 3 columnas para que las fotos tengan buen espacio */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PRODUCTS.map((product) => (
                <div
                  key={product.id}
                  className="group relative bg-white rounded-2xl border border-neutral-100 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative aspect-square w-full bg-neutral-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    {product.tag && (
                      <span className="absolute top-3 left-3 bg-primary-100 text-primary-600 text-[11px] font-bold px-2.5 py-1 rounded-full border border-primary-200/60">
                        {product.tag}
                      </span>
                    )}

                    <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-md text-neutral-400 hover:text-primary-500 hover:bg-white transition-colors shadow-xs">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-medium text-neutral-300">
                        por {product.vendor}
                      </span>
                      <h3 className="font-semibold text-xs text-neutral-600 mt-0.5 group-hover:text-primary-500 transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                    </div>

                    <div className="mt-2">
                      <span className="text-sm font-bold text-neutral-600">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <button
                      onClick={() => setIsCartOpen(true)}
                      className="font-heading w-full py-2 px-3 bg-primary-400 hover:bg-primary-500 active:bg-primary-600 text-white font-semibold text-xs rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Agregar al Carrito
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* ================= 3. PANEL LATERAL DERECHO: TU CARRITO (DRAWER) ================= */}

      {/* Overlay Oscuro tenue detrás del carrito */}
      {isCartOpen && (
        <div
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-neutral-600/20 backdrop-blur-[2px] z-40 transition-opacity"
        />
      )}

      <aside
        className={`
          fixed top-0 right-0 z-50 h-full w-full sm:w-[380px] bg-white shadow-2xl border-l border-neutral-100
          flex flex-col justify-between transform transition-transform duration-300 ease-in-out
          ${isCartOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header Carrito */}
        <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-heading font-bold text-lg text-neutral-600">
              Tu Carrito
            </h2>
            <span className="text-xs bg-primary-100 text-primary-500 font-bold px-2 py-0.5 rounded-full">
              {cartItems.length} Artículos
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1 text-neutral-300 hover:text-neutral-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lista de Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex gap-3 pb-4 border-b border-neutral-100 items-center"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-14 h-14 object-cover rounded-xl bg-neutral-100 border border-neutral-100"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-xs text-neutral-600">
                  {item.name}
                </h4>
                <p className="text-[10px] text-neutral-300">{item.vendor}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center border border-neutral-200/80 rounded-lg bg-neutral-100/50">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1 text-neutral-400 hover:text-neutral-600"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-semibold px-2 text-neutral-600">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1 text-neutral-400 hover:text-neutral-600"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1 text-neutral-300 hover:text-primary-400 transition-colors ml-auto"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-neutral-600">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Carrito (Totales y Checkout) */}
        <div className="p-6 bg-neutral-100/20 border-t border-neutral-100 space-y-3">
          <div className="flex justify-between text-xs text-neutral-400">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xs text-neutral-400">
            <span>Envío estimado</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm font-bold text-neutral-600 pt-2 border-t border-neutral-100">
            <span>Total</span>
            <span className="text-primary-500 font-heading">
              ${total.toFixed(2)}
            </span>
          </div>

          <Link
            to="/cart"
            className="font-heading block text-center w-full py-3 px-4 bg-primary-400 hover:bg-primary-500 active:bg-primary-600 text-white font-semibold text-xs rounded-xl shadow-md hover:shadow-lg transition-all duration-200 mt-2 cursor-pointer"
          >
            Finalizar Compra
          </Link>
        </div>
      </aside>

      {/* Footer Reutilizado */}
      <Footer />
    </div>
  );
}
