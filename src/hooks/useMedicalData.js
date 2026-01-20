import {useState, useEffect} from "react";
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
  limit,
} from "firebase/firestore";
import {ref, onValue, set, runTransaction} from "firebase/database";
import {db, rtdb} from "../firebase/config";

// --- Specialties ---
export const useSpecialties = () => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["specialties"],
    queryFn: async () => {
      const snap = await getDocs(collection(db, "specialties"));
      return snap.docs.map((d) => ({id: d.id, ...d.data()}));
    },
  });

  const addSpecialty = useMutation({
    mutationFn: (newData) => addDoc(collection(db, "specialties"), newData),
    onSuccess: () => queryClient.invalidateQueries(["specialties"]),
  });

  const updateSpecialty = useMutation({
    mutationFn: ({id, ...data}) => updateDoc(doc(db, "specialties", id), data),
    onSuccess: () => queryClient.invalidateQueries(["specialties"]),
  });

  const deleteSpecialty = useMutation({
    mutationFn: (id) => deleteDoc(doc(db, "specialties", id)),
    onSuccess: () => queryClient.invalidateQueries(["specialties"]),
  });

  return {
    ...query,
    addSpecialty: addSpecialty.mutate,
    updateSpecialty: updateSpecialty.mutate,
    deleteSpecialty: deleteSpecialty.mutate,
  };
};

// --- Doctors ---
export const useDoctors = () => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const snap = await getDocs(collection(db, "doctors"));
      return snap.docs.map((d) => ({id: d.id, ...d.data()}));
    },
  });

  const addItem = useMutation({
    mutationFn: (newData) => addDoc(collection(db, "doctors"), newData),
    onSuccess: () => queryClient.invalidateQueries(["doctors"]),
  });

  const updateItem = useMutation({
    mutationFn: ({id, ...data}) => updateDoc(doc(db, "doctors", id), data),
    onSuccess: () => queryClient.invalidateQueries(["doctors"]),
  });

  const deleteItem = useMutation({
    mutationFn: (id) => deleteDoc(doc(db, "doctors", id)),
    onSuccess: () => queryClient.invalidateQueries(["doctors"]),
  });

  return {
    ...query,
    addItem: addItem.mutate,
    updateItem: updateItem.mutate,
    deleteItem: deleteItem.mutate,
  };
};

// --- AVAILABILITY (FIRESTORE - ADMIN) ---
export const useDoctorAvailability = (doctorId, date) => {
  return useQuery({
    queryKey: ["availability", doctorId, date],
    queryFn: async () => {
      if (!doctorId || !date) return null;
      const q = query(
        collection(db, "availability"),
        where("doctorId", "==", doctorId),
        where("date", "==", date),
        limit(1),
      );
      const snap = await getDocs(q);
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
      const q = query(
        collection(db, "availability"),
        where("doctorId", "==", doctorId),
        where("date", "==", date),
        limit(1),
      );
      const snap = await getDocs(q);

      if (!snap.empty) {
        const docRef = doc(db, "availability", snap.docs[0].id);
        // We update the list of slots (this is where slots are added or removed)
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

// --- NEW: APPOINTMENT MANAGEMENT (REALTIME DATABASE - STUDENTS) ---

// Hook for students to see slots in REAL TIME
export const useRealtimeSlots = (doctorId, date) => {
  const [slots, setSlots] = useState(null);

  useEffect(() => {
    if (!doctorId || !date) return;

    // Reference to the node in Realtime Database
    const slotsRef = ref(rtdb, `schedules/${doctorId}/${date}`);

    // onValue listens for changes and updates the state instantly
    const unsubscribe = onValue(slotsRef, (snapshot) => {
      setSlots(snapshot.val());
    });

    return () => unsubscribe();
  }, [doctorId, date]);

  return slots;
};

// Function to book using TRANSACTIONS (Prevents two students from taking the same slot)
export const useBookSlot = () => {
  return useMutation({
    mutationFn: async ({doctorId, date, time, studentId}) => {
      const slotRef = ref(rtdb, `schedules/${doctorId}/${date}/${time}`);

      const result = await runTransaction(slotRef, (currentData) => {
        // If the slot is available, we take it
        if (currentData === null || currentData.status === "available") {
          return {status: "taken", studentId: studentId};
        }
        // If it's already taken, we cancel
        return;
      });

      if (!result.committed) {
        throw new Error("Este horario ya fue ocupado por otro estudiante.");
      }

      return result.snapshot.val();
    },
  });
};
