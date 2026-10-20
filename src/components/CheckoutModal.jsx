import { useState } from "react";
import { X, Check, ArrowRight, ArrowLeft, Trash2, Plus, Minus } from "lucide-react";

export function CheckoutModal({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }) {
  const [step, setStep] = useState(1); // 1: Datos, 2: Pago, 3: Confirmación
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    isPickup: false,
    direccion: "",
    provincia: "",
    localidad: "",
    codigoPostal: "",
    departamento: "",
    metodoPago: "transferencia", // o "tarjeta"
  });

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = formData.isPickup || cartItems.length === 0 ? 0 : 8.0;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 font-sans">
      
      {/* Backdrop oscuro con desenfoque suave */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-neutral-600/40 backdrop-blur-xs transition-opacity"
      />

      {/* Contenedor Principal del Modal */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col border border-neutral-100">
        
        {/* Botón de cierre */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-neutral-300 hover:text-neutral-600 rounded-full hover:bg-neutral-100 transition-colors z-20 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ================= STEPPER HEADER ================= */}
        <div className="px-8 pt-8 pb-4 border-b border-neutral-100">
          <div className="flex items-center justify-center gap-2 sm:gap-6 max-w-lg mx-auto">
            
            {/* Paso 1 */}
            <div className="flex items-center gap-2">
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  step >= 1 ? "bg-neutral-600 text-white" : "bg-neutral-100 text-neutral-400"
                }`}
              >
                1
              </span>
              <span className={`text-xs font-bold hidden sm:inline ${step >= 1 ? "text-neutral-600" : "text-neutral-300"}`}>
                Datos personales
              </span>
            </div>

            <div className={`h-0.5 w-8 sm:w-12 ${step >= 2 ? "bg-neutral-600" : "bg-neutral-100"}`} />

            {/* Paso 2 */}
            <div className="flex items-center gap-2">
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  step >= 2 ? "bg-neutral-600 text-white" : "bg-neutral-100 text-neutral-400"
                }`}
              >
                2
              </span>
              <span className={`text-xs font-bold hidden sm:inline ${step >= 2 ? "text-neutral-600" : "text-neutral-300"}`}>
                Método de pago
              </span>
            </div>

            <div className={`h-0.5 w-8 sm:w-12 ${step >= 3 ? "bg-neutral-600" : "bg-neutral-100"}`} />

            {/* Paso 3 */}
            <div className="flex items-center gap-2">
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  step === 3 ? "bg-primary-400 text-white" : "bg-neutral-100 text-neutral-400"
                }`}
              >
                3
              </span>
              <span className={`text-xs font-bold hidden sm:inline ${step === 3 ? "text-primary-400" : "text-neutral-300"}`}>
                Confirmar compra
              </span>
            </div>

          </div>
        </div>

        {/* ================= CONTENIDO SPLIT (FORM + RESUMEN) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
          
          {/* IZQUIERDA: Formulario dinámico según paso (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
            
            {step === 1 && (
              <form onSubmit={handleNext} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    required
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-200/80 focus:border-primary-400 focus:outline-none"
                  />
                  <input
                    type="text"
                    name="apellido"
                    placeholder="Apellido"
                    required
                    value={formData.apellido}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-200/80 focus:border-primary-400 focus:outline-none"
                  />
                </div>

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-200/80 focus:border-primary-400 focus:outline-none"
                />

                <input
                  type="tel"
                  name="telefono"
                  placeholder="Teléfono"
                  required
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-200/80 focus:border-primary-400 focus:outline-none"
                />

                <div className="pt-2">
                  <h4 className="text-xs font-bold text-neutral-600 mb-2">Datos de envío</h4>
                  
                  <label className="flex items-center gap-2 cursor-pointer mb-3 select-none">
                    <input
                      type="checkbox"
                      name="isPickup"
                      checked={formData.isPickup}
                      onChange={handleChange}
                      className="w-4 h-4 rounded accent-primary-400 cursor-pointer"
                    />
                    <span className="text-xs text-neutral-500 font-medium">
                      Retiro en Las Miliuna <span className="text-primary-400 font-bold underline"><span><a href="https://maps.app.goo.gl/oGJHNh2MTEwvK1Uw7" target="_blank" rel="noopener noreferrer">(ver ubicación)</a></span></span>
                    </span>
                  </label>

                  {!formData.isPickup && (
                    <div className="space-y-3">
                      <input
                        type="text"
                        name="direccion"
                        placeholder="Dirección"
                        required={!formData.isPickup}
                        value={formData.direccion}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-200/80 focus:border-primary-400 focus:outline-none"
                      />

                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          name="provincia"
                          placeholder="Provincia"
                          value={formData.provincia}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-200/80 focus:border-primary-400 focus:outline-none"
                        />
                        <input
                          type="text"
                          name="localidad"
                          placeholder="Localidad"
                          value={formData.localidad}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-200/80 focus:border-primary-400 focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          name="codigoPostal"
                          placeholder="Código postal"
                          value={formData.codigoPostal}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-200/80 focus:border-primary-400 focus:outline-none"
                        />
                        <input
                          type="text"
                          name="departamento"
                          placeholder="Departamento (opc)"
                          value={formData.departamento}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-neutral-200/80 focus:border-primary-400 focus:outline-none"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="font-heading w-full py-3 bg-neutral-600 hover:bg-neutral-700 text-white font-semibold text-xs rounded-xl transition-all cursor-pointer mt-4"
                >
                  Continuar
                </button>
              </form>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="font-heading font-bold text-sm text-neutral-600">Seleccioná un método de pago</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3.5 border rounded-xl cursor-pointer hover:border-primary-300">
                    <input
                      type="radio"
                      name="metodoPago"
                      value="transferencia"
                      checked={formData.metodoPago === "transferencia"}
                      onChange={handleChange}
                      className="accent-primary-400"
                    />
                    <div>
                      <p className="text-xs font-bold text-neutral-600">Transferencia Bancaria / Alias</p>
                      <p className="text-[11px] text-neutral-300">10% de descuento automático</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3.5 border rounded-xl cursor-pointer hover:border-primary-300">
                    <input
                      type="radio"
                      name="metodoPago"
                      value="tarjeta"
                      checked={formData.metodoPago === "tarjeta"}
                      onChange={handleChange}
                      className="accent-primary-400"
                    />
                    <div>
                      <p className="text-xs font-bold text-neutral-600">Tarjeta de Crédito / Débito</p>
                      <p className="text-[11px] text-neutral-300">Mercado Pago / Go Cuotas</p>
                    </div>
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setStep(1)}
                    className="py-3 px-4 bg-neutral-100 text-neutral-500 font-semibold text-xs rounded-xl hover:bg-neutral-200"
                  >
                    Volver
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="font-heading flex-1 py-3 bg-neutral-600 hover:bg-neutral-700 text-white font-semibold text-xs rounded-xl"
                  >
                    Continuar
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 text-center py-6">
                <div className="w-12 h-12 bg-primary-100 text-primary-500 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-neutral-600">¡Casi listo!</h3>
                <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                  Al hacer clic en confirmar, registrarás tu pedido para coordinar la entrega.
                </p>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setStep(2)}
                    className="py-3 px-4 bg-neutral-100 text-neutral-500 font-semibold text-xs rounded-xl"
                  >
                    Volver
                  </button>
                  <button
                    onClick={() => alert("¡Compra realizada con éxito!")}
                    className="font-heading flex-1 py-3 bg-primary-400 hover:bg-primary-500 text-white font-bold text-xs rounded-xl shadow-md"
                  >
                    Confirmar Compra
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* DERECHA: Resumen de Carrito (5 cols) */}
          <div className="lg:col-span-5 bg-neutral-100/30 p-6 sm:p-8 border-t lg:border-t-0 lg:border-l border-neutral-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-bold text-sm text-neutral-600">Tu Carrito</h3>
                <span className="text-[11px] text-neutral-300 font-medium">
                  {cartItems.length} Artículos
                </span>
              </div>

              {/* Lista compacta de items */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-neutral-100 shadow-2xs">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg bg-neutral-100"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs text-neutral-600 truncate">{item.name}</h4>
                      <p className="text-[10px] text-neutral-300">por {item.vendor}</p>
                      
                      <div className="flex items-center gap-1 mt-1">
                        <button onClick={() => onUpdateQuantity(item.id, -1)} className="p-0.5 text-neutral-300 hover:text-neutral-600">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold px-1 text-neutral-600">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.id, 1)} className="p-0.5 text-neutral-300 hover:text-neutral-600">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-neutral-600">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Totales */}
            <div className="pt-4 border-t border-neutral-200/60 mt-4 space-y-2">
              <div className="flex justify-between text-xs text-neutral-400">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-neutral-400">
                <span>Envío estimado</span>
                <span>{shipping === 0 ? "Gratis / Retiro" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-neutral-600 pt-2 border-t border-neutral-200/60">
                <span>Total</span>
                <span className="font-heading text-primary-500 text-base">${total.toFixed(2)}</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}