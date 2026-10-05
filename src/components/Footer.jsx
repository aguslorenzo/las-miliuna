import { MessageCircle, Phone, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-neutral-600 text-neutral-100 pt-12 pb-6 px-4 md:px-8">
      <div className="w-full max-w-7xl mx-auto">
        
        {/* Grid Principal del Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-neutral-500/40">
          
          {/* Columna 1: Info Marca + Redes */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-xl font-black tracking-wide text-white">
              LAS MILIUNA
            </h3>
            <p className="text-sm text-neutral-200 max-w-sm font-light leading-relaxed">
              Conectamos emprendedores locales con quienes valoran lo hecho a mano. Piezas únicas con historia y dedicación.
            </p>

            {/* Redes Sociales */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-neutral-500/50 text-neutral-100 hover:bg-primary-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-neutral-500/50 text-neutral-100 hover:bg-primary-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Heart className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-neutral-500/50 text-neutral-100 hover:bg-accent-green-400 hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Columna 2: Navegación */}
          <div>
            <h4 className="font-semibold text-sm text-primary-200 tracking-wider uppercase mb-4">
              Navegación
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-200 font-light">
              <li><a href="#" className="hover:text-primary-300 transition-colors">Inicio</a></li>
              <li><a href="#catalogo" className="hover:text-primary-300 transition-colors">Catálogo</a></li>
              <li><a href="#emprendedores" className="hover:text-primary-300 transition-colors">Emprendedores</a></li>
              <li><a href="#nosotros" className="hover:text-primary-300 transition-colors">Nosotras</a></li>
            </ul>
          </div>

          {/* Columna 3: Ayuda */}
          <div>
            <h4 className="font-semibold text-sm text-primary-200 tracking-wider uppercase mb-4">
              Ayuda
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-200 font-light">
              <li><a href="#" className="hover:text-primary-300 transition-colors">Preguntas Frecuentes</a></li>
              <li><a href="#" className="hover:text-primary-300 transition-colors">Envíos y Costos</a></li>
              <li><a href="#" className="hover:text-primary-300 transition-colors">Términos y Condiciones</a></li>
              <li><a href="#" className="hover:text-primary-300 transition-colors">Contacto</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-300 gap-3">
          <p>© 2026 Las Miliuna. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            Hecho con <Heart className="w-3.5 h-3.5 text-primary-300 fill-primary-300" /> para emprendedores
          </p>
        </div>

      </div>
    </footer>
  );
}