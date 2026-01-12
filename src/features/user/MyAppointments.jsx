import AppointmentCard from "../../components/ui/AppointmentCard";

const MyAppointments = () => {
  return (
    <div className="max-w-4xl mx-auto py-4 space-y-10">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-black text-[#1e293b] tracking-tight">
          Medical Appointments
        </h1>
        <p className="text-slate-500 font-medium">
          Consulta y gestiona tus citas médicas programadas
        </p>
      </div>

      <div className="space-y-6">
        <h3 className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-widest">
          <span className="material-symbols-outlined text-lg">
            event_repeat
          </span>
          Próximas Citas
        </h3>

        <div className="grid grid-cols-1 gap-4">
          <AppointmentCard
            month="OCT"
            date="24"
            type="Medicina General"
            doctor="Dr. Jorge Pérez"
            location="Consultorio 3B (Campus Central)"
            status="Confirmada"
          />
          <AppointmentCard
            month="OCT"
            date="24"
            type="Medicina General"
            doctor="Dr. Jorge Pérez"
            location="Consultorio 3B (Campus Central)"
            status="Confirmada"
          />
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;
