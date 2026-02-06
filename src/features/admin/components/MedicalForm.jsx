import React from "react";

const MedicalForm = ({fields, register, errors}) => (
  <div className="space-y-4">
    {fields.map((field) => (
      <div key={field.name}>
        <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">
          {field.label}
        </label>

        {field.type === "select" ? (
          <select
            className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none appearance-none focus:ring-2 focus:ring-blue-500/10 transition-all cursor-pointer"
            {...register(field.name)}
          >
            <option value="">{field.placeholder}</option>
            {field.options?.map((opt) => (
              <option key={opt.id || opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : field.type === "textarea" ? (
          <textarea
            className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none h-24 resize-none focus:ring-2 focus:ring-blue-500/10 transition-all"
            placeholder={field.placeholder}
            {...register(field.name)}
          />
        ) : (
          <input
            type={field.type || "text"}
            className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
            placeholder={field.placeholder}
            {...register(field.name)}
          />
        )}

        {errors[field.name] && (
          <p className="mt-1 text-xs text-red-500 font-semibold">
            {errors[field.name]?.message}
          </p>
        )}
      </div>
    ))}
  </div>
);

export default MedicalForm;
