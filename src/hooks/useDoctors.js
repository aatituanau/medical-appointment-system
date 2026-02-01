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

export const useDoctors = () => {
  const queryClient = useQueryClient();
  const doctorsQuery = useQuery({
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
    ...doctorsQuery,
    addItem: addItem.mutate,
    updateItem: updateItem.mutate,
    deleteItem: deleteItem.mutate,
  };
};
