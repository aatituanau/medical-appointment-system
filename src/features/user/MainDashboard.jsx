import React from "react";
import {useNavigate} from "react-router-dom";
import {useSpecialties} from "../../hooks/useSpecialties";
import {getSpecialtyIcon} from "../../utils/specialtyIcons";
import SpecialtyCard from "../../components/ui/SpecialtyCard";

const MainDashboard = () => {
  const navigate = useNavigate();
  const {data: specialties, isLoading} = useSpecialties();

  return (
    <div className="space-y-12 pb-20 max-w-7xl mx-auto px-4 animate-fade-in">
      {/* 1. HERO BANNER INSTITUCIONAL */}
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
          <div className="mt-6 flex items-center gap-4">
            <div className="h-1 w-12 bg-blue-300 rounded-full"></div>
            <p className="text-blue-50 font-bold uppercase text-[10px] tracking-widest">
              Excelencia Médica Universitaria
            </p>
          </div>
        </div>
      </div>

      {/* 2. SECCIÓN: MISIÓN Y VISIÓN (TARJETAS INSTITUCIONALES) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-6">
            <div className="size-12 bg-blue-50 rounded-2xl flex items-center justify-center text-[#137fec]">
              <span className="material-symbols-outlined text-3xl">flag</span>
            </div>
            <h2 className="text-2xl font-black text-slate-800 uppercase italic">
              Misión
            </h2>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed font-medium">
            Brindar atención especializada, con calidad, eficacia, eficiencia y
            calidez satisfaciendo las necesidades de salud integral, física,
            emocional y social de la población universitaria y la que acude en
            demanda de sus servicios, sin distinción de condición económica,
            nacionalidad, raza o religión.
          </p>
        </div>

        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-6">
            <div className="size-12 bg-blue-50 rounded-2xl flex items-center justify-center text-[#137fec]">
              <span className="material-symbols-outlined text-3xl">
                visibility
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-800 uppercase italic">
              Visión
            </h2>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed font-medium">
            Mantenerse como el mejor Hospital del Día Universitario a nivel
            nacional, contando con tecnología de punta y personal altamente
            calificado, manteniendo los principios de calidad, equidad,
            universalidad y solidaridad para convertirnos en el primer centro de
            referencia, investigación y docencia.
          </p>
        </div>
      </div>

      {/* 3. INFO RÁPIDA: ATENCIÓN, HORARIOS Y AUTORIDADES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white flex flex-col justify-between">
          <span className="material-symbols-outlined text-blue-400 text-4xl mb-4">
            groups
          </span>
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-blue-300 mb-2">
              Atención a:
            </h3>
            <p className="text-xs font-bold leading-relaxed opacity-90">
              Estudiantes, Docentes, Empleados y Trabajadores de la Universidad
              Central. También público particular.
            </p>
          </div>
        </div>

        <div className="bg-[#137fec] p-8 rounded-[2.5rem] text-white flex flex-col justify-between shadow-lg shadow-blue-200">
          <span className="material-symbols-outlined text-blue-100 text-4xl mb-4">
            schedule
          </span>
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-blue-100 mb-2">
              Horarios de Atención
            </h3>
            <p className="text-3xl font-black italic">07:00 a 16:00</p>
            <p className="text-[9px] font-bold uppercase mt-1 opacity-70">
              Lunes a Viernes
            </p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 flex flex-col justify-between">
          <span className="material-symbols-outlined text-slate-400 text-4xl mb-4">
            account_balance
          </span>
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
              Autoridades
            </h3>
            <p className="text-sm font-black text-slate-800 uppercase italic">
              Dra. Lilian Rebeca Calderón, PhD.
            </p>
            <p className="text-[9px] font-bold text-[#137fec] uppercase tracking-wider mt-1">
              Directora Hospital del Día
            </p>
          </div>
        </div>
      </div>

      {/* 4. SECCIÓN DE ESPECIALIDADES (EL CATÁLOGO) */}
      <div className="space-y-8 pt-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black text-slate-800 uppercase italic tracking-tight">
            Especialidades Disponibles
          </h2>
          <div className="h-1 w-20 bg-[#137fec] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? [1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-44 bg-slate-100 animate-pulse rounded-[2.5rem]"
                />
              ))
            : specialties
                ?.filter((s) => s.active)
                .map((spec) => (
                  <SpecialtyCard
                    key={spec.id}
                    name={spec.name}
                    icon={getSpecialtyIcon(spec.name)}
                    onClick={() => navigate(`/agendar?specialty=${spec.name}`)}
                  />
                ))}
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
