import React from "react";

const SpecialtyCard = ({icon, name}) => (
  <div className="bg-white p-6 rounded-[2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col items-center gap-4 hover:border-[#137fec]/40 hover:shadow-md transition-all cursor-pointer group">
    <div className="w-14 h-14 rounded-2xl bg-blue-50/50 flex items-center justify-center text-[#137fec] group-hover:bg-[#137fec] group-hover:text-white transition-all duration-300">
      <span className="material-symbols-outlined text-2xl">{icon}</span>
    </div>

    <span className="text-[11px] font-black text-slate-700 uppercase tracking-tight group-hover:text-[#137fec] transition-colors">
      {name}
    </span>
  </div>
);

export default SpecialtyCard;
