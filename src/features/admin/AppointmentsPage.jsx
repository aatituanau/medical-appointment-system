import React, {useState} from "react";
import {useDoctors} from "../../hooks/useMedicalData";
import AdminSearchHeader from "../../components/ui-admin/AdminSearchHeader";

const AppointmentsPage = () => {
  const {data: doctors, isLoading} = useDoctors();
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // Horas sugeridas para el Hospital del Día
  const slots = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
  ];

  if (isLoading) {
    return (
      <div className="p-20 text-center flex flex-col items-center justify-center gap-4">
        <div className="animate-spin size-10 border-4 border-[#137fec] border-t-transparent rounded-full"></div>
        <p className="font-black text-slate-400 uppercase tracking-widest text-[10px]">
          Cargando Agenda Central...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AdminSearchHeader
        title="Gestión de Citas y Horarios"
        btnText="Cargar Plantilla"
        placeholder="Buscar doctor..."
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* LISTA DE DOCTORES (Izquierda) */}
        <div className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm h-fit">
          <h3 className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest">
            Doctores Disponibles
          </h3>
          <div className="space-y-2">
            {doctors?.map((doc) => (
              <button
                key={doc.id}
                onClick={() => setSelectedDoc(doc)}
                className={`w-full text-left p-4 rounded-2xl transition-all ${
                  selectedDoc?.id === doc.id
                    ? "bg-[#137fec] text-white shadow-lg shadow-blue-200"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <p className="text-xs font-black uppercase leading-tight">
                  {doc.name}
                </p>
                <p
                  className={`text-[9px] font-bold ${
                    selectedDoc?.id === doc.id
                      ? "text-blue-100"
                      : "text-slate-400"
                  }`}
                >
                  {doc.specialty}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* PANEL DE HORARIOS (Derecha) */}
        <div className="md:col-span-3 bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
          {selectedDoc ? (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-50 pb-6">
                <div>
                  <h2 className="text-xl font-black text-slate-800 uppercase tracking-tighter">
                    Panel de Disponibilidad
                  </h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">
                    Doctor: {selectedDoc.name}
                  </p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <span className="text-[10px] font-black text-slate-400 uppercase">
                    Fecha:
                  </span>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="px-4 py-2 bg-slate-50 border-none rounded-xl text-xs font-black text-slate-600 outline-none ring-1 ring-slate-100 focus:ring-[#137fec]"
                  />
                </div>
              </div>

              {/* GRID DE SLOTS */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {slots.map((time) => (
                  <button
                    key={time}
                    className="p-6 rounded-[2rem] border border-slate-100 bg-slate-50 hover:border-[#137fec] transition-all text-center group relative overflow-hidden"
                  >
                    <span className="text-lg font-black text-slate-700 group-hover:text-[#137fec] transition-colors">
                      {time}
                    </span>
                    <div className="flex items-center justify-center gap-1.5 mt-2">
                      <div className="size-1.5 rounded-full bg-green-500"></div>
                      <span className="text-[9px] font-black text-slate-400 uppercase">
                        Disponible
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* LEYENDA */}
              <div className="flex gap-4 pt-4 border-t border-slate-50">
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-green-500"></div>
                  <span className="text-[9px] font-black text-slate-400 uppercase">
                    Disponible
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-red-500"></div>
                  <span className="text-[9px] font-black text-slate-400 uppercase">
                    Ocupado
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-slate-300"></div>
                  <span className="text-[9px] font-black text-slate-400 uppercase">
                    Bloqueado
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-300 py-20 animate-pulse">
              <span className="material-icons-outlined text-7xl mb-4 text-slate-100">
                calendar_month
              </span>
              <p className="text-xs font-black uppercase tracking-widest">
                Selecciona un médico para gestionar su agenda
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPage;
