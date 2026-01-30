import React, {useState} from "react";
import {useSpecialties} from "../../hooks/useSpecialties";
import {useDebounce} from "../../hooks/useDebounce";
import AdminSearchHeader from "../../components/ui-admin/AdminSearchHeader";
import MedicalModal from "../../components/ui-admin/MedicalModal";
import MedicalForm from "../../components/ui-admin/MedicalForm";
import SpecialtiesSkeleton from "../../components/skeletons/SpecialtiesSkeleton";
import SpecialtiesTable from "./components/SpecialtiesTable";

const SpecialtiesPage = () => {
  // --- STATES ---
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSpec, setCurrentSpec] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    active: true,
  });

  // --- CUSTOM HOOKS ---
  const {
    data: specialties,
    isLoading,
    addSpecialty,
    updateSpecialty,
    deleteSpecialty,
  } = useSpecialties();

  // Use debounce to delay search filter (500ms)
  const debouncedSearch = useDebounce(searchTerm, 500);

  // --- FORM CONFIGURATION ---
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

  // --- HANDLERS ---
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

  // Handler for the delete action
  const handleDeleteClick = (spec) => {
    if (confirm(`¿Borrar ${spec.name}?`)) {
      deleteSpecialty(spec.id);
    }
  };

  // --- FILTER LOGIC ---
  const filteredSpecs = specialties?.filter((s) =>
    s.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );

  // --- VIEW RENDER ---
  if (isLoading) {
    return <SpecialtiesSkeleton />;
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
              Estado de la Especialidad
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

      <SpecialtiesTable
        specialties={filteredSpecs}
        onEdit={handleOpenModal}
        onDelete={handleDeleteClick}
      />
    </div>
  );
};

export default SpecialtiesPage;
