import React from "react";
import Skeleton from "../ui/Skeleton";

const AppointmentsSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20 px-4">
      <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
        <Skeleton className="h-10 w-48 mb-4" />
        <Skeleton className="h-3 w-64" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white p-10 rounded-[3.5rem] border-2 border-slate-50 space-y-8"
          >
            <Skeleton className="size-24 rounded-[2.5rem]" />
            <div className="space-y-4">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentsSkeleton;
