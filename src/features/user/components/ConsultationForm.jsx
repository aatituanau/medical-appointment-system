import React from "react";

const ConsultationForm = ({
  specialty,
  setSpecialty,
  selectedDocObj,
  setSelectedDocObj,
  setSelectedTime,
  specialties,
  filteredDoctors,
}) => {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
      <h3 className="font-bold text-slate-800 text-sm flex items-center gap-3">
        <span className="size-7 bg-blue-50 text-[#137fec] rounded-xl flex items-center justify-center text-xs font-black">
          1
        </span>
        Datos de la consulta
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase ml-1">
            Especialidad
          </label>
          <select
            value={specialty}
            onChange={(e) => {
              setSpecialty(e.target.value);
              setSelectedDocObj(null);
              setSelectedTime("");
            }}
            className="w-full h-12 bg-slate-50 border border-slate-100 rounded-2xl px-4 text-sm outline-none focus:ring-2 focus:ring-[#137fec]/20"
          >
            <option value="">Seleccione especialidad</option>
            {specialties
              ?.filter((s) => s.active)
              .map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase ml-1">
            Médico
          </label>
          <select
            value={selectedDocObj?.name || ""}
            onChange={(e) => {
              const doc = filteredDoctors.find(
                (d) => d.name === e.target.value,
              );
              setSelectedDocObj(doc);
              setSelectedTime("");
            }}
            className="w-full h-12 bg-slate-50 border border-slate-100 rounded-2xl px-4 text-sm outline-none focus:ring-2 focus:ring-[#137fec]/20"
          >
            <option value="">Seleccione un médico</option>
            {filteredDoctors?.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ConsultationForm;
