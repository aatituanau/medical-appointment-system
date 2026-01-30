import React from "react";
import TimeSlotGrid from "../../../components/ui/TimeSlotGrid";

const AvailableSlots = ({realtimeSlots, selectedTime, setSelectedTime}) => {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
      <h3 className="font-bold text-slate-800 text-sm flex items-center justify-between">
        <span className="flex items-center gap-3">
          <span className="size-7 bg-blue-50 text-[#137fec] rounded-xl flex items-center justify-center text-xs font-black">
            3
          </span>
          Horarios Disponibles
        </span>
      </h3>

      {realtimeSlots ? (
        <TimeSlotGrid
          slots={Object.values(realtimeSlots)}
          selectedSlot={selectedTime}
          onSelect={setSelectedTime}
        />
      ) : (
        <p className="text-center text-[10px] font-black text-slate-300 uppercase py-10 tracking-widest italic">
          No hay turnos habilitados por el administrador
        </p>
      )}
    </div>
  );
};

export default AvailableSlots;
