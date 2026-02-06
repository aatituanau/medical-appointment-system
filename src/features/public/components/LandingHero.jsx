import React from "react";
import {useNavigate} from "react-router-dom";

const LandingHero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-80 rounded-[3.5rem] overflow-hidden shadow-2xl group">
      <img
        src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80"
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        alt="Hospital UCE"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#137fec]/95 via-[#137fec]/70 to-transparent flex flex-col justify-center px-12">
        <div className="bg-white/20 w-fit px-4 py-1 rounded-full backdrop-blur-md mb-4">
          <p className="text-white font-black uppercase text-[9px] tracking-[0.3em]">
            Sistema de Agendamiento
          </p>
        </div>
        <h1 className="text-white text-5xl md:text-6xl font-black italic tracking-tighter uppercase leading-[0.9]">
          Hospital del Día <br /> <span className="text-blue-200">UCE</span>
        </h1>

        <div className="mt-6 flex items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="h-1 w-12 bg-blue-300 rounded-full"></div>
            <p className="text-blue-50 font-bold uppercase text-[10px] tracking-widest">
              Tu salud en buenas manos. Agende su cita hoy mismo y dé el primer
              paso hacia una vida más saludable con nuestro equipo de expertos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingHero;
