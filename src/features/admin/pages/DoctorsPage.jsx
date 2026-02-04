import React, {useState} from "react";
import {useDoctors} from "../../../hooks/useDoctors";
import {useSpecialties} from "../../../hooks/useSpecialties";
import {useDebounce} from "../../../hooks/useDebounce";
import AdminSearchHeader from "../components/AdminSearchHeader";
import MedicalModal from "../components/MedicalModal";
import MedicalForm from "../components/MedicalForm";
import DoctorsSkeleton from "../../../components/skeletons/DoctorsSkeleton";
import DoctorsTable from "../components/DoctorsTable";

const DoctorsPage = () => {
  // --- STATES ---
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    specialty: "",
    active: true,
  });

  // --- HOOKS & DATA ---
  const {
    data: doctors,
    isLoading,
    addItem,
    updateItem,
    deleteItem,
  } = useDoctors();

  const {data: specialties, isLoading: isLoadSpecs} = useSpecialties();

  // Debounced search term to optimize filtering
  const debouncedSearch = useDebounce(searchTerm, 500);

  // --- HANDLERS ---
  const handleOpenModal = (doctor = null) => {
    if (doctor) {
      setCurrentDoctor(doctor);
      setFormData({
        name: doctor.name,
        email: doctor.email,
        specialty: doctor.specialty,
        active: doctor.active,
      });
    } else {
      setCurrentDoctor(null);
      setFormData({name: "", email: "", specialty: "", active: true});
    }
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    if (currentDoctor) {
      updateItem({id: currentDoctor.id, ...formData});
    } else {
      addItem(formData);
    }
    setIsModalOpen(false);
  };

  // Handler for the delete action
  const handleDeleteClick = (doc) => {
    if (confirm(`¿Está seguro de eliminar al ${doc.name}?`)) {
      deleteItem(doc.id);
    }
  };

  // --- FILTER LOGIC ---
  const filteredDoctors = doctors?.filter(
    (doc) =>
      doc.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );

  // --- FORM FIELDS CONFIG ---
  const doctorFields = [
    {
      name: "name",
      label: "Nombre Completo",
      placeholder: "Ej: Dr. Alex Tituana",
      required: true,
    },
    {
      name: "email",
      label: "Correo Institucional",
      type: "email",
      placeholder: "usuario@uce.edu.ec",
      required: true,
    },
    {
      name: "specialty",
      label: "Asignar Especialidad",
      type: "select",
      placeholder: "Seleccione una área...",
      options: specialties
        ?.filter((s) => s.active)
        .map((s) => ({value: s.name, label: s.name})),
      required: true,
    },
  ];

  if (isLoading || isLoadSpecs) {
    return <DoctorsSkeleton />;
  }

  return (
    <div className="space-y-4 md:space-y-6 p-2 md:p-0">
      {/* HEADER & SEARCH */}
      <AdminSearchHeader
        placeholder="Buscar médico por nombre o especialidad..."
        btnText="Nuevo Médico"
        onAddClick={() => handleOpenModal()}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* MODAL FOR CREATE/EDIT */}
      <MedicalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentDoctor ? "Editar Médico" : "Registrar Médico"}
        onSubmit={handleSubmit}
      >
        <div className="max-h-[70vh] overflow-y-auto px-1">
          <MedicalForm
            fields={doctorFields}
            formData={formData}
            onChange={(name, value) =>
              setFormData({...formData, [name]: value})
            }
          />
          <div className="mt-4 flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Estado del Especialista
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

      {/* TABLE OF DOCTORS */}
      <DoctorsTable
        doctors={filteredDoctors}
        onEdit={handleOpenModal}
        onDelete={handleDeleteClick}
      />
    </div>
  );
};

export default DoctorsPage;
