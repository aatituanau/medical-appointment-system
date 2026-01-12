import {useNavigate} from "react-router-dom";
import AppointmentCard from "../../components/ui/AppointmentCard";
import SpecialtyCard from "../../components/ui/SpecialtyCard";

const MainDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-10">
      <div className="text-center md:text-left">
        <h1 className="text-4xl font-black text-slate-900">Hola, Usuario</h1>
        <p className="text-slate-500 mt-2">
          Bienvenido a tu portal de salud. ¿Qué deseas hacer hoy?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all group">
          <div className="h-44 bg-blue-600 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <span className="absolute bottom-4 left-6 bg-white/20 p-2 rounded-lg backdrop-blur-md">
              <span className="material-symbols-outlined text-white">
                calendar_add_on
              </span>
            </span>
          </div>
          <div className="p-8">
            <h3 className="text-xl font-bold text-slate-800">Agendar Cita</h3>
            <p className="text-sm text-slate-500 mt-2 mb-6">
              Reserva una consulta con medicina general o especialistas.
            </p>
            <button
              onClick={() => navigate("/agendar")}
              className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-sm hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2"
            >
              Agendar ahora
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all">
          <div className="h-44 bg-purple-600 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <span className="absolute bottom-4 left-6 bg-white/20 p-2 rounded-lg backdrop-blur-md">
              <span className="material-symbols-outlined text-white">
                history
              </span>
            </span>
          </div>
          <div className="p-8">
            <h3 className="text-xl font-bold text-slate-800">Mis Citas</h3>
            <p className="text-sm text-slate-500 mt-2 mb-6">
              Consulta el estado de tus citas programadas y tu historial.
            </p>
            <button
              onClick={() => navigate("/citas")}
              className="w-full py-4 bg-slate-100 text-slate-700 rounded-2xl font-bold text-sm hover:bg-slate-200 transition-all"
            >
              Ver mis citas
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 text-lg">Próxima Cita</h3>
            <button
              onClick={() => navigate("/citas")}
              className="text-primary text-xs font-bold hover:underline"
            >
              Ver todas
            </button>
          </div>
          <AppointmentCard
            month="OCT"
            date="24"
            type="Consulta General"
            doctor="Dr. Jorge Pérez"
            location="Consultorio 3B"
            status="Confirmada"
          />
        </div>

        <div className="bg-blue-50/50 p-8 rounded-3xl border border-blue-100">
          <h3 className="font-bold text-slate-800 mb-6">¿Necesitas ayuda?</h3>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-white rounded-full shadow-sm text-primary">
                <span className="material-symbols-outlined text-lg">call</span>
              </div>
              <div>
                <p className="font-bold text-slate-700 text-xs">Emergencias</p>
                <p className="text-slate-500 text-[11px]">
                  Llama al (555) 123-4567
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="font-bold text-slate-800 text-lg text-center">
          Especialidades Disponibles
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          <SpecialtyCard icon="stethoscope" name="Medicina General" />
          <SpecialtyCard icon="dentistry" name="Odontología" />
          <SpecialtyCard icon="psychology" name="Psicología" />
          <SpecialtyCard icon="nutrition" name="Nutrición" />
          <SpecialtyCard icon="biotech" name="Laboratorio" />
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
