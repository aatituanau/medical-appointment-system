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

// Provides CRUD helpers for the doctors collection with cache invalidations
export const useDoctors = () => {
  const queryClient = useQueryClient();
  const doctorsQuery = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      console.log("[API] Consultando lista completa de doctores");
      const snap = await getDocs(collection(db, "doctors"));
      console.log(`[API] Doctores obtenidos: ${snap.size} registros`);
      return snap.docs.map((d) => ({id: d.id, ...d.data()}));
    },
  });

  const addItem = useMutation({
    mutationFn: async (newData) => {
      try {
        console.log(`[ACCION] Registro de doctor solicitado: ${newData.name}`);
        await addDoc(collection(db, "doctors"), newData);
        console.log("[API] Doctor almacenado correctamente en Firestore");
      } catch (error) {
        console.error("[ERROR] No se pudo crear el doctor:", error);
        throw error;
      }
    },
    onSuccess: () => queryClient.invalidateQueries(["doctors"]),
  });

  const updateItem = useMutation({
    mutationFn: async ({id, ...data}) => {
      try {
        console.log(`[ACCION] Actualizando doctor ${id}`);
        await updateDoc(doc(db, "doctors", id), data);
        console.log("[API] Doctor actualizado en Firestore");
      } catch (error) {
        console.error("[ERROR] No se pudo actualizar el doctor:", error);
        throw error;
      }
    },
    onSuccess: () => queryClient.invalidateQueries(["doctors"]),
  });

  const deleteItem = useMutation({
    mutationFn: async (id) => {
      try {
        console.log(`[ACCION] Intentando eliminar doctor ID: ${id}`);
        await deleteDoc(doc(db, "doctors", id));
        console.log("[API] Doctor eliminado correctamente en Firestore");
      } catch (error) {
        console.error("[ERROR] No se pudo eliminar el doctor:", error);
        throw error;
      }
    },
    onSuccess: () => queryClient.invalidateQueries(["doctors"]),
  });

  return {
    ...doctorsQuery,
    addItem: addItem.mutate,
    updateItem: updateItem.mutate,
    deleteItem: deleteItem.mutate,
  };
};
