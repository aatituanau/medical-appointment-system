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
    setDateRange({start: start.toISOString().split("T")[0], end});
    setCurrentPage(1);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 pt-2">
      {/* Date Shortcuts */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">
          Citas de:
        </span>
        {[
          {l: "Hoy", d: 0},
          {l: "7 Días", d: 7},
          {l: "Este Mes", d: 30},
        ].map((p) => (
          <button
            key={p.l}
            onClick={() => handlePreset(p.d)}
            className="px-3 py-1.5 rounded-lg bg-slate-50 text-[10px] font-bold text-slate-600 hover:bg-slate-200 transition-colors"
          >
            {p.l}
          </button>
        ))}

        <div className="h-4 w-px bg-slate-200 mx-2 hidden md:block"></div>

        {/* Calendar */}
        <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
          <input
            type="date"
            className="bg-transparent text-[10px] font-bold text-slate-600 outline-none cursor-pointer"
            value={dateRange.start}
            onChange={(e) =>
              setDateRange({...dateRange, start: e.target.value})
            }
          />
          <span className="text-slate-300">→</span>
          <input
            type="date"
            className="bg-transparent text-[10px] font-bold text-slate-600 outline-none cursor-pointer"
            value={dateRange.end}
            onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 lg:justify-end">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">
          Estado:
        </span>
        <div className="flex bg-slate-100 p-1 rounded-xl shadow-inner">
          {["todos", "confirmada", "cancelada"].map((s) => (
            <button
              key={s}
              onClick={() => {
                setFilterStatus(s);
                setCurrentPage(1);
              }}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${
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
  );
};

export default ReportFilters;
