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

export const useSpecialties = () => {
  const queryClient = useQueryClient();
  const specialtiesQuery = useQuery({
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
    ...specialtiesQuery,
    addSpecialty: addSpecialty.mutate,
    updateSpecialty: updateSpecialty.mutate,
    deleteSpecialty: deleteSpecialty.mutate,
  };
};
