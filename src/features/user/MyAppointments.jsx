import React, {useMemo} from "react";
import {useAuth} from "../../context/AuthContext";
import {useUserAppointments} from "../../hooks/useMedicalData";
import {generateAppointmentPDF} from "../../utils/pdfGenerator";
import Skeleton from "../../components/ui/Skeleton";

const MyAppointments = () => {
  const {user} = useAuth();
  const {data: appointments, isLoading} = useUserAppointments(user?.uid);

  // DESCENDING ORDER: Most recent/future dates first
  const sortedAppointments = useMemo(() => {
    if (!appointments) return [];

    return [...appointments].sort((a, b) => {
      const dateA = new Date(a.date + "T00:00:00");
      const dateB = new Date(b.date + "T00:00:00");

      if (dateB - dateA !== 0) {
        return dateB - dateA;
      }
      return parseInt(b.time) - parseInt(a.time);
    });
  }, [appointments]);

  const getMonthName = (dateStr) => {
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleString("es-ES", {month: "long"});
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto space-y-8 pb-20 px-4">
        {/* Skeleton del Header */}
        <div className="bg-white p-10 rounded-[3rem] border border-slate-100">
          <Skeleton className="h-10 w-48 mb-4" />
          <Skeleton className="h-3 w-64" />
        </div>

        {/* Grid de Skeletons de Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-white p-10 rounded-[3.5rem] border-2 border-slate-50 shadow-sm space-y-8"
            >
              <div className="flex items-center gap-8">
                {/* Cuadro de fecha azul */}
                <Skeleton className="size-24 rounded-[2.5rem] flex-shrink-0" />
                <div className="space-y-3 w-full">
                  <Skeleton className="h-8 w-24" /> {/* Hora */}
                  <Skeleton className="h-3 w-32" /> {/* Especialidad */}
                </div>
              </div>

              <div className="pt-10 border-t border-slate-50 flex justify-between items-end">
                <div className="space-y-2">
                  <Skeleton className="h-3 w-40" />
                  <Skeleton className="h-4 w-56" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="size-12 rounded-2xl" />
                  <Skeleton className="size-12 rounded-2xl" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20 px-4">
      {/* HEADER */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
        <h1 className="text-4xl font-black text-slate-800 uppercase italic leading-none">
          Mis Citas
        </h1>
        <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mt-3">
          {sortedAppointments?.length > 0
            ? `Tienes ${sortedAppointments.length} citas registradas en el sistema`
            : "No se encontraron citas agendadas"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sortedAppointments?.map((cita) => (
          <div
            key={cita.id}
            className="bg-white p-10 rounded-[3.5rem] border-2 border-slate-50 shadow-sm relative overflow-hidden group hover:shadow-2xl transition-all animate-fade-in"
          >
            {/* STATUS */}
            <div className="absolute top-0 right-0 p-10">
              <span className="bg-green-50 text-green-600 text-[9px] font-black px-5 py-2 rounded-full uppercase border border-green-100">
                {cita.status || "CONFIRMADA"}
              </span>
            </div>

            <div className="flex items-center gap-8">
              <div className="size-24 bg-[#137fec] rounded-[2.5rem] flex flex-col items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <span className="text-[10px] font-black uppercase opacity-60">
                  {getMonthName(cita.date)}
                </span>
                <span className="text-3xl font-black italic leading-none">
                  {cita.date.split("-")[2]}
                </span>
              </div>
              <div>
                <p className="text-2xl font-black text-slate-800 uppercase italic leading-none">
                  {/* Format "0900" to "09:00" */}
                  {cita.time
                    .padStart(4, "0")
                    .replace(/^(\d{2})(\d{2})$/, "$1:$2")}
                </p>
                <p className="text-[11px] font-black text-[#137fec] uppercase tracking-[0.1em] mt-3 tracking-widest">
                  {cita.specialty}
                </p>
              </div>
            </div>

            <div className="mt-10 pt-10 border-t border-slate-50 flex justify-between items-end">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic mb-2">
                  Especialista & Consultorio
                </p>
                <p className="text-sm font-black text-slate-700 uppercase italic tracking-tight">
                  {cita.doctorName}
                </p>
                <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">
                  Consultorio {cita.office} — UCE
                </p>
              </div>

              {/* Generate PDF */}
              <div className="flex gap-2">
                <button
                  onClick={() => generateAppointmentPDF(cita, user)}
                  className="bg-blue-50 text-[#137fec] size-12 rounded-2xl hover:bg-[#137fec] hover:text-white transition-all flex items-center justify-center shadow-sm group/print"
                  title="Descargar Comprobante PDF"
                >
                  <span className="material-symbols-outlined text-xl">
                    print
                  </span>
                </button>

                <button
                  onClick={() => alert("Función para cancelar...")}
                  className="bg-red-50 text-red-600 size-12 rounded-2xl hover:bg-red-600 hover:text-white transition-all flex items-center justify-center shadow-sm"
                  title="Cancelar"
                >
                  <span className="material-symbols-outlined text-xl">
                    cancel
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {sortedAppointments?.length === 0 && (
          <div className="col-span-full py-20 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
            <span className="material-symbols-outlined text-5xl text-slate-300 mb-4">
              calendar_today
            </span>
            <p className="text-slate-400 font-black uppercase text-xs">
              Aún no has realizado ningún agendamiento.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
