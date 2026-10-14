import { useState } from "react";
import { Link } from "react-router-dom";

export function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos de ingreso:", formData);
  };

  return (
    <div className="w-full h-screen overflow-hidden grid grid-cols-1 lg:grid-cols-2 bg-white font-sans">
      
      {/* SECCIÓN IZQUIERDA: Imagen */}
      <div className="hidden lg:block w-full h-full bg-[#f5f5f5] overflow-hidden border-r border-neutral-100">
        <img
          src="assets/background-login.png"
          alt="Las Miliuna"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* SECCIÓN DERECHA: Formulario */}
      <div className="flex items-center justify-center p-6 h-full bg-white">
        
        {/* Ancho máximo ligeramente ampliado (max-w-md / 440px) */}
        <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-2xl shadow-lg shadow-neutral-100 border border-neutral-100/80">
          
          <h1 className="font-heading text-3xl font-bold text-center text-neutral-700 mb-8">
            Iniciar sesión
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Campo Correo */}
            <div className="space-y-2">
              <label 
                htmlFor="email" 
                className="block text-sm font-semibold text-neutral-600"
              >
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ejemplo@correo.com"
                required
                className="w-full px-4 py-3 text-sm rounded-xl bg-white border border-neutral-200 text-neutral-700 placeholder:text-neutral-300 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 transition-all"
              />
            </div>

            {/* Campo Contraseña */}
            <div className="space-y-2">
              <label 
                htmlFor="password" 
                className="block text-sm font-semibold text-neutral-600"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 text-sm rounded-xl bg-white border border-neutral-200 text-neutral-700 placeholder:text-neutral-300 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 transition-all"
              />
            </div>

            {/* Enlace Recuperar */}
            <div className="text-center pt-1">
              <a
                href="#recuperar"
                className="text-xs text-neutral-400 font-medium hover:text-neutral-600 transition-colors"
              >
                ¿Olvidaste tu contraseña? <span className="text-primary-400 font-bold hover:underline">Click aquí</span>
              </a>
            </div>

            {/* Botón Entrar */}
            <button
              type="submit"
              className="font-heading w-full py-3.5 px-4 bg-primary-400 hover:bg-primary-500 active:bg-primary-600 text-white font-semibold text-base rounded-xl transition-all cursor-pointer mt-2 shadow-xs"
            >
              Entrar
            </button>

            {/* Enlace Registro */}
            <div className="text-center pt-2 text-xs text-neutral-400 font-medium">
              ¿No tenés cuenta?{" "}
              <Link
                to="/register"
                className="text-primary-400 font-bold hover:underline"
              >
                Crear cuenta
              </Link>
            </div>

          </form>

        </div>

      </div>

    </div>
  );
}