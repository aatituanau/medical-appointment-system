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
        {
          path: "/admin/appointments",
          icon: "event_available",
          label: "Citas Globales",
        },
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
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <aside className="w-72 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0 z-20 shrink-0">
      <div className="p-8 flex flex-col items-center border-b border-slate-50">
        <img src={logoH} alt="Logo UCE" className="h-12 w-auto mb-3" />
        <h2 className="text-slate-800 font-black text-sm tracking-tighter text-center leading-tight">
          HOSPITAL DEL DÍAa <br />
          <span className="text-red-600">UCE</span>
        </h2>
      </div>

      <div className="px-8 pt-6 pb-2">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
          {isAdminPath ? "Panel Administrativo" : "Portal de Usuario"}
        </p>
      </div>

      <nav className="flex-grow px-4 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({isActive}) =>
              `flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 font-bold text-sm ${
                isActive
                  ? "bg-slate-800 text-white shadow-lg scale-[1.02]"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`
            }
          >
            <span className="material-icons-outlined">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 bg-slate-50/50 border-t border-slate-100 mt-auto">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-4 px-4 py-4 text-red-600 hover:bg-red-50 rounded-xl transition-all font-black text-sm group"
        >
          <span className="material-icons-outlined group-hover:rotate-12 transition-transform">
            logout
          </span>
          CERRAR SESIÓN
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
