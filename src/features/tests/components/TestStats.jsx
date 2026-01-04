import React from 'react';
import { Trophy, Target, TrendingUp, Activity } from 'lucide-react';

export const TestStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard 
        icon={<Trophy size={20} className="text-yellow-600" />}
        label="Global Rank"
        value={`#${stats.rank}`}
        color="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400"
      />
      <StatCard 
        icon={<Target size={20} className="text-blue-600" />}
        label="Tests Taken"
        value={stats.testsTaken}
        color="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400"
      />
      <StatCard 
        icon={<TrendingUp size={20} className="text-green-600" />}
        label="Accuracy"
        value={stats.accuracy}
        color="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
      />
      <StatCard 
        icon={<Activity size={20} className="text-purple-600" />}
        label="Avg. Score"
        value={stats.avgScore}
        color="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400"
      />
    </div>
  );
};

const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">{label}</p>
      <h4 className="text-xl font-bold text-gray-900 dark:text-white">{value}</h4>
    </div>
  </div>
);