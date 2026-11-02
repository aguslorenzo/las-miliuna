import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { TopBanner } from "../components/TopBanner";
import { ProductCard } from "../components/ProductCard";
import { TrustBanner } from "../components/TrustBanner";
import { CheckoutModal } from "../components/CheckoutModal.jsx";
import { FilterDropdown } from "../components/FilterDropdown";
import { SortDropdown } from "../components/SortDropdown";

// Productos de muestra
const PRODUCTS = [
  {
    id: 1,
    name: "Jarrón Artesanal",
    vendor: "Cerámicas Ana",
    category: "Cerámica & Mosaicos",
    price: 45.0,
    discount: false,
    image:
      "https://d22fxaf9t8d39k.cloudfront.net/f22d2110410615994cd2f86dab2e47ac54dc70bdac2b30ca8c86ca03550b8fa268793.jpg",
    tag: "Más Vendido",
  },
  {
    id: 2,
    name: "Cojín Bordado",
    vendor: "Tejidos Deco",
    category: "Textiles Hogar",
    price: 38.0,
    discount: true,
    image:
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 3,
    name: "Vela Aromática",
    vendor: "Velas Luz",
    category: "Velas & Aromaterapia",
    price: 24.0,
    discount: false,
    image:
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=400",
    tag: "Nuevo",
  },
  {
    id: 4,
    name: "Taza Cerámica Rústica",
    vendor: "Cerámicas Ana",
    category: "Cerámica & Mosaicos",
    price: 25.0,
    discount: true,
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 5,
    name: "Set Jabones Naturales",
    vendor: "Jabones Mara",
    category: "Cosmética Natural",
    price: 18.0,
    discount: false,
    image:
      "https://images.unsplash.com/photo-1607006344380-b6775a0824a7?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 6,
    name: "Cartuchera de Cuero",
    vendor: "Cueros León",
    category: "Marroquinería",
    price: 29.0,
    discount: false,
    image:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=400",
  },
];

export function Catalog() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Estados compartidos para filtros y orden
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [onlyDiscount, setOnlyDiscount] = useState(false);
  const [sortOrder, setSortOrder] = useState("");

  // items del carrito y funciones de carrito...
  const [cartItems, setCartItems] = useState([/* ... */]);

  const handleAddToCart = (item) => {
    setCartItems(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
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

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = cartItems.length > 0 ? 8.0 : 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen flex flex-col bg-neutral-100/30 font-sans relative overflow-x-hidden">
      <TopBanner />
      <Navbar onOpenCart={() => setIsCartOpen(true)} />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        {/* BARRA MÓVIL */}
        <div className="lg:hidden flex items-center justify-between mb-6 pb-4 border-b border-neutral-100">
          <h1 className="font-heading text-xl font-bold text-neutral-600">Catálogo</h1>
          <div className="flex items-center gap-3">
            <FilterDropdown 
              selectedCategory={selectedCategory} 
              setSelectedCategory={setSelectedCategory}
              onlyDiscount={onlyDiscount}
              setOnlyDiscount={setOnlyDiscount}
            />
            <SortDropdown 
              sortOrder={sortOrder} 
              setSortOrder={setSortOrder} 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <section className="lg:col-span-12">
            
            {/* BARRA DESKTOP */}
            <div className="hidden lg:flex items-center justify-between mb-6">
              <h1 className="font-heading text-2xl font-bold text-neutral-600 tracking-tight">
                Catálogo de Productos
              </h1>
              
              <div className="flex items-center gap-3">
                <FilterDropdown 
                  selectedCategory={selectedCategory} 
                  setSelectedCategory={setSelectedCategory}
                  onlyDiscount={onlyDiscount}
                  setOnlyDiscount={setOnlyDiscount}
                />
                <SortDropdown 
                  sortOrder={sortOrder} 
                  setSortOrder={setSortOrder} 
                />
              </div>
            </div>

            {/* GRILLA DE PRODUCTOS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PRODUCTS.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={(item) => {
                    handleAddToCart(item);
                    setIsCartOpen(true);
                  }}
                />
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* CARRITO Y MODALES (Sin cambios) */}
      {isCartOpen && (
        <div onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-neutral-600/20 backdrop-blur-[2px] z-40 transition-opacity" />
      )}

      <aside className={`fixed top-0 right-0 z-50 h-full w-full sm:w-95 bg-white shadow-2xl border-l border-neutral-100 flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
        {/* Contenido del carrito tal cual lo tenías */}
      </aside>

      <TrustBanner />
      <Footer />
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />
    </div>
  );
}