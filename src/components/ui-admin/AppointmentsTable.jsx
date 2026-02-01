import React from "react";
import ReportFilters from "./ReportFilters";

const AppointmentsTable = ({
  items,
  filterStatus,
  setFilterStatus,
  dateRange,
  setDateRange,
  currentPage,
  setCurrentPage,
  totalPages,
  onExport,
}) => {
  const clearFilters = () => {
    setDateRange({start: "", end: ""});
    setFilterStatus("todos");
    setCurrentPage(1);
  };

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden animate-slide-up">
      <div className="p-6 border-b border-slate-50 space-y-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <h3 className="font-black text-slate-800 text-xl tracking-tight">
            Historial de Consultas
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={onExport}
              className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-5 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-100 transition-all border border-emerald-100 active:scale-95"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Exportar Excel
            </button>
            <button
              onClick={clearFilters}
              className="text-[10px] font-black text-blue-600 bg-blue-50 px-4 py-2.5 h-[42px] rounded-xl border border-blue-100 hover:bg-blue-100 transition-colors uppercase tracking-widest active:scale-95"
            >
              Resetear Filtros
            </button>
          </div>
        </div>
        <ReportFilters
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          dateRange={dateRange}
          setDateRange={setDateRange}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[900px]">
          <thead className="bg-slate-50/50">
            <tr>
              <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Creada el
              </th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Cita
              </th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Paciente
              </th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Médico
              </th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
                Estado
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {items.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <td className="px-8 py-5 text-xs text-slate-400">
                  {item.createdAt?.seconds
                    ? new Date(
                        item.createdAt.seconds * 1000,
                      ).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="px-6 py-5">
                  <p className="font-black text-slate-700 text-sm">
                    {item.date}
                  </p>
                  <p className="text-[10px] text-blue-500 font-bold">
                    {item.time}
                  </p>
                </td>
                <td className="px-6 py-5">
                  <p className="font-bold text-slate-800 text-sm">
                    {item.studentName}
                  </p>
                  <p className="text-[10px] text-slate-400 uppercase font-black">
                    ID: {item.studentId}
                  </p>
                </td>
                <td className="px-6 py-5">
                  <p className="text-xs font-bold text-slate-700">
                    {item.doctorName}
                  </p>
                  <p className="text-[10px] text-slate-400 font-black uppercase">
                    {item.specialty}
                  </p>
                </td>
                <td className="px-6 py-5 text-center">
                  <span
                    className={`px-4 py-1.5 rounded-full text-[10px] font-black border-2 ${item.status?.toLowerCase() === "confirmada" ? "text-green-600 bg-green-50/50 border-green-100" : "text-red-600 bg-red-50/50 border-red-100"}`}
                  >
                    {item.status?.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="p-6 bg-slate-50/30 border-t border-slate-100 flex justify-center items-center gap-3">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="p-2 rounded-xl border border-slate-200 disabled:opacity-30 hover:bg-white transition-all"
          >
            Atrás
          </button>
          <div className="flex gap-1">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-xl text-xs font-black transition-all ${
                  currentPage === i + 1
                    ? "bg-slate-800 text-white shadow-xl scale-110"
                    : "bg-white text-slate-400 hover:bg-slate-50"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="p-2 rounded-xl border border-slate-200 disabled:opacity-30 hover:bg-white transition-all"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default AppointmentsTable;
