import React, { useState, useEffect } from 'react';
import { Clock, Calendar } from 'lucide-react';

const EXAMS = [
  { name: 'JEE Mains', date: '2027-01-20', color: 'from-blue-500 to-indigo-600' },
  { name: 'NEET', date: '2027-05-04', color: 'from-green-500 to-emerald-600' },
  { name: 'NDA I', date: '2027-04-13', color: 'from-amber-500 to-orange-600' },
  { name: 'SSC JE', date: '2027-03-01', color: 'from-purple-500 to-violet-600' },
];

const getTimeLeft = (targetDate) => {
  const diff = new Date(targetDate) - new Date();
  if (diff <= 0) return { days: 0, hours: 0, mins: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    mins: Math.floor((diff / (1000 * 60)) % 60),
  };
};

export const ExamCountdown = () => {
  const [times, setTimes] = useState(EXAMS.map(e => getTimeLeft(e.date)));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimes(EXAMS.map(e => getTimeLeft(e.date)));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-4 px-4 -mt-6 relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {EXAMS.map((exam, idx) => (
            <div
              key={exam.name}
              className="flex-shrink-0 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4 flex items-center gap-4 min-w-[220px] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${exam.color} flex items-center justify-center flex-shrink-0`}>
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{exam.name}</p>
                <p className="text-lg font-heading font-bold text-gray-900 dark:text-white">
                  {times[idx].days}<span className="text-xs font-normal text-gray-400 ml-0.5">d</span>
                  {' '}{times[idx].hours}<span className="text-xs font-normal text-gray-400 ml-0.5">h</span>
                  {' '}{times[idx].mins}<span className="text-xs font-normal text-gray-400 ml-0.5">m</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
