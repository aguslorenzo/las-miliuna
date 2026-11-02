import { useState } from "react";
import { ArrowUpDown, Check } from "lucide-react";

export function SortDropdown({ sortOrder, setSortOrder }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (order) => {
    setSortOrder(order);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-600 shadow-xs hover:bg-primary-50/50 hover:border-primary-200 hover:text-primary-700 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
      >
        <ArrowUpDown className="w-4 h-4 text-primary-400 group-hover:text-primary-600 transition-colors" />
        Ordenar por:
      </button>

      {isOpen && (
        <div className="absolute right-0 sm:left-auto sm:right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-neutral-100 p-2 z-50 animate-in fade-in duration-200">
          <h4 className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider px-3 py-1.5">
            Precio
          </h4>
          
          <button 
            onClick={() => handleSelect("desc")}
            className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl transition-colors ${sortOrder === 'desc' ? 'bg-primary-50 text-primary-700 font-bold' : 'text-neutral-600 hover:bg-neutral-50'}`}
          >
            Mayor a menor precio
            {sortOrder === 'desc' && <Check className="w-3.5 h-3.5 text-primary-500" />}
          </button>

          <button 
            onClick={() => handleSelect("asc")}
            className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl transition-colors ${sortOrder === 'asc' ? 'bg-primary-50 text-primary-700 font-bold' : 'text-neutral-600 hover:bg-neutral-50'}`}
          >
            Menor a mayor precio
            {sortOrder === 'asc' && <Check className="w-3.5 h-3.5 text-primary-500" />}
          </button>
        </div>
      )}
    </div>
  );
}