const StatusAlert = ({type, message, onClose}) => {
  if (!message) return null;
  const isError = type === "error";

  return (
    <div className="fixed top-6 right-6 z-[100] animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-50 p-5 flex items-start gap-4 min-w-[340px]">
        <div
          className={`p-2 rounded-xl ${
            isError
              ? "bg-orange-50 text-orange-500"
              : "bg-green-50 text-green-500"
          }`}
        >
          <span className="material-symbols-outlined font-bold">
            {isError ? "warning" : "check_circle"}
          </span>
        </div>
        <div className="flex-1">
          <h5 className="text-sm font-black text-slate-800">
            {isError ? "Atención" : "Operación Exitosa"}
          </h5>
          <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
            {message}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-slate-300 hover:text-slate-500"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
      </div>
    </div>
  );
};
export default StatusAlert;
