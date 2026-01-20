const AppointmentCard = ({date, month, type, doctor, location, status}) => {
  return (
    <div className="flex items-center gap-6 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-md group">
      <div className="flex-shrink-0 flex flex-col items-center justify-center bg-[#137fec] text-white w-16 h-16 rounded-2xl shadow-lg shadow-blue-200">
        <span className="text-[11px] font-bold uppercase tracking-wider">
          {month}
        </span>
        <span className="text-xl font-black">{date}</span>
      </div>

      <div className="flex-grow">
        <h4 className="text-lg font-black text-[#1e293b]">{type}</h4>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2">
          <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
            <span className="material-symbols-outlined text-lg">schedule</span>
            <span>09:30 AM</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
            <span className="material-symbols-outlined text-lg">person</span>
            <span>{doctor}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
            <span className="material-symbols-outlined text-lg">
              location_on
            </span>
            <span>{location}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <span className="px-4 py-1.5 bg-green-50 text-green-600 text-[11px] font-bold rounded-full border border-green-100 flex items-center gap-1">
          <span className="size-1.5 bg-green-500 rounded-full animate-pulse"></span>
          {status}
        </span>
      </div>
    </div>
  );
};

export default AppointmentCard;
