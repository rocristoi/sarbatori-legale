import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const holidays = [
  { date: new Date(new Date().getFullYear(), 0, 1), name: "Anul Nou" },
  { date: new Date(new Date().getFullYear(), 0, 2), name: "Anul Nou" },
  { date: new Date(new Date().getFullYear(), 0, 6), name: "Boboteaza" },
  { date: new Date(new Date().getFullYear(), 0, 7), name: "Sfantul Ioan Botezatorul" },
  { date: new Date(new Date().getFullYear(), 0, 24), name: "Ziua Unirii Principatelor Romane" },
  { date: new Date(new Date().getFullYear(), 4, 3), name: "Pasti ortodox 2024" },
  { date: new Date(new Date().getFullYear(), 4, 4), name: "Pasti ortodox 2024" },
  { date: new Date(new Date().getFullYear(), 4, 5), name: "Pasti ortodox 2024" },
  { date: new Date(new Date().getFullYear(), 4, 6), name: "Pasti ortodox 2024" },
  { date: new Date(new Date().getFullYear(), 4, 1), name: "Ziua Muncii" },
  { date: new Date(new Date().getFullYear(), 5, 1), name: "Ziua Copilului" },
  { date: new Date(new Date().getFullYear(), 5, 23), name: "Rusalii" },
  { date: new Date(new Date().getFullYear(), 5, 24), name: "A doua zi de Rusalii" },
  { date: new Date(new Date().getFullYear(), 7, 15), name: "Adormirea Maicii Domnului" },
  { date: new Date(new Date().getFullYear(), 10, 30), name: "Sf. Andrei" },
  { date: new Date(new Date().getFullYear(), 11, 1), name: "Ziua Nationala a Romaniei" },
  { date: new Date(new Date().getFullYear(), 11, 25), name: "Craciunul" },
  { date: new Date(new Date().getFullYear(), 11, 26), name: "Craciunul" }
];

const schoolVacations = [
  { start: new Date(2024, 9, 26), end: new Date(2024, 10, 3), name: "Vacanța de toamnă" },
  { start: new Date(2024, 11, 21), end: new Date(2025, 0, 7), name: "Vacanța de iarnă" },
  { start: new Date(2025, 1, 10), end: new Date(2025, 2, 2), name: "Vacanța de schi/mobilă" },
  { start: new Date(2025, 3, 18), end: new Date(2025, 3, 27), name: "Vacanța de primăvară" },
  { start: new Date(2025, 5, 21), end: new Date(2025, 8, 7), name: "Vacanța de vară" }
];

const holidaysNextYear = holidays.map((holiday) => {
  const nextYearDate = new Date(holiday.date);
  nextYearDate.setFullYear(nextYearDate.getFullYear() + 1);
  return { date: nextYearDate, name: holiday.name };
});

const allHolidays = [...holidays, ...holidaysNextYear];

const isHoliday = (date) => {
  return allHolidays.some((holiday) => {
    return (
      holiday.date.getDate() === date.getDate() &&
      holiday.date.getMonth() === date.getMonth() &&
      holiday.date.getFullYear() === date.getFullYear()
    );
  });
};

const isSchoolVacation = (date) => {
  return schoolVacations.some((vacation) => {
    return date >= vacation.start && date <= vacation.end;
  });
};

