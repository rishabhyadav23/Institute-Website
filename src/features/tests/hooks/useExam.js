import { useState, useEffect } from 'react';
import { MOCK_QUESTIONS } from '../api/examQuestionsData';

export const useExam = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { questionId: optionId }
  const [markedForReview, setMarkedForReview] = useState(new Set());
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes in seconds
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile Drawer

  const currentQuestion = MOCK_QUESTIONS[currentQuestionIndex];
  const totalQuestions = MOCK_QUESTIONS.length;

  // Timer Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format Time (MM:SS)
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Actions
  const handleAnswer = (optionId) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: optionId }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const toggleMarkForReview = () => {
    const newSet = new Set(markedForReview);
    if (newSet.has(currentQuestion.id)) {
      newSet.delete(currentQuestion.id);
    } else {
      newSet.add(currentQuestion.id);
    }
    setMarkedForReview(newSet);
  };

  const clearResponse = () => {
    const newAnswers = { ...answers };
    delete newAnswers[currentQuestion.id];
    setAnswers(newAnswers);
  };

  const jumpToQuestion = (index) => {
    setCurrentQuestionIndex(index);
    setIsSidebarOpen(false); // Close sidebar on mobile on selection
  };

  return {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    answers,
    markedForReview,
    timeLeft: formatTime(timeLeft),
    isSidebarOpen,
    setIsSidebarOpen,
    handleAnswer,
    handleNext,
    handlePrev,
    toggleMarkForReview,
    clearResponse,
    jumpToQuestion,
    MOCK_QUESTIONS
  };
};