import React from "react";
import Skeleton from "../ui/Skeleton";

const SpecialtiesSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="bg-white p-4 rounded-[2rem] border border-slate-100 flex gap-4">
        <Skeleton className="h-12 w-full max-w-md rounded-2xl" />
        <Skeleton className="h-12 w-40 rounded-2xl" />
      </div>

      {/* Table Content Skeleton */}
      <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-100 overflow-hidden">
        <div className="p-8 space-y-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between py-4 border-b border-slate-50 last:border-0"
            >
              <div className="flex items-center gap-6">
                <Skeleton className="size-12 rounded-xl" /> {/* Icon space */}
                <div className="space-y-2">
                  <Skeleton className="h-5 w-40" /> {/* Title space */}
                  <Skeleton className="h-3 w-64 hidden md:block" />
                  {/* Desc space */}
                </div>
              </div>
              <div className="flex gap-3">
                <Skeleton className="h-8 w-20 rounded-full" />
                {/* Status space */}
                <Skeleton className="size-8 rounded-lg" />
                {/* Action space */}
                <Skeleton className="size-8 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecialtiesSkeleton;
