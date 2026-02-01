import React from "react";

const Skeleton = ({className}) => {
  return (
    <div className={`animate-pulse bg-slate-200 rounded-md ${className}`}></div>
  );
};

export default Skeleton;
