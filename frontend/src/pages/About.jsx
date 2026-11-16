import { Clock, Store, Users, ArrowRight } from "lucide-react";
import { Footer } from "../components/Footer";
import { TopBanner } from "../components/TopBanner";
import { Navbar } from "../components/Navbar";

export function About() {
  return (
    <div className="min-h-screen bg-white font-sans text-neutral-600 flex flex-col justify-between">
      <TopBanner />
      <Navbar />  

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-16">
        
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-primary-500 bg-primary-100 px-3 py-1 rounded-full">
              Sobre Nosotras
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-neutral-700 leading-tight">
              La casa de emprendedores
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
              Las Miliuna es mucho más que un espacio de venta. Es un proyecto que nació de la pasión por los productos locales, el encuentro entre personas y el deseo de mostrar todo lo lindo que se crea en Tandil y la zona.
            </p>
            <div className="pt-2">
              <p className="font-heading italic text-primary-500 text-sm sm:text-base">
                "Acá hay historias, talento y mucho amor por lo que se hace. ♡"
              </p>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-md border-4 border-white bg-neutral-100 h-64 sm:h-72">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80" 
                alt="Local Las Miliuna" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        <section className="bg-primary-100/30 border border-primary-100/60 rounded-3xl p-8 sm:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-primary-500 bg-white px-3 py-1 rounded-full shadow-2xs">
              El Proyecto
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-neutral-700">
              Cómo empezó todo
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
              La idea de Las Miliuna nació con la convicción de valorar aún más lo local, lo hecho a mano y lo auténtico. Lo que comenzó como una pequeña tienda online, se transformó en un espacio físico con la intención de reunir a emprendedores de la zona y darles un lugar para mostrar y vender sus productos.
            </p>
            <p className="font-heading italic text-primary-500 text-xs sm:text-sm pt-2">
              "Lo que empezó como un sueño, hoy es una casa llena de vida. ♡"
            </p>
          </div>

          <div className="md:col-span-6 space-y-4 bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-2xs">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary-100 text-primary-500 rounded-xl mt-0.5"><Clock className="w-4 h-4"/></div>
              <div>
                <h4 className="font-bold text-xs text-neutral-700">Inicios del proyecto</h4>
                <p className="text-[11px] text-neutral-400">Comienza el proyecto con una tienda online impulsada por el amor a lo artesanal.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary-100 text-primary-500 rounded-xl mt-0.5"><Store className="w-4 h-4"/></div>
              <div>
                <h4 className="font-bold text-xs text-neutral-700">Espacio físico</h4>
                <p className="text-[11px] text-neutral-400">Se suma el primer espacio físico en Tandil para conectar de cerca con la comunidad.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary-100 text-primary-500 rounded-xl mt-0.5"><Users className="w-4 h-4"/></div>
              <div>
                <h4 className="font-bold text-xs text-neutral-700">+17 años de trayectoria</h4>
                <p className="text-[11px] text-neutral-400">La casa sigue creciendo, sumando más emprendedores, variedad y renovando su propuesta cada día.</p>
              </div>
            </div>
          </div>

        </section>

        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-5 order-2 md:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-md border-4 border-white bg-neutral-100 h-64 sm:h-72">
              <img 
                src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80" 
                alt="Productos artesanales Las Miliuna" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="md:col-span-7 space-y-4 order-1 md:order-2">
            <span className="text-xs font-bold uppercase tracking-widest text-primary-500 bg-primary-100 px-3 py-1 rounded-full">
              Nuestra Esencia
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-neutral-700">
              Mucho más que productos
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
              En Las Miliuna vas a encontrar una gran variedad de productos de emprendedores locales: decoración, indumentaria, accesorios, cosmética natural, bienestar, regalos y mucho más. Cada producto tiene una historia, y cada emprendedor pone en él su creatividad, esfuerzo y pasión.
            </p>
            <p className="font-heading italic text-primary-500 text-sm">
              "Productos reales, personas reales, una misma pasión. ♡"
            </p>
          </div>

        </section>

        {/* cta */}
        <section className="bg-neutral-100/60 border border-neutral-100 rounded-3xl p-8 sm:p-10 text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-500 bg-white px-3 py-1 rounded-full shadow-2xs">
            Sumate
          </span>
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-neutral-700">
            ¿Querés ser parte?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
            Si sos emprendedor/a y tenés productos únicos, hechos con amor y dedicación, te invitamos a ser parte de Las Miliuna. Queremos conocer tu propuesta y que juntas hagamos crecer el talento local.
          </p>
          <div className="pt-2">
            <a 
              href="/contacto"
              className="font-heading inline-flex items-center gap-2 px-6 py-3 bg-primary-400 hover:bg-primary-500 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              Contactanos <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}