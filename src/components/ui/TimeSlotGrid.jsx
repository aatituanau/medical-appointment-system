const TimeSlotGrid = ({slots, selectedSlot, onSelect, label}) => (
  <div className="space-y-3">
    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
      {label}
    </p>
    <div className="grid grid-cols-4 gap-2">
      {slots.map((time) => (
        <button
          key={time}
          onClick={() => onSelect(time)}
          className={`py-2.5 rounded-xl text-[10px] font-black border transition-all ${
            selectedSlot === time
              ? "bg-[#137fec] border-[#137fec] text-white shadow-lg shadow-blue-200"
              : "bg-slate-50 border-slate-100 text-slate-500 hover:bg-blue-50 hover:text-[#137fec]"
          }`}
        >
          {time}
        </button>
      ))}
    </div>
  </div>
);
export default TimeSlotGrid;
