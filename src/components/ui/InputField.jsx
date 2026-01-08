import React, {useState} from "react";

const InputField = ({label, icon, type, placeholder, id, name}) => {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="flex flex-col gap-1.5 mb-2">
      <label
        className="text-slate-700 text-xs font-bold uppercase tracking-wider"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3 text-slate-400">
            <span className="material-symbols-outlined text-[18px]">
              {icon}
            </span>
          </div>
        )}
        <input
          id={id}
          name={id}
          type={isPassword ? (show ? "text" : "password") : type}
          placeholder={placeholder}
          required
          className="w-full h-11 pl-10 pr-10 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#137fec]/20 focus:border-[#137fec] transition-all"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 text-slate-400 hover:text-slate-600"
          >
            <span className="material-symbols-outlined text-[18px]">
              {show ? "visibility_off" : "visibility"}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;
