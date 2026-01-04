import React from 'react';

export const QuestionArea = ({ question, questionIndex, selectedOption, onAnswer }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-32"> {/* pb-32 for footer space */}
      <div className="max-w-4xl mx-auto">
        
        {/* Question Header */}
        <div className="mb-6">
          <span className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Question {questionIndex + 1}
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mt-2 leading-relaxed">
            {question.question}
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option) => (
            <div 
              key={option.id}
              onClick={() => onAnswer(option.id)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-4 group ${
                selectedOption === option.id 
                  ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'
              }`}
            >
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                 selectedOption === option.id
                   ? 'border-brand-600 bg-brand-600 text-white'
                   : 'border-gray-400 text-gray-500'
              }`}>
                {option.id.toUpperCase()}
              </div>
              <span className={`text-base font-medium ${
                 selectedOption === option.id ? 'text-brand-900 dark:text-brand-100' : 'text-gray-700 dark:text-gray-300'
              }`}>
                {option.text}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};