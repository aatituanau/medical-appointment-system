import React, {useState} from "react";
import {
  useDoctors,
  useDoctorAvailability,
  useManageAvailability,
  useRealtimeSlots, // Este hook es la clave de la reactividad
} from "../../hooks/useMedicalData";
import AdminSearchHeader from "../../components/ui-admin/AdminSearchHeader";
import {ref, set} from "firebase/database";
import {rtdb} from "../../firebase/config";

const AppointmentsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  // 1. Médicos disponibles
  const {data: doctors, isLoading: loadingDocs} = useDoctors();

  // 2. Configuración persistente (Firestore)
  const {data: availability} = useDoctorAvailability(
    selectedDoc?.id,
    selectedDate,
  );

  // 3. Estado en VIVO (Realtime Database) - Fuente de verdad para la UI
  const realtimeSlots = useRealtimeSlots(selectedDoc?.id, selectedDate);

  const {mutate: saveAvailability} = useManageAvailability();

  const filteredDoctors = doctors?.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // HABILITAR / DESHABILITAR SLOT INDIVIDUAL
  const handleToggleSlot = async (time) => {
    if (!selectedDoc) return;
    const formattedTime = time.replace(":", "");

    // Verificamos si ya está agendado en RTDB
    const isTaken =
      realtimeSlots && realtimeSlots[formattedTime]?.status === "taken";
    if (isTaken) {
      alert("⚠️ No puedes modificar un horario ya agendado por un estudiante.");
      return;
    }

    const currentSlots = availability?.slots ? [...availability.slots] : [];
    const slotIndex = currentSlots.findIndex((s) => s.time === time);
    const isEnabled = slotIndex !== -1;

    let newSlots;
    const rtdbRef = ref(
      rtdb,
      `schedules/${selectedDoc.id}/${selectedDate}/${formattedTime}`,
    );

    if (isEnabled) {
      // 1. Borrar de RTDB primero (Efecto visual instantáneo)
      await set(rtdbRef, null);
      newSlots = currentSlots.filter((s) => s.time !== time);
    } else {
      // 1. Escribir en RTDB primero
      await set(rtdbRef, {
        status: "available",
        time,
        doctorId: selectedDoc.id,
        specialty: selectedDoc.specialty,
      });
      const newSlot = {time, available: true, status: "free"};
      newSlots = [...currentSlots, newSlot];
    }

    // 2. Guardar respaldo en Firestore
    newSlots.sort((a, b) => a.time.localeCompare(b.time));
    saveAvailability({
      doctorId: selectedDoc.id,
      date: selectedDate,
      slots: newSlots,
    });
  };

  // HABILITAR TODA LA JORNADA
  const handleEnableAll = async () => {
    if (!selectedDoc || !selectedDoc.baseSlots) return;

    const fullDay = selectedDoc.baseSlots.map((t) => {
      const formattedT = t.replace(":", "");
      const isTaken =
        realtimeSlots && realtimeSlots[formattedT]?.status === "taken";
      return isTaken
        ? {time: t, available: true, status: "taken"}
        : {time: t, available: true, status: "free"};
    });

    // Sincronizar RTDB masivamente
    const promises = fullDay.map((slot) => {
      const formattedT = slot.time.replace(":", "");
      if (slot.status !== "taken") {
        return set(
          ref(
            rtdb,
            `schedules/${selectedDoc.id}/${selectedDate}/${formattedT}`,
          ),
          {
            status: "available",
            time: slot.time,
            doctorId: selectedDoc.id,
            specialty: selectedDoc.specialty,
          },
        );
      }
      return Promise.resolve();
    });

    await Promise.all(promises);

    // Respaldo en Firestore
    saveAvailability({
      doctorId: selectedDoc.id,
      date: selectedDate,
      slots: fullDay,
    });
  };

  if (loadingDocs)
    return (
      <div className="p-10 text-center animate-pulse font-black text-slate-400">
        Cargando médicos...
      </div>
    );

  return (
    <div className="space-y-6">
      <AdminSearchHeader
        placeholder="Buscar médico o área..."
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        btnText={null}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* LISTADO DE DOCTORES */}
        <div className="lg:col-span-1 bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm h-[700px] flex flex-col overflow-hidden">
          <h3 className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest">
            Personal Médico
          </h3>
          <div className="flex flex-col gap-2 overflow-y-auto custom-scrollbar pr-2">
            {filteredDoctors?.map((doc) => (
              <button
                key={doc.id}
                onClick={() => setSelectedDoc(doc)}
                className={`text-left p-4 rounded-2xl transition-all ${
                  selectedDoc?.id === doc.id
                    ? "bg-[#137fec] text-white shadow-lg translate-x-1"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-600"
                }`}
              >
                <p className="text-xs font-black uppercase truncate">
                  {doc.name}
                </p>
                <p className="text-[9px] opacity-70 font-bold italic">
                  {doc.specialty}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* AGENDA DINÁMICA */}
        <div className="lg:col-span-3 bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
          {selectedDoc ? (
            <div className="space-y-8">
              <div className="flex justify-between items-center border-b border-slate-50 pb-6">
                <div>
                  <h2 className="text-xl font-black text-slate-800 uppercase italic">
                    {selectedDoc.name}
                  </h2>
                  <p className="text-[10px] font-black text-[#137fec] uppercase mt-1">
                    Cons. {selectedDoc.office}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleEnableAll}
                    className="px-5 py-2.5 bg-green-500 text-white text-[9px] font-black uppercase rounded-xl hover:bg-green-600 transition-all"
                  >
                    Habilitar Jornada
                  </button>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="px-4 py-2 bg-slate-50 rounded-xl text-xs font-black outline-none ring-1 ring-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {selectedDoc.baseSlots?.map((time) => {
                  const formattedTime = time.replace(":", "");
                  // IMPORTANTE: Leemos de realtimeSlots para la UI
                  const slotInRealtime = realtimeSlots
                    ? realtimeSlots[formattedTime]
                    : null;

                  const isTaken = slotInRealtime?.status === "taken";
                  const isActive = slotInRealtime?.status === "available";

                  return (
                    <button
                      key={time}
                      onClick={() => handleToggleSlot(time)}
                      className={`p-6 rounded-[2rem] border-2 transition-all duration-300 relative ${
                        isTaken
                          ? "bg-red-500 border-red-600 text-white shadow-lg cursor-not-allowed"
                          : isActive
                            ? "bg-white border-[#137fec] text-[#137fec] shadow-md hover:scale-105"
                            : "bg-slate-50 border-transparent text-slate-300 opacity-40 hover:opacity-100"
                      }`}
                    >
                      <span className="text-lg font-black">{time}</span>
                      <div className="flex items-center justify-center gap-1.5 mt-2">
                        <div
                          className={`size-1.5 rounded-full ${isTaken ? "bg-white animate-pulse" : isActive ? "bg-green-500" : "bg-slate-300"}`}
                        ></div>
                        <span
                          className={`text-[9px] font-black uppercase ${isTaken ? "text-red-100" : isActive ? "text-slate-400" : "text-slate-300"}`}
                        >
                          {isTaken
                            ? "Agendado"
                            : isActive
                              ? "Activo"
                              : "Inactivo"}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="py-40 text-center text-slate-300 uppercase font-black italic">
              <span className="material-symbols-outlined text-6xl opacity-20 block mb-4">
                person_search
              </span>
              Selecciona un médico para gestionar su agenda
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPage;
