import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Flag, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';

// Logic
import { useExam } from '../../features/tests/hooks/useExam';

// Components
import { ExamHeader } from '../../features/tests/components/exam/ExamHeader';
import { QuestionArea } from '../../features/tests/components/exam/QuestionArea';
import { QuestionPalette } from '../../features/tests/components/exam/QuestionPalette';

export const TestTakingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    answers,
    markedForReview,
    timeLeft,
    isSidebarOpen,
    setIsSidebarOpen,
    handleAnswer,
    handleNext,
    handlePrev,
    toggleMarkForReview,
    clearResponse,
    jumpToQuestion,
    MOCK_QUESTIONS
  } = useExam();

  const handleSubmitTest = () => {
    if(window.confirm("Are you sure you want to submit the test?")) {
       navigate('/tests');
    }
  };

  return (
    // MAIN CONTAINER: Screen Height, Flex Column (No Scroll on Body)
    <div className="flex flex-col h-screen w-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
      
      {/* 1. HEADER (Flex Item - No Fixed Position Needed) */}
      <div className="flex-none z-50">
        <ExamHeader 
          title={`Mock Test #${id} - General Studies`} 
          timeLeft={timeLeft} 
          onToggleSidebar={() => setIsSidebarOpen(true)}
        />
      </div>

      {/* 2. MIDDLE AREA (Takes Remaining Space) */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Left: Question Area (Scrollable Independent) */}
        <div className="flex-1 h-full overflow-y-auto custom-scrollbar relative">
           <QuestionArea 
            question={currentQuestion}
            questionIndex={currentQuestionIndex}
            selectedOption={answers[currentQuestion.id]}
            onAnswer={handleAnswer}
          />
        </div>

        {/* Right: Palette (Sidebar) */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 lg:hidden z-40 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}
        
        <QuestionPalette 
          questions={MOCK_QUESTIONS}
          currentIndex={currentQuestionIndex}
          answers={answers}
          markedForReview={markedForReview}
          onJump={jumpToQuestion}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onSubmit={handleSubmitTest}
        />
      </div>

      {/* 3. FOOTER (Flex Item - Sticks to bottom automatically) */}
      <div className="flex-none h-20 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 md:px-8 z-30">
        
        <div className="flex gap-2">
          <button 
            onClick={toggleMarkForReview}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold border transition-colors ${
              markedForReview.has(currentQuestion.id)
                ? 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'
            }`}
          >
            <Flag size={16} fill={markedForReview.has(currentQuestion.id) ? "currentColor" : "none"} /> 
            <span className="hidden sm:inline">Review</span>
          </button>
          
          <button 
            onClick={clearResponse}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <Trash2 size={16} /> 
            <span className="hidden sm:inline">Clear</span>
          </button>
        </div>

        <div className="flex gap-3">
          <Button 
            variant="secondary" 
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
            className="px-6"
          >
            <ChevronLeft size={18} className="mr-1" /> Prev
          </Button>
          <Button 
            onClick={handleNext}
            disabled={currentQuestionIndex === totalQuestions - 1}
            className="px-8 shadow-brand-500/20"
          >
            Next <ChevronRight size={18} className="ml-1" />
          </Button>
        </div>
      </div>

    </div>
  );
};