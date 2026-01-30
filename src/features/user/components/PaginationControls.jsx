import React from "react";

const PaginationControls = ({currentPage, totalPages, onPageChange}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-3 pt-8">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="p-3 rounded-2xl bg-white border border-slate-200 disabled:opacity-30 hover:bg-slate-50 transition-all text-slate-600"
      >
        Anterior
      </button>

      <div className="flex gap-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => onPageChange(i + 1)}
            className={`w-12 h-12 rounded-2xl text-xs font-black transition-all ${
              currentPage === i + 1
                ? "bg-slate-800 text-white shadow-lg scale-110"
                : "bg-white text-slate-400 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="p-3 rounded-2xl bg-white border border-slate-200 disabled:opacity-30 hover:bg-slate-50 transition-all text-slate-600"
      >
        Siguiente
      </button>
    </div>
  );
};

export default PaginationControls;
