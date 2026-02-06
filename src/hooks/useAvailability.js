import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  query,
  where,
  limit,
} from "firebase/firestore";
import {db} from "../firebase/config";

// Fetches a doctor's availability for a specific date
export const useDoctorAvailability = (doctorId, date) => {
  return useQuery({
    queryKey: ["availability", doctorId, date],
    queryFn: async () => {
      if (!doctorId || !date) return null;
      console.log(
        `[API] Consultando disponibilidad de ${doctorId} para la fecha ${date}`,
      );
      const availabilityQuery = query(
        collection(db, "availability"),
        where("doctorId", "==", doctorId),
        where("date", "==", date),
        limit(1),
      );
      const snap = await getDocs(availabilityQuery);
      console.log(`[API] Resultado de disponibilidad: ${snap.size} registros`);
      if (snap.empty) return null;
      return {id: snap.docs[0].id, ...snap.docs[0].data()};
    },
    enabled: !!doctorId && !!date,
  });
};

// Creates or updates availability slots for a doctor and invalidates caches
export const useManageAvailability = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({doctorId, date, slots}) => {
      try {
        console.log(
          `[ACCION] Actualizando disponibilidad para ${doctorId} en ${date}`,
        );
        const availabilityQuery = query(
          collection(db, "availability"),
          where("doctorId", "==", doctorId),
          where("date", "==", date),
          limit(1),
        );
        const snap = await getDocs(availabilityQuery);

        if (!snap.empty) {
          const docRef = doc(db, "availability", snap.docs[0].id);
          await updateDoc(docRef, {slots});
          console.log(
            "[API] Disponibilidad existente actualizada en Firestore",
          );
        } else {
          await addDoc(collection(db, "availability"), {
            doctorId,
            date,
            slots,
            createdAt: new Date(),
          });
          console.log("[API] Nueva disponibilidad registrada en Firestore");
        }
      } catch (error) {
        console.error("[ERROR] No se pudo gestionar la disponibilidad:", error);
        throw error;
      }
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries([
        "availability",
        variables.doctorId,
        variables.date,
      ]);
    },
  });
};
