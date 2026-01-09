import {Outlet, useNavigate} from "react-router-dom";
import {signOut} from "firebase/auth";
import {auth} from "../../firebase/config";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
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
      <Sidebar />

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="flex items-center justify-between bg-white border-b border-slate-200 px-8 py-4 shadow-sm">
          <h2 className="text-slate-900 text-xl font-bold">Panel de Usuario</h2>
          <div className="flex gap-2">
            <button className="p-2 rounded-full hover:bg-slate-100">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              title="Cerrar sesión"
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

export default DashboardLayout;
