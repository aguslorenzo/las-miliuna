import { Sparkles, Shirt, Flame, Home } from "lucide-react";
import { useState } from "react";
import { InfoCard } from "./InfoCard";

const CATEGORIES = [
  { id: 1, title: "Cerámica", icon: Sparkles },
  { id: 2, title: "Textiles", icon: Shirt },
  { id: 3, title: "Velas & Aromas", icon: Flame },
  { id: 4, title: "Deco & Hogar", icon: Home },
];

export function ExploreCategories() {

  const [selected, setSelected] = useState("deco");
  return (
    <section className="w-full h-63 bg-secondary-purple-100/40 border-b border-neutral-100 flex flex-col justify-center px-4 md:px-8">
      <div className="w-full max-w-7xl mx-auto">
        
        <h2 className="text-xl md:text-2xl font-bold text-neutral-600 mb-6 tracking-tight">
          Explorá por Categoría
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
        <InfoCard
          key={cat.id}
          icon={cat.icon}
          title={cat.title}
          variant="category"
          isActive={selected === cat.id}
          onClick={() => setSelected(cat.id)}
        />
      ))}
        </div>

      </div>
    </section>
  );
}