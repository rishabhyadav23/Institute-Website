import React from 'react';
import { X, CheckCircle2, Circle, AlertCircle } from 'lucide-react';
import { Button } from '../../../../components/ui/Button';

export const QuestionPalette = ({ 
  questions, 
  currentIndex, 
  answers, 
  markedForReview, 
  onJump, 
  isOpen, 
  onClose,
  onSubmit
}) => {
  // Logic to determine color of grid item
  const getStatusColor = (qId, index) => {
    const isCurrent = index === currentIndex;
    const isAnswered = answers[qId] !== undefined;
    const isMarked = markedForReview.has(qId);

    if (isCurrent) return 'ring-2 ring-offset-2 ring-brand-500 border-brand-500';
    if (isMarked) return 'bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-900/40 dark:text-purple-300 dark:border-purple-700';
    if (isAnswered) return 'bg-green-100 text-green-700 border-green-300 dark:bg-green-900/40 dark:text-green-300 dark:border-green-700';
    return 'bg-gray-100 text-gray-500 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700';
  };

  return (
    <div className={`fixed inset-y-0 right-0 w-80 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 transform transition-transform duration-300 z-50 lg:translate-x-0 lg:static flex flex-col ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    }`}>
      
      {/* Header (Mobile Only Close) */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between lg:justify-center">
        <h3 className="font-bold text-gray-900 dark:text-white">Question Palette</h3>
        <button onClick={onClose} className="lg:hidden p-2 text-gray-500">
          <X size={20} />
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 gap-2 p-4 text-xs font-medium text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500"></div> Answered</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-purple-500"></div> Marked</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-gray-300"></div> Not Visited</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full border-2 border-brand-500"></div> Current</div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-5 gap-3">
          {questions.map((q, idx) => (
            <button
              key={q.id}
              onClick={() => onJump(idx)}
              className={`h-10 w-10 rounded-lg flex items-center justify-center text-sm font-bold border transition-all ${getStatusColor(q.id, idx)}`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Submit Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
        <Button onClick={onSubmit} className="w-full bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-900/20">
          Submit Test
        </Button>
      </div>
    </div>
  );
};