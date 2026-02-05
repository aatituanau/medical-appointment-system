import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useSpecialties} from "../../../hooks/useSpecialties";
import {useDebounce} from "../../../hooks/useDebounce";
import AdminSearchHeader from "../components/AdminSearchHeader";
import MedicalModal from "../components/MedicalModal";
import MedicalForm from "../components/MedicalForm";
import SpecialtiesSkeleton from "../../../components/skeletons/SpecialtiesSkeleton";
import SpecialtiesTable from "../components/SpecialtiesTable";
import {showAlertConfirm} from "../../../utils/alerts";
import {specialtySchema} from "../../../schemas/medicalSchemas";

const SpecialtiesPage = () => {
  // --- STATES ---
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSpec, setCurrentSpec] = useState(null);

  const [isActive, setIsActive] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    resolver: zodResolver(specialtySchema),
    defaultValues: {
      name: "",
      description: "",
    },
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
      reset({
        name: spec.name || "",
        description: spec.description || "",
      });
      setIsActive(spec.active ?? true);
    } else {
      setCurrentSpec(null);
      reset({name: "", description: ""});
      setIsActive(true);
    }
    setIsModalOpen(true);
  };

  const onSubmit = (data) => {
    const payload = {...data, active: isActive};

    if (currentSpec) {
      updateSpecialty({id: currentSpec.id, ...payload});
    } else {
      addSpecialty(payload);
    }
    setIsModalOpen(false);
  };

  // Handler for the delete action
  const handleDeleteClick = async (spec) => {
    const isConfirmed = await showAlertConfirm(
      "¿Eliminar especialidad?",
      `Se eliminará definitivamente ${spec.name}.`,
    );

    if (isConfirmed) {
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
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="max-h-[75vh] overflow-y-auto px-1">
          <MedicalForm
            fields={specFields}
            register={register}
            errors={errors}
          />

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 mt-4">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Estado de la Especialidad
            </span>
            <div className="flex items-center gap-3">
              <span
                className={`text-[10px] font-bold ${
                  isActive ? "text-green-500" : "text-red-500"
                }`}
              >
                {isActive ? "ACTIVO" : "INACTIVO"}
              </span>
              <input
                type="checkbox"
                className="size-5 accent-blue-600 cursor-pointer"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
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
