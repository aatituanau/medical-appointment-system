import React from "react";
import Skeleton from "../ui/Skeleton";

const ReportsSkeleton = () => {
  return (
    <div className="p-8 space-y-8 animate-pulse">
      {/* Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Skeleton className="h-32 rounded-[2rem]" />
        <Skeleton className="h-32 rounded-[2rem]" />
        <Skeleton className="h-32 rounded-[2rem]" />
      </div>
      {/* Chart/Table Skeleton */}
      <Skeleton className="h-96 w-full rounded-[3rem]" />
    </div>
  );
};

export default ReportsSkeleton;
