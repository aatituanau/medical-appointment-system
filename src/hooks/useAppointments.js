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
      const slotRef = ref(rtdb, `schedules/${doctorId}/${date}/${time}`);

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

      return result.snapshot.val();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["userAppointments"]});
    },
  });
};

export const useUserAppointments = (studentId) => {
  return useQuery({
    queryKey: ["userAppointments", studentId],
    queryFn: async () => {
      if (!studentId) return [];
      const appointmentsQuery = query(
        collection(db, "appointments"),
        where("studentId", "==", studentId),
      );
      const snap = await getDocs(appointmentsQuery);
      return snap.docs.map((d) => ({id: d.id, ...d.data()}));
    },
    enabled: !!studentId,
  });
};

export const useCancelAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({appointmentId, doctorId, date, time}) => {
      const appointmentRef = doc(db, "appointments", appointmentId);
      await updateDoc(appointmentRef, {
        status: "CANCELADA",
      });

      const formattedTime = time.replace(":", "");
      const rtdbPath = `schedules/${doctorId}/${date}/${formattedTime}`;
      const rtdbRef = ref(rtdb, rtdbPath);

      await update(rtdbRef, {
        status: "available",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["userAppointments"]);
      queryClient.invalidateQueries(["realtimeSlots"]);
    },
  });
};

export const useAllAppointmentsRealtime = () => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["allAppointments"],
    queryFn: () => {
      return new Promise((resolve) => {
        const appointmentsQuery = query(collection(db, "appointments"));
        onSnapshot(appointmentsQuery, (snapshot) => {
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
