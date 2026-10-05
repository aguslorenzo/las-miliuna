import { Truck, CreditCard, HeartHandshake } from "lucide-react";

const TRUST_ITEMS = [
  {
    id: 1,
    icon: Truck,
    title: "Envíos Seguros",
    description: "A todo el país directamente a tu puerta.",
  },
  {
    id: 2,
    icon: CreditCard,
    title: "Pagos Flexibles",
    description: "Aceptamos todas las tarjetas y transferencia.",
  },
  {
    id: 3,
    icon: HeartHandshake,
    title: "100% Emprendedor",
    description: "Apoyá directamente al creador de cada pieza.",
  },
];

export function TrustBanner() {
  return (
    <section className="w-full py-10 bg-secondary-blue-100/40 border-y border-secondary-blue-200/60 px-4 md:px-8">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {TRUST_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="flex items-center gap-4">
              {/* Contenedor del ícono en azul secundario */}
              <div className="p-3.5 rounded-2xl bg-secondary-blue-200 text-secondary-blue-700 shrink-0 shadow-xs">
                <Icon className="w-6 h-6 stroke-[2]" />
              </div>

              {/* Textos */}
              <div>
                <h3 className="font-bold text-base text-neutral-600">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-300 mt-0.5 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}