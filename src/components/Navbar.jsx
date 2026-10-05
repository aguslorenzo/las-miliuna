import { SearchBar } from "./SearchBar";
import { ShoppingCart } from "lucide-react";

export function Navbar() {
  return (
    <nav className="w-full bg-primary-400">
      <div className="w-full px-4 sm:px-6 h-16 grid grid-cols-3 items-center gap-3">
        
        <div className="flex justify-start">
          <div className="w-full max-w-xs">
            <SearchBar />
          </div>
        </div>

        <div className="flex justify-center">
          <a href="#">
            <img src="assets/las-miliuna.png" alt="Logo Las Miliuna" className="h-12 w-auto" />
          </a>
        </div>

        <div className="flex justify-end">
          <a href="/cart" className="flex items-center gap-2 p-1">
            <ShoppingCart className="text-neutral-100" />
          </a>
        </div>

      </div>
    </nav>
  );
}