import React, {useState} from "react";

const Calendar = ({onDateChange}) => {
  const [selected, setSelected] = useState(9);

  const days = ["L", "M", "X", "J", "V", "S", "D"];
  const dates = [
    null,
    null,
    null,
    null,
    null,
    null,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
  ];
  const handleDateClick = (day) => {
    setSelected(day);
    onDateChange(day);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
          <span className="material-symbols-outlined text-sm text-slate-400">
            chevron_left
          </span>
        </button>
        <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-[0.2em]">
          Octubre 2023
        </h4>
        <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
          <span className="material-symbols-outlined text-sm text-slate-400">
            chevron_right
          </span>
        </button>
      </div>

      <div className="grid grid-cols-7 mb-4">
        {days.map((day) => (
          <span
            key={day}
            className="text-[10px] font-black text-slate-300 text-center uppercase"
          >
            {day}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-2">
        {dates.map((date, index) => (
          <div key={index} className="flex justify-center">
            {date && (
              <button
                type="button"
                onClick={() => handleDateClick(date)}
                className={`w-9 h-9 rounded-xl text-[11px] font-bold transition-all
                  ${
                    selected === date
                      ? "bg-[#137fec] text-white shadow-lg shadow-blue-200"
                      : "text-slate-600 hover:bg-blue-50 hover:text-[#137fec]"
                  }
                `}
              >
                {date}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
