import React from "react";
import {useLocation} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
import logoH from "../../assets/logoH.png";

const Navbar = () => {
  const {pathname} = useLocation();
  const {user, userData} = useAuth();
  const isAuthPage = pathname === "/login" || pathname === "/register";

  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    return parts.length > 1
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : parts[0][0].toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 h-16 flex items-center shrink-0">
      <div className="w-full px-8 flex items-center justify-between">
        <div
          className={`flex items-center gap-3 ${isAuthPage ? "mx-auto" : ""}`}
        >
          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-50 border border-slate-100 overflow-hidden">
            <img
              src={logoH}
              alt="Logo"
              className="w-full h-full object-contain scale-125"
            />
          </div>

          <div className="border-l border-slate-200 pl-3">
            <h2 className="text-sm font-black text-slate-800 leading-tight">
              HOSPITAL DEL DÍA
            </h2>
            <span className="text-[10px] font-bold text-slate-400 uppercase">
              Universidad Central del Ecuador
            </span>
          </div>
        </div>

        {!isAuthPage && user && (
          <div className="flex items-center gap-3 bg-slate-50 py-1 pl-4 pr-1 rounded-2xl border border-slate-100">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-black text-slate-800">
                {userData?.fullname || user.displayName}
              </p>
              <p className="text-[9px] font-bold text-blue-600 uppercase tracking-widest">
                {userData?.role === "admin"
                  ? "Administrador"
                  : userData?.role === "student"
                    ? "Estudiante UCE"
                    : "Paciente Externo"}
              </p>
            </div>
            <div className="h-9 w-9 rounded-xl bg-slate-800 flex items-center justify-center text-white font-bold text-xs shadow-sm">
              {getInitials(userData?.fullname || user.displayName)}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
