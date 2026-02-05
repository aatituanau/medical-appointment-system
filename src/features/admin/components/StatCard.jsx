import React from "react";

const StatCard = ({label, value, color}) => (
  <div className="w-full max-w-full bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden transition-transform hover:scale-[1.02]">
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
      {label}
    </p>
    <h2 className="text-4xl font-black text-slate-800 mt-2">{value}</h2>
    <div
      className={`absolute bottom-0 left-6 right-6 h-1.5 ${color} rounded-t-full`}
    ></div>
  </div>
);

export default StatCard;
