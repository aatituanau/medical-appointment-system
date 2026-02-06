import React from "react";

const DoctorsSidebarList = ({doctors, selectedDoc, onSelectDoc}) => {
  return (
    <div className="lg:col-span-1 bg-white rounded-[2rem] border border-slate-100 p-4 lg:p-6 shadow-sm flex flex-col h-auto lg:h-[700px] transition-all">
      <h3 className="text-[10px] font-black text-slate-400 uppercase mb-3 lg:mb-4 tracking-widest flex-shrink-0">
        Personal Médico
      </h3>
      <div className="flex flex-row lg:flex-col gap-3 lg:gap-2 overflow-x-auto lg:overflow-x-hidden lg:overflow-y-auto custom-scrollbar pb-2 lg:pb-0">
        {doctors?.map((doc) => (
          <button
            key={doc.id}
            onClick={() => onSelectDoc(doc)}
            className={`
              relative text-left p-4 rounded-2xl transition-all flex-shrink-0 
              min-w-[160px] lg:min-w-0 w-auto lg:w-full
              ${
                selectedDoc?.id === doc.id
                  ? "bg-[#137fec] text-white shadow-lg lg:translate-x-1 scale-105 lg:scale-100"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-600"
              }
            `}
          >
            <p className="text-xs font-black uppercase truncate">{doc.name}</p>
            <p className="text-[9px] opacity-70 font-bold italic truncate">
              {doc.specialty}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DoctorsSidebarList;
