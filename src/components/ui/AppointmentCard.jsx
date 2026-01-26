import React from "react";
import {generateAppointmentPDF} from "../../utils/pdfGenerator";

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
      className={`bg-white p-10 rounded-[3.5rem] border-2 shadow-sm relative overflow-hidden transition-all duration-500 ${
        isCancelled
          ? "border-red-100 opacity-80"
          : "border-slate-50 group hover:shadow-2xl"
      }`}
    >
      {/* STATUS BADGE */}
      <div className="absolute top-0 right-0 p-10">
        <span
          className={`text-[9px] font-black px-5 py-2 rounded-full uppercase border ${
            isCancelled
              ? "bg-red-50 text-red-600 border-red-100"
              : "bg-green-50 text-green-600 border-green-100"
          }`}
        >
          {cita.status || "CONFIRMADA"}
        </span>
      </div>

      <div className="flex items-center gap-8">
        <div
          className={`size-24 rounded-[2.5rem] flex flex-col items-center justify-center text-white shadow-lg ${
            isCancelled
              ? "bg-slate-300 shadow-none"
              : "bg-[#137fec] shadow-blue-500/20"
          }`}
        >
          <span className="text-[10px] font-black uppercase opacity-60">
            {getMonthNameFn(cita.date)}
          </span>
          <span className="text-3xl font-black italic leading-none">
            {cita.date.split("-")[2]}
          </span>
        </div>
        <div>
          <p
            className={`text-2xl font-black uppercase italic leading-none ${isCancelled ? "text-slate-400 line-through" : "text-slate-800"}`}
          >
            {cita.time.padStart(4, "0").replace(/^(\d{2})(\d{2})$/, "$1:$2")}
          </p>
          <p
            className={`text-[11px] font-black uppercase mt-3 tracking-widest ${isCancelled ? "text-slate-400" : "text-[#137fec]"}`}
          >
            {cita.specialty}
          </p>
        </div>
      </div>

      <div className="mt-10 pt-10 border-t border-slate-50 flex justify-between items-end">
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic mb-2">
            Especialista
          </p>
          <p
            className={`text-sm font-black uppercase italic leading-tight ${isCancelled ? "text-slate-400" : "text-slate-700"}`}
          >
            {cita.doctorName}
          </p>
          <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">
            Cons. {cita.office} — UCE
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => generateAppointmentPDF(cita, user)}
            className="bg-blue-50 text-[#137fec] size-12 rounded-2xl hover:bg-[#137fec] hover:text-white transition-all flex items-center justify-center shadow-sm"
            title="Imprimir"
          >
            <span className="material-symbols-outlined text-xl">print</span>
          </button>

          {!isCancelled && (
            <button
              onClick={() => onCancel(cita)}
              className={`size-12 rounded-2xl transition-all flex items-center justify-center shadow-sm ${
                isCancelable
                  ? "bg-red-50 text-red-600 hover:bg-red-600 hover:text-white"
                  : "bg-slate-100 text-slate-300 cursor-not-allowed"
              }`}
              title={isCancelable ? "Anular Cita" : "No disponible"}
            >
              <span className="material-symbols-outlined text-xl">cancel</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
