import React, {forwardRef} from "react";

const InputField = forwardRef(
  ({label, icon, type, id, placeholder, forgotPassword, ...props}, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full text-left">
        <div className="flex justify-between items-center ml-1">
          <label className="text-slate-700 text-xs font-bold uppercase tracking-wider">
            {label}
          </label>
          {forgotPassword && (
            <button
              type="button"
              className="text-[10px] text-blue-600 font-bold hover:underline"
            >
              ¿Olvidaste tu clave?
            </button>
          )}
        </div>
        <div className="relative">
          {icon && (
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
              {icon}
            </span>
          )}
          <input
            {...props}
            ref={ref}
            type={type}
            id={id}
            placeholder={placeholder}
            className={`w-full h-12 ${icon ? "pl-12" : "px-5"} pr-5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-slate-800 transition-all placeholder:text-slate-300 shadow-sm`}
          />
        </div>
      </div>
    );
  },
);

export default InputField;
