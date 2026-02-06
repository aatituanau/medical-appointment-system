import React from "react";
import {getSpecialtyIcon} from "../../../utils/specialtyIcons";

const SpecialtiesTable = ({specialties, onEdit, onDelete}) => {
  return (
    <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left min-w-[500px] md:min-w-full">
          <thead className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <tr>
              <th className="px-4 md:px-8 py-5">Icono</th>
              <th className="px-4 md:px-8 py-5">Especialidad</th>
              <th className="px-4 md:px-8 py-5 hidden lg:table-cell">
                Descripción
              </th>
              <th className="px-4 md:px-8 py-5">Estado</th>
              <th className="px-4 md:px-8 py-5 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {specialties?.map((spec) => (
              <tr
                key={spec.id}
                className="hover:bg-slate-50/50 transition-colors group"
              >
                <td className="px-4 md:px-8 py-5">
                  <div className="size-10 md:size-12 bg-blue-50/50 rounded-xl flex items-center justify-center text-[#137fec]">
                    <span className="material-symbols-outlined text-xl md:text-2xl">
                      {getSpecialtyIcon(spec.name)}
                    </span>
                  </div>
                </td>
                <td className="px-4 md:px-8 py-5">
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-slate-800 uppercase italic leading-tight">
                      {spec.name}
                    </span>
                    <span className="lg:hidden text-[10px] text-slate-400 font-medium truncate max-w-[150px] mt-1">
                      {spec.description || "Sin descripción"}
                    </span>
                  </div>
                </td>
                <td className="px-4 md:px-8 py-5 text-xs font-medium text-slate-500 max-w-xs truncate hidden lg:table-cell">
                  {spec.description}
                </td>
                <td className="px-4 md:px-8 py-5">
                  <div className="flex items-center gap-2">
                    <div
                      className={`size-1.5 rounded-full ${
                        spec.active ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></div>
                    <span className="text-[9px] md:text-[10px] font-bold text-slate-600 uppercase">
                      {spec.active ? "Activa" : "Inactiva"}
                    </span>
                  </div>
                </td>
                <td className="px-4 md:px-8 py-5 text-right whitespace-nowrap">
                  <div className="flex justify-end gap-1">
                    <button
                      onClick={() => onEdit(spec)}
                      className="p-2 text-slate-300 hover:text-blue-500 transition-all hover:scale-110"
                      title="Editar Especialidad"
                    >
                      <span className="material-icons-outlined text-xl">
                        edit
                      </span>
                    </button>
                    <button
                      onClick={() => onDelete(spec)}
                      className="p-2 text-slate-300 hover:text-red-500 transition-all hover:scale-110"
                      title="Eliminar Especialidad"
                    >
                      <span className="material-icons-outlined text-xl">
                        delete
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {specialties?.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="px-8 py-10 text-center text-slate-400 font-bold uppercase text-[10px] tracking-widest"
                >
                  No se encontraron resultados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="md:hidden divide-y divide-slate-100">
        {specialties?.map((spec) => (
          <div key={spec.id} className="p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="size-12 bg-blue-50/50 rounded-2xl flex items-center justify-center text-[#137fec]">
                <span className="material-symbols-outlined text-2xl">
                  {getSpecialtyIcon(spec.name)}
                </span>
              </div>
              <div>
                <p className="text-base font-black text-slate-800 uppercase italic leading-tight">
                  {spec.name}
                </p>
                <p className="text-[11px] text-slate-500">
                  {spec.description || "Sin descripción"}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span
                className={`text-[10px] font-black px-3 py-1 rounded-full ${
                  spec.active
                    ? "bg-green-50 text-green-600"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {spec.active ? "Activa" : "Inactiva"}
              </span>

              <div className="flex gap-1">
                <button
                  onClick={() => onEdit(spec)}
                  className="p-2 text-slate-400 hover:text-blue-500"
                >
                  <span className="material-icons-outlined text-lg">edit</span>
                </button>
                <button
                  onClick={() => onDelete(spec)}
                  className="p-2 text-slate-400 hover:text-red-500"
                >
                  <span className="material-icons-outlined text-lg">
                    delete
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {specialties?.length === 0 && (
          <div className="p-6 text-center text-slate-400 text-[10px] font-black uppercase tracking-widest">
            No se encontraron resultados
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecialtiesTable;
