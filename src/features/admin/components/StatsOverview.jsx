import React from "react";
import StatCard from "../../../components/ui-admin/StatCard";

const StatsOverview = ({total, confirmed, cancelled}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard label="Total Histórico" value={total} color="bg-blue-600" />
      <StatCard
        label="Total Confirmadas"
        value={confirmed}
        color="bg-emerald-500"
      />
      <StatCard
        label="Total Canceladas"
        value={cancelled}
        color="bg-rose-500"
      />
    </div>
  );
};

export default StatsOverview;
