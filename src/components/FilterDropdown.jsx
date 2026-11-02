import { useState } from "react";
import { Filter, Tag } from "lucide-react";

export function FilterDropdown({ selectedCategory, setSelectedCategory, onlyDiscount, setOnlyDiscount }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-600 shadow-xs hover:bg-primary-50/50 hover:border-primary-200 hover:text-primary-700 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
      >
        <Filter className="w-4 h-4 text-primary-400 group-hover:text-primary-600 transition-colors" />
        Filtros
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-neutral-100 p-4 z-50 animate-in fade-in duration-200">
          <h4 className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-3">
            Filtrar por
          </h4>
          
          <div className="space-y-1 mb-4">
            <label className="text-xs font-medium text-neutral-600 block mb-1">Categoría</label>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full text-xs p-2 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-400"
            >
              <option value="all">Todas las categorías</option>
              <option value="Cerámica & Mosaicos">Cerámica & Mosaicos</option>
              <option value="Textiles Hogar">Textiles Hogar</option>
              <option value="Velas & Aromaterapia">Velas & Aromaterapia</option>
            </select>
          </div>

          <div className="pt-2 border-t border-neutral-100">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-600 select-none">
              <input 
                type="checkbox" 
                checked={onlyDiscount}
                onChange={(e) => setOnlyDiscount(e.target.checked)}
                className="rounded text-primary-500 focus:ring-primary-400 w-3.5 h-3.5"
              />
              <Tag className="w-3.5 h-3.5 text-primary-400" />
              Solo con descuento
            </label>
          </div>
        </div>
      )}
    </div>
  );
}