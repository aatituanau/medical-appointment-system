import React from "react";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import logoH from "../../assets/logoH.png";
import {auth} from "../../firebase/config";
import {signOut} from "firebase/auth";

const Sidebar = () => {
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
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error logout:", error);
    }
  };

  return (
    <aside className="w-72 bg-white border-r border-slate-200 flex flex-col h-full sticky top-0 z-20 shrink-0 overflow-hidden">
      <div className="p-8 flex flex-col items-center border-b border-slate-50 shrink-0">
        <img src={logoH} alt="Logo UCE" className="h-12 w-auto mb-3" />
        <h2 className="text-slate-800 font-black text-sm tracking-tighter text-center leading-tight">
          HOSPITAL DEL DÍA <br />
          <span className="text-primary font-bold">UCE</span>
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 custom-scrollbar">
        <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
          {isAdminPath ? "Administración" : "Portal Usuario"}
        </p>
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({isActive}) =>
                `flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-sm transition-all ${
                  isActive
                    ? "bg-slate-800 text-white shadow-lg"
                    : "text-slate-500 hover:bg-slate-50"
                }`
              }
            >
              <span className="material-icons-outlined">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* 3. SECCIÓN INFERIOR (Fija en la base) */}
      <div className="p-4 bg-slate-50/50 border-t border-slate-100 shrink-0">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-4 px-4 py-4 text-red-600 hover:bg-red-50 rounded-xl transition-all font-black text-sm group"
        >
          <span className="material-icons-outlined group-hover:rotate-12 transition-transform text-xl">
            logout
          </span>
          CERRAR SESIÓN
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
