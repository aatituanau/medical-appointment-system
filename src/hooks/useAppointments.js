import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import {ref, update, runTransaction} from "firebase/database";
import {db, rtdb} from "../firebase/config";

// Books an appointment slot in RTDB and persists the appointment document
export const useBookSlot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      doctorId,
      doctorName,
      specialty,
      date,
      time,
      studentId,
      studentName,
      office,
    }) => {
      try {
        console.log(
          `[ACCION] Intentando agendar con ${doctorName} el ${date} a las ${time}`,
        );
        const slotRef = ref(rtdb, `schedules/${doctorId}/${date}/${time}`);
        console.log(
          `[API] Validando disponibilidad en RTDB para doctor ${doctorId}`,
        );

        const result = await runTransaction(slotRef, (currentData) => {
          if (currentData === null || currentData.status === "available") {
            return {
              status: "taken",
              studentId: studentId,
              time: currentData?.time || time,
            };
          }
          return;
        });

        if (!result.committed) {
          throw new Error("Este horario ya fue ocupado por otro estudiante.");
        }

        await addDoc(collection(db, "appointments"), {
          doctorId,
          doctorName,
          specialty,
          date,
          time:
            time.length === 3
              ? `0${time.slice(0, 1)}:${time.slice(1)}`
              : `${time.slice(0, 2)}:${time.slice(2)}`,
          studentId,
          studentName,
          office,
          status: "confirmada",
          createdAt: new Date(),
        });
        console.log("[API] Cita registrada en Firebase con estado confirmada");

        return result.snapshot.val();
      } catch (error) {
        console.error("[ERROR] No se pudo reservar el horario:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["userAppointments"]});
    },
  });
};

// Retrieves the appointments booked by the current student
export const useUserAppointments = (studentId) => {
  return useQuery({
    queryKey: ["userAppointments", studentId],
    queryFn: async () => {
      if (!studentId) return [];
      console.log(`[API] Consultando citas del estudiante`);
      const appointmentsQuery = query(
        collection(db, "appointments"),
        where("studentId", "==", studentId),
      );
      const snap = await getDocs(appointmentsQuery);
      console.log(`[API] Citas recuperadas: ${snap.size}`);
      return snap.docs.map((d) => ({id: d.id, ...d.data()}));
    },
    enabled: !!studentId,
  });
};

// Cancels an appointment, frees the RTDB slot, and syncs caches
export const useCancelAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({appointmentId, doctorId, date, time}) => {
      try {
        console.log(
          `[ACCION] Solicitud de cancelación para cita ${appointmentId}`,
        );
        const appointmentRef = doc(db, "appointments", appointmentId);
        await updateDoc(appointmentRef, {
          status: "CANCELADA",
        });
        console.log("[API] Estado de la cita actualizado a CANCELADA");

        const formattedTime = time.replace(":", "");
        const rtdbPath = `schedules/${doctorId}/${date}/${formattedTime}`;
        const rtdbRef = ref(rtdb, rtdbPath);

        await update(rtdbRef, {
          status: "available",
        });
        console.log("[API] Horario liberado en RTDB");
      } catch (error) {
        console.error("[ERROR] No se pudo cancelar la cita:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["userAppointments"]);
      queryClient.invalidateQueries(["realtimeSlots"]);
    },
  });
};

// Streams every appointment for admin dashboards via Firestore realtime updates
export const useAllAppointmentsRealtime = () => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["allAppointments"],
    queryFn: () => {
      return new Promise((resolve) => {
        const appointmentsQuery = query(collection(db, "appointments"));
        onSnapshot(appointmentsQuery, (snapshot) => {
          console.log(
            `[API] Actualización en tiempo real de citas: ${snapshot.size}`,
          );
          const appointments = snapshot.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          }));
          queryClient.setQueryData(["allAppointments"], appointments);
          resolve(appointments);
        });
      });
    },
    staleTime: Infinity,
  });
};
