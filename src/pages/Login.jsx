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
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white font-sans">
      
      <div className="hidden lg:flex items-center justify-center bg-[#f5f5f5] p-0 overflow-hidden border-r border-neutral-100">
        <img
          src="assets/background-login.png"
          alt="Las Miliuna"
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12 bg-white">
        
        <div className="w-full max-w-[420px] bg-white p-8 sm:p-10 rounded-2xl shadow-lg shadow-neutral-100 border border-neutral-100/80">
          
          <h1 className="font-sans text-2xl sm:text-3xl font-bold text-center text-neutral-700 mb-6">
            Iniciar sesión
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div className="space-y-1.5">
              <label 
                htmlFor="email" 
                className="block text-xs font-bold text-neutral-600"
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
                className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-white border border-neutral-200/80 text-neutral-600 placeholder:text-neutral-200 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label 
                htmlFor="password" 
                className="block text-xs font-bold text-neutral-600"
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
                className="w-full px-3.5 py-2.5 text-xs rounded-lg bg-white border border-neutral-200/80 text-neutral-600 placeholder:text-neutral-200 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 transition-all"
              />
            </div>

            <div className="text-center pt-2">
              <a
                href="#recuperar"
                className="text-[11px] text-neutral-300 font-medium hover:text-neutral-400"
              >
                ¿Olvidaste tu contraseña? <span className="text-primary-400 font-bold hover:underline">Click aquí</span>
              </a>
            </div>

            <button
              type="submit"
              className="font-heading w-full py-3 px-4 bg-primary-400 hover:bg-primary-500 active:bg-primary-600 text-white font-semibold text-sm rounded-xl transition-all cursor-pointer mt-2 shadow-xs"
            >
              Entrar
            </button>

            <div className="text-center pt-2 text-[11px] text-neutral-300 font-medium">
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