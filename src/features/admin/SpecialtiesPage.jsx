import React, {useState} from "react";
import {useSpecialties} from "../../hooks/useMedicalData";
import AdminSearchHeader from "../../components/ui-admin/AdminSearchHeader";
import MedicalModal from "../../components/ui-admin/MedicalModal";
import MedicalForm from "../../components/ui-admin/MedicalForm";
import {getSpecialtyIcon} from "../../utils/specialtyIcons";

const SpecialtiesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSpec, setCurrentSpec] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    active: true,
  });

  const {
    data: specialties,
    isLoading,
    addSpecialty,
    updateSpecialty,
    deleteSpecialty,
  } = useSpecialties();

  const specFields = [
    {
      name: "name",
      label: "Nombre de la Especialidad",
      placeholder: "Ej: Odontología",
      required: true,
    },
    {
      name: "description",
      label: "Descripción",
      type: "textarea",
      placeholder: "Breve descripción...",
    },
  ];

  const handleOpenModal = (spec = null) => {
    if (spec) {
      setCurrentSpec(spec);
      setFormData({
        name: spec.name,
        description: spec.description,
        active: spec.active ?? true,
      });
    } else {
      setCurrentSpec(null);
      setFormData({
        name: "",
        description: "",
        active: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    if (currentSpec) {
      updateSpecialty({id: currentSpec.id, ...formData});
    } else {
      addSpecialty(formData);
    }
    setIsModalOpen(false);
  };

  const filteredSpecs = specialties?.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (isLoading) {
    return (
      <div className="p-10 md:p-20 text-center flex flex-col items-center gap-4">
        <div className="animate-spin size-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        <p className="font-black text-slate-400 uppercase tracking-widest text-[10px] md:text-xs">
          Cargando catálogo...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6 p-2 md:p-0">
      <AdminSearchHeader
        placeholder="Buscar especialidad..."
        btnText="Añadir Especialidad"
        onAddClick={() => handleOpenModal()}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <MedicalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentSpec ? "Editar Especialidad" : "Nueva Especialidad"}
        onSubmit={handleSubmit}
      >
        <div className="max-h-[75vh] overflow-y-auto px-1">
          <MedicalForm
            fields={specFields}
            formData={formData}
            onChange={(name, value) =>
              setFormData({...formData, [name]: value})
            }
          />

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 mt-4">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Estado de Visibilidad
            </span>
            <div className="flex items-center gap-3">
              <span
                className={`text-[10px] font-bold ${
                  formData.active ? "text-green-500" : "text-red-500"
                }`}
              >
                {formData.active ? "ACTIVO" : "INACTIVO"}
              </span>
              <input
                type="checkbox"
                className="size-5 accent-blue-600 cursor-pointer"
                checked={formData.active}
                onChange={(e) =>
                  setFormData({...formData, active: e.target.checked})
                }
              />
            </div>
          </div>
        </div>
      </MedicalModal>

      <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
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
              {filteredSpecs?.map((spec) => (
                <tr
                  key={spec.id}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="px-4 md:px-8 py-5">
                    <div className="size-10 md:size-12 bg-blue-50/50 rounded-xl flex items-center justify-center text-[#137fec]">
                      {" "}
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
                        onClick={() => handleOpenModal(spec)}
                        className="p-2 text-slate-300 hover:text-blue-500 transition-all hover:scale-110"
                      >
                        <span className="material-icons-outlined text-xl">
                          edit
                        </span>
                      </button>
                      <button
                        onClick={() =>
                          confirm(`¿Borrar ${spec.name}?`) &&
                          deleteSpecialty(spec.id)
                        }
                        className="p-2 text-slate-300 hover:text-red-500 transition-all hover:scale-110"
                      >
                        <span className="material-icons-outlined text-xl">
                          delete
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SpecialtiesPage;
