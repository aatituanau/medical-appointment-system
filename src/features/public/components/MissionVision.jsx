import React from "react";

const MissionVision = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Mision */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4 mb-6">
          <div className="size-12 bg-blue-50 rounded-2xl flex items-center justify-center text-[#137fec]">
            <span className="material-symbols-outlined text-3xl">flag</span>
          </div>
          <h2 className="text-2xl font-black text-slate-800 uppercase italic">
            Misión
          </h2>
        </div>
        <p className="text-slate-500 text-sm leading-relaxed font-medium text-justify">
          Brindar atención especializada, con calidad, eficacia, eficiencia y
          calidez satisfaciendo las necesidades de salud integral, física,
          emocional y social de la población universitaria.
        </p>
      </div>

      {/* Vision */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4 mb-6">
          <div className="size-12 bg-blue-50 rounded-2xl flex items-center justify-center text-[#137fec]">
            <span className="material-symbols-outlined text-3xl">
              visibility
            </span>
          </div>
          <h2 className="text-2xl font-black text-slate-800 uppercase italic">
            Visiòn
          </h2>
        </div>
        <p className="text-slate-500 text-sm leading-relaxed font-medium text-justify">
          Mantenerse como el mejor Hospital del Día Universitario a nivel
          nacional, contando con tecnología de punta y personal altamente
          calificado, manteniendo los principios de calidad y equidad.
        </p>
      </div>
    </div>
  );
};

export default MissionVision;
