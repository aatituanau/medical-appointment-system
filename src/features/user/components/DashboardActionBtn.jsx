import React from "react";

const DashboardActionBtn = ({
  onClick,
  icon,
  title,
  subtitle,
  colorTheme = "blue",
}) => {
  // Dynamic color palettes per theme
  const colors = {
    blue: {
      hoverBorder: "hover:border-blue-200",
      bgIcon: "bg-blue-50",
      textIcon: "text-blue-500",
      textHover: "group-hover:text-blue-600",
    },
    purple: {
      hoverBorder: "hover:border-purple-200",
      bgIcon: "bg-purple-50",
      textIcon: "text-purple-500",
      textHover: "group-hover:text-purple-600",
    },
  };

  const theme = colors[colorTheme] || colors.blue;

  return (
    <button
      onClick={onClick}
      className={`group bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all text-left flex items-center gap-5 h-32 relative overflow-hidden ${theme.hoverBorder}`}
    >
      <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
        <span className="material-symbols-outlined text-8xl">{icon}</span>
      </div>

      <div
        className={`h-14 w-14 min-w-[3.5rem] ${theme.bgIcon} ${theme.textIcon} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm`}
      >
        <span className="material-symbols-outlined text-3xl">{icon}</span>
      </div>

      {/* Text */}
      <div className="relative z-10">
        <h3
          className={`font-black text-slate-700 text-xl italic ${theme.textHover} transition-colors`}
        >
          {title}
        </h3>
        <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wide">
          {subtitle}
        </p>
      </div>
    </button>
  );
};

export default DashboardActionBtn;
