import React, {useState} from "react";

const Calendar = ({onDateChange}) => {
  // Initialize with today's date
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Get "Today" at 00:00:00 to compare correctly
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const days = ["L", "M", "X", "J", "V", "S", "D"];

  // Logic to generate days for the current month
  const getDaysInMonth = (year, month) => {
    const date = new Date(year, month, 1);
    const daysArr = [];

    // Adjust week to start on Monday
    let firstDayIndex = date.getDay() - 1;
    if (firstDayIndex === -1) firstDayIndex = 6;

    // Empty spaces for start of month
    for (let i = 0; i < firstDayIndex; i++) {
      daysArr.push(null);
    }

    // Real days of the month
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
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    // Check if the date is in the past
    const isPast = date < today;

    // If it is weekend or past date, do nothing
    if (isWeekend || isPast) return;

    setSelectedDate(date);
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

  const monthName = currentDate.toLocaleString("es-ES", {month: "long"});

  return (
    <div className="w-full">
      {/* Header with month name and buttons */}
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

      {/* Weekday labels */}
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

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-y-2">
        {monthDays.map((date, index) => {
          if (!date) return <div key={index} className="w-9 h-9" />;

          // 1. Check if it is Saturday (6) or Sunday (0)
          const isWeekend = date.getDay() === 0 || date.getDay() === 6;

          // 2. Check if the date is before today
          const isPast = date < today;

          // 3. Disable if it is weekend OR past
          const isDisabled = isWeekend || isPast;

          return (
            <div key={index} className="flex justify-center">
              <button
                type="button"
                disabled={isDisabled}
                onClick={() => handleDateClick(date)}
                className={`w-9 h-9 rounded-xl text-[11px] font-bold transition-all
                    ${
                      selectedDate?.toDateString() === date.toDateString()
                        ? "bg-[#137fec] text-white shadow-lg shadow-blue-200"
                        : isDisabled
                          ? "text-slate-200 cursor-not-allowed opacity-40"
                          : "text-slate-600 hover:bg-blue-50 hover:text-[#137fec]"
                    }
                  `}
              >
                {date.getDate()}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
