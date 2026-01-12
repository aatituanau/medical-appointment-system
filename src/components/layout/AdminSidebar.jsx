import {NavLink} from "react-router-dom";

const AdminSidebar = () => {
  const adminMenu = [
    {name: "Specialties", icon: "add_box", path: "/admin/specialties"},
    {name: "Doctors", icon: "group", path: "/admin/doctors"},
    {name: "Appointments", icon: "calendar_today", path: "/admin/appointments"},
    {name: "Report", icon: "description", path: "/admin/reports"},
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r border-slate-100 flex flex-col py-6 flex-shrink-0">
      <div className="px-6 mb-10">
        <h1 className="text-xl font-black text-slate-800 tracking-tight">
          Hospital del Día
        </h1>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
          Admin Panel
        </p>
      </div>
      <nav className="flex-1 px-4 space-y-1">
        {adminMenu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({isActive}) =>
              `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-bold text-sm ${
                isActive
                  ? "bg-blue-50 text-[#137fec]"
                  : "text-slate-400 hover:bg-slate-50 hover:text-slate-700"
              }`
            }
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </nav>
      <div className="px-4 mt-auto">
        <button className="flex items-center gap-3 px-4 py-3 text-slate-400 font-bold text-sm w-full hover:text-red-500 transition-colors">
          <span className="material-symbols-outlined">logout</span>
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
