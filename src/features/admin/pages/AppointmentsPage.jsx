import React, {useState} from "react";
import {useDoctors} from "../../../hooks/useDoctors";
import {
  useDoctorAvailability,
  useManageAvailability,
} from "../../../hooks/useAvailability";
import {useRealtimeSlots} from "../../../hooks/useRealtimeSlots";
import {useDebounce} from "../../../hooks/useDebounce";
import AdminSearchHeader from "../components/AdminSearchHeader";
import {ref, set} from "firebase/database";
import {rtdb} from "../../../firebase/config";
import {showErrorAlert} from "../../../utils/alerts";

import ScheduleSkeleton from "../../../components/skeletons/ScheduleSkeleton";
import DoctorsSidebarList from "../components/DoctorsSidebarList";
import ScheduleManager from "../components/ScheduleManager";

const AppointmentsPage = () => {
  // Tracks doctor search, selection, and date targeted for slot management
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  const debouncedSearch = useDebounce(searchTerm, 500);
  const {data: doctors, isLoading: loadingDocs} = useDoctors();
  const {data: availability} = useDoctorAvailability(
    selectedDoc?.id,
    selectedDate,
  );
  const realtimeSlots = useRealtimeSlots(selectedDoc?.id, selectedDate);
  const {mutate: saveAvailability} = useManageAvailability();

  const filteredDoctors = doctors?.filter(
    (doc) =>
      doc.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );

  const handleToggleSlot = async (time) => {
    if (!selectedDoc) return;
    console.log(
      `[ACCION] Cambio de disponibilidad solicitado para ${selectedDoc.name} (${selectedDate} ${time})`,
    );

    try {
      const formattedTime = time.replace(":", "");
      const isTaken =
        realtimeSlots && realtimeSlots[formattedTime]?.status === "taken";

      if (isTaken) {
        console.log(
          `[ACCION] Slot ${time} ya agendado, se cancela la modificación`,
        );
        await showErrorAlert(
          "Horario no disponible",
          "No puedes modificar un horario ya agendado por un usuario.",
        );
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
        console.log(`[API] Deshabilitando slot ${time} en RTDB`);
        await set(rtdbRef, null);
        newSlots = currentSlots.filter((s) => s.time !== time);
      } else {
        console.log(`[API] Activando slot ${time} en RTDB`);
        await set(rtdbRef, {
          status: "available",
          time,
          doctorId: selectedDoc.id,
          specialty: selectedDoc.specialty,
        });
        newSlots = [...currentSlots, {time, available: true, status: "free"}];
      }

      newSlots.sort((a, b) => a.time.localeCompare(b.time));
      saveAvailability({
        doctorId: selectedDoc.id,
        date: selectedDate,
        slots: newSlots,
      });
    } catch (error) {
      console.error("[ERROR] No se pudo actualizar el horario:", error);
    }
  };

  const handleEnableAll = async () => {
    if (!selectedDoc || !selectedDoc.baseSlots) return;
    console.log(
      `[ACCION] Habilitando jornada completa para ${selectedDoc.name} el ${selectedDate}`,
    );

    try {
      const fullDay = selectedDoc.baseSlots.map((t) => {
        const formattedT = t.replace(":", "");
        const isTaken =
          realtimeSlots && realtimeSlots[formattedT]?.status === "taken";
        return isTaken
          ? {time: t, available: true, status: "taken"}
          : {time: t, available: true, status: "free"};
      });

      console.log("[API] Replicando slots disponibles en RTDB para la jornada");
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
      saveAvailability({
        doctorId: selectedDoc.id,
        date: selectedDate,
        slots: fullDay,
      });
    } catch (error) {
      console.error("[ERROR] No se pudo habilitar la jornada completa:", error);
    }
  };

  if (loadingDocs) {
    return <ScheduleSkeleton />;
  }

  return (
    <div className="space-y-6">
      <AdminSearchHeader
        placeholder="Buscar médico o área..."
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        btnText="Habilitar Jornada"
        onAddClick={handleEnableAll}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <DoctorsSidebarList
          doctors={filteredDoctors}
          selectedDoc={selectedDoc}
          onSelectDoc={setSelectedDoc}
        />

        <ScheduleManager
          selectedDoc={selectedDoc}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          realtimeSlots={realtimeSlots}
          onToggleSlot={handleToggleSlot}
        />
      </div>
    </div>
  );
};

export default AppointmentsPage;
