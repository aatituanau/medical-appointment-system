import React from "react";

const AdminSearchHeader = ({
  placeholder,
  onAddClick,
  btnText,
  searchTerm,
  setSearchTerm,
}) => (
  <div className="bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div className="relative w-full md:flex-1 md:max-w-md">
      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 select-none">
        search
      </span>
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-base md:text-sm outline-none focus:ring-2 focus:ring-[#137fec]/10 transition-all placeholder:text-slate-400"
      />
    </div>

    <div className="w-full md:w-auto">
      <button
        onClick={onAddClick}
        className="bg-[#137fec] text-white px-6 py-3 rounded-2xl font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 active:scale-95 transition-all uppercase w-full md:w-auto touch-manipulation"
      >
        <span className="material-symbols-outlined text-sm">add_circle</span>
        {btnText}
      </button>
    </div>
  </div>
);

export default AdminSearchHeader;
