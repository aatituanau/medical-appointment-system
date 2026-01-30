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

  // Fuction for verifying if a preset is active
  const isPresetActive = (days) => {
    const end = new Date().toISOString().split("T")[0];
    const start = new Date();
    start.setDate(start.getDate() - days);
    const startStr = start.toISOString().split("T")[0];

    return dateRange.start === startStr && dateRange.end === end;
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Período:
          </span>
          <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100 shadow-inner">
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
                  className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${
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

          <div className="h-4 w-px bg-slate-200 mx-1 hidden sm:block"></div>

          {/* Calendar */}
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100 shadow-inner">
            <input
              type="date"
              className="bg-transparent text-[10px] font-bold text-slate-600 outline-none cursor-pointer"
              value={dateRange.start}
              onChange={(e) => {
                setDateRange({...dateRange, start: e.target.value});
                setCurrentPage(1);
              }}
            />
            <span className="text-slate-300 font-bold">→</span>
            <input
              type="date"
              className="bg-transparent text-[10px] font-bold text-slate-600 outline-none cursor-pointer"
              value={dateRange.end}
              onChange={(e) => {
                setDateRange({...dateRange, end: e.target.value});
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Estado:
          </span>
          <div className="flex bg-slate-100 p-1 rounded-2xl shadow-inner border border-slate-200/50">
            {["todos", "confirmada", "cancelada"].map((s) => (
              <button
                key={s}
                onClick={() => {
                  setFilterStatus(s);
                  setCurrentPage(1);
                }}
                className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${
                  filterStatus === s
                    ? "bg-white text-slate-800 shadow-md scale-105"
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
