import React from "react";

const ReportsPage = () => {
  const stats = [
    {label: "Total Appointments", value: "42", color: "bg-blue-500"},
    {label: "Confirmed", value: "35", color: "bg-green-500"},
    {label: "Canceled", value: "7", color: "bg-red-500"},
  ];

  const agenda = [
    {
      time: "08:00 AM",
      patient: "Juan Pérez",
      id: "1723456789",
      doctor: "Dra. Maria Lopez",
      spec: "Cardiology",
      status: "Confirmed",
      sColor: "text-green-600 bg-green-50",
    },
    {
      time: "08:30 AM",
      patient: "Ana Torres",
      id: "1712345678",
      doctor: "Dr. Roberto Gomez",
      spec: "General Medicine",
      status: "Pending Check-in",
      sColor: "text-orange-600 bg-orange-50",
    },
    {
      time: "09:15 AM",
      patient: "Luis Mendez",
      id: "1756789012",
      doctor: "Dra. Elena Diaz",
      spec: "Dermatology",
      status: "Canceled",
      sColor: "text-red-600 bg-red-50",
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">
            Consult Agenda
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Overview of scheduled appointments for today.
          </p>
        </div>
        <button className="bg-[#137fec] text-white px-6 py-3 rounded-2xl font-black text-xs flex items-center gap-2 shadow-lg shadow-blue-500/20">
          <span className="material-symbols-outlined text-sm">add</span> New
          Appointment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden"
          >
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              {stat.label}
            </p>
            <h2 className="text-4xl font-black text-slate-800 mt-2">
              {stat.value}
            </h2>
            <div
              className={`absolute bottom-0 left-6 right-6 h-1 ${stat.color} rounded-full`}
            ></div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 border-b border-slate-50">
            <tr>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Time
              </th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Patient
              </th>
              <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Doctor & Specialty
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
            {agenda.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-50/30 transition-colors">
                <td className="px-8 py-6 font-black text-slate-700 text-sm">
                  {item.time}
                </td>
                <td className="px-6 py-6">
                  <p className="font-bold text-slate-800 text-sm">
                    {item.patient}
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium">
                    ID: {item.id}
                  </p>
                </td>
                <td className="px-6 py-6">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-slate-100 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?u=${idx}`} alt="" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-700">
                        {item.doctor}
                      </p>
                      <p className="text-[10px] text-[#137fec] font-bold">
                        {item.spec}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6 text-center">
                  <span
                    className={`px-4 py-1.5 rounded-full text-[10px] font-black border ${item.sColor}`}
                  >
                    ● {item.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <button className="text-slate-300 hover:text-slate-600">
                    <span className="material-symbols-outlined">more_vert</span>
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

export default ReportsPage;
