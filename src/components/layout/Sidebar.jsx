import {NavLink} from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    {name: "Dashboard", icon: "dashboard", path: "/dashboard"},
    {name: "Agendar Cita", icon: "calendar_add_on", path: "/agendar"},
    {name: "Mis Citas", icon: "calendar_month", path: "/citas"},
    {name: "Perfil", icon: "person", path: "/perfil"},
    {name: "Ayuda", icon: "help", path: "/ayuda"},
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r border-slate-200 flex flex-col py-6">
      {/* Logo idéntico a la foto */}
      <div className="px-6 mb-10 flex items-center gap-3">
        <span className="material-symbols-outlined text-primary text-3xl">
          local_hospital
        </span>
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">
          Hospital del Día
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({isActive}) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                isActive
                  ? "bg-blue-50 text-primary"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`
            }
          >
            <span
              className={`material-symbols-outlined ${
                item.path === "/dashboard" ? "fill-1" : ""
              }`}
            >
              {item.icon}
            </span>
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Info de Usuario abajo (como en la foto) */}
      <div className="px-4 mt-auto">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-[10px] font-bold text-orange-600">
            EST
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-xs font-bold text-slate-700 truncate">
              Estudiante
            </span>
            <span className="text-[10px] text-slate-400">ver perfil</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
