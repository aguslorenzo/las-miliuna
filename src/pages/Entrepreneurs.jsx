import { useState } from "react";
import { Sparkles, RotateCw, MapPin } from "lucide-react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { TopBanner } from "../components/TopBanner";
import { ENTREPRENEURS } from "../data/entrepreneurs";

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

      <main className="bg-secondary-purple-100 flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-12">
        
        {/* Cabecera */}
        <div className="text-center max-w-xl mx-auto space-y-2 mb-20">
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

        {/* cards emprendedores */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 pb-24 pt-4">
          {ENTREPRENEURS.map((item) => {
            const isFlipped = flippedCards[item.id];

            return (
              <div
                key={item.id}
                onClick={() => handleCardClick(item.id)}
                className={`
                  relative cursor-pointer group perspective-1000 w-full transition-all duration-300
                  ${item.layout}
                `}
              >
                {/* efecto flip */}
                <div
                  className={`
                    w-full h-full relative rounded-2xl transition-transform duration-700 shadow-sm hover:shadow-2xl
                    transform-3d
                    ${isFlipped ? "transform-[rotateY(180deg)]" : ""}
                  `}
                >
                  
                  {/* frente-card */}
                  <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden border border-neutral-200/60 bg-white backface-hidden flex flex-col justify-between p-4 sm:p-5">
                    
                    <div className="absolute inset-0 z-0 bg-neutral-100 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/25 to-transparent" />
                    </div>

                    <div className="relative z-10 flex items-center justify-between">
                      <span className="px-2.5 py-0.5 bg-white/80 backdrop-blur-md text-neutral-700 text-[10px] font-bold rounded-full shadow-xs">
                        {item.category}
                      </span>
                      
                      <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <RotateCw className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <div className="relative z-10 text-white flex items-end justify-between">
                      <h3 className="font-heading text-base sm:text-lg font-bold tracking-tight">
                        {item.name}
                      </h3>
                      
                      <span className="text-[10px] font-semibold bg-white/20 backdrop-blur-md text-white px-2.5 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                        Conoceme ↺
                      </span>
                    </div>

                  </div>

                  {/* dorso-card*/}
                  <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden border border-neutral-200/60 bg-white backface-hidden transform-[rotateY(180deg)] flex flex-col justify-between p-5 shadow-md">
                    
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