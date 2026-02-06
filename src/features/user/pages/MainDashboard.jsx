import React from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../../context/AuthContext";
import {
  useUserAppointments,
  useCancelAppointment,
} from "../../../hooks/useAppointments";
import {showAlertConfirm, showSuccessToast} from "../../../utils/alerts";

// Local dashboard widgets
import WelcomeBanner from "../components/WelcomeBanner";
import DashboardActionBtn from "../components/DashboardActionBtn";
import NextAppointmentSection from "../components/NextAppointmentSection";

const MainDashboard = () => {
  const navigate = useNavigate();
  const {user, userData} = useAuth();

  // Query hooks
  const {data: appointments, isLoading} = useUserAppointments(user?.uid);
  const {mutate: cancelAppointment} = useCancelAppointment();

  // Preferred display name
  const displayName =
    userData?.name ||
    userData?.nombre ||
    user?.displayName?.split(" ")[0] ||
    "Estudiante";

  // Delegate cancellation to child cards
  const handleCancel = async (cita) => {
    const isConfirmed = await showAlertConfirm(
      "¿Cancelar cita?",
      "Liberarás este turno.",
    );

    if (!isConfirmed) return;

    cancelAppointment(
      {
        appointmentId: cita.id,
        doctorId: cita.doctorId,
        date: cita.date,
        time: cita.time,
      },
      {
        onSuccess: () => showSuccessToast("Cita cancelada"),
      },
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 px-4 sm:px-6 animate-fade-in">
      {/* 1. Compact banner */}
      <WelcomeBanner displayName={displayName} />

      {/* 2. Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Left rail (7 cols): quick actions */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-3 px-2">
            <div className="h-8 w-1.5 bg-[#137fec] rounded-full"></div>
            <h2 className="text-xl font-black text-slate-800 uppercase italic">
              Acciones Rápidas
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DashboardActionBtn
              onClick={() => navigate("/agendar")}
              icon="calendar_add_on"
              title="Agendar Nueva Cita"
              subtitle="Busca especialidad y horario"
              colorTheme="blue"
            />

            <DashboardActionBtn
              onClick={() => navigate("/citas")}
              icon="history_edu"
              title="Historial de Citas"
              subtitle="Revisa tus atenciones pasadas"
              colorTheme="purple"
            />
          </div>
        </div>

        {/* Right rail (5 cols): next appointment */}
        <div className="lg:col-span-5">
          <NextAppointmentSection
            appointments={appointments}
            isLoading={isLoading}
            user={user}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
