import React from "react";

const MedicalForm = ({fields, formData, onChange}) => {
  return (
    <div className="space-y-4">
      {fields.map((field) => (
        <div key={field.name}>
          <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">
            {field.label}
          </label>

          {field.type === "select" ? (
            <select
              className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none appearance-none focus:ring-2 focus:ring-blue-500/10 transition-all cursor-pointer"
              value={formData[field.name]}
              onChange={(e) => onChange(field.name, e.target.value)}
              required={field.required}
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
              value={formData[field.name]}
              onChange={(e) => onChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              required={field.required}
            />
          ) : (
            <input
              type={field.type || "text"}
              className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
              value={formData[field.name]}
              onChange={(e) => onChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              required={field.required}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default MedicalForm;
