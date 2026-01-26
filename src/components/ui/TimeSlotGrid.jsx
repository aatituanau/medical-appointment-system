import React from "react";

const TimeSlotGrid = ({slots, selectedSlot, onSelect}) => {
  // 1. FIRST: Sort all slots chronologically
  const sortedSlots = [...slots].sort((a, b) => {
    // Convert "HH:mm" to a number for comparison (e.g., "08:30" becomes 830)
    const timeA = parseInt(a.time.replace(":", ""));
    const timeB = parseInt(b.time.replace(":", ""));
    return timeA - timeB;
  });

  // 2. SECOND: Separate the already sorted slots
  const morningSlots = sortedSlots.filter((slot) => {
    const hour = parseInt(slot.time.split(":")[0]);
    return hour < 12;
  });

  const afternoonSlots = sortedSlots.filter((slot) => {
    const hour = parseInt(slot.time.split(":")[0]);
    return hour >= 12;
  });

  const SlotButton = ({slot}) => {
    const time = slot.time;
    const isTaken = slot.status === "taken";
    const isSelected = selectedSlot === time;

    return (
      <button
        type="button"
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
        <span className={isTaken ? "line-through opacity-40" : ""}>{time}</span>
        {isTaken && (
          <span className="text-[7px] font-black uppercase tracking-tighter">
            Ocupado
          </span>
        )}
      </button>
    );
  };

  return (
    <div className="space-y-6">
      {/* MORNING SECTION */}
      {morningSlots.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm text-amber-400">
              light_mode
            </span>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">
              Morning Sessions
            </p>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {morningSlots.map((slot) => (
              <SlotButton key={slot.time} slot={slot} />
            ))}
          </div>
        </div>
      )}

      {/* AFTERNOON SECTION */}
      {afternoonSlots.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm text-blue-400">
              wb_twilight
            </span>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">
              Afternoon Sessions
            </p>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {afternoonSlots.map((slot) => (
              <SlotButton key={slot.time} slot={slot} />
            ))}
          </div>
        </div>
      )}

      {slots.length === 0 && (
        <p className="text-center py-4 text-[10px] font-black text-slate-300 uppercase italic">
          No available shifts
        </p>
      )}
    </div>
  );
};

export default TimeSlotGrid;