const App = () => {
  const [dates, setDates] = useState([]);
  const [selectedHoliday, setSelectedHoliday] = useState(null);

  useEffect(() => {
    const today = new Date();
    const days = [];
    for (let i = 0; i < 365; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      days.push(nextDate);
    }
    setDates(days);
  }, []);

  const getDayOfWeek = (date) => date.getDay();

  const groupedByMonth = [];
  let currentMonth = null;
  let currentMonthDates = [];

  dates.forEach((date) => {
    const month = date.getMonth();
    if (month !== currentMonth) {
      if (currentMonth !== null) {
        groupedByMonth.push(currentMonthDates);
      }
      currentMonthDates = [date];
      currentMonth = month;
    } else {
      currentMonthDates.push(date);
    }
  });

  if (currentMonthDates.length > 0) {
    groupedByMonth.push(currentMonthDates);
  }

  const handleDateClick = (date) => {
    if (isHoliday(date)) {
      const holiday = allHolidays.find((holiday) => {
        return holiday.date.getDate() === date.getDate() &&
               holiday.date.getMonth() === date.getMonth() &&
               holiday.date.getFullYear() === date.getFullYear();
      });
      setSelectedHoliday(holiday);
    } else if (isSchoolVacation(date)) {
      const vacation = schoolVacations.find((vacation) => {
        return date >= vacation.start && date <= vacation.end;
      });
      setSelectedHoliday(vacation);
    }
  };

  const handleClosePopup = () => {
    setSelectedHoliday(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className='flex flex-col items-center justify-center mb-8'>
        <h1 className="text-2xl font-semibold text-center">Sarbatori Legale si Vacante</h1>
        <h2 className="text-xl font-semibold text-center ">Afla cand ai vacanta!</h2>
        <div className='flex flex-row items-center justify-center gap-2'>
          <span className='h-2 w-2 rounded-full bg-red-500 flex flex-row'></span>
          <span>Sarbatori Legale</span>
        </div>
        <div className='flex flex-row items-center justify-center gap-2'>
          <span className='h-2 w-2 rounded-full bg-blue-400 flex flex-row'></span>
          <span>Vacante Scolare</span>
        </div>
      </div>

      {groupedByMonth.map((monthDates, monthIndex) => {
        const firstDateOfMonth = monthDates[0];
        const monthName = firstDateOfMonth.toLocaleString('default', { month: 'long' });

        return (
          <div key={monthIndex} className="mb-8">
            <div className="text-center text-2xl font-semibold mb-4">{monthName}</div>
            <div className="grid grid-cols-7 gap-4 text-center font-bold mb-2">
              {["Lun", "Mar", "Mie", "Joi", "Vin", "Sam", "Dum"].map((day) => (
                <div key={day} className="p-2">{day}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-4">
              {Array(getDayOfWeek(firstDateOfMonth)).fill(null).map((_, index) => (
                <div key={index} className="p-4"></div>
              ))}

              {monthDates.map((date, index) => (
                <div
                  key={index}
                  onClick={() => handleDateClick(date)}
                  className={`flex justify-center items-center p-4 rounded-lg shadow-sm hover:bg-gray-500 transition-all cursor-pointer ${isHoliday(date) ? 'bg-red-500' : isSchoolVacation(date) ? 'bg-blue-400' : 'bg-gray-800'} h-[10px] sm:h-auto`}
                  >
                  <span className="text-lg font-medium">{date.getDate()}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {selectedHoliday && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-black p-6 rounded-xl shadow-xl w-800"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold">{selectedHoliday.name}</h2>
            <p className="mt-4">
              {selectedHoliday.start
                ? `Perioada: ${selectedHoliday.start.toLocaleDateString()} - ${selectedHoliday.end.toLocaleDateString()}`
                : "Aceasta este o sarbatoare legala."}
            </p>
            {selectedHoliday.name == "Vacanța de schi/mobilă" && (
                          <p className="mt-4">
                            Vacanta se stabileste de catre fiecare inspectorat din Romania numai din 7 zile din acest interval 
                        </p>
            )}
            <button onClick={handleClosePopup} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-400">
              Inchide
            </button>
          </motion.div>
        </motion.div>
      )}
        <motion.div className="mt-40 flex flex-col justify-end items-center  left-0 right-0"
                  initial={{ opacity:  0.5 }}
                  animate={{ opacity:  1 }}
                  exit={{  opacity: 0.5 }}
                  transition={{ duration: 0.3 }}
                  >
                  <div className="flex flex-col items-center leading-tight">
                    <h2>Developed by <span className="text-red-500">@rocristoi</span></h2>
                   <a href="https://github.com/rocristoi/sarbatori-legale"> <h2 className="text-blue-500">Contribute to this project on Github</h2></a>
                  </div>
          </motion.div>
    </div>
  );
};

export default App;
