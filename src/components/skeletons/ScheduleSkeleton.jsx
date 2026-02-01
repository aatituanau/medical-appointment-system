import React from "react";
import Skeleton from "../ui/Skeleton";

const ScheduleSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar Skeleton */}
      <div className="lg:col-span-1 space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-20 w-full rounded-2xl" />
        ))}
      </div>

      {/* Main Grid Skeleton */}
      <div className="lg:col-span-3 bg-white rounded-[2.5rem] p-8 border border-slate-100">
        <div className="flex justify-between mb-8">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-10 w-40 rounded-xl" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Skeleton key={i} className="h-24 w-full rounded-[2rem]" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleSkeleton;
