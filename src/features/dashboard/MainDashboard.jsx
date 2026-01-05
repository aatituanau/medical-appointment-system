import {useNavigate} from "react-router-dom";

const MainDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Saludo */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Hola, Usuario
        </h1>
        <p className="text-slate-500 mt-1">
          Bienvenido a tu portal de salud. ¿Qué deseas hacer hoy?
        </p>
      </div>

      {/* Grid de Tarjetas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
          <div className="h-44 bg-slate-200"></div> {/* Espacio para imagen */}
          <div className="p-6">
            <h3 className="text-lg font-bold text-slate-800">Agendar Cita</h3>
            <p className="text-sm text-slate-500 mt-2 mb-6">
              Busca disponibilidad en tiempo real y reserva una consulta.
            </p>
            <button
              onClick={() => navigate("/agendar")}
              className="w-full py-3 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary-hover transition-colors flex items-center justify-center gap-2"
            >
              Agendar ahora{" "}
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="h-44 bg-slate-300"></div>
          <div className="p-6">
            <h3 className="text-lg font-bold text-slate-800">Mis Citas</h3>
            <p className="text-sm text-slate-500 mt-2 mb-6">
              Consulta el estado de tus citas programadas y revisa tu historial.
            </p>
            <button className="w-full py-3 bg-slate-100 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors">
              Ver mis citas
            </button>
          </div>
        </div>
      </div>

      {/* Próxima Cita e Información */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-800">Próxima Cita</h3>
            <button className="text-primary text-xs font-bold">
              Ver todas
            </button>
          </div>
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex flex-col items-center justify-center text-primary">
              <span className="text-[10px] font-bold uppercase">Oct</span>
              <span className="text-lg font-black">24</span>
            </div>
            <div className="flex-1">
              <p className="font-bold text-slate-800 text-sm">
                Consulta General
              </p>
              <p className="text-xs text-slate-500">
                Dr. Jorge Pérez · 09:30 AM
              </p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-full">
              Confirmada
            </span>
          </div>
        </div>

        <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
          <h3 className="font-bold text-slate-800 mb-4 text-sm">
            ¿Necesitas ayuda?
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-lg">
                call
              </span>
              <div className="text-[11px]">
                <p className="font-bold text-slate-700">Emergencias</p>
                <p className="text-slate-500">Llama al (555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
