import React from "react";
import {useAuth} from "../../context/AuthContext";

const MyAppointments = () => {
  const {user} = useAuth();

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20 px-4">
      <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
        <h1 className="text-4xl font-black text-slate-800 uppercase italic leading-none">
          Mis Citas
        </h1>
        <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mt-3">
          Historial de agendamientos en el Hospital del Día
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* TARJETA DE CITA */}
        <div className="bg-white p-10 rounded-[3.5rem] border-2 border-slate-50 shadow-sm relative overflow-hidden group hover:shadow-2xl transition-all">
          <div className="absolute top-0 right-0 p-10">
            <span className="bg-green-50 text-green-600 text-[9px] font-black px-5 py-2 rounded-full uppercase border border-green-100">
              CONFIRMADA
            </span>
          </div>

          <div className="flex items-center gap-8">
            <div className="size-24 bg-[#137fec] rounded-[2.5rem] flex flex-col items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <span className="text-[11px] font-black uppercase opacity-60">
                enero
              </span>
              <span className="text-3xl font-black italic leading-none">
                20
              </span>
            </div>
            <div>
              <p className="text-2xl font-black text-slate-800 uppercase italic leading-none">
                09:30 AM
              </p>
              <p className="text-[11px] font-black text-[#137fec] uppercase tracking-[0.1em] mt-3 tracking-widest">
                Medicina Interna
              </p>
            </div>
          </div>

          <div className="mt-10 pt-10 border-t border-slate-50 flex justify-between items-end">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic mb-2">
                Especialista & Consultorio
              </p>
              <p className="text-sm font-black text-slate-700 uppercase italic tracking-tight">
                Dra. Mirtha Puchaicela
              </p>
              <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">
                Consultorio 15 — Planta Baja
              </p>
            </div>

            {/* CONTENEDOR DE BOTONES DE ACCIÓN */}
            <div className="flex gap-2">
              {/* BOTÓN IMPRIMIR PDF */}
              <button
                onClick={() => alert("Generando PDF...")}
                className="bg-blue-50 text-[#137fec] size-12 rounded-2xl hover:bg-[#137fec] hover:text-white transition-all flex items-center justify-center shadow-sm group/print"
                title="Imprimir Comprobante"
              >
                <span className="material-symbols-outlined text-xl">print</span>
              </button>
              {/* BOTÓN CANCELAR CITA */}
              <button
                onClick={() => alert("Cancelando cita...")}
                className="bg-red-50 text-red-600 size-12 rounded-2xl hover:bg-red-600 hover:text-white transition-all flex items-center justify-center shadow-sm group/cancel"
                title="Cancelar Cita"
              >
                <span className="material-symbols-outlined text-xl">
                  cancel
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;
