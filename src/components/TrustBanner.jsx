import { InfoCard } from "./InfoCard";
import { TRUST_ITEMS } from "../data/trust-banner-items";

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