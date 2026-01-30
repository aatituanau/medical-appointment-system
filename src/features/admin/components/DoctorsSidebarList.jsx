import React from "react";

const DoctorsSidebarList = ({doctors, selectedDoc, onSelectDoc}) => {
  return (
    <div className="lg:col-span-1 bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm h-[700px] flex flex-col overflow-hidden">
      <h3 className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest">
        Personal Médico
      </h3>
      <div className="flex flex-col gap-2 overflow-y-auto custom-scrollbar pr-2">
        {doctors?.map((doc) => (
          <button
            key={doc.id}
            onClick={() => onSelectDoc(doc)}
            className={`text-left p-4 rounded-2xl transition-all ${
              selectedDoc?.id === doc.id
                ? "bg-[#137fec] text-white shadow-lg translate-x-1"
                : "bg-slate-50 hover:bg-slate-100 text-slate-600"
            }`}
          >
            <p className="text-xs font-black uppercase truncate">{doc.name}</p>
            <p className="text-[9px] opacity-70 font-bold italic">
              {doc.specialty}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DoctorsSidebarList;
