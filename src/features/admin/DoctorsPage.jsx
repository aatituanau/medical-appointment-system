import React from "react";
import AdminSearchHeader from "../../components/ui-admin/AdminSearchHeader";

const DoctorsPage = () => {
  const doctors = [
    {
      id: 1,
      name: "Dr. Maria Gonzalez",
      lic: "MED-2023-884",
      specialty: "General Medicine",
      email: "maria.g@uce.edu.ec",
      status: "Active",
      img: "https://i.pravatar.cc/150?u=1",
    },
    {
      id: 2,
      name: "Dr. Juan Perez",
      lic: "CAR-2021-102",
      specialty: "Cardiology",
      email: "juan.p@uce.edu.ec",
      status: "On Leave",
      img: "https://i.pravatar.cc/150?u=2",
    },
    {
      id: 3,
      name: "Dra. Ana Torres",
      lic: "PED-2022-331",
      specialty: "Pediatrics",
      email: "ana.t@uce.edu.ec",
      status: "Active",
      img: "https://i.pravatar.cc/150?u=3",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">
          Doctor Management
        </h1>
        <p className="text-sm text-slate-500 font-medium">
          Manage and assign medical staff to specialties.
        </p>
      </div>

      <AdminSearchHeader
        placeholder="Search by name, ID or license..."
        btnText="Add New Doctor"
      />

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 border-b border-slate-50">
            <tr>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Doctor Name
              </th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
                Specialty
              </th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Contact
              </th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
                Status
              </th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {doctors.map((doc) => (
              <tr
                key={doc.id}
                className="hover:bg-slate-50/30 transition-colors"
              >
                <td className="px-8 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={doc.img}
                      className="size-10 rounded-full border-2 border-white shadow-sm"
                      alt=""
                    />
                    <div>
                      <p className="text-sm font-bold text-slate-700">
                        {doc.name}
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium">
                        Lic: {doc.lic}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="px-3 py-1 bg-blue-50 text-[#137fec] text-[10px] font-black rounded-lg border border-blue-100">
                    {doc.specialty}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-[11px] font-bold text-slate-600">
                    {doc.email}
                  </p>
                </td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-black ${
                      doc.status === "Active"
                        ? "bg-green-50 text-green-600"
                        : "bg-orange-50 text-orange-600"
                    }`}
                  >
                    ● {doc.status}
                  </span>
                </td>
                <td className="px-8 py-4 text-right space-x-1">
                  <button className="p-2 text-slate-300 hover:text-[#137fec]">
                    <span className="material-symbols-outlined text-lg">
                      edit
                    </span>
                  </button>
                  <button className="p-2 text-slate-300 hover:text-red-500">
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

export default DoctorsPage;
