import React, {useState} from "react";
import {useDoctors, useSpecialties} from "../../hooks/useMedicalData";
import {useDebounce} from "../../hooks/useDebounce";
import AdminSearchHeader from "../../components/ui-admin/AdminSearchHeader";
import MedicalModal from "../../components/ui-admin/MedicalModal";
import MedicalForm from "../../components/ui-admin/MedicalForm";
import Skeleton from "../../components/ui/Skeleton";

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
    return (
      <div className="space-y-6">
        {/* Search Header Skeleton */}
        <div className="bg-white p-4 rounded-[2rem] border border-slate-100 flex gap-4">
          <Skeleton className="h-12 w-full max-w-md rounded-2xl" />
          <Skeleton className="h-12 w-40 rounded-2xl" />
        </div>

        {/* Table Skeleton */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden">
          <div className="p-8 space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between py-4 border-b border-slate-50 last:border-0"
              >
                <div className="flex items-center gap-4">
                  <Skeleton className="size-12 rounded-xl" /> {/* photo/icon */}
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-48" /> {/* name */}
                    <Skeleton className="h-3 w-32" /> {/* email */}
                  </div>
                </div>
                <Skeleton className="h-6 w-24 rounded-full" />{" "}
                {/* specialty badge */}
                <div className="flex gap-2">
                  <Skeleton className="size-8 rounded-lg" /> {/* edit button */}
                  <Skeleton className="size-8 rounded-lg" />{" "}
                  {/* delete button */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
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
              Estado del Especialista (Activo/Inactivo)
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

      {/* TABLE OF DOCTORS */}
      <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[600px] md:min-w-full">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <th className="px-4 md:px-8 py-5">Médico Especialista</th>
                <th className="px-4 md:px-8 py-5">Especialidad</th>
                <th className="px-4 md:px-8 py-5 hidden sm:table-cell">
                  Estado
                </th>
                <th className="px-4 md:px-8 py-5 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredDoctors?.map((doc) => (
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
                        onClick={() => handleOpenModal(doc)}
                        className="p-2 text-slate-300 hover:text-blue-500 transition-colors"
                        title="Editar"
                      >
                        <span className="material-icons-outlined text-xl">
                          edit
                        </span>
                      </button>
                      <button
                        onClick={() =>
                          confirm(`¿Está seguro de eliminar al ${doc.name}?`) &&
                          deleteItem(doc.id)
                        }
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

              {filteredDoctors?.length === 0 && (
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
    </div>
  );
};

export default DoctorsPage;
