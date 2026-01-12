import React from "react";
import Calendar from "../../components/ui/Calendar";

const AppointmentsPage = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">
            Schedule Command Center
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Manage medical staff availability and shifts.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 rounded-2xl bg-white border border-slate-100 text-slate-600 font-black text-xs hover:bg-slate-50 transition-all">
            Discard
          </button>
          <button className="px-6 py-3 rounded-2xl bg-[#137fec] text-white font-black text-xs shadow-lg shadow-blue-500/20 active:scale-95 transition-all">
            Publish Schedule
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
              Select Professional
            </h3>
            <div className="relative mb-4">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                search
              </span>
              <input
                type="text"
                placeholder="Search doctor..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs outline-none"
              />
            </div>
            <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/150?u=9"
                className="size-10 rounded-full"
                alt=""
              />
              <div>
                <p className="text-sm font-black text-slate-800">
                  Dra. Elena Rodriguez
                </p>
                <p className="text-[10px] font-bold text-[#137fec] bg-blue-100/50 px-2 py-0.5 rounded-md inline-block">
                  Cardiology
                </p>
              </div>
              <button className="ml-auto text-slate-400">
                <span className="material-symbols-outlined text-sm">edit</span>
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <Calendar onDateChange={() => {}} />
          </div>
        </div>

        <div className="lg:col-span-8 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-black text-slate-800">
              Recurrent Shift Summary
            </h3>
            <button className="bg-[#137fec] text-white px-4 py-2 rounded-xl font-black text-[10px] flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">add</span> Add
              Quick Shift
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[11px]">
              <thead>
                <tr className="text-slate-400 font-black uppercase tracking-tighter border-b border-slate-50">
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Start Date</th>
                  <th className="pb-4">End Date</th>
                  <th className="pb-4">Days</th>
                  <th className="pb-4">Hours</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <tr key={i} className="group">
                    <td className="py-4">
                      <span className="bg-green-50 text-green-600 px-2 py-1 rounded-md font-bold">
                        Active
                      </span>
                    </td>
                    <td className="py-4 font-bold text-slate-600 italic">
                      10/01/2023
                    </td>
                    <td className="py-4 font-bold text-slate-400 italic">
                      -- / -- / --
                    </td>
                    <td className="py-4 font-black text-slate-700 uppercase">
                      Mon, Wed, Fri
                    </td>
                    <td className="py-4 font-bold text-slate-600 tracking-tighter">
                      08:00 - 12:00
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPage;
