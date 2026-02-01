import React from "react";

const DoctorsTable = ({doctors, onEdit, onDelete}) => {
  return (
    <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[600px] md:min-w-full">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <th className="px-4 md:px-8 py-5">Médico Especialista</th>
              <th className="px-4 md:px-8 py-5">Especialidad</th>
              <th className="px-4 md:px-8 py-5 hidden sm:table-cell">Estado</th>
              <th className="px-4 md:px-8 py-5 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {doctors?.map((doc) => (
              <tr
                key={doc.id}
                className="hover:bg-slate-50/50 transition-colors group"
              >
                <td className="px-4 md:px-8 py-5">
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-slate-800 uppercase leading-tight">
                      {doc.name}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold normal-case md:mt-1">
                      {doc.email}
                    </span>
                  </div>
                </td>
                <td className="px-4 md:px-8 py-5">
                  <span className="text-[9px] md:text-[10px] font-bold text-blue-600 bg-blue-50 px-2 md:px-3 py-1 rounded-full uppercase whitespace-nowrap">
                    {doc.specialty}
                  </span>
                </td>
                <td className="px-4 md:px-8 py-5 hidden sm:table-cell">
                  <div className="flex items-center gap-2">
                    <div
                      className={`size-1.5 rounded-full ${
                        doc.active ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></div>
                    <span className="text-[10px] font-bold text-slate-600 uppercase">
                      {doc.active ? "ACTIVO" : "INACTIVO"}
                    </span>
                  </div>
                </td>
                <td className="px-4 md:px-8 py-5 text-right whitespace-nowrap">
                  <div className="flex justify-end gap-1 md:gap-2">
                    <button
                      onClick={() => onEdit(doc)}
                      className="p-2 text-slate-300 hover:text-blue-500 transition-colors"
                      title="Editar"
                    >
                      <span className="material-icons-outlined text-xl">
                        edit
                      </span>
                    </button>
                    <button
                      onClick={() => onDelete(doc)}
                      className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                      title="Eliminar"
                    >
                      <span className="material-icons-outlined text-xl">
                        delete
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {doctors?.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="px-8 py-10 text-center text-slate-400 font-bold uppercase text-[10px] tracking-widest"
                >
                  No se encontraron médicos que coincidan con la búsqueda
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorsTable;
