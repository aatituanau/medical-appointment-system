import React from "react";
import {Pie, Bar} from "react-chartjs-2";

const ReportCharts = ({confirmed, cancelled, specialties}) => {
  const pieData = {
    labels: ["Confirmadas", "Canceladas"],
    datasets: [
      {
        data: [confirmed, cancelled],
        backgroundColor: ["#22c55e", "#ef4444"],
        borderWidth: 0,
      },
    ],
  };

  const barData = {
    labels: Object.keys(specialties),
    datasets: [
      {
        label: "Citas",
        data: Object.values(specialties),
        backgroundColor: "#3b82f6",
        borderRadius: 8,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 text-center">
          Estado General
        </h3>
        <div className="h-64">
          <Pie
            data={pieData}
            options={{
              maintainAspectRatio: false,
              plugins: {legend: {position: "bottom"}},
            }}
          />
        </div>
      </div>
      <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 text-center">
          Demanda por Especialidad
        </h3>
        <div className="h-64">
          <Bar data={barData} options={{maintainAspectRatio: false}} />
        </div>
      </div>
    </div>
  );
};

export default ReportCharts;
