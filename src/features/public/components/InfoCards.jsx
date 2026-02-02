import React from "react";

const InfoCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white flex flex-col justify-between">
        <span className="material-symbols-outlined text-blue-400 text-4xl mb-4">
          groups
        </span>
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-widest text-blue-300 mb-2">
            Atención a:
          </h3>
          <p className="text-xs font-bold leading-relaxed opacity-90">
            Estudiantes, Docentes, Empleados y Trabajadores de la Universidad
            Central.
          </p>
        </div>
      </div>

      <div className="bg-[#137fec] p-8 rounded-[2.5rem] text-white flex flex-col justify-between shadow-lg shadow-blue-200">
        <span className="material-symbols-outlined text-blue-100 text-4xl mb-4">
          schedule
        </span>
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-widest text-blue-100 mb-2">
            Horarios de Atención
          </h3>
          <p className="text-3xl font-black italic">07:00 a 16:00</p>
          <p className="text-[9px] font-bold uppercase mt-1 opacity-70">
            Lunes a Viernes
          </p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 flex flex-col justify-between">
        <span className="material-symbols-outlined text-slate-400 text-4xl mb-4">
          account_balance
        </span>
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
            Autoridades
          </h3>
          <p className="text-sm font-black text-slate-800 uppercase italic">
            Dra. Lilian Rebeca Calderón, PhD.
          </p>
          <p className="text-[9px] font-bold text-[#137fec] uppercase tracking-wider mt-1">
            Directora Hospital del Día
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoCards;
