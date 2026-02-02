import React, {useMemo} from "react";
import {useNavigate} from "react-router-dom";
import AppointmentCard from "../../../components/ui/AppointmentCard";
// Reuse the shared Skeleton component so the loading state matches the rest of the app
import Skeleton from "../../../components/ui/Skeleton";

const NextAppointmentSection = ({appointments, isLoading, user, onCancel}) => {
  const navigate = useNavigate();

  // Compute the nearest future appointment that is already confirmed
  const nextAppointment = useMemo(() => {
    if (!appointments) return null;
    const now = new Date();

    const upcoming = appointments.filter((cita) => {
      const citaDate = new Date(`${cita.date}T${cita.time}:00`);
      return cita.status === "confirmada" && citaDate > now;
    });

    return upcoming.sort(
      (a, b) =>
        new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`),
    )[0];
  }, [appointments]);

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="flex items-center gap-3 px-2">
        <div className="h-8 w-1.5 bg-slate-300 rounded-full"></div>
        <h2 className="text-xl font-black text-slate-800 uppercase italic">
          Próxima Atención
        </h2>
      </div>

      <div className="flex-1">
        {isLoading ? (
          // Skeleton placeholder keeps the layout stable while data loads
          <div className="bg-white h-full min-h-[180px] rounded-[2.5rem] border border-slate-100 p-6 flex flex-col justify-between shadow-sm">
            {/* Simulated header: date and status badge */}
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-2">
                <Skeleton className="h-3 w-20 rounded-full" /> {/* Small date */}
                <Skeleton className="h-6 w-32 rounded-lg" /> {/* Large time */}
              </div>
              <Skeleton className="h-8 w-24 rounded-full" /> {/* Status chip */}
            </div>

            {/* Simulated body: doctor and specialty */}
            <div className="flex items-center gap-4">
              <Skeleton className="h-14 w-14 rounded-2xl" /> {/* Avatar */}
              <div className="space-y-2">
                <Skeleton className="h-5 w-40 rounded-md" /> {/* Doctor name */}
                <Skeleton className="h-3 w-28 rounded-md" /> {/* Specialty */}
              </div>
            </div>

            {/* Simulated CTA */}
            <Skeleton className="h-10 w-full rounded-xl mt-4" />
          </div>
        ) : nextAppointment ? (
          <div className="transform hover:scale-[1.02] transition-transform duration-300 h-full">
            <AppointmentCard
              cita={nextAppointment}
              user={user}
              onCancel={onCancel}
              canCancelFn={() => true}
              getMonthNameFn={(d) =>
                new Date(d).toLocaleString("es-ES", {month: "long"})
              }
            />
          </div>
        ) : (
          <div className="bg-white h-full min-h-[160px] rounded-[2.5rem] border border-slate-100 flex flex-col items-center justify-center text-center p-6 shadow-sm">
            <div className="bg-slate-50 p-3 rounded-full mb-3">
              <span className="material-symbols-outlined text-3xl text-slate-300">
                event_available
              </span>
            </div>
            <p className="font-bold text-slate-600 text-sm">Todo despejado</p>
            <p className="text-xs text-slate-400 mt-1 mb-4">
              No tienes citas pendientes
            </p>
            <button
              onClick={() => navigate("/agendar")}
              className="text-xs font-black text-[#137fec] bg-blue-50 px-4 py-2 rounded-xl hover:bg-blue-100 transition-colors"
            >
              + Agendar Cita
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NextAppointmentSection;
