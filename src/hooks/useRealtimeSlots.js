import {useState, useEffect} from "react";
import {ref, onValue} from "firebase/database";
import {rtdb} from "../firebase/config";

// Subscribes to realtime slot changes for a doctor on a given date
export const useRealtimeSlots = (doctorId, date) => {
  const [slots, setSlots] = useState(null);

  useEffect(() => {
    if (!doctorId || !date) return;
    console.log(
      `[API] Suscripción RTDB para doctor ${doctorId} en la fecha ${date}`,
    );
    const slotsRef = ref(rtdb, `schedules/${doctorId}/${date}`);
    const unsubscribe = onValue(slotsRef, (snapshot) => {
      setSlots(snapshot.val());
    });
    return () => unsubscribe();
  }, [doctorId, date]);

  return slots;
};
