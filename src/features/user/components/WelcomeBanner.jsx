import React from "react";

const WelcomeBanner = ({displayName}) => {
  return (
    <div className="relative h-48 rounded-[2.5rem] overflow-hidden shadow-lg group">
      <img
        src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80"
        className="w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105"
        alt="Hospital UCE"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#137fec] via-[#137fec]/80 to-transparent flex items-center px-10">
        <div className="text-white space-y-1">
          <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full backdrop-blur-md border border-white/10 mb-2">
            <span className="material-symbols-outlined text-xs">person</span>
            <span className="font-bold uppercase text-[10px] tracking-wider">
              Portal de Usuario
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black italic tracking-tight leading-none">
            Hola,{" "}
            <span className="text-blue-100 border-b-2 border-blue-200/30 pb-1">
              {displayName}
            </span>
          </h1>

          <p className="text-blue-50 text-sm font-medium mt-2 max-w-md opacity-90">
            Bienvenido a tu sistema de salud universitaria.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
