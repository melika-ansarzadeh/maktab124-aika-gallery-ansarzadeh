'use client';
import React, { useState } from 'react';
import moment from 'moment-jalaali';
moment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(moment());

  const startOfMonth = currentMonth.clone().startOf('jMonth');
  const endOfMonth = currentMonth.clone().endOf('jMonth');

  const daysInMonth = [];
  let day = startOfMonth.clone();
  const emptyDays = startOfMonth.weekday();

  for (let i = 0; i < emptyDays; i++) {
    daysInMonth.push(null);
  }

  while (day.isSameOrBefore(endOfMonth, 'day')) {
    daysInMonth.push(day.clone());
    day.add(1, 'day');
  }

  const nextMonth = () =>
    setCurrentMonth((prev: { clone: () => { (): any; new(): any; add: { (arg0: number, arg1: string): any; new(): any; }; }; }) => prev.clone().add(1, 'jMonth'));
  const prevMonth = () =>
    setCurrentMonth((prev: { clone: () => { (): any; new(): any; subtract: { (arg0: number, arg1: string): any; new(): any; }; }; }) => prev.clone().subtract(1, 'jMonth'));

  return (
    <div className="w-[30rem] bg-gradient-to-br from-white via-slate-50 to-gray-100 rounded-2xl shadow-lg p-6 -mt-8 text-center font-sans">
      <div className="flex justify-between items-center mb-5">
        <button
          onClick={prevMonth}
          className="text-gray-600 hover:text-blue-500 transition"
        >
          ‹
        </button>
        <h2 className="text-lg font-semibold text-gray-700">
          {currentMonth.format('jMMMM jYYYY')}
        </h2>
        <button
          onClick={nextMonth}
          className="text-gray-600 hover:text-blue-500 transition"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 text-sm text-gray-500 mb-3 font-medium">
        {['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'].map((day, idx) => (
          <div key={idx} className="py-1">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {daysInMonth.map((day, idx) =>
          day ? (
            <div
              key={idx}
              className={`py-2 rounded-lg transition-all duration-200 cursor-pointer text-sm
                ${
                  day.isSame(moment(), 'day')
                    ? 'bg-blue-500 text-white font-bold shadow'
                    : 'text-gray-700 hover:bg-blue-100'
                }`}
            >
              {day.format('jD')}
            </div>
          ) : (
            <div key={idx}></div>
          )
        )}
      </div>
    </div>
  );
};

export default Calendar;
