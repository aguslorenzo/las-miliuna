import { useState } from "react";
import { Sparkles, RotateCw, MapPin } from "lucide-react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { TopBanner } from "../components/TopBanner";

const ENTREPRENEURS = [
  {
    "id": 1,
    "name": "Cerámicas Ana",
    "category": "Cerámica & Mosaicos",
    "image": "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=600&q=80",
    "bio": "Piezas utilitarias y decorativas modeladas a mano. Cada esmalte es único y cocido en alta temperatura.",
    "location": "Olavarría, Bs. As.",
    "instagram": "@ceramicasana",
    "layout": "col-span-1 h-[190px] md:translate-y-6"
  },
  {
    "id": 2,
    "name": "Tejidos Deco",
    category: "Textiles Hogares",
    "image": "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80",
    "bio": "Diseños en telar y crochet para vestir los espacios de calidez. Fibras naturales y nobles.",
    "location": "Tandil, Bs. As.",
    "instagram": "@tejidosdeco",
    "layout": "col-span-1 h-[250px] md:-translate-y-3"
  },
  {
    "id": 3,
    "name": "Velas Luz",
    "category": "Velas & Aromaterapia",
    "image": "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80",
    "bio": "Velas de cera de soja 100% ecológicas con aceites esenciales puros. Iluminación consciente.",
    "location": "Olavarría, Bs. As.",
    "instagram": "@velasluz",
    "layout": "col-span-1 h-[160px] md:translate-y-10"
  },
  {
    "id": 4,
    "name": "Bosque Ilustrado",
    "category": "Papelería & Arte",
    "image": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80",
    "bio": "Ilustraciones botánicas llevadas a láminas, agendas y cuadernos artesanales.",
    "location": "Mar del Plata, Bs. As.",
    "instagram": "@bosqueilustrado",
    "layout": "col-span-1 h-[220px] md:-translate-y-6"
  },
  {
    "id": 5,
    "name": "Alma de Cuero",
    "category": "Marroquinería",
    "image": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80",
    "bio": "Accesorios y carteras de cuero genuino trabajadas a mano con costuras reforzadas.",
    "location": "Tandil, Bs. As.",
    "instagram": "@almadecuero",
    "layout": "col-span-1 h-[180px] md:translate-y-2"
  },
  {
    "id": 6,
    "name": "Botánica Viva",
    "category": "Macetas & Plantas",
    "image": "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80",
    "bio": "Cerámica artesanal combinada con especies botánicas de interior listas para decorar.",
    "location": "Olavarría, Bs. As.",
    "instagram": "@botanicaviva",
    "layout": "col-span-1 h-[230px] md:-translate-y-8"
  },
  {
    "id": 7,
    "name": "Rincón Dulce",
    "category": "Repostería Artesanal",
    "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
    "bio": "Pastelería fina y alfajores de autor elaborados con ingredientes de primera calidad.",
    "location": "Tandil, Bs. As.",
    "instagram": "@rincondulce",
    "layout": "col-span-1 h-[170px] md:translate-y-4"
  },
  {
    "id": 8,
    "name": "Madera & Origen",
    "category": "Carpintería Deco",
    "image": "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80",
    "bio": "Tablas para picadas, cuencos y utensilios de cocina tallados en maderas recuperadas.",
    "location": "Azul, Bs. As.",
    "instagram": "@maderayorigen",
    "layout": "col-span-1 h-[240px] md:-translate-y-4"
  },
  {
    "id": 9,
    "name": "Hilados del Sur",
    "category": "Mantas & Lana",
    "image": "https://images.unsplash.com/photo-1606744888344-493238951221?auto=format&fit=crop&w=600&q=80",
    "bio": "Mantas gigantes de vellón merino y tejidas a dos agujas para abrigar tus momentos.",
    "location": "Tandil, Bs. As.",
    "instagram": "@hiladosdelsur",
    "layout": "col-span-1 h-[190px] md:translate-y-8"
  },
  {
    "id": 10,
    "name": "Estudio Vidrio",
    "category": "Vitrofusion & Arte",
    "image": "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80",
    "bio": "Luminarias, objetos de decoración y platos artesanales modelados en vitrofusión.",
    "location": "Olavarría, Bs. As.",
    "instagram": "@estudiovidrio",
    "layout": "col-span-1 h-[210px] md:-translate-y-2"
  },
  {
    "id": 11,
    "name": "Aromas del Campo",
    "category": "Cosmética Natural",
    "image": "https://images.unsplash.com/photo-1608248597266-c89050df9c15?auto=format&fit=crop&w=600&q=80",
    "bio": "Jabones botánicos, bálsamos y brumas corporales elaborados con hierbas de las sierras.",
    "location": "Tandil, Bs. As.",
    "instagram": "@aromasdelcampo",
    "layout": "col-span-1 h-[160px] md:translate-y-6"
  },
  {
    "id": 12,
    "name": "Taller Papel",
    "category": "Encuadernación",
    "image": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
    "bio": "Cuadernos de notas, bitácoras de viaje y álbumes cosidos a mano con tapas enteladas.",
    "location": "Mar del Plata, Bs. As.",
    "instagram": "@tallerpapel",
    "layout": "col-span-1 h-[230px] md:-translate-y-6"
  }
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

        {/* GRILLA ESTILO MURO DE CUADROS / ASIMÉTRICA */}
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
                {/* Contenedor con efecto Flip 3D */}
                <div
                  className={`
                    w-full h-full relative rounded-2xl transition-transform duration-700 shadow-sm hover:shadow-2xl
                    transform-3d
                    ${isFlipped ? "transform-[rotateY(180deg)]" : ""}
                  `}
                >
                  
                  {/* ================= FRENTE ================= */}
                  <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden border border-neutral-200/60 bg-white backface-hidden flex flex-col justify-between p-4 sm:p-5">
                    
                    <div className="absolute inset-0 z-0 bg-neutral-100 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/25 to-transparent" />
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