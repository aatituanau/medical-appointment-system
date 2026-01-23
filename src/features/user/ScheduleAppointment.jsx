import React, {useState, useEffect} from "react";
import {useSearchParams, useNavigate} from "react-router-dom";
import StatusAlert from "../../components/ui/StatusAlert";
import Calendar from "../../components/ui/Calendar";
import DoctorSelectionCard from "../../components/ui/DoctorSelectionCard";
import AppointmentSummary from "../../components/ui/AppointmentSummary";
import TimeSlotGrid from "../../components/ui/TimeSlotGrid";
import emailjs from "@emailjs/browser";
import uce from "../../assets/uce.png";

// Hooks of conection to medical data
import {
  useDoctors,
  useSpecialties,
  useRealtimeSlots,
  useBookSlot,
} from "../../hooks/useMedicalData";
import {useAuth} from "../../context/AuthContext";

const ScheduleAppointment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {user} = useAuth();

  // States
  const [specialty, setSpecialty] = useState(
    searchParams.get("specialty") || "Medicina General",
  );
  const [selectedDocObj, setSelectedDocObj] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [selectedTime, setSelectedTime] = useState("");
  const [alert, setAlert] = useState({show: false, type: "", msg: ""});

  // Data loading
  const {data: specialties} = useSpecialties();
  const {data: allDoctors} = useDoctors();
  const {mutateAsync: bookSlot, isLoading: isBooking} = useBookSlot();

  const filteredDoctors = allDoctors?.filter(
    (d) => d.specialty === specialty && d.status === "active",
  );

  const realtimeSlots = useRealtimeSlots(selectedDocObj?.id, selectedDate);

  const morningSlots = realtimeSlots
    ? Object.values(realtimeSlots).filter((s) => parseInt(s.time) < 1300)
    : [];

  const afternoonSlots = realtimeSlots
    ? Object.values(realtimeSlots).filter((s) => parseInt(s.time) >= 1300)
    : [];

  // function for closing alerts automatically in 5 seconds
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
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-3">
              <span className="size-7 bg-blue-50 text-[#137fec] rounded-xl flex items-center justify-center text-xs font-black">
                1
              </span>
              Datos de la consulta
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1">
                  Especialidad
                </label>
                <select
                  value={specialty}
                  onChange={(e) => {
                    setSpecialty(e.target.value);
                    setSelectedDocObj(null);
                    setSelectedTime("");
                  }}
                  className="w-full h-12 bg-slate-50 border border-slate-100 rounded-2xl px-4 text-sm outline-none focus:ring-2 focus:ring-[#137fec]/20"
                >
                  <option value="">Seleccione especialidad</option>
                  {specialties
                    ?.filter((s) => s.active)
                    .map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1">
                  Médico
                </label>
                <select
                  value={selectedDocObj?.name || ""}
                  onChange={(e) => {
                    const doc = filteredDoctors.find(
                      (d) => d.name === e.target.value,
                    );
                    setSelectedDocObj(doc);
                    setSelectedTime("");
                  }}
                  className="w-full h-12 bg-slate-50 border border-slate-100 rounded-2xl px-4 text-sm outline-none focus:ring-2 focus:ring-[#137fec]/20"
                >
                  <option value="">Seleccione un médico</option>
                  {filteredDoctors?.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 text-sm mb-6 flex items-center gap-3">
              <span className="size-7 bg-blue-50 text-[#137fec] rounded-xl flex items-center justify-center text-xs font-black">
                2
              </span>
              Selecciona fecha
            </h3>
            <Calendar
              onDateChange={(date) => {
                setSelectedDate(date);
                setSelectedTime("");
              }}
            />
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <DoctorSelectionCard
            name={selectedDocObj?.name || "Seleccione Médico"}
            specialty={specialty}
            image={selectedDocObj?.image || uce}
          />

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
            <h3 className="font-bold text-slate-800 text-sm flex items-center justify-between">
              <span className="flex items-center gap-3">
                <span className="size-7 bg-blue-50 text-[#137fec] rounded-xl flex items-center justify-center text-xs font-black">
                  3
                </span>
                Horarios Disponibles
              </span>
            </h3>

            {realtimeSlots ? (
              <>
                <TimeSlotGrid
                  label="Mañana"
                  slots={morningSlots}
                  selectedSlot={selectedTime}
                  onSelect={setSelectedTime}
                />
                <TimeSlotGrid
                  label="Tarde"
                  slots={afternoonSlots}
                  selectedSlot={selectedTime}
                  onSelect={setSelectedTime}
                />
              </>
            ) : (
              <p className="text-center text-[10px] font-black text-slate-300 uppercase py-10 tracking-widest italic">
                No hay turnos habilitados por el administrador
              </p>
            )}
          </div>

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
