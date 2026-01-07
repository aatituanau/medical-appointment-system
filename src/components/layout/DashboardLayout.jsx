import {Outlet} from "react-router-dom";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50">
      <Sidebar />

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header superior fijo */}
        <header className="flex items-center justify-between bg-white border-b border-slate-200 px-8 py-4 shadow-sm">
          <h2 className="text-slate-900 text-xl font-bold">Panel de Usuario</h2>
          <div className="flex gap-2">
            <button className="p-2 rounded-full hover:bg-slate-100">
              <span className="material-symbols-outlined">notifications</span>
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
