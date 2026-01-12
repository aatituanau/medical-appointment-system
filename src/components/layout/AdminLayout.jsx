import React from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {signOut} from "firebase/auth";
import {auth} from "../../firebase/config";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50">
      <AdminSidebar />

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="flex items-center justify-between bg-white border-b border-slate-100 px-8 py-4 shadow-sm">
          <div>
            <h2 className="text-slate-900 text-lg font-black tracking-tight">
              Portal Administrativo
            </h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              Hospital del Día
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button className="size-10 flex items-center justify-center rounded-xl text-slate-400 hover:bg-slate-50 hover:text-[#137fec] transition-all">
              <span className="material-symbols-outlined">notifications</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-black text-white bg-red-500 rounded-xl hover:bg-red-600 shadow-lg shadow-red-200 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-sm">logout</span>
              Cerrar Sesión
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
