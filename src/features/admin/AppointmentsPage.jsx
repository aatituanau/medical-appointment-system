import React, {useState} from "react";
import {
  useDoctors,
  useDoctorAvailability,
  useManageAvailability,
} from "../../hooks/useMedicalData";
import AdminSearchHeader from "../../components/ui-admin/AdminSearchHeader";
import {ref, set} from "firebase/database";
import {rtdb} from "../../firebase/config";

const AppointmentsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const {data: doctors, isLoading: loadingDocs} = useDoctors();
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  const {data: availability, isLoading: loadingSlots} = useDoctorAvailability(
    selectedDoc?.id,
    selectedDate,
  );

  const {mutate: saveAvailability} = useManageAvailability();

  // Filter doctors based on search term
  const filteredDoctors = doctors?.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleToggleSlot = async (time) => {
    if (!selectedDoc) return;
    const currentSlots = availability?.slots ? [...availability.slots] : [];
    const slotIndex = currentSlots.findIndex((s) => s.time === time);
    const slotData = slotIndex !== -1 ? currentSlots[slotIndex] : null;

    if (slotData?.status === "taken") {
      alert("⚠️ Cita reservada: No se puede desactivar.");
      return;
    }

    let newSlots;
    const rtdbRef = ref(
      rtdb,
      `schedules/${selectedDoc.id}/${selectedDate}/${time.replace(":", "")}`,
    );

    if (slotData) {
      newSlots = currentSlots.filter((s) => s.time !== time);
      await set(rtdbRef, null);
    } else {
      const newSlot = {time, available: true, status: "free"};
      newSlots = [...currentSlots, newSlot];
      await set(rtdbRef, {
        status: "available",
        time,
        doctorId: selectedDoc.id,
        specialty: selectedDoc.specialty,
      });
    }

    newSlots.sort((a, b) => a.time.localeCompare(b.time));
    saveAvailability({
      doctorId: selectedDoc.id,
      date: selectedDate,
      slots: newSlots,
    });
  };

  const handleEnableAll = async () => {
    if (!selectedDoc || !selectedDoc.baseSlots) return;
    const existingSlots = availability?.slots || [];
    const fullDay = selectedDoc.baseSlots.map((t) => {
      const isAlreadyTaken = existingSlots.find(
        (s) => s.time === t && s.status === "taken",
      );
      return isAlreadyTaken
        ? isAlreadyTaken
        : {time: t, available: true, status: "free"};
    });

    saveAvailability({
      doctorId: selectedDoc.id,
      date: selectedDate,
      slots: fullDay,
    });
    const promises = fullDay.map((slot) => {
      if (slot.status !== "taken") {
        return set(
          ref(
            rtdb,
            `schedules/${selectedDoc.id}/${selectedDate}/${slot.time.replace(":", "")}`,
          ),
          {status: "available", time: slot.time},
        );
      }
      return Promise.resolve();
    });
    await Promise.all(promises);
  };

  if (loadingDocs)
    return (
      <div className="p-10 text-center animate-pulse font-black text-slate-400 text-xs uppercase">
        Cargando...
      </div>
    );

  return (
    <div className="space-y-4 md:space-y-6 p-2 md:p-0">
      <AdminSearchHeader
        placeholder="Buscar médico por nombre o especialidad..."
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        btnText="Buscar"
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="lg:col-span-1 bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 p-4 md:p-6 shadow-sm h-auto lg:h-[750px] flex flex-col overflow-hidden">
          <h3 className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest text-center lg:text-left">
            Médicos Encontrados ({filteredDoctors?.length})
          </h3>

          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto pb-2 lg:pb-0 pr-0 lg:pr-2 custom-scrollbar">
            {filteredDoctors?.map((doc) => (
              <button
                key={doc.id}
                onClick={() => setSelectedDoc(doc)}
                className={`flex-shrink-0 lg:flex-shrink-1 w-[200px] lg:w-full text-left p-3 md:p-4 rounded-xl md:rounded-2xl transition-all duration-300 ${
                  selectedDoc?.id === doc.id
                    ? "bg-[#137fec] text-white shadow-lg lg:translate-x-1"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-600"
                }`}
              >
                <p className="text-[11px] md:text-xs font-black uppercase truncate">
                  {doc.name}
                </p>
                <p className="text-[9px] opacity-80 font-bold truncate">
                  {doc.specialty}
                </p>
              </button>
            ))}

            {filteredDoctors?.length === 0 && (
              <p className="text-[10px] text-slate-400 text-center py-10 font-bold">
                No se encontraron médicos.
              </p>
            )}
          </div>
        </div>

        <div className="lg:col-span-3 bg-white rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-100 p-4 md:p-8 shadow-sm min-h-[400px]">
          {selectedDoc ? (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-50 pb-6">
                <div className="w-full sm:w-auto">
                  <h2 className="text-lg md:text-xl font-black text-slate-800 uppercase italic leading-tight">
                    {selectedDoc.name}
                  </h2>
                  <p className="text-[9px] md:text-[10px] font-black text-[#137fec] uppercase mt-1">
                    Consultorio {selectedDoc.office}
                  </p>
                </div>

                <div className="flex flex-col xs:flex-row gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleEnableAll}
                    className="w-full sm:w-auto px-4 py-2 bg-green-500 text-white text-[9px] font-black uppercase rounded-xl hover:bg-green-600 shadow-md active:scale-95 transition-all"
                  >
                    Habilitar Jornada
                  </button>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full sm:w-auto px-4 py-2 bg-slate-50 rounded-xl text-xs font-black outline-none ring-1 ring-slate-100 focus:ring-[#137fec]"
                  />
                </div>
              </div>

              {loadingSlots ? (
                <div className="py-20 text-center text-slate-300 text-xs font-black uppercase animate-pulse">
                  Sincronizando...
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                  {selectedDoc.baseSlots?.map((time) => {
                    const slotData = availability?.slots?.find(
                      (s) => s.time === time,
                    );
                    const isCreated = !!slotData;
                    const isTaken = slotData?.status === "taken";

                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => handleToggleSlot(time)}
                        className={`p-4 md:p-6 rounded-[1.5rem] md:rounded-[2.5rem] border-2 transition-all duration-300 text-center relative group ${
                          isTaken
                            ? "bg-blue-600 border-blue-700 text-white shadow-lg cursor-not-allowed"
                            : isCreated
                              ? "bg-white border-[#137fec] text-[#137fec] shadow-md"
                              : "bg-slate-50 border-transparent text-slate-300 opacity-60 hover:opacity-100"
                        }`}
                      >
                        <span className="text-base md:text-lg font-black">
                          {time}
                        </span>

                        <div className="flex items-center justify-center gap-1.5 mt-1 md:mt-2">
                          <div
                            className={`size-1.5 rounded-full ${isTaken ? "bg-white animate-pulse" : isCreated ? "bg-green-500" : "bg-slate-300"}`}
                          ></div>
                          <span
                            className={`text-[8px] md:text-[9px] font-black uppercase tracking-tight ${isTaken ? "text-blue-100" : "text-slate-400"}`}
                          >
                            {isTaken
                              ? "Ocupado"
                              : isCreated
                                ? "Activo"
                                : "Habilitar"}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div className="py-20 md:py-40 flex flex-col items-center justify-center text-slate-300 uppercase text-[10px] md:text-xs font-black tracking-widest italic space-y-4">
              <span className="material-symbols-outlined text-4xl md:text-5xl opacity-20">
                person_search
              </span>
              <p className="text-center px-6">
                Busca y selecciona un médico para gestionar su agenda
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPage;
