import { useState } from "react";
import { Sparkles, RotateCw, MapPin } from "lucide-react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { TopBanner } from "../components/TopBanner";

const ENTREPRENEURS = [
  {
    id: 1,
    name: "Cerámicas Ana",
    category: "Cerámica & Mosaicos",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=600&q=80",
    bio: "Piezas utilitarias y decorativas modeladas a mano. Cada esmalte es único y cocido en alta temperatura.",
    location: "Olavarría, Bs. As.",
    instagram: "@ceramicasana",
    layout: "col-span-1 md:col-span-2 h-[160px]", // Horizontal compacta
  },
  {
    id: 2,
    name: "Tejidos Deco",
    category: "Textiles Hogares",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80",
    bio: "Diseños en telar y crochet para vestir los espacios de calidez. Fibras naturales y nobles.",
    location: "Tandil, Bs. As.",
    instagram: "@tejidosdeco",
    layout: "col-span-1 md:row-span-2 h-[220px] md:h-[340px] md:translate-y-6", // Vertical alta desfasada hacia abajo
  },
  {
    id: 3,
    name: "Velas Luz",
    category: "Velas & Aromaterapia",
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80",
    bio: "Velas de cera de soja 100% ecológicas con aceites esenciales puros. Iluminación consciente.",
    location: "Olavarría, Bs. As.",
    instagram: "@velasluz",
    layout: "col-span-1 md:col-span-2 h-[160px]", // Horizontal compacta
  },
  {
    id: 4,
    name: "Bosque Ilustrado",
    category: "Papelería & Arte",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80",
    bio: "Ilustraciones botánicas llevadas a láminas, agendas y cuadernos artesanales.",
    location: "Mar del Plata, Bs. As.",
    instagram: "@bosqueilustrado",
    layout: "col-span-1 md:row-span-2 h-[220px] md:h-[340px] md:-translate-y-4", // Vertical desfasada hacia arriba
  },
  {
    id: 5,
    name: "Alma de Cuero",
    category: "Marroquinería",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80",
    bio: "Accesorios y carteras de cuero genuino trabajadas a mano con costuras reforzadas.",
    location: "Tandil, Bs. As.",
    instagram: "@almadecuero",
    layout: "col-span-1 md:col-span-2 h-[160px]", // Horizontal compacta
  },
  {
    id: 6,
    name: "Botánica Viva",
    category: "Macetas & Plantas",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80",
    bio: "Cerámica artesanal combinada con especies botánicas de interior listas para decorar.",
    location: "Olavarría, Bs. As.",
    instagram: "@botanicaviva",
    layout: "col-span-1 md:col-span-2 h-[160px]", // Horizontal compacta
  },
];

export function Entrepreneurs() {
  const [flippedCards, setFlippedCards] = useState({});

  const handleCardClick = (id) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="min-h-screen bg-neutral-50/50 font-sans text-neutral-600 flex flex-col justify-between">
      <TopBanner />
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        {/* Cabecera */}
        <div className="text-center max-w-xl mx-auto space-y-2 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            Comunidad Creativa
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-neutral-700">
            Nuestros Emprendedores
          </h1>
          <p className="text-xs text-neutral-400">
            Conocé a los creadores detrás de cada pieza. Hacé clic en las tarjetas para descubrir su historia.
          </p>
        </div>

        {/* GRILLA DESFASADA / ORGÁNICA */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 pb-12">
          {ENTREPRENEURS.map((item) => {
            const isFlipped = flippedCards[item.id];

            return (
              <div
                key={item.id}
                onClick={() => handleCardClick(item.id)}
                className={`
                  relative cursor-pointer group perspective-1000 w-full
                  ${item.layout}
                `}
              >
                {/* Contenedor con efecto Flip 3D */}
                <div
                  className={`
                    w-full h-full relative rounded-2xl transition-transform duration-700 shadow-xs hover:shadow-xl
                    [transform-style:preserve-3d]
                    ${isFlipped ? "[transform:rotateY(180deg)]" : ""}
                  `}
                >
                  
                  {/* ================= FRENTE ================= */}
                  <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden border border-neutral-100 bg-white [backface-visibility:hidden] flex flex-col justify-between p-4">
                    
                    <div className="absolute inset-0 z-0 bg-neutral-100 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                    </div>

                    {/* Badge categoría y ícono */}
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="px-2.5 py-0.5 bg-white/80 backdrop-blur-md text-neutral-700 text-[10px] font-bold rounded-full shadow-xs">
                        {item.category}
                      </span>
                      
                      <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <RotateCw className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Nombre y botón hover "Conoceme" */}
                    <div className="relative z-10 text-white flex items-end justify-between">
                      <h3 className="font-heading text-base sm:text-lg font-bold tracking-tight">
                        {item.name}
                      </h3>
                      
                      <span className="text-[10px] font-semibold bg-white/20 backdrop-blur-md text-white px-2.5 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                        Conoceme ↺
                      </span>
                    </div>

                  </div>

                  {/* ================= DORSO (Info al girar) ================= */}
                  <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden border border-neutral-100 bg-white [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-between p-5 shadow-md">
                    
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary-500 bg-primary-100 px-2.5 py-0.5 rounded-full">
                          Creador
                        </span>
                        <RotateCw className="w-3 h-3 text-neutral-300" />
                      </div>

                      <h3 className="font-heading text-sm font-bold text-neutral-700 mb-1">
                        {item.name}
                      </h3>
                      
                      <p className="text-[11px] text-neutral-400 leading-relaxed line-clamp-3">
                        {item.bio}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px]">
                      <span className="flex items-center gap-1 text-neutral-400 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-primary-400" />
                        {item.location}
                      </span>
                      
                      <span className="font-bold text-primary-500">
                        {item.instagram}
                      </span>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </main>

      <Footer />
    </div>
  );
}