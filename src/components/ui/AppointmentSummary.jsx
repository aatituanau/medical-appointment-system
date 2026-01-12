import React from "react";

const AppointmentSummary = ({
  date,
  month,
  specialty,
  time,
  location,
  onConfirm,
  doctor,
}) => {
  return (
    <div className="flex items-center gap-6 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-md group">
      <div className="flex-shrink-0 flex flex-col items-center justify-center bg-[#137fec] text-white w-16 h-16 rounded-2xl shadow-lg shadow-blue-200">
        <span className="text-[11px] font-bold uppercase tracking-wider">
          {month}
        </span>
        <span className="text-xl font-black">{date}</span>
      </div>

      <div className="flex-grow">
        <h4 className="text-lg font-black text-[#1e293b]">{specialty}</h4>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2">
          <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
            <span className="material-symbols-outlined text-lg">schedule</span>
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
            <span className="material-symbols-outlined text-lg">person</span>
            <span>{doctor}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
            <span className="material-symbols-outlined text-lg">
              location_on
            </span>
            <span>{location}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <button
          onClick={onConfirm}
          className="group bg-[#137fec] hover:bg-[#0e69c5] text-white px-8 py-3.5 rounded-2xl text-xs font-black flex items-center gap-3 transition-all active:scale-95 shadow-lg shadow-blue-500/20"
        >
          <span>Confirmar Cita</span>
        </button>
      </div>
    </div>
  );
};

export default AppointmentSummary;
