const TimeSlotGrid = ({slots, selectedSlot, onSelect, label}) => (
  <div className="space-y-3">
    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">
      {label}
    </p>
    <div className="grid grid-cols-4 gap-2">
      {slots.map((slot) => {
        // 1. Extract the time and status from the object
        const time = slot.time;
        const isTaken = slot.status === "taken";
        const isSelected = selectedSlot === time;

        return (
          <button
            key={time}
            type="button"
            // 2. PHYSICAL BLOCK: If it is taken, it cannot be clicked
            disabled={isTaken}
            onClick={() => onSelect(time)}
            className={`py-2.5 rounded-xl text-[10px] font-black border transition-all flex flex-col items-center justify-center gap-0.5
              ${
                isTaken
                  ? "bg-slate-50 border-transparent text-slate-300 cursor-not-allowed opacity-60"
                  : isSelected
                    ? "bg-[#137fec] border-[#137fec] text-white shadow-lg shadow-blue-200 scale-105"
                    : "bg-white border-slate-100 text-slate-500 hover:bg-blue-50 hover:text-[#137fec]"
              }
            `}
          >
            {/* 3. VISUAL EFFECT: Strike through the time if it is already taken */}
            <span className={isTaken ? "line-through opacity-40" : ""}>
              {time}
            </span>

            {isTaken && (
              <span className="text-[7px] font-black uppercase tracking-tighter">
                Ocupado
              </span>
            )}
          </button>
        );
      })}
    </div>
  </div>
);

export default TimeSlotGrid;
