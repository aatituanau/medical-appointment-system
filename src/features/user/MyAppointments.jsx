import React, {useMemo} from "react";
import {useAuth} from "../../context/AuthContext";
import {
  useUserAppointments,
  useCancelAppointment,
} from "../../hooks/useMedicalData";
import Skeleton from "../../components/ui/Skeleton";
import Swal from "sweetalert2";
import AppointmentCard from "../../components/ui/AppointmentCard";

const MyAppointments = () => {
  const {user} = useAuth();
  const {data: appointments, isLoading} = useUserAppointments(user?.uid);
  const {mutate: cancelAppointment} = useCancelAppointment();

  const canCancel = (appointmentDate, appointmentTime) => {
    const formattedTime = appointmentTime
      .padStart(4, "0")
      .replace(/^(\d{2})(\d{2})$/, "$1:$2");
    const appointmentDateTime = new Date(
      `${appointmentDate}T${formattedTime}:00`,
    );
    const now = new Date();
    return appointmentDateTime - now >= 86400000;
  };

  const sortedAppointments = useMemo(() => {
    if (!appointments) return [];
    return [...appointments].sort((a, b) => {
      const dateA = new Date(a.date + "T00:00:00");
      const dateB = new Date(b.date + "T00:00:00");
      return dateB - dateA !== 0
        ? dateB - dateA
        : parseInt(b.time) - parseInt(a.time);
    });
  }, [appointments]);

  const getMonthName = (dateStr) => {
    return new Date(dateStr + "T00:00:00").toLocaleString("es-ES", {
      month: "long",
    });
  };

  const handleCancelClick = (cita) => {
    if (!canCancel(cita.date, cita.time)) {
      Swal.fire({
        title: "Cancelación denegada",
        text: "Mínimo 24 horas de anticipación.",
        icon: "error",
        confirmButtonColor: "#137fec",
        borderRadius: "2rem",
      });
      return;
    }

    Swal.fire({
      title: "¿Anular esta cita?",
      text: "El horario quedará libre para otros.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Sí, cancelar",
      borderRadius: "2rem",
    }).then((result) => {
      if (result.isConfirmed) {
        cancelAppointment(
          {
            appointmentId: cita.id,
            doctorId: cita.doctorId,
            date: cita.date,
            time: cita.time,
          },
          {
            onSuccess: () =>
              Swal.fire({
                title: "Cita Anulada",
                icon: "success",
                confirmButtonColor: "#137fec",
              }),
          },
        );
      }
    });
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto space-y-8 pb-20 px-4">
        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
          <Skeleton className="h-10 w-48 mb-4" />
          <Skeleton className="h-3 w-64" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white p-10 rounded-[3.5rem] border-2 border-slate-50 space-y-8"
            >
              <Skeleton className="size-24 rounded-[2.5rem]" />
              <div className="space-y-4">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20 px-4">
      <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
        <h1 className="text-4xl font-black text-slate-800 uppercase italic leading-none">
          Mis Citas
        </h1>
        <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mt-3">
          Historial del Hospital del Día UCE
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sortedAppointments.map((cita) => (
          <AppointmentCard
            key={cita.id}
            cita={cita}
            user={user}
            onCancel={handleCancelClick}
            canCancelFn={canCancel}
            getMonthNameFn={getMonthName}
          />
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
