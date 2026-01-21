const TimeSlotGrid = ({slots, selectedSlot, onSelect, label}) => (
  <div className="space-y-3">
    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">
      {label}
    </p>
    <div className="grid grid-cols-4 gap-2">
      {slots.map((slot) => {
        // 1. Extraemos la hora y el estado del objeto
        const time = slot.time;
        const isTaken = slot.status === "taken";
        const isSelected = selectedSlot === time;

        return (
          <button
            key={time}
            type="button"
            // 2. BLOQUEO FÍSICO: Si está ocupado, no se puede hacer clic
            disabled={isTaken}
            onClick={() => onSelect(time)}
            className={`py-2.5 rounded-xl text-[10px] font-black border transition-all flex flex-col items-center justify-center gap-0.5
              ${
                isTaken
                  ? "bg-slate-50 border-transparent text-slate-300 cursor-not-allowed opacity-60" // Estilo bloqueado
                  : isSelected
                    ? "bg-[#137fec] border-[#137fec] text-white shadow-lg shadow-blue-200 scale-105" // Estilo seleccionado
                    : "bg-white border-slate-100 text-slate-500 hover:bg-blue-50 hover:text-[#137fec]" // Estilo disponible
              }
            `}
          >
            {/* 3. EFECTO VISUAL: Tachamos la hora si ya está ocupada */}
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
