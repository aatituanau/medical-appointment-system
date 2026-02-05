import React from "react";
import {useNavigate} from "react-router-dom";
import {useSpecialties} from "../../hooks/useSpecialties";
import {getSpecialtyIcon} from "../../utils/specialtyIcons";
import SpecialtyCard from "../user/components/SpecialtyCard";
import LandingHero from "./components/LandingHero";
import MissionVision from "./components/MissionVision";
import InfoCards from "./components/InfoCards";

const LandingPage = () => {
  const navigate = useNavigate();
  const {data: specialties, isLoading} = useSpecialties();

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      <div className="max-w-7xl mx-auto px-4 space-y-12 animate-fade-in pt-8">
        {" "}
        {/* 1. Hero banner */}
        <LandingHero />
        {/* 2. Mission and vision */}
        <MissionVision />
        {/* 3. Fast facts */}
        <InfoCards />
        {/* 4. Specialties section */}
        <div className="space-y-8 pt-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-slate-800 uppercase italic tracking-tight">
              Especialidades Disponibles
            </h2>
            <div className="h-1 w-20 bg-[#137fec] mx-auto rounded-full"></div>
            <p className="text-slate-500 text-sm max-w-xl mx-auto">
              Atención Médica Especializada: Salud y Bienestar a su alcance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading
              ? [1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-44 bg-white border border-slate-100 animate-pulse rounded-[2.5rem]"
                  />
                ))
              : specialties
                  ?.filter((s) => s.active)
                  .map((spec) => (
                    <SpecialtyCard
                      key={spec.id}
                      name={spec.name}
                      icon={getSpecialtyIcon(spec.name)}
                    />
                  ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
