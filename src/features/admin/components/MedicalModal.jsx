import React from "react";

const MedicalModal = ({isOpen, onClose, title, onSubmit, children}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <span className="material-icons-outlined">close</span>
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
            className="space-y-4"
          >
            {children}

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 rounded-2xl font-black text-xs uppercase text-slate-400 bg-slate-100 hover:bg-slate-200 transition-all"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 rounded-2xl font-black text-xs uppercase text-white bg-[#137fec] shadow-lg shadow-blue-500/30 hover:bg-blue-600 transition-all"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MedicalModal;
