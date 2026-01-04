import React from "react";
import InputField from "../../components/ui/InputField";

const RegisterCard = () => {
  return (
    <div className="w-full max-w-[1100px] bg-white dark:bg-[#1a2632] rounded-[2.5rem] shadow-2xl shadow-blue-900/10 border border-white overflow-hidden flex flex-col md:flex-row min-h-[600px] animate-fade-in-up">
      {/* Lado Izquierdo: Imagen e Información (Branding) */}
      <div className="relative w-full md:w-5/12 hidden md:flex flex-col justify-center items-center p-12 text-center group overflow-hidden">
        {/* Overlay azul institucional */}
        <div className="absolute inset-0 bg-[#137fec]/85 mix-blend-multiply z-10"></div>

        {/* Imagen de fondo (Hospital) */}
        <img
          alt="Hospital del Día"
          className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 group-hover:scale-105"
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000"
        />

        <div className="relative z-20 flex flex-col gap-6 text-white">
          <div className="size-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-2 border border-white/30">
            <span className="material-symbols-outlined !text-[36px]">
              health_and_safety
            </span>
          </div>
          <h3 className="text-3xl font-black leading-tight tracking-tight">
            Salud universitaria a tu alcance
          </h3>
          <p className="text-white/90 text-base font-light leading-relaxed">
            Gestiona tus citas, revisa tu historial médico y accede a los
            servicios de bienestar universitario desde cualquier lugar.
          </p>
        </div>
      </div>

      {/* Lado Derecho: Formulario */}
      <div className="w-full md:w-7/12 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white">
        <div className="max-w-md mx-auto w-full">
          <div className="mb-8">
            <h1 className="text-slate-900 text-3xl font-black tracking-tight mb-2">
              Crear cuenta
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              Ingresa tus datos para registrarte en el portal.
            </p>
          </div>

          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <InputField
              label="Nombre Completo"
              icon="person"
              type="text"
              placeholder="Ej. Juan Pérez"
              id="fullname"
            />

            <div className="flex flex-col gap-1">
              <InputField
                label="Correo Institucional"
                icon="school"
                type="email"
                placeholder="estudiante@uce.edu.ec"
                id="email"
              />
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide ml-1">
                Solo dominios .edu.ec aceptados
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="Contraseña"
                icon="lock"
                type="password"
                placeholder="******"
                id="password"
              />
              <InputField
                label="Confirmar"
                icon="lock_reset"
                type="password"
                placeholder="******"
                id="confirm_password"
              />
            </div>

            <div className="flex items-start gap-3 mt-2">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 size-4 rounded border-slate-300 text-primary focus:ring-primary/20"
              />
              <label
                htmlFor="terms"
                className="text-xs font-medium text-slate-500 leading-tight"
              >
                Acepto los{" "}
                <a className="text-primary font-bold hover:underline" href="#">
                  Términos y Condiciones
                </a>
                .
              </label>
            </div>

            <button className="mt-4 w-full h-12 bg-primary hover:bg-primary-dark text-white font-bold rounded-2xl shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2 group">
              <span>Crear mi cuenta</span>
              <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </button>
          </form>

          <div className="mt-8 text-center border-t border-slate-100 pt-6">
            <p className="text-slate-500 text-sm font-medium">
              ¿Ya tienes una cuenta?{" "}
              <a
                className="text-primary font-bold hover:underline ml-1"
                href="#"
              >
                Inicia sesión aquí
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterCard;
