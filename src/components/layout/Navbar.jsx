import React from "react";
import {useLocation} from "react-router-dom";
import {auth} from "../../firebase/config";
import logoH from "../../assets/logoH.png";

const Navbar = () => {
  const {pathname} = useLocation();
  const isAuthPage = pathname === "/login" || pathname === "/register";
  const user = auth.currentUser;

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-sm h-16 flex items-center">
      <div className="w-full px-4 sm:px-8 flex items-center">
        <div
          className={`flex items-center gap-3 ${
            isAuthPage ? "mx-auto" : "flex-1"
          }`}
        >
          <img src={logoH} alt="Logo Hospital" className="h-9 w-auto" />
          <div className="flex flex-col border-l border-slate-200 pl-3">
            <h2 className="text-sm font-black leading-tight text-slate-800">
              HOSPITAL DEL DÍA
            </h2>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
              Universidad Central del Ecuador
            </span>
          </div>
        </div>

        {!isAuthPage && (
          <div className="flex items-center gap-3 bg-slate-50 py-1 pl-4 pr-1 rounded-2xl border border-slate-100">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-black text-slate-800 leading-none">
                {user?.displayName || "Usuario UCE"}
              </p>
              <p className="text-[9px] font-bold text-blue-600 uppercase tracking-widest mt-1">
                {pathname.startsWith("/admin") ? "Administrador" : "Estudiante"}
              </p>
            </div>

            <div className="h-9 w-9 rounded-xl bg-slate-800 flex items-center justify-center text-white shadow-sm overflow-hidden border border-white font-bold text-xs">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span>{getInitials(user?.displayName)}</span>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
