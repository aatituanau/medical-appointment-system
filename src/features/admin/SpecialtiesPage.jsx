import React, {useState} from "react";
import {useSpecialties} from "../../hooks/useMedicalData";
import AdminSearchHeader from "../../components/ui-admin/AdminSearchHeader";
import MedicalModal from "../../components/ui-admin/MedicalModal";
import MedicalForm from "../../components/ui-admin/MedicalForm";

const SpecialtiesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSpec, setCurrentSpec] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "medical_services",
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
    {
      name: "icon",
      label: "Icono (Material Icons)",
      placeholder: "Ej: monitor_heart",
    },
  ];

  const handleOpenModal = (spec = null) => {
    if (spec) {
      setCurrentSpec(spec);
      setFormData({
        name: spec.name,
        description: spec.description,
        icon: spec.icon || "medical_services",
        active: spec.active ?? true,
      });
    } else {
      setCurrentSpec(null);
      setFormData({
        name: "",
        description: "",
        icon: "medical_services",
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
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="p-20 text-center flex flex-col items-center gap-4">
        <div className="animate-spin size-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        <p className="font-black text-slate-400 uppercase tracking-widest text-xs">
          Cargando catálogo...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
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
        <MedicalForm
          fields={specFields}
          formData={formData}
          onChange={(name, value) => setFormData({...formData, [name]: value})}
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
      </MedicalModal>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <th className="px-8 py-5">Icono</th>
              <th className="px-8 py-5">Especialidad</th>
              <th className="px-8 py-5">Descripción</th>
              <th className="px-8 py-5">Estado</th>
              <th className="px-8 py-5 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredSpecs?.map((spec) => (
              <tr
                key={spec.id}
                className="hover:bg-slate-50/50 transition-colors group"
              >
                <td className="px-8 py-5">
                  <div className="size-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500">
                    <span className="material-icons-outlined text-xl">
                      {spec.icon}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-5 text-sm font-black text-slate-800 uppercase">
                  {spec.name}
                </td>
                <td className="px-8 py-5 text-xs font-medium text-slate-500 max-w-xs truncate">
                  {spec.description}
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-2">
                    <div
                      className={`size-1.5 rounded-full ${
                        spec.active ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></div>
                    <span className="text-[10px] font-bold text-slate-600 uppercase">
                      {spec.active ? "Activa" : "Inactiva"}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-5 text-right space-x-2">
                  <button
                    onClick={() => handleOpenModal(spec)}
                    className="text-slate-300 hover:text-blue-500 transition-colors"
                  >
                    <span className="material-icons-outlined">edit</span>
                  </button>
                  <button
                    onClick={() =>
                      confirm(`¿Borrar ${spec.name}?`) &&
                      deleteSpecialty(spec.id)
                    }
                    className="text-slate-300 hover:text-red-500 transition-colors"
                  >
                    <span className="material-icons-outlined">delete</span>
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
