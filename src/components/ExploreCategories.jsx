import { Sparkles, Shirt, Flame, Home } from "lucide-react";

const CATEGORIES = [
  { id: 1, name: "Cerámica", icon: Sparkles },
  { id: 2, name: "Textiles", icon: Shirt },
  { id: 3, name: "Velas & Aromas", icon: Flame },
  { id: 4, name: "Deco & Hogar", icon: Home },
];

export function ExploreCategories() {
  return (
    <section className="w-full h-63 bg-secondary-purple-100/40 border-b border-neutral-100 flex flex-col justify-center px-4 md:px-8">
      <div className="w-full max-w-7xl mx-auto">
        
        <h2 className="text-xl md:text-2xl font-bold text-neutral-600 mb-6 tracking-tight">
          Explorá por Categoría
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map((category) => {
            const Icon = category.icon;
            return (
              <a
                key={category.id}
                href={`/categoria/${category.name.toLowerCase()}`}
                className="group flex items-center gap-3.5 p-4 bg-white rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md hover:border-primary-200 hover:-translate-y-0.5 transition-all duration-200 ease-out cursor-pointer"
              >
                <div className="p-3 rounded-xl bg-primary-100 text-primary-500 group-hover:bg-primary-400 group-hover:text-white transition-colors duration-200">
                  <Icon className="w-5 h-5 stroke-[2.25]" />
                </div>

                <span className="font-semibold text-sm md:text-base text-neutral-500 group-hover:text-primary-500 transition-colors">
                  {category.name}
                </span>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}