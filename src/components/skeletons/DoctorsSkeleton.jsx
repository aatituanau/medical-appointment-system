import React from "react";
import Skeleton from "../ui/Skeleton";

const DoctorsSkeleton = () => {
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
                <Skeleton className="size-12 rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
              <Skeleton className="h-6 w-24 rounded-full" />
              <div className="flex gap-2">
                <Skeleton className="size-8 rounded-lg" />
                <Skeleton className="size-8 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorsSkeleton;
