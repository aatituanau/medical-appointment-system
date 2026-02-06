import React from "react";
import {generateAppointmentPDF} from "../../../utils/pdfGenerator";

const AppointmentCard = ({
  cita,
  user,
  onCancel,
  canCancelFn,
  getMonthNameFn,
}) => {
  const isCancelled = cita.status === "CANCELADA";
  const isCancelable = canCancelFn(cita.date, cita.time) && !isCancelled;

  return (
    <div
      className={`bg-white p-5 sm:p-8 md:p-10 rounded-[2rem] sm:rounded-[3rem] md:rounded-[3.5rem] border-2 shadow-sm relative overflow-hidden transition-all duration-500 ${
        isCancelled
          ? "border-red-100 opacity-80"
          : "border-slate-50 group hover:shadow-2xl"
      }`}
    >
      {/* STATUS BADGE */}
      <div className="absolute top-3 right-3 sm:top-6 sm:right-6 md:top-10 md:right-10">
        <span
          className={`text-[8px] sm:text-[9px] font-black px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full uppercase border ${
            isCancelled
              ? "bg-red-50 text-red-600 border-red-100"
              : "bg-green-50 text-green-600 border-green-100"
          }`}
        >
          {cita.status || "CONFIRMADA"}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 md:gap-8">
        <div
          className={`size-16 sm:size-20 md:size-24 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] flex flex-col items-center justify-center text-white shadow-lg shrink-0 ${
            isCancelled
              ? "bg-slate-300 shadow-none"
              : "bg-[#137fec] shadow-blue-500/20"
          }`}
        >
          <span className="text-[9px] sm:text-[10px] font-black uppercase opacity-60">
            {getMonthNameFn(cita.date)}
          </span>
          <span className="text-xl sm:text-2xl md:text-3xl font-black italic leading-none">
            {cita.date.split("-")[2]}
          </span>
        </div>
        <div>
          <p
            className={`text-xl sm:text-2xl font-black uppercase italic leading-none ${
              isCancelled ? "text-slate-400 line-through" : "text-slate-800"
            }`}
          >
            {cita.time.padStart(4, "0").replace(/^(\d{2})(\d{2})$/, "$1:$2")}
          </p>
          <p
            className={`text-[10px] sm:text-[11px] font-black uppercase mt-2 sm:mt-3 tracking-widest ${
              isCancelled ? "text-slate-400" : "text-[#137fec]"
            }`}
          >
            {cita.specialty}
          </p>
        </div>
      </div>

      <div className="mt-6 sm:mt-8 md:mt-10 pt-6 sm:pt-8 md:pt-10 border-t border-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div className="min-w-0">
          <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest italic mb-2">
            Especialista
          </p>
          <p
            className={`text-xs sm:text-sm font-black uppercase italic leading-tight truncate ${
              isCancelled ? "text-slate-400" : "text-slate-700"
            }`}
          >
            {cita.doctorName}
          </p>
          <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase mt-1">
            Cons. {cita.office} — UCE
          </p>
        </div>

        <div className="flex gap-2 self-end sm:self-auto">
          <button
            onClick={() => generateAppointmentPDF(cita, user)}
            className="bg-blue-50 text-[#137fec] size-10 sm:size-11 md:size-12 rounded-xl sm:rounded-2xl hover:bg-[#137fec] hover:text-white transition-all flex items-center justify-center shadow-sm"
            title="Imprimir"
          >
            <span className="material-symbols-outlined text-lg sm:text-xl">
              print
            </span>
          </button>

          {!isCancelled && (
            <button
              onClick={() => onCancel(cita)}
              className={`size-10 sm:size-11 md:size-12 rounded-xl sm:rounded-2xl transition-all flex items-center justify-center shadow-sm ${
                isCancelable
                  ? "bg-red-50 text-red-600 hover:bg-red-600 hover:text-white"
                  : "bg-slate-100 text-slate-300 cursor-not-allowed"
              }`}
              title={isCancelable ? "Anular Cita" : "No disponible"}
            >
              <span className="material-symbols-outlined text-lg sm:text-xl">
                cancel
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
