import React, {useState, useEffect} from "react";

const Calendar = ({onDateChange}) => {
  // Inicializamos con la fecha de hoy
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const days = ["L", "M", "X", "J", "V", "S", "D"];

  // Lógica para generar los días del mes actual
  const getDaysInMonth = (year, month) => {
    const date = new Date(year, month, 1);
    const daysArr = [];

    // Ajuste para que la semana empiece en Lunes (0 = Domingo en JS)
    let firstDayIndex = date.getDay() - 1;
    if (firstDayIndex === -1) firstDayIndex = 6;

    // Espacios vacíos para el inicio del mes
    for (let i = 0; i < firstDayIndex; i++) {
      daysArr.push(null);
    }

    // Días reales del mes
    while (date.getMonth() === month) {
      daysArr.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return daysArr;
  };

  const monthDays = getDaysInMonth(
    currentDate.getFullYear(),
    currentDate.getMonth(),
  );

  const handleDateClick = (date) => {
    setSelectedDate(date);
    // Formateamos a YYYY-MM-DD para Firebase
    const formattedDate = date.toISOString().split("T")[0];
    onDateChange(formattedDate);
  };

  const changeMonth = (offset) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + offset,
      1,
    );
    setCurrentDate(newDate);
  };

  // Nombres de meses en español
  const monthName = currentDate.toLocaleString("es-ES", {month: "long"});

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => changeMonth(-1)}
          className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
        >
          <span className="material-symbols-outlined text-sm text-slate-400">
            chevron_left
          </span>
        </button>
        <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-[0.2em]">
          {monthName} {currentDate.getFullYear()}
        </h4>
        <button
          onClick={() => changeMonth(1)}
          className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
        >
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
        {monthDays.map((date, index) => (
          <div key={index} className="flex justify-center">
            {date ? (
              <button
                type="button"
                onClick={() => handleDateClick(date)}
                className={`w-9 h-9 rounded-xl text-[11px] font-bold transition-all
                  ${
                    selectedDate?.toDateString() === date.toDateString()
                      ? "bg-[#137fec] text-white shadow-lg shadow-blue-200"
                      : "text-slate-600 hover:bg-blue-50 hover:text-[#137fec]"
                  }
                `}
              >
                {date.getDate()}
              </button>
            ) : (
              <div className="w-9 h-9" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
