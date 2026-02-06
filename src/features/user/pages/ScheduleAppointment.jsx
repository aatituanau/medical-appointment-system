import React, {useState, useEffect} from "react";
import {useSearchParams, useNavigate} from "react-router-dom";
import StatusAlert from "../../../components/ui/StatusAlert";
import Calendar from "../../../components/ui/Calendar";
import DoctorSelectionCard from "../components/DoctorSelectionCard";
import AppointmentSummary from "../components/AppointmentSummary";
import emailjs from "@emailjs/browser";
import uce from "../../../assets/uce.png";
import ConsultationForm from "../components/ConsultationForm";
import AvailableSlots from "../components/AvailableSlots";
import useAppointmentStore from "../../../store/useAppointmentStore"; //Suztand store

// Hooks of conection to medical data
import {useDoctors} from "../../../hooks/useDoctors";
import {useSpecialties} from "../../../hooks/useSpecialties";
import {useRealtimeSlots} from "../../../hooks/useRealtimeSlots";
import {useBookSlot} from "../../../hooks/useAppointments";
import {useAuth} from "../../../context/AuthContext";

const ScheduleAppointment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {user} = useAuth();

  // We extract everything from the Zustand store.
  const {
    selectedSpecialty: specialty,
    selectedDoctor: selectedDocObj,
    selectedDate,
    selectedSlot: selectedTime,
    setSpecialty,
    setDoctor: setSelectedDocObj,
    setDate: setSelectedDate,
    setSlot: setSelectedTime,
    resetAppointment,
  } = useAppointmentStore();

  // Alert state local
  const [alert, setAlert] = useState({show: false, type: "", msg: ""});

  // We set initial values ​​from URL or by default
  useEffect(() => {
    const urlSpecialty = searchParams.get("specialty");
    if (urlSpecialty && !specialty) {
      setSpecialty(urlSpecialty);
    } else if (!specialty) {
      setSpecialty("Medicina General");
    }
    // For default date, today
    if (!selectedDate) {
      setSelectedDate(new Date().toISOString().split("T")[0]);
    }
  }, []);

  // Data loading
  const {data: specialties} = useSpecialties();
  const {data: allDoctors} = useDoctors();
  const {mutateAsync: bookSlot, isLoading: isBooking} = useBookSlot();

  // Filters using the variables that now come from Zustand
  const filteredDoctors = allDoctors?.filter(
    (d) => d.specialty === specialty && d.status === "active",
  );

  const realtimeSlots = useRealtimeSlots(selectedDocObj?.id, selectedDate);

  // useEffect to close alerts (no changes)
  useEffect(() => {
    if (alert.show) {
      const timer = setTimeout(() => setAlert({...alert, show: false}), 5000);
      return () => clearTimeout(timer);
    }
  }, [alert.show]);

  const handleConfirm = async () => {
    // 1. User validations with StatusAlert
    if (!user) {
      return setAlert({
        show: true,
        type: "error",
        msg: "Debes iniciar sesión para agendar tu cita.",
      });
    }

    if (!specialty || !selectedDocObj || !selectedTime) {
      return setAlert({
        show: true,
        type: "error",
        msg: "Por favor, completa la selección de especialidad, médico y horario antes de confirmar.",
      });
    }

    try {
      // 2. Book in Firebase
      await bookSlot({
        doctorId: selectedDocObj.id,
        doctorName: selectedDocObj.name,
        specialty: specialty,
        office: selectedDocObj.office,
        date: selectedDate,
        time: selectedTime.replace(":", ""),
        studentId: user.uid,
        studentName: user.displayName || "Usuario",
      });

      // 3. Send Email via EmailJS
      const templateParams = {
        to_email: user.email,
        student_name: user.displayName || "Usuario",
        doctor_name: selectedDocObj.name,
        appointment_date: selectedDate,
        appointment_time: selectedTime,
        specialty: specialty,
        office: `Consultorio ${selectedDocObj.office}`,
      };

      emailjs
        .send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          templateParams,
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        )
        .catch((err) => console.error("Error al enviar correo:", err));

      setAlert({
        show: true,
        type: "success",
        msg: `¡Excelente! Tu cita ha sido agendada para las ${selectedTime}. Revisa tu correo electrónico.`,
      });

      // 4. Clean the store after successful completion
      resetAppointment();

      setTimeout(() => navigate("/citas"), 3000);
    } catch (error) {
      setAlert({
        show: true,
        type: "error",
        msg: error.message || "Lo sentimos, el horario ya no está disponible.",
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10 relative">
      <StatusAlert
        type={alert.type}
        message={alert.show ? alert.msg : ""}
        onClose={() => setAlert({show: false})}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          {/* Component ConsultationForm */}
          <ConsultationForm
            specialty={specialty || "Medicina General"} // Fallback visual
            setSpecialty={setSpecialty}
            selectedDocObj={selectedDocObj}
            setSelectedDocObj={setSelectedDocObj}
            setSelectedTime={setSelectedTime}
            specialties={specialties}
            filteredDoctors={filteredDoctors}
          />

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 text-sm mb-6 flex items-center gap-3">
              <span className="size-7 bg-blue-50 text-[#137fec] rounded-xl flex items-center justify-center text-xs font-black">
                2
              </span>
              Selecciona fecha
            </h3>
            <Calendar
              // We pass the date from the store to the calendar
              selected={selectedDate}
              // When the calendar detects a click, it notifies the store
              onDateChange={(date) => {
                setSelectedDate(date); // Save in Zustand
                setSelectedTime(""); // Reset the time because the day changed
              }}
            />
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <DoctorSelectionCard
            name={selectedDocObj?.name || "Seleccione Médico"}
            specialty={specialty || "..."}
            image={selectedDocObj?.image || uce}
          />

          {/* Component Hours */}
          <AvailableSlots
            realtimeSlots={realtimeSlots}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
          />

          <AppointmentSummary
            date={selectedDate}
            time={selectedTime || "--:--"}
            doctor={selectedDocObj?.name || "Sin seleccionar"}
            location={
              selectedDocObj?.office
                ? `Consultorio ${selectedDocObj.office}`
                : "Por asignar"
            }
            specialty={specialty}
            onConfirm={handleConfirm}
            isLoading={isBooking}
          />
        </div>
      </div>
    </div>
  );
};

export default ScheduleAppointment;
