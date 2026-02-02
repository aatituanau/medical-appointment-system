import React from "react";
import {Link} from "react-router-dom";

const HomeButton = () => {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 text-slate-500 font-bold hover:text-[#137fec] transition-colors bg-white px-4 py-2 rounded-full shadow-sm hover:shadow-md border border-slate-100"
    >
      <span className="material-symbols-outlined text-xl">home</span>
    </Link>
  );
};

export default HomeButton;
