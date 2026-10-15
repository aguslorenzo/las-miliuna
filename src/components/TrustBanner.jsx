import { Truck, CreditCard, HeartHandshake } from "lucide-react";
import { InfoCard } from "./InfoCard";

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
        {TRUST_ITEMS.map((item, index) => (
          <InfoCard
            key={index}
            icon={item.icon}
            title={item.title}
            description={item.description}
            variant="default"
          />
        ))}
      </div>
    </section>
  );
}