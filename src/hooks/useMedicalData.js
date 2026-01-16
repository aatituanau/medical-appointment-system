import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import {db} from "../firebase/config";

// --- ESPECIALIDADES ---
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

// --- DOCTORES ---
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
