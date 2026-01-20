const DoctorSelectionCard = ({name, specialty, image}) => (
  <div className="bg-white p-5 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-4 transition-all">
    <div className="relative">
      <img
        src={image}
        alt={name}
        className="size-14 rounded-2xl object-cover border-2 border-white shadow-sm"
      />
      <div className="absolute -bottom-1 -right-1 size-5 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
        <span className="material-symbols-outlined text-white text-[10px] font-bold">
          check
        </span>
      </div>
    </div>
    <div>
      <h4 className="text-sm font-black text-slate-800 tracking-tight">
        {name}
      </h4>
      <p className="text-[#137fec] text-[10px] font-bold uppercase tracking-wider">
        {specialty}
      </p>
    </div>
  </div>
);

export default DoctorSelectionCard;
