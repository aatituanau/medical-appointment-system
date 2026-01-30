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

export const useDoctorAvailability = (doctorId, date) => {
  return useQuery({
    queryKey: ["availability", doctorId, date],
    queryFn: async () => {
      if (!doctorId || !date) return null;
      const availabilityQuery = query(
        collection(db, "availability"),
        where("doctorId", "==", doctorId),
        where("date", "==", date),
        limit(1),
      );
      const snap = await getDocs(availabilityQuery);
      if (snap.empty) return null;
      return {id: snap.docs[0].id, ...snap.docs[0].data()};
    },
    enabled: !!doctorId && !!date,
  });
};

export const useManageAvailability = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({doctorId, date, slots}) => {
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
      } else {
        await addDoc(collection(db, "availability"), {
          doctorId,
          date,
          slots,
          createdAt: new Date(),
        });
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
