import React from "react";
import AdminSearchHeader from "../../components/ui-admin/AdminSearchHeader";

const SpecialtiesPage = () => {
  const specialties = [
    {
      id: 1,
      name: "Cardiología",
      icon: "cardiology",
      desc: "Diagnóstico y tratamiento de trastornos del corazón.",
      doctors: 3,
      status: "Activo",
    },
    {
      id: 2,
      name: "Odontología",
      icon: "dentistry",
      desc: "Cuidado dental e higiene bucal universitaria.",
      doctors: 2,
      status: "Activo",
    },
    {
      id: 3,
      name: "Pediatría",
      icon: "child_care",
      desc: "Atención médica para hijos de estudiantes y personal.",
      doctors: 5,
      status: "Inactivo",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">
          Especialidades Médicas
        </h1>
        <p className="text-sm text-slate-500 font-medium">
          Gestiona los servicios disponibles en el Hospital del Día.
        </p>
      </div>

      <AdminSearchHeader
        placeholder="Buscar especialidad..."
        btnText="Nueva Especialidad"
      />

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 border-b border-slate-50">
            <tr>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Icono
              </th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Nombre
              </th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Descripción
              </th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
                Estado
              </th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {specialties.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-slate-50/30 transition-colors group"
              >
                <td className="px-8 py-4">
                  <div className="size-10 bg-blue-50 text-[#137fec] rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    <span className="material-symbols-outlined">
                      {item.icon}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 font-bold text-sm text-slate-700">
                  {item.name}
                </td>
                <td className="px-6 py-4 text-xs text-slate-500 max-w-xs truncate">
                  {item.desc}
                </td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`px-4 py-1.5 rounded-full text-[10px] font-black border ${
                      item.status === "Activo"
                        ? "bg-green-50 text-green-600 border-green-100"
                        : "bg-slate-50 text-slate-400 border-slate-100"
                    }`}
                  >
                    ● {item.status}
                  </span>
                </td>
                <td className="px-8 py-4 text-right space-x-2">
                  <button className="text-slate-300 hover:text-[#137fec] transition-colors">
                    <span className="material-symbols-outlined text-lg">
                      edit
                    </span>
                  </button>
                  <button className="text-slate-300 hover:text-red-500 transition-colors">
                    <span className="material-symbols-outlined text-lg">
                      delete
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SpecialtiesPage;
