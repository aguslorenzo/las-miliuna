export function InfoCard({ 
  icon: Icon, 
  title, 
  description, 
  variant = "default", // "default" (confianza/azul) | "category" (categorías/rosa)
  isActive = false,
  onClick 
}) {
  const isCategory = variant === "category";

  return (
    <div
      onClick={onClick}
      className={`
        group flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ease-out
        ${onClick ? "cursor-pointer select-none" : ""}
        ${
          isCategory
            ? isActive
              ? "bg-white border-primary-400 text-primary-500 shadow-md ring-1 ring-primary-400 -translate-y-1"
              : "bg-white border-neutral-100/80 text-neutral-600 hover:border-primary-300 hover:shadow-lg hover:-translate-y-1"
            : "bg-transparent border-transparent text-neutral-600 hover:-translate-y-0.5"
        }
      `}
    >
      {/* Contenedor del Ícono con hover interactivo */}
      <div
        className={`
          flex items-center justify-center p-3.5 rounded-2xl shrink-0 transition-all duration-300
          ${
            isCategory
              ? isActive
                ? "bg-primary-400 text-white shadow-sm"
                : "bg-primary-100/60 text-primary-500 group-hover:bg-primary-400 group-hover:text-white group-hover:scale-105"
              : "bg-secondary-blue-100 text-secondary-blue-500 group-hover:bg-secondary-blue-200 group-hover:scale-105"
          }
        `}
      >
        {Icon && <Icon className="w-5 h-5 transition-transform duration-300" />}
      </div>

      {/* Textos */}
      <div className="flex flex-col">
        <h3
          className={`font-bold text-sm tracking-tight transition-colors duration-200 ${
            isCategory && (isActive || "group-hover:text-primary-500")
              ? "text-primary-500"
              : "text-neutral-600"
          }`}
        >
          {title}
        </h3>

        {description && (
          <p className="text-xs text-neutral-300 font-normal mt-0.5 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}