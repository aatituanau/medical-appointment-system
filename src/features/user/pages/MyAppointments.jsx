import React, {useState, useMemo} from "react";
import {useAuth} from "../../../context/AuthContext";
import {
  useUserAppointments,
  useCancelAppointment,
} from "../../../hooks/useAppointments";
import Swal from "sweetalert2";
import AppointmentCard from "../components/AppointmentCard";
import ReportFilters from "../../../components/ui/ReportFilters";
import AppointmentsSkeleton from "../../../components/skeletons/AppointmentsSkeleton";
import PaginationControls from "../components/PaginationControls";

const MyAppointments = () => {
  const {user} = useAuth();

  // 1. State for Filters and Pagination
  const [filterStatus, setFilterStatus] = useState("todos");
  const [dateRange, setDateRange] = useState({start: "", end: ""});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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

  // 2. Filtering Logic
  const filteredAppointments = useMemo(() => {
    if (!appointments) return [];

    let filtered = [...appointments];

    if (filterStatus !== "todos") {
      filtered = filtered.filter(
        (a) => a.status?.toLowerCase() === filterStatus.toLowerCase(),
      );
    }

    if (dateRange.start && dateRange.end) {
      filtered = filtered.filter((a) => {
        const appDate = new Date(a.date);
        const start = new Date(dateRange.start);
        const end = new Date(dateRange.end);
        appDate.setHours(0, 0, 0, 0);
        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);
        return appDate >= start && appDate <= end;
      });
    }

    return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [appointments, filterStatus, dateRange]);

  // 3. Pagination Logic
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAppointments.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAppointments, currentPage, itemsPerPage]);

  const handleCancelClick = (cita) => {
    if (!canCancel(cita.date, cita.time)) {
      Swal.fire({
        title: "Cancelación denegada",
        text: "Mínimo 24 horas de anticipación.",
        icon: "error",
        confirmButtonColor: "#137fec",
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
              Swal.fire({title: "Cita Anulada", icon: "success"}),
          },
        );
      }
    });
  };

  if (isLoading) return <AppointmentsSkeleton />;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20 px-4">
      <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-800 uppercase italic leading-none">
              Mis Citas
            </h1>
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mt-3">
              Historial del Hospital del Día UCE
            </p>
          </div>
          <button
            onClick={() => {
              setFilterStatus("todos");
              setDateRange({start: "", end: ""});
              setCurrentPage(1);
            }}
            className="text-[10px] font-black text-blue-600 bg-blue-50 px-4 py-2 rounded-xl border border-blue-100 active:scale-95 transition-all"
          >
            Limpiar Filtros
          </button>
        </div>

        <div className="pt-4 border-t border-slate-50">
          <ReportFilters
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            dateRange={dateRange}
            setDateRange={setDateRange}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {currentItems.map((cita) => {
          const isPast = new Date(cita.date + "T23:59:59") < new Date();
          return (
            <div
              key={cita.id}
              className={isPast ? "opacity-60 grayscale-[0.5]" : ""}
            >
              <AppointmentCard
                cita={cita}
                user={user}
                onCancel={handleCancelClick}
                canCancelFn={canCancel}
                getMonthNameFn={(d) =>
                  new Date(d + "T00:00:00").toLocaleString("es-ES", {
                    month: "long",
                  })
                }
              />
            </div>
          );
        })}

        {currentItems.length === 0 && (
          <div className="col-span-full py-20 text-center bg-white rounded-[3rem] border border-dashed border-slate-200">
            <p className="text-slate-400 font-black uppercase text-xs tracking-widest italic">
              No se encontraron citas
            </p>
          </div>
        )}
      </div>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default MyAppointments;
