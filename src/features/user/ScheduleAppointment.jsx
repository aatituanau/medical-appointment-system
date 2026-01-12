import React, {useState} from "react";
import StatusAlert from "../../components/ui/StatusAlert";
import Calendar from "../../components/ui/Calendar";
import DoctorSelectionCard from "../../components/ui/DoctorSelectionCard";
import AppointmentSummary from "../../components/ui/AppointmentSummary";
import TimeSlotGrid from "../../components/ui/TimeSlotGrid";

const ScheduleAppointment = () => {
  const [specialty, setSpecialty] = useState("Medicina General");
  const [doctor, setDoctor] = useState("Dr. Juan Pérez");
  const [selectedDate, setSelectedDate] = useState("9 de Octubre");
  const [selectedTime, setSelectedTime] = useState("10:30 AM");
  const [alert, setAlert] = useState({show: false, type: "", msg: ""});

  const morningSlots = [
    "08:00 AM",
    "08:30 AM",
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
  ];
  const afternoonSlots = ["14:00 PM", "14:30 PM", "15:00 PM", "15:30 PM"];

  const handleConfirm = () => {
    setAlert({
      show: true,
      type: "error",
      msg: `El horario de las ${selectedTime} acaba de ser reservado por otro estudiante.`,
    });
    setTimeout(() => setAlert({show: false}), 5000);
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
                  onChange={(e) => setSpecialty(e.target.value)}
                  className="w-full h-12 bg-slate-50 border border-slate-100 rounded-2xl px-4 text-sm outline-none focus:ring-2 focus:ring-[#137fec]/20"
                >
                  <option value="Medicina General">Medicina General</option>
                  <option value="Odontología">Odontología</option>
                  <option value="Psicología">Psicología</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1">
                  Médico
                </label>
                <select
                  value={doctor}
                  onChange={(e) => setDoctor(e.target.value)}
                  className="w-full h-12 bg-slate-50 border border-slate-100 rounded-2xl px-4 text-sm outline-none focus:ring-2 focus:ring-[#137fec]/20"
                >
                  <option value="Dr. Juan Pérez">Dr. Juan Pérez</option>
                  <option value="Dra. Ana Mora">Dra. Ana Mora</option>
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
              onDateChange={(day) => setSelectedDate(`${day} de Octubre`)}
            />
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <DoctorSelectionCard
            name={doctor}
            specialty={specialty}
            image="https://randomuser.me/api/portraits/men/1.jpg"
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
          </div>
          <AppointmentSummary
            date={selectedDate}
            time={selectedTime}
            doctor={doctor}
            location="Consultorio 304"
            specialty={specialty}
            onConfirm={handleConfirm}
          />
        </div>
      </div>
    </div>
  );
};

export default ScheduleAppointment;
