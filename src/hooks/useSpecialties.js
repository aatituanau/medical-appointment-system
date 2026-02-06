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

// Manages specialties collection CRUD operations with cache syncing
export const useSpecialties = () => {
  const queryClient = useQueryClient();
  const specialtiesQuery = useQuery({
    queryKey: ["specialties"],
    queryFn: async () => {
      console.log("[API] Consultando catálogo de especialidades");
      const snap = await getDocs(collection(db, "specialties"));
      console.log(`[API] Especialidades obtenidas: ${snap.size}`);
      return snap.docs.map((d) => ({id: d.id, ...d.data()}));
    },
  });

  const addSpecialty = useMutation({
    mutationFn: async (newData) => {
      try {
        console.log(`[ACCION] Registro de especialidad: ${newData.name}`);
        await addDoc(collection(db, "specialties"), newData);
        console.log("[API] Especialidad almacenada en Firestore");
      } catch (error) {
        console.error("[ERROR] No se pudo crear la especialidad:", error);
        throw error;
      }
    },
    onSuccess: () => queryClient.invalidateQueries(["specialties"]),
  });

  const updateSpecialty = useMutation({
    mutationFn: async ({id, ...data}) => {
      try {
        console.log(`[ACCION] Actualizando especialidad ${id}`);
        await updateDoc(doc(db, "specialties", id), data);
        console.log("[API] Especialidad actualizada en Firestore");
      } catch (error) {
        console.error("[ERROR] No se pudo actualizar la especialidad:", error);
        throw error;
      }
    },
    onSuccess: () => queryClient.invalidateQueries(["specialties"]),
  });

  const deleteSpecialty = useMutation({
    mutationFn: async (id) => {
      try {
        console.log(`[ACCION] Eliminación solicitada para especialidad ${id}`);
        await deleteDoc(doc(db, "specialties", id));
        console.log("[API] Especialidad eliminada en Firestore");
      } catch (error) {
        console.error("[ERROR] No se pudo eliminar la especialidad:", error);
        throw error;
      }
    },
    onSuccess: () => queryClient.invalidateQueries(["specialties"]),
  });

  return {
    ...specialtiesQuery,
    addSpecialty: addSpecialty.mutate,
    updateSpecialty: updateSpecialty.mutate,
    deleteSpecialty: deleteSpecialty.mutate,
  };
};
