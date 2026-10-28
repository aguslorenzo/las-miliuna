import { Link, useLocation } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { ShoppingCart } from "lucide-react";

export function Navbar({ onOpenCart, cartCount = 0 }) {
  const location = useLocation();

  const handleCartClick = (e) => {
    if (onOpenCart) {
      e.preventDefault();
      onOpenCart();
    }
  };

  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Catálogo", path: "/catalogo" },
    { name: "Emprendedores", path: "/emprendedores" },
    { name: "Nosotras", path: "/nosotras" },
  ];

  return (
    <nav className="w-full bg-primary-400 sticky top-0 z-40 shadow-xs">
      <div className="w-full mx-auto px-3 sm:px-4 h-16 flex items-center justify-between gap-4">
        
        {/* 1. IZQUIERDA AL BORDE: Buscador */}
        <div className="flex justify-start shrink-0 w-40 sm:w-56 md:w-64">
          <SearchBar />
        </div>

        {/* 2. CENTRO: Logo / Nombre Las Miliuna */}
        <div className="flex justify-center shrink-0">
          <Link to="/" className="flex items-center">
            <img 
              src="assets/las-miliuna.png" 
              alt="Logo Las Miliuna" 
              className="h-10 sm:h-12 w-auto object-contain" 
            />
          </Link>
        </div>

        {/* 3. DERECHA: Links de navegación + Carrito al fondo */}
        <div className="flex items-center justify-end gap-6 lg:gap-8 shrink-0">
          
          {/* Links a la derecha del logo */}
          <div className="hidden md:flex items-center gap-5 lg:gap-7 font-heading">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-xs lg:text-sm font-semibold transition-all hover:text-white relative py-1 ${
                    isActive 
                      ? "text-white font-bold" 
                      : "text-neutral-100/90 hover:opacity-100"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white rounded-full animate-in fade-in duration-200" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Carrito al fondo a la derecha */}
          <button 
            onClick={handleCartClick}
            className="relative flex items-center justify-center p-2 rounded-xl text-neutral-100 hover:bg-primary-500/80 active:bg-primary-600 transition-colors cursor-pointer"
            aria-label="Abrir carrito"
          >
            <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
            
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-primary-500 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </button>

        </div>

      </div>
    </nav>
  );
}