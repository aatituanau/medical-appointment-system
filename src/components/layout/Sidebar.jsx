import React, {useState} from "react";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {auth} from "../../firebase/config";
import {signOut} from "firebase/auth";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {pathname} = useLocation();
  const navigate = useNavigate();
  const isAdminPath = pathname.startsWith("/admin");

  const menuItems = isAdminPath
    ? [
        {
          path: "/admin/specialties",
          icon: "grid_view",
          label: "Especialidades",
        },
        {path: "/admin/doctors", icon: "medication", label: "Cuerpo Médico"},
        {path: "/admin/appointments", icon: "event_available", label: "Citas"},
        {path: "/admin/reports", icon: "insights", label: "Reportes"},
      ]
    : [
        {path: "/dashboard", icon: "home", label: "Inicio"},
        {path: "/agendar", icon: "add_circle_outline", label: "Agendar Cita"},
        {path: "/citas", icon: "calendar_month", label: "Mis Citas"},
      ];

  const handleLogout = async () => {
    try {
      console.log("[AUTH] Cerrando sesión del usuario actual");
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("[ERROR] Fallo al cerrar sesión:", error);
    }
  };

  return (
    <aside
      className={`${isOpen ? "w-72" : "w-20"} bg-white border-r border-slate-200 flex flex-col h-full sticky top-0 z-20 shrink-0 overflow-hidden transition-all duration-300 ease-in-out`}
    >
      {/* Header: label and toggle stay aligned */}
      <div
        className={`p-6 flex items-center transition-all ${isOpen ? "justify-between" : "justify-center"}`}
      >
        {isOpen && (
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] truncate">
            {isAdminPath ? "Administración" : "Portal Usuario"}
          </p>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`size-9 flex items-center justify-center rounded-xl transition-all ${
            isOpen
              ? "bg-slate-50 text-slate-400 hover:text-[#137fec] hover:bg-blue-50"
              : "bg-[#137fec] text-white shadow-lg shadow-blue-200"
          }`}
          title={isOpen ? "Colapsar" : "Expandir"}
        >
          <span className="material-icons-outlined text-xl">
            {isOpen ? "menu_open" : "menu"}
          </span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 custom-scrollbar">
        <nav className="space-y-1.5">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              title={!isOpen ? item.label : ""}
              className={({isActive}) =>
                `flex items-center ${isOpen ? "gap-4 px-4" : "justify-center px-0"} py-3.5 rounded-2xl font-bold text-sm transition-all ${
                  isActive
                    ? "bg-slate-800 text-white shadow-lg"
                    : "text-slate-500 hover:bg-slate-50"
                }`
              }
            >
              <span className="material-icons-outlined shrink-0 text-xl">
                {item.icon}
              </span>
              {isOpen && (
                <span className="whitespace-nowrap uppercase tracking-tight text-xs font-black">
                  {item.label}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Logout Footer */}
      <div className="p-4 bg-slate-50/50 border-t border-slate-100 shrink-0">
        <button
          onClick={handleLogout}
          className={`flex items-center ${isOpen ? "gap-4 px-4" : "justify-center px-0"} py-4 w-full text-red-600 hover:bg-red-50 rounded-2xl transition-all font-black text-xs group`}
        >
          <span className="material-icons-outlined group-hover:rotate-12 transition-transform text-xl shrink-0">
            logout
          </span>
          {isOpen && (
            <span className="whitespace-nowrap uppercase tracking-widest">
              Cerrar Sesión
            </span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
