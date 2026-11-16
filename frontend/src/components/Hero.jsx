export function Hero() {
  return (
    <section className="relative w-full h-105 overflow-hidden">
      <img
        src="assets/hero-banner.png"
        alt="Las Miliuna - Colección"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 h-full w-full flex flex-col items-center justify-center text-center px-4 text-white">
        <span className="text-xs md:text-sm font-semibold tracking-widest uppercase mb-2 text-primary-200">
          Nueva Temporada
        </span>
        
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 drop-shadow-md">
          Bienvenidos a Las Miliuna
        </h1>
        
        <p className="text-base md:text-lg max-w-xl mb-6 text-neutral-100 font-light drop-shadow">
          Descubrí nuestros productos exclusivos y ofertas de la temporada.
        </p>

        <a
          href="/catalogo"
          className="bg-primary-500 hover:bg-primary-600 text-white font-medium px-6 py-3 rounded-full transition-colors shadow-lg"
        >
          Ver Catálogo
        </a>
      </div>
    </section>
  );
}