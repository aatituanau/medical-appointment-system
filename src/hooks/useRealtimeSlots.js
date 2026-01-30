import {useState, useEffect} from "react";
import {ref, onValue} from "firebase/database";
import {rtdb} from "../firebase/config";

export const useRealtimeSlots = (doctorId, date) => {
  const [slots, setSlots] = useState(null);

  useEffect(() => {
    if (!doctorId || !date) return;
    const slotsRef = ref(rtdb, `schedules/${doctorId}/${date}`);
    const unsubscribe = onValue(slotsRef, (snapshot) => {
      setSlots(snapshot.val());
    });
    return () => unsubscribe();
  }, [doctorId, date]);

  return slots;
};
