import React from "react";

const ReportFilters = ({
  filterStatus,
  setFilterStatus,
  dateRange,
  setDateRange,
  setCurrentPage,
}) => {
  const handlePreset = (days) => {
    const end = new Date().toISOString().split("T")[0];
    const start = new Date();
    start.setDate(start.getDate() - days);
    const startStr = start.toISOString().split("T")[0];

    setDateRange({start: startStr, end});
    setCurrentPage(1);
  };

  const isPresetActive = (days) => {
    const end = new Date().toISOString().split("T")[0];
    const start = new Date();
    start.setDate(start.getDate() - days);
    const startStr = start.toISOString().split("T")[0];
    return dateRange.start === startStr && dateRange.end === end;
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col xl:flex-row justify-between items-stretch xl:items-end gap-6">
        {/* Period and Calendar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-end gap-4 flex-1">
          {/* Presets */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              Período
            </span>
            <div className="flex bg-slate-100 p-1 rounded-2xl shadow-inner border border-slate-200/50 overflow-x-auto no-scrollbar">
              {[
                {l: "Hoy", d: 0},
                {l: "7d", d: 7},
                {l: "30d", d: 30},
              ].map((p) => {
                const active = isPresetActive(p.d);
                return (
                  <button
                    key={p.l}
                    onClick={() => handlePreset(p.d)}
                    className={`flex-1 md:flex-none px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${
                      active
                        ? "bg-white text-blue-600 shadow-sm scale-105"
                        : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    {p.l}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Date Range */}
          <div className="flex flex-col gap-2 flex-1 md:max-w-xs">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              Rango Personalizado
            </span>
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-100 shadow-inner">
              <input
                type="date"
                className="flex-1 bg-transparent text-[11px] font-bold text-slate-600 outline-none min-w-[110px]"
                value={dateRange.start}
                onChange={(e) => {
                  setDateRange({...dateRange, start: e.target.value});
                  setCurrentPage(1);
                }}
              />
              <span className="hidden sm:block text-slate-300 font-bold">
                →
              </span>
              <input
                type="date"
                className="flex-1 bg-transparent text-[11px] font-bold text-slate-600 outline-none min-w-[110px]"
                value={dateRange.end}
                onChange={(e) => {
                  setDateRange({...dateRange, end: e.target.value});
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
        </div>

        {/* Appointment States */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
            Estado de Cita
          </span>
          <div className="flex bg-slate-100 p-1 rounded-2xl shadow-inner border border-slate-200/50 overflow-x-auto no-scrollbar">
            {["todos", "confirmada", "cancelada"].map((s) => (
              <button
                key={s}
                onClick={() => {
                  setFilterStatus(s);
                  setCurrentPage(1);
                }}
                className={`flex-1 px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all whitespace-nowrap ${
                  filterStatus === s
                    ? "bg-white text-slate-800 shadow-md"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportFilters;
