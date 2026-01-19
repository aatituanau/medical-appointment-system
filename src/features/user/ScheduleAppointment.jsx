import React, {useState, useEffect} from "react";
import {useSearchParams, useNavigate} from "react-router-dom";
import StatusAlert from "../../components/ui/StatusAlert";
import Calendar from "../../components/ui/Calendar";
import DoctorSelectionCard from "../../components/ui/DoctorSelectionCard";
import AppointmentSummary from "../../components/ui/AppointmentSummary";
import TimeSlotGrid from "../../components/ui/TimeSlotGrid";

// Importamos tus hooks de conexión real
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

  // Estados originales conectados a Firebase
  const [specialty, setSpecialty] = useState(
    searchParams.get("specialty") || "Medicina General",
  );
  const [selectedDocObj, setSelectedDocObj] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [selectedTime, setSelectedTime] = useState("");
  const [alert, setAlert] = useState({show: false, type: "", msg: ""});

  // Carga de datos reales
  const {data: specialties} = useSpecialties();
  const {data: allDoctors} = useDoctors();
  const {mutate: bookSlot, isLoading: isBooking} = useBookSlot();

  // Filtramos doctores por especialidad elegida
  const filteredDoctors = allDoctors?.filter(
    (d) => d.specialty === specialty && d.status === "active",
  );

  // Slots en tiempo real (lo que el admin habilitó)
  const realtimeSlots = useRealtimeSlots(selectedDocObj?.id, selectedDate);

  // Separar mañana y tarde para tus componentes originales
  const morningSlots = realtimeSlots
    ? Object.values(realtimeSlots)
        .filter((s) => parseInt(s.time) < 13)
        .map((s) => s.time)
    : [];
  const afternoonSlots = realtimeSlots
    ? Object.values(realtimeSlots)
        .filter((s) => parseInt(s.time) >= 13)
        .map((s) => s.time)
    : [];

  const handleConfirm = async () => {
    if (!selectedTime) return alert("Por favor, selecciona un horario");
    if (!user) return alert("Debes iniciar sesión para agendar");

    try {
      await bookSlot({
        doctorId: selectedDocObj.id,
        date: selectedDate,
        time: selectedTime.replace(":", ""),
        studentId: user.uid,
        studentName: user.displayName || "Estudiante UCE",
      });

      setAlert({
        show: true,
        type: "success",
        msg: `¡Cita agendada con éxito para las ${selectedTime}!`,
      });

      setTimeout(() => navigate("/citas"), 2000);
    } catch (error) {
      setAlert({
        show: true,
        type: "error",
        msg: error.message || "El horario ya fue reservado.",
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
        {/* COLUMNA IZQUIERDA: DATOS Y CALENDARIO */}
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
                    setSelectedDocObj(null); // Reiniciar médico al cambiar área
                  }}
                  className="w-full h-12 bg-slate-50 border border-slate-100 rounded-2xl px-4 text-sm outline-none focus:ring-2 focus:ring-[#137fec]/20"
                >
                  <option value="">Seleccione una especialidad</option>
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
                // date viene del componente como YYYY-MM-DD
                setSelectedDate(date);
              }}
            />
          </div>
        </div>

        {/* COLUMNA DERECHA: DOCTOR, SLOTS Y RESUMEN */}
        <div className="lg:col-span-5 space-y-6">
          <DoctorSelectionCard
            name={selectedDocObj?.name || "Seleccione Médico"}
            specialty={specialty}
            image={
              selectedDocObj?.image ||
              "https://randomuser.me/api/portraits/men/32.jpg"
            }
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
              <p className="text-center text-[10px] font-black text-slate-300 uppercase py-10">
                No hay turnos disponibles para esta fecha
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
