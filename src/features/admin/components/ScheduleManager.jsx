import React from "react";

const ScheduleManager = ({
  selectedDoc,
  selectedDate,
  setSelectedDate,
  realtimeSlots,
  onToggleSlot,
}) => {
  // Statement to show when no doctor is selected
  if (!selectedDoc) {
    return (
      <div className="lg:col-span-3 bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
        <div className="py-40 text-center text-slate-300 uppercase font-black italic">
          <span className="material-symbols-outlined text-6xl opacity-20 block mb-4">
            person_search
          </span>
          Selecciona un médico para gestionar su agenda
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-3 bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
      <div className="space-y-8">
        <div className="flex justify-between items-center border-b border-slate-50 pb-6">
          <div>
            <h2 className="text-xl font-black text-slate-800 uppercase italic">
              {selectedDoc.name}
            </h2>
            <p className="text-[10px] font-black text-[#137fec] uppercase mt-1">
              Cons. {selectedDoc.office}
            </p>
          </div>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 bg-slate-50 rounded-xl text-xs font-black outline-none ring-1 ring-slate-100"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {selectedDoc.baseSlots?.map((time) => {
            const formattedTime = time.replace(":", "");
            const isTaken = realtimeSlots?.[formattedTime]?.status === "taken";
            const isActive =
              realtimeSlots?.[formattedTime]?.status === "available";

            return (
              <button
                key={time}
                onClick={() => onToggleSlot(time)}
                className={`p-6 rounded-[2rem] border-2 transition-all duration-300 relative ${
                  isTaken
                    ? "bg-red-500 border-red-600 text-white shadow-lg cursor-not-allowed"
                    : isActive
                      ? "bg-white border-[#137fec] text-[#137fec] shadow-md hover:scale-105"
                      : "bg-slate-50 border-transparent text-slate-300 opacity-40 hover:opacity-100"
                }`}
              >
                <span className="text-lg font-black">{time}</span>
                <div className="flex items-center justify-center gap-1.5 mt-2">
                  <div
                    className={`size-1.5 rounded-full ${
                      isTaken
                        ? "bg-white animate-pulse"
                        : isActive
                          ? "bg-green-500"
                          : "bg-slate-300"
                    }`}
                  ></div>
                  <span
                    className={`text-[9px] font-black uppercase ${
                      isTaken
                        ? "text-red-100"
                        : isActive
                          ? "text-slate-400"
                          : "text-slate-300"
                    }`}
                  >
                    {isTaken ? "Agendado" : isActive ? "Activo" : "Inactivo"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ScheduleManager;
