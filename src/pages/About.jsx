import { Sparkles, Heart, Clock, Users } from "lucide-react";
import { Footer } from "../components/Footer";
import { TopBanner } from "../components/TopBanner";
import { Navbar } from "../components/Navbar";

export function About() {
  return (
    <div className="min-h-screen bg-white font-sans text-neutral-600 flex flex-col justify-between">
      <TopBanner />
      <Navbar />
      {/* Contenido Principal */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-16">
        
        {/* SECCIÓN 1: Quiénes somos / Introducción */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            Nuestra Esencia
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-neutral-700">
            Detrás de cada pieza, hay una historia
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Las Miliuna nació como un espacio de encuentro entre el diseño independiente y quienes valoran lo hecho a mano. Somos un puente entre creadores locales y vos, buscando que cada objeto tenga identidad y alma.
          </p>
        </section>

        {/* SECCIÓN 2: La Historia (17 años) - Estilo Tarjeta Destacada */}
        <section className="bg-neutral-100/50 border border-neutral-100 rounded-3xl p-8 sm:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 flex flex-col items-center justify-center bg-white p-8 rounded-2xl shadow-xs text-center border border-neutral-100">
            <Clock className="w-10 h-10 text-primary-400 mb-3" />
            <span className="font-heading text-3xl font-bold text-neutral-700">+17 años</span>
            <span className="text-xs text-neutral-400 font-medium mt-1">Creciendo junto a nuestra comunidad</span>
          </div>

          <div className="md:col-span-7 space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-neutral-700">
              Una trayectoria hecha a mano
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Lo que comenzó hace más de una década y media como un proyecto impulsado por la pasión por lo artesanal, fue transformándose gracias a cada persona que nos eligió. A lo largo de estos 17 años aprendimos de procesos, de texturas y del valor incalculable de lo hecho con dedicación.
            </p>
          </div>
        </section>

        {/* SECCIÓN 3: Mensaje Motivador / Invitación */}
        <section className="text-center bg-primary-400 text-white rounded-3xl p-8 sm:p-12 space-y-6 shadow-md">
          <Heart className="w-8 h-8 text-primary-100 mx-auto fill-primary-100" />
          <h2 className="font-heading text-2xl sm:text-3xl font-bold">
            Formá parte de nuestra comunidad
          </h2>
          <p className="text-xs sm:text-sm text-primary-100 max-w-xl mx-auto leading-relaxed">
            Creemos firmemente en el valor de lo local y en apoyar el trabajo independiente. Gracias por estar del otro lado y elegirnos para llenar tus espacios de significado.
          </p>
        </section>

      </main>

      <Footer />
    </div>
  );
}