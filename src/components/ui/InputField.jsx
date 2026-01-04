import React, {useState} from "react";

const InputField = ({label, icon, type, placeholder, id, forgotPassword}) => {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  const hasIcon = Boolean(icon);

  return (
    <div className="flex flex-col gap-1.5 mb-4">
      <div className="flex justify-between items-center">
        <label
          className="text-slate-700 text-xs font-bold uppercase tracking-wider"
          htmlFor={id}
        >
          {label}
        </label>
        {forgotPassword && (
          <a
            className="text-[11px] font-semibold text-primary hover:underline"
            href="#"
          >
            ¿Olvidaste tu contraseña?
          </a>
        )}
      </div>
      <div className="relative flex items-center">
        {hasIcon && (
          <div className="absolute left-3 text-slate-400">
            <span className="material-symbols-outlined text-[18px]">
              {icon}
            </span>
          </div>
        )}
        <input
          id={id}
          type={isPassword ? (show ? "text" : "password") : type}
          placeholder={placeholder}
          className={`w-full h-11 ${
            hasIcon ? "pl-10" : "pl-4"
          } pr-10 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 text-slate-400 hover:text-slate-600 transition-colors"
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
