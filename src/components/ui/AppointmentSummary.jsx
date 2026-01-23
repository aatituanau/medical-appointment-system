import React from "react";

const AppointmentSummary = ({
  date,
  month,
  specialty,
  time,
  location,
  onConfirm,
  doctor,
  isLoading,
  errorMsg,
}) => {
  const dayNumber = typeof date === "string" ? date.split("-").pop() : date;

  const displayMonth =
    month ||
    (date
      ? new Date(date + "T00:00:00").toLocaleString("es-ES", {month: "short"})
      : "---");

  return (
    <div className="space-y-4 w-full px-2 md:px-0">
      {errorMsg && (
        <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl flex items-center gap-3 animate-pulse">
          <span className="material-symbols-outlined text-lg">warning</span>
          <p className="text-[10px] font-black uppercase tracking-widest">
            {errorMsg}
          </p>
        </div>
      )}
      {/* MAIN CARD */}
      <div className="flex flex-col md:flex-row items-center gap-6 p-6 md:p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm transition-all hover:shadow-md group w-full overflow-hidden">
        {/* DATE */}
        <div className="flex-shrink-0 flex flex-col items-center justify-center bg-[#137fec] text-white w-20 h-20 rounded-[1.8rem] shadow-lg shadow-blue-500/20">
          <span className="text-[10px] font-black uppercase tracking-[0.15em] opacity-80">
            {displayMonth.replace(".", "")}
          </span>
          <span className="text-3xl font-black leading-none mt-1">
            {dayNumber || "--"}
          </span>
        </div>

        {/* CENTER INFO */}
        <div className="flex-grow text-center md:text-left min-w-0">
          <h4 className="text-xl font-black text-slate-800 uppercase italic leading-none truncate">
            {specialty || "Seleccione Especialidad"}
          </h4>
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-5 gap-y-3 mt-4">
            <div className="flex items-center gap-2 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-base text-[#137fec]">
                schedule
              </span>
              <span>{time || "--:--"}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-base text-[#137fec]">
                person
              </span>
              <span className="truncate max-w-[120px] md:max-w-none">
                {doctor || "Sin asignar"}
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-base text-[#137fec]">
                location_on
              </span>
              <span>{location}</span>
            </div>
          </div>
        </div>

        {/* BUTTON CONTAINER  */}
        <div className="lg:col-span-3 flex justify-center lg:justify-end border-t lg:border-t-0 border-slate-50 pt-6 lg:pt-0">
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`w-full lg:w-full max-w-[220px] bg-[#137fec] hover:bg-slate-800 text-white py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl shadow-blue-500/10 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Procesando</span>
              </div>
            ) : (
              <span>Confirmar Cita</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSummary;
